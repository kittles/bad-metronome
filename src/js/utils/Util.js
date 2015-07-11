var _ = require("underscore");
var $ = require("jquery");

var Util = {
    newDiv: newDiv,
    clamp: clamp
};

function newDiv (className) {
    return $("<div>", {class: className});
}
function clamp (min, max, value) {
    if (value < min) {
        value = min;
    }
    if (value > max) {
        value = max;
    }
    return value;
}

module.exports = Util;
