import axios from 'axios';
import {
    ROOM_CREATE_FAIL,
    ROOM_CREATE_REQUEST,
    ROOM_CREATE_SUCCESS,
    ROOM_DELETE_FAIL,
    ROOM_DELETE_REQUEST,
    ROOM_DELETE_SUCCESS,
    ROOM_DETAILS_FAIL,
    ROOM_DETAILS_REQUEST,
    ROOM_DETAILS_SUCCESS,
    ROOM_LIST_FAIL,
    ROOM_LIST_REQUEST,
    ROOM_LIST_SUCCESS,
    ROOM_UPDATE_FAIL,
    ROOM_UPDATE_REQUEST,
    ROOM_UPDATE_SUCCESS,
} from '../constants/roomConstant';

export const getRooms = () => async dispatch => {
    try {
        dispatch({ type: ROOM_LIST_REQUEST });
        const { data } = await axios.get('/api/rooms');
        dispatch({ type: ROOM_LIST_SUCCESS, payload: data })
    } catch (error) {
        dispatch({ type: ROOM_LIST_FAIL, payload: error })
    }
}

export const getRoom = id => async dispatch => {
    try {
        dispatch({ type: ROOM_DETAILS_REQUEST });
        const { data } = await axios.get(`/api/rooms/${ id }`);
        dispatch({ type: ROOM_DETAILS_SUCCESS, payload: data })
    } catch (error) {
        dispatch({ type: ROOM_DETAILS_FAIL, payload: error })
    }
}

export const addRoom = roomInfo => async dispatch => {
    try {
        dispatch({ type: ROOM_CREATE_REQUEST });

        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
        }
        const { data } = await axios.post('/api/rooms', roomInfo, config)
        dispatch({ type: ROOM_CREATE_SUCCESS, payload: data })
    } catch (error) {
        dispatch({ type: ROOM_CREATE_FAIL, payload: error })
    }
}

export const updateRoom = (id, room) => async dispatch => {
    try {
        dispatch({ type: ROOM_UPDATE_REQUEST });

        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
        }
        const { data } = await axios.put(`/api/rooms/${ id }`, room, config)
        dispatch({ type: ROOM_UPDATE_SUCCESS, payload: data })
    } catch (error) {
        dispatch({ type: ROOM_UPDATE_FAIL, payload: error })
    }
}

export const deleteRoom = (id) => async dispatch => {
    try {
        dispatch({ type: ROOM_DELETE_REQUEST });

        const { data } = await axios.delete(`/api/rooms/${ id }`)
        dispatch({ type: ROOM_DELETE_SUCCESS, payload: data })
    } catch (error) {
        dispatch({ type: ROOM_DELETE_FAIL, payload: error })
    }
}