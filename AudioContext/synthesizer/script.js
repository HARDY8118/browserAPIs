const maxfreq = 20000
document.querySelector('#sinefreq').max = maxfreq
document.querySelector('#squarefreq').max = maxfreq
document.querySelector('#sawfreq').max = maxfreq
document.querySelector('#trifreq').max = maxfreq

const stepfreq = 10
document.querySelector('#sinefreq').step = stepfreq
document.querySelector('#squarefreq').step = stepfreq
document.querySelector('#sawfreq').step = stepfreq
document.querySelector('#trifreq').step = stepfreq

const audioCtx = new (window.AudioContext || window.webkitAudioContext)()

var sineosc, squareosc, sawosc, triosc

var playing = false;

document.querySelector('.button').addEventListener('click', playFrequency)

function playFrequency() {
    if (playing) {
        sineosc.stop()
        squareosc.stop()
        sawosc.stop()
        triosc.stop()

        sineosc.disconnect()
        squareosc.disconnect()
        sawosc.disconnect()
        triosc.disconnect()
    } else {
        sineosc = audioCtx.createOscillator()
        squareosc = audioCtx.createOscillator()
        sawosc = audioCtx.createOscillator()
        triosc = audioCtx.createOscillator();

        sineosc.type = "sine"
        squareosc.type = "square"
        sawosc.type = "sawtooth"
        triosc.type = "triangle"

        sineosc.frequency.setValueAtTime(document.querySelector('#sinefreq').value, audioCtx.currentTime)
        squareosc.frequency.setValueAtTime(document.querySelector('#squarefreq').value, audioCtx.currentTime)
        sawosc.frequency.setValueAtTime(document.querySelector('#sawfreq').value, audioCtx.currentTime)
        triosc.frequency.setValueAtTime(document.querySelector('#trifreq').value, audioCtx.currentTime)

        sineosc.connect(audioCtx.destination)
        squareosc.connect(audioCtx.destination)
        sawosc.connect(audioCtx.destination)
        triosc.connect(audioCtx.destination)

        sineosc.start()
        squareosc.start()
        sawosc.start()
        triosc.start()
    }
    playing = (!playing)
}

document.querySelector('#sinefreq').addEventListener('input', () => {
    sineosc.stop()
    sineosc.disconnect()
    sineosc = audioCtx.createOscillator()
    sineosc.type = "sine"
    sineosc.frequency.setValueAtTime(document.querySelector('#sinefreq').value, audioCtx.currentTime)
    sineosc.connect(audioCtx.destination)
    sineosc.start()
    document.querySelector('#sinef').value = document.querySelector('#sinefreq').value
})

document.querySelector('#squarefreq').addEventListener('input', () => {
    squareosc.stop()
    squareosc.disconnect()
    squareosc = audioCtx.createOscillator()
    squareosc.type = "square"
    squareosc.frequency.setValueAtTime(document.querySelector('#squarefreq').value, audioCtx.currentTime)
    squareosc.connect(audioCtx.destination)
    squareosc.start()
    document.querySelector('#squaref').value = document.querySelector('#squarefreq').value
})

document.querySelector('#sawfreq').addEventListener('input', () => {
    sawosc.stop()
    sawosc.disconnect()
    sawosc = audioCtx.createOscillator()
    sawosc.type = "sawtooth"
    sawosc.frequency.setValueAtTime(document.querySelector('#sawfreq').value, audioCtx.currentTime)
    sawosc.connect(audioCtx.destination)
    sawosc.start()
    document.querySelector('#sawf').value = document.querySelector('#sawfreq').value
})

document.querySelector('#trifreq').addEventListener('input', () => {
    triosc.stop()
    triosc.disconnect()
    triosc = audioCtx.createOscillator()
    triosc.type = "triangle"
    triosc.frequency.setValueAtTime(document.querySelector('#trifreq').value, audioCtx.currentTime)
    triosc.connect(audioCtx.destination)
    triosc.start()
    document.querySelector('#trif').value = document.querySelector('#trifreq').value
})

