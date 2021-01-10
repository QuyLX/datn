var mqttHandler = require('../mqtt_broker/connBroker');

var mqttClient = new mqttHandler();
mqttClient.connect('client_2');
// mqttClient.sendMessage( '5fe9edc1fc38fb15108dfa4b/Đèn','client_2');
mqttClient.receiveMessage("5fe9edc1fc38fb15108dfa4b/Đèn")