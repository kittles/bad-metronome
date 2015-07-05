var _ = require("underscore");
var $ = require("jquery");

module.exports = Slider;

function Slider (model) {
    this.model = model;
    this.el = $(document.createElement("div"));
    this.el.attr("class", "slider-container");
    this.slider = null;
    this.makeSlider();
    this.addTicks();
}
Slider.prototype.getScaleOnScreen = function getScaleOnScreen () {
    // how much is 1px worth of value
    return this.slider.width() / (this.model.max - this.model.min);
};
Slider.prototype.makeSlider = function makeSlider () {
    this.slider = $(document.createElement("div"));
    this.slider.attr("class", "slider-slider");
    var width = this.el.width() > 0 ? this.el.width() : $(document).width();
    this.slider.css({
        width: width * ((this.model.max - this.model.min) / this.model.scale),
        height: "100%",
        transform: "translateX(" + (-10 * this.model.value) + ")"
    });
    this.updateSlider();
    this.el.append(this.slider);
};
Slider.prototype.addTicks = function addTicks () {
    var scale = this.model.scale;           
    var value = this.model.value;
    var tickSpace = 25;
    var start = this.model.min;
    while (start < this.model.max) {
        this.makeTick(start, this.slider);
        start += tickSpace;
    }
};
Slider.prototype.updateSlider = function updateSlider () {
    this.slider.css({
        transform: "translateX(-" + (this.model.value * this.getScaleOnScreen()) + "px)"
    });
};
Slider.prototype.makeTick = function makeTick (number, parent) {
    var tick = $(document.createElement("div"));
    tick.text(+number);
    tick.css({
        position: "absolute",
        left: this.getScaleOnScreen() * number
    });
    parent.append(tick);
};
