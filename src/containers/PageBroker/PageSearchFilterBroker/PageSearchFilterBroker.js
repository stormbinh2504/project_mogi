import React, { useState, useEffect, useRef, useCallback } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { useSelector, useDispatch } from "react-redux";
import { alertType, updateDataFilterAgency } from '../../../redux/actions';
import { ToastUtil, uploadImgToFireBase, deleteFromFirebase, TYPE_PROPERTY_CATEGORY, useOnClickOutside } from '../../../utils';
import { accountService, globalService } from '../../../services';

import "./PageSearchFilterBroker.scss"
import _ from 'lodash';
import Select from 'react-select';

const PageSearchFilterBroker = () => {
    const history = useHistory()
    const dispatch = useDispatch()
    const state = useSelector((state) => state);
    const { auth, app, user } = state
    const { userInfo } = user
    const { filterAgency } = app

    const [provinceAll, setProvinceAll] = useState([])
    const [filterNameSearch, setFilterNameSearch] = useState(null)

    useEffect(async () => {
        await fetchGetProvinceAll()
    }, []);

    const fetchGetProvinceAll = async () => {
        dispatch(alertType(true))
        await globalService.getProvinceAll()
            .then(res => {
                if (res && res.length > 0) {
                    let _provinceAll = res.map((item, index) => {
                        return { value: item.provinceCode, label: item.provinceName }
                    })
                    setProvinceAll(_provinceAll)
                    dispatch(alertType(false))
                }
            })
            .catch(error => {
                dispatch(alertType(false))
                ToastUtil.errorApi(error);
            });
    }

    useEffect(() => {
        if (filterAgency.nameSearch) {
            setFilterNameSearch(filterAgency.nameSearch)
        }
    }, [filterAgency.nameSearch]);

    const debounceSetFilterAgency = useCallback(
        _.debounce((value) => {
            let objData = { "nameSearch": value }
            dispatch(updateDataFilterAgency(objData))
        }, 2000), [dispatch]
    )

    const handleChangeInput = e => {
        const { value } = e.target;
        setFilterNameSearch(value);
        debounceSetFilterAgency(value);
    }


    const onChangeSelectProvince = (objValue) => {
        dispatch(updateDataFilterAgency(
            {
                provinceCode: objValue.value
            }
        ))
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
            <div className="select-option">
                <div className="custom-input-react-select">
                    <Select
                        onChange={onChangeSelectProvince}
                        options={provinceAll}
                        value={
                            provinceAll.filter((option) => {
                                return option.value == filterAgency.provinceCode
                            })
                        }
                    />
                </div>
            </div>
        </div >
    )
}

export default PageSearchFilterBroker