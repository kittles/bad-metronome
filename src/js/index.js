/* global AudioContext */
var $ = require("jquery");
var _ = require("underscore");
var Beat = require("./controllers/Beat.js");
var Metronome = require("./controllers/Metronome.js");
var Spinner = require("./controllers/Spinner.js");
var Slider = require("./controllers/Slider.js");
var ctx = new AudioContext();

ctx.masterGain = ctx.createGain();
ctx.masterGain.connect(ctx.destination);

$(document).ready(init);

function init () {
    console.log("sup jobless roach =)x");


    var metronome = new Metronome({
        ctx: ctx                            
    });
    $("body").append(metronome.view.uiContainer);
    $("body").append(metronome.view.container);
    _.times(4, function () {
        metronome.addBeat({
            ctx: ctx                
        });
    });
    window.metronome = metronome;

    var slider = new Slider(updateBPM);
    window.slider = slider;
    $(document.body).append(slider.view.el);

    function updateBPM () {
        metronome.model.bpm = slider.model.value;
    }
}
