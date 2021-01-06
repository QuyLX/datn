import {
    REGISTER_FAIL,
    REGISTER_SUCCESS,
    LOGIN_FAIL,
    LOGIN_SUCCESS,
    LOG_OUT,
    USER_LOADED,
    AUTH_ERROR,
    RESET_PASSWORD_FAIL,
    RESET_PASSWORD_REQUEST,
    RESET_PASSWORD_SUCCESS
} from '../constants/userConstant';

const initialState = {
    token: localStorage.getItem('token'),
    isAuthenticated: null,
    isLoaded: true,
    user: null
}

export default function (state = initialState, action) {
    const { type, payload } = action;
    switch (type) {
        case USER_LOADED:
            return {
                ...state,
                user: payload,
                isAuthenticated: true,
                isLoaded: false,
            };
        case REGISTER_SUCCESS:
        case LOGIN_SUCCESS:
            localStorage.setItem('token', payload.token)
            return {
                ...state,
                ...payload,
                isAuthenticated: true,
                isLoaded: false
            };
        case REGISTER_FAIL:
        case LOGIN_FAIL:
        case LOG_OUT:
        case AUTH_ERROR:
            localStorage.removeItem('token')
            return {
                token: null,
                isAuthenticated: false,
                isLoaded: false,
                user: null
            };
        default:
            return state;
    }

}
export const resetPassword = (state = {}, action) => {
    switch (action.type) {
        case RESET_PASSWORD_REQUEST:
            return { loading: true }
        case RESET_PASSWORD_SUCCESS:
            return { loading: false, success: true }
        case RESET_PASSWORD_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state
    }
}