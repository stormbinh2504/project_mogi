import React from 'react'
import { Link, useHistory } from 'react-router-dom'
import { useSelector, useDispatch } from "react-redux";
import Header from '../Header/Header'
import "./HomeBroker.scss"
import PageContainerBroker from './../../components/Broker/PageContainerBroker/PageContainerBroker';
import Avatar from '../../assets/images/avatar.png'
import Zalo from '../../assets/images/zalo.png'
const HomeBroker = () => {
    const history = useHistory()
    const dispatch = useDispatch()
    const onGoToRecharge = () => {
        history.push("/nap-tien")
    }

    return (
        <PageContainerBroker
            titleId={"Thông tin cá nhân"}
        >
            <div className="home-broker">
                <div className="home-broker-content row gutters-5">
                    <div className="col-4 side-bar">
                        <div className="widget user-profile ">
                            <div className="avatar item-center">
                                <img src={Avatar} />
                            </div>
                            <div className="user-name item-center ">
                                Nguyễn Ngọc Bình
                            </div>
                            <div className="user-phone item-center">
                                0522982504
                            </div>
                            <div className="user-level item-center">
                                <i className="fa fa-edit"></i>
                                <span className="savings">Gói Tiết kiệm</span>
                            </div>
                        </div>
                        <div className="widget info-support">
                            <div className="title">Nhân viên hỗ trợ</div>
                            <ul className="support-staff">
                                <li>
                                    <i className="fa fa-user"></i>Nguyễn Trần Thanh Ngân
                                </li>
                                <li>
                                    <i className="fa fa-phone"></i><a href="tel:0899381845" target="_top"><span>0899381845</span></a>
                                </li>
                                <li>
                                    <i className="zaloicon"></i>0899381845
                                </li>

                            </ul>
                        </div>
                        <div className="widget mbpay">
                            <ul className="mbpay-balance">
                                <li className="">
                                    <i className="fa fa-dollar"></i>Tài khoản chính
                                    <span className="value ng-binding text-right" >0</span>
                                </li>
                                <li className="">
                                    <i className="fa fa-gift"></i>Khuyến mãi
                                    <span className="value ng-binding text-right" >0</span>
                                </li>
                            </ul>
                            <div className="container-btn-mbpay text-right">
                                <button className="btn-mbpay" onClick={onGoToRecharge}>
                                    Nạp tiền
                                </button>
                            </div>
                        </div>
                        <div className="banner-account">
                            <div className="banner-content">
                            </div>
                        </div>
                    </div>
                    <div className="col-8 main-section">
                        <div className="dashboard-section">
                            <div className="title">Tin đăng của tôi</div>
                            <div className="summary">
                                <div className="summary-item">
                                    <span>Đang đăng:</span>
                                    <span className="counter ng-binding">0</span>
                                    <button className="btn-detail">Chi tiết</button>
                                </div>
                                <div className="summary-item">
                                    <span>Tin lỗi:</span>
                                    <span className="counter ng-binding" >0</span>
                                    <button className="btn-detail">Chi tiết</button>
                                </div>
                                <div className="summary-item">
                                    <span>Tin khác:</span>
                                    <span className="counter ng-binding" >0</span>
                                    <button className="btn-detail">Chi tiết</button>
                                </div>
                                <div className="summary-item">
                                    <span>Tổng số tin:</span>
                                    <span className="counter ng-binding">0/20</span>
                                    <button className="btn-detail">Chi tiết</button>
                                </div>
                            </div>
                        </div>
                        <div class="trial-warning">
                            <p><b>Lưu ý:</b> Tài khoản dùng thử chỉ được đăng tối đa <b>3 tin</b>.</p>
                        </div>
                        <div class="dashboard-section">
                            <div class="title">Khu vực môi giới</div>
                            <div class="summary dashboard-table subscription">
                                <div class="dashboard-row clearfix ng-scope">
                                    <div className="summary-item">
                                        <span>Hà Nội</span>
                                        <span className="counter ng-binding">Hết hạn <span ng-bind="item.ExpiredDate | date: 'dd/MM/yyyy'" class="ng-binding">18/12/2022</span></span>
                                        <button className="btn-detail">Gia hạn</button>
                                    </div>
                                </div>
                            </div>
                            <div class="buy-more-subscription">
                                <a ng-href="/phi-thanh-vien" href="/phi-thanh-vien"><i class="fa fa-plus-circle"></i> Thêm khu vực môi giới</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </PageContainerBroker>
    )
}

export default HomeBroker