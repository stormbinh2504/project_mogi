import axios from '../axios';
import * as queryString from 'query-string';
let REACT_APP_BASE_URL_API = process.env.REACT_APP_BASE_URL_API

// let BASE_URL_API = process.env.REACT_APP_PAYPAL_CLIENT_ID

const globalService = {
    getProvinceAll() {
        return axios.get(`${REACT_APP_BASE_URL_API}province/findAll`)
    },
    
    getFindAllDistrictsByProvinceCode(provinceCode) {
        var queryParams = {
            provinceCode
        };
        return axios.get(`${REACT_APP_BASE_URL_API}districts/findAllByProvinceCode?` + queryString.stringify(queryParams))
    },
}

export default globalService