import React, { useState, useEffect } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { useSelector, useDispatch } from "react-redux";
import { alertType } from '../../redux/actions';
import { ToastUtil, uploadImgToFireBase, deleteFromFirebase, TYPE_PROPERTY_CATEGORY, CommonUtils } from '../../utils';
import { accountService, globalService } from '../../services';

import "./PageDetailNews.scss"
import PageDesciption from './PageDesciption/PageDesciption'
import PageSearchFilterNews from './PageSearchFilterNews/PageSearchFilterNews';
import PageListNews from './PageListNews/PageListNews';
import SilderImageThumbnail from '../../components/SilderImageThumbnail/SilderImageThumbnail';
import PageBreadcrumb from './PageBreadcrumb/PageBreadcrumb';
import Avatar from '../../assets/images/avatar.png'
import PagePropertySame from './PagePropertySame/PagePropertySame';
import img_zalo from "../../assets/images/img_zalo.png"

const PageDetailNews = () => {
    const history = useHistory()
    const dispatch = useDispatch()
    const state = useSelector((state) => state);
    const { auth, app, user } = state
    const { userInfo } = user
    const { location } = history
    const { pathname } = location

    const [infoDetail, setInfoDetail] = useState(null)
    const [infoNews, setInfoNews] = useState(null)
    const [infoUser, setInfoUser] = useState(null)

    const [isShowPhone, setIsShowPhone] = useState(false)

    useEffect(() => {
        fetchGetFindNewsDetailCustomer()
    }, []);


    const fetchGetFindNewsDetailCustomer = async () => {
        dispatch(alertType(true))
        let id = null
        if (pathname) {
            id = pathname.split("/")[2]
        }
        await globalService.getFindNewsDetailCustomer(id)
            .then(res => {
                if (res) {
                    setInfoDetail(res.createPropertyDTO)
                    setInfoNews(res.news)
                    setInfoUser(res.user)
                }
                dispatch(alertType(false))
            })
            .catch(error => {
                dispatch(alertType(false))
                ToastUtil.error(error);
            });
    }
    let images = []

    if (infoDetail && infoDetail.imageList && infoDetail.imageList.length > 0) {
        images = infoDetail.imageList.map((item, index) => {
            return {
                original: item.url,
                thumbnail: item.url,
            }
        })
    }

    let phoneFake = "0969006768"
    let phone = "0969006768"
    if (infoDetail && infoDetail.phone) {
        phoneFake = infoDetail.phone
        phone = infoDetail.phone
    }
    if (!isShowPhone) {
        phoneFake = phoneFake.slice(0, -3) + '***';
    }


    let introducesConvert = ""
    if (infoDetail && infoDetail.introduces) {
        introducesConvert = infoDetail.introduces
        introducesConvert = introducesConvert.replace(/\n/g, "<br />");
    }

    // console.log("binh_PageDetailNews", { infoDetail, infoNews, infoUser, introducesConvert })
    console.log("binh_PageDetailNews", { infoDetail1: infoDetail && infoDetail.introduces, introducesConvert })
    return (
        <div class="page-detail-news" >
            <div className="container">
                <div className="breadcrumb-content">
                    <PageBreadcrumb
                        nameDetail={(infoNews && infoNews.nameNews) || ''}
                    />
                </div>
                <div className="row">
                    <div className="col-8">
                        <div className="main-info">
                            <div className="gallery">
                                <SilderImageThumbnail
                                    images={images}
                                />
                            </div>
                            <h1 className="info-title">
                                {infoNews && infoNews.nameNews}
                            </h1>
                            <div className="info-addr">
                                {infoNews && infoNews.address}
                            </div>
                            <div className="info-price">
                                {CommonUtils.formatNumber(infoDetail && infoDetail.priceLoan, 0)}
                            </div>
                            <div className="info-title">
                                Thông tin chính
                            </div>
                            <div className="info-attr">
                                <div className="row">
                                    <div className="col-6 content-info-attr">
                                        <div className="label-info-attr">Diện tích sử dụng</div>
                                        <div className="value-info-attr">{infoDetail && infoDetail.areaUse} m<sup>2</sup></div>
                                    </div>
                                    <div className="col-6 content-info-attr">
                                        <div className="label-info-attr">Phỏng ngủ</div>
                                        <div className="value-info-attr">{infoDetail && infoDetail.bedCount}</div>
                                    </div>
                                    <div className="col-6 content-info-attr">
                                        <div className="label-info-attr">Nhà tắm</div>
                                        <div className="value-info-attr">{infoDetail && infoDetail.bathCount}</div>
                                    </div>
                                    <div className="col-6 content-info-attr">
                                        <div className="label-info-attr">Pháp lý</div>
                                        <div className="value-info-attr">{infoDetail && infoDetail.areaUse}</div>
                                    </div>
                                    <div className="col-6 content-info-attr">
                                        <div className="label-info-attr">Ngày đăng</div>
                                        <div className="value-info-attr">{infoNews && infoNews.dateCreate}</div>
                                    </div>
                                    <div className="col-6 content-info-attr">
                                        <div className="label-info-attr">Mã BĐS</div>
                                        <div className="value-info-attr">{infoNews && infoNews.id}</div>
                                    </div>
                                </div>
                            </div>
                            <div className="info-title">
                                Giới thiệu
                            </div>
                            <div className="info-introduce">
                                <div className="" dangerouslySetInnerHTML={{ __html: introducesConvert }}></div>
                            </div>
                            <div className="info-title">
                                Diện tích xung quanh
                            </div>
                            <div className="info-location">
                                {infoDetail && <div className="" dangerouslySetInnerHTML={{ __html: infoDetail.location }}></div>}
                            </div>
                        </div>
                    </div>
                    <div className="col-4">
                        <div className="info-user">
                            <div className="agent-widget">
                                <div className="agent-info">
                                    <img src={Avatar} />
                                    <div className="agent-name">
                                        {infoUser && `${infoUser.firstName} ${infoUser.lastName}`}
                                    </div>
                                </div>
                                <div className="agent-contact">
                                    <div className="info-phone">
                                        <span className='number-phone'>
                                            <a className='number-phone' href={`tel:${phone}`} target="_top">
                                                <i className="fa fa-phone"></i><span>{phoneFake}</span>
                                            </a>
                                        </span>
                                        <span className='click-show' onClick={() => setIsShowPhone(true)}>
                                            Bấm để hiện số
                                        </span>
                                    </div>
                                    <div className="info-email">
                                        <a className="wrap-info" href={`https://zalo.me/${phone}`} target="_blank">
                                            <span>
                                                <img src={img_zalo} alt="icon" />
                                            </span>
                                            <span>
                                                Liên hệ Zalo
                                            </span>
                                        </a>
                                    </div>
                                    <div className="info-email">
                                        <span>
                                            <i class="fa fa-envelope" aria-hidden="true"></i>
                                        </span>
                                        <span>
                                            Gửi tin nhắn
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="property-same">
                    <div className="info-title">
                        Bất động sản tương tự
                    </div>
                    <PagePropertySame />
                </div>
            </div>
        </div >
    )
}

export default PageDetailNews