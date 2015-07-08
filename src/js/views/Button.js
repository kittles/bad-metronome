var _ = require("underscore");
var $ = require("jquery");

module.exports = Button;

function Button (className) {
    this.el = $(document.createElement("div"));
    this.textContainer = $(document.createElement("div"));
    this.el.append(this.textContainer);
    this.el.attr("class", "btn " + className);
    this.textContainer.attr("class", "btn-text-container");
}
