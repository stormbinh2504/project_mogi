import React, { useState, useEffect } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { useSelector, useDispatch } from "react-redux";
import { alertType, updateDataFilterNews } from '../../../redux/actions';
import { ToastUtil, uploadImgToFireBase, deleteFromFirebase, TYPE_PROPERTY_CATEGORY, CommonUtils } from '../../../utils';
import { accountService, globalService } from '../../../services';

import "./PageListNews.scss"
import PageDesciption from '../PageDesciption/PageDesciption'


let df_body_news = {
    "nameSearch": "",
    "provinceCode": "",
    "districtCode": "",
    "codeTypeProperty": "typeproperty_7",
    "codeCateTypePropertyCategory": "3",
    "priceStart": "",
    "priceEnd": "",
    "areaMinRange": "100",
    "areaMaxRange": "320",
    "totalRoom": "",
    "rangeDaySearch": 365,
    "page": 0,
    "size": 10
}

const PageListNews = () => {
    const history = useHistory()
    const dispatch = useDispatch()
    const state = useSelector((state) => state);
    const { auth, app, user } = state
    const { userInfo } = user
    const { filterNews } = app
    const [dataListNews, setDataListNews] = useState([])


    useEffect(() => {
        onFilterNews()
    }, [filterNews]);

    const onFilterNews = async () => {
        let body = {
            ...df_body_news,
            ...filterNews
        }

        dispatch(alertType(true))
        await globalService.getFindAllNewsCustomer(body)
            .then(res => {
                if (res) {
                    if (res.content && res.content.length > 0) {
                        setDataListNews(res.content)
                    } else {
                        setDataListNews([])
                    }
                    dispatch(alertType(false))
                }
            })
            .catch(error => {
                dispatch(alertType(false))
                ToastUtil.error(error);
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
                    ToastUtil.error(error);
                });
            let pathname = `thue-nha-dat/${id}`
            history.push(pathname)
        }
    }

    console.log("PageListNews_render", { filterNews: filterNews, dataListNews: dataListNews })

    return (
        <div class="page-list-news" >
            .<h1 class="page-title">Thuê Nhà Đất Giá Rẻ Tại Việt Nam, Giá Thuê Mới Nhất T6/2023</h1>
            <div class="property-list-result">
                <span ng-non-bindable=""><b>1 - 15</b> trong <b>355.731</b></span>
            </div>
            <div className="list-news">
                {dataListNews && dataListNews.length > 0 && dataListNews.map((item, index) => {
                    return (
                        < div className="item-news" onClick={() => onRedirectDetail(item)}>
                            <div className="row">
                                <div className="col-3 block block-img">
                                    <img src={item.url} />
                                </div>
                                <div className="col-9 block block-content">
                                    <div className="item-info">
                                        <h2 className="info-name">
                                            {item.nameNews}
                                        </h2>
                                        <div className="info-addr">
                                            {item.address}
                                        </div>
                                        <div className="info-attr">
                                            {item.areaUser && <span>{item.areaUser}m<sup>2</sup></span>}
                                            {item.bedCount && <span>{item.bedCount}PN</span>}
                                            {item.bathCount && <span>{item.bathCount}PT</span>}

                                        </div>
                                        <div className="info-price">
                                            {CommonUtils.formatNumber(item.priceLoan, 0)}
                                        </div>
                                    </div>
                                    <div className="item-extra">
                                        <div className="created">
                                            Hôm nay
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                })}
                {dataListNews && dataListNews.length == 0 && <div className='not-result'>Không có kết quả tìm kiếm phù hợp </div>}
            </div >
        </div >
    )
}

export default PageListNews