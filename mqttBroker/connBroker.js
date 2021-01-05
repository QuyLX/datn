const mqtt = require("mqtt")

const connectOptions = {
    clientId: 'webApplicationServer',
    username: process.env.BROKER_USERNAME,
    password: process.env.BROKER_PASSWORD,
    keepalive: 120,
    reconnectPeriod: 5000,
}

/* Connect to broker and return client */
const connectBroker = () => {
    const mqttClient = mqtt.connect(process.env.BROKER_URL, connectOptions);
    return mqttClient.on('connect', () => {
        return mqttClient
    })
}

module.exports = connectBroker 