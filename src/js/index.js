/* global AudioContext */
var $ = require("jquery");
var _ = require("underscore");
var attachFastclick = require("fastclick");
var Metronome = require("./controllers/Metronome.js");
window.AudioContext = window.AudioContext || window.webkitAudioContext;
var ctx = new AudioContext();
window.ctx = ctx;

$(document).ready(init);

function init () {
    attachFastclick(document.body);
    ctx.masterGain = ctx.createGain();
    ctx.masterGain.connect(ctx.destination);
    $(window).one("touchstart mousedown", unlockAudio);
    var metronome = new Metronome(ctx);
    window.metronome = metronome;
    _.times(4, metronome.addBeat, metronome);
}
function unlockAudio () {
    var buffer = ctx.createBuffer(1, 1, 22050);
    var source = ctx.createBufferSource();
    source.buffer = buffer;
    source.connect(ctx.destination);
    source.start(0);
}
require("./utils/Analytics.js")();
