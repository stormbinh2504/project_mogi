import React, { useState, useEffect } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { useSelector, useDispatch } from "react-redux";
import Header from '../Header/Header'
import "./RegisterTypeAccount.scss"
import PageContainerBroker from '../../components/Broker/PageContainerBroker/PageContainerBroker';
import LogoPayPal from '../../assets/images/recharge/logo-paypal.jpg'
import PaypalCheckoutButton from '../../components/Broker/PaypalCheckoutButton/PaypalCheckoutButton';
import StripeCheckoutButton from '../../components/Broker/StripeCheckoutButton/StripeCheckoutButton';
import NumberFormatCustom from '../../components/NumberFormatCustom/NumberFormatCustom';
import NumberInput from '../../components/Input/NumberInput/NumberInput';
import { accountService, globalService } from '../../services';
import { alertType, fetchUserInfoFromSavedSession } from '../../redux/actions';
import { ToastUtil } from '../../utils';
import Select from 'react-select';


const LIST_MONTH_BUY = [
    {
        label: "1 tháng",
        value: 1,
    },
    {
        label: "3 tháng",
        value: 3,
    },
    {
        label: "6 tháng",
        value: 6,
    },
    {
        label: "9 tháng",
        value: 9,
    },
    {
        label: "12 tháng",
        value: 12,
    }
]
const RegisterTypeAccount = () => {
    const history = useHistory()
    const dispatch = useDispatch()

    const state = useSelector((state) => state);
    const { auth, app, user } = state
    const { userInfo } = user
    const [step, setStep] = useState(1);

    const [typeAccountAll, setTypeAccountAll] = useState([])
    const [oldPackage, setOldPackage] = useState()
    const [newPackage, setNewPackage] = useState()
    const [dataResgister, setDataResgister] = useState({
        "codeClient": null,
        "accountTypeLever": null,
        "countMonth": null
    })



    useEffect(() => {
        fetchGetTypeAccountAll()
    }, []);

    useEffect(() => {
        setDataResgister((prev) => ({ ...prev, codeClient: userInfo.codeClient }))
    }, [userInfo]);

    useEffect(() => {
        let findOldPackage = typeAccountAll.find(item => item.value === userInfo.accountTypeLever);
        if (findOldPackage) {
            setOldPackage(findOldPackage)
        }
    }, [typeAccountAll]);

    const fetchGetTypeAccountAll = async () => {
        dispatch(alertType(true))
        await globalService.getAllTypeAccount()
            .then(res => {
                if (res && res.length > 0) {
                    let _typeAccountAll = res.map((item, index) => {
                        return { value: item.code, label: item.name, countNewsUpload: item.countNewsUpload, denominations: item.denominations }
                    })
                    setTypeAccountAll(_typeAccountAll)
                    dispatch(alertType(false))
                }
            })
            .catch(error => {
                dispatch(alertType(false))
                ToastUtil.error(error);
            });
    }

    const onChangeCountMonth = (objValue) => {
        setDataResgister((prev) => ({ ...prev, countMonth: objValue.value }))
    }

    const checkTypeAccountAddClass = (typeAcount) => {
        let _class = ""
        switch (typeAcount) {
            case 1:
                _class = "text-green"
                break;
            case 2:
                _class = "text-blue"
                break;
            case 3:
                _class = "text-orange"
                break;
            default:
                break;
        }
        return _class
    }

    const onNextStep = (item, isDisabledSwitch) => {
        if (isDisabledSwitch) return
        if (!dataResgister.countMonth) {
            ToastUtil.error("Vui lòng chọn thời gian mua");
            return
        }

        setStep(2)
        setNewPackage(item)
    }

    const Submit = async () => {
        let body = {
            ...dataResgister,
            accountTypeLever: newPackage.value
        }

        dispatch(alertType(true))
        await accountService.updateSwitchAccount(body)
            .then(res => {
                dispatch(alertType(false))
                ToastUtil.success("Chuyển đổi thành công");
                setStep(1)
                dispatch(fetchUserInfoFromSavedSession())
            })
            .catch(error => {
                dispatch(alertType(false))
                ToastUtil.errorApi(error, "Chuyển đổi không thành công");
            });
    }
    console.log("binh_RegisterTypeAccount", { typeAccountAll, userInfo, oldPackage, newPackage })
    return (
        <PageContainerBroker
            titleId={"Loại tài khoản"}
        >
            <div className="body register-type-account">
                <div className="body-container">
                    <div className="body-content">
                        {
                            step === 1 && <>
                                <div className="main-content">
                                    <div className="body-content-row row gutters-5">
                                        <div className="col-12 col-sm-6 label">
                                            Bạn đang sử dụng gói
                                        </div>
                                        <div className="col-12 col-sm-6 value">
                                            <div className={"value-label " + (checkTypeAccountAddClass(userInfo.accountTypeLever))} >
                                                {userInfo.accountLeverTypeName}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="body-content-row row gutters-5">
                                        <div className="col-12 col-sm-6 label">
                                            Thời gian mua:
                                        </div>
                                        <div className="col-12 col-sm-6 value">
                                            <div className="value-label">
                                                <div className="custom-input-react-select">
                                                    <Select
                                                        onChange={onChangeCountMonth}
                                                        options={LIST_MONTH_BUY}
                                                        value={
                                                            LIST_MONTH_BUY.filter((option) => {
                                                                return option.value == dataResgister.countMonth
                                                            })
                                                        }
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="list-type-account">
                                    <div className="body-content-row row gutters-5">
                                        {typeAccountAll && typeAccountAll.length > 0 && typeAccountAll.map((item, index) => {
                                            let isDisabledSwitch = item.value === userInfo.accountTypeLever
                                            return (
                                                <div className="col-12 col-sm-3 level-account" onClick={() => onNextStep(item, isDisabledSwitch)}>
                                                    <div className={`box-item box-item-${index} ` + (isDisabledSwitch ? "disabled-switch" : "")}>
                                                        <div className="level-desc text-center">
                                                            <div className="level-title">
                                                                {item.label}
                                                            </div>
                                                            <div className="level-detail">
                                                                <div className="limit-post">
                                                                    {`Tối đa ${item.countNewsUpload} tin`}
                                                                </div>
                                                                <div className="reset-day-post">
                                                                    Làm mới 1 lần/tin/ngày
                                                                </div>
                                                            </div>
                                                        </div>

                                                        <div className="action-switch text-center">
                                                            <button className="btn btn-switch">
                                                                Chuyển đổi
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            )
                                        })}
                                    </div>
                                </div>
                            </>
                        }
                        {
                            step === 2 &&
                            <div className="main-content">
                                <h2>
                                    Thông tin chuyển đổi
                                </h2>
                                <table class="basic-table">
                                    <thead>
                                        <tr>
                                            <th className="text-center" ></th>
                                            <th className="text-center" >Hiện tại</th>
                                            <th className="text-center" >Mới</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {/* <tr>
                                            <td></td>
                                            <td>Hiện tại</td>
                                            <td>Mới</td>
                                        </tr> */}
                                        <tr className="text-center">
                                            <td>Gói thành viên</td>
                                            <td>{oldPackage && oldPackage.label}</td>
                                            <td>{newPackage && newPackage.label}</td>
                                        </tr>
                                        <tr className="text-center">
                                            <td>Số lượng tin đăng</td>
                                            <td>{oldPackage && oldPackage.countNewsUpload}</td>
                                            <td>{newPackage && newPackage.countNewsUpload}</td>
                                        </tr>
                                        <tr className="text-center">
                                            <td>Số tháng đăng ký</td>
                                            <td></td>
                                            <td className="text-center" >{dataResgister.countMonth}</td>
                                        </tr>
                                    </tbody>
                                </table>

                                <div className="container-action style-add">
                                    <button class="btn btn-mogi-1" onClick={() => { setStep(1) }}><i class="icon icon-arrow-line-left" ></i> Quay lại</button>
                                    <button class="btn btn-continue" onClick={Submit} >Thanh toán </button>
                                </div>
                            </div>
                        }
                    </div>
                </div>
            </div>
        </PageContainerBroker >
    )
}

export default RegisterTypeAccount