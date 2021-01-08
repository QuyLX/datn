import axios from 'axios';
import {
    HISTORY_LIST_DEVICE_FAIL,
    HISTORY_LIST_DEVICE_REQUEST,
    HISTORY_LIST_DEVICE_SUCCESS,
    HISTORY_LIST_FAIL,
    HISTORY_LIST_REQUEST,
    HISTORY_LIST_SUCCESS
} from '../constants/historyConstant';

export const getHistories = () => async dispatch => {
    try {
        dispatch({ type: HISTORY_LIST_REQUEST });
        const { data } = await axios.get('/api/histories');
        dispatch({ type: HISTORY_LIST_SUCCESS, payload: data })
    } catch (error) {
        dispatch({ type: HISTORY_LIST_FAIL, payload: error })
    }
}

export const getHistoriesPerDevice = deviceId => async dispatch => {
    try {
        dispatch({ type: HISTORY_LIST_DEVICE_REQUEST });
        const { data } = await axios.get(`/api/devices/${ deviceId }/histories`);
        dispatch({ type: HISTORY_LIST_DEVICE_SUCCESS, payload: data })
    } catch (error) {
        dispatch({ type: HISTORY_LIST_DEVICE_FAIL, payload: error })
    }
}