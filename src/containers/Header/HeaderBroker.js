import React, { useState, useRef } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { useSelector, useDispatch } from "react-redux";
import * as actions from '../../redux/actions'
import { TYPE_USER, useOnClickOutside } from '../../utils';
import NoAvatar from '../../assets/images/no-avatar-small.png'
import "./HeaderBroker.scss"
import DropDownSettingUserBroker from './DropDownSettingUserBroker/DropDownSettingUserBroker';

const listMenuHeaderBroker = [
    {
        title: "Trang chủ",
        path: "/home-broker"
    },
    {
        title: "Báo cáo",
        path: "/report"
    },
    {
        title: "Quản lý tin",
        path: "/news-management"
    },
    {
        title: "Đơn hàng",
        path: "/order"
    },
    {
        title: "Môi giới",
        path: "/broker"
    },
    {
        title: "Nạp tiền",
        path: "/recharge-broker"
    },
    {
        title: "Mã thưởng",
        path: "/recharge-broker"
    },
    {
        title: "Tin nhắn",
        path: "/recharge-broker"
    },
]


const HeaderBroker = () => {
    const history = useHistory()
    const dispatch = useDispatch()
    const [pathCur, setPathCur] = useState(history.location.pathname);
    const [isShowSetting, setIsShowSetting] = useState(false);
    const settingRef = useRef();

    const onRedirectHome = () => {
        dispatch(actions.setTypeUser(TYPE_USER.CUSTOMER))
        history.push("/home")
    }
    useOnClickOutside(settingRef, () => {
        setIsShowSetting(false)
    });

    console.log("HeaderBroker", isShowSetting)

    return (
        <div className='header-broker'>
            <div className="container container-header-broker">
                <div className="navbar-logo item-center">
                    <div onClick={onRedirectHome}>
                        <img className="img-logo" src="https://mogi.vn/content/Images/logo.svg" />
                    </div>
                </div>
                <div className="navbar-menu">
                    <div className="menu-list">
                        {listMenuHeaderBroker && listMenuHeaderBroker.map((item, index) => {
                            return (
                                <div className={("menu-item item-center " + (pathCur.includes(item.path) ? "active" : ""))} onClick={() => {
                                    setPathCur(item.path)
                                }}>
                                    <Link to={item.path}>
                                        {item.title}
                                    </Link>
                                </div>
                            )
                        })}
                    </div>
                    <div className="noti-broker item-center">
                        <div className="wrap-noti">
                            <i class="fa fa-bell"></i>
                        </div>
                    </div>
                    <div className="info-user-broker item-center">
                        <div className="user-name">
                            Nguyễn
                        </div>
                        <div className="user-avatar" onClick={() => {
                            setIsShowSetting(!isShowSetting)
                        }}
                            ref={settingRef}
                        >
                            <img src={NoAvatar} alt="" />
                            {isShowSetting && <DropDownSettingUserBroker
                                setIsShowSetting={setIsShowSetting}
                            />}
                        </div>
                    </div>

                </div>
            </div>
        </div >
    )
}

export default HeaderBroker