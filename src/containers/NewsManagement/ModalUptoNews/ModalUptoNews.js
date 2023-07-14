import React, { useState, useEffect } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { useSelector, useDispatch } from "react-redux";
import "./ModalUptoNews.scss"
import { Space, Table, Tag } from 'antd';
import DraggableModal from '../../../components/DraggableModal/DraggableModal';
import { alertType } from '../../../redux/actions';
import { ToastUtil, uploadImgToFireBase, deleteFromFirebase } from '../../../utils';
import { accountService, globalService } from '../../../services';
import DatePickerCustom from '../../../components/DatePickerCustom/DatePickerCustom';

const { Column, ColumnGroup } = Table;

const ModalUptoNews = (props) => {
    const { isOpen, onClose, dataUpto } = props
    const history = useHistory()
    const dispatch = useDispatch()
    const state = useSelector((state) => state);
    const { auth, app, user } = state
    const { userInfo } = user

    const [dataNews, setDataNews] = useState({
        "id": null,
        "timeUpTopStart": new Date(),
        "timeUpTopEnd": new Date(),
    });

    useEffect(() => {
        if (dataUpto && dataUpto.id) {
            setDataNews((prev) => ({ ...prev, id: dataUpto.id }))
            if (dataUpto.timeUpTopStart && dataUpto.timeUpTopEnd) {
                setDataNews((prev) => ({ ...prev, timeUpTopStart: dataUpto.timeUpTopStart, timeUpTopEnd: dataUpto.timeUpTopEnd }))
            }
        }
    }, [dataUpto]);



    const validate = () => {
        const { id, timeUpTopStart, timeUpTopEnd,
        } = dataNews

        if (!timeUpTopStart) {
            ToastUtil.error("Ngày tạo không được để trống")
            return false
        }
        if (!timeUpTopEnd) {
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
        console.log("binh_onHandleUpdate", body)
        dispatch(alertType(true))
        await accountService.updateUptoNews(body)
            .then(res => {
                dispatch(alertType(false))
                ToastUtil.success("Up tin thành công");
                onClose()
            })
            .catch(error => {
                dispatch(alertType(false))
                ToastUtil.errorApi(error, "Up tin không thành công");
            });
    }


    const handleChangeInput = e => {
        const { name, value } = e.target
        setDataNews((prev) => ({ ...prev, [name]: value }))
    }

    const onChangetimeUpTopStart = (value) => {
        setDataNews((prev) => ({ ...prev, ["timeUpTopStart"]: value }))
    }


    const onChangetimeUpTopEnd = (value) => {
        setDataNews((prev) => ({ ...prev, ["timeUpTopEnd"]: value }))
    }

    console.log("binh_ModalUptoNews", dataNews)

    return (
        <DraggableModal
            isOpen={isOpen}
            onClose={onClose}
            className={"modal-add-news-management"}
            titleId={"Đây tin lên top"}
            toggle={onClose}
        >
            <div className="body">

                <div className="body-content-row row gutters-5">
                    <div className="col-12 col-sm-4 label">
                        Id tin
                    </div>
                    <div className="col-12 col-sm-8 value">
                        <div className="mg-form-control">
                            <input className="text-control" value={dataNews.id} name="codeProperty"
                                onChange={handleChangeInput} disabled={true} />
                        </div>
                    </div>
                </div>

                <div className="body-content-row row gutters-5">
                    <div className="col-12 col-sm-4 label">
                        Ngày bắt đầu (*)
                    </div>
                    <div className="col-12 col-sm-8 value">
                        <div className="mg-form-control">
                            <DatePickerCustom
                                date={dataNews.timeUpTopStart}
                                onChange={(value) => onChangetimeUpTopStart(value)}
                            />
                        </div>
                    </div>
                </div>


                <div className="body-content-row row gutters-5">
                    <div className="col-12 col-sm-4 label">
                        Ngày kết thúc (*)
                    </div>
                    <div className="col-12 col-sm-8 value">
                        <div className="mg-form-control">
                            <DatePickerCustom
                                date={dataNews.timeUpTopEnd}
                                onChange={(value) => onChangetimeUpTopEnd(value)}
                            />
                        </div>
                    </div>
                </div>

                <div className="body-content-row row gutters-5">
                    <div className="container-action style-add">
                        <button class="btn btn-continue" onClick={onHandleUpdate} >
                            {"Xác nhận"}
                        </button>
                    </div>
                </div>

            </div>
        </DraggableModal>
    )
}

export default ModalUptoNews