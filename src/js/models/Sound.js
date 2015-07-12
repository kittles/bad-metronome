var $ = require("jquery");

module.exports = Sound;

function Sound () {
    this.path = "/sounds/wood.wav";
    this.ctx = window.ctx;
    this.buffer = null;
    this.bufferSource = null;
    this.gain = this.ctx.createGain();
    this.volume = 100;
    this.loadSound(this.path);
    this.gain.connect(this.ctx.masterGain);
}
Sound.prototype.loadSound = function loadSound (path) {
    var getSound = new XMLHttpRequest();
    getSound.open("GET", path, true);
    getSound.responseType = "arraybuffer";
    var that = this;
    getSound.onload = function () {
        that.ctx.decodeAudioData(getSound.response, function (buffer) {
            that.buffer = buffer;
        });
    };
    getSound.send();
};
Sound.prototype.play = function play () {
    this.source = this.ctx.createBufferSource();
    this.source.buffer = this.buffer;
    this.source.connect(this.gain);
    this.source.start(0);
};
