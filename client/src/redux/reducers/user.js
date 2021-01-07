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

export const userList = (state = { data: {}}, action) => {
    switch (action.type) {
        case USER_LIST_REQUEST:
            return { loading: true }
        case USER_LIST_SUCCESS:
            return {
                loading: false,
                data: action.payload,
            }
        case USER_LIST_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state
    }
}
export const userListPerDevice = (state = { data: {}}, action) => {
    switch (action.type) {
        case USER_LIST_DEVICE_REQUEST:
            return { loading: true }
        case USER_LIST_DEVICE_SUCCESS:
            return {
                loading: false,
                data: action.payload,
            }
        case USER_LIST_DEVICE_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state
    }
}

export const userDetail = (state = {}, action) => {
    switch (action.type) {
        case USER_DETAILS_REQUEST:
            return { loading: true, }
        case USER_DETAILS_SUCCESS:
            return {
                loading: false,
                data: action.payload,
            }
        case USER_DETAILS_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state
    }
}

export const createUser = (state = {}, action) => {
    switch (action.type) {
        case USER_CREATE_REQUEST:
            return { loading: true }
        case USER_CREATE_SUCCESS:
            return {
                loading: false,
                data: action.payload,
            }
        case USER_CREATE_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state
    }
}
export const addUserToUseDevice = (state = {}, action) => {
    switch (action.type) {
        case ADD_USER_USE_DEVICE_REQUEST:
            return { loading: true }
        case ADD_USER_USE_DEVICE_SUCCESS:
            return {
                loading: false,
                data: action.payload,
            }
        case ADD_USER_USE_DEVICE_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state
    }
}

export const updateUser = (state = {}, action) => {
    switch (action.type) {
        case USER_UPDATE_REQUEST:
            return { loading: true }
        case USER_UPDATE_SUCCESS:
            return {
                loading: false,
                data: action.payload,
            }
        case USER_UPDATE_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state
    }
}


export const deleteUser = (state = {}, action) => {
    switch (action.type) {
        case USER_DELETE_REQUEST:
            return { loading: true }
        case USER_DELETE_SUCCESS:
            return {
                loading: false,
                data: action.payload,
            }
        case USER_DELETE_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state
    }
}

export const removeUserToUseDevice = (state = {}, action) => {
    switch (action.type) {
        case USER_REMOVE_REQUEST:
            return { loading: true }
        case USER_REMOVE_SUCCESS:
            return {
                loading: false,
                data: action.payload,
            }
        case USER_REMOVE_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state
    }
}