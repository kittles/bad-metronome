/* global AudioContext */
var $ = require("jquery");
var _ = require("underscore");
var Beat = require("./controllers/Beat.js");
var Metronome = require("./controllers/Metronome.js");
var Spinner = require("./controllers/Spinner.js");
var ctx = new AudioContext();

ctx.masterGain = ctx.createGain();
ctx.masterGain.connect(ctx.destination);

$(document).ready(init);

function init () {
    console.log("sup jobless roach =)x");

    var spinner = new Spinner();
    window.spinner = spinner;
    $(document.body).append(spinner.view.el);

    //var metronome = new Metronome({
    //    ctx: ctx                            
    //});
    //$("body").append(metronome.view.uiContainer);
    //$("body").append(metronome.view.container);
    //_.times(4, function () {
    //    metronome.addBeat({
    //        ctx: ctx                
    //    });
    //});
    //window.metronome = metronome;

}
