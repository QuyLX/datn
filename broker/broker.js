const PORT = 1883
const TOPIC = 'main'

var aedes = require('aedes')()
var server = require('net').createServer(aedes.handle)

const log = (text) => {
    console.log(`[${ new Date().toLocaleString() }] ${ text }`)
}

aedes.on(
    'client',
    (client) => {
        let message = `Client ${ client.id } just connected`
        log(message)
        aedes.publish({
            cmd: 'publish',
            qos: 2,
            topic: TOPIC,
            payload: message,
            retain: false
        })
    }
)

aedes.on(
    'clientDisconnect',
    (client) => {
        message = `Client ${ client.id } just DISconnected`
        log(message)
        aedes.publish({
            cmd: 'publish',
            qos: 2,
            topic: 'main',
            payload: message,
            retain: false
        })
    }
)

aedes.on(
    'clientError',
    (client) => {
        message = `Client ${ client.id } ERROR`
        log(message)
        aedes.publish({
            cmd: 'publish',
            qos: 2,
            topic: 'main',
            payload: message,
            retain: false
        })
    }
)

server.listen(PORT, function () {
    console.log(`server listening on port ${ PORT }`)
})