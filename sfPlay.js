// Create the Audio Context — this is the main control center for all audio operations
const soundCtx = new AudioContext();

// Create a GainNode — this will control the overall volume
const masterGain = soundCtx.createGain();
masterGain.gain.value = 1.0; // Set the master volume to full (1.0)

// Connect the master gain node to the audio output (speakers or headphones)
masterGain.connect(soundCtx.destination);
let source;
const loadPlayAudio = async function () {
  const file = await fetch("owls.wav");
  const arrayBuffer = await file.arrayBuffer();
  const audioBuffer = await soundCtx.decodeAudioData(arrayBuffer);
  source = soundCtx.createBufferSource();
  source.buffer = audioBuffer;
  source.connect(masterGain);
  source.start();
};

const stopAudio = function () {
  source.stop();
};

// Add a click event listener to the "start" button
// When clicked, it runs loadPlayAudio() to fetch, decode, and play the sound
document.getElementById("start").addEventListener("click", loadPlayAudio);

// Add a click event listener to the "stop" button
// When clicked, it runs stopAudio() to stop the sound
document.getElementById("stop").addEventListener("click", stopAudio);
