const mqtt = require("mqtt")


const connectOptions = {
    clientId: 'test',
    username: 'admin123',
    password: '123456',
    keepalive: 120,
    reconnectPeriod: 5000,
}

/* Connect to broker and return client */
const mqttClient = mqtt.connect('mqtt://localhost:1883', connectOptions);

/* Connecting to mqtt broker */
mqttClient.on("connect",  () => {
    try {
       
        mqttClient.subscribe("5fff1d7512b117dd602db2d3/5fff2dd27a1c781a10a06555", { qos: 1 }, (error) => {
            console.log(error);
        });
        //handle incoming messages
        mqttClient.on('message', async (topic, message, packet) => {
            console.log("message is " + message);
            console.log("topic is " + topic);
            console.log("packet is " + JSON.stringify(packet)) ;
        });
        //handle errors
        mqttClient.on("error", function (error) {
            console.log("Can't connect" + error);
            process.exit(1)
        });
    } catch (error) {
        console.log(error);
    }
})
