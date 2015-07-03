var $ = require("jquery");
var _ = require("underscore");
var MetronomeModel = require("../models/Metronome.js");
var MetronomeView = require("../views/Metronome.js");
var Beat = require("./Beat.js");

module.exports = Metronome;

function Metronome (settings) {
    if (!settings) {
        var settings = {};
    }
    this.ctx = settings.ctx;
    this.model = new MetronomeModel(settings);
    this.view = new MetronomeView(settings);
    this.view.addBtn.el.click(this.addBeat.bind(this));
    this.view.removeBtn.el.click(this.removeBeat.bind(this));
    this.view.toggleBtn.el.click(this.toggle.bind(this));
}
Metronome.prototype.addBeat = function addBeat () {
    var beat = new Beat({
        ctx: this.ctx,
        path: "/sounds/basic.wav"        
    });
    this.model.beats.push(beat);
    this.view.addBeat(beat);
};
Metronome.prototype.removeBeat = function removeBeat () {
    this.model.beats.pop();
    this.view.removeBeat();
};
Metronome.prototype.start = function start () {
    var that = this;
    var c = 0;
    this.model.playing = true;
    doStart();
    // should use ms from start instead of just timeout
    function doStart () {
        that.model.beat++; 
        var beats = that.model.beats;
        var beat = beats[that.model.beat % beats.length];
        _.invoke(beats, "off");
        beat.on();
        that.timeoutId = setTimeout(doStart, that.model.msPerBeat());
    }
};
Metronome.prototype.stop = function stop () {
    this.model.playing = false;
    clearTimeout(this.timeoutId);
    this.model.beat = -1;
    _.invoke(this.model.beats, "off");
};
Metronome.prototype.toggle = function toggle () {
    if (this.model.playing) {
        this.stop();
    } else {
        this.start();
    }
};
