import { GLOBALTYPES } from '../actions/globalTypes'
import { TYPE_USER } from './../../utils';

const initialState = {
    typeUser: TYPE_USER.CUSTOMER,
}

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case "SET_TYPE_USER":
            return {
                ...state,
                typeUser: action.data,
            };
        default:
            return state;
    }
}


export default authReducer