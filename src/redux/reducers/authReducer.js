import { GLOBALTYPES } from '../actions/globalTypes'

const initialState = {
    userInfor: {},
    isLogin: false,
}

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case GLOBALTYPES.AUTH:
            return {
                ...state,
                userInfor: action.payload,
            };
        case GLOBALTYPES.LOGIN_AUTHENTICATION:
            return {
                ...state,
                isLogin: action.payload,
            };
        default:
            return state;
    }
}


export default authReducer