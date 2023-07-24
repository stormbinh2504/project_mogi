import React, { useState, useEffect } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { useSelector, useDispatch } from "react-redux";
import "./ModalDeleteBlog.scss"
import { Space, Table, Tag } from 'antd';
import DraggableModal from '../../../components/DraggableModal/DraggableModal';
import { alertType, initializeApp } from '../../../redux/actions';
import { ToastUtil, uploadImgToFireBase, deleteFromFirebase, RegexUtils, CommonUtils } from '../../../utils';
import { accountService, globalService } from '../../../services';
import _ from 'lodash';

const { Column, ColumnGroup } = Table;

const ModalDeleteBlog = (props) => {
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
        await accountService.deleteBlogs(id)
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
            titleId={"Xóa blog"}
            toggle={onClose}
        >
            <div className="body">
                <div className="body-content-row row gutters-5">
                    <div className="table-all-property">
                        <Table
                            dataSource={dataSource}
                            scroll={{ x: 1000 }}
                        >
                            <Column title="Mã blog" dataIndex="id" key="id" width={100} align='center' />
                            <Column title="Tên blog" dataIndex="title" key="title" width={250} align='center'
                                sorter={(a, b) => a.title.length - b.title.length}
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

export default ModalDeleteBlog