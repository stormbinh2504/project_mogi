import React, { useState, useEffect } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { useSelector, useDispatch } from "react-redux";
import Header from '../../Header/Header'
import "./PropertyManagementAdd.scss"
import PageContainerBroker from '../../../components/Broker/PageContainerBroker/PageContainerBroker';
import { alertType } from '../../../redux/actions';
import { ToastUtil, uploadImgToFireBase, deleteFromFirebase, TYPE_PROPERTY_CATEGORY } from '../../../utils';
import { accountService, globalService } from '../../../services';
import Select from 'react-select';
import NumberInput from '../../../components/Input/NumberInput/NumberInput';
import _ from 'lodash';

const df_PropertyInfo = {
    "codeProperty": null,
    "codeCateTypePropertyCategory": null,
    "codeTypeProperty": null,
    "nameProperty": null,
    "provinceCode": null,
    "districtCode": null,
    "wardsCode": null,
    "codeClient": null,
    "areaUse": null,
    "usableArea": null,
    "landArea": null,
    "bedCount": null,
    "livingCount": null,
    "kitchenCount": null,
    "bathCount": null,
    "law": null,
    "priceBuy": null,
    "priceLoan": null,
    "introduces": null,
    "location": null,
    "imageList": []
}

const PropertyManagementAdd = ({ dataEdit, setStep, isEdit }) => {

    // const { dataEdit, setStep } = props
    // console.log("binh_check_dataEdit", props)
    const history = useHistory()
    const dispatch = useDispatch()
    const state = useSelector((state) => state);
    const { auth, app, user } = state
    const { userInfo } = user
    const [propertyInfo, setPropertyInfo] = useState(df_PropertyInfo)

    const [provinceAll, setProvinceAll] = useState([])
    const [districtsAll, setDistrictsAll] = useState([])
    const [wardsAll, setWardssAll] = useState([])
    const [typePropertyCategoryAll, SetTypePropertyCategoryAll] = useState([])
    const [typePropertyAll, setTypePropertyAll] = useState([])
    const [lawCategoryAll, SetLawCategoryAll] = useState([])


    const [imgFirebaseOld, setImgFirebaseOld] = useState("")
    const [imageUrls, setImageUrls] = useState([]);

    const fetchGetAllLawCategory = async () => {
        dispatch(alertType(true))
        await globalService.getAllLawCategory()
            .then(res => {
                if (res && res.length > 0) {
                    let _lawCategoryAll = res.map((item, index) => {
                        return { value: item.value, label: item.name }
                    })
                    SetLawCategoryAll(_lawCategoryAll)
                    dispatch(alertType(false))
                }
            })
            .catch(error => {
                dispatch(alertType(false))
                ToastUtil.error(error);
            });
    }

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
                ToastUtil.error(error);
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
                ToastUtil.error(error);
            });
    }

    const fetchGetFindAllWardsByDistrictCode = async (districtsCode) => {
        dispatch(alertType(true))
        await globalService.getFindAllWardsByDistrictCode(districtsCode)
            .then(res => {
                if (res && res.length > 0) {
                    let _wardsAll = res.map((item, index) => {
                        return { value: item.wardsCode, label: item.codeName }
                    })
                    setWardssAll(_wardsAll)
                    dispatch(alertType(false))
                }
            })
            .catch(error => {
                dispatch(alertType(false))
                ToastUtil.error(error);
            });
    }

    const fetchGetAllCodeTypeProperty = async (codeTypePropertyCategory) => {
        dispatch(alertType(true))
        await globalService.getAllCodeTypeProperty(codeTypePropertyCategory)
            .then(res => {
                if (res && res.length > 0) {
                    let _typePropertyAll = res.map((item, index) => {
                        return { value: item.codeTypeProperty, label: item.nameTypeProperty }
                    })
                    setTypePropertyAll(_typePropertyAll)
                    dispatch(alertType(false))
                }
            })
            .catch(error => {
                dispatch(alertType(false))
                ToastUtil.error(error);
            });
    }

    const fetchGetAllTypePropertyCategory = async () => {
        dispatch(alertType(true))
        await globalService.getAllTypePropertyCategory()
            .then(res => {
                if (res && res.length > 0) {

                    let _typePropertyCategoryAll = res.filter((item, index) => item.value != '1')
                        .map((item2, index2) => { return { value: item2.value, label: item2.name } })
                    SetTypePropertyCategoryAll(_typePropertyCategoryAll)
                    dispatch(alertType(false))
                }
            })
            .catch(error => {
                dispatch(alertType(false))
                ToastUtil.error(error);
            });
    }

    const handleChangeInput = e => {
        const { name, value } = e.target
        setPropertyInfo((prev) => ({ ...prev, [name]: value }))
    }


    const onHandleUpdate = async () => {
        let body = _.cloneDeep(propertyInfo)
        body.imageList = imageUrls

        dispatch(alertType(true))
        await accountService.updateProperty(body)
            .then(res => {
                dispatch(alertType(false))
                ToastUtil.success("Cập nhật thành công");
                setPropertyInfo(df_PropertyInfo)
            })
            .catch(error => {
                dispatch(alertType(false))
                ToastUtil.errorApi(error, "Cập nhật không thành công");
            });
    }

    useEffect(() => {
        setPropertyInfo((prev) => ({ ...prev, ...dataEdit }))
        dataEdit && setImageUrls(dataEdit.imageList)
    }, [dataEdit]);

    useEffect(() => {
        fetchGetProvinceAll()
        fetchGetAllTypePropertyCategory()
        fetchGetAllLawCategory()
    }, []);



    useEffect(() => {
        if (propertyInfo.codeCateTypePropertyCategory) {
            fetchGetAllCodeTypeProperty(propertyInfo.codeCateTypePropertyCategory)
        }
    }, [propertyInfo.codeCateTypePropertyCategory]);

    useEffect(() => {
        if (propertyInfo.provinceCode) {
            fetchGetFindAllDistrictsByProvinceCode(propertyInfo.provinceCode)
        }
    }, [propertyInfo.provinceCode]);

    useEffect(() => {
        if (propertyInfo.districtCode) {
            fetchGetFindAllWardsByDistrictCode(propertyInfo.districtCode)
        }
    }, [propertyInfo.districtCode]);

    useEffect(() => {
        setPropertyInfo((prev) => ({ ...prev, codeClient: userInfo.codeClient }))
    }, [userInfo]);


    const onChangeSelectProvince = (objValue) => {
        setPropertyInfo((prev) => ({ ...prev, provinceCode: objValue.value, districtCode: null, wardsCode: null }))

    }

    const onChangeSelectDistrict = (objValue) => {
        setPropertyInfo((prev) => ({ ...prev, districtCode: objValue.value, wardsCode: null }))
    }

    const onChangeSelectWard = (objValue) => {
        setPropertyInfo((prev) => ({ ...prev, wardsCode: objValue.value }))
    }

    const onChangeLaw = (objValue) => {
        setPropertyInfo((prev) => ({ ...prev, law: objValue.value }))
    }

    const onChangeSelectCateTypePropertyCategory = (objValue) => {
        setPropertyInfo((prev) => ({ ...prev, codeCateTypePropertyCategory: objValue.value, codeTypeProperty: null }))
    }

    const onChangeSelectTypeProperty = (objValue) => {
        setPropertyInfo((prev) => ({ ...prev, codeTypeProperty: objValue.value }))
    }

    const onChangePriceLoan = (value, valid) => {
        setPropertyInfo((prev) => ({ ...prev, priceLoan: value }))
    };

    const onChangeAreaUse = (value, valid) => {
        setPropertyInfo((prev) => ({ ...prev, areaUse: value }))
    };

    const onChangeLandArea = (value, valid) => {
        setPropertyInfo((prev) => ({ ...prev, landArea: value }))
    };

    const onChangeBedCount = (value, valid) => {
        setPropertyInfo((prev) => ({ ...prev, bedCount: value }))
    };

    const onChangeBathCount = (value, valid) => {
        setPropertyInfo((prev) => ({ ...prev, bathCount: value }))
    };

    const handleImageChange = async (event) => {
        const selectedFiles = event.target.files;
        const selectedFilesArray = Array.from(selectedFiles);



        // const imagesArray = selectedFilesArray.map((file) => {
        //     await uploadImgToFireBase("avatar", file, setUrlFireBase)
        // });
        let codeClient = userInfo.codeClient || "clientTest"

        if (selectedFilesArray.length > 0) {
            _.forEach(selectedFilesArray, async (record) => {
                await uploadImgToFireBase(`Category/${codeClient}`, record, setUrlFireBase)

            })
        }


        // FOR BUG IN CHROME
        event.target.value = "";
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


    let textLength = propertyInfo && propertyInfo.introduces ? propertyInfo.introduces.length : 0
    console.log("binh_client", propertyInfo, imageUrls)
    console.log("binh_setPropertyInfo2", propertyInfo, dataEdit)

    return (
        <PageContainerBroker
            titleId={isEdit ? "Sửa tài sản" : "Thêm mới tài sản"}
        >
            <div className="body property-management-adđ">
                <div className="body-container">
                    <div className="body-content">

                        <div className="body-content-row row gutters-5">
                            <div className="col-12 col-sm-4 label">
                                Loại bất động sản
                            </div>
                            <div className="col-12 col-sm-8 value">
                                <div className="custom-input-react-select">
                                    <Select
                                        onChange={onChangeSelectCateTypePropertyCategory}
                                        options={typePropertyCategoryAll}
                                        value={
                                            typePropertyCategoryAll.filter((option) => {
                                                return option.value == propertyInfo.codeCateTypePropertyCategory
                                            })
                                        }
                                    />
                                </div>
                            </div>
                        </div>

                        {
                            propertyInfo.codeCateTypePropertyCategory &&
                            <>
                                <div className="body-content-row row gutters-5">
                                    <div className="col-12 col-sm-4 label">
                                        Loại cho thuê
                                    </div>
                                    <div className="col-12 col-sm-8 value">
                                        <div className="custom-input-react-select">
                                            <Select
                                                onChange={onChangeSelectTypeProperty}
                                                options={typePropertyAll}
                                                value={
                                                    typePropertyAll.filter((option) => {
                                                        return option.value == propertyInfo.codeTypeProperty
                                                    })
                                                }
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="body-content-row row gutters-5">
                                    <div className="col-12 col-sm-4 label">
                                        Tên cho thuê
                                    </div>
                                    <div className="col-12 col-sm-8 value">
                                        <div className="mg-form-control">
                                            <input className="text-control" value={propertyInfo.nameProperty} name="nameProperty"
                                                onChange={handleChangeInput} />
                                        </div>
                                    </div>
                                </div>

                                <div className="body-content-row row gutters-5">
                                    <div className="col-12 col-sm-4 label">
                                        Tỉnh/Thành phố
                                    </div>
                                    <div className="col-12 col-sm-8 value">
                                        <div className="custom-input-react-select">
                                            <Select
                                                onChange={onChangeSelectProvince}
                                                options={provinceAll}
                                                value={
                                                    provinceAll.filter((option) => {
                                                        return option.value == propertyInfo.provinceCode
                                                    })
                                                }
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="body-content-row row gutters-5">
                                    <div className="col-12 col-sm-4 label">
                                        Quận/Huyện
                                    </div>
                                    <div className="col-12 col-sm-8 value">
                                        <div className="custom-input-react-select">
                                            <Select
                                                onChange={onChangeSelectDistrict}
                                                options={districtsAll}
                                                value={
                                                    districtsAll.filter((option) => {
                                                        return option.value == propertyInfo.districtCode
                                                    })
                                                }
                                            />
                                        </div>
                                    </div>
                                </div>


                                <div className="body-content-row row gutters-5">
                                    <div className="col-12 col-sm-4 label">
                                        Phường/Xã
                                    </div>
                                    <div className="col-12 col-sm-8 value">
                                        <div className="custom-input-react-select">
                                            <Select
                                                onChange={onChangeSelectWard}
                                                options={wardsAll}
                                                value={
                                                    wardsAll.filter((option) => {
                                                        return option.value == propertyInfo.wardsCode
                                                    })
                                                }
                                            />
                                        </div>
                                    </div>
                                </div>


                                <div className="body-content-row row gutters-5">
                                    <div className="col-12 col-sm-4 label">
                                        Giá cho thuê
                                    </div>
                                    <div className="col-12 col-sm-8 value">
                                        <div className="mg-form-control">
                                            <div className="input-number">
                                                <NumberInput
                                                    name="To_Amount"
                                                    className="input-money"
                                                    min={0}
                                                    max={999999999999}
                                                    step={1}
                                                    value={propertyInfo.priceLoan}
                                                    valid={true}
                                                    onChange={onChangePriceLoan}
                                                    allowZero={false}
                                                    allowDecimal={false}
                                                    allowNegative={false}
                                                    disabled={false}
                                                    placeholder="Nhập giá"
                                                />
                                            </div>
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
                                                    multiple
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
                                    <div className="col-8 col-sm-4 label">
                                        Thông tin chính:
                                    </div>
                                    <div className="col-12 col-sm-8 value">
                                    </div>
                                </div>


                                <div className="body-content-row row gutters-5">
                                    <div className="col-8 col-sm-4 label">

                                    </div>
                                    <div className="col-12 col-sm-8 value">
                                        <div className="info-attrs row">
                                            <div className="info-attr col-12 col-sm-6">
                                                <div className="label-info-attr">Diện tích sử dụng</div>
                                                <div className="mg-form-control">
                                                    <div className="input-number">
                                                        <NumberInput
                                                            name="To_Amount"
                                                            className="input-money"
                                                            min={0}
                                                            max={999999999999}
                                                            step={1}
                                                            value={propertyInfo.areaUse}
                                                            valid={true}
                                                            onChange={onChangeAreaUse}
                                                            allowZero={false}
                                                            allowDecimal={false}
                                                            allowNegative={false}
                                                            disabled={false}
                                                            placeholder="Nhập diện tích"
                                                        />
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="info-attr col-12 col-sm-6">
                                                <div className="label-info-attr">Diện tích đất</div>
                                                <div className="mg-form-control">
                                                    <div className="input-number">
                                                        <NumberInput
                                                            name="To_Amount"
                                                            className="input-money"
                                                            min={0}
                                                            max={999999999999}
                                                            step={1}
                                                            value={propertyInfo.landArea}
                                                            valid={true}
                                                            onChange={onChangeLandArea}
                                                            allowZero={false}
                                                            allowDecimal={false}
                                                            allowNegative={false}
                                                            disabled={false}
                                                            placeholder="Nhập diện tích"
                                                        />
                                                    </div>
                                                </div>
                                            </div>


                                            <div className="info-attr col-12 col-sm-6">
                                                <div className="label-info-attr">Phòng ngủ</div>
                                                <div className="mg-form-control">
                                                    <div className="input-number">
                                                        <NumberInput
                                                            name="To_Amount"
                                                            className="input-money"
                                                            min={0}
                                                            max={999999999999}
                                                            step={1}
                                                            value={propertyInfo.bedCount}
                                                            valid={true}
                                                            onChange={onChangeBedCount}
                                                            allowZero={false}
                                                            allowDecimal={false}
                                                            allowNegative={false}
                                                            disabled={false}
                                                            placeholder="Nhập số phòng"
                                                        />
                                                    </div>
                                                </div>
                                            </div>


                                            <div className="info-attr col-12 col-sm-6">
                                                <div className="label-info-attr">Phòng tắm</div>
                                                <div className="mg-form-control">
                                                    <div className="input-number">
                                                        <NumberInput
                                                            name="To_Amount"
                                                            className="input-money"
                                                            min={0}
                                                            max={999999999999}
                                                            step={1}
                                                            value={propertyInfo.bathCount}
                                                            valid={true}
                                                            onChange={onChangeBathCount}
                                                            allowZero={false}
                                                            allowDecimal={false}
                                                            allowNegative={false}
                                                            disabled={false}
                                                            placeholder="Nhập số phòng"
                                                        />
                                                    </div>
                                                </div>
                                            </div>


                                            <div className="info-attr col-12 col-sm-6">
                                                <div className="label-info-attr">Pháp lý</div>
                                                <div className="custom-input-react-select">
                                                    <Select
                                                        onChange={onChangeLaw}
                                                        options={lawCategoryAll}
                                                        value={
                                                            lawCategoryAll.filter((option) => {
                                                                return option.value == propertyInfo.law
                                                            })
                                                        }
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="body-content-row row gutters-5">
                                    <div className="col-12 col-sm-4 label">
                                        Địa chỉ
                                    </div>
                                    <div className="col-12 col-sm-8 value">
                                        <div className="mg-form-control">
                                            <input className="text-control" value={propertyInfo.location} name="location"
                                                onChange={handleChangeInput} />

                                        </div>
                                    </div>
                                </div>

                                {
                                    propertyInfo.location && <div className="body-content-row row gutters-5">
                                        <div className="col-12 col-sm-4 label">

                                        </div>
                                        <div className="col-12 col-sm-8 value">
                                            <div className="mg-form-control">
                                                <div className="" dangerouslySetInnerHTML={{ __html: propertyInfo.location }}></div>
                                            </div>
                                        </div>
                                    </div>
                                }

                                <div className="body-content-row row gutters-5">
                                    <div className="col-12 col-sm-4 label">
                                        Giới thiệu
                                    </div>
                                    <div className="col-12 col-sm-8 value">
                                        <div className="mg-form-control">
                                            <textarea className="text-control"
                                                cols="20"
                                                maxlength="2000"
                                                rows="8"
                                                value={propertyInfo.introduces} name="introduces"
                                                onChange={handleChangeInput}
                                            />
                                            <div class="ext-action">
                                                <span class="ng-binding">
                                                    {textLength}</span>/2000 kí tự
                                            </div>
                                        </div>

                                    </div>
                                </div>

                                <div className="body-content-row row gutters-5">
                                    <div className="col-12 col-sm-4 label">

                                    </div>
                                    <div className="col-12 col-sm-8">
                                        <div className="container-action style-add">
                                            <button class="btn btn-continue" onClick={onHandleUpdate} >Cập nhật</button>
                                        </div>
                                    </div>
                                </div>

                            </>
                        }


                        {propertyInfo.codeTypeProperty && propertyInfo.codeTypeProperty === TYPE_PROPERTY_CATEGORY &&
                            <div>

                            </div>
                        }

                    </div>
                </div>
            </div>
        </PageContainerBroker >
    )
}

export default PropertyManagementAdd