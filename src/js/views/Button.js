var _ = require("underscore");
var $ = require("jquery");

module.exports = Button;

function Button (className) {
    this.el = $(document.createElement("div"));
    this.el.attr("class", "btn " + className);
}
