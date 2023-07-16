import React, { useState, useEffect } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { useSelector, useDispatch } from "react-redux";
import "./ModalDetailAccount.scss"
import { Space, Table, Tag } from 'antd';
import DraggableModal from '../../../components/DraggableModal/DraggableModal';
import { alertType } from '../../../redux/actions';
import { accountService, globalService } from '../../../services';
import { CommonUtils, ToastUtil } from '../../../utils';



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

const ModalDetailAccount = (props) => {
    const { isOpen, onClose, dataDetail } = props
    const history = useHistory()
    const dispatch = useDispatch()
    const state = useSelector((state) => state);
    const { auth, app, user } = state
    const { userInfo } = user
    const [clientData, setClientData] = useState(df_bodyUpdate);
    const [provinceAll, setProvinceAll] = useState([])
    const [districtsAll, setDistrictsAll] = useState([])


    useEffect(() => {
        fetchGetProvinceAll()
    }, []);


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


    useEffect(() => {
        setClientData((prev) => ({ ...prev, ...dataDetail }))

        if (dataDetail && dataDetail.provinceCode) {
            fetchGetFindAllDistrictsByProvinceCode(dataDetail.provinceCode)
        }
    }, [dataDetail]);


    useEffect(() => {
        let provinceItem = provinceAll.find((option) => {
            return option.value == dataDetail.provinceCode
        })

        if (provinceItem) {
            setClientData((prev) => ({ ...prev, provinceName: provinceItem.label }))
        }
    }, [provinceAll, clientData.provinceCode]);


    useEffect(() => {
        let districtItem = districtsAll.find((option) => {
            return option.value == clientData.districtCode
        })

        if (districtItem) {
            setClientData((prev) => ({ ...prev, districtName: districtItem.label }))
        }
    }, [districtsAll, clientData.districtCode]);

    console.log("binh_ModalDetailAccount", clientData)
    return (
        <DraggableModal
            isOpen={isOpen}
            onClose={onClose}
            className={"modal-detail-account"}
            titleId={"Thông tin tài khoản"}
            toggle={onClose}
        >
            <div className="body">
                <div className="wrap-body">
                    <div class="property-info">
                        <div class="label-property">
                            Họ và tên
                        </div>
                        <div class="value-property">
                            {clientData.fullName}
                        </div>
                    </div>

                    <div class="property-info">
                        <div class="label-property">
                            Số điện thoại
                        </div>
                        <div class="value-property">
                            {clientData.phone}
                        </div>
                    </div>

                    <div class="property-info">
                        <div class="label-property">
                            Loại tài khoản
                        </div>
                        <div class="value-property">
                            {clientData.accountLeverTypeName}
                        </div>
                    </div>

                    <div class="property-info">
                        <div class="label-property">
                            Loại môi giới
                        </div>
                        <div class="value-property">
                            Người cho thuê
                        </div>
                    </div>


                    <div class="property-info">
                        <div class="label-property">
                            Tình/Thành phố
                        </div>
                        <div class="value-property">
                            {clientData.provinceName}
                        </div>
                    </div>

                    <div class="property-info">
                        <div class="label-property">
                            Quận/Huyện
                        </div>
                        <div class="value-property">
                            {clientData.districtName}
                        </div>
                    </div>


                    <div class="property-info">
                        <div class="label-property">
                            Số dư tài khoản
                        </div>
                        <div class="value-property">
                            {CommonUtils.formatNumber(clientData.money, 0)}
                        </div>
                    </div>


                    <div class="property-info">
                        <div class="label-property">
                            Trạng thái tài khoản
                        </div>
                        <div class="value-property">
                            {clientData.statusAccountName}
                        </div>
                    </div>
                </div>
            </div>
        </DraggableModal>
    )
}

export default ModalDetailAccount