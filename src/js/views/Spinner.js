var _ = require("underscore");
var $ = require("jquery");

module.exports = Spinner;

function Spinner () {
    this.el = $(document.createElement("div"));
    this.rotation = 0;
    this.el.attr("class", "spinner");
    this.markContainer = $(document.createElement("div"));
    this.markContainer.attr("class", "spinner-mark-container");
    this.el.append(this.markContainer);
    this.mark = $(document.createElement("div"));
    this.mark.attr("class", "spinner-mark");
    this.markContainer.append(this.mark);
    this.el.append(this.markContainer);
}
Spinner.prototype.rotate = function rotate (degrees) {
    this.rotation += degrees;
    this.el.css({
        transform: "rotate(" + this.rotation + "deg)"
    });
};
