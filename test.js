let audioContext, analyser, context, sourceNode, cycle;

window.onload = function () {
  let display = "circles";
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
    audio = new Audio('beautifulEmotion.mp3');
    setupAudio();
  });

  function setupAudio() {
    audio.addEventListener('canplay', function () {
      audioContext = audioContext || new AudioContext();
      //create analyzer
      analyser = (analyser || audioContext.createAnalyser());
      analyser.smoothingTimeConstant = 0.3;
      analyser.fftSize = 256;
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
    bufferLength = analyser.frequencyBinCount;
    dataArray = new Uint8Array(analyser.frequencyBinCount);
    // analyser.getByteTimeDomainData(dataArray);
    analyser.getByteFrequencyData(dataArray);
    oscilloX = 0;
    if (display === "circles") {
      for (let i = 0; i < dataArray.length; i += 1) {
        let freq = dataArray[i];
        drawCircle(context, freq);
      }
    } else if (display === "bars") {
      drawBars(context, dataArray);
    } else if (display === "oscilloscope") {
      drawOscilloscope(context, dataArray);
    }

    if (cycle && audioContext.state === 'running') {
      hue += 1;
    }
    requestAnimationFrame(update);
  }

  function drawCircle(context, freq) {
    let centerX = (width / 2);
    let centerY = (height / 2);
    let gradient = context.createLinearGradient(0, 0, 0, height);
    gradient.addColorStop(0, "rgba(255, 165, 0, 0.2)");
    gradient.addColorStop(1, "rgba(255, 0, 0, 0.2)");
    //draw a circle 
    context.beginPath();
    // context.arc(centerX - (freq / 7), centerY - (freq /7), (Math.abs(freq - 150)) * 3, 0, 2 * Math.PI);
    context.arc(centerX - (freq / 4), centerY - (freq / 4), (Math.abs(freq - 15)) * 1, 0, 2 * Math.PI);
    context.strokeStyle = gradient;
    context.fillStyle = "hsla(" + hue + ", 100%, 40%, .01)";
    context.fill();
    context.lineWidth = 1;
    context.stroke();
  }

  function drawBars(context, dataArray) {
    let x = 0; 
    let gradient = context.createLinearGradient(0, 0, 0, height);
    gradient.addColorStop(1, "rgba(255, 0, 0, 0.2)");
    gradient.addColorStop(0.75, '#ff0000');
    gradient.addColorStop(0.25, '#ffff00');
    gradient.addColorStop(0, '#ffffff');
    for (let i = 0; i < bufferLength; i += 1) {
      let barWidth = (width / bufferLength);
      let barHeight = dataArray[i] * 5;
      context.fillStyle = gradient;
      context.fillRect(x, height - barHeight / 2, barWidth, barHeight);
      x += barWidth + 1;
    }
  }

  // function drawOscilloscope(context, dataArray) {
  //   context.fillStyle = 'rgb(200, 200, 200)';
  //   context.lineWidth = 1;
  //   context.strokeStyle = 'rgb(0, 0, 0)';
  //   context.beginPath();
  //   let sliceWidth = canvas.width * 1.0 / dataArray.length;
  //   let x = 0;
  //   for (let i = 0; i < dataArray.length; i += 1) {
  //     let v = dataArray[i] / 128;
  //     let y = v * 200 / 2;
  //     if ( i === 0) {
  //       context.moveTo(x, y);
  //     } else {
  //       context.lineTo(x, y);
  //     }
  //   }
  //   x += sliceWidth;
  //   context.lineTo(canvas.width, canvas.height / 2);
  //   context.stroke();
  // }

  // const categories = document.getElementsByClassName("categories-box");
  //   categories.addEventListener("click", function() {
  //     let lists = document.getElementsByClassName("categories-list");
  //       lists.classList.toggle("hiding");
  //   })
  function drawOscilloscope(context, freqArray) {

    context.beginPath();
    let sliceWidth = canvas.width * 1.0 / bufferLength;

    let oscilloX = 0;
    for (let i = 0; i < bufferLength; i++) {

      let v = freqArray[i] / 86.0;
      let y = v * 200 / 2;

      if (i === 0) {
        context.moveTo(oscilloX, y);
      } else {
        context.lineTo(oscilloX, y);
      }

      oscilloX += sliceWidth;
    }

    context.strokeStyle = 'hsla(' + hue + ', ' + 100 + '%,' + 40 + '%,' + 0.9 + ')';
    context.lineTo(canvas.width, canvas.height / 1);
    context.lineWidth = 2;
    context.stroke();
  }

  const cycleButton = document.getElementsByClassName("cycle")[0];
    cycleButton.addEventListener("click", function() {
      if (cycle) {
        cycle = false;
      } else {
        cycle = true;
      }
    })

  const circlesButton = document.getElementById('circles');
  const barsButton = document.getElementById('bars');
  const oscilloButton = document.getElementById('oscilloscope');
  circlesButton.addEventListener("click", function () {
    display = "circles";
    console.log(display);
  });

  barsButton.addEventListener("click", function () {
    display = "bars";
    console.log(display);
  })

  oscilloButton.addEventListener("click", function () {
    display = "oscilloscope";
    console.log(display);
  })
}






