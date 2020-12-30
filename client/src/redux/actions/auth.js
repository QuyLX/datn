import axios from 'axios'
import jwtDecode from 'jwt-decode';
import setAuthToken from '../../utils/setAuthToken'
import {
    REGISTER_FAIL,
    REGISTER_SUCCESS,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOG_OUT,
    USER_LOADED,
    AUTH_ERROR
} from '../constants';

// loaduser
export const loaduser = () => dispatch => {
    let accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
        setAuthToken(localStorage.accessToken)
        let userData = jwtDecode(accessToken)
        dispatch({
            type: USER_LOADED,
            payload: userData
        })
    } else dispatch({ type: AUTH_ERROR })
}

// register user
export const register = ({ username, password }) => async dispatch => {
    const config = {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    }
    const body = { username, password };

    try {
        const res = await axios.post('https://server.makipos.net:3029/users', body, config);
        dispatch({
            type: REGISTER_SUCCESS,
            payload: res.data
        })
    } catch (err) {
        dispatch({
            type: REGISTER_FAIL
        })
    }
}

// login 
export const login = ({ username, password }) => async dispatch => {
    const strategy = "local";
    const authCode = false;
    const config = {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    }
    const body = JSON.stringify({ authCode, strategy, username, password });
    try {
        const res = await axios.post('http://server.makipos.net:3028/users/authentication?_v=1', body, config);
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
export const logout = () => dispatch => {
    dispatch({
        type: LOG_OUT
    })
}