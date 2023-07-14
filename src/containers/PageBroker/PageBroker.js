import React, { useState, useEffect } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { useSelector, useDispatch } from "react-redux";
import Header from '../Header/Header'
import "./PageBroker.scss"
import PageSearchFilterBroker from './PageSearchFilterBroker/PageSearchFilterBroker';
import PageBreadcrumb from '../PageContentContainer/PageBreadcrumb/PageBreadcrumb';
import PageListBroker from './PageListBroker/PageListBroker';
import Banner from "../../assets/images/banner.png"
import { alertType, updateDataFilterNews } from '../../redux/actions';
import { ToastUtil, uploadImgToFireBase, deleteFromFirebase, TYPE_PROPERTY_CATEGORY } from '../../utils';
import { accountService, globalService } from '../../services';

const PageBroker = () => {
    const history = useHistory()
    const dispatch = useDispatch()
    const state = useSelector((state) => state);
    const { auth, app, user } = state
    const { userInfo } = user
    const [listCates, setListCates] = useState(null)

    const [dataEdit, setDataEdit] = useState({});

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
        history.push("/thue-nha-dat")
    }

    console.log("binh_check_PropertyManagement", dataEdit)
    return (
        <div class="page-content-container" >
            <div className="container">
                <div className="search-bar">
                    <PageSearchFilterBroker />
                </div>

                <div className="breadcrumb-content">
                    <PageBreadcrumb
                        prevPageTitle={{
                            "name": "Tìm môi giới",
                            "pathName": "/tim-moi-gioi"
                        }} />
                </div>
                <div className="row">
                    <div className="col-9">
                        <div className="property-list">
                            <PageListBroker />
                        </div>
                    </div>
                    <div className="col-3">
                        <div className="property-extra">
                            <div className="banner-img">
                                <img src={Banner} />
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
            </div>
        </div>
    )
}

export default PageBroker