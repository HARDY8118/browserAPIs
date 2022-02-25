import { responses } from './responses.mjs'

const inputText = document.querySelector('.text-input')
const inputSpeech = document.querySelector('.speech-input')
const boxMessage = document.querySelector('.message-box')

try {
    const SpeechRecognition = window.speechRecognition || window.webkitSpeechRecognition
    const recognition = new SpeechRecognition()
    recognition.addEventListener('start', () => {
        console.log('Listening')
    })

    recognition.addEventListener('result', (e) => {
        const msgElement = document.createElement('div')
        msgElement.classList.add('message', 'request')
        msgElement.textContent = e.results[e.resultIndex][0].transcript
        boxMessage.appendChild(msgElement)
    })

    recognition.addEventListener('error', () => {
        thinking = false
        createResponse('sorry i cannot understand')
        inputText.contentEditable = true
        inputText.textContent = ""
        // inputText.focus()
    })

    recognition.addEventListener('nomatch', () => {
        thinking = false
        inputText.contentEditable = true
        inputText.textContent = ""
        // inputText.focus()
        createResponse('sorry i cannot understand')
    })
}
catch (e) {
    if (e instanceof TypeError) {
        inputSpeech.style.display = "none"
    }
}

let thinking = false

inputText.addEventListener('keypress', (e) => {
    if (e.keyCode == 13) {
        parse(e.target.textContent)
        const msgElement = document.createElement('div')
        msgElement.classList.add('message', 'request')
        msgElement.textContent = e.target.textContent
        boxMessage.appendChild(msgElement)
    }
})

inputSpeech.addEventListener('click', (e) => {
    if (e.target.textContent == "SPEAK") {
        e.target.textContent = "STOP"
        recognition.start()
    }
    else if (e.target.textContent == "STOP") {
        e.target.textContent = "SPEAK"
        recognition.stop()
    }
})

async function parse(userinput) {
    thinking = true
    inputText.contentEditable = false

    respond(userinput)
        .then(response => {
            createResponse(response)
        })
        .catch(e => {
            console.log(e)
            createResponse('sorry i cannot respond to that')
        })
        .finally(() => {
            thinking = false
            inputText.contentEditable = true
            inputText.textContent = ""
            // inputText.focus()
        })
}

function createResponse(responseText) {
    const utterence = new SpeechSynthesisUtterance(responseText)
    window.speechSynthesis.speak(utterence)

    utterence.addEventListener('start', () => {
        const resElem = document.createElement('div')
        resElem.classList.add('message', 'response')
        resElem.textContent = responseText
        boxMessage.appendChild(resElem)
    })
}

function respond(userinput) {
    return new Promise((resolve, reject) => {
        for (let r of responses) {
            for (let i of r.triggers) {
                if (userinput.includes(i)) {
                    resolve(r.replies[Math.floor(Math.random() * r.replies.length)])
                }
            }
        }
        reject("not found")
    })
}

inputText.focus()
