var $ = require("jquery");
var util = require("../utils/Util.js");

// never space bpm closer than this many px together
var MIN_PX_PER_BPM = 3.5;

// never space bpm further than this many px apart
var MAX_PX_PER_BPM = 5;

// show approximately this many ticks on slider
var TICKS_ON_SCREEN = 6;

module.exports = Slider;

function Slider () {
    this.value = 120;
    this.min = 20;
    this.max = 1000;
    this.tickSpace = null;
    this.setPxPerBpm(2);
}
Slider.prototype.setValue = function setValue (value) {
    this.value = util.clamp(this.min, this.max, value);
};
Slider.prototype.setPxPerBpm = function setPxPerBpm (value) {
    this.pxPerBpm = util.clamp(MIN_PX_PER_BPM, MAX_PX_PER_BPM, value);
    this.tickSpace = this.getTickSpace();
};
Slider.prototype.getTickSpace = function getTickSpace () {
    // space in bpm
    var space = ($(window).width() / this.pxPerBpm) / TICKS_ON_SCREEN;
    return 5 * Math.round(space / 5);
};
