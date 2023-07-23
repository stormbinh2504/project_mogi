import React, { useState, useEffect } from 'react'
import { imageUpload } from '../../utils/imageUpload'
import "./Register.scss"
import { sdkVNPTService, authService, ekycServer } from '../../services';
import { compressImage } from "../../utils/imageUpload"
import { useSelector, useDispatch } from "react-redux";
import { Link, useHistory } from 'react-router-dom'
import { alertType } from '../../redux/actions/alertActions'
import { RegexUtils, ToastUtil } from '../../utils'

import axios from 'axios';

const Register = () => {

    const dispatch = useDispatch()
    const history = useHistory()

    const [imagePreURL, setImagPreURL] = useState("")
    const [step, setStep] = useState(1)
    const [isShowPass, setIsShowPass] = useState(false)

    const [userData, setUserData] = useState({
        "firstName": "",
        "lastName": "",
        "email": "",
        "password": "",
    })


    const handleChangeInput = e => {
        const { name, value } = e.target
        setUserData({ ...userData, [name]: value })
    }

    const ValidateForm = () => {
        if (!userData.firstName) {
            ToastUtil.error("Họ không dược để trống");
            return false
        }
        if (!userData.lastName) {
            ToastUtil.error("Têm không dược để trống");
            return false
        }
        if (!userData.email) {
            ToastUtil.error("Email không dược để trống");
            return false
        }
        if (!userData.password) {
            ToastUtil.error("Password không dược để trống");
            return false
        }

        let isValidEmail = RegexUtils.regexEmail.test(userData.email.toString())
        if (!isValidEmail) {
            ToastUtil.error("Email không hợp lệ");
            return false
        }

        return true
    }

    const Submit = async () => {


        if (!ValidateForm()) {
            return
        }
        let body = {
            "email": userData.email,
            "password": userData.password,
            "firstName": userData.firstName,
            "lastName": userData.lastName
        }

        dispatch(alertType(true))
        await authService.RegisterClient(body)
            .then(res => {
                console.log("binh_check", res)
                dispatch(alertType(false))
                ToastUtil.success("Đăng ký thành công");
                setUserData({
                    "firstName": "",
                    "lastName": "",
                    "email": "",
                    "password": "",
                })
            })
            .catch(error => {
                dispatch(alertType(false))
                ToastUtil.errorApi(error, "Đăng ký không thành công");
            });
    }

    const nextStep = () => {
        setStep(step + 1)
    }

    const backStep = () => {
        setStep(step - 1)
    }

    let disableSubmit = true

    return (
        <div div className='regiter' >
            <div div className='form-regiter' >
                <h3 className="text-uppercase text-center mb-4">Đăng ký</h3>

                <div className="form-group multi-group">
                    <div className="first-name">
                        <label htmlFor="first-name">Họ</label>
                        <input type="text" className="form-control-input" id="first-name"
                            name="firstName"
                            onChange={handleChangeInput} value={userData.firstName}
                        />
                    </div>
                    <div className="last-name">
                        <label htmlFor="last-name">Tên</label>
                        <input type="text" className="form-control-input" id="last-name"
                            name="lastName"
                            onChange={handleChangeInput} value={userData.lastName}
                        />
                    </div>
                </div>


                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input type="text" className="form-control-input" id="email"
                        name="email"
                        onChange={handleChangeInput} value={userData.email}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="username">Mật khẩu</label>
                    <input type={isShowPass ? "text" : "password"} className="form-control-input" id="password"
                        name="password"
                        onChange={handleChangeInput} value={userData.password}
                    >
                    </input>
                    <span className="icon-show-pass" onClick={() => { setIsShowPass(!isShowPass) }}>
                        {isShowPass && <i class="fa fa-eye" aria-hidden="true"></i>}
                        {!isShowPass && <i class="fa fa-eye-slash" aria-hidden="true"></i>}
                    </span>

                </div>

                <button className="btn btn-submit w-100" onClick={Submit} disabled={!disableSubmit} >Đăng ký</button>
                <p className="my-2">
                    Bạn đã có tài khoản? <Link to="/login" style={{ color: "crimson" }}>Đăng nhập ngay</Link>
                </p>
            </div>
        </div >
    )
}

export default Register