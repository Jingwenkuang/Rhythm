// console.clear();

const AudioContext = window.AudioContext || window.webkitAudioContext;
let audioCtx;

const audioElement = document.querySelector('audio');
let track;

const playButton = document.getElementById("onOffSwitch");

playButton.addEventListener("click", function() {
  if (!audioCtx) { 
    init(); 
  }

  if (audioCtx.state === "suspended") {
    audioCtx.resume();
  }
  if (this.dataset.playing === "false") {
    audioElement.play();
    this.dataset.playing = "true";
  } else if (this.dataset.playing === "true") {
    audioElement.pause();
    this.dataset.playing = "false";
  }

  let state = this.getAttribute("aria-checked") === "true" ? true : false;
  this.setAttribute("aria-checked", state ? "false" : "true");
}, false);

//when track ends, reset to false 
audioElement.addEventListener("ended", () => {
  playButton.dataset.playing = "false";
  playButton.setAttribute("aria-checked", "false");
}, false);

function init() {
  audioCtx = new AudioContext();
  track = audioCtx.createMediaElementSource(audioElement);

  //volume control
  const gainNode = audioCtx.createGain();
  const volumeControl = document.getElementById("volume");
  volumeControl.addEventListener("input", function() {
    gainNode.gain.value = this.value;
  }, false);

  //panner control 
  const pannerOpts = {pan: 0};
  const panner = new StereoPannerNode(audioCtx, pannerOpts);
  const pannerControl = document.getElementById("panner");
  pannerControl.addEventListener("input", function() {
    panner.pan.value = this.value;
  }, false)

  //connect volume, panner to audioCtx
  track.connect(gainNode).connect(panner).connect(audioCtx.destination);
}
  //onOffButton
  const switchButton = document.querySelector(".power-switch");
  switchButton.addEventListener("click", function() {
    if (this.dataset.power === "on") {
      audioCtx.suspend();
      this.dataset.power = "off";
    } else if (this.dataset.power === "off") {
      audioCtx.resume();
      this.dataset.power = "on";
    }
    // this.setAttribute("aria-checked", state ? "false" : "true");
    // console.log(audioCtx.state);
  },false);