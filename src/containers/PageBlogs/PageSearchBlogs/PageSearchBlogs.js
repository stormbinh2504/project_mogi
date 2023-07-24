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
    const { filterAgency } = app

    const [provinceAll, setProvinceAll] = useState([])
    const [filterNameSearch, setFilterNameSearch] = useState(null)

    useEffect(() => {
        if (filterAgency.nameSearch) {
            setFilterNameSearch(filterAgency.nameSearch)
        }
    }, [filterAgency.nameSearch]);

    const debounceSetBlogs = useCallback(
        _.debounce((value) => {
            let objData = { "nameSearch": value }
            dispatch(updateDataFilterBlogs(objData))
        }, 2000), [dispatch]
    )

    const handleChangeInput = e => {
        const { value } = e.target;
        setFilterNameSearch(value);
        debounceSetBlogs(value);
    }

    console.log("PageSearchFilterNews_render", { filterAgency, provinceAll })

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