import React, { useState, useEffect } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { useSelector, useDispatch } from "react-redux";
import "./ModalAddBlog.scss"
import { Space, Table, Tag } from 'antd';
import DraggableModal from '../../../components/DraggableModal/DraggableModal';
import { alertType } from '../../../redux/actions';
import { ToastUtil, uploadImgToFireBase, deleteFromFirebase, uploadImgToFireBaseQuill } from '../../../utils';
import { accountService, globalService } from '../../../services';
import DatePickerCustom from '../../../components/DatePickerCustom/DatePickerCustom';
import Select from 'react-select';
import _ from 'lodash';
import ReactQuill, { Quill } from "react-quill";
import 'react-quill/dist/quill.snow.css';
import ImageUploader from "quill-image-uploader";
Quill.register("modules/imageUploader", ImageUploader);

const df_bodyUpdate = {
    "id": null,
    "title": null,
    "content": null,
    "lever": 1,
}

const formats = [
    'header', 'font', 'size',
    'bold', 'italic', 'underline', 'strike', 'blockquote',
    'list', 'bullet', 'indent',
    'link', 'image', 'video'
]

let url = ""

const test = (urlFireBase) => {
    url = urlFireBase
}

const modules = {
    toolbar: [
        [{ 'header': '1' }, { 'header': '2' }, { 'font': [] }],
        [{ size: [] }],
        ['bold', 'italic', 'underline', 'strike', 'blockquote'],
        [{ 'list': 'ordered' }, { 'list': 'bullet' },
        { 'indent': '-1' }, { 'indent': '+1' }],
        ['link', 'image', 'video'],
        ['clean']
    ],
    imageUploader: { //https://codesandbox.io/s/react-quill-demo-h2rslu?file=/src/editor.js
        upload: async (file) => {
            try {
                await uploadImgToFireBaseQuill(`BlogManagement`, file, test);
                console.log("uploadImgToFireBase2", url)
                return url
            } catch (error) {
                alert(2)
                // Handle error if needed
                console.error(error);
                throw error; // Rethrow the error to be caught by the caller
            }
        }
    },
    // imageUploader: {
    //     upload: (file) => {
    //         return new Promise(async (resolve, reject) => {
    //             let formData = new FormData();
    //             formData.append("image", file);
    //             const selectedFilesArray = Array.from(file);
    //             console.log("binh_upload", selectedFilesArray, file, formData)

    //             uploadImgToFireBaseQuill(`BlogManagement`, file)
    //             // await uploadImgToFireBaseQuill(`BlogManagement`, file)
    //             //     .then((response) => {
    //             //         console.log("binh_upload_2", response)
    //             //         response.json()
    //             //     })
    //             // console.log("binh_upload_2", img)
    //             // if (img) {
    //             //     console.log("binh_upload_3", img)
    //             //     resolve(img)
    //             // }
    //             //     .then((response) => {
    //             //     console.log("binh_upload_2", response)
    //             //     response.json()
    //             // })
    //             // .then((result) => {
    //             //     console.log(result);
    //             //     resolve(result.data.url);
    //             // })

    //             // if (selectedFilesArray.length > 0) {
    //             //     _.forEach(selectedFilesArray, async (record) => {
    //             //         await uploadImgToFireBaseQuill(`BlogManagement`, record)
    //             //             .then((response) => {
    //             //                 console.log("binh_upload")
    //             //                 response.json()
    //             //             })
    //             //         // .then((result) => {
    //             //         //     console.log(result);
    //             //         //     resolve(result.data.url);
    //             //         // })
    //             //     })
    //             // }

    //             return
    //             formData = new FormData();
    //             formData.append("image", file);
    //             fetch(
    //                 "https://api.imgbb.com/1/upload?key=334ecea9ec1213784db5cb9a14dac265",
    //                 {
    //                     method: "POST",
    //                     body: formData
    //                 }
    //             )
    //                 .then((response) => response.json())
    //                 .then((result) => {
    //                     console.log(result);
    //                     resolve(result.data.url);
    //                 })
    //                 .catch((error) => {
    //                     reject("Upload failed");
    //                     console.error("Error:", error);
    //                 });
    //         });
    //     }
    // },
    clipboard: {
        // toggle to add extra line breaks when pasting HTML:
        matchVisual: false,
    }
}

