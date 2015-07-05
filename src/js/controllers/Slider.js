var _ = require("underscore");
var $ = require("jquery");
var SliderView = require("../views/Slider.js");
var SliderModel = require("../models/Slider.js");
var MouseDrag = require("../utils/MouseDrag.js");

module.exports = Slider;

function Slider (dragCallback) {
    var that = this;
    this.model = new SliderModel();
    this.view = new SliderView(this.model);
    this.dragCallback = dragCallback;
    this.mouseDrag = new MouseDrag({
        el: this.view.slider, 
        ondrag: ondrag.bind(this)
    });
}
function ondrag () {
    var increment = this.mouseDrag.oldPoint.x - this.mouseDrag.newPoint.x;
    increment /= this.view.el.width();
    increment *= this.model.scale;
    this.model.setValue(this.model.value + increment);
    this.view.updateSlider();
    if (this.dragCallback) {
        this.dragCallback();
    }
}
