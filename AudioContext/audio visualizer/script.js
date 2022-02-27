const button = document.querySelector("button");
const audio = document.querySelector("audio");
const span = document.querySelector("span");
const divs = document.querySelectorAll("div");
let listening = false;

function handleStream(stream) {
  if (stream == null) {
    window.persistAudioStream.getTracks().forEach((track) => {
      track.stop();
    });
    window.persistAudioStream = null;
    button.innerText = "START";
    return;
  }
  window.persistAudioStream = stream;

  const audioContext = new AudioContext();
  const audioStream = audioContext.createMediaStreamSource(stream);
  const analyser = audioContext.createAnalyser();
  audioStream.connect(analyser);
  analyser.fftSize = 1024;

  const frequencyArray = new Uint8Array(analyser.frequencyBinCount);

  function render() {
    if (listening) {
      requestAnimationFrame(render);
      //   setTimeout(render, 1000);
    }
    analyser.getByteFrequencyData(frequencyArray);
    // console.log(frequencyArray);
    // console.log(
    //   frequencyArray.reduce((a, b) => a + b),
    //   0
    // );
    frequencyArray.forEach((v, i) => {
      //   divs[i].innerText = v;
      //   divs[i].style.width = v + "px";
      divs[i].style.height = v * 3 + "px";
      divs[i].style.left = 40 + i * 2 + "px";
      //   divs[i].style.bottom = 0;
    });
  }
  render();
  button.innerText = "STOP";
}

function showMessage(err) {
  console.error(err);
  window.alert("Microphone access not given");
}

button.onclick = () => {
  if (listening) {
    listening = false;
    handleStream(null);
  } else {
    listening = true;
    navigator.mediaDevices
      .getUserMedia({ audio: true, video: false })
      .then(handleStream)
      .catch(showMessage);
  }
};
