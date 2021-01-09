const aedesOptions = { concurrency: 200, connectTimeout: 5000 }
const aedes = require('aedes')(aedesOptions)
const server = require('net').createServer(aedes.handle)
const port = 1883

server.listen(port, function () {
    console.log('server listening on port', port)
})

/*******************************************************
 *************** Broker Authentication *****************
 ******************************************************/

aedes.authenticate = (client, username, password, callback) => {
    if (username && username === 'admin123') {
        if (password && password == '123456') {
            callback(null, true);
            console.log(`Client: ${ client.id } authenticated successfully`);
        }
    } else {
        callback(false, false);
    }
}
/*******************************************************
 ****************** Broker Events **********************
 ******************************************************/

/* Fire when broker connected */
aedes.on('clientReady', (client) => {
    console.log(`Client ${ client.id } has connected!`)
})

/* Publish message reaches to the broker */
aedes.on('publish', async (publish, client) => {
    /* If not from an authenticated and connected client */
    if (!client) {
        return
    }
    console.log(`Published message ${ publish.messageId } of topic ${ publish.topic } from ${ client.id }`)
})

/* Client subscribes to a topic */
aedes.on('subscribe', (subscriptions, client) => {
    subscriptions.forEach((topic) => {
        console.log(`Client ${ client.id } has subscribed to ${ topic.topic } with QoS ${ topic.qos }`)
    })
})

/* Client unsubscribes to a topic */
aedes.on('unsubscribe', (unsubscriptions, client) => {
    console.log(`Client ${ client.id } has unsubscribed from ${ unsubscriptions }`)
})

/* Connection acknowledgement sent from  server to client */
aedes.on('connackSent', (connack, client) => {
    console.log(`Ack sent to ${ client.id } with return code ${ connack.returnCode }`)
})

/* For QOS 1 or 2  - Packet successfully delivered to client */
aedes.on('ack', async (packet, client) => {
    if (connack.returnCode == 4) {
        return console.log('Auth error.')
    }
    console.log(`Message ack\'d from ${ client.id }`)
})

/* On client disconnect */
aedes.on('clientDisconnect', (client) => {
    console.log(`Client ${ client.id } has disconnected`)
})
