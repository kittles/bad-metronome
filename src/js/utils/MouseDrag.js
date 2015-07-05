var _ = require("underscore");
var $ = require("jquery");

module.exports = MouseDrag;

function MouseDrag (settings) {
    var that = this;
    this.el = settings.el;
    this.ondrag = settings.ondrag || _.noop;
    this.onup = settings.onup || _.noop;
    this.dragging = false;
    this.oldPoint = null;
    this.newPoint = null;
    this.el.mousedown(this.handleMousedown.bind(this));
}
MouseDrag.prototype.handleMousedown = function handleMousedown (e) {
    this.oldPoint = {
        x: e.clientX,
        y: e.clientY
    };
    window.currentEl = this.el;
    $(window).mousemove(this.handleDrag.bind(this));
    $(window).one("mouseup", this.handleMouseup.bind(this));
};
MouseDrag.prototype.handleDrag = function handleDrag (e) {
    if (window.currentEl === this.el) {
        this.dragging = true;
        this.newPoint = {
            x: e.clientX,
            y: e.clientY
        };
        this.ondrag();
        this.oldPoint = this.newPoint;
    }
};
MouseDrag.prototype.handleMouseup = function handleMouseup (e) {
    if (window.currentEl === this.el) {
        e.stopPropagation();
        e.preventDefault();
        this.onup();
        window.currentEl = null;
        this.dragging = false;
        $(window).unbind("mousemove");
    }
};
