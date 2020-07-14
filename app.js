console.clear();

const AudioContext = window.AudioContext || window.webkitAudioContext;
const audioCtx = new AudioContext();

const audioElement = document.querySelector("audio");
const track = audioCtx.createMediaElementSource(audioElement);

const playButton = document.querySelector('.radio-control-play');
playButton.addEventListener("click", function() {
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