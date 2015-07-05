var _ = require("underscore");
var $ = require("jquery");

module.exports = Drag;

var START_EVENTS = [
    "mousedown",
    "touchstart"
].join(" ");
var DRAG_EVENTS = [
    "mousemove",
    "touchmove"
].join(" ");
var END_EVENTS = [
    "mouseup",
    "touchend"
].join(" ");
var TOUCH_EVENTS = [
    "touchstart",
    "touchmove",
    "touchend"
];

function Drag (settings) {
    var that = this;
    this.el = settings.el;
    this.onstart = settings.onstart || _.noop;
    this.ondrag = settings.ondrag || _.noop;
    this.onend = settings.onend || _.noop;
    this.dragging = false;
    this.oldPoint = null;
    this.newPoint = null;
    this.el.on(START_EVENTS, this.handleStart.bind(this));
}
Drag.prototype.handleStart = function handleStart (e) {
    window.currentEl = this.el;
    this.oldPoint = getCoordinates(e);
    $(window).on(DRAG_EVENTS, this.handleDrag.bind(this));
    $(window).one(END_EVENTS, this.handleEnd.bind(this));
};
Drag.prototype.handleDrag = function handleDrag (e) {
    if (window.currentEl === this.el) {
        contain(e);
        this.dragging = true;
        this.newPoint = getCoordinates(e);
        this.ondrag();
        this.oldPoint = this.newPoint;
    }
};
Drag.prototype.handleEnd = function handleEnd (e) {
    if (window.currentEl === this.el) {
        contain(e);
        this.onend();
        this.dragging = false;
        window.currentEl = null;
        $(window).unbind(END_EVENTS);
    }
};
function getCoordinates (e) {
    var point;
    if (_.contains(TOUCH_EVENTS, e.type)) {
        var touch = e.originalEvent.touches[0];
        point = {
            x: touch.clientX,
            y: touch.clientY
        };
    } else {
        var mouse = e.originalEvent;
        point = {
            x: mouse.clientX,
            y: mouse.clientY
        };
    }
    console.log(point);
    return point;
}
function contain (e) {
    e.stopPropagation();
    e.preventDefault();
}
