import { SET_RESPONSIVE } from '../constants/responsive'

export const changeState = (val) => dispatch => {
    dispatch({
        type: SET_RESPONSIVE,
        payload: val
    })
}