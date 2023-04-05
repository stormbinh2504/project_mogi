import React, { useState, useEffect } from 'react'
import { ToastSuccess, ToastError } from '../../utils/ToastUtil'
import { loginAuthentication, alertType } from '../../redux/actions/authAction'
import { useSelector, useDispatch } from "react-redux";
import { Link, useHistory } from 'react-router-dom'
import { postDataAPI } from '../../utils/fetchData'

import "./RegisterOTP.scss"
import OtpInput from "react-otp-input";
const TIME_SEND_OTP = 120

const RegisterOTP = (props) => {
    const history = useHistory()
    const dispatch = useDispatch()

    const { Submit, email, backStep } = props

    const [numberOTP, setNumberOTP] = useState("")

    const [time, setTime] = useState(null)

    const [isSecond, setIsSecond] = useState(false)

    useEffect(async () => {
        await genOTP()
    }, [])

    useEffect(() => {
        let timerInteral = null
        if (time) {
            if (time !== 0) {
                timerInteral = setInterval(() => {
                    setTime(time => time - 1)
                }, 1000);
            }
        } else {
            return
        }

        return () => {
            clearInterval(timerInteral);
        };
    }, [time]);

    const formatTime = (time) => {
        if (isSecond === false) {
            //theo format: mm:ss
            const minutes = Math.floor(time / 60);
            let seconds = time % 60;

            if (seconds < 10) {
                seconds = `0${seconds}`;
            }
            return `${minutes}:${seconds}`;
        }
        else {
            //theo format: ss
            return time;
        }
    }

    const genOTP = async () => {
        let body = {
            "email": email
        }
        dispatch(alertType(true))
        try {
            await postDataAPI('gen-otp', body)
                .then(res => {
                    dispatch(alertType(false))
                    ToastSuccess(res.data.msg);
                    setTime(TIME_SEND_OTP)
                })
                .catch(error => {
                    dispatch(alertType(false))
                    ToastError(error);
                });
        } catch (err) {
            dispatch(alertType(false))
            ToastError("error");
        }
    }


    const verifyOTP = async () => {
        let body = {
            "numberOTP": numberOTP
        }
        let isVerify = false
        dispatch(alertType(true))

        await postDataAPI('verify-otp', body)
            .then(res => {
                dispatch(alertType(false))
                ToastSuccess(res.data.msg);
                setNumberOTP("")
                isVerify = res.data.isVerifyEmail
            })
            .catch(error => {
                dispatch(alertType(false))
                ToastError(error);
            });
        return isVerify
    }

    const handleNumberOTPChange = (otp) => {
        setNumberOTP(otp)
    }

    const handleSubmit = async () => {
        let flag = await verifyOTP()
        if (flag) {
            await Submit()
        }
    }
    const reSendOTP = async () => {
        await genOTP()
    }

    return (
        <div className="compare-otp">
            <div className="form-compare-otp">
                <div className='return-step' onClick={backStep}><i class="fa fa-angle-double-left" aria-hidden="true"></i> &nbsp; Back to register</div>
                <div className='title-header'>
                    Xác thực OTP
                </div>
                <div className="content-authen">
                    <span className='txt-content item-center'>
                        Hãy nhập mã xác minh 6 chữ số đã được gửi đến {email}
                    </span>
                    <div className="otp-number">
                        <OtpInput
                            containerStyle={{
                                display: "flex",
                                justifyContent: "space-around",
                                margin: "10px 0"
                            }}
                            inputStyle={{
                                width: "40px",
                                height: "40px",
                                textAlign: "center",
                                color: "#fff",
                                backgroundColor: "#121622",
                                borderRadius: "2px",
                                outline: "none",
                                border: "none",
                                borderBottom: "1px solid rgba(255, 255, 255, 0.3)",
                                fontSize: "28px"
                            }}
                            focusStyle={{
                                borderBottom: "1px solid #2AD03D",
                            }}
                            errorStyle={{
                                border: "1px solid red",
                            }}
                            shouldAutoFocus={true}
                            className="otpinput"
                            value={numberOTP}
                            onChange={handleNumberOTPChange}
                            numInputs={6}
                            separator={<span>&nbsp;</span>}
                            isInputNum={true}
                        />
                    </div>

                    <button
                        disabled={time === null || time === 0}
                        onClick={handleSubmit}
                        className="btn btn-confirm">
                        Xác nhận
                        &nbsp;{formatTime(time)}
                    </button>
                    <div className="resend-OTP" onClick={reSendOTP}>
                        Gửi lại
                    </div>
                </div>
            </div>
        </div>
    )
}

export default RegisterOTP