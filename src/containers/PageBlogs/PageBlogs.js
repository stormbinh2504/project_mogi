import React, { useState, useEffect } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { useSelector, useDispatch } from "react-redux";
import Header from '../Header/Header'
import "./PageBlogs.scss"
import PageSearchFilterBroker from './PageSearchBlogs/PageSearchBlogs';
import PageBreadcrumb from '../PageContentContainer/PageBreadcrumb/PageBreadcrumb';
import { alertType, updateDataFilterNews } from '../../redux/actions';
import { ToastUtil, uploadImgToFireBase, deleteFromFirebase, TYPE_PROPERTY_CATEGORY } from '../../utils';
import { accountService, globalService } from '../../services';
import PageListBlogs from './PageListBlogs/PageListBlogs';
import PageSearchBlogs from './PageSearchBlogs/PageSearchBlogs';
import PageSameBlogs from './PageSameBlogs/PageSameBlogs';
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
                        <PageSameBlogs />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PageBlogs