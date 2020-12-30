import {
    REGISTER_FAIL,
    REGISTER_SUCCESS,
    LOGIN_FAIL,
    LOGIN_SUCCESS,
    LOG_OUT,
    USER_LOADED,
    AUTH_ERROR
} from '../constants';

const initialState = {
    accessToken: localStorage.getItem('accessToken'),
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
                user:payload,
                isAuthenticated: true,
                isLoaded: false,
            };
        case REGISTER_SUCCESS:
        case LOGIN_SUCCESS:
            localStorage.setItem('accessToken', payload.accessToken)
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
            localStorage.removeItem('accessToken')
            return {
                accessToken: null,
                isAuthenticated: false,
                isLoaded: false,
                user: null
            };

        default:
            return state;
    }

}