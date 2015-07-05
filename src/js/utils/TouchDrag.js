var _ = require("underscore");
var $ = require("jquery");

module.exports = TouchDrag;

function TouchDrag (settings) {
    var that = this;
    this.el = settings.el;
    this.ondrag = settings.ondrag || _.noop;
    this.onup = settings.onup || _.noop;
    this.dragging = false;
    this.oldPoint = null;
    this.newPoint = null;
    this.el.on("touchstart", this.handleTouchstart.bind(this));
}
TouchDrag.prototype.handleTouchstart = function handleTouchstart (e) {
    var touch = getFirstTouch(e);
    this.oldPoint = {
        x: touch.clientX,
        y: touch.clientY
    };
    window.currentEl = this.el;
    $(window).on("touchmove", this.handleDrag.bind(this));
    $(window).one("touchend", this.handleTouchend.bind(this));
};
TouchDrag.prototype.handleDrag = function handleDrag (e) {
    if (window.currentEl === this.el) {
        console.log("handleDrag");
        var touch = getFirstTouch(e);
        this.dragging = true;
        this.newPoint = {
            x: touch.clientX,
            y: touch.clientY
        };
        this.ondrag();
        this.oldPoint = this.newPoint;
    }
};
TouchDrag.prototype.handleTouchend = function handleTouchend (e) {
    if (window.currentEl === this.el) {
        console.log("handleTouchend");
        e.stopPropagation();
        e.preventDefault();
        this.onup();
        window.currentEl = null;
        this.dragging = false;
        $(window).unbind("touchend");
    }
};
function getFirstTouch (e) {
    return e.originalEvent.touches[0];
}
