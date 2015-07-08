var $ = require("jquery");

module.exports = Beat;

function Beat () {
    this.baseSize = "90%";
    this.translateY = 0;
    this.translateX = 0;
    this.scaleY = 1;

    this.beat = $(document.createElement("div"));
    this.beat.addClass("beat");

    this.beatContainer = $(document.createElement("div"));
    this.beatContainer.addClass("beat-container");
    this.beatContainer.append(this.beat);

    this.drawBeat();
}
Beat.prototype.transformString = function transformString () {
    var str = "translateY(" + this.translateY + "%) ";
    str +=    "translateX(" + this.translateX + "px) ";
    str +=    "scaleY(" + this.scaleY + ")";
    return str;
};
Beat.prototype.scaleForVolume = function scaleForVolume (value) {
    this.scaleY = (value / 100);
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
