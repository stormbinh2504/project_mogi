import React, { useState, useEffect, useRef, useCallback } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { useSelector, useDispatch } from "react-redux";
import { alertType, updateDataFilterBlogs } from '../../../redux/actions';
import { ToastUtil, uploadImgToFireBase, deleteFromFirebase, TYPE_PROPERTY_CATEGORY, useOnClickOutside } from '../../../utils';
import { accountService, globalService } from '../../../services';

import "./PageSearchBlogs.scss"
import _ from 'lodash';
import Select from 'react-select';

const PageSearchBlogs = () => {
    const history = useHistory()
    const dispatch = useDispatch()
    const state = useSelector((state) => state);
    const { auth, app, user } = state
    const { userInfo } = user
    const { filterBlogs } = app

    const [provinceAll, setProvinceAll] = useState([])
    const [filterNameSearch, setFilterNameSearch] = useState(null)

    useEffect(() => {
        if (filterBlogs.nameSearch) {
            setFilterNameSearch(filterBlogs.nameSearch)
        }
    }, [filterBlogs.nameSearch]);

    const debounceSetBlogs = useCallback(
        _.debounce((value) => {
            let objData = { "searchName": value }
            dispatch(updateDataFilterBlogs(objData))
        }, 1500), [dispatch]
    )

    const handleChangeInput = e => {
        const { value } = e.target;
        setFilterNameSearch(value);
        debounceSetBlogs(value);
    }

    console.log("PageSearchFilterNews_render", { filterBlogs, provinceAll })

    return (
        <div class="page-search-filter-news" >
            <div className="search-filter-name">
                <input className="custom-focus-input" value={filterNameSearch}
                    onChange={handleChangeInput} placeholder='Từ khóa' />

                <span>
                    <i class="fa fa-search" aria-hidden="true"></i>
                </span>
            </div>
        </div >
    )
}

export default PageSearchBlogs