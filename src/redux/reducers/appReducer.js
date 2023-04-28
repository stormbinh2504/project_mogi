import actionTypes from '../actions/actionTypes'
import { TYPE_USER } from './../../utils';

const initialState = {
    typeUser: TYPE_USER.CUSTOMER,
}

const appReducer = (state = initialState, action) => {
    switch (action.type) {
        case "SET_TYPE_USER":
            return {
                ...state,
                typeUser: action.data,
            };
        case actionTypes.USER_LOGOUT:
            return {
                ...state,
                ...initialState
            };
        default:
            return state;
    }
}


export default appReducer