import React from 'react'
import "./Contact.scss"
import bg_recommnd from "../../assets/bg_recommed.png"

const Contact = () => {
    return (
        <div className="contact">
            <div className="container">
                <h1 className='text-center'>
                    Liên hệ
                </h1>
                <div class="entry-content">
                    <p><strong>PHÒNG KINH DOANH BẤT ĐỘNG SẢN THỦ ĐÔ</strong></p>
                    <ul>
                        <li><strong>Hotline:</strong> <strong>0522 982 504</strong></li>
                        <li><strong>Email:</strong>&nbsp;<a class="text-is-email" href="mailto:nnbinh2504@gmail.com">nnbinh2504@gmail.com</a></li>
                        <li><strong>Website:</strong> <a href="/home">mogi.vn</a></li>
                        <li><strong>Website Tiếng Anh:</strong> <a href="/home">mogi.vn</a></li>
                    </ul>
                    <p>Cần hỗ trợ từ chính chủ đầu tư , hãy gửi yêu cầu cho chúng tôi theo Form thông tin bên dưới. Chúng tôi sẽ phản hồi thông tin cho quý khách hàng trong thời gian 1 phút sau.</p>
                </div>

                <div className="info-contact">
                    <div class="row" id="row-1681551511">
                        <div id="form-contact" class="col-6">
                            <div className="row">
                                <div className="col-6">
                                    <div className="form-input">
                                        <input size="40" class="form-control-input" id="your-name" aria-required="true" aria-invalid="false" placeholder="Họ và tên" value="" type="text" name="your-name" />
                                    </div>
                                    <div className="form-input">
                                        <input size="40" class="form-control-input" id="your-email" aria-required="true" aria-invalid="false" placeholder="Địa chỉ email" value="" type="email" name="your-email" />
                                    </div>
                                    <div className="form-input">
                                        <input size="40" class="form-control-input" id="sdt" aria-invalid="false" placeholder="Số điện thoại" value="" type="tel" name="sdt" />
                                    </div>
                                    <div className="form-input">
                                        <select class="form-control-input" id="bds-qt" aria-invalid="false" name="bds-qt"><option value="Bất động sản quan tâm">Bất động sản quan tâm</option><option value="Căn hộ chung cư">Căn hộ chung cư</option><option value="Đất nền dự án">Đất nền dự án</option><option value="Biệt thự nhà phố">Biệt thự nhà phố</option></select>
                                    </div>
                                </div>
                                <div className="col-6">
                                    <div className="form-input">
                                        <textarea rows="5"
                                            class="form-control-textarea" id="your-message" aria-invalid="false" placeholder="Vui lòng ghi rõ nhu cầu của bạn" name="your-message">
                                        </textarea>
                                    </div>
                                    <div className="container-action style-add">
                                        <button class="btn btn-continue" >
                                            Gửi liên hệ ngay
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div id="col" class="col-6">
                            <div className='div-map' style={{ height: "100%" }}>
                                <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3722.8864789117674!2d105.90582881476409!3d21.077195785972112!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135a9c42b3dc675%3A0xda50975737666595!2zQ-G6p3UgxJB14buRbmcsIEjDoCBO4buZaSwgVmnhu4d0IE5hbQ!5e0!3m2!1svi!2s!4v1676727612074!5m2!1svi!2s" style={{ height: "100%", width: "100%", border: "none" }} allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    )
}

export default Contact