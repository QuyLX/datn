import { combineReducers } from 'redux';
import changeState from './changeState';
import auth from './auth'

export default combineReducers({
    changeState,
    auth,
})