/* global AudioContext */
var $ = require("jquery");
var _ = require("underscore");
var Beat = require("./controllers/Beat.js");
var Metronome = require("./controllers/Metronome.js");
var Slider = require("./controllers/Slider.js");
window.AudioContext = window.AudioContext || window.webkitAudioContext;
var ctx = new AudioContext();


$(document).ready(init);
    

function init () {
    ctx.masterGain = ctx.createGain();
    ctx.masterGain.connect(ctx.destination);
    $(window).one("touchstart mousedown", unlockAudio);
    //var metronome = new Metronome({
    //    ctx: ctx                            
    //});
    window.slider = new Slider(null);
}
function unlockAudio () {
    var buffer = ctx.createBuffer(1, 1, 22050);
    var source = ctx.createBufferSource();
    source.buffer = buffer;
    source.connect(ctx.destination);
    source.start(0);
}

//var slider = new Slider(_.throttle(updateBPM, 100));
//container.append(metronome.view.uiContainer);
//container.append(slider.view.el);
//container.append(metronome.view.container);
//_.times(4, function () {
//    metronome.addBeat({
//        ctx: ctx                
//    });
//});
//function updateBPM () {
//    metronome.setBpm(slider.model.value);
//}