const ModalAddBlog = (props) => {
    const { isOpen, onClose, dataAdd, setDataAdd, isEdit, onHandleCallBack } = props
    const history = useHistory()
    const dispatch = useDispatch()
    const state = useSelector((state) => state);
    const { auth, app, user } = state
    const { userInfo } = user

    const [bodyUpdate, setBodyUpdate] = useState(df_bodyUpdate);
    const [content, setContent] = useState()

    const [imageUrls, setImageUrls] = useState([]);


    const validate = () => {
        const { title } = bodyUpdate

        if (!title) {
            ToastUtil.error("Tên blog không được để trống")
            return false
        }

        return true
    }

    const onHandleUpdate = async () => {
        if (!(validate())) {
            return
        }
        let body = {
            ...df_bodyUpdate,
            id: bodyUpdate.id || null,
            title: bodyUpdate.title || null,
            content: content,
            url: imageUrls[0].url || null,
        }
        console.log("binh_check_ModalAddNewsManagement2", body)
        // return
        dispatch(alertType(true))
        await accountService.addBlogs(body)
            .then(res => {
                dispatch(alertType(false))
                ToastUtil.success("Thêm mới thành công");
                onHandleCallBack()
                onClose()
            })
            .catch(error => {
                dispatch(alertType(false))
                ToastUtil.errorApi(error, "Thêm không thành công");
            });
    }


    const handleChange = (html) => {
        setContent(html)
    }

    const handleChangeInput = e => {
        const { name, value } = e.target
        setBodyUpdate((prev) => ({ ...prev, [name]: value }))
    }

    const onDeleteImage = async (img, id) => {

        if (img.url) {
            let _imageUrls = imageUrls.filter((item, index) => {
                if (index !== id) {
                    return true
                } else {
                    if (item.url) {
                        deleteFromFirebase(item.url)
                    }
                    return false
                }
            })
            console.log("binh_onDeleteImaget", _imageUrls)
            setImageUrls(_imageUrls)
        }
    }

    const setUrlFireBase = async (url) => {
        let objImg = {
            "codeImage": null,
            "url": url
        }

        setImageUrls(((previousImages) => previousImages.concat(objImg)))
    }


    const handleImageChange = async (event) => {
        const selectedFiles = event.target.files;
        const selectedFilesArray = Array.from(selectedFiles);

        let codeClient = userInfo.codeClient || "clientTest"

        if (selectedFilesArray.length > 0) {
            _.forEach(selectedFilesArray, async (record) => {
                await uploadImgToFireBase(`BrokerManagement`, record, setUrlFireBase)

            })
        }


        // FOR BUG IN CHROME
        event.target.value = "";
    }

    console.log("binh_check_ModalAddNewsManagement", { bodyUpdate, content })

    return (
        <DraggableModal
            isOpen={isOpen}
            onClose={onClose}
            className={"modal-add-blog"}
            titleId={isEdit ? "Sửa blog" : "Thêm mới blog"}
            toggle={onClose}
        >
            <div className="body">

                <div className="body-content-row row gutters-5">
                    <div className="col-12 col-sm-4 label">
                        Tên blog(*)
                    </div>
                    <div className="col-12 col-sm-8 value">
                        <div className="mg-form-control">
                            <input className="text-control" value={bodyUpdate.title} name="title"
                                onChange={handleChangeInput} />
                        </div>
                    </div>
                </div>


                <div className="body-content-row row gutters-5">
                    <div className="col-8 col-sm-4 label">
                        Ảnh
                    </div>
                    <div className="col-12 col-sm-8 value">
                        <div className="block-image">
                            <label className="label-add-image item-center">
                                +
                                <input
                                    type="file"
                                    name="images"
                                    onChange={handleImageChange}
                                    accept="image/png , image/jpeg, image/webp"
                                />
                            </label>
                        </div>
                    </div>
                </div>


                {imageUrls && imageUrls.length > 0 && <div className="body-content-row row gutters-5">
                    <div className="col-8 col-sm-4 label">

                    </div>
                    <div className="col-12 col-sm-8 value">
                        <div className="block-image">
                            <div className="list-images">
                                {
                                    imageUrls.map((image, index) => {
                                        return (
                                            <div key={image} className="item-image">
                                                <img src={image.url} alt="upload" />
                                                <div className="icon-close item-center" onClick={() => onDeleteImage(image, index)}>
                                                    <i class="fa fa-times" aria-hidden="true"></i>
                                                </div>
                                            </div>
                                        );
                                    })
                                }
                            </div>
                        </div>

                    </div>
                </div>
                }

                <div className="body-content-row row gutters-5">
                    <div className="col-12">
                        <div>
                            <ReactQuill
                                theme={"snow"}
                                onChange={handleChange}
                                value={content}
                                modules={modules}
                                formats={formats}
                                bounds={'.app'}
                                placeholder={"Thêm nội dung"}
                                style={{
                                    minHeight: "25vh"
                                }}
                            />
                        </div>
                    </div>
                </div>

                <div className="body-content-row row gutters-5">
                    <div className="container-action style-add">
                        <button class="btn btn-continue" onClick={onHandleUpdate} >
                            {!isEdit && "Thêm mới"}
                            {isEdit && "Sửa"}
                        </button>
                    </div>
                </div>

            </div>
        </DraggableModal>
    )
}

export default ModalAddBlog