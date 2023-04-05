import React from 'react'
import { Link, useHistory } from 'react-router-dom'
import { useSelector, useDispatch } from "react-redux";
import * as actions from '../../redux/actions'
import { TYPE_USER } from '../../utils';

import "./Header.scss"
const Header = () => {
    const history = useHistory()
    const dispatch = useDispatch()

    const onRedirectPosting = () => {
        dispatch(actions.setTypeUser(TYPE_USER.BROKER))
        history.push("/home-broker")
    }

    const onRedirectHome = () => {
        dispatch(actions.setTypeUser(TYPE_USER.CUSTOMER))
        history.push("/home")
    }

    return (
        <div className='header'>
            <div className="container container-header">
                <div className="navbar-logo item-center">
                    <div onClick={onRedirectHome}>
                        <img className="img-logo" src="https://mogi.vn/content/Images/logo.svg" />
                    </div>
                </div>
                <div className="navbar-menu">
                    <div className="menu-list">
                        <div className="menu-item item-center">
                            <Link to="/find">
                                Tìm mua
                            </Link>
                        </div>
                        <div className="menu-item item-center">
                            <Link to="/find">
                                Tìm nhà
                            </Link>
                        </div>
                        <div className="menu-item item-center">
                            <Link to="/find">
                                Giá nhà đất
                            </Link>
                        </div>
                        <div className="menu-item item-center">
                            <Link to="/find">
                                Hỏi đáp
                            </Link>
                        </div>
                        <div className="menu-item item-center">
                            <Link to="/find">
                                Môi giới
                            </Link>
                        </div>
                        <div className="menu-item item-center">
                            <Link to="/find">
                                Dự án
                            </Link>
                        </div>
                    </div>
                </div>
                <div className="navbar-user item-center">
                    <div className="user-avatar">
                        <div className="avatar">
                            <i class="fa fa-user-circle"></i>
                        </div>
                    </div>
                    <div className="user-posting">
                        <div className="btn-posting item-center" onClick={onRedirectPosting}>
                            Đăng tin
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Header