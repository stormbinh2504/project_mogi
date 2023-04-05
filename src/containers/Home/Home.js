import React from 'react'
import Header from '../Header/Header'
import "./Home.scss"

const Home = () => {
    return (
        <div className='container-home'>
            <div className="container-slider">
                <div id="search-bar">

                </div>
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
                        <div class="property-items clearfix"></div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home