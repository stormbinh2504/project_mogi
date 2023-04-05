import { GLOBALTYPES } from '../actions/globalTypes'

const initialState = {
    loading: false,
}

const alertReducer = (state = initialState, action) => {
    switch (action.type) {
        case GLOBALTYPES.ALERT:
            return {
                ...state,
                loading: action.payload,
            };
        default:
            return state;
    }
}


export default alertReducer
