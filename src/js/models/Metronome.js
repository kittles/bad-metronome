var $ = require("jquery");

module.exports = Metronome;

function Metronome (settings) {
    if (!settings) {
        var settings = {};
    }
    this.beats = [];
    this.playing = false;
    this.beat = -1;
    this.bpm = 120;
}
Metronome.prototype.msPerBeat = function msPerBeat () {
    return 1000 * 60 / this.bpm;
};
