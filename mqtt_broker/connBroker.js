const mqtt = require('mqtt');

class MqttHandler {
    constructor() {
        this.mqttClient = null;
        this.host = 'mqtt://localhost';
        this.connectOptions = {
            username: 'admin123',
            password: '123456',
            keepalive: 120,
            reconnectPeriod: 5000
        }
    }
    connect(client) {
        // Connect mqtt with credentials (in case of needed, otherwise we can omit 2nd param)
        this.mqttClient = mqtt.connect(this.host, { clientId: client, ...this.connectOptions });

        // Mqtt error calback
        this.mqttClient.on('error', (err) => {
            console.log(err);
            this.mqttClient.end();
        });

        // Connection callback
        this.mqttClient.on('connect', () => {
            console.log(`mqtt client connected`);
            this.mqttClient.end()
        });


        // When a message arrives, console.log it
        this.mqttClient.on('message', function (topic, message) {
            console.log(`${topic}`);
            console.log(message.toString());
        });

        this.mqttClient.on('close', () => {
            console.log(`mqtt client disconnected`);
        });
    }

    // Sends a mqtt message to topic: mytopic
    sendMessage(topic, message) {
        this.mqttClient.publish(topic, message, { qos: 1, retain: true });
    }
    // Receive message
    receiveMessage(topic) {
        this.mqttClient.subscribe(topic, { qos: 1 });
    }

}

module.exports = MqttHandler;