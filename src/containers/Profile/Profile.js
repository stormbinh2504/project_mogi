import React, { useState, useEffect } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { useSelector, useDispatch } from "react-redux";
import Header from '../Header/Header'
import "./Profile.scss"
import PageContainerBroker from '../../components/Broker/PageContainerBroker/PageContainerBroker';
import Avatar from '../../assets/images/avatar.png'
import Zalo from '../../assets/images/zalo.png'
import { alertType } from '../../redux/actions';
import { ToastUtil } from '../../utils';
import { accountService, globalService } from '../../services';

const Profile = () => {
    const history = useHistory()
    const dispatch = useDispatch()
    const state = useSelector((state) => state);
    const { auth, app, user } = state
    const { userInfo } = user
    const [clientData, setClientData] = useState()

    const callApiGetProvinceAll = async () => {
        dispatch(alertType(true))
        await globalService.getProvinceAll()
            .then(res => {
                if (res) {
                    dispatch(alertType(false))
                }
            })
            .catch(error => {
                dispatch(alertType(false))
                ToastUtil.error(error);
            });
    }

    useEffect(() => {
        callApiGetProvinceAll()
    }, []);


    useEffect(() => {
        setClientData({ ...userInfo })
    }, [userInfo]);

    console.log("binh_client", clientData)
    return (
        <PageContainerBroker
            titleId={"Thông tin tài khoản"}
        >
            <div className="profile">
                <div className="profile-container">
                    <div className="profile-content">
                        <div className="profile-content-row row gutters-5">
                            <div className="col-12 col-md-4 label">
                                <div className="img-avatar">
                                    <img src="https://pro.mogi.vn/content/images/avatar.png" />
                                </div>
                            </div>
                            <div className="col-12 col-md-8 value">
                                <div className="full-name">
                                    {clientData && clientData.fullName}
                                </div>
                                <div className="change-avatar">

                                </div>
                            </div>
                        </div>
                        <div className="profile-content-row row gutters-5">
                            <div className="col-12 col-md-4 label">
                                <div className="img-avatar">
                                    <img src="https://pro.mogi.vn/content/images/avatar.png" />
                                </div>
                            </div>
                            <div className="col-12 col-md-8 value">
                                <div className="full-name">
                                    {clientData && clientData.codeClient}
                                </div>
                                <div className="change-avatar">

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </PageContainerBroker>
    )
}

export default Profile