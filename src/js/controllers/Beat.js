var $ = require("jquery");
var BeatModel = require("../models/Beat.js");
var BeatView = require("../views/Beat.js");

module.exports = Beat;

function Beat (settings) {
    if (!settings) {
        var settings = {};
    }
    this.model = new BeatModel(settings);
    this.view = new BeatView(settings);
    this.setVolume(settings.volume || 100);
    //this.view.beat.click(this.toggleMute.bind(this));
    this.isDragging = false;
    this.mouseDown = false;
    var that = this;
    this.view.beat.mousedown(function (e) {
        that.mousedownY = e.clientY;
        $(window).mousemove(ondrag.bind(this));
        $(window).one("mouseup", function () {
            that.dragging = false;
            $(window).unbind("mousemove");
        });
    });
    this.view.beat.mouseup(function (e) {
        if (!that.dragging) {
            that.toggleMute();
        }
    });
    function ondrag (e) {
        that.dragging = true;
        that.setVolume(that.model.volume + ((that.mousedownY - e.clientY) / 2));
        that.mousedownY = e.clientY;
    }
}
Beat.prototype.play = function play () {
    if (!this.model.muted) {
        this.model.sound.play();
    }
};
Beat.prototype.on = function on () {
    this.view.beat.addClass("current-beat");
    this.play();
};
Beat.prototype.off = function off () {
    this.view.beat.removeClass("current-beat");
};
Beat.prototype.mute = function mute () {
    this.model.muted = true;
    this.view.beat.addClass("muted");
};
Beat.prototype.unmute = function unmute () {
    this.model.muted = false;
    this.view.beat.removeClass("muted");
};
Beat.prototype.toggleMute = function toggleMute () {
    if (this.model.muted) {
        this.unmute();
    } else {
        this.mute();
    }
};
Beat.prototype.setVolume = function setVolume (value) {
    value = Math.max(value, 10);
    value = Math.min(value, 100);
    this.model.setVolume(value);
    this.view.scaleForVolume(value);
};
Beat.prototype.setSound = function setSound (value) {
    this.model.sound = value; 
};
