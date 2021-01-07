import {
    HISTORY_LIST_DEVICE_FAIL,
    HISTORY_LIST_DEVICE_REQUEST,
    HISTORY_LIST_DEVICE_SUCCESS,
    HISTORY_LIST_FAIL,
    HISTORY_LIST_REQUEST,
    HISTORY_LIST_SUCCESS
} from '../constants/historyConstant';
export const historyList = (state = { data: {}}, action) => {
    switch (action.type) {
        case HISTORY_LIST_REQUEST:
            return { loading: true }
        case HISTORY_LIST_SUCCESS:
            return {
                loading: false,
                data: action.payload,
            }
        case HISTORY_LIST_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state
    }
}
export const historyListPerDevice = (state = { data: {}}, action) => {
    switch (action.type) {
        case HISTORY_LIST_DEVICE_REQUEST:
            return { loading: true }
        case HISTORY_LIST_DEVICE_SUCCESS:
            return {
                loading: false,
                data: action.payload,
            }
        case HISTORY_LIST_DEVICE_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state
    }
}
