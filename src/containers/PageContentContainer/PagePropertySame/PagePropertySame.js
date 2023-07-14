import React, { useState, useEffect } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { useSelector, useDispatch } from "react-redux";
import { alertType } from '../../../redux/actions';
import { ToastUtil, uploadImgToFireBase, deleteFromFirebase, TYPE_PROPERTY_CATEGORY, CommonUtils } from '../../../utils';
import { accountService, globalService } from '../../../services';
import Slider from "react-slick";
import "./PagePropertySame.scss"

let df_body = {
    codeTypeProperty: null,
    codeCateTypePropertyCategory: null,
    provinceCode: null,
    idCurrent: null,
}

const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    arrows: true,
    responsive: [
        {
            breakpoint: 1024,
            settings: {
                slidesToShow: 3,
                slidesToScroll: 1,
                infinite: true,
            }
        },
        {
            breakpoint: 600,
            settings: {
                slidesToShow: 2,
                slidesToScroll: 1,
                initialSlide: 2
            }
        },
        {
            breakpoint: 480,
            settings: {
                slidesToShow: 1,
                slidesToScroll: 1
            }
        }
    ]
};

const PagePropertySame = () => {
    const history = useHistory()
    const dispatch = useDispatch()
    const state = useSelector((state) => state);
    const { auth, app, user } = state
    const { filterNews } = app

    const { userInfo } = user
    const { location } = history
    const { pathname } = location

    const [listNewsSame, setListNewsSame] = useState(null)

    useEffect(() => {
        fetchGetFindNewsSameCustomer()
    }, []);


    const fetchGetFindNewsSameCustomer = async () => {
        let id = null
        if (pathname) {
            id = pathname.split("/")[2]
        }

        let body = {
            ...df_body,
            codeTypeProperty: filterNews.codeTypeProperty,
            codeCateTypePropertyCategory: filterNews.codeCateTypePropertyCategory,
            provinceCode: filterNews.provinceCode,
            idCurrent: id,
        }
        dispatch(alertType(true))
        await globalService.getFindNewsSameCustomer(body)
            .then(res => {
                if (res && res.length > 0) {
                    setListNewsSame(res)
                }
                dispatch(alertType(false))
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
            let pathname = `thue-nha-dat/${id}`
            window.location.pathname = pathname
        }
    }

    console.log("binh_PagePropertySame", { listNewsSame, history })
    return (
        <div class="page-property-same" >
            <Slider {...settings}>
                {listNewsSame && listNewsSame.length > 0 && listNewsSame.map((item, index) => {
                    return (
                        < div className="item-news" onClick={() => onRedirectDetail(item)}>
                            <div className="block block-img">
                                <img src={item.url} />
                            </div>
                            <div className="block block-content">
                                <div className="item-info">
                                    <h3 className="info-name">
                                        {item.nameNews}
                                    </h3>
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
                            </div>
                        </div>
                    )
                })}
            </Slider>
        </div >
    )
}

export default PagePropertySame