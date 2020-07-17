// // console.clear();

// const AudioContext = window.AudioContext || window.webkitAudioContext;
// let audioCtx;

// const audioElement = document.querySelector('audio');
// let track;

// const playButton = document.getElementById("onOffSwitch");

// playButton.addEventListener("click", function() {
//   if (!audioCtx) { 
//     init(); 
//   }

//   if (audioCtx.state === "suspended") {
//     audioCtx.resume();
//   }
//   if (this.dataset.playing === "false") {
//     audioElement.play();
//     this.dataset.playing = "true";
//   } else if (this.dataset.playing === "true") {
//     audioElement.pause();
//     this.dataset.playing = "false";
//   }

//   let state = this.getAttribute("aria-checked") === "true" ? true : false;
//   this.setAttribute("aria-checked", state ? "false" : "true");
// }, false);

//when track ends, reset to false 
// audioElement.addEventListener("ended", () => {
//   playButton.dataset.playing = "false";
//   playButton.setAttribute("aria-checked", "false");
// }, false);

// function init() {
//   audioCtx = new AudioContext();
//   track = audioCtx.createMediaElementSource(audioElement);

//   //volume control
//   const gainNode = audioCtx.createGain();
//   const volumeControl = document.getElementById("volume");
//   volumeControl.addEventListener("input", function() {
//     gainNode.gain.value = this.value;
//   }, false);

//   //panner control 
//   const pannerOpts = {pan: 0};
//   const panner = new StereoPannerNode(audioCtx, pannerOpts);
//   const pannerControl = document.getElementById("panner");
//   pannerControl.addEventListener("input", function() {
//     panner.pan.value = this.value;
//   }, false)

//   //connect volume, panner to audioCtx
//   track.connect(gainNode).connect(panner).connect(audioCtx.destination);
// }
//   //onOffButton
//   const switchButton = document.querySelector(".power-switch");
//   switchButton.addEventListener("click", function() {
//     if (this.dataset.power === "on") {
//       audioCtx.suspend();
//       this.dataset.power = "off";
//     } else if (this.dataset.power === "off") {
//       audioCtx.resume();
//       this.dataset.power = "on";
//     }
//     this.setAttribute("aria-checked", state ? "false" : "true");
//     console.log(audioCtx.state);
//   },false);

  ////////////////////////////////////////
// let stream, analyser, audioContext, soundSource, soundBuffer, sourceNode, cycle, transparency, freqArray;

// window.onload = function () { 
//   var hue = hue || 330;
//   let display = "circles";

//   let audio = document.getElementById('audio-input');
//   audio.addEventListener('change', function (event) {
//     if (!audioContext || audioContext.state !== "running") {
//       audio.src = URL.createObjectURL(event.target.files[0]);
//       audio = new Audio();
//       console.log(audio);
//       setup();
//     }
//   });


//   let sample = document.getElementsByClassName('sample')[0];

//   sample.addEventListener('click', function () {
//     audio = new Audio('cheap thrills.mp3');
//     setup();
//   });

//   function startSound() {
//     sourceNode = audioContext.createMediaElementSource(audio);
//     sourceNode.connect(analyser);
//     sourceNode.connect(audioContext.destination);

//     audio.play();
//     update();
//   }

//   function setup() {
//     audio.addEventListener('canplay', function () {
//       audioContext = audioContext || new AudioContext();
//       analyser = (analyser || audioContext.createAnalyser());
//       analyser.smoothingTimeConstant = 0.1;
//       analyser.fftSize = 512;

//       startSound();
//     });
//   }
//   document.getElementsByClassName('play')[0].addEventListener('click', playSound.bind(null, sourceNode));
//   document.getElementsByClassName('stop')[0].addEventListener('click', stopSound);


//   function playSound() {
//     if (audioContext) {
//       if (audioContext.state === 'suspended') {
//         audioContext.resume();
//       }
//     }
//   }

//   function stopSound() {
//     if (audioContext) {
//       if (audioContext.state === 'running') {
//         audioContext.suspend();
//       }
//     }
//   }


