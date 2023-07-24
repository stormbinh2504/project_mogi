import React, { useState, useEffect } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { useSelector, useDispatch } from "react-redux";
import "./ModalDeleteNewsManagement.scss"
import { Space, Table, Tag } from 'antd';
import DraggableModal from '../../../components/DraggableModal/DraggableModal';
import { alertType, initializeApp } from '../../../redux/actions';
import { ToastUtil, uploadImgToFireBase, deleteFromFirebase, RegexUtils, CommonUtils } from '../../../utils';
import { accountService, globalService } from '../../../services';
import _ from 'lodash';

const { Column, ColumnGroup } = Table;

const ModalDeleteNewsManagement = (props) => {
    const { isOpen, onClose, dataDelete, onHandleCallBack } = props
    const history = useHistory()
    const dispatch = useDispatch()
    const state = useSelector((state) => state);
    const { auth, app, user } = state
    const { userInfo } = user

    const [dataSource, setDataSource] = useState([]);

    useEffect(() => {
        setDataSource([dataDelete])
    }, [dataDelete]);


    const onHandleSubmit = async () => {
        // console.log("onHandleEdit", dataDelete)
        let { id } = dataDelete
        dispatch(alertType(true))
        await accountService.deleteNews(id)
            .then(res => {
                dispatch(alertType(false))
                ToastUtil.success("Xóa thành công");
                onClose()
                onHandleCallBack && onHandleCallBack()
            })
            .catch(error => {
                console.log("binh_check_request2", error)
                dispatch(alertType(false))
                ToastUtil.errorApi(error);
            });
    }

    console.log("binh_ModalFirstLogin", dataSource)

    return (
        <DraggableModal
            isOpen={isOpen}
            onClose={onClose}
            className={"modal-property-delete"}
            titleId={"Xóa tin"}
            toggle={onClose}
        >
            <div className="body">
                <div className="body-content-row row gutters-5">
                    <div className="table-all-property">
                        <Table
                            // columns={columns}
                            dataSource={dataSource}
                            scroll={{ x: 1000 }}
                        >
                            <Column title="Mã" dataIndex="id" key="id" width={80} align='center' />
                            <Column title="Tên tin" dataIndex="nameNews" key="nameNews" width={250} align='center'
                                sorter={(a, b) => a.nameNews.length - b.nameNews.length}
                            />
                            <Column title="Địa chỉ" dataIndex="address" key="address" width={250} align='center'
                                sorter={(a, b) => a.address.length - b.address.length}
                            />

                            <Column title="Ngày tạo" key="dateCreate" width={150} align='center'
                                render={(t, r) => {
                                    let data = t.dateCreate
                                    return (
                                        <div>
                                            {CommonUtils.formatDateCeateApi(data)}
                                        </div>
                                    )
                                }}
                            />

                            <Column title="Ngày hết hạn" key="dateExpiration" width={150} align='center'
                                render={(t, r) => {
                                    let data = t.dateExpiration
                                    return (
                                        <div>
                                            {CommonUtils.formatDateCeateApi(data)}
                                        </div>
                                    )
                                }}
                            />
                            <Column title="Trạng thái" key="statusNews" width={150} align='center'
                                render={(t, r) => {
                                    let className = "status-table"
                                    if (t.statusNews == "Đang hoạt động") {
                                        className = className + "  status-active"
                                    }
                                    if (t.statusNews == "Đã hết hạn") {
                                        className = className + "  status-error"
                                    }
                                    return (
                                        <div className={className}>
                                            {t.statusNews}
                                        </div>
                                    )
                                }}

                                filters={[
                                    {
                                        text: 'Đang hoạt động',
                                        value: 'Đang hoạt động',
                                    },
                                    {
                                        text: 'Đã hết hạn',
                                        value: "Đã hết hạn",
                                    },
                                    {
                                        text: "Đã xóa",
                                        value: "Đã xóa",
                                    },
                                ]}
                                onFilter={(value, record) => record.statusNews == value}
                                filterSearch={true}
                            />
                            <Column title="Trạng thái đẩy top" key="statusUpTop" width={150} align='center'
                                render={(t, r) => {
                                    let text = "Chưa hoạt động"
                                    if (t.statusUpTop == 1) {
                                        text = "Đang hoạt động"
                                    }
                                    let className = "status-table"
                                    if (t.statusUpTop == 1) {
                                        className = className + "  status-active"
                                    }
                                    return (
                                        <div className={className}>
                                            {text}
                                        </div>
                                    )
                                }}

                                filters={[
                                    {
                                        text: 'Đang hoạt động',
                                        value: 1,
                                    },
                                    {
                                        text: 'Chưa hoạt động',
                                        value: 2,
                                    }
                                ]}
                                onFilter={(value, record) => record.statusUpTop == value}
                                filterSearch={true}
                            />
                        </Table>
                    </div>

                    <div className="container-action style-add">
                        <button class="btn btn-close" onClick={onClose} >
                            {"Đóng"}
                        </button>
                        <button class="btn btn-continue" onClick={onHandleSubmit} >
                            {"Xác nhận"}
                        </button>
                    </div>
                </div>

            </div>
        </DraggableModal >
    )
}

export default ModalDeleteNewsManagement