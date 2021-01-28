import {
  CONNECT,
  DISCONNECT,
  MESSAGE_ARRIVED,
  SENSOR,
} from "../constants/mqttConstant";
import mqtt from "mqtt";

const connectOptions = {
  username: process.env.REACT_APP_MQTT_USERNAME,
  password: process.env.REACT_APP_MQTT_PASSWORD,
  keepalive: 120,
  reconnectPeriod: 5000,
};

const mqttClient = mqtt.connect(
  process.env.REACT_APP_MQTT_BROKER_URL,
  connectOptions
);

export const connect = () => (dispatch) => {
  mqttClient.on("connect", () => {
    dispatch({ type: CONNECT });
  });
  mqttClient.on("error", () => {
    dispatch({ type: DISCONNECT });
    mqttClient.end();
  });
  mqttClient.on("message", (topic, message, packet) => {
    topic === "600869dc38aeae2a8076ff79/60086a2238aeae2a8076ff7d"
      ? dispatch(sensor(message.toString(), topic))
      : dispatch(handleMsg(message.toString(), topic));
  });
};

export const disconnect = () => (dispatch) => {
  dispatch({ type: DISCONNECT });
  mqttClient.end();
};

export const handleMsg = (message, topic) => (dispatch) => {
  dispatch({
    type: MESSAGE_ARRIVED,
    payload: { msg: message, topic: topic },
  });
};
export const sensor = (message, topic) => (dispatch) =>
{
  const msg = message.split(' ')
  dispatch({
    type: SENSOR,
    payload: { msg: msg, topic: topic },
  });
};
export const subscribe = (topics) => (dispatch) => {
  mqttClient.subscribe(topics, { qos: 1 }, (error) => {
    error && dispatch({ type: DISCONNECT });
  });
};
