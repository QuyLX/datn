const mqtt = require('mqtt');

connectOptions = {
    username: 'admin123',
    password: '123456',
    keepalive: 120,
    reconnectPeriod: 5000
}

class MqttHandler {
    constructor() {
        this.mqttClient = null;
        this.err = null;
        this.checkConnect = null;
        this.connectOptions = {
            username: 'admin123',
            password: '123456',
            keepalive: 120,
            reconnectPeriod: 5000
        }
    }
    connect(client, subTopic) {
        // Connect mqtt with credentials (in case of needed, otherwise we can omit 2nd param)
        this.mqttClient = mqtt.connect(this.host, { clientId: client, ...this.connectOptions });

        // Mqtt error calback
        this.mqttClient.on('error', (err) => {
            this.mqttClient.end();
        });

        // Connection callback
        this.mqttClient.on('connect', () => {
            console.log(`mqtt client connected`);
        });

        // mqtt subscriptions
        this.mqttClient.subscribe(subTopic, { qos: 0 });

        // When a message arrives, console.log it
        this.mqttClient.on('message', function (topic, message) {
            console.log(topic);
            console.log(message.toString());
        });

        this.mqttClient.on('close', () => {
            console.log(`mqtt client disconnected`);
        });
    }

    // Sends a mqtt message to topic: mytopic
    sendMessage(pubTopic, message) {
        this.mqttClient.publish(pubTopic, message, { qos: 1, retain: true });
    }
}

module.exports = MqttHandler;