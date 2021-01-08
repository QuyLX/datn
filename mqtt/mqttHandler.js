const mqtt = require('mqtt');
const dotenv = require('dotenv');
// Load env variable
dotenv.config();
class MqttHandler {
    constructor() {
        this.mqttClient = null;
        this.host = process.env.BROKER_URL;
        this.username = process.env.BROKER_USERNAME; // mqtt credentials if these are needed to connect
        this.password = process.env.BROKER_PASSWORD;
    }

    connect() {
        // Connect mqtt with credentials (in case of needed, otherwise we can omit 2nd param)
        this.mqttClient = mqtt.connect(this.host, { username: this.username, password: this.password });

        // Mqtt error calback
        this.mqttClient.on('error', (err) => {
            console.log(err);
            this.mqttClient.end();
        });

        // Connection callback
        this.mqttClient.on('connect', () => {
            console.log(`mqtt client connected`);
        });

        // mqtt subscriptions
        this.mqttClient.subscribe('mytopic', { qos: 0 });

        // When a message arrives, console.log it
        this.mqttClient.on('message', function (topic, message) {
            console.log(message.toString());
        });

        this.mqttClient.on('close', () => {
            console.log(`mqtt client disconnected`);
        });
    }

    // Sends a mqtt message to topic: mytopic
    sendMessage(message) {
        this.mqttClient.publish('mytopic', message);
    }
}

module.exports = MqttHandler;