import React, { useState, useEffect } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { useSelector, useDispatch } from "react-redux";
import { alertType } from '../../redux/actions';
import { ToastUtil, uploadImgToFireBase, deleteFromFirebase, TYPE_PROPERTY_CATEGORY, CommonUtils } from '../../utils';
import { accountService, globalService } from '../../services';
import BannerBlog from "../../assets/images/banner_blog.png"

import "./PageDetailBlogs.scss"
import SilderImageThumbnail from '../../components/SilderImageThumbnail/SilderImageThumbnail';
import Avatar from '../../assets/images/avatar.png'
import img_zalo from "../../assets/images/img_zalo.png"
import PageBreadcrumb from '../PageContentContainer/PageBreadcrumb/PageBreadcrumb';
import PagePropertySame from '../PageContentContainer/PagePropertySame/PagePropertySame';
import PageBreadcrumbBlog from './PageBreadcrumbBlog/PageBreadcrumbBlog';

const PageDetailBlogs = () => {
    const history = useHistory()
    const dispatch = useDispatch()
    const state = useSelector((state) => state);
    const { auth, app, user } = state
    const { userInfo } = user
    const { location } = history
    const { pathname } = location

    const [infoDetail, setInfoDetail] = useState({})

    useEffect(() => {
        fetchGetDetailBlogs()
    }, []);


    const fetchGetDetailBlogs = async () => {
        dispatch(alertType(true))
        let id = null
        if (pathname) {
            id = pathname.split("/")[2]
        }
        await accountService.blogsDetail(id)
            .then(res => {
                setInfoDetail(res)
                dispatch(alertType(false))
            })
            .catch(error => {
                dispatch(alertType(false))
                ToastUtil.errorApi(error);
            });
    }


    // console.log("binh_PageDetailNews", { infoDetail, infoNews, infoUser, introducesConvert })
    console.log("binh_PageDetailNews", { infoDetail1: infoDetail })
    return (
        <div class="page-detail-news" >
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <PageBreadcrumbBlog
                            nameDetail={(infoDetail && infoDetail.title) || ''}
                            prevPageTitle={{
                                "name": "blogs",
                                "pathName": "/blogs"
                            }}
                        />
                    </div>
                    <div className="col-9">
                        <div className="row">
                            <div className="col-12">
                                <div className="title item-center">
                                    {infoDetail.title}
                                </div>
                            </div>

                            <div className="col-12 tach">
                                <div className="share-content">
                                    <div className="icon-contact share">
                                        <span>
                                            <i class="fa fa-share-alt" aria-hidden="true"></i>
                                        </span>
                                    </div>
                                    <div className="icon-contact fb">
                                        <span>
                                            <i class="fa fa-facebook" aria-hidden="true"></i>
                                        </span>
                                    </div>
                                    <div className="icon-contact twitter">
                                        <span>
                                            <i class="fa fa-twitter" aria-hidden="true"></i>
                                        </span>
                                    </div>
                                    <div className="icon-contact pinterest">
                                        <span>
                                            <i class="fa fa-pinterest-p" aria-hidden="true"></i>
                                        </span>
                                    </div>
                                    <div className="icon-contact whatsapp">
                                        <span>
                                            <i class="fa fa-whatsapp" aria-hidden="true"></i>
                                        </span>
                                    </div>
                                </div>
                            </div>

                            <div className="col-12">
                                <div className="" dangerouslySetInnerHTML={{ __html: infoDetail.content }}></div>
                            </div>
                        </div>
                    </div>
                    <div className="col-3">
                        <div className="property-extra">
                            <div className="banner-img">
                                <img src={BannerBlog} />
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div >
    )
}

export default PageDetailBlogs