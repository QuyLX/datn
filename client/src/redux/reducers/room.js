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

export const roomList = (state = { data: {}}, action) => {
    switch (action.type) {
        case ROOM_LIST_REQUEST:
            return { loading: true }
        case ROOM_LIST_SUCCESS:
            return {
                loading: false,
                data: action.payload,
            }
        case ROOM_LIST_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state
    }
}

export const roomDetail = (state = {}, action) => {
    switch (action.type) {
        case ROOM_DETAILS_REQUEST:
            return { loading: true }
        case ROOM_DETAILS_SUCCESS:
            return {
                loading: false,
                data: action.payload,
            }
        case ROOM_DETAILS_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state
    }
}

export const createRoom = (state = {}, action) => {
    switch (action.type) {
        case ROOM_CREATE_REQUEST:
            return { loading: true }
        case ROOM_CREATE_SUCCESS:
            return {
                loading: false,
                data: action.payload,
            }
        case ROOM_CREATE_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state
    }
}

export const updateRoom = (state = {}, action) => {
    switch (action.type) {
        case ROOM_UPDATE_REQUEST:
            return { loading: true }
        case ROOM_UPDATE_SUCCESS:
            return {
                loading: false,
                data: action.payload,
            }
        case ROOM_UPDATE_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state
    }
}


export const deleteRoom = (state = {}, action) => {
    switch (action.type) {
        case ROOM_DELETE_REQUEST:
            return { loading: true }
        case ROOM_DELETE_SUCCESS:
            return {
                loading: false,
                data: action.payload,
            }
        case ROOM_DELETE_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state
    }
}