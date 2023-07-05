import React, { useState, useEffect } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { useSelector, useDispatch } from "react-redux";
import "./PropertyManagementDelete.scss"
import { Space, Table, Tag } from 'antd';
import DraggableModal from '../../../components/DraggableModal/DraggableModal';
import { alertType, initializeApp } from '../../../redux/actions';
import { ToastUtil, uploadImgToFireBase, deleteFromFirebase, RegexUtils, CommonUtils } from '../../../utils';
import { accountService, globalService } from '../../../services';
import _ from 'lodash';

const { Column, ColumnGroup } = Table;

const PropertyManagementDelete = (props) => {
    const { isOpen, onClose, dataDelete } = props
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
        let { codeProperty } = dataDelete
        dispatch(alertType(true))
        await accountService.deleteProperty(codeProperty)
            .then(res => {
                if (res) {
                    dispatch(alertType(false))
                    ToastUtil.success("Xóa thành công");
                    onClose()
                }
            })
            .catch(error => {
                dispatch(alertType(false))
                ToastUtil.error(error);
            });
    }

    console.log("binh_ModalFirstLogin", dataSource)

    return (
        <DraggableModal
            isOpen={isOpen}
            onClose={onClose}
            className={"modal-property-delete"}
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
                            <Column title="Mã tài sản" dataIndex="codeProperty" key="codeProperty" width={150} align='center' />
                            <Column title="Tên tài sản" dataIndex="nameProperty" key="nameProperty" width={350} align='center' />
                            <Column title="Địa chỉ" dataIndex="addressView" key="addressView" width={350} align='center' />
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

export default PropertyManagementDelete