var Sound = require("./Sound.js");

module.exports = Beat;

function Beat (settings) {
    if (!settings) {
        var settings = {};
    }
    this.sound = new Sound({
        path: settings.sound || "/sounds/basic.wav",
        ctx: settings.ctx                      
    });
    this.muted = settings.muted || false;
    this.volume = settings.volume || 100;
    this.sigma = settings.sigma || 0;
    this.errorRate = settings.errorRate || 0;
}

Beat.prototype.setVolume = function setVolue (value) {
    this.volume = value;
    this.sound.gain.gain.value = this.volume / 100;
};
