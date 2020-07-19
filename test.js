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
    bufferLength = analyser.frequencyBinCount;
    dataArray = new Uint8Array(analyser.frequencyBinCount);
    analyser.getByteTimeDomainData(dataArray);
    // oscilloX = 0;
    if (display === "circles") {
      for (let i = 0; i < dataArray.length; i += 1) {
        let freq = dataArray[i];
        drawCircle(context, freq);
      }
    } else if (display === "bars") {
      drawBars(context, dataArray);
    } else if (display === "oscillo") {
      drawOscillo(context, dataArray);
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
    context.arc(centerX - (freq / 7), centerY - (freq / 7), (Math.abs(freq - 150)) * 3, 0, 2 * Math.PI);
    context.strokeStyle = gradient;
    context.fillStyle = "hsla(" + hue + ", 100%, 40%, .01)";
    context.fill();
    context.lineWidth = 1;
    context.stroke();
  }

  function drawBars(context) {
    for (let i = 0; i < bufferLength; i += 1) {
      let barHeight = dataArray[i] / 2;
      let barWidth = (width / bufferLength) * 2.5;
      let x = 0; 
      context.fillStyle = 'rgb(' + (barHeight + 100) + ',50,50)';
      context.fillRect(x, height - barHeight/2, barWidth, barHeight);
      x += barWidth + 1;
    }
  }
  // const categories = document.getElementsByClassName("categories-box");
  //   categories.addEventListener("click", function() {
  //     let lists = document.getElementsByClassName("categories-list");
  //       lists.classList.toggle("hiding");
  //   })

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
  circlesButton.addEventListener("click", function () {
    display = "circles";
    console.log(display);
  });

  barsButton.addEventListener("click", function () {
    display = "bars";
    console.log(display);
  })
}






