import { CONNECT, DISCONNECT, MESSAGE_ARRIVED} from '../constants/mqttConstant';


export const mqtt = (state = {}, action) => {
    switch (action.type) {
        case CONNECT:
            return {
                ...state,
                isConnect: true
             }
        case MESSAGE_ARRIVED:
            return {
               ...state,
               msg: action.payload
            }
        case DISCONNECT:
            return { 
                ...state,
                isConnect: false,
             }
        default:
            return state
    }
}