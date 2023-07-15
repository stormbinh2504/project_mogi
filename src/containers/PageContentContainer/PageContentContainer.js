import React, { useState, useEffect } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { useSelector, useDispatch } from "react-redux";
import { alertType, updateDataFilterNews } from '../../redux/actions';
import { ToastUtil, uploadImgToFireBase, deleteFromFirebase, TYPE_PROPERTY_CATEGORY } from '../../utils';
import { accountService, globalService } from '../../services';

import "./PageContentContainer.scss"
import PageDesciption from './PageDesciption/PageDesciption'
import PageSearchFilterNews from './PageSearchFilterNews/PageSearchFilterNews';
import PageListNews from './PageListNews/PageListNews';
import PageBreadcrumb from './PageBreadcrumb/PageBreadcrumb';
import Banner from "../../assets/images/banner.png"
const PageContentContainer = () => {
    const history = useHistory()
    const dispatch = useDispatch()
    const state = useSelector((state) => state);
    const { auth, app, user } = state
    const { userInfo } = user
    const { listBanner } = app
    let imgBG3 = listBanner.find((item, index) => item.lever == 3)

    const [listCates, setListCates] = useState(null)

    useEffect(() => {
        fetchGetFindNewByCodeCate()
    }, []);


    const fetchGetFindNewByCodeCate = async () => {
        dispatch(alertType(true))
        await globalService.getFindNewByCodeCate()
            .then(res => {
                if (res && res.length > 0) {
                    setListCates(res)
                }
                dispatch(alertType(false))
            })
            .catch(error => {
                dispatch(alertType(false))
                ToastUtil.errorApi(error);
            });
    }

    const onHandleUpdateDataFilterNews = (record) => {
        dispatch(updateDataFilterNews({ "codeCateTypePropertyCategory": record.codeCate, "codeTypeProperty": null }))
    }

    console.log("binh_PageContentContainer", { listCates })

    return (
        <div class="page-content-container" >
            <div className="container">
                <div className="search-bar">
                    <PageSearchFilterNews />
                </div>

                <div className="breadcrumb-content">
                    <PageBreadcrumb
                        prevPageTitle={{
                            "name": "Cho thuê nhà đất",
                            "pathName": "/thue-nha-dat"
                        }}
                    />
                </div>
                <div className="row">
                    <div className="col-9">
                        <div className="property-list">
                            <PageListNews />
                        </div>
                    </div>
                    <div className="col-3">
                        <div className="property-extra">
                            <div className="banner-img">
                                <img src={imgBG3 ? imgBG3.imageUrl : Banner} />
                            </div>
                            <div className="info-statistic">
                                <div className="block-info">
                                    <h3>Loại bất động sản</h3>
                                    <div className="list-cates">
                                        {listCates && listCates.length > 0 && listCates.map((item, index) => {
                                            return (
                                                <div className="item-cate" onClick={() => onHandleUpdateDataFilterNews(item)} >
                                                    <span className='icon'><i class="fa fa-arrow-circle-o-right" aria-hidden="true"></i></span>
                                                    <span className='text'>{item.nameCodeCate}</span>
                                                    <span className='total'>({item.tong})</span>
                                                </div>
                                            )
                                        })}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="property-news">
                    <div className="row">
                        <div className="col-9">
                            <PageDesciption />
                        </div>
                        <div className="col-3">

                        </div>
                    </div>
                </div>
            </div>
        </div >
    )
}

export default PageContentContainer