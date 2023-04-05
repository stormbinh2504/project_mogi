import React, { useState, useEffect } from 'react'
import { imageUpload } from '../../utils/imageUpload'
import "./Register.scss"
import { sdkVNPTService, authService, ekycServer } from '../../services';
import { compressImage } from "../../utils/imageUpload"
import { useSelector, useDispatch } from "react-redux";
import { Link, useHistory } from 'react-router-dom'
import { alertType } from '../../redux/actions/authAction'
import { ToastSuccess, ToastError } from '../../utils/ToastUtil'
import { postDataAPI } from '../../utils/fetchData'

import axios from 'axios';
import RegisterOTP from './RegisterOTP';

const Register = () => {

    const dispatch = useDispatch()
    const history = useHistory()

    const [imagePreURL, setImagPreURL] = useState("")
    const [step, setStep] = useState(1)

    const imageHandler = (file) => {
        const reader = new FileReader();
        reader.onload = () => {
            if (reader.readyState === 2) {
                setImagPreURL(reader.result)
            }
        }
        reader.readAsDataURL(file)
    };

    const imageUploadTest = async (images) => {
        const formData = new FormData()
        formData.append("file", images)
        formData.append("upload_preset", "binhhuun")
        formData.append("cloud_name", "stormbinh2504")
        const res = await fetch("https://api.cloudinary.com/v1_1/stormbinh2504/upload", {
            method: "POST",
            body: formData
        })
        const data = await res.json()
        return data
    }

    const [userData, setUserData] = useState({
        "username": "",
        "password": "",
        "avatar": "",
        "email": ""
    })

    const [avatar, setAvatar] = useState(null)

    const handleChangeInput = e => {
        const { name, value } = e.target
        setUserData({ ...userData, [name]: value })
    }

    const handleImageChange = async (e) => {
        const file = e.target.files[0]
        if (e.target.files.length > 0) {
            setAvatar(file)
            imageHandler(file)
        }
    }


    const addFileServerEkyc = async () => {

        let hashCode = ""

        let imageOptimize = await compressImage(avatar)

        let body = {
            file: imageOptimize,
            title: 'Test title',
            description: 'Test description'
        }

        await sdkVNPTService.addFileServerEkyc(body)
            .then((responses) => {
                responses = responses.data
                hashCode = responses.object && responses.object.hash
            })
            .catch((error) => {
                hashCode = ''
            });
        return hashCode
    }

    const Submit = async () => {
        let imageOptimize = await compressImage(avatar)
        let imageURL = await imageUploadTest(imageOptimize)

        const hashCode = await addFileServerEkyc();
        let body = {
            ...userData,
            avatar: imageURL.secure_url,
            hashAvatar: hashCode,
        }

        dispatch(alertType(true))
        try {
            await postDataAPI('register', body)
                .then(res => {
                    if (res) {
                        dispatch(alertType(false))
                        ToastSuccess(res.data.msg);
                        setUserData({
                            "username": "",
                            "password": "",
                            "avatar": "",
                            "email": ""
                        })
                        setStep(1)
                        setImagPreURL("")
                    }
                })
                .catch(error => {
                    dispatch(alertType(false))
                    ToastError(error.response.data.msg);
                });
        } catch (err) {
            dispatch(alertType(false))
            ToastError("error");
        }
    }

    const nextStep = () => {
        setStep(step + 1)
    }

    const backStep = () => {
        setStep(step - 1)
    }

    let disableSubmit = imagePreURL !== "" && userData.password !== "" && userData.username !== ""

    return (
        <div div className='regiter' >
            {step === 1 && <div div className='form-regiter' >
                <h3 className="text-uppercase text-center mb-4">Register</h3>
                <div className="form-group">
                    <label htmlFor="username">Username</label>
                    <input type="text" className="form-control" id="username"
                        name="username"
                        onChange={handleChangeInput} value={userData.username}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="username">Password</label>
                    <input type="text" className="form-control" id="password"
                        name="password"
                        onChange={handleChangeInput} value={userData.password}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input type="text" className="form-control" id="email"
                        name="email"
                        onChange={handleChangeInput} value={userData.email}
                    />
                </div>

                {
                    imagePreURL !== "" && <div className="block-image">
                        <img src={imagePreURL} alt="" id="img" className="pre-image" />
                    </div>
                }

                <div className="form-group">
                    <label htmlFor="image">Select Image</label>
                    <input
                        id="image"
                        className=""
                        style={{ width: '100%', display: 'none' }}
                        type="file"
                        accept=".jpeg,.jpg,.png"
                        onChange={handleImageChange}
                        name="files[]"
                        multiple={false}
                    />
                </div>

                <button className="btn btn-dark w-100" onClick={nextStep} disabled={!disableSubmit} >Register</button>

                <p className="my-2">
                    Already have an account? <Link to="/" style={{ color: "crimson" }}>Login Now</Link>
                </p>
            </div>}
            {step === 2 &&
                <RegisterOTP
                    Submit={Submit}
                    email={userData.email}
                    backStep={backStep}
                />}
        </div >
    )
}

export default Register