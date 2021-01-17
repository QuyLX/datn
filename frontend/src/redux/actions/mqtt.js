import { CONNECT, DISCONNECT, MESSAGE_ARRIVED} from '../constants/mqttConstant';
import { mqttClient } from '../../utils/mqtt'

export const connect = () => dispatch => {
    try {
        mqttClient.on("connect", () => {
        console.log("connected");
        dispatch({type: CONNECT});
        mqttClient.subscribe("a", { qos: 1 }, (error) => {
            error && dispatch({type: DISCONNECT})
        });
        //handle incoming messages
         mqttClient.on('message',  (topic, message, packet) => {
            dispatch({type: MESSAGE_ARRIVED, data: message})
            console.log("message is " + message);
            console.log("topic is " + topic);
            console.log("packet is " + JSON.parse(packet));
        });
        //handle errors
        mqttClient.on("error",  (error) =>{
            console.log(error);
            dispatch({type: DISCONNECT})
        });

})
    } catch (error) {
     dispatch({type: DISCONNECT})

    }

}
export const disconnect = () => dispatch => {
    mqttClient.end();
    dispatch({type: DISCONNECT})
}

