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
    let token = localStorage.getItem("token");
    if (token) {
        console.log(token);
        setAuthToken(localStorage.token)
        let userData = jwtDecode(token)
        dispatch({
            type: USER_LOADED,
            payload: userData
        })
    } else dispatch({ type: AUTH_ERROR })
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
export const logout = () => dispatch => {
    dispatch({
        type: LOG_OUT
    })
}