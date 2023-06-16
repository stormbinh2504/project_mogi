import React, { useState, useEffect } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { useSelector, useDispatch } from "react-redux";
import "./ModalListPropertyManagement.scss"
import { Space, Table, Tag } from 'antd';
import DraggableModal from '../../../components/DraggableModal/DraggableModal';
import { alertType } from '../../../redux/actions';
import { ToastUtil, uploadImgToFireBase, deleteFromFirebase } from '../../../utils';
import { accountService, globalService } from '../../../services';

const { Column, ColumnGroup } = Table;

const ModalListPropertyManagement = (props) => {
    const { isOpen, onClose, setOpenModalAdd, setDataAdd } = props
    const history = useHistory()
    const dispatch = useDispatch()
    const state = useSelector((state) => state);
    const { auth, app, user } = state

    const [dataSource, setDataSource] = useState([]);
    const [totalPages, setTotalPages] = useState(1);
    const [loading, setLoading] = useState(false);
    const [step, setStep] = useState(1);

    useEffect(() => {
        fetchGetAllProperty(1);
    }, []);

    const fetchGetAllProperty = async (page) => {
        setLoading(true);
        dispatch(alertType(true))
        // await accountService.getAllProperty(page, records = 10, codeProperty = null, codeTypeProperty = null, nameProperty = null)
        await accountService.getAllProperty(page, 10, null, null, null)
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
                // ToastUtil.error(error);
                ToastUtil.errorApi(error, "Không thể tải về danh sách tài sản");
            });
    }

    const onHandleUpdate = async (record) => {
        console.log("onHandleEdit", record)
        let { codeProperty } = record

        let body = {
            id: null,
            nameNews: "KHÁNH",
            codeProperty: codeProperty,
            dateCreate: null,
            dateExpiration: null,
        }
        setDataAdd({
            codeProperty: codeProperty,
        })
        setOpenModalAdd(true)
    }

    return (
        <DraggableModal
            isOpen={isOpen}
            onClose={onClose}
            className={"modal-list-property-management"}
            titleId={"Danh sách tài sản"}
            toggle={onClose}
        >
            <div className="body">
                <div className="wrap-body">
                    <div className="table-all-property">
                        <Table
                            loading={loading}
                            // columns={columns}
                            dataSource={dataSource}
                            pagination={{
                                pageSize: 10,
                                total: totalPages,
                                onChange: (page) => {
                                    fetchGetAllProperty(page);
                                },
                            }}
                        >
                            <Column title="Id" dataIndex="codeProperty" key="codeProperty" />
                            <Column title="Tên tài sản" dataIndex="nameProperty" key="nameProperty" />
                            <Column title="Địa chỉ" dataIndex="addressView" key="addressView" />
                            <Column title="Ngày sửa" dataIndex="lastDateUpdate" key="lastDateUpdate" />
                            <Column
                                title="Thao tác"
                                key="action"
                                className='item-center'
                                render={(_, record) => (
                                    <Space size="middle">
                                        <span className="cursor-pointer" onClick={() => { onHandleUpdate(record) }}>
                                            <i class="fa fa-plus-circle" aria-hidden="true"></i>
                                        </span>
                                    </Space>
                                )}
                            />
                        </Table>
                    </div>
                </div>
            </div>

        </DraggableModal>
    )
}

export default ModalListPropertyManagement