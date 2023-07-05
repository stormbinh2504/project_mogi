import React from 'react'
import "./Recommend.scss"
import bg_recommnd from "../../assets/bg_recommed.png"

const Recommend = () => {
    return (
        <div className="recommend">
            <div className="container">
                <div className="block-image">
                    <img src={bg_recommnd} />
                </div>
                <h1 className='text-center'>
                    Giới thiệu về Mogi
                </h1>
                <div class="elementor-element elementor-element-2fce8e0 elementor-widget elementor-widget-text-editor">
                    <div class="elementor-widget-container">
                        <div class="elementor-text-editor elementor-clearfix">
                            <p>Giống như nhiều quốc gia khác trên thế giới, nhu cầu tìm hiểu và cập nhật tin tức tại Việt Nam là rất lớn khi liên tục có rất nhiều sự kiện xảy ra trong đời sống xã hội, đặc biệt là các lĩnh vực liên quan đến kinh tế do xu hướng thay đổi của thời đại. Và Mogi VN là một trong những cái tên nổi bật hiện nay giúp bạn dễ dàng tìm kiếm những thông tin mới nhất thông qua thiết bị kết nối internet.</p><p>Mogi VN là một trong những trang thông tin điện tử mới chỉ xuất hiện trong khoảng thời gian gần đây nhưng đã nhanh chóng nhận được sự quan tâm lớn từ phía độc giả bởi hàng loạt các tin tức hấp dẫn và có tính thời sự cao. Đặc biệt, với những người có sự quan tâm lớn đến lĩnh vực bất động sản hay công nghệ thì Mogi VN chính là một chuyên trang nổi bật với thế mạnh về chuyên mục nội dung này.</p><p>Sở dĩ Mogi VN dễ dàng vượt qua nhiều cái tên khác để trở thành trang tin mới đầy tiềm năng phát triển trong lòng độc giả hiện nay là bởi bên cạnh những bài viết phân tích chuyên sâu về kinh tế, trang còn đề cập đến nhiều lĩnh vực khác với các bài viết cũng không kém phần hấp dẫn. Trong thời buổi mà các tin tức trở nên kém chất lượng và hấp dẫn như hiện nay thì sự xuất hiện của Mogi VN đã thổi đến một làn gió vô cùng mới lạ.</p><p>Mong muốn đem lại những thông tin hữu ích và có giá trị cho người độc, Mogi VN đang ngày một nỗ lực và chăm chỉ hơn trong việc khai thác cũng như sáng tạo nội dung để đảm bảo người độc luôn cảm thấy hài lòng và thích thú.</p><p>#mogi.vn, #mogi, #mogivn, #rao-vat-mogi</p>					</div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Recommend