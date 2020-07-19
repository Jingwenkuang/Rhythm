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


let demo = document.getElementsByClassName('sample')[0];

demo.addEventListener('click', function () {
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
    start();
  });
}

function start() {
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

// const playButton = document.getElementById("toggle-buttons");
// playButton.addEventListener("click", function() {
//   if (audioContext) {
//     if (audioContext.state === "suspended") {
//     audioContext.resume();
//     } else if (audioContext.state === "running") {
//     audioContext.suspend();
//     }
//   }
// })

const canvas = document.getElementById('canvas');
  width = canvas.width = window.innerWidth;
  height = canvas.height = window.innerHeight;
  context = canvas.getContext("2d");





}





