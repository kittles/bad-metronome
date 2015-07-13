/* global AudioContext */
var $ = require("jquery");
var _ = require("underscore");
var attachFastclick = require("fastclick");
var Metronome = require("./controllers/Metronome.js");
var Drag = require("./utils/Drag.js");
//var Hammer = require("hammerjs");
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
    $("#m-ui-help").click(showHelp);
    var helpDrag = new Drag({
        el: $("#help-container"),
        ondrag: ondrag,
        onend: onend
    });
    var dragRight = 0;
    var threshold = 30;
    function ondrag () {
        dragRight += helpDrag.newPoint.x - helpDrag.oldPoint.x;
        if (dragRight > threshold) {
            hideHelp();
        }
    }
    function onend () {
        if (dragRight > threshold) {
            hideHelp();
        }
        dragRight = 0;
    }
    $("#help-dismiss").click(hideHelp);
}
function showHelp (e) {
    e.preventDefault();
    e.stopPropagation();
    $("#m-inner").addClass("skew-left");
    $("#help-container").addClass("help-opened");
    $("#m-container").one("click", hideHelp);

    // slide in each bit
    setTimeout(function () {
        $("#help-buttons").removeClass("hidden-el");
    }, 300);
    setTimeout(function () {
        $("#help-slider").removeClass("hidden-el");
    }, 400);
    setTimeout(function () {
        $("#help-beats").removeClass("hidden-el");
    }, 500);
}
function hideHelp (e) {
    e.preventDefault();
    e.stopPropagation();
    $("#m-inner").removeClass("skew-left");
    $("#help-container").removeClass("help-opened");
    $(".help-item").addClass("hidden-el");
}
function unlockAudio () {
    var buffer = ctx.createBuffer(1, 1, 22050);
    var source = ctx.createBufferSource();
    source.buffer = buffer;
    source.connect(ctx.destination);
    source.start(0);
}


require("./utils/Analytics.js")();
