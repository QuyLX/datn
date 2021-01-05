const mqtt = require("mqtt");

const client = mqtt.connect("mqtt://localhost:1883");

client.on("connect", ack => {
    console.log("connected!");
    // console.log(ack);
    client.subscribe("ESP8266/LED_GPIO2/status", err => {
        console.log(err);
    });
    client.subscribe("test", err => {
        console.log(err);
    });
    client.subscribe("ESP8266/connection/board", err => {
        console.log(err);
    });

    client.on("message", (topic, message) => {
        console.log(topic);
        // message is Buffer
        console.log(message.toString());
    });
});

client.on("error", err => {
    console.log(err);
});