document.addEventListener('keydown', (e) => {
    console.log("Pressed: ", e.keyCode)
    if (e.keyCode == 32) {
        playFrequency()
    }
    else if (e.keyCode == 50 || e.keyCode == 51) {
        document.querySelector('#sinefreq').value = parseInt(document.querySelector('#sinefreq').value) + stepfreq
        sineosc.stop()
        sineosc.disconnect()
        sineosc = audioCtx.createOscillator()
        sineosc.type = "sine"
        sineosc.frequency.setValueAtTime(document.querySelector('#sinefreq').value, audioCtx.currentTime)
        sineosc.connect(audioCtx.destination)
        sineosc.start()
        document.querySelector('#sinef').value = document.querySelector('#sinefreq').value
    }
    else if (e.keyCode == 52 || e.keyCode == 53) {
        document.querySelector('#squarefreq').value = parseInt(document.querySelector('#squarefreq').value) + stepfreq
        squareosc.stop()
        squareosc.disconnect()
        squareosc = audioCtx.createOscillator()
        squareosc.type = "square"
        squareosc.frequency.setValueAtTime(document.querySelector('#squarefreq').value, audioCtx.currentTime)
        squareosc.connect(audioCtx.destination)
        squareosc.start()
        document.querySelector('#squaref').value = document.querySelector('#squarefreq').value
    }
    else if (e.keyCode == 54 || e.keyCode == 55) {
        document.querySelector('#sawfreq').value = parseInt(document.querySelector('#sawfreq').value) + stepfreq
        sawosc.stop()
        sawosc.disconnect()
        sawosc = audioCtx.createOscillator()
        sawosc.type = "sawtooth"
        sawosc.frequency.setValueAtTime(document.querySelector('#sawfreq').value, audioCtx.currentTime)
        sawosc.connect(audioCtx.destination)
        sawosc.start()
        document.querySelector('#sawf').value = document.querySelector('#sawfreq').value
    }
    else if (e.keyCode == 56 || e.keyCode == 57) {
        document.querySelector('#trifreq').value = parseInt(document.querySelector('#trifreq').value) + stepfreq
        triosc.stop()
        triosc.disconnect()
        triosc = audioCtx.createOscillator()
        triosc.type = "triangle"
        triosc.frequency.setValueAtTime(document.querySelector('#trifreq').value, audioCtx.currentTime)
        triosc.connect(audioCtx.destination)
        triosc.start()
        document.querySelector('#trif').value = document.querySelector('#trifreq').value
    }

    else if (e.keyCode == 81 || e.keyCode == 87) {
        document.querySelector('#sinefreq').value = parseInt(document.querySelector('#sinefreq').value) - stepfreq
        sineosc.stop()
        sineosc.disconnect()
        sineosc = audioCtx.createOscillator()
        sineosc.type = "sine"
        sineosc.frequency.setValueAtTime(document.querySelector('#sinefreq').value, audioCtx.currentTime)
        sineosc.connect(audioCtx.destination)
        sineosc.start()
        document.querySelector('#sinef').value = document.querySelector('#sinefreq').value
    }
    else if (e.keyCode == 82 || e.keyCode == 84) {
        document.querySelector('#squarefreq').value = parseInt(document.querySelector('#squarefreq').value) - stepfreq
        squareosc.stop()
        squareosc.disconnect()
        squareosc = audioCtx.createOscillator()
        squareosc.type = "square"
        squareosc.frequency.setValueAtTime(document.querySelector('#squarefreq').value, audioCtx.currentTime)
        squareosc.connect(audioCtx.destination)
        squareosc.start()
        document.querySelector('#squaref').value = document.querySelector('#squarefreq').value
    }
    else if (e.keyCode == 85 || e.keyCode == 73) {
        document.querySelector('#sawfreq').value = parseInt(document.querySelector('#sawfreq').value) - stepfreq
        sawosc.stop()
        sawosc.disconnect()
        sawosc = audioCtx.createOscillator()
        sawosc.type = "sawtooth"
        sawosc.frequency.setValueAtTime(document.querySelector('#sawfreq').value, audioCtx.currentTime)
        sawosc.connect(audioCtx.destination)
        sawosc.start()
        document.querySelector('#sawf').value = document.querySelector('#sawfreq').value
    }
    else if (e.keyCode == 80 || e.keyCode == 219) {
        document.querySelector('#trifreq').value = parseInt(document.querySelector('#trifreq').value) - stepfreq
        triosc.stop()
        triosc.disconnect()
        triosc = audioCtx.createOscillator()
        triosc.type = "triangle"
        triosc.frequency.setValueAtTime(document.querySelector('#trifreq').value, audioCtx.currentTime)
        triosc.connect(audioCtx.destination)
        triosc.start()
        document.querySelector('#trif').value = document.querySelector('#trifreq').value
    }
})