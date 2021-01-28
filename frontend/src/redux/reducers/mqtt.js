import {
  CONNECT,
  DISCONNECT,
  MESSAGE_ARRIVED,
  SENSOR
} from "../constants/mqttConstant";

const initialState = {
  isConnect: false,
  msg: [],
  msgSensor: [],
};

export const mqtt = (state = initialState, action) => {
  switch (action.type) {
    case CONNECT:
      return {
        isConnect: true,
        msg: [],
        msgSensor: [],
      };
    case MESSAGE_ARRIVED:
      return {
        ...state,
        isConnect: true,
        msg: [...state.msg, action.payload],
      };
    case SENSOR:
      return {
        ...state,
        isConnect: true,
        msgSensor: action.payload,
      };
    case DISCONNECT:
      return {
        isConnect: false,
        msg: [],
        msg: [],
      };
    default:
      return state;
  }
};
