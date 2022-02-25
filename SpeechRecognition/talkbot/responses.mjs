const greetings = {
    triggers: ['hello', 'hi'],
    replies: [
        'Hi',
        'Hello there',
        'How can I help you'
    ]
}

const feelings = {
    triggers: ['how are you'],
    replies: [
        'I am fine',
        'Good as always',
        'Digitally ok'
    ]
}

const states = {
    triggers: ['you there', 'can i tell'],
    replies: [
        'I am always there for you',
        'Yes, always',
        'Yes, you can tell me'
    ]
}

export const responses = [states, greetings, feelings]