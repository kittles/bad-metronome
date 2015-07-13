var _ = require("underscore");
var $ = require("jquery");
var SliderView = require("../views/Slider.js");
var SliderModel = require("../models/Slider.js");
var Drag = require("../utils/Drag.js");

module.exports = Slider;

function Slider (parent) {
    this.parent = parent || {
        setBpm: _.noop 
    };
    this.model = new SliderModel();
    this.view = new SliderView();
    this.view.sizeSlider(this.model);
    this.view.addTicks(this.model);
    this.setValue(this.model.value);
    this.drag = new Drag({
        el: this.view.slider, 
        ondrag: ondrag.bind(this)
    });
    this.view.input.on("change", onSliderInputChange.bind(this));
}
Slider.prototype.setPxPerBpm = function setPxPerBpm (value) {
    this.model.setPxPerBpm(value);
    this.view.addTicks(this.model);
};
Slider.prototype.setValue = function setValue (value) {
    this.model.setValue(value);
    this.view.update(this.model);
    this.parent.setBpm(this.model.value);
};
function ondrag () {
    var increment = (this.drag.oldPoint.x - this.drag.newPoint.x) / this.model.pxPerBpm;
    this.setValue(this.model.value + increment);
}
function onSliderInputChange () {
    var value = parseInt($("#m-slider-input").val());
    if (!isNaN(value)) {
        this.view.slider.addClass("slider-transition");
        this.setValue(value);
        setTimeout(this.view.slider.removeClass.bind(this.view.slider, "slider-transition"), 800);
    }
}