//   function drawCircle(context, freqValue, freqSequence) {
//     let x = ((width / 2)),
//       y = ((height / 2));
//     if (false) {
//       transparency = 0.001;
//     } else {
//       transparency = 0.08;
//     }
//     context.beginPath();
//     context.arc(x - (freqValue / 8), y - (freqValue / 8), (Math.abs(freqValue - 120)) * 5, 0, 2 * Math.PI, false);
//     context.strokeStyle = 'hsla(' + hue + ', ' + 100 + '%,' + 40 + '%,' + transparency + ')';
//     context.fillStyle = "hsla(" + hue + ", 100%, 40%, .01)";

//     context.fill();
//     context.lineWidth = 2;
//     context.stroke();
//   }

//   function drawOscillo(context, freqArray) {

//     context.beginPath();
//     let sliceWidth = canvas.width * 1.0 / freqArray.length;

//     let oscilloX = 0;
//     for (let i = 0; i < freqArray.length; i++) {

//       let v = freqArray[i] / 86.0;
//       let y = v * 200 / 2;

//       if (i === 0) {
//         context.moveTo(oscilloX, y);
//       } else {
//         context.lineTo(oscilloX, y);
//       }

//       oscilloX += sliceWidth;
//     }

//     if (false) {
//       transparency = 0.001;
//     } else {
//       transparency = 0.08;
//     }
//     context.strokeStyle = 'hsla(' + hue + ', ' + 100 + '%,' + 40 + '%,' + 0.9 + ')';
//     context.lineTo(canvas.width, canvas.height / 2);
//     context.lineWidth = 2;
//     context.stroke();
//   }


//   const canvas = document.getElementById('canvas'),
//     context = canvas.getContext('2d'),
//     width = canvas.width = window.innerWidth,
//     height = canvas.height = window.innerHeight,
//     c = 0;

//   function update() {
//     context.clearRect(0, 0, width, height);
//     freqArray = new Uint8Array(analyser.frequencyBinCount);
//     analyser.getByteTimeDomainData(freqArray);
//     oscilloX = 0;
//     if (display === "circles") {

//       for (let i = 0; i < freqArray.length; i += 1) {
//         let point = freqArray[i];
//         drawCircle(context, point, i);

//       }
//     } else if (display === "oscillo") {
//       drawOscillo(context, freqArray);
//     }

//     if (cycle && audioContext.state === 'running') {
//       hue += 1;
//     }
//     requestAnimationFrame(update);
//   }

//   const options = document.getElementsByClassName('options-header')[0];

//   options.addEventListener("click", function () {
//     let accordion = document.getElementsByClassName('options-list')[0];
//     accordion.classList.toggle("hiding");
//   })

//   const colorpicker = document.getElementsByClassName('rainbow')[0];
//   colorpicker.addEventListener("click", function (event) {
//     let rect = colorpicker.getBoundingClientRect();
//     let percent = (event.pageX - rect.left) / colorpicker.offsetWidth;
//     hue = 360 * percent;
//     console.log(event.pageX - rect.left);
//   })

//   const cycleButton = document.getElementsByClassName('cycle')[0];

//   cycleButton.addEventListener("click", function () {
//     if (cycle) {
//       cycle = false;
//     } else {
//       cycle = true;
//     }
//   })

//   const oscilloButton = document.getElementById('oscillo');
//   const circlesButton = document.getElementById('circles');

//   oscilloButton.addEventListener("click", function () {
//     display = "oscillo";
//     console.log(display);
//   });

//   circlesButton.addEventListener("click", function () {
//     display = "circles";
//     console.log(display);
//   })
//   const question = document.getElementsByClassName('help')[0];
//   const closeButton = document.getElementsByClassName('close')[0];
//   const modal = document.getElementsByClassName('modal')[0];

//   closeButton.addEventListener("click", function () {
//     modal.classList.add("closed");
//   })

//   question.addEventListener("click", function () {
//     modal.classList.remove("closed");
//   })
// };

////////////////////////


