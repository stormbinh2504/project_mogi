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

    getFindAllWardsByDistrictCode(districtsCode) {
        var queryParams = {
            districtsCode
        };
        return axios.get(`${REACT_APP_BASE_URL_API}wards/findAllByDistrictCode?` + queryString.stringify(queryParams))
    },

    getAllTypeLoan() {
        return axios.get(`${REACT_APP_BASE_URL_API}common/findAllTypeLoan`)
    },

    getAllTypePropertyCategory() { // Loại bất động sản
        return axios.get(`${REACT_APP_BASE_URL_API}common/findAllTypePropertyCategory`)
    },

    getAllCodeTypeProperty(codeTypePropertyCategory) {  // Lấy chi tiết theo loại bất động sản
        var queryParams = {
            codeTypePropertyCategory
        };
        return axios.get(`${REACT_APP_BASE_URL_API}typepropery/findAllByCodeTypeProperty?` + queryString.stringify(queryParams))
        // return axios.get(`${REACT_APP_BASE_URL_API}typepropery/findAllByCodeTypePropertyCategory?` + queryString.stringify(queryParams))
    },

    getAllLawCategory() { // Lấy ra loại pháp lý
        return axios.get(`${REACT_APP_BASE_URL_API}common/findAllLawCategory`)
    },

    getAllTypeAccount() { // Lấy ra loại tài khoản
        return axios.get(`${REACT_APP_BASE_URL_API}common/findAllTypeAccount`)
    },

    getAllStatusNews() { // Lấy ra danh sách trạng thái tin
        return axios.get(`${REACT_APP_BASE_URL_API}common/findAllStatusNews`)
    },

}

export default globalService