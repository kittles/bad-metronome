var _ = require("underscore");
var $ = require("jquery");
var util = require("../utils/Util.js");

module.exports = Slider;

function Slider () {
    this.el = $("#m-slider").first();
    this.slider = $("#m-slider-slider").first();
    this.input = $("#m-slider-input").first();
    this.tickArrow = $("#m-slider-tick-arrow").first();
    this.tickArrowShadow = $("#m-slider-tick-arrow-shadow").first();
}
Slider.prototype.updateSliderPosition = function updateSliderPosition (model) {
    var xOffset = -1 * model.value * model.pxPerBpm;
    console.log(xOffset);
    this.slider.css("transform", "translateX(" + xOffset + "px)");
};
Slider.prototype.sizeSlider = function sizeSlider (model) {
    var width = (model.max - model.min) * model.pxPerBpm;
    this.slider.css("width", width);
};
Slider.prototype.addTicks = function addTicks (model) {
    // should clear old ticks?
    this.slider.children().remove();
    var x = model.min;
    while (x < model.max) {
        this.makeTick(this.slider, model, x);
        x += model.tickSpace;
    }
};
Slider.prototype.makeTick = function makeTick (parent, model, number) {
    // maybe clone frag?
    var tick = util.newDiv("tick");
    var tickLine = util.newDiv("tick-line");
    var tickText = util.newDiv("tick-text");
    tick.append(tickLine);
    tick.append(tickText);
    tickText.text(+number);
    tick.css({
        left: model.pxPerBpm * (number - model.min)
    });
    parent.append(tick);
};
