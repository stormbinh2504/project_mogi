import React, { useState, useEffect } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { useSelector, useDispatch } from "react-redux";
import Header from '../Header/Header'
import "./PropertyManagement.scss"
import PageContainerBroker from '../../components/Broker/PageContainerBroker/PageContainerBroker';
import Avatar from '../../assets/images/avatar.png'
import Zalo from '../../assets/images/zalo.png'
import { alertType } from '../../redux/actions';
import { ToastUtil, uploadImgToFireBase, deleteFromFirebase } from '../../utils';
import { accountService, globalService } from '../../services';
import Select from 'react-select';

const PropertyManagement = () => {
    const history = useHistory()
    const dispatch = useDispatch()
    const state = useSelector((state) => state);
    const { auth, app, user } = state

    const [step, setStep] = useState({})

    const onHandleAdd = () => {
        history.push("/property-management-add")
    }

    return (
        <PageContainerBroker
            titleId={"Quản lý tài sản"}
        >
            <div className="property-management">
                <div className="property-management-container">
                    <div className="property-management-content">
                        <div className="container-action">
                            <button className='btn btn-add' onClick={onHandleAdd}>
                                Thêm mới
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </PageContainerBroker>
    )
}

export default PropertyManagement