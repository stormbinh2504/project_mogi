import { GLOBALTYPES } from './globalTypes'
import { postDataAPI } from '../../utils/fetchData'
import { Link, useHistory } from 'react-router-dom'
// import { browserHistory } from 'react-router'
import { push } from "connected-react-router";

export const setTypeUser = (type) => async (dispatch) => {
    dispatch({
        type: "SET_TYPE_USER",
        data: type
    })
}