import React, { useState, useEffect } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { useSelector, useDispatch } from "react-redux";
import Header from '../Header/Header'
import "./PageBlogs.scss"
import PageSearchFilterBroker from './PageSearchBlogs/PageSearchBlogs';
import PageBreadcrumb from '../PageContentContainer/PageBreadcrumb/PageBreadcrumb';
import Banner from "../../assets/images/banner.png"
import { alertType, updateDataFilterNews } from '../../redux/actions';
import { ToastUtil, uploadImgToFireBase, deleteFromFirebase, TYPE_PROPERTY_CATEGORY } from '../../utils';
import { accountService, globalService } from '../../services';
import PageListBlogs from './PageListBlogs/PageListBlogs';
import PageSearchBlogs from './PageSearchBlogs/PageSearchBlogs';
import BannerBlog from "../../assets/images/banner_blog.png"
const PageBlogs = () => {
    const history = useHistory()
    const dispatch = useDispatch()
    const state = useSelector((state) => state);
    const { auth, app, user } = state
    const { userInfo } = user
    const [listCates, setListCates] = useState(null)

    const [dataEdit, setDataEdit] = useState({});

    console.log("binh_check_PropertyManagement", dataEdit)
    return (
        <div class="page-content-container" >
            <div className="container">
                <div className="search-bar">
                    <PageSearchBlogs />
                </div>

                <div className="breadcrumb-content">
                    <PageBreadcrumb
                        prevPageTitle={{
                            "name": "Tìm blog",
                            "pathName": "/blogs"
                        }} />
                </div>
                <div className="row">
                    <div className="col-9">
                        <div className="property-list">
                            <PageListBlogs />
                        </div>
                    </div>
                    <div className="col-3">
                        <div className="property-extra">
                            <div className="banner-img">
                                <img src={BannerBlog} />
                            </div>
                            {/* <div className="info-statistic">
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
                            </div> */}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PageBlogs