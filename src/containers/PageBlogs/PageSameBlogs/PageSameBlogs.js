import React, { useState, useEffect } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { useSelector, useDispatch } from "react-redux";
import { alertType } from '../../../redux/actions';
import { ToastUtil, uploadImgToFireBase, deleteFromFirebase, TYPE_PROPERTY_CATEGORY, CommonUtils } from '../../../utils';
import { accountService, globalService } from '../../../services';
import Slider from "react-slick";
import BannerBlog from "../../../assets/images/banner_blog.png"
import "./PageSameBlogs.scss"

const PageSameBlogs = () => {
    const history = useHistory()
    const dispatch = useDispatch()
    const state = useSelector((state) => state);
    const { auth, app, user } = state
    const { filterNews } = app

    const { userInfo } = user
    const { location } = history
    const { pathname } = location
    const [dataListBlogs, setDataListBlogs] = useState([])

    useEffect(() => {
        onFilterBlogs(0)
    }, []);


    const onFilterBlogs = async (page) => {
        let body = {
            "searchName": null,
            "page": 0,
            "size": 5
        }

        console.log("binh_onFilterBroker", { body })
        dispatch(alertType(true))
        await accountService.getAllBlogs(body)
            .then(res => {
                if (res) {
                    if (res.content && res.content.length > 0) {
                        setDataListBlogs(res.content)
                    } else {
                        setDataListBlogs([])
                    }
                    dispatch(alertType(false))
                }
            })
            .catch(error => {
                dispatch(alertType(false))
                ToastUtil.errorApi(error);
            });
    }


    const onRedirectDetail = (record) => {
        console.log("binh_onRedirectDetail", record)
        const { id } = record
        if (id) {
            let pathname = `blogs/${id}`
            // history.push(pathname)
            window.location.pathname = pathname
        }
    }

    console.log("binh_ProjectTop", { history, dataListBlogs })
    return (
        <div class="page-same-blogs" >
            <div className="property-extra">
                <div className="banner-img">
                    <img src={BannerBlog} />
                </div>

                <div className="info-statistic">
                    <div className="list-blogs">
                        {dataListBlogs && dataListBlogs.length > 0 && dataListBlogs.map((item, index) => {
                            return (
                                <div className="item-blog" onClick={() => onRedirectDetail(item)}>
                                    <div className="block-img">
                                        <img src={item.url} />
                                    </div>
                                    <div className="block-title">
                                        <div className="title-blog">
                                            {item.title}
                                        </div>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
        </div >
    )
}

export default PageSameBlogs