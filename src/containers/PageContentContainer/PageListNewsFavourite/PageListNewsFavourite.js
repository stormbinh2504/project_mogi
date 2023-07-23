import React, { useState, useEffect } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { useSelector, useDispatch } from "react-redux";
import { alertType, updateDataFilterNews } from '../../../redux/actions';
import { ToastUtil, uploadImgToFireBase, deleteFromFirebase, TYPE_PROPERTY_CATEGORY, CommonUtils } from '../../../utils';
import { accountService, globalService } from '../../../services';

import "./PageListNewsFavourite.scss"
import PageDesciption from '../PageDesciption/PageDesciption'
import PaginationComponent from '../../../components/PaginationComponent/PaginationComponent';

let pageSize = 5
let df_body_news = {
    "listId": [],
    "page": 0,
    "size": pageSize
}

const PageListNewsFavourite = () => {
    const history = useHistory()
    const dispatch = useDispatch()
    const state = useSelector((state) => state);
    const { auth, app, user } = state
    const { userInfo } = user
    const { filterNews } = app
    const [dataListNews, setDataListNews] = useState([])
    const [dataFavorite, setDataFavorite] = useState([])
    const [totalPages, setTotalPages] = useState(1);


    useEffect(() => {
        onFilterNews(0)
    }, [filterNews]);


    useEffect(() => {
        let storedArray = localStorage.getItem('ListFavorite');
        let arrFavorite = JSON.parse(storedArray) || []
        if (arrFavorite && arrFavorite.length > 0) {
            setDataFavorite(arrFavorite)
        }
    }, []);

    const onFilterNews = async (page) => {
        let storedArray = localStorage.getItem('ListFavorite');
        let arrFavorite = JSON.parse(storedArray) || []
        let body = {
            ...df_body_news,
            listId: arrFavorite,
            page: page
        }

        dispatch(alertType(true))
        await globalService.getFindAllNewsCustomerFavourite(body)
            .then(res => {
                if (res) {
                    if (res.content && res.content.length > 0) {
                        setDataListNews(res.content)
                    } else {
                        setDataListNews([])
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
        onFilterNews(page)
    }

    const toggleFavorite = (e, record) => {
        e.stopPropagation();
        const { id } = record
        let storedArray = localStorage.getItem('ListFavorite');
        let arrFavorite = JSON.parse(storedArray) || []
        if (arrFavorite) {
            let found = arrFavorite.find((item, index) => item == id)
            if (found) {
                arrFavorite = arrFavorite.filter((item, index) => item != id)
            } else {
                arrFavorite.push(id);
            }
        }
        console.log("binh_toggleFavorite", toggleFavorite)
        localStorage.setItem('ListFavorite', JSON.stringify(arrFavorite))
        setDataFavorite(arrFavorite)
    }

    const isCheckFavorite = (record) => {
        const { id } = record
        let storedArray = localStorage.getItem('ListFavorite');
        let arrFavorite = JSON.parse(storedArray) || []
        if (arrFavorite) {
            let found = arrFavorite.find((item, index) => item == id)
            if (found) {
                return true
            } else {
                return false
            }
        }
        return false
    }
    console.log("PageListNewsFavourite_render", { filterNews: filterNews, dataListNews: dataListNews })

    return (
        <div class="page-list-news" >
            <h1 class="page-title">Thuê Nhà Đất Giá Rẻ Tại Việt Nam, Giá Thuê Mới Nhất T7/2023</h1>
            {/* <div class="property-list-result">
                <span ng-non-bindable=""><b>1 - 15</b> trong <b>355.731</b></span>
            </div> */}
            <div className="list-news">
                {dataListNews && dataListNews.length > 0 && dataListNews.map((item, index) => {
                    let isFavorite = isCheckFavorite(item)
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
                                    <div className="prop-favorite" onClick={(e) => toggleFavorite(e, item)}>
                                        {isFavorite ?
                                            <i class="fa fa-heart" aria-hidden="true"> </i>
                                            :

                                            <i class="fa fa-heart-o" aria-hidden="true"></i>
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                })}
                {dataListNews && dataListNews.length == 0 && <div className='not-result item-center'>Không có kết quả tìm kiếm phù hợp </div>}
            </div >

            {dataListNews && dataListNews.length > 0 && <div className="pagination-news">
                <PaginationComponent
                    dataPage={dataListNews}
                    totalPages={totalPages}
                    itemsPerPage={pageSize}
                    onChangePage={onChangePage}
                />
            </div>
            }
        </div >
    )
}

export default PageListNewsFavourite