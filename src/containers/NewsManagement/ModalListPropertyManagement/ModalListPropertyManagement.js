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

let pageSize = 4
const ModalListPropertyManagement = (props) => {
    const { isOpen, onClose, setOpenModalAdd, setDataAdd, setNumberPageProperty, numberPageProperty, isFetchProperty } = props
    const history = useHistory()
    const dispatch = useDispatch()
    const state = useSelector((state) => state);
    const { auth, app, user } = state
    const { userInfo } = user

    const [dataSource, setDataSource] = useState([]);
    const [totalPages, setTotalPages] = useState(1);
    const [loading, setLoading] = useState(false);
    const [step, setStep] = useState(1);

    useEffect(() => {
        fetchGetAllProperty();
    }, []);


    useEffect(() => {
        fetchGetAllProperty();
    }, [numberPageProperty]);

    useEffect(() => {
        alert(1)
        fetchGetAllProperty();
    }, [isFetchProperty]);

    const fetchGetAllProperty = async () => {
        let page = numberPageProperty
        setLoading(true);
        dispatch(alertType(true))
        // await accountService.getAllProperty(page, records = 10, codeProperty = null, codeTypeProperty = null, nameProperty = null)
        await accountService.getAllProperty(page, pageSize, userInfo.codeClient, null, null, null)
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
                                pageSize: pageSize,
                                total: totalPages,
                                onChange: (page) => {
                                    setNumberPageProperty(page);
                                },
                            }}
                            scroll={{ x: 900 }}
                        >
                            <Column title="Mã tài sản" dataIndex="codeProperty" key="codeProperty" width={100} align='center' />
                            <Column title="Tên tài sản" dataIndex="nameProperty" key="nameProperty" width={350} align='center' />
                            <Column title="Địa chỉ" dataIndex="addressView" key="addressView" width={350} align='center' />
                            <Column title="Trạng thái" dataIndex="status" key="status" width={150} align='center'
                                filters={[
                                    {
                                        text: 'Tạo mới',
                                        value: 'Tạo mới',
                                    },
                                    {
                                        text: 'Đang cho thuê',
                                        value: 'Đang cho thuê',
                                    },
                                    {
                                        text: 'Đã chỉnh sửa',
                                        value: 'Đã chỉnh sửa',
                                    }
                                ]}
                                onFilter={(value, record) => record.status.includes(value)}
                                filterSearch={true}
                            />
                            <Column
                                title="Thao tác"
                                key="action"
                                width={100}
                                align='center'
                                render={(_, record) => {
                                    if (!(record.status.includes('Đang cho thuê'))) {
                                        return (
                                            <Space size="middle">
                                                <span className="cursor-pointer" onClick={() => { onHandleUpdate(record) }}>
                                                    <i class="fa fa-plus-circle" aria-hidden="true"></i>
                                                </span>
                                            </Space>
                                        )
                                    }
                                }}
                            />
                        </Table>
                    </div>
                </div>
            </div>

        </DraggableModal>
    )
}

export default ModalListPropertyManagement