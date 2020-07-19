let audioContext, analyser, context, sourceNode;

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
      startAudio();
    });
  }

  function startAudio() {
    sourceNode = audioContext.createMediaElementSource(audio);
    sourceNode.connect(analyser);
    sourceNode.connect(audioContext.destination);
    audio.play();
    update();
  }

  // document.getElementsByClassName('play')[0].addEventListener('click', playAudio.bind(null, sourceNode));
  // document.getElementsByClassName('stop')[0].addEventListener('click', stopAudio);
  let playAudio = document.getElementsByClassName("play")[0];
    playAudio.addEventListener("click", function() {
      if (audioContext) {
        if (audioContext.state === 'suspended') {
          audioContext.resume();
        }
      }
    }.bind(null, sourceNode));

  let stopAudio = document.getElementsByClassName("stop")[0];
    stopAudio.addEventListener("click", function () {
      if (audioContext) {
        if (audioContext.state === 'running') {
          audioContext.suspend();
        }
      }
    });

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


  var hue = hue || 330; 
  function update() {
  context.clearRect(0, 0, width, height);
  let dataArray = new Uint8Array(analyser.frequencyBinCount);
  analyser.getByteTimeDomainData(dataArray);

  if (display === "circles") {
    for (let i = 0; i < dataArray.length; i += 1) {
      let graph = dataArray[i];
      drawCircle = (context, graph, i);
    } 
  } else if (display === "oscillogram") {
      drawOscillogram(context, dataArray);
    }
  if (cycle && audioContext.state === "running") {
    hue += 1;
  }
  requestAnimationFrame(update);
  }

  function drawCircle(context, freq ) {
    let centerX = (width / 2);
    let centerY = (height / 2);
    let gradient = context.createLinearGradient(0, 0, 0, height);
    gradient.addColorStop(0, "rgba(35, 7, 77, 1)");
    gradient.addColorStop(1, "rgba(204, 83, 51, 1)");
    //draw a circle 
    context.beginPath();
    context.arc(centerX, centerY, 0, 2 * Math.PI);
    context.strokeStyle = "hsla(' + hue + ', 100%, 40%, 1.0)";
    context.fillStyle = "hsla(' + hue + ', 100%, 40%, 0.01)";
  }


}






