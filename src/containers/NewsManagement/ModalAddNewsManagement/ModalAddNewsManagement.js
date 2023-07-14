import React, { useState, useEffect } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { useSelector, useDispatch } from "react-redux";
import "./ModalAddNewsManagement.scss"
import { Space, Table, Tag } from 'antd';
import DraggableModal from '../../../components/DraggableModal/DraggableModal';
import { alertType } from '../../../redux/actions';
import { ToastUtil, uploadImgToFireBase, deleteFromFirebase } from '../../../utils';
import { accountService, globalService } from '../../../services';
import DatePickerCustom from '../../../components/DatePickerCustom/DatePickerCustom';

const { Column, ColumnGroup } = Table;

const df_dataNews = {
    "id": null,
    "nameNews": null,
    "codeProperty": null,
    "dateCreate": new Date(),
    "dateExpiration": new Date(),
}
const ModalAddNewsManagement = (props) => {
    const { isOpen, onClose, dataAdd, setDataAdd, isEdit, onHandleCallBack } = props
    const history = useHistory()
    const dispatch = useDispatch()
    const state = useSelector((state) => state);
    const { auth, app, user } = state
    const { userInfo } = user

    const [dataSource, setDataSource] = useState([]);
    const [totalPages, setTotalPages] = useState(1);
    const [loading, setLoading] = useState(false);
    const [dataNews, setDataNews] = useState(df_dataNews);

    const [step, setStep] = useState(1);


    useEffect(() => {
        fetchGetAllProperty(1);
    }, []);


    useEffect(() => {
        if (dataAdd && dataAdd.id) {
            setDataNews((prev) => ({ ...prev, ...dataAdd }))
        } else {
            setDataNews((prev) => ({ ...prev, ["codeProperty"]: dataAdd["codeProperty"] }))
        }
    }, [dataAdd]);

    const fetchGetAllProperty = async (page) => {
        setLoading(true);
        dispatch(alertType(true))
        // await accountService.getAllProperty(page, records = 10, codeProperty = null, codeTypeProperty = null, nameProperty = null)
        await accountService.getAllProperty(page, 10, userInfo.codeClient, null, null, null)
            .then(res => {
                if (res) {
                    setDataSource(res.data);
                    setTotalPages(res.totalRecord);
                    setLoading(false);
                    dispatch(alertType(false))
                }
            })
            .catch(error => {
                dispatch(alertType(false))
                setLoading(false);
                ToastUtil.errorApi(error, "Không thể tải về danh sách tài sản");
            });
    }

    const validate = () => {
        const { id, nameNews, codeProperty, dateCreate, dateExpiration,
        } = dataNews

        if (!nameNews) {
            ToastUtil.error("Tên tin không được để trống")
            return false
        }
        if (!dateCreate) {
            ToastUtil.error("Ngày tạo không được để trống")
            return false
        }
        if (!dateExpiration) {
            ToastUtil.error("Ngày hết hạn không được để trống")
            return false
        }

        return true
    }

    const onHandleUpdate = async () => {
        if (!(validate())) {
            return
        }
        let body = {
            ...dataNews
        }
        dispatch(alertType(true))
        await accountService.updateSaveNews(body)
            .then(res => {
                dispatch(alertType(false))
                setDataNews(df_dataNews)
                setDataAdd(df_dataNews)
                ToastUtil.success(isEdit ? "Sửa tin thành công" : "Tạo tin mới thành công");
                onHandleCallBack()
                onClose()
            })
            .catch(error => {
                dispatch(alertType(false))
                ToastUtil.errorApi(error, isEdit ? "Sửa tin mới không thành công" : "Tạo tin mới không thành công");
            });
    }


    const handleChangeInput = e => {
        const { name, value } = e.target
        setDataNews((prev) => ({ ...prev, [name]: value }))
    }

    const onChangeDateCreate = (value) => {
        setDataNews((prev) => ({ ...prev, ["dateCreate"]: value }))
    }


    const onChangeDateExpiration = (value) => {
        setDataNews((prev) => ({ ...prev, ["dateExpiration"]: value }))
    }

    console.log("binh_check_ModalAddNewsManagement", dataNews)

    return (
        <DraggableModal
            isOpen={isOpen}
            onClose={onClose}
            className={"modal-add-news-management"}
            titleId={isEdit ? "Sửa tin" : "Thêm mới tin"}
            toggle={onClose}
        >
            <div className="body">

                <div className="body-content-row row gutters-5">
                    <div className="col-12 col-sm-4 label">
                        Id tài sản
                    </div>
                    <div className="col-12 col-sm-8 value">
                        <div className="mg-form-control">
                            <input className="text-control" value={dataNews.codeProperty} name="codeProperty"
                                onChange={handleChangeInput} disabled={true} />
                        </div>
                    </div>
                </div>

                <div className="body-content-row row gutters-5">
                    <div className="col-12 col-sm-4 label">
                        Tên tin (*)
                    </div>
                    <div className="col-12 col-sm-8 value">
                        <div className="mg-form-control">
                            <input className="text-control" value={dataNews.nameNews} name="nameNews"
                                onChange={handleChangeInput} />
                        </div>
                    </div>
                </div>

                <div className="body-content-row row gutters-5">
                    <div className="col-12 col-sm-4 label">
                        Ngày tạo (*)
                    </div>
                    <div className="col-12 col-sm-8 value">
                        <div className="mg-form-control">
                            <DatePickerCustom
                                date={dataNews.dateCreate}
                                onChange={(value) => onChangeDateCreate(value)}
                            />
                        </div>
                    </div>
                </div>


                <div className="body-content-row row gutters-5">
                    <div className="col-12 col-sm-4 label">
                        Ngày hết hạn (*)
                    </div>
                    <div className="col-12 col-sm-8 value">
                        <div className="mg-form-control">
                            <DatePickerCustom
                                date={dataNews.dateExpiration}
                                onChange={(value) => onChangeDateExpiration(value)}
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

export default ModalAddNewsManagement