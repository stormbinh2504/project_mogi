import React, { useState, useEffect } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { useSelector, useDispatch } from "react-redux";
import Header from '../Header/Header'
import "./BannerManagement.scss"
import PageContainerBroker from '../../components/Broker/PageContainerBroker/PageContainerBroker';
import Avatar from '../../assets/images/avatar.png'
import Zalo from '../../assets/images/zalo.png'
import { alertType, loadDataBanner } from '../../redux/actions';
import { ToastUtil, uploadImgToFireBase, deleteFromFirebase, CommonUtils, DF_IMAGE } from '../../utils';
import { accountService, globalService } from '../../services';
import Select from 'react-select';
import IconDelete from '../../assets/svgs/common/icon_delete.svg';
import IconEdit from '../../assets/svgs/common/icon_edit.svg';
import { Space, Table, Tag } from 'antd';
import ModalAddBanner from './ModalAddBanner/ModalAddBanner';
import _ from 'lodash';
import { Switch } from 'antd';

const { Column, ColumnGroup } = Table;



const df_bodyUpdate = [{
    "id": null,
    "imageUrl": null,
    "description": null,
    "url": null,
    "lever": 1,
    "dateUpdated": null
},
{
    "id": null,
    "imageUrl": null,
    "description": null,
    "url": null,
    "lever": 2,
    "dateUpdated": null
},
{
    "id": null,
    "imageUrl": null,
    "description": null,
    "url": null,
    "lever": 3,
    "dateUpdated": null
}]


