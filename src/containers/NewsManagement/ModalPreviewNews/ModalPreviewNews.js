import React, { useState, useEffect } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { useSelector, useDispatch } from "react-redux";
import "./ModalPreviewNews.scss"
import { Space, Table, Tag } from 'antd';
import DraggableModal from '../../../components/DraggableModal/DraggableModal';
import { alertType } from '../../../redux/actions';
import DatePickerCustom from '../../../components/DatePickerCustom/DatePickerCustom';
import { ToastUtil, uploadImgToFireBase, deleteFromFirebase, TYPE_PROPERTY_CATEGORY, CommonUtils } from '../../../utils';
import { accountService, globalService } from '../../../services';

import SilderImageThumbnail from '../../../components/SilderImageThumbnail/SilderImageThumbnail';
import Avatar from '../../../assets/images/avatar.png'
import img_zalo from "../../../assets/images/img_zalo.png"
import PageBreadcrumb from '../../PageContentContainer/PageBreadcrumb/PageBreadcrumb';

const ModalPreviewNews = (props) => {
    const { isOpen, onClose, dataPreview } = props
    const history = useHistory()
    const dispatch = useDispatch()
    const state = useSelector((state) => state);
    const { auth, app, user } = state
    const { userInfo } = user
    const { location } = history

    const [infoDetail, setInfoDetail] = useState(null)
    const [infoNews, setInfoNews] = useState(null)
    const [infoUser, setInfoUser] = useState(null)

    const [isShowPhone, setIsShowPhone] = useState(false)

    useEffect(() => {
        fetchGetFindNewsDetailCustomer()
    }, []);


    const fetchGetFindNewsDetailCustomer = async () => {
        dispatch(alertType(true))
        const { id } = dataPreview
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
                ToastUtil.errorApi(error);
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
        <DraggableModal
            isOpen={isOpen}
            onClose={onClose}
            className={"modal-preview-news"}
            titleId={"Thông tin chi tiết"}
            toggle={onClose}
        >
            <div className="body">
                <div className="main-info">
                    <div className="gallery">
                        <SilderImageThumbnail
                            images={images}
                        />
                    </div>
                    <h1 className="info-title">
                        {infoDetail && infoDetail.nameProperty}
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
                                <div className="value-info-attr">{infoNews && CommonUtils.formatDateCeateApi(infoNews.dateCreate)}</div>
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
        </DraggableModal>
    )
}

export default ModalPreviewNews