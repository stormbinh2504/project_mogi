import React, { useState, useEffect } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { useSelector, useDispatch } from "react-redux";
import "./ModalDetailAccount.scss"
import { Space, Table, Tag } from 'antd';
import DraggableModal from '../../../components/DraggableModal/DraggableModal';
import { alertType } from '../../../redux/actions';
import { accountService, globalService } from '../../../services';


const ModalDetailAccount = (props) => {
    const { isOpen, onClose, dataAdd, setDataAdd, isEdit, onHandleCallBack } = props
    const history = useHistory()
    const dispatch = useDispatch()
    const state = useSelector((state) => state);
    const { auth, app, user } = state
    const { userInfo } = user

    const [dataNews, setDataNews] = useState(df_dataNews);


    return (
        <DraggableModal
            isOpen={isOpen}
            onClose={onClose}
            className={"modal-add-news-management"}
            titleId={"Thông tin tài khoản"}
            toggle={onClose}
        >
            <div className="body">

            </div>
        </DraggableModal>
    )
}

export default ModalDetailAccount