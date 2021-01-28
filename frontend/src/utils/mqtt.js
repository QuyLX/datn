import mqtt from "mqtt";

const connectOptions = {
  username: process.env.REACT_APP_MQTT_USERNAME,
  password: process.env.REACT_APP_MQTT_PASSWORD,
  keepalive: 120,
  reconnectPeriod: 5000,
};

/* Connect to broker and return client */
export const mqttClient = mqtt.connect(
  process.env.REACT_APP_MQTT_BROKER_URL,
  connectOptions
);
