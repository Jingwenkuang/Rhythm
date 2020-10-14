# [Rhythm](https://jingwenkuang.github.io/Rhythm/)

Rhythm is a web application built using the Web Audio API and HTML5 Canvas for creating visual representations of sound files.

[Visit Live Site](https://jingwenkuang.github.io/Rhythm/)

## Technologies 
* JavaScript
* HTML/CSS/JS
* Web Audio API 
* Canvas 

## Features 
* Play user's uploaded song or demo track 
* Variety of visual styles by using Canvas
* Variety of color visulization 

### select different visual styles 
<p align='center'>
  <img style='max-width: 60%;' height='350' src='https://media.giphy.com/media/WUfUzDsqQHXTiDTRhy/giphy.gif'>
 </p>

### select different color 
<p align='center'>
  <img style='max-width: 60%;' height='350' src='https://media.giphy.com/media/ZEZ6bvB9OcfzJ9v641/giphy.gif'>
 </p>

## Code snippet
```javascript
  function update() {
    context.clearRect(0, 0, width, height);
    bufferLength = analyser.frequencyBinCount;
    dataArray = new Uint8Array(analyser.frequencyBinCount);
    analyser.getByteTimeDomainData(dataArray);
    x = 0;
    if (display === "circles") {
      for (let i = 0; i < dataArray.length; i += 1) {
        let freq = dataArray[i];
        drawCircle(context, freq);
      }
    } else if (display === "bars") {
      drawBars(context, dataArray);
    } else if (display === "oscilloscope") {
      drawOscilloscope(context, dataArray);
    } else if (display === 'bubbles') {
      drawBubbles(dataArray);
    }

    if (cycle && audioContext.state === 'running') {
      hue += 1;
    }
    requestAnimationFrame(update);
  }
```
## Coming soon 
* More visualization style 
* Add volume slide bar 
* Mobile support 
