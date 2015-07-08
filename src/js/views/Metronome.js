var _ = require("underscore");
var $ = require("jquery");
var Button = require("./Button.js");

var MAX_BEAT_SIZE = 120;

module.exports = Metronome;

function Metronome () {
    this.container = $(document.createElement("div"));
    this.container.attr("class", "metronome-container");
    this.uiContainer = $(document.createElement("div"));
    this.uiContainer.attr("class", "metronome-ui-container");
    this.rows = [];
    this.addBtn = new Button("add-btn");
    this.addBtn.textContainer.text("+");
    this.removeBtn = new Button("remove-btn");
    this.removeBtn.textContainer.text("-");
    this.toggleBtn = new Button("toggle-btn");
    this.toggleBtn.textContainer.text("Toggle");
    this.uiContainer.append(this.removeBtn.el);
    this.uiContainer.append(this.addBtn.el);
    this.uiContainer.append(this.toggleBtn.el);

    // handle orientation change
}
Metronome.prototype.makeRow = function makeRow () {
    var row = $(document.createElement("div"));
    row.attr("class", "beat-row");
    row.css({
        width: 0,
        height: 100
    });
    this.rows.push(row);
    this.container.append(row);
    return row;
};
Metronome.prototype.addBeat = function addBeat (beat) {
    this.resizeBeats(this.container.children().add(beat.view.beatContainer));
    this.container.append(beat.view.beatContainer);
};
Metronome.prototype.removeBeat = function removeBeat () {
    this.container.children().last().remove();
    this.resizeBeats(this.container.children());
};
Metronome.prototype.resizeBeats = function resizeBeats (beats) {
    var width = $(window).width();
    var beatSize = Math.min((width / beats.length), MAX_BEAT_SIZE);
    for (var i = 0; i < beats.length; i++) {
        var beat = beats.eq(i);
        beat.css({
            width: beatSize,
            height: "100%"
        });
    }
};
