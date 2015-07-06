var $ = require("jquery");
var BeatModel = require("../models/Beat.js");
var BeatView = require("../views/Beat.js");
var Drag = require("../utils/Drag.js");

module.exports = Beat;

function Beat (settings) {
    if (!settings) {
        var settings = {};
    }
    this.model = new BeatModel(settings);
    this.view = new BeatView(settings);
    this.setVolume(settings.volume || 50);
    this.drag = new Drag({
        el: this.view.beatContainer, 
        ondrag: ondrag.bind(this),
        onend: onend.bind(this)
    });
}
function ondrag (e) {
    this.setVolume(this.model.volume + ((this.drag.oldPoint.y - this.drag.newPoint.y) / 2));
}
function onend (e) {
    if (!this.drag.dragging) {
        this.toggleMute();
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
    this.model.setVolume(value);
    this.view.scaleForVolume(this.model.volume);
};
Beat.prototype.setSound = function setSound (value) {
    this.model.sound = value; 
};
