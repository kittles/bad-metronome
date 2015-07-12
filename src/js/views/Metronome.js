var _ = require("underscore");
var $ = require("jquery");

// beats should never be wider than this many px
var MAX_BEAT_SIZE = 120;

module.exports = Metronome;

function Metronome () {
    this.container = $("#m-container").first();
    this.ui = $("#m-ui").first();
    this.slider = $("#m-slider").first();
    this.beats = $("#m-beats").first();
    this.addBtn = $("#m-ui-add-beat").first();
    this.removeBtn = $("#m-ui-remove-beat").first();
    this.toggleBtn = $("#m-ui-toggle").first();
}
Metronome.prototype.addBeat = function addBeat (beat) {
    this.resizeBeats(this.beats.children().add(beat.view.beatContainer));
    this.beats.append(beat.view.beatContainer);
};
Metronome.prototype.removeBeat = function removeBeat () {
    this.beats.children().last().remove();
    this.resizeBeats(this.beats.children());
};
Metronome.prototype.resizeBeats = function resizeBeats (beats) {
    var width = $(window).width();
    var beatSize = Math.min((width / beats.length), MAX_BEAT_SIZE);
    beats.css({
        width: beatSize,
        height: "100%"
    });
};
Metronome.prototype.sizeBeatsContainer = function sizeBeatsContainer () {
    var top = this.slider.offset().top + this.slider.height();
    this.beats.css("height", $(window).height() - top);
};
