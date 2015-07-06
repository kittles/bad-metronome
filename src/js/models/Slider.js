var _ = require("underscore");
var $ = require("jquery");

module.exports = Slider;

function Slider (settings) {
    if (!settings) {
        var settings = {};
    }
    this.value = 120;
    this.min = 20;
    this.max = 2000;
    this.scale = 100;
}
Slider.prototype.setValue = function setValue (value) {
    if (value < this.min) {
        value = this.min;
    }
    if (value > this.max) {
        value = this.max;
    }
    this.value = value;
};
