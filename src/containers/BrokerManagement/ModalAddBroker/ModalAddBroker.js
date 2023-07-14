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
    "url": null,
    "nameAgency": null,
    "phone": null,
    "dateCreate": null,
    "provinceCode": null,
    "district1st": null,
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

const ModalAddBroker = (props) => {
    const { isOpen, onClose, dataAdd, setDataAdd, isEdit, onHandleCallBack } = props
    const history = useHistory()
    const dispatch = useDispatch()
    const state = useSelector((state) => state);
    const { auth, app, user } = state
    const { userInfo } = user

    const [loading, setLoading] = useState(false);
    const [bodyUpdate, setBodyUpdate] = useState(df_bodyUpdate);
    const [provinceAll, setProvinceAll] = useState([])
    const [districtsAll, setDistrictsAll] = useState([])

    const [numberDistrict, setNumberDistrict] = useState(-1);
    const [listDistrictSelect, setListDistrictSelect] = useState([]);


    const [imageUrls, setImageUrls] = useState([]);

    useEffect(() => {
        fetchGetProvinceAll();
    }, []);


    useEffect(() => {
        if (bodyUpdate.provinceCode) {
            fetchGetFindAllDistrictsByProvinceCode(bodyUpdate.provinceCode)
        }
    }, [bodyUpdate.provinceCode]);

    const fetchGetProvinceAll = async () => {
        dispatch(alertType(true))
        await globalService.getProvinceAll()
            .then(res => {
                if (res && res.length > 0) {
                    let _provinceAll = res.map((item, index) => {
                        return { value: item.provinceCode, label: item.provinceName }
                    })
                    setProvinceAll(_provinceAll)
                    dispatch(alertType(false))
                }
            })
            .catch(error => {
                dispatch(alertType(false))
                ToastUtil.errorApi(error);
            });
    }

    const fetchGetFindAllDistrictsByProvinceCode = async (provinceCode) => {
        dispatch(alertType(true))
        await globalService.getFindAllDistrictsByProvinceCode(provinceCode)
            .then(res => {
                if (res && res.length > 0) {
                    let _districtsAll = res.map((item, index) => {
                        return { value: item.districtCode, label: item.districtName }
                    })
                    setDistrictsAll(_districtsAll)
                    dispatch(alertType(false))
                }
            })
            .catch(error => {
                dispatch(alertType(false))
                ToastUtil.errorApi(error);
            });
    }


    useEffect(() => {
        if (isEdit && dataAdd && dataAdd.id) {
            setBodyUpdate((prev) => ({ ...prev, ...dataAdd }))
            if (dataAdd.url) {
                setUrlFireBase(dataAdd.url)
            }
            let _listDistrictSelect = dataAdd.district1st.split(",")
            if (_listDistrictSelect && _listDistrictSelect.length > 0) {


                let _numberDistrictObj = df_number_district[_listDistrictSelect.length - 1]
                _numberDistrictObj && setNumberDistrict(_numberDistrictObj.value)
                setListDistrictSelect(_listDistrictSelect)
            }


        }
    }, [dataAdd, isEdit]);

    const validate = () => {
        const { nameAgency, provinceCode, phone } = bodyUpdate

        if (!nameAgency) {
            ToastUtil.error("Tên môi giới không được để trống")
            return false
        }
        if (!phone) {
            ToastUtil.error("Số điện thoại không được để trống")
            return false
        }
        if (!provinceCode) {
            ToastUtil.error("Tỉnh/Thành phố không được để trống")
            return false
        }
        if (!listDistrictSelect || (listDistrictSelect && listDistrictSelect.length == 0)) {
            ToastUtil.error("Quận/huyện không được để trống")
            return false
        }

        return true
    }

    const onHandleUpdate = async () => {

        if (!(validate())) {
            return
        }
        let _district1st = ""
        if (listDistrictSelect && listDistrictSelect.length > 0) {
            _district1st = listDistrictSelect.join(',');
        }
        let body = {
            ...df_bodyUpdate,
            id: bodyUpdate.id || null,
            nameAgency: bodyUpdate.nameAgency || null,
            provinceCode: bodyUpdate.provinceCode,
            phone: bodyUpdate.phone || null,
            url: imageUrls[0].url || null,
            district1st: _district1st || null
        }
        console.log("binh_check_ModalAddNewsManagement2", body)
        // return
        dispatch(alertType(true))
        await accountService.updateSaveAgency(body)
            .then(res => {
                dispatch(alertType(false))
                ToastUtil.success(isEdit ? "Sửa thành công" : "Tạo mới thành công");
                onHandleCallBack()
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

    const onChangeSelectProvince = (objValue) => {
        setBodyUpdate((prev) => ({ ...prev, provinceCode: objValue.value }))

    }

    const onChangeNumberDistrict = (objValue) => {
        setNumberDistrict(objValue.value)
        setListDistrictSelect([])
    }

    const onChangeSelectDistrict = (objValue, index) => {
        // setListDistrictSelect((prev) => ([...prev, [index]: objValue.value]))
        let _listDistrictSelect = [...listDistrictSelect]
        _listDistrictSelect[index] = objValue.value
        setListDistrictSelect(_listDistrictSelect)

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

    console.log("binh_check_ModalAddNewsManagement", { bodyUpdate, districtsAll, listDistrictSelect })

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
                        Id môi giới
                    </div>
                    <div className="col-12 col-sm-8 value">
                        <div className="mg-form-control">
                            <input className="text-control" value={bodyUpdate.id} name="id"
                                onChange={handleChangeInput} disabled={true} />
                        </div>
                    </div>
                </div>

                <div className="body-content-row row gutters-5">
                    <div className="col-12 col-sm-4 label">
                        Tên môi giới (*)
                    </div>
                    <div className="col-12 col-sm-8 value">
                        <div className="mg-form-control">
                            <input className="text-control" value={bodyUpdate.nameAgency} name="nameAgency"
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
                    <div className="col-12 col-sm-4 label">
                        Số điện thoại (*)
                    </div>
                    <div className="col-12 col-sm-8 value">
                        <div className="mg-form-control">
                            <input className="text-control" value={bodyUpdate.phone} name="phone"
                                onChange={handleChangeInput} />
                        </div>
                    </div>
                </div>


                <div className="body-content-row row gutters-5">
                    <div className="col-12 col-sm-4 label">
                        Tỉnh/Thành phố (*)
                    </div>
                    <div className="col-12 col-sm-8 value">
                        <div className="custom-input-react-select">
                            <Select
                                onChange={onChangeSelectProvince}
                                options={provinceAll}
                                value={
                                    provinceAll.filter((option) => {
                                        return option.value == bodyUpdate.provinceCode
                                    })
                                }
                            />
                        </div>
                    </div>
                </div>


                {districtsAll && districtsAll.length > 0 && <div className="body-content-row row gutters-5">
                    <div className="col-12 col-sm-4 label">
                        Chọn số quận quản lý (*)
                    </div>
                    <div className="col-12 col-sm-8 value">
                        <div className="value-label">
                            <div className="custom-input-react-select">
                                <Select
                                    onChange={onChangeNumberDistrict}
                                    options={df_number_district}
                                    value={
                                        df_number_district.filter((option) => {
                                            return option.value.length == numberDistrict.length
                                        })
                                    }
                                />
                            </div>
                        </div>
                    </div>
                </div>
                }

                {numberDistrict && numberDistrict.length > 0 && numberDistrict.map((item, index) => {
                    return (
                        <div className="body-content-row row gutters-5">
                            <div className="col-12 col-sm-4 label">
                                Quận/Huyện {index + 1} (*)
                            </div>
                            <div className="col-12 col-sm-8 value">
                                <div className="value-label">
                                    <div className="custom-input-react-select">
                                        <Select
                                            onChange={(record) => onChangeSelectDistrict(record, index)}
                                            options={districtsAll}
                                            value={
                                                districtsAll.filter((option) => {
                                                    return option.value == listDistrictSelect[index]
                                                })
                                            }
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                })}

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

export default ModalAddBroker