import axios from 'axios';
import {
    DEVICE_CONTROL_FAIL,
    DEVICE_CONTROL_REQUEST,
    DEVICE_CONTROL_SUCCESS,
    DEVICE_CREATE_FAIL,
    DEVICE_CREATE_REQUEST,
    DEVICE_CREATE_SUCCESS,
    DEVICE_DELETE_FAIL,
    DEVICE_DELETE_REQUEST,
    DEVICE_DELETE_SUCCESS,
    DEVICE_DETAILS_FAIL,
    DEVICE_DETAILS_REQUEST,
    DEVICE_DETAILS_SUCCESS,
    DEVICE_LIST_FAIL,
    DEVICE_LIST_SUCCESS,
    DEVICE_LIST_REQUEST,
    DEVICE_LIST_ROOM_FAIL,
    DEVICE_LIST_ROOM_REQUEST,
    DEVICE_LIST_ROOM_SUCCESS,
    DEVICE_UPDATE_FAIL,
    DEVICE_UPDATE_REQUEST,
    DEVICE_UPDATE_SUCCESS
} from '../constants/deviceConstant';

export const getDevices = () => async dispatch => {
    try {
        dispatch({ type: DEVICE_LIST_REQUEST });
        const { data } = await axios.get('/api/devices');
        dispatch({ type: DEVICE_LIST_SUCCESS, payload: data })
    } catch (error) {
        dispatch({ type: DEVICE_LIST_FAIL, payload: error })
    }
}

export const getDevicesInRoom = roomId => async dispatch => {
    try {
        dispatch({ type: DEVICE_LIST_ROOM_REQUEST });
        const { data } = await axios.get(`/api/rooms/${ roomId }/devices`);
        dispatch({ type: DEVICE_LIST_ROOM_SUCCESS, payload: data })
    } catch (error) {
        dispatch({ type: DEVICE_LIST_ROOM_FAIL, payload: error })
    }
}

export const getDevice = id => async dispatch => {
    try {
        dispatch({ type: DEVICE_DETAILS_REQUEST });
        const { data } = await axios.get(`/api/devices/${ id }`);
        dispatch({ type: DEVICE_DETAILS_SUCCESS, payload: data })
    } catch (error) {
        dispatch({ type: DEVICE_DETAILS_FAIL, payload: error })
    }
}


export const addDevice = (roomId, device) => async dispatch => {
    try {
        dispatch({ type: DEVICE_CREATE_REQUEST });

        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
        }
        const { data } = await axios.post(`/api/rooms/${ roomId }/devices`, device, config)
        dispatch({ type: DEVICE_CREATE_SUCCESS, payload: data })
    } catch (error) {
        dispatch({ type: DEVICE_CREATE_FAIL, payload: error })
    }
}

export const updateDevice = (id, device) => async dispatch => {
    try {
        dispatch({ type: DEVICE_UPDATE_REQUEST });
        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
        }
        const { data } = await axios.put(`/api/devices/${ id }`, device, config);
        dispatch({ type: DEVICE_UPDATE_SUCCESS, payload: data })
    } catch (error) {
        dispatch({ type: DEVICE_UPDATE_FAIL, payload: error })
    }
}



export const deleteDevice = id => async dispatch => {
    try {
        dispatch({ type: DEVICE_DELETE_REQUEST });

        const { data } = await axios.delete(`/api/devices/${ id }`);
        dispatch({ type: DEVICE_DELETE_SUCCESS, payload: data })
    } catch (error) {
        dispatch({ type: DEVICE_DELETE_FAIL, payload: error })
    }
}

export const controlDevice = (id, state) => async dispatch => {
    try {
        dispatch({ type: DEVICE_CONTROL_REQUEST });
        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
        }
        const { data } = await axios.put(`/api/devices/${ id }/control`, state, config);
        dispatch({ type: DEVICE_CONTROL_SUCCESS, payload: data })
    } catch (error) {
        dispatch({ type: DEVICE_CONTROL_FAIL, payload: error })
    }
}