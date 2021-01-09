var mqttHandler = require('../mqtt_broker/connBroker');

var mqttClient = new mqttHandler();
mqttClient.connect('client_2', '5fec130fb862eb3150264a04/alrm2');
