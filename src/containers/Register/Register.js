import React, { useState, useEffect } from 'react'
import { imageUpload } from '../../utils/imageUpload'
import "./Register.scss"
import { sdkVNPTService, authService, ekycServer } from '../../services';
import { compressImage } from "../../utils/imageUpload"
import { useSelector, useDispatch } from "react-redux";
import { Link, useHistory } from 'react-router-dom'
import { alertType } from '../../redux/actions/alertActions'
import { ToastUtil } from '../../utils'

import axios from 'axios';

const Register = () => {

    const dispatch = useDispatch()
    const history = useHistory()

    const [imagePreURL, setImagPreURL] = useState("")
    const [step, setStep] = useState(1)

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

    const Submit = async () => {

        let body = {
            "email": userData.email,
            "password": userData.password,
            "firstName": userData.firstName,
            "lastName": userData.lastName
        }

        dispatch(alertType(true))
        await authService.RegisterClient(body)
            .then(res => {
                if (res) {
                    console.log("binh_check", res)
                    dispatch(alertType(false))
                    ToastUtil.success(res.message);
                    setUserData({
                        "firstName": "",
                        "lastName": "",
                        "email": "",
                        "password": "",
                    })
                }
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

    let disableSubmit = userData.password !== "" && userData.username !== ""

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
                    <input type="text" className="form-control-input" id="password"
                        name="password"
                        onChange={handleChangeInput} value={userData.password}
                    />
                </div>

                <button className="btn btn-dark w-100" onClick={Submit} disabled={!disableSubmit} >Đăng ký</button>
                <p className="my-2">
                    Bạn đã có tài khoản? <Link to="/login" style={{ color: "crimson" }}>Đăng nhập ngay</Link>
                </p>
            </div>
        </div >
    )
}

export default Register