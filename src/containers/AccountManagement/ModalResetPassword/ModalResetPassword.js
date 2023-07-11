import React, { useState, useEffect } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { useSelector, useDispatch } from "react-redux";
import "./ModalResetPassword.scss"
import { Space, Table, Tag } from 'antd';
import DraggableModal from '../../../components/DraggableModal/DraggableModal';
import { alertType } from '../../../redux/actions';
import { accountService, globalService } from '../../../services';
import { ToastUtil } from '../../../utils';


const ModalResetPassword = (props) => {
    const { isOpen, onClose, dataResetPassword } = props
    const history = useHistory()
    const dispatch = useDispatch()
    const state = useSelector((state) => state);
    const { auth, app, user } = state
    const { userInfo } = user


    const processResetPassword = async () => {
        const { id } = dataResetPassword
        dispatch(alertType(true))
        await accountService.setResetPassword(id)
            .then(res => {
                dispatch(alertType(false))
                ToastUtil.success("Khôi phục mật khẩu thành công");
                onClose()
            })
            .catch(error => {
                dispatch(alertType(false))
                ToastUtil.error(error);
            });
    }

    return (
        <DraggableModal
            isOpen={isOpen}
            onClose={onClose}
            className={"modal-reset-password"}
            titleId={"Khôi phục mật khâủ"}
            toggle={onClose}
        >
            <div className="body">
                <div className="body-content-row row gutters-5">
                    <div className="col-12 col-sm-4 label">
                        Tên người cho thuê:
                    </div>
                    <div className="col-12 col-sm-8 value">
                        <div className="mg-form-control">
                            {dataResetPassword.fullName}
                        </div>
                    </div>
                </div>

                <div className="body-content-row item-center ">
                    <div className="note">
                        *Lưu ý: Tài khoản sẽ được khôi phục mật khẩu về "12345"
                    </div>
                </div>

                <div className="body-content-row item-center">
                    <div className="container-action item-center">
                        <button class="btn btn-continue" onClick={processResetPassword} >
                            Xác nhận
                        </button>
                    </div>
                </div>
            </div>
        </DraggableModal>
    )
}

export default ModalResetPassword