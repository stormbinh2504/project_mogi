import React, { useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { useSelector, useDispatch } from "react-redux";
import Header from '../Header/Header'
import "./RechargeBroker.scss"
import PageContainerBroker from '../../components/Broker/PageContainerBroker/PageContainerBroker';
import LogoPayPal from '../../assets/images/recharge/logo-paypal.jpg'
import PaypalCheckoutButton from './../../components/Broker/PaypalCheckoutButton/PaypalCheckoutButton';
import StripeCheckoutButton from './../../components/Broker/StripeCheckoutButton/StripeCheckoutButton';
import NumberFormatCustom from '../../components/NumberFormatCustom/NumberFormatCustom';
import NumberInput from '../../components/Input/NumberInput/NumberInput';
import { accountService } from '../../services';
import { alertType, fetchUserInfoFromSavedSession } from '../../redux/actions';
import { CommonUtils, ToastUtil } from '../../utils';

const DF_PAYMENT_LIST = [
    {
        title: "Paypal",
        value: 1,
        img: LogoPayPal
    },
    {
        title: "Strip card",
        value: 2,
        img: LogoPayPal
    },
]

const DF_LIST_COMBO = [
    "5000000", "2000000", "1500000", "1000000", "500000", "200000", "100000", "50000", "20000"
]

const RechargeBroker = () => {
    const state = useSelector((state) => state);
    const { auth, app, user } = state
    const { userInfo } = user

    const [paymentSelect, setPaymentSelect] = useState(1);
    const [step, setStep] = useState(1);
    const [money, setMoney] = useState({
        value: null,
        valid: true,
    });
    const history = useHistory()
    const dispatch = useDispatch()

    const onGoToRecharge = () => {
        history.push("/recharge-broker")
    }
    const onChangePayment = (e) => {
        console.log('radio checked', e.target.value);
        setPaymentSelect(e.target.value);
    };

    const onMoneyChange = (value, valid) => {
        setMoney({
            value: value,
            valid: valid,
        })
    };

    const onHandleRechargeAccount = () => {

        let body = {
            "codeClient": userInfo.codeClient || "",
            "money": Number(money.value) || 0
        }

        dispatch(alertType(true))
        accountService.setRechargeAccount(body)
            .then(res => {
                if (res) {
                    dispatch(alertType(false))
                    ToastUtil.success("Nạp tiền thành công");
                    dispatch(fetchUserInfoFromSavedSession());
                }
            })
            .catch(error => {
                dispatch(alertType(false))
                ToastUtil.errorApi(error, "Nạp tiền không thành công");
            });
    }

    console.log("binh_check", paymentSelect)
    return (
        <PageContainerBroker
            titleId={"Nạp tiền"}
        >
            <div className="recharge-broker">
                <div className="container-recharge-broker">
                    {step == 1 &&
                        <div className="recharge-broker-content row gutters-5">
                            <div className="col-4 deposit-balance">
                                <div class="panel-wrap">
                                    <div class="panel-body">
                                        <table class="table-deposit-balance">
                                            <tbody>
                                                <tr>
                                                    <td><i class="fa fa-dollar"></i>Tài khoản chính </td>
                                                    <td class="text-right"><b class="ng-binding">{CommonUtils.formatNumber(userInfo.money, 0)}</b></td>
                                                </tr>
                                                <tr>
                                                    <td><i class="fa fa-gift"></i>Khuyến mãi </td>
                                                    <td class="text-right"><b class="ng-binding">0</b></td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>

                            <div className="col-8 deposit-method">
                                <div class="payment-list">
                                    {DF_PAYMENT_LIST.map((item, index) => {
                                        return (
                                            <div className="payment-item">
                                                <input type="radio" name="mode-select"
                                                    checked={paymentSelect == item.value}
                                                    onChange={onChangePayment}
                                                    value={item.value}
                                                >
                                                </input>
                                                <div className="image-row">
                                                    <img src={item.img} />
                                                    <span className="name-note">
                                                        {item.title}
                                                    </span>
                                                </div>
                                            </div>
                                        )
                                    })}
                                </div>
                            </div>
                            <div class="col-12 ">
                                <div className="container-action style-add">
                                    {/* <button class="btn btn-mogi-1"><i class="icon icon-arrow-line-left" ></i> Quay lại</button> */}
                                    <button class="btn btn-continue"
                                        onClick={() => {
                                            setStep(2)
                                            setMoney({ value: null, valid: false })
                                        }} >
                                        Tiếp tục &nbsp;<i class="fa fa-angle-right"></i>
                                    </button>
                                </div>
                            </div>
                        </div>
                    }
                    {step === 2 &&
                        <div className="form-recharge-number">
                            <div className="container-form-recharge-number">
                                <h2 className="title">
                                    Nạp tiền số tiền
                                </h2>
                                <div className="list-combo-suggest">
                                    <div className="row">
                                        {DF_LIST_COMBO.map((item, index) => {
                                            return (
                                                <div className="col-md-4 col-6">
                                                    <div className="item-combo item-center" onClick={() => { setMoney({ value: item, valid: true }) }}>
                                                        <NumberFormatCustom value={item} />
                                                    </div>
                                                </div>
                                            )
                                        })}
                                    </div>
                                </div>
                                <div className="input-number-money">
                                    <NumberInput
                                        name="To_Amount"
                                        className="input-money"
                                        min={0}
                                        max={999999999999}
                                        step={1}
                                        value={money.value}
                                        valid={money.valid}
                                        onChange={onMoneyChange}
                                        allowZero={false}
                                        allowDecimal={false}
                                        allowNegative={false}
                                        disabled={false}
                                        placeholder="Nhập số tiền"
                                    />
                                </div>
                            </div>
                            <div class="col-12 ">
                                <div className="container-action style-add">
                                    <button class="btn btn-mogi-1" onClick={() => { setStep(1) }}><i class="icon icon-arrow-line-left" ></i> Quay lại</button>
                                    <button class="btn btn-continue" onClick={() => {
                                        setStep(3)
                                    }} >Thanh toán &nbsp;<i class="fa fa-angle-right"></i></button>
                                </div>
                            </div>
                        </div>
                    }
                    {step === 3 &&
                        <div className="form-checkout">
                            <div className="container-form-checkout">
                                <h2 className="title">
                                    Thanh toán
                                </h2>
                                <div className="info-checkout">
                                    <div className="label">
                                        Phương thức thanh toán:
                                    </div>
                                    &nbsp;
                                    <div className="value">
                                        {paymentSelect === 1 && "Paypal"}
                                        {paymentSelect === 2 && "Stripe"}
                                    </div>
                                </div>
                                <div className="info-checkout">
                                    <div className="label">
                                        Số tiền nạp:
                                    </div>
                                    &nbsp;
                                    <div className="value">
                                        <NumberFormatCustom value={money.value} />&nbsp;(VND)
                                    </div>
                                </div>
                                <div className="method-checkout">
                                    {paymentSelect === 1 && <div className="paypal-button-container">
                                        <PaypalCheckoutButton
                                            product={{
                                                description: "Design+Code React Hooks Course",
                                                price: money.value
                                            }}
                                            onSubmit={onHandleRechargeAccount}

                                        />
                                    </div>
                                    }

                                    {paymentSelect === 2 &&
                                        <div className="stripe-button-container">
                                            <StripeCheckoutButton
                                                product={{
                                                    description: "Design+Code React Hooks Course",
                                                    price: money.value
                                                }}
                                            />
                                        </div>
                                    }
                                </div>
                            </div>
                            <div class="col-12 ">
                                <div className="container-action style-add">
                                    <button class="btn btn-mogi-1" onClick={() => { setStep(2) }}><i class="icon icon-arrow-line-left" ></i> Quay lại</button>
                                    {paymentSelect != 1 && <button class="btn btn-continue" onClick={() => { setStep(3) }} >Nạp ngay</button>}
                                </div>
                            </div>
                        </div>
                    }
                </div>
            </div>
        </PageContainerBroker >
    )
}

export default RechargeBroker