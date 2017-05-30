(function(exports){
  var buffer = null;

  function cueActiveTracks(beatNumber, time){
      function playWaveForms(){
        for(var i = 0; i < loopFactory.loops.length; i++){
          var loop = loopFactory.loops[i]
          loop.waveform.play()
          node = loopFactory.loops[i].waveform.backend.source
          node.connect(merger, 0, i);
        }
      }
      cueFunction(beatNumber, time, playWaveForms)
  }

  function cueTrack(time){
    // Buffers audio source with Web Audio Api
    var source = audioContext.createBufferSource();
    source.buffer = buffer;
    source.connect(audioContext.destination);
    source.start(time)
  }

  function bufferTrack(){
    var audioUrl = loopFactory.loops[0].url
    var request = new XMLHttpRequest();

    request.open('GET', audioUrl, true);
    request.responseType = 'arraybuffer';
    request.onload = function(){
      audioContext.decodeAudioData(request.response, function(decodedAudio){
        buffer = decodedAudio;
      }, function (){
        console.log ('Error')
      });
    }
    request.send();
  }

  exports.cueActiveTracks = cueActiveTracks
})(this)
