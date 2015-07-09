/* global AudioContext */
var $ = require("jquery");
var _ = require("underscore");
var Beat = require("./controllers/Beat.js");
var Metronome = require("./controllers/Metronome.js");
var Spinner = require("./controllers/Spinner.js");
var Slider = require("./controllers/Slider.js");

window.AudioContext = window.AudioContext || window.webkitAudioContext;
var ctx = new AudioContext();
ctx.masterGain = ctx.createGain();
ctx.masterGain.connect(ctx.destination);

// unlock web audio and initialize app
$(document).ready(function () {   
    $(window).one("touchstart mousedown", function () {
        var buffer = ctx.createBuffer(1, 1, 22050);
        var source = ctx.createBufferSource();
        source.buffer = buffer;
        source.connect(ctx.destination);
        source.start(0);
    });
    init();
});

function init () {
    console.log("sup jobless roach =)");
    var metronome = new Metronome({
        ctx: ctx                            
    });
    var slider = new Slider(_.throttle(updateBPM, 100));
    $("body").append(metronome.view.uiContainer);
    $(document.body).append(slider.view.el);
    $("body").append(metronome.view.container);
    _.times(4, function () {
        metronome.addBeat({
            ctx: ctx                
        });
    });
    function updateBPM () {
        metronome.setBpm(slider.model.value);
    }
    var mc = $(".metronome-container");
    var height = $(window).height() - mc.offset().top;
    mc.css("height", height);
    setTimeout(function () {
        $("body").removeClass("raised");
    }, 500);
}
