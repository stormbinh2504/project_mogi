import React, { useState, useRef, useEffect } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { useSelector, useDispatch } from "react-redux";
import * as actions from '../../../redux/actions'
import "./DropDownSettingUserBroker.scss"
import { useOnClickOutside } from '../../../utils';

const DropDownSettingUserBroker = (props) => {
    const history = useHistory()
    const dispatch = useDispatch()
    const { setIsShowSetting } = props
    // const notiRef = useRef();

    // useOnClickOutside(notiRef, () => {
    //     console.log("useOnClickOutside")
    //     setIsShowSetting(false)
    // });

    return (
        <div className="setting-container" >
            <ul class="profile-menu">
                <li><a href="/alert-search"><i class="fa fa-bell"></i>Thông báo &amp; Tìm kiếm</a></li>
                <li><a href="/favorite"><i class="fa fa-heart"></i>Bất động sản yêu thích</a></li>
                <li><a href="/profile"><i class="fa fa-user"></i>Thông tin cá nhân</a></li>

                <li><a href="/nap-tien"><i class="fa fa-vcard-o"></i>Nạp tiền</a></li>

                <li><a href="/Coupon/CouponList" ><i class="fa fa-gift"></i>Mã thưởng</a></li>
                <li><a href="/change-password"><i class="fa fa-lock"></i>Thay đổi mật khẩu</a></li>
                <li class="divider"></li>
                <li><a href="/Account/LogOff"><i class="fa fa-sign-out"></i>Thoát</a></li>
            </ul>
        </div>
    )
}

export default DropDownSettingUserBroker