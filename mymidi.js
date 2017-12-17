var Tone = require('tone')


var MidiClass = function() {
  var synth = new Tone.Synth().toMaster();
  synth.triggerAttackRelease("C4", "8n");
}
exports.MyMidi = MidiClass;
