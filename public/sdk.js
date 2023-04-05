var vnpt_ekyc_sdk = undefined
var vnpt_ekyc_styles = undefined

vnpt_ekyc_sdk = document.createElement('script');
vnpt_ekyc_sdk.id = 'vnpt_ekyc_sdk';
vnpt_ekyc_sdk.src = "./ekyc-web-sdk-2.1.0.js";
vnpt_ekyc_sdk.async = true;
vnpt_ekyc_sdk.defe = true;
document.head.appendChild(vnpt_ekyc_sdk);

vnpt_ekyc_styles = document.createElement('link');
vnpt_ekyc_styles.id = 'vnpt_ekyc_styles';
vnpt_ekyc_styles.rel = 'stylesheet';
vnpt_ekyc_styles.href = "./ekyc-web-sdk-2.1.0.css";
vnpt_ekyc_styles.async = true;
vnpt_ekyc_styles.defe = true;
document.head.appendChild(vnpt_ekyc_styles);
var token = ""

vnpt_ekyc_sdk.onload = async function () {
    await FaceVNPTBrowserSDK.init();

    let load_ekyc = document.getElementById("load-ekyc")
    if (load_ekyc) {
        load_ekyc.classList.add('hidden')
    }

    var initObj = {
        BACKEND_URL: "",
        TOKEN_KEY: "MFwwDQYJKoZIhvcNAQEBBQADSwAwSAJBAM5Fq/IpXhKqw0Ummp1UMs2M1KH4YJJ+zg2Dy3dI48OaFRDgwqSLsJng4KyReSDi/pylYFDL9lR1VqSmB29+HW0CAwEAAQ==",
        TOKEN_ID: "cf677413-a4a6-35aa-e053-62199f0a934f",
        AUTHORIZION: "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI5MjAwZmEzZC0zN2QyLTExZWMtYTEzNy0xZGYxN2RlYmQyNzkiLCJhdWQiOlsicmVzdHNlcnZpY2UiXSwidXNlcl9uYW1lIjoiYWRtaW5AZHNjLmNvbS52biIsInNjb3BlIjpbInJlYWQiXSwiaXNzIjoiaHR0cHM6Ly9sb2NhbGhvc3QiLCJuYW1lIjoiYWRtaW5AZHNjLmNvbS52biIsInV1aWRfYWNjb3VudCI6IjkyMDBmYTNkLTM3ZDItMTFlYy1hMTM3LTFkZjE3ZGViZDI3OSIsImF1dGhvcml0aWVzIjpbIlVTRVIiXSwianRpIjoiNmJlODk3YTktMzJhOS00YjhhLTk4ZWItMWE3YWQ4MGZkM2E3IiwiY2xpZW50X2lkIjoiYWRtaW5hcHAifQ.HoIECREIjvfsydLfKiA6WkvCYSC-Uij_O5tEpkyw1tIOKpz75NOQ_YPuUzTJCw7kwZDDXB1HVxNTGhT_KPXQlIgSqT4m1BLRA51CnsSS-Sl-m0MVyz7nahslbzuZ1lQTqu1xv8teJkvC5gxlUMQEfjG8bnTPI4cxUhFZVpdabURlMyBukUJkq02kEubaOf2OxWs4cv8YzQGqIM0GHIg-snZsqEXZfdjt0-QTTjqfYatBapVUueXrHVm4agRvLTk5oev9GzcpWW-5Gs_YQsvWt1E-mpp1PYzplErcn3RbfClWQyTF5xKJBJc4LDhOJW6cxGTrhDFnVWvZUw2PM8CRGw",
        ENABLE_GGCAPCHAR: false,
        PARRENT_ID: "ekyc_sdk_intergrated",
        FLOW_TYPE: "FACE", // DOCUMENT, FACE
        SHOW_RESULT: false,
        SHOW_HELP: false,
        SHOW_TRADEMARK: false,
        CHECK_LIVENESS_CARD: false,
        CHECK_LIVENESS_FACE: false,
        CHECK_MASKED_FACE: false,
        COMPARE_FACE: false,
        LANGUAGE: 'vi',
        LIST_ITEM: [-1, 5, 6, 7, 9],
        TYPE_DOCUMENT: -1,
        USE_WEBCAM: true,
        USE_UPLOAD: false,
        ADVANCE_LIVENESS_FACE: true,
        LIST_CHOOSE_STYLE: {
            background: "#fff",
            text_color: "black",
            border_item: "",
            item_active_color: "#18D696",
            background_icon: "#18D696",
            id_icon: "https://ekyc-web.icenter.ai/images/si/id_card.svg",
            passport_icon: "https://ekyc-web.icenter.ai/images/si/passport.svg",
            drivecard_icon: "https://ekyc-web.icenter.ai/images/si/drivecard.svg",
            army_id_icon: "https://ekyc-web.icenter.ai/images/si/other_doc.svg",
            id_chip_icon: "https://ekyc-web.icenter.ai/images/si/id_chip.svg",
            start_button_background: "#18D696",
            start_button_color: "#111127"

        },
        CAPTURE_IMAGE_STYLE: {
            popup1_box_shadow: "0px 0px 2px rgba(0, 0, 0, 0.06), 0px 3px 8px rgba(0, 0, 0, 0.1)",
            popup1_title_color: "#C8242D",
            description1_color: "#fff",
            capture_btn_background: "#18D696",
            capture_btn_color: "#111127",
            capture_btn_icon: "https://ekyc-web.icenter.ai/images/hdbank/capture.svg",
            tutorial_btn_icon: "https://ekyc-web.icenter.ai/images/hdbank/help.gif",
            recapture_btn_background: "linear-gradient(180deg, #FDFDFD 0%, #DEDEDE 100%)",
            recapture_btn_color: "#111127",
            recapture_btn_border: "2px solid #FEDC00",
            recapture_btn_icon: "https://ekyc-web.icenter.ai/images/hdbank/capture.svg",
            nextstep_btn_background: "#18D696",
            nextstep_btn_color: "#111127",
            nextstep_btn_icon: "https://ekyc-web.icenter.ai/images/hdbank/next_icon.svg",
            popup2_box_shadow: "0px 0px 2px rgba(0, 0, 0, 0.06), 0px 3px 8px rgba(0, 0, 0, 0.1)",
            popup2_title_header_color: "#C8242D",
            popup2_icon_header: "https://ekyc-web.icenter.ai/images/hdbank/main_icon.svg",
            popup2_icon_warning1: "",
            popup2_icon_warning2: "",
            popup2_icon_warning3: "",

        },
        RESULT_DEFAULT_STYLE: {
            redemo_btn_background: "#18D696",
            redemo_btn_icon: "https://ekyc-web.icenter.ai/images/hdbank/refresh.svg",
            redemo_btn_color: "#111127"
        },
        MOBILE_STYLE: {
            mobile_capture_btn: "https://ekyc-web.icenter.ai/images/capure_mobile.png",
            mobile_capture_desc_color: "#18D696",
            mobile_tutorial_color: "#C8242D",
            mobile_recapture_btn_background: "linear-gradient(180deg, #FDFDFD 0%, #DEDEDE 100%)",
            mobile_recapture_btn_border: "1px solid #18D696",
            mobile_recapture_btn_icon: "https://ekyc-web.icenter.ai/images/hdbank/capture.svg",
            mobile_recapture_btn_color: "#111127",
            mobile_nextstep_btn_background: "#18D696",
            mobile_nextstep_btn_color: "#111127",
            mobile_nextstep_btn_icon: "https://ekyc-web.icenter.ai/images/next_icon_b.png",
            mobile_popup2_icon_header: "https://ekyc-web.icenter.ai/images/hdbank/face_icon_popup.svg",
        }
    }
    try {
        ekycsdk.init(initObj, async (res) => {
            console.log('ekycsdk_res', res, ekycsdk)
            try {
                // throw 'errorrrrrrrrrrrrrrrrrrrrrrrrr'

                let ekyc_sdk_intergrated = document.getElementById("ekyc_sdk_intergrated")
                ekyc_sdk_intergrated.classList.add('hidden')

                //set src base64 vào ảnh ở step3
                let image = document.getElementById("image_result_ekyc")
                image.src = await (res && res.base64_face_img) ? res.base64_face_img.img_face_far : ''

                //trigger nút next khi có dữ liệu ảnh trả về
                let trigger_next_ekyc_step3 = document.getElementById("trigger_next_ekyc_step3")
                if (trigger_next_ekyc_step3) {
                    trigger_next_ekyc_step3.click()
                }

            } catch (error) {
                console.log('error', error);
                let ekyc_sdk_intergrated = document.getElementById("ekyc_sdk_intergrated")
                ekyc_sdk_intergrated.classList.add('hidden')

                let error_ekyc = document.getElementById("error-ekyc")
                error_ekyc.classList.remove('hidden')

                let content_error_ekyc = document.getElementById("content-error-ekyc")
                content_error_ekyc.append(JSON.stringify(error))
            }

        });
    } catch (error) {
        ekycsdk.reload(initObj)
    }

}