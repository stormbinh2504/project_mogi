import React, { useState, useEffect } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { useSelector, useDispatch } from "react-redux";
import "./ModalAddBroker.scss"
import { Space, Table, Tag } from 'antd';
import DraggableModal from '../../../components/DraggableModal/DraggableModal';
import { alertType } from '../../../redux/actions';
import { ToastUtil, uploadImgToFireBase, deleteFromFirebase } from '../../../utils';
import { accountService, globalService } from '../../../services';
import DatePickerCustom from '../../../components/DatePickerCustom/DatePickerCustom';
import Select from 'react-select';
import _ from 'lodash';

const { Column, ColumnGroup } = Table;

const df_bodyUpdate = {
    "id": null,
    "imageUrl": null,
    "description": null,
    "url": null,
    "lever": 1,
    "dateUpdated": null
}

const df_number_district = [
    {
        label: "1 Quận",
        value: [1],
    },
    {
        label: "2 Quận",
        value: [1, 2],
    },
    {
        label: "3 Quận",
        value: [1, 2, 3],
    },
]

const ModalAddBanner = (props) => {
    const { isOpen, onClose, dataAdd, setDataAdd, isEdit, onHandleCallBack } = props
    const history = useHistory()
    const dispatch = useDispatch()
    const state = useSelector((state) => state);
    const { auth, app, user } = state
    const { userInfo } = user
    const [bodyUpdate, setBodyUpdate] = useState(df_bodyUpdate);

    const [imageUrls, setImageUrls] = useState([]);

    useEffect(() => {
        if (isEdit && dataAdd && dataAdd.id) {
            setBodyUpdate((prev) => ({ ...prev, ...dataAdd }))
            if (dataAdd.url) {
                setUrlFireBase(dataAdd.url)
            }
        }
    }, [dataAdd, isEdit]);


    const onHandleUpdate = async () => {
        let body = {
            ...df_bodyUpdate,
            id: bodyUpdate.id || null,
            url: bodyUpdate.url || null,
            imageUrl: imageUrls[0].url || null,
            description: bodyUpdate.description || null,
        }
        console.log("binh_check_ModalAddNewsManagement2", body)
        // return
        let fetchApi = accountService.updateAddBanner
        if (isEdit) {
            fetchApi = accountService.updateSaveBanner
        }
        dispatch(alertType(true))
        await fetchApi(body)
            .then(res => {
                dispatch(alertType(false))
                ToastUtil.success(isEdit ? "Sửa thành công" : "Thêm mới thành công");
                // onHandleCallBack()
                onClose()
            })
            .catch(error => {
                dispatch(alertType(false))
                ToastUtil.errorApi(error, isEdit ? "Sửa không thành công" : "Tạo  mới không thành công");
            });
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
                await uploadImgToFireBase(`BannerManagement`, record, setUrlFireBase)

            })
        }


        // FOR BUG IN CHROME
        event.target.value = "";
    }

    console.log("binh_check_ModalAddNewsManagement", { bodyUpdate })

    return (
        <DraggableModal
            isOpen={isOpen}
            onClose={onClose}
            className={"modal-add-broker"}
            titleId={isEdit ? "Sửa môi giới" : "Thêm mới môi giới"}
            toggle={onClose}
        >
            <div className="body">

                <div className="body-content-row row gutters-5">
                    <div className="col-12 col-sm-4 label">
                        Id banner
                    </div>
                    <div className="col-12 col-sm-8 value">
                        <div className="mg-form-control">
                            <input className="text-control" value={bodyUpdate.id} name="id"
                                onChange={handleChangeInput} disabled={true} />
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
                    <div className="col-12 col-sm-4 label">
                        Link liên kết
                    </div>
                    <div className="col-12 col-sm-8 value">
                        <div className="mg-form-control">
                            <input className="text-control" value={bodyUpdate.url} name="url"
                                onChange={handleChangeInput} />
                        </div>
                    </div>
                </div>



                <div className="body-content-row row gutters-5">
                    <div className="col-12 col-sm-4 label">
                        Mô tả
                    </div>
                    <div className="col-12 col-sm-8 value">
                        <div className="mg-form-control">
                            <textarea className="text-control"
                                cols="20"
                                maxlength="2000"
                                rows="8"
                                value={bodyUpdate.description} name="description"
                                onChange={handleChangeInput} />
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

export default ModalAddBanner