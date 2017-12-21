Array.prototype.random = function(){return this[Math.floor((Math.random()*this.length))];}
var synth = new Tone.Synth().toMaster()
//var noteLength = ["32n","16n","8n","4n","2n","1n"]
var noteLength = []
for(var k = 0; k < 4; k++){
  for(var i = 0; i < 2; i++){
    noteLength.push("2n");
  }
  for(var j = 0; j < 6; j++){
    noteLength.push("4n");
  }
}
console.log(noteLength)
var piano = new Tone.Sampler({
  'C4':'C4.mp3',
  'C5':'C5.mp3',
  'A4':'A4.mp3',
  'A5':'A5.mp3'
  }, {'release': 1, 'baseUrl':'/audio/'}).toMaster();

var loop = new Tone.Loop(function(time){runIt(time);},"2n")

var loop2 = new Tone.Loop(function(time){runIt(time);},"4n")

var loop3 = new Tone.Loop(function(time){runIt(time);},"8n")

loop.start(0).stop('1m');
loop3.start(0).stop('1m')

loop2.start('1m').stop('2m');
loop3.start('1m').stop('2m');

loop.start('2m').stop('3m');
loop3.start('2m').stop('3m');

loop2.start('3m').stop('4m');
loop3.start('3m').stop('4m');

loop.start('4m').stop('5m');
loop3.start('4m').stop('5m');

loop3.start('5m').stop('6m');
loop3.start('5m').stop('6m');

loop.start('6m').stop('7m');
loop3.start('6m').stop('7m');

loop2.start('7m').stop('32m');
loop3.start('7m').stop('32m');


document.querySelectorAll('button').forEach(function(button){
  button.addEventListener('mousedown', function(e){
    Tone.Transport.start('+0.1')
  //  piano.triggerAttack("C4")
  });
  button.addEventListener('mouseup', function(e){
    Tone.Transport.stop()
  //  piano.triggerRelease("C4")
  })
});

var runIt = function(time){
  var data = document.getElementById('genes').value.split(',');
  piano.triggerAttackRelease(data[0], noteLength[0], time);
  data = data.splice(1,data.length);
  noteLength = noteLength.splice(1,noteLength.length);
  document.getElementById('genes').value = data;
}
