var $ = require("jquery");
var _ = require("underscore");
var MetronomeModel = require("../models/Metronome.js");
var MetronomeView = require("../views/Metronome.js");
var Slider = require("./Slider.js");
var Beat = require("./Beat.js");

module.exports = Metronome;

function Metronome (ctx) {
    this.ctx = ctx;
    this.model = new MetronomeModel();
    this.view = new MetronomeView();
    
    this.slider = new Slider(this);

    this.view.addBtn.click(this.addBeat.bind(this));
    this.view.removeBtn.click(this.removeBeat.bind(this));
    this.view.toggleBtn.click(this.toggle.bind(this));

    this.view.sizeBeatsContainer();

    this.scheduledBeatNumber = -1; // so model.beat reflects whats currently happening
    this.scheduledBeats = []; // timeout ids
    this.startTime = -1;
    this.buffer = 2000; // ms to schedule beats ahead
    this.bufferIntervalId = -1;
    this.lastBeatAbsoluteTime = -1;
}
Metronome.prototype.current = function current () {
    return this.ctx.currentTime * 1000;
};
Metronome.prototype.setBpm = function setBpm (value) {
    this.model.bpm = value;
    if (this.model.playing) {
        // need to reset start time because beats are scheduled based on
        // start time + bpm, so there would be a huge gap otherwise
        var msSinceLastBeat = this.current() - this.lastBeatAbsoluteTime;
        // dont want to jump forward or back in the bar, so need to set
        // the start time so the next beat scheduled is the right one
        var barBeat = this.model.beat % this.model.beats.length;
        this.model.beat = barBeat;
        this.scheduledBeatNumber = barBeat;
        // account for the beats that have already happened
        this.startTime = this.current() - (this.model.msPerBeat() * barBeat);
        // account for the time after the last beat that has happened
        this.startTime -= msSinceLastBeat;
        this.clearScheduledBeats();
        this.checkBuffer();
    }
};
Metronome.prototype.toggle = function toggle () {
    (this.model.playing ? this.stop : this.start).call(this);
};
Metronome.prototype.start = function start () {
    this.model.playing = true;
    this.view.toggleBtn.addClass("started").removeClass("stopped");
    this.view.toggleBtn.text("Stop");
    this.startTime = this.current();
    this.scheduledBeats = [];
    this.checkBuffer();
    this.bufferIntervalId = setInterval(this.checkBuffer.bind(this), this.buffer / 2);
};
Metronome.prototype.stop = function stop () {
    this.model.playing = false;
    this.view.toggleBtn.addClass("stopped").removeClass("started");
    this.view.toggleBtn.text("Start");
    clearInterval(this.bufferIntervalId);
    this.clearScheduledBeats.call(this);
    this.scheduledBeatNumber = -1;
    this.model.beat = -1;
    this.scheduledBeats = [];
    _.invoke(this.model.beats, "off");
};
Metronome.prototype.addBeat = function addBeat () {
    var beat = new Beat();
    beat.view.setNumber(this.model.beats.length + 1);
    this.model.beats.push(beat);
    this.view.addBeat(beat);
};
Metronome.prototype.removeBeat = function removeBeat () {
    this.model.beats.pop();
    this.view.removeBeat();
};
Metronome.prototype.checkBuffer = function checkBuffer () {
    while (!this.bufferFull.call(this)) {
        this.scheduleBeat();
    }
};
Metronome.prototype.scheduleBeat = function scheduleBeat () {
    var beatNumber = ++this.scheduledBeatNumber;
    var beatTimeoutTime = this.getBeatAbsoluteTime(beatNumber) - this.current();
    var beatTimeoutId = setTimeout(this.doBeat.bind(this, beatNumber), 
                                   beatTimeoutTime);
    this.scheduledBeats.push(beatTimeoutId);
};
Metronome.prototype.doBeat = function doBeat (number) {
    var beats = this.model.beats;
    var beat = beats[number % beats.length];
    _.invoke(this.model.beats, "off");
    if (beat) {
        beat.on();
    }
    this.model.beat++;
    this.lastBeatAbsoluteTime = this.current();
    this.scheduledBeats.splice(0, 1);
};
Metronome.prototype.getBeatAbsoluteTime = function getBeatAbsoluteTime (number) {
    return this.startTime + (number * this.model.msPerBeat());
};
Metronome.prototype.clearScheduledBeats = function clearScheduledBeats () {
    while (this.scheduledBeats.length > 0) {
        clearTimeout(this.scheduledBeats.pop());
    }
};
Metronome.prototype.bufferFull = function bufferFull () {
    var buffer = this.scheduledBeats.length * this.model.msPerBeat();
    return (buffer >= this.buffer);
};
