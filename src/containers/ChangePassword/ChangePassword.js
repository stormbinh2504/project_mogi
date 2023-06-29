import React, { useState, useEffect } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { useSelector, useDispatch } from "react-redux";
import Header from '../Header/Header'
import "./ChangePassword.scss"
import PageContainerBroker from '../../components/Broker/PageContainerBroker/PageContainerBroker';
import Avatar from '../../assets/images/avatar.png'
import Zalo from '../../assets/images/zalo.png'
import { alertType } from '../../redux/actions';
import { ToastUtil, uploadImgToFireBase, deleteFromFirebase } from '../../utils';
import { accountService, authService, globalService } from '../../services';
import Select from 'react-select';

let df_form = {
    oldPassword: "",
    newPassword: "",
    newPasswordConfirm: "",

    oldPasswordMsgErr: "",
    newPasswordMsgErr: "",
    newPasswordConfirmMsgErr: "",
}

const ChangePassword = () => {
    const history = useHistory()
    const dispatch = useDispatch()
    const state = useSelector((state) => state);
    const { auth, app, user } = state
    const { userInfo } = user

    const [dataForm, setDataForm] = useState(df_form)

    const handleChangeInput = e => {
        const { name, value } = e.target
        setDataForm((prev) => ({ ...prev, [name]: value, [`${name}MsgErr`]: null }))

    }

    const validateForm = () => {
        const { oldPassword, newPassword, newPasswordConfirm } = dataForm

        let flag = true
        if (oldPassword) {
            setDataForm((prev) => ({ ...prev, ["oldPasswordMsgErr"]: null }))
        }
        if (newPassword) {
            setDataForm((prev) => ({ ...prev, ["newPasswordMsgErr"]: null }))
        }
        if (newPasswordConfirm) {
            setDataForm((prev) => ({ ...prev, ["newPasswordConfirmMsgErr"]: null }))
        }


        if (!oldPassword) {
            setDataForm((prev) => ({ ...prev, ["oldPasswordMsgErr"]: "Vui lòng nhập mật khẩu hiện tại." }))
            flag = false
        }
        if (!newPassword) {
            setDataForm((prev) => ({ ...prev, ["newPasswordMsgErr"]: "Vui lòng nhập mật khẩu hiện mới." }))
            flag = false
        }
        if (!newPasswordConfirm) {
            setDataForm((prev) => ({ ...prev, ["newPasswordConfirmMsgErr"]: "Vui lòng nhập lại mật khẩu." }))
            flag = false
        }

        return flag
    }

    const onHandleUpdate = async () => {

        if (!validateForm()) {
            return
        }

        if (dataForm.newPassword !== dataForm.newPasswordConfirm) {
            ToastUtil.error("Mật khẩu nhập lại không chính xác");
            return
        }

        let body = {
            "id": userInfo.userId,
            "oldPassword": dataForm.oldPassword,
            "newPassword": dataForm.newPasswordConfirm,
        }

        dispatch(alertType(true))
        await authService.changePassword(body)
            .then(res => {
                dispatch(alertType(false))
                ToastUtil.success("Cập nhật thành công");
                setDataForm(df_form)
            })
            .catch(error => {
                dispatch(alertType(false))
                ToastUtil.errorApi(error, "Cập nhật không thành công");
            });
    }


    // console.log("binh_client", provinceAll, clientData)
    console.log("render_ChangePassword", dataForm)
    return (
        <PageContainerBroker
            titleId={"Thay đổi mật khẩu"}
        >
            <div className="body property-management-adđ">
                <div className="body-container">
                    <div className="body-content">

                        <div className="body-content-row row gutters-5">
                            <div className="col-12 col-sm-4 label">
                                Nhập mật khẩu cũ
                            </div>
                            <div className="col-12 col-sm-8 value">
                                <div className="mg-form-control">
                                    <input type="password" className="text-control" value={dataForm.oldPassword} name="oldPassword"
                                        onChange={handleChangeInput} />

                                </div>
                                <div className="err-msg-form">
                                    {dataForm.oldPasswordMsgErr && dataForm.oldPasswordMsgErr}
                                </div>
                            </div>
                        </div>


                        <div className="body-content-row row gutters-5">
                            <div className="col-12 col-sm-4 label">
                                Nhập mật khẩu mới
                            </div>
                            <div className="col-12 col-sm-8 value">
                                <div className="mg-form-control">
                                    <input type="password" className="text-control" value={dataForm.newPassword} name="newPassword"
                                        onChange={handleChangeInput} />

                                </div>
                                <div className="err-msg-form">
                                    {dataForm.newPasswordMsgErr && dataForm.newPasswordMsgErr}
                                </div>
                            </div>
                        </div>


                        <div className="body-content-row row gutters-5">
                            <div className="col-12 col-sm-4 label">
                                Nhập lại mật khẩu mới
                            </div>
                            <div className="col-12 col-sm-8 value">
                                <div className="mg-form-control">
                                    <input type="password" className="text-control" value={dataForm.newPasswordConfirm} name="newPasswordConfirm"
                                        onChange={handleChangeInput} />

                                </div>
                                <div className="err-msg-form">
                                    {dataForm.newPasswordConfirmMsgErr && dataForm.newPasswordConfirmMsgErr}
                                </div>
                            </div>
                        </div>

                        <div className="body-content-row row gutters-5">
                            <div className="col-12 col-sm-4 label">

                            </div>
                            <div className="col-12 col-sm-8">
                                <div className="container-action style-add">
                                    <button class="btn btn-continue" onClick={onHandleUpdate} >Cập nhật</button>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </PageContainerBroker >
    )
}

export default ChangePassword