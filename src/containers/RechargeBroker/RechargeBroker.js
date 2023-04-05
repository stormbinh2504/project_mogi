import React, { useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { useSelector, useDispatch } from "react-redux";
import Header from '../Header/Header'
import "./RechargeBroker.scss"
import PageContainerBroker from '../../components/Broker/PageContainerBroker/PageContainerBroker';
import LogoPayPal from '../../assets/images/recharge/logo-paypal.jpg'
import PaypalCheckoutButton from './../../components/Broker/PaypalCheckoutButton/PaypalCheckoutButton';
import StripeCheckoutButton from './../../components/Broker/StripeCheckoutButton/StripeCheckoutButton';

const RechargeBroker = () => {
    const [value, setValue] = useState(1);
    const history = useHistory()
    const dispatch = useDispatch()
    const onGoToRecharge = () => {
        history.push("/nap-tien")
    }
    const onChange = (e) => {
        console.log('radio checked', e.target.value);
        setValue(e.target.value);
    };

    const product = {
        description: "Design+Code React Hooks Course",
        price: 19
    };

    return (
        <PageContainerBroker
            titleId={"Nạp tiền"}
        >
            <div className="recharge-broker">
                <div className="recharge-broker-content row gutters-5">
                    <div className="col-8 deposit-method">
                        <div class="payment-list">
                            <div className="payment-item">
                                <input type="radio" name="mode-select"
                                    checked={value}
                                    onChange={onChange}
                                >
                                </input>
                                <div className="image-row">
                                    <img src={LogoPayPal} />
                                    <span className="note">
                                        Paypal
                                    </span>
                                </div>
                            </div>
                            <div className="payment-item">
                                <input type="radio" name="mode-select"
                                    checked={value}
                                    onChange={onChange}
                                >
                                </input>
                                <div className="image-row">
                                    <img src={LogoPayPal} />
                                    <span className="note">
                                        Strip card
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div class="command">
                            <button class="btn btn-mogi-1"><i class="icon icon-arrow-line-left"></i> Quay lại</button>
                            <button class="btn btn-continue" >Tiếp tục &nbsp;<i class="fa fa-angle-right"></i></button>
                        </div>
                    </div>
                    <div className="col-4 deposit-balance">
                        <div class="panel-wrap">
                            <div class="panel-body">
                                <table class="table-deposit-balance">
                                    <tbody>
                                        <tr>
                                            <td><i class="fa fa-dollar"></i>Tài khoản chính </td>
                                            <td class="text-right"><b class="ng-binding">0</b></td>
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
                </div>

                <div className="paypal-button-container">
                    <PaypalCheckoutButton
                        product={product}
                    />
                </div>
                <div className="stripe-button-container">
                    <StripeCheckoutButton
                        product={product}
                    />
                </div>
            </div>
        </PageContainerBroker >
    )
}

export default RechargeBroker