import React, { useState, useEffect } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { useSelector, useDispatch } from "react-redux";
import "./ModalEditAccount.scss"
import { Space, Table, Tag } from 'antd';
import DraggableModal from '../../../components/DraggableModal/DraggableModal';
import { alertType } from '../../../redux/actions';
import { ToastUtil, uploadImgToFireBase, deleteFromFirebase } from '../../../utils';
import { accountService, globalService } from '../../../services';
import DatePickerCustom from '../../../components/DatePickerCustom/DatePickerCustom';
import Select from 'react-select';
import _ from 'lodash';

const { Column, ColumnGroup } = Table;

const df_bodyUpdate = {
    codeClient: null,
    provinceCode: null,
    districtCode: null,
    wardsCode: null,
    introduces: null,
    phone: null,
    typeLoan: null,
    passport: null,
    url: null,
    firstName: null,
    lastName: null,
}

const ModalEditAccount = (props) => {
    const { isOpen, onClose, dataEdit, onHandleCallBack } = props
    const history = useHistory()
    const dispatch = useDispatch()
    const state = useSelector((state) => state);
    const { auth, app, user } = state
    const { userInfo } = user

    const [clientData, setClientData] = useState(df_bodyUpdate)
    const [provinceAll, setProvinceAll] = useState([])
    const [districtsAll, setDistrictsAll] = useState([])
    const [typeLoanAll, setTypeLoanAll] = useState([])

    const fetchGetProvinceAll = async () => {
        dispatch(alertType(true))
        await globalService.getProvinceAll()
            .then(res => {
                if (res && res.length > 0) {
                    let _provinceAll = res.map((item, index) => {
                        return { value: item.provinceCode, label: item.provinceName }
                    })
                    setProvinceAll(_provinceAll)
                    dispatch(alertType(false))
                }
            })
            .catch(error => {
                dispatch(alertType(false))
                ToastUtil.errorApi(error);
            });
    }

    const fetchGetFindAllDistrictsByProvinceCode = async (provinceCode) => {
        dispatch(alertType(true))
        await globalService.getFindAllDistrictsByProvinceCode(provinceCode)
            .then(res => {
                if (res && res.length > 0) {
                    let _districtsAll = res.map((item, index) => {
                        return { value: item.districtCode, label: item.districtName }
                    })
                    setDistrictsAll(_districtsAll)
                    dispatch(alertType(false))
                }
            })
            .catch(error => {
                dispatch(alertType(false))
                ToastUtil.errorApi(error);
            });
    }


    const fetchGetTypeLoanAll = async () => {
        dispatch(alertType(true))
        await globalService.getAllTypeLoan()
            .then(res => {
                if (res && res.length > 0) {
                    let _typeLoanAll = res.map((item, index) => {
                        return { value: item.value, label: item.name }
                    })
                    setTypeLoanAll(_typeLoanAll)
                    dispatch(alertType(false))
                }
            })
            .catch(error => {
                dispatch(alertType(false))
                ToastUtil.errorApi(error);
            });
    }

    const handleChangeInput = e => {
        const { name, value } = e.target
        setClientData({ ...clientData, [name]: value })
    }


    const validate = () => {
        const {
            codeClient,
            provinceCode,
            districtCode,
            wardsCode,
            introduces,
            phone,
            typeLoan,
            passport,
            url,
            firstName,
            lastName,
        } = clientData

        if (!firstName) {
            ToastUtil.error("Họ không được để trống")
            return false
        }
        if (!lastName) {
            ToastUtil.error("Tên không được để trống")
            return false
        }
        if (!phone) {
            ToastUtil.error("Số điện thoại không được để trống")
            return false
        }
        if (!provinceCode) {
            ToastUtil.error("Tỉnh/Thành phố không được để trống")
            return false
        }
        if (!districtCode) {
            ToastUtil.error("Quận/Huyện không được để trống")
            return false
        }

        return true
    }



    const onHandleUpdate = async () => {
        if (!validate()) {
            return
        }
        let body = {
            "codeClient": clientData.codeClient,
            "provinceCode": clientData.provinceCode,
            "districtCode": clientData.districtCode,
            "wardsCode": clientData.wardsCode,
            "introduces": clientData.introduces,
            "phone": clientData.phone,
            "typeLoan": clientData.typeLoan,
            "passport": clientData.passport,
            "url": clientData.url,
            // "url": urlFirebase,
            "firstName": clientData.firstName,
            "lastName": clientData.lastName,
        }

        dispatch(alertType(true))
        await accountService.updateInfoClient(body)
            .then(res => {
                dispatch(alertType(false))
                ToastUtil.success("Cập nhật thành công");
                onHandleCallBack()
                onClose()
            })
            .catch(error => {
                dispatch(alertType(false))
                ToastUtil.errorApi(error, "Cập nhật không thành công");
            });
    }

    useEffect(() => {
        fetchGetProvinceAll()
        fetchGetTypeLoanAll()
    }, []);


    useEffect(() => {
        setClientData({ ...dataEdit })
        if (dataEdit && dataEdit.provinceCode) {
            fetchGetFindAllDistrictsByProvinceCode(dataEdit.provinceCode)
        }
    }, [dataEdit]);


    const onChangeSelectProvince = (objValue) => {
        setClientData({ ...clientData, provinceCode: objValue.value })
        fetchGetFindAllDistrictsByProvinceCode(objValue.value)
    }

    const onChangeSelectDistrict = (objValue) => {
        setClientData({ ...clientData, districtCode: objValue.value })
    }

    const onChangeSelectTypeLoan = (objValue) => {
        setClientData({ ...clientData, typeLoan: objValue.value })
    }

    console.log("binh_check_ModalAddNewsManagement", { clientData })

    let textLength = clientData && clientData.introduces ? clientData.introduces.length : 0
    return (
        <DraggableModal
            isOpen={isOpen}
            onClose={onClose}
            className={"modal-edit-account"}
            titleId={"Sửa thông tin tài khoản"}
            toggle={onClose}
        >
            <div className="body">

                <div className="body-content-row row gutters-5">
                    <div className="col-12 col-sm-4 label">
                        Họ (*)
                    </div>
                    <div className="col-12 col-sm-8 value">
                        <div className="mg-form-control">
                            <input className="text-control" value={clientData.firstName} name="firstName"
                                onChange={handleChangeInput} />
                        </div>
                    </div>
                </div>

                <div className="body-content-row row gutters-5">
                    <div className="col-12 col-sm-4 label">
                        Tên (*)
                    </div>
                    <div className="col-12 col-sm-8 value">
                        <div className="mg-form-control">
                            <input className="text-control" value={clientData.lastName} name="lastName"
                                onChange={handleChangeInput} />
                        </div>
                    </div>
                </div>

                <div className="body-content-row row gutters-5">
                    <div className="col-12 col-sm-4 label">
                        Số điện thoại (*)
                    </div>
                    <div className="col-12 col-sm-8 value">
                        <div className="mg-form-control">
                            <input className="text-control" value={clientData.phone} name="phone"
                                onChange={handleChangeInput} />
                        </div>
                    </div>
                </div>

                <div className="body-content-row row gutters-5">
                    <div className="col-12 col-sm-4 label">
                        Tỉnh/Thành phố (*)
                    </div>
                    <div className="col-12 col-sm-8 value">
                        <div className="custom-input-react-select">
                            <Select
                                onChange={onChangeSelectProvince}
                                options={provinceAll}
                                value={
                                    provinceAll.filter((option) => {
                                        return option.value == clientData.provinceCode
                                    })
                                }
                            />
                        </div>
                    </div>
                </div>


                <div className="body-content-row row gutters-5">
                    <div className="col-12 col-sm-4 label">
                        Quận/Huyện (*)
                    </div>
                    <div className="col-12 col-sm-8 value">
                        <div className="custom-input-react-select">
                            <Select
                                defaultValue={clientData.districtCode}
                                onChange={onChangeSelectDistrict}
                                options={districtsAll}
                                value={
                                    districtsAll.filter((option) => {
                                        return option.value == clientData.districtCode
                                    })
                                }
                            />
                        </div>
                    </div>
                </div>

                <div className="body-content-row row gutters-5">
                    <div className="col-12 col-sm-4 label">
                        Tự giới thiệu
                    </div>
                    <div className="col-12 col-sm-8 value">
                        <div className="mg-form-control">
                            <textarea className="text-control"
                                cols="20"
                                maxlength="2000"
                                rows="8"
                                value={clientData.introduces} name="introduces"
                                onChange={handleChangeInput} />
                            <div class="ext-action">
                                <span class="ng-binding">
                                    {textLength}</span>/2000 kí tự
                            </div>
                        </div>

                    </div>

                </div>

                <div className="body-content-row row gutters-5">
                    <div className="container-action style-add">
                        <button class="btn btn-continue" onClick={onHandleUpdate} >
                            Cập nhật
                        </button>
                    </div>
                </div>
            </div >
        </DraggableModal >
    )
}

export default ModalEditAccount