const BannerManagement = () => {
    const history = useHistory()
    const dispatch = useDispatch()
    const state = useSelector((state) => state);
    const { auth, app, user } = state
    const { userInfo } = user

    const [isEdit, setIsEdit] = useState(false);

    const [bodyUpdate, setBodyUpdate] = useState(df_bodyUpdate);
    const [imageUrls, setImageUrls] = useState([]);


    useEffect(() => {
        fetchGetBanner();
    }, []);


    const fetchGetBanner = async () => {

        dispatch(alertType(true))
        // await accountService.getAllProperty(page, records = 10, codeProperty = null, codeTypeProperty = null, nameProperty = null)
        await accountService.getBanner()
            .then(res => {
                if (res) {
                    dispatch(alertType(false))
                    setBodyUpdate(res)

                    let _imageUrls = []
                    res.forEach((item, index) => {
                        _imageUrls[index] = item.imageUrl || ""
                    })

                    setImageUrls(_imageUrls)
                }
                dispatch(alertType(false))
            })
            .catch(error => {
                dispatch(alertType(false))
                ToastUtil.errorApi(error, "Không thể tải về danh sách banner");
            });
    }


    const onHandleUpdate = async () => {
        let _bodyUpdate = _.cloneDeep(bodyUpdate)
        _bodyUpdate = _bodyUpdate.map((item, index) => {
            return {
                ...item,
                imageUrl: imageUrls[index]
            }
        })
        let body = _bodyUpdate

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
                dispatch(loadDataBanner())
                ToastUtil.success(isEdit ? "Sửa thành công" : "Thêm mới thành công");
            })
            .catch(error => {
                dispatch(alertType(false))
                ToastUtil.errorApi(error, isEdit ? "Sửa không thành công" : "Tạo  mới không thành công");
            });
    }



    const onDeleteImage = async (imgURL, bannerIndex) => {
        let _imageUrls = _.cloneDeep(imageUrls)
        deleteFromFirebase(imgURL)
        _imageUrls[bannerIndex] = null
        console.log("binh_onDeleteImaget", _imageUrls)
        setImageUrls(_imageUrls)
    }


    const handleImageChange = async (event, bannerIndex) => {
        const selectedFiles = event.target.files;
        const selectedFilesArray = Array.from(selectedFiles);

        let setUrlFireBase = async (url) => {
            let _imageUrls = _.cloneDeep(imageUrls)
            _imageUrls[bannerIndex] = url
            setImageUrls(_imageUrls)
        }

        if (selectedFilesArray.length > 0) {
            _.forEach(selectedFilesArray, async (record) => {
                await uploadImgToFireBase(`BannerManagement`, record, setUrlFireBase)

            })
        }




        // await uploadImgToFireBase(`BannerManagement`, selectedFiles, setUrlFireBase)
        // FOR BUG IN CHROME
        event.target.value = "";
    }



    const handleChangeInput = (e, indexBanner) => {
        const { name, value } = e.target

        let _bodyUpdate = _.cloneDeep(bodyUpdate)
        _bodyUpdate = _bodyUpdate.map((elBody, indexBody) => {
            if (indexBanner == indexBody) {
                elBody[name] = value
            }
            return elBody

        })
        setBodyUpdate(_bodyUpdate)
    }

    const onChangeSwitchAccount = (boolean) => {
        setIsEdit(boolean)
    }

    console.log("binh_check_PropertyManagement", { bodyUpdate, imageUrls })
    return (
        <PageContainerBroker
            titleId={"Quản lý banner"}
        >

            <div className="property-management">
                <div className="property-management-container">
                    <div className="property-management-content">

                        <div className="container-action style-add">
                            <div className='div-switch item-center' >
                                <Switch checkedChildren={"Mở Khóa"} unCheckedChildren={"Khóa"} checked={isEdit} onChange={(e) => onChangeSwitchAccount(e)} />
                            </div>

                            <button className='btn btn-add' onClick={onHandleUpdate} disabled={!isEdit}>
                                Cập nhật
                            </button>
                        </div>
                        {/* {isOpenModalAdd && <ModalAddBanner
                            isOpen={isOpenModalAdd}
                            onClose={() => {
                                setIsOpenModalAdd(false)
                                setDataAdd(df_dataAdd)
                            }}
                            dataAdd={dataAdd}
                            isEdit={isEdit}
                            onHandleCallBack={() => { fetchGetFindAllAgency(0) }}
                        />} */}
                        <div className="banner-info">
                            {
                                bodyUpdate && bodyUpdate.length > 0 && bodyUpdate.map((bannerElement, bannerIndex) => {
                                    return (
                                        <div className="banner-item">
                                            {!isEdit && <div className="banner-overlay"></div>}
                                            <div className="body-content-row row gutters-5">
                                                <div className="col-12 col-sm-4 label">
                                                    Id banner
                                                </div>
                                                <div className="col-12 col-sm-8 value">
                                                    <div className="mg-form-control">
                                                        <input className="text-control" value={bannerElement.id} name="id"
                                                            onChange={(e) => handleChangeInput(e, bannerIndex)} disabled={true} />
                                                    </div>
                                                </div>
                                            </div>


                                            <div className="body-content-row row gutters-5">
                                                <div className="col-8 col-sm-4 label">
                                                    Ảnh
                                                </div>
                                                <div className="col-12 col-sm-8 value">
                                                    <div className="block-image">
                                                        {imageUrls[bannerIndex] ?
                                                            <div className="item-image">
                                                                <img src={imageUrls[bannerIndex]} alt="upload" />
                                                                <div className="icon-close item-center" onClick={() => onDeleteImage(imageUrls[bannerIndex], bannerIndex)}>
                                                                    <i class="fa fa-times" aria-hidden="true"></i>
                                                                </div>
                                                            </div> :
                                                            <label className="label-add-image item-center">
                                                                +
                                                                <input
                                                                    type="file"
                                                                    name="images"
                                                                    onChange={(e) => handleImageChange(e, bannerIndex)}
                                                                    accept="image/png , image/jpeg, image/webp"
                                                                />
                                                            </label>
                                                        }
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="body-content-row row gutters-5">
                                                <div className="col-12 col-sm-4 label">
                                                    Link liên kết
                                                </div>
                                                <div className="col-12 col-sm-8 value">
                                                    <div className="mg-form-control">
                                                        <input className="text-control" value={bannerElement.url} name="url"
                                                            onChange={(e) => handleChangeInput(e, bannerIndex)} />
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
                                                            value={bannerElement.description} name="description"
                                                            onChange={(e) => handleChangeInput(e, bannerIndex)} />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })
                            }

                        </div>
                    </div>
                </div>
            </div>
        </PageContainerBroker >

    )
}

export default BannerManagement