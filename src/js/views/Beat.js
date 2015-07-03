var $ = require("jquery");

module.exports = Beat;

function Beat () {
    this.baseSize = 100;
    this.translateY = 0;
    this.translateX = 0;
    this.scale = 1;

    this.beat = $(document.createElement("div"));
    this.beat.addClass("beat");

    this.transformString = function transformString () {
        var str = "translateY(" + this.translateY + "%)";
        str += " translateX(" + this.translateX + "px)";
        str += " scale(" + (this.scale / 100) + ")";
        return str;
    };
    this.scaleForVolume = function scaleForVolume (value) {
        this.scale = (value / 100) * this.baseSize;
        this.drawBeat();
    };
    this.setTranslateX = function setTranslateX (value) {
        this.translateX = value; 
        this.drawBeat();
    };
    this.setTranslateY = function setTranslateY (value) {
        this.translateY = value; 
        this.drawBeat();
    };
    this.drawBeat = function drawBeat () {
        this.beat.css({
            width: this.baseSize,
            height: this.baseSize,
            transform: this.transformString()
        });
    };

    this.drawBeat();
}
