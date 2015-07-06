var _ = require("underscore");
var $ = require("jquery");
var Button = require("./Button.js");

module.exports = Metronome;

function Metronome () {
    this.container = $(document.createElement("div"));
    this.container.attr("class", "metronome-container");
    this.uiContainer = $(document.createElement("div"));
    this.uiContainer.attr("class", "metronome-ui-container");
    this.rows = [];
    this.addBtn = new Button("add-btn");
    this.addBtn.el.text("Add Beat");
    this.removeBtn = new Button("remove-btn");
    this.removeBtn.el.text("Remove Beat");
    this.toggleBtn = new Button("toggle-btn");
    this.toggleBtn.el.text("Toggle");
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
    var containerWidth = this.container.width();
    var row;
    if (this.rows.length) {
        row = this.rows[this.rows.length - 1];
    } else {
        row = this.makeRow();
        this.container.css("height", this.container.height() + 100);
    }
    // check if there is room for another beat on the row
    if ((containerWidth - row.width()) < 100) {
        row = this.makeRow();
        this.container.css("height", this.container.height() + 100);
    }
    beat.view.beatContainer.css("left", row.width());
    row.css("width", row.width() + 100);
    row.append(beat.view.beatContainer);
};
Metronome.prototype.removeBeat = function removeBeat () {
    var row;
    if (this.rows.length) {
        row = this.rows[this.rows.length - 1];
    } else {
        return;
    }
    row.children().last().remove();
    row.css("width", row.width() - 100);
    if (row.width() < 10) {
        var oldRow = this.rows.pop();
        oldRow.remove();
        this.container.css("height", this.container.height() - 100);
    }
};
