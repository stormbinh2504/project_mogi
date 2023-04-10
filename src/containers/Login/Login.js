import React, { useState, useEffect } from 'react'
import { imageUpload } from '../../utils/imageUpload'
import { sdkVNPTService, authService } from '../../services';
import { compressImage } from "../../utils/imageUpload"
import { useSelector, useDispatch } from "react-redux";
import { Link, useHistory } from 'react-router-dom'
import { loginStart, loginSucess, loginFail } from '../../redux/actions/userActions'
import { alertType } from '../../redux/actions/alertActions'
import { ToastUtil } from '../../utils'
import { postDataAPI } from '../../utils/fetchData'

import "./Login.scss"
import axios from 'axios';

const Login = () => {
    const history = useHistory()
    const dispatch = useDispatch()
    const { auth } = useSelector((state) => state);

    const [userData, setUserData] = useState({
        "email": "",
        "password": "",
    })


    const handleChangeInput = e => {
        const { name, value } = e.target
        setUserData({ ...userData, [name]: value })
    }


    const Submit = async () => {

        let body = {
            "email": userData.email,
            "password": userData.password
        }

        dispatch(alertType(true))
        dispatch(loginStart())
        await authService.LoginClient(body)
            .then(res => {
                if (res) {
                    dispatch(loginSucess(res))
                    dispatch(alertType(false))
                    ToastUtil.success("Đăng nhập thành công");
                }
            })
            .catch(error => {
                dispatch(loginFail())
                dispatch(alertType(false))
                ToastUtil.errorApi(error, "Đăng nhập không thành công");
            });
    }

    return (
        <div div className='login' >
            <div div className='form-login' >
                <h3 className="text-uppercase text-center mb-4">Login</h3>

                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input type="text" className="form-control-input" id="email"
                        name="email"
                        onChange={handleChangeInput} value={userData.email}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="password">Mật khẩu</label>
                    <input type="text" className="form-control-input" id="password"
                        name="password"
                        onChange={handleChangeInput} value={userData.password}
                    />
                </div>
                < button
                    type="submit"
                    className="btn btn-dark w-100"
                    // disabled={email && password ? false : true}
                    onClick={Submit}
                >
                    Đăng nhập
                </button>

                <p className="my-2">
                    Bạn chưa có tài khoản{" "}
                    <Link to="/register" style={{ color: "crimson" }}>
                        Đăng ký ngay
                    </Link>
                </p>
            </div >
        </div >
    )
}

export default Login