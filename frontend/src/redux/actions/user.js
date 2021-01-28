import axios from 'axios';
import {
    USER_LIST_REQUEST,
    USER_LIST_SUCCESS,
    USER_LIST_FAIL,
    USER_LIST_DEVICE_REQUEST,
    USER_LIST_DEVICE_SUCCESS,
    USER_LIST_DEVICE_FAIL,
    ADD_USER_USE_DEVICE_REQUEST,
    ADD_USER_USE_DEVICE_SUCCESS,
    ADD_USER_USE_DEVICE_FAIL,
    USER_DETAILS_REQUEST,
    USER_DETAILS_SUCCESS,
    USER_DETAILS_FAIL,
    USER_UPDATE_REQUEST,
    USER_UPDATE_SUCCESS,
    USER_UPDATE_FAIL,
    USER_DELETE_REQUEST,
    USER_DELETE_SUCCESS,
    USER_DELETE_FAIL,
    USER_CREATE_REQUEST,
    USER_CREATE_SUCCESS,
    USER_CREATE_FAIL,
    USER_REMOVE_REQUEST,
    USER_REMOVE_SUCCESS,
    USER_REMOVE_FAIL
} from '../constants/userConstant';

export const getUsers = () => async dispatch => {
    try {
        dispatch({ type: USER_LIST_REQUEST });
        const { data } = await axios.get('/api/users');
        dispatch({ type: USER_LIST_SUCCESS, payload: data })
    } catch (error) {
        dispatch({ type: USER_LIST_FAIL, payload: error })
    }
}

export const getUsersInused = deviceId => async dispatch => {
    try {
        dispatch({ type: USER_LIST_DEVICE_REQUEST });
        const { data } = await axios.get(`/api/devices/${ deviceId}/users`);
        dispatch({ type: USER_LIST_DEVICE_SUCCESS, payload: data })
    } catch (error) {
        dispatch({ type: USER_LIST_DEVICE_FAIL, payload: error })
    }
}

export const getUser = id => async dispatch => {
    try {
        dispatch({ type: USER_DETAILS_REQUEST });
        const { data } = await axios.get(`/api/users/${ id }`);
        dispatch({ type: USER_DETAILS_SUCCESS, payload: data })
    } catch (error) {
        dispatch({ type: USER_DETAILS_FAIL, payload: error })
    }
}

export const createUser = user => async dispatch => {
    try {
        dispatch({ type: USER_CREATE_REQUEST });

        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
        }
        const { data } = await axios.post('/api/users', user, config)
        dispatch({ type: USER_CREATE_SUCCESS, payload: data })
    } catch (error) {
        dispatch({ type: USER_CREATE_FAIL, payload: error })
    }
}

export const updateUser = (id, user) => async dispatch => {
    try {
        dispatch({ type: USER_UPDATE_REQUEST });
        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
        }
        const { data } = await axios.put(`/api/users/${ id }`, user, config);
        dispatch({ type: USER_UPDATE_SUCCESS, payload: data })
    } catch (error) {
        dispatch({ type: USER_UPDATE_FAIL, payload: error })
    }
}

export const addUserToUseDevice = (deviceId, id) => async dispatch => {
    try {
        dispatch({ type: ADD_USER_USE_DEVICE_REQUEST });
        const { data } = await axios.put(`/api/devices/${ deviceId }/users/${ id }`);
        dispatch({ type: ADD_USER_USE_DEVICE_SUCCESS, payload: data })
    } catch (error) {
        dispatch({ type: ADD_USER_USE_DEVICE_FAIL, payload: error })
    }
}

export const removeUserToUseDevice = (deviceId, id) => async dispatch => {
    try {
        dispatch({ type: USER_REMOVE_REQUEST });
        const { data } = await axios.delete(`/api/devices/${ deviceId }/users/${ id }`);
        dispatch({ type: USER_REMOVE_SUCCESS, payload: data })
    } catch (error) {
        dispatch({ type: USER_REMOVE_FAIL, payload: error })
    }
}

export const deleteUser = id => async dispatch => {
    try {
        dispatch({ type: USER_DELETE_REQUEST });

        const { data } = await axios.delete(`/api/users/${ id }`);
        dispatch({ type: USER_DELETE_SUCCESS, payload: data })
    } catch (error) {
        dispatch({ type: USER_DELETE_FAIL, payload: error })
    }
}