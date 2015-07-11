var _ = require("underscore");
var $ = require("jquery");
var SliderView = require("../views/Slider.js");
var SliderModel = require("../models/Slider.js");
var Drag = require("../utils/Drag.js");

module.exports = Slider;

function Slider (parent) {
    var that = this;
    this.parent = parent;
    this.model = new SliderModel();
    this.view = new SliderView();
    this.view.sizeSlider(this.model);
    this.view.addTicks(this.model);

    //this.dragCallback = dragCallback;
    this.drag = new Drag({
        el: this.view.slider, 
        ondrag: ondrag.bind(this)
    });
}
Slider.prototype.setPxPerBpm = function setPxPerBpm (value) {
    this.model.setPxPerBpm(value);
    this.view.addTicks(this.model);
    // update view
};
Slider.prototype.setValue = function setValue (value) {
    this.model.setValue(value);
    this.view.updateSliderPosition(this.model);
};
function ondrag () {
    // update this to use correct model attribs

    var increment = (this.drag.oldPoint.x - this.drag.newPoint.x) / this.model.pxPerBpm;
    this.setValue(this.model.value + increment);
    //this.view.updateSlider();
    //if (this.dragCallback) {
    //    this.dragCallback();
    //}
}
