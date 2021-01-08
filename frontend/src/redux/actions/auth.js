import axios from 'axios'
import setAuthToken from '../../utils/setAuthToken'
import {
    REGISTER_FAIL,
    REGISTER_SUCCESS,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOG_OUT,
    USER_LOADED,
    AUTH_ERROR,
    RESET_PASSWORD_FAIL,
    RESET_PASSWORD_REQUEST,
    RESET_PASSWORD_SUCCESS
} from '../constants/userConstant';
import { getRooms } from './room'
import { getUsers } from './user'
import { getDevices } from './device'
// loaduser
export const loaduser = () => async dispatch => {
    let token = localStorage.getItem("token");
    if (token) {
        setAuthToken(localStorage.token);
        try {
            const res = await axios.get('/api/auth/me');
            dispatch({
                type: USER_LOADED,
                payload: res.data
            })
            await Promise.all([
                dispatch(getRooms()),
                dispatch(getUsers()),
                dispatch(getDevices())
            ])
        } catch (err) {
            dispatch({
                type: AUTH_ERROR
            })
        }
    }
}

// register user
export const register = ({ name, email, password }) => async dispatch => {
    const config = {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    }
    const body = { name, email, password };

    try {
        const res = await axios.post('api/auth/register', body, config);
        dispatch({
            type: REGISTER_SUCCESS,
            payload: res.data
        })
        dispatch(loaduser())
    } catch (err) {
        dispatch({
            type: REGISTER_FAIL
        })
    }
}

// login 
export const login = ({ email, password }) => async dispatch => {
    const config = {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    }
    const body = JSON.stringify({ email, password });
    try {
        const res = await axios.post('api/auth/login', body, config);
        dispatch({
            type: LOGIN_SUCCESS,
            payload: res.data
        })
        dispatch(loaduser())
    } catch (err) {
        dispatch({
            type: LOGIN_FAIL
        })
    }
}

// logout
export const logout = () => async dispatch => {
    try {
        await axios.get('/api/auth/logout');
        dispatch({
            type: LOG_OUT
        })
    } catch (err) {
        dispatch({
            type: AUTH_ERROR
        })
    }
}

// Reset password
export const resetPassword = (id, newPassword) => async dispatch => {
    try {
        dispatch({ type: RESET_PASSWORD_REQUEST });
        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
        }

        const { data } = await axios.put(`/api/auth/resetpassword/${ id }`, newPassword, config);
        dispatch({ type: RESET_PASSWORD_SUCCESS, payload: data })
    } catch (error) {
        dispatch({ type: RESET_PASSWORD_FAIL, payload: error })
    }
}