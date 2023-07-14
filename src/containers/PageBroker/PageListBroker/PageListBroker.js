import React, { useState, useEffect } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { useSelector, useDispatch } from "react-redux";
import { alertType, updateDataFilterNews } from '../../../redux/actions';
import { ToastUtil, uploadImgToFireBase, deleteFromFirebase, TYPE_PROPERTY_CATEGORY, CommonUtils } from '../../../utils';
import { accountService, globalService } from '../../../services';

import "./PageListBroker.scss"
import PaginationComponent from '../../../components/PaginationComponent/PaginationComponent';

let pageSize = 5
let df_body_broker = {
    "nameSearch": null,
    "provinceCode": null,
    "rangeDaySearch": 365,
    "page": 0,
    "size": pageSize
}

const PageListBroker = () => {
    const history = useHistory()
    const dispatch = useDispatch()
    const state = useSelector((state) => state);
    const { auth, app, user } = state
    const { userInfo } = user
    const { filterAgency } = app
    const [dataListBrokers, setDataListBroker] = useState([])
    const [totalPages, setTotalPages] = useState(1);

    useEffect(() => {
        onFilterBroker(0)
    }, []);


    useEffect(() => {
        onFilterBroker(0)
    }, [filterAgency]);

    const onFilterBroker = async (page) => {
        let body = {
            ...df_body_broker,
            ...filterAgency,
            page: page
        }

        dispatch(alertType(true))
        await accountService.getFindAllAgency(body)
            .then(res => {
                if (res) {
                    if (res.content && res.content.length > 0) {
                        setDataListBroker(res.content)
                    } else {
                        setDataListBroker([])
                    }
                    setTotalPages(res.totalElements)
                    window.scrollTo(0, 0);
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
            globalService.setPlusViewForNews(id)
                .then(res => {
                })
                .catch(error => {
                    ToastUtil.errorApi(error);
                });
            let pathname = `thue-nha-dat/${id}`
            history.push(pathname)
        }
    }


    const onChangePage = (page) => {
        onFilterBroker(page)
    }

    console.log("PageListNews_render", { filterAgency: filterAgency, dataListBrokers: dataListBrokers })

    return (
        <div class="page-list-broker" >
            <h1 class="page-title">Môi Giới Bất Động Sản Uy Tín, Chuyên Gia Nhà Đất</h1>
            {/* <div class="property-list-result">
                <span ng-non-bindable=""><b>1 - 15</b> trong <b>355.731</b></span>
            </div> */}
            <div className="list-broker">
                {dataListBrokers && dataListBrokers.length > 0 && dataListBrokers.map((item, index) => {
                    let listDistrict = item.districtName1st.split(",")
                    return (
                        < div className="item-broker" >
                            <div className="row">
                                <div className="col-8 agent-info h-100">
                                    <div className="row ">
                                        <div className="col-4 block block-img">
                                            <img src={item.url} />
                                        </div>
                                        <div className="col-8 block block-content">
                                            <div className="item-info">
                                                <div className="info name">
                                                    {item.nameAgency}
                                                </div>
                                                <div className="info cmnd">
                                                    Đã xác thực CMND
                                                </div>
                                                <div className="info date">
                                                    <span>
                                                        Đã tham gia:
                                                    </span>
                                                    <span>
                                                        {CommonUtils.formatDateCeateApi(item.dateCreate)}
                                                    </span>
                                                </div>
                                                <div className="info phone">
                                                    <a className="wrap-info" href={`https://zalo.me/${item.phone}`} target="_blank">
                                                        <span>
                                                            <i class="fa fa-phone" aria-hidden="true"></i>
                                                        </span>
                                                        <span>
                                                            {item.phone}
                                                        </span>
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-4 agent-statistic h-100">
                                    <div className="prop-areas item-center">
                                        <div className="list-district">
                                            {listDistrict && listDistrict.length > 0 && listDistrict.map((districtt) => {
                                                return (
                                                    <div className="item-district">
                                                        {districtt}
                                                    </div>
                                                )
                                            })}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                })}
                {dataListBrokers && dataListBrokers.length == 0 && <div className='not-result item-center'>Không có kết quả tìm kiếm phù hợp </div>}
            </div >

            {dataListBrokers && dataListBrokers.length > 0 && <div className="pagination-broker">
                <PaginationComponent
                    dataPage={dataListBrokers}
                    totalPages={totalPages}
                    itemsPerPage={pageSize}
                    onChangePage={onChangePage}
                />
            </div>
            }
        </div >
    )
}

export default PageListBroker