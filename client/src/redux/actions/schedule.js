import axios from 'axios'
import {
    SCHEDULE_CREATE_FAIL,
    SCHEDULE_CREATE_REQUEST,
    SCHEDULE_CREATE_SUCCESS,
    SCHEDULE_DELETE_FAIL,
    SCHEDULE_DELETE_REQUEST,
    SCHEDULE_DELETE_SUCCESS,
    SCHEDULE_DETAILS_FAIL,
    SCHEDULE_DETAILS_REQUEST,
    SCHEDULE_DETAILS_SUCCESS,
    SCHEDULE_LIST_DEVICE_FAIL,
    SCHEDULE_LIST_DEVICE_REQUEST,
    SCHEDULE_LIST_DEVICE_SUCCESS,
    SCHEDULE_LIST_FAIL,
    SCHEDULE_LIST_REQUEST,
    SCHEDULE_LIST_SUCCESS,
    SCHEDULE_UPDATE_FAIL,
    SCHEDULE_UPDATE_REQUEST,
    SCHEDULE_UPDATE_SUCCESS
} from '../constants/scheduleConstant';

export const getSchedules = () => async dispatch => {
    try {
        dispatch({ type: SCHEDULE_LIST_REQUEST });
        const data = await axios.get('/api/schedules');
        dispatch({ type: SCHEDULE_LIST_SUCCESS, payload: data })
    } catch (error) {
        dispatch({ type: SCHEDULE_LIST_FAIL, payload: error })
    }
}

export const getSchedulesPerDevice = deviceId => async dispatch => {
    try {
        dispatch({ type: SCHEDULE_LIST_DEVICE_REQUEST });
        const data = await axios.get(`/api/devices/:${ deviceId }/schedules`);
        dispatch({ type: SCHEDULE_LIST_DEVICE_SUCCESS, payload: data })
    } catch (error) {
        dispatch({ type: SCHEDULE_LIST_DEVICE_FAIL, payload: error })
    }
}

export const getSchedule = id => async dispatch => {
    try {
        dispatch({ type: SCHEDULE_DETAILS_REQUEST });
        const data = await axios.get(`/api/schedules/:${ id }`);
        dispatch({ type: SCHEDULE_DETAILS_SUCCESS, payload: data })
    } catch (error) {
        dispatch({ type: SCHEDULE_DETAILS_FAIL, payload: error })
    }
}


export const addSchedule = (deviceId, schedule) => async dispatch => {
    try {
        dispatch({ type: SCHEDULE_CREATE_REQUEST });

        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
        }
        const data = await axios.post(`/api/devices/:${ deviceId}/schedules`, schedule, config)
        dispatch({ type: SCHEDULE_CREATE_SUCCESS, payload: data })
    } catch (error) {
        dispatch({ type: SCHEDULE_CREATE_FAIL, payload: error })
    }
}

export const updateSchedule = (id, schedule) => async dispatch => {
    try {
        dispatch({ type: SCHEDULE_UPDATE_REQUEST });
        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
        }
        const data = await axios.put(`/api/schedules/:${ id }`, schedule, config);
        dispatch({ type: SCHEDULE_UPDATE_SUCCESS, payload: data })
    } catch (error) {
        dispatch({ type: SCHEDULE_UPDATE_FAIL, payload: error })
    }
}


export const deleteSchedule = id => async dispatch => {
    try {
        dispatch({ type: SCHEDULE_DELETE_REQUEST });

        const data = await axios.delete(`/api/schedules/:${ id }`);
        dispatch({ type: SCHEDULE_DELETE_SUCCESS, payload: data })
    } catch (error) {
        dispatch({ type: SCHEDULE_DELETE_FAIL, payload: error })
    }
}