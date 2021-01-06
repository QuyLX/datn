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

export const scheduleList = (state = { data: [] }, action) => {
    switch (action.type) {
        case SCHEDULE_LIST_REQUEST:
            return { loading: true, data: [] }
        case SCHEDULE_LIST_SUCCESS:
            return {
                loading: false,
                data: action.payload,
            }
        case SCHEDULE_LIST_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state
    }
}
export const scheduleListOnDevice = (state = { data: [] }, action) => {
    switch (action.type) {
        case SCHEDULE_LIST_DEVICE_REQUEST:
            return { loading: true, data: [] }
        case SCHEDULE_LIST_DEVICE_SUCCESS:
            return {
                loading: false,
                data: action.payload,
            }
        case SCHEDULE_LIST_DEVICE_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state
    }
}

export const scheduleDetail = (state = { data: {} }, action) => {
    switch (action.type) {
        case SCHEDULE_DETAILS_REQUEST:
            return { loading: true, data: {} }
        case SCHEDULE_DETAILS_SUCCESS:
            return {
                loading: false,
                data: action.payload,
            }
        case SCHEDULE_DETAILS_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state
    }
}

export const createSchedule = (state = {}, action) => {
    switch (action.type) {
        case SCHEDULE_CREATE_REQUEST:
            return { loading: true }
        case SCHEDULE_CREATE_SUCCESS:
            return {
                loading: false,
                data: action.payload,
            }
        case SCHEDULE_CREATE_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state
    }
}

export const updateSchedule = (state = { schedule: {} }, action) => {
    switch (action.type) {
        case SCHEDULE_UPDATE_REQUEST:
            return { loading: true }
        case SCHEDULE_UPDATE_SUCCESS:
            return {
                loading: false,
                schedule: action.payload,
            }
        case SCHEDULE_UPDATE_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state
    }
}


export const deleteSchedule = (state = {}, action) => {
    switch (action.type) {
        case SCHEDULE_DELETE_REQUEST:
            return { loading: true }
        case SCHEDULE_DELETE_SUCCESS:
            return {
                loading: false,
                data: action.payload,
            }
        case SCHEDULE_DELETE_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state
    }
}