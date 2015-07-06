var _ = require("underscore");
var $ = require("jquery");

module.exports = Slider;

function Slider (model) {
    this.model = model;
    this.el = $(document.createElement("div"));
    this.el.attr("class", "slider-container");
    this.slider = null;
    this.makeInput();
    this.makeSlider();
    this.addTicks();
    this.updateSlider();
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
        transform: "translateX(" + (-10 * this.model.value) + ")"
    });
    this.el.append(this.slider);
    var tickArrow = $(document.createElement("div"));
    tickArrow.attr("class", "tick-arrow");
    this.el.append(tickArrow);
    this.updateSlider();
};
Slider.prototype.makeInput = function makeInput () {
    this.input = $(document.createElement("input"));
    this.input.attr("class", "slider-input");
    this.input.val(+this.model.value);
    this.el.append(this.input);
    $(this.input).on("change", this.onInputChange.bind(this));
};
Slider.prototype.onInputChange = function onInputChange () {
    var value = parseInt(this.input.val());
    if (!isNaN(value)) {
        this.model.value = value;
        this.updateSlider();
    }
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
    var xTranslate = this.model.value * this.getScaleOnScreen();
    var width = this.el.width() ? this.el.width() : $(document).width();
    xTranslate -= width / 2;
    this.slider.css({
        transform: "translateX(-" + xTranslate + "px)"
    });
    this.input.val(+this.model.value.toFixed(0));
};
Slider.prototype.makeTick = function makeTick (number, parent) {
    var tick = $(document.createElement("div"));
    var tickLine = $(document.createElement("div"));
    var tickText = $(document.createElement("div"));
    tick.attr("class", "tick");
    tickLine.attr("class", "tick-line");
    tickText.attr("class", "tick-text");
    tick.append(tickLine);
    tick.append(tickText);
    tickText.text(+number);
    tick.css({
        left: this.getScaleOnScreen() * number
    });
    parent.append(tick);
};
