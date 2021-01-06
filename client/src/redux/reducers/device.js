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

export const deviceList = (state = { data: [] }, action) => {
    switch (action.type) {
        case DEVICE_LIST_REQUEST:
            return { loading: true, data: [] }
        case DEVICE_LIST_SUCCESS:
            return {
                loading: false,
                data: action.payload,
            }
        case DEVICE_LIST_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state
    }
}
export const deviceListInRoom = (state = { data: [] }, action) => {
    switch (action.type) {
        case DEVICE_LIST_ROOM_REQUEST:
            return { loading: true, data: [] }
        case DEVICE_LIST_ROOM_SUCCESS:
            return {
                loading: false,
                data: action.payload,
            }
        case DEVICE_LIST_ROOM_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state
    }
}

export const deviceDetail = (state = { device: {} }, action) => {
    switch (action.type) {
        case DEVICE_DETAILS_REQUEST:
            return { loading: true, data: {} }
        case DEVICE_DETAILS_SUCCESS:
            return {
                loading: false,
                device: action.payload,
            }
        case DEVICE_DETAILS_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state
    }
}

export const createDevice = (state = {}, action) => {
    switch (action.type) {
        case DEVICE_CREATE_REQUEST:
            return { loading: true }
        case DEVICE_CREATE_SUCCESS:
            return {
                loading: false,
                data: action.payload,
            }
        case DEVICE_CREATE_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state
    }
}

export const updateDevice = (state = { device: {} }, action) => {
    switch (action.type) {
        case DEVICE_UPDATE_REQUEST:
            return { loading: true }
        case DEVICE_UPDATE_SUCCESS:
            return {
                loading: false,
                device: action.payload,
            }
        case DEVICE_UPDATE_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state
    }
}


export const deleteDevice = (state = {}, action) => {
    switch (action.type) {
        case DEVICE_DELETE_REQUEST:
            return { loading: true }
        case DEVICE_DELETE_SUCCESS:
            return {
                loading: false,
                data: action.payload,
            }
        case DEVICE_DELETE_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state
    }
}

export const controlDevice = (state = { device: {} }, action) => {
    switch (action.type) {
        case DEVICE_CONTROL_REQUEST:
            return { loading: true }
        case DEVICE_CONTROL_SUCCESS:
            return {
                loading: false,
                device: action.payload,
            }
        case DEVICE_CONTROL_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state
    }
}