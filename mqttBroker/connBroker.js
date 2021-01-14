const mqtt = require("mqtt")
const dotenv = require('dotenv');
dotenv.config();

const connectOptions = {
    clientId: 'webApplicationServer',
    username: process.env.MQTT_USERNAME,
    password: process.env.MQTT_PASSWORD,
    keepalive: 120,
    reconnectPeriod: 5000,
}

/* Connect to broker and return client */
const mqttClient = mqtt.connect(process.env.MQTT_BROKER_URL, connectOptions);

module.exports = mqttClient 