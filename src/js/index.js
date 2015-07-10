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
    var container = $(".body-container");
    var metronome = new Metronome({
        ctx: ctx                            
    });
    var slider = new Slider(_.throttle(updateBPM, 100));
    container.append(metronome.view.uiContainer);
    container.append(slider.view.el);
    container.append(metronome.view.container);
    _.times(4, function () {
        metronome.addBeat({
            ctx: ctx                
        });
    });
    function updateBPM () {
        metronome.setBpm(slider.model.value);
    }
    setTimeout(function () {
        container.removeClass("raised");
    }, 500);
}
