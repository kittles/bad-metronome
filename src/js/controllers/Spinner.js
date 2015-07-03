var _ = require("underscore");
var $ = require("jquery");
var SpinnerView = require("../views/Spinner.js");

module.exports = Spinner;

function Spinner () {
    var that = this;
    this.dragging = false;
    this.view = new SpinnerView();
    this.center = null;

    this.view.el.mousedown(function (e) {
        that.oldPoint = {
            x: e.clientX,
            y: e.clientY
        };
        $(window).mousemove(ondrag.bind(this));
        $(window).one("mouseup", function () {
            that.dragging = false;
            $(window).unbind("mousemove");
        });
    });
    var c = 0;
    function ondrag (e) {
        that.dragging = true;
        that.newPoint = {
            x: e.clientX,
            y: e.clientY
        };
        // do the rotation
        var center = getCenter(that.view.el);
        var rotation = getRotation(that.oldPoint, that.newPoint, center);
        that.view.rotate(rotation);
        that.oldPoint = that.newPoint;
    }
}
function getCenter (el) {
    var offset = el.offset();
    var width = el.width();
    var height = el.height();
    var centerX = offset.left + width / 2;
    var centerY = offset.top + height / 2;
    return {
        x: centerX,
        y: centerY
    };
}
function getRotation (oldPoint, newPoint, center) {
    var a = getDistance(oldPoint, center);
    var b = getDistance(newPoint, center);
    var c = getDistance(newPoint, oldPoint);
    var rads = Math.acos((Math.pow(a, 2) + Math.pow(b, 2) - Math.pow(c, 2)) / (2 * a * b));
    return toDegrees(rads) * getDirection(center, oldPoint, newPoint);
}
function getDirection (a, b, c) {
    // a center
    // b old point
    // c new point
    var clockwise = ((b.x - a.x) * (c.y - a.y) - (b.y - a.y) * (c.x - a.x)) > 0;
    return clockwise ? 1 : -1;
}
function getDistance (p1, p2) {
    var asq = Math.pow(p1.x - p2.x, 2);
    var bsq = Math.pow(p1.y - p2.y, 2);
    return Math.sqrt(asq + bsq);
}
function toDegrees (angle) {
    return angle * (180 / Math.PI);
}
