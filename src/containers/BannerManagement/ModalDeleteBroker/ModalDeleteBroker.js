import React, { useState, useEffect } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { useSelector, useDispatch } from "react-redux";
import "./ModalDeleteBroker.scss"
import { Space, Table, Tag } from 'antd';
import DraggableModal from '../../../components/DraggableModal/DraggableModal';
import { alertType, initializeApp } from '../../../redux/actions';
import { ToastUtil, uploadImgToFireBase, deleteFromFirebase, RegexUtils, CommonUtils } from '../../../utils';
import { accountService, globalService } from '../../../services';
import _ from 'lodash';

const { Column, ColumnGroup } = Table;

const ModalDeleteBroker = (props) => {
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
        await accountService.deleteAgency(id)
            .then(res => {
                dispatch(alertType(false))
                ToastUtil.success("Xóa thành công");
                onClose()
                onHandleCallBack()
            })
            .catch(error => {
                dispatch(alertType(false))
                ToastUtil.errorApi(error);
            });
    }

    console.log("binh_ModalFirstLogin", dataSource)

    return (
        <DraggableModal
            isOpen={isOpen}
            onClose={onClose}
            className={"modal-broker-delete"}
            titleId={"Xóa tài sản"}
            toggle={onClose}
        >
            <div className="body">
                <div className="body-content-row row gutters-5">
                    <div className="table-all-property">
                        <Table
                            // columns={columns}
                            dataSource={dataSource}
                        >
                            <Column title="Mã môi giới" dataIndex="id" key="id" width={100} align='center' />
                            <Column title="Tên môi giới" dataIndex="nameAgency" key="nameAgency" width={250} align='center'
                                sorter={(a, b) => a.nameAgency.length - b.nameAgency.length}
                            />
                            <Column title="Số điện thoại" dataIndex="phone" key="phone" width={250} align='center'
                                sorter={(a, b) => a.phone.length - b.phone.length}
                            />
                            <Column title="Thành phố/Tỉnh" dataIndex="provinceName" key="provinceName" width={250} align='center'
                                sorter={(a, b) => a.provinceName.length - b.provinceName.length}
                            />
                            <Column title="Quận/Huyện" dataIndex="districtName1st" key="districtName1st" width={250} align='center'
                                sorter={(a, b) => a.districtName1st.length - b.districtName1st.length}
                            />
                            <Column title="Ngày tạo" key="dateCreate" width={150} align='center'
                                render={(t) => {
                                    let data = t.dateCreate
                                    return (
                                        <div>
                                            {CommonUtils.formatDateCeateApi(data)}
                                        </div>
                                    )
                                }}
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
        </DraggableModal>
    )
}

export default ModalDeleteBroker