
var mqttHandler = require('./mqttHandler');


var mqttClient = new mqttHandler();
console.log(mqttClient.connected);
mqttClient.sendMessage("alo", 'myTopic');