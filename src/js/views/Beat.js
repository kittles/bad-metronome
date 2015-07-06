var $ = require("jquery");

module.exports = Beat;

function Beat () {
    this.baseSize = 100;
    this.translateY = 0;
    this.translateX = 0;
    this.scale = 1;

    this.beat = $(document.createElement("div"));
    this.beat.addClass("beat");

    this.beatContainer = $(document.createElement("div"));
    this.beatContainer.addClass("beat-container");

    this.beatContainer.append(this.beat);
    this.beatContainer.css({
        width: 100,
        height: 100
    });

    this.drawBeat();
}
Beat.prototype.transformString = function transformString () {
    var str = "translateY(" + this.translateY + "%)";
    str += " translateX(" + this.translateX + "px)";
    str += " scale(" + (this.scale / 100) + ")";
    return str;
};
Beat.prototype.scaleForVolume = function scaleForVolume (value) {
    this.scale = (value / 100) * this.baseSize;
    this.drawBeat();
};
Beat.prototype.setTranslateX = function setTranslateX (value) {
    this.translateX = value; 
    this.drawBeat();
};
Beat.prototype.setTranslateY = function setTranslateY (value) {
    this.translateY = value; 
    this.drawBeat();
};
Beat.prototype.drawBeat = function drawBeat () {
    this.beat.css({
        width: this.baseSize,
        height: this.baseSize,
        transform: this.transformString()
    });
};
