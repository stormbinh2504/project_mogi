import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from "react-redux";

import Header from '../Header/Header'
import "./Home.scss"
import ProjectTop from './ProjectTop/ProjectTop'
import ProjectLoan from './ProjectLoan/ProjectLoan'
import SearchNewsHome from './SearchNewsHome/SearchNewsHome'


const df_listfeatures = [
    {
        name: "Review khu vực",
        link: "",
        icon: <i class="fa fa-area-chart" aria-hidden="true"></i>
    },
    {
        name: "Phòng trọ gần trường",
        link: "",
        icon: <i class="fa fa-graduation-cap" aria-hidden="true"></i>
    },
    {
        name: "Phòng trọ công nhân",
        link: "",
        icon: <i class="fa fa-users" aria-hidden="true"></i>
    },
    {
        name: "Review khu vực",
        link: "",
        icon: <i class="fa fa-area-chart" aria-hidden="true"></i>
    },
    {
        name: "10 Bước mua nhà",
        link: "",
        icon: <i class="fa fa-step-forward" aria-hidden="true"></i>
    },
    {
        name: "Vay mua nhà",
        link: "",
        icon: <i class="fa fa-list-ul" aria-hidden="true"></i>
    },
]

const Home = () => {

    const state = useSelector((state) => state);
    const { auth, app, user } = state
    const { listBanner } = app
    let imgBG1 = listBanner.find((item, index) => item.lever == 1)
    let imgBG2 = listBanner.find((item, index) => item.lever == 2)

    console.log("binh_imgBG", app, imgBG1, listBanner)
    let sytle1 = {}
    let sytle2 = {}
    let url2 = {}
    if (imgBG1) {
        sytle1 = {
            backgroundImage: "url(" + imgBG1.imageUrl + ")",
            backgroundPosition: 'center',
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat'
        }
    }
    // if(imgBG2){
    //     url2 = 
    // }
    // if (imgBG2) {
    //     sytle2 = {
    //         backgroundImage: "url(" + imgBG.imageUrl + ")",
    //         backgroundPosition: 'center',
    //         backgroundSize: 'cover',
    //         backgroundRepeat: 'no-repeat'
    //     }
    // }
    return (
        <div className='container-home'>
            <div className="container-slider" style={sytle1}>
                <SearchNewsHome />
            </div>
            <div className="container-top-properties">
                <div className="container top-properties-info">
                    <div id="project-list" class="block-info list-items" ng-non-bindable="">
                        <h2 class="title">Tin tức bất động sản</h2>
                        <div class="property-items clearfix">
                            <div class="top-news row">
                                <div class="highlight-news-items col-sm-8">
                                    <a href="https://news.mogi.vn/pu-luong-thanh-hoa/">
                                        <div class="top-highlight">
                                            <img src="https://cloud.mogi.vn/news/thumb-detail/2022/07/25/363/829854a1b7d34be5a6457ed0891e6974.jpg" />
                                            <div class="top-highlights">
                                                <h3 class="top-highlight-title">Cẩm Nang Du Lịch Pù Luông Thanh Hoá – Khám Phá Thiên Nhiên Tây Bắc</h3>
                                                <div class="top-highlight-desc">Pù Luông Thanh Hóa là một trong những địa điểm nổi tiếng được rất nhiều khách du lịch tìm hiểu. Vậy Pù Luông ở đâu và du lịch Pù Luông có những điểm hấp dẫn gì nổi bật nhất? Hãy cùng khám phá khu bảo tồn thiên nhiên Pù Luông qua những chia sẻ dưới </div>
                                            </div>
                                        </div>
                                    </a>
                                    <div class="secondary-highlight">
                                        <a href="https://news.mogi.vn/dht-la-dat-gi/">
                                            <img src="https://cloud.mogi.vn/news/thumb-detail/2022/07/25/366/6f3302b81a8f42ad88c6d52c8c848bc0.jpg" />
                                            <h3 class="secondary-highlight-title">DHT là đất gì? Có được mua bán đất DHT hay không?</h3>
                                        </a>
                                    </div>
                                    <div class="secondary-highlight">
                                        <a href="https://news.mogi.vn/dia-diem-du-lich-da-lat/">
                                            <img src="https://cloud.mogi.vn/news/thumb-detail/2022/07/25/368/07d80f97341547aab43224496380d582.jpg" />
                                            <h3 class="secondary-highlight-title">Tổng Hợp Các Địa Điểm Du Lịch Đà Lạt Hot Nhất Hiện Nay</h3>
                                        </a>
                                    </div>
                                </div>
                                <div class="recent-news col-sm-4">
                                    <a href="https://news.mogi.vn/khu-du-lich-thuy-chau/"><h3 class="recent-news-title"> Khu Du Lịch Thủy Châu – Bỏ Túi Kinh Nghiệm Dã Ngoại Từ A – Z</h3></a>
                                    <a href="https://news.mogi.vn/nui-da-voi/"><h3 class="recent-news-title"> Núi Đá Voi địa điểm phải chinh phục và check-in ở Đắk Lắk</h3></a>
                                    <a href="https://news.mogi.vn/rung-nam-cat-tien/"><h3 class="recent-news-title"> Rừng nam Cát Tiên – Địa điểm du lịch tuyệt vời để cắm trại và khám phá</h3></a>
                                    <a href="https://news.mogi.vn/thue-chung-cu-quan-5/"><h3 class="recent-news-title"> Bí quyết thuê chung cư quận 5 chất lượng với mức giá tốt</h3></a>
                                    <a href="https://news.mogi.vn/du-toan-la-gi/"><h3 class="recent-news-title"> Dự toán là gì? Hướng dẫn cách lập dự toán cho người mới bắt đầu</h3></a>
                                    <a href="https://news.mogi.vn/nha-hxh-nghia-la-gi/"><h3 class="recent-news-title"> Nhà HXH nghĩa là gì? Mua nhà HXH như thế nào sinh lời nhất?</h3></a>
                                    <a href="https://news.mogi.vn"> <div class="viewmore-all">Xem tất cả</div></a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div id="project-list" class="block-info list-items" ng-non-bindable="">
                        <h2 class="title">Dự án nổi bật</h2>
                        <div class="property-items clearfix">
                            <ProjectTop />
                        </div>
                    </div>
                    <div id="banner-home-center" class="banner-home-center home-banner block-info">
                        <div class="banner-content">
                            <a href={imgBG2 ? imgBG2.url : ""} target="_blank" rel="follow" gtm-cat="banner" gtm-event="link" gtm-act="view-banner-home-top">
                                <img src={imgBG2 ? imgBG2.imageUrl : ""} />
                            </a>
                        </div>
                    </div>
                    <div id="project-list" class="block-info list-items" ng-non-bindable="">
                        <h2 class="title">Bất động sản cho thuê</h2>
                        <div class="property-items clearfix">
                            <ProjectLoan />
                        </div>
                    </div>
                    <div id="project-list" class="block-info list-items" ng-non-bindable="">
                        <iframe
                            id="ytplayer"
                            className={""}
                            type="text/html"
                            width="100%"
                            height="400"
                            src={'https://www.youtube.com/embed/PYv9_fOXMDA'}
                            frameBorder="0"
                        ></iframe>
                    </div>

                    <div id="features" class="features block-info" ng-non-bindable="">
                        <h2 class="title">Tiện ích từ Mogi.vn</h2>
                        <div class="list-features clearfix">
                            <div className="row">{
                                df_listfeatures.map((item, index) => {
                                    return (
                                        <div className="col-6 col-md-2">
                                            <div class="item-feature">
                                                {item.icon}
                                                <a class="link-overlay" href={item.link} >{item.name}</a>
                                            </div>
                                        </div>
                                    )
                                })
                            }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    )
}

export default Home