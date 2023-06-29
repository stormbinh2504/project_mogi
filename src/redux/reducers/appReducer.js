import actionTypes from '../actions/actionTypes'
import { TYPE_USER } from './../../utils';

const initialState = {
    typeUser: TYPE_USER.CUSTOMER,
    filterNews: {
        "nameSearch": null,
        "provinceCode": null,
        "districtCode": null,
        "codeTypeProperty": null,
        "codeCateTypePropertyCategory": null,
        "priceStart": null,
        "priceEnd": null,
        "areaMinRange": null,
        "areaMaxRange": null,
        "totalRoom": null,
        "rangeDaySearch": 365,
    }
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
        case "UPDATE_DATA_FILTER_NEWS":
            console.log("binh_filterNews", action.data)
            return {
                ...state,
                filterNews: {
                    ...state.filterNews,
                    ...action.data
                }
            };

        default:
            return state;
    }
}


export default appReducer