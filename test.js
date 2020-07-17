let analyser, context;

window.onload = function () {

  let audio = document.getElementById('audio-input');
  audio.addEventListener('change', function (e) {
    if (!audioContext || audioContext.state !== "running") {
      audio.src = URL.createObjectURL(e.target.files[0]);
      audio = new Audio();
      console.log(audio);
      setupAudio();
    }
  });
}

let sample = document.getElementsByClassName('sample')[0];

sample.addEventListener('click', function () {
  audio = new Audio('cheap thrills.mp3');
  setupAudio();
});

function setupAudio() {
  audio.addEventListener('canplay', function () {
    audioContext = audioContext || new AudioContext();
    //create analyzer
    analyser = (analyser || audioContext.createAnalyser());
    analyser.smoothingTimeConstant = 0.1;
    analyser.fftSize = 512;
    startSound();
  });
}

function startSound() {
  sourceNode = audioContext.createMediaElementSource(audio);
  sourceNode.connect(analyser);
  sourceNode.connect(audioContext.destination);
  audio.play();
  update();
}

document.getElementsByClassName('play')[0].addEventListener('click', playSound.bind(null, sourceNode));
document.getElementsByClassName('stop')[0].addEventListener('click', stopSound);


function playSound() {
  if (audioContext) {
    if (audioContext.state === 'suspended') {
      audioContext.resume();
    }
  }
}

function stopSound() {
  if (audioContext) {
    if (audioContext.state === 'running') {
      audioContext.suspend();
    }
  }
}

