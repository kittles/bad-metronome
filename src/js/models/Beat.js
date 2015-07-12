var Sound = require("./Sound.js");

module.exports = Beat;

function Beat () {
    this.sound = new Sound();
    this.muted = false;
    this.volume = 100;
}

Beat.prototype.setVolume = function setVolue (value) {
    value = Math.max(value, 10);
    value = Math.min(value, 100);
    this.volume = value;
    this.sound.gain.gain.value = this.volume / 100;
};
