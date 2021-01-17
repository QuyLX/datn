const mqtt = require("mqtt");
const connectOptions = {
    clientId: 'pub',
    username: 'admin123',
    password: '123456',
    keepalive: 120,
    reconnectPeriod: 5000,
}
const client = mqtt.connect("mqtt://localhost:1883", connectOptions);

client.on("connect", ack => {
	console.log("connected!");

	setInterval(_ => {
		client.publish("test", "Hello mqtt " + new Date().getTime());
	}, 3000);
	
	setInterval(_ => {
		client.publish("ESP8266/LED_GPIO2/status", "on");
	}, 8000);
});

client.on("error", err => {
	console.log(err);
});