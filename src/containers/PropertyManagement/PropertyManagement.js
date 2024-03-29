import React, { useState, useEffect } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { useSelector, useDispatch } from "react-redux";
import Header from '../Header/Header'
import "./PropertyManagement.scss"
import PageContainerBroker from '../../components/Broker/PageContainerBroker/PageContainerBroker';
import Avatar from '../../assets/images/avatar.png'
import Zalo from '../../assets/images/zalo.png'
import { alertType } from '../../redux/actions';
import { ToastUtil, uploadImgToFireBase, deleteFromFirebase, CommonUtils } from '../../utils';
import { accountService, globalService } from '../../services';
import Select from 'react-select';
import IconDelete from '../../assets/svgs/common/icon_delete.svg';
import IconEdit from '../../assets/svgs/common/icon_edit.svg';
import { Space, Table, Tag } from 'antd';
import PropertyManagementAdd from './PropertyManagementAdd/PropertyManagementAdd';
import PropertyManagementDelete from './PropertyManagementDelete/PropertyManagementDelete';

const { Column, ColumnGroup } = Table;

const PropertyManagement = () => {
    const history = useHistory()
    const dispatch = useDispatch()
    const state = useSelector((state) => state);
    const { auth, app, user } = state
    const { userInfo } = user

    const [dataSource, setDataSource] = useState([]);
    const [totalPages, setTotalPages] = useState(1);
    const [loading, setLoading] = useState(false);
    const [dataEdit, setDataEdit] = useState({});
    const [dataDelete, setDataDelete] = useState({});
    const [step, setStep] = useState(1);
    const [isOpenModalDelete, setIsOpenModalDelete] = useState(false);

    const onHandleAdd = () => {
        history.push("/property-management-add")
    }
    useEffect(() => {
        fetchGetAllProperty(1);
    }, []);

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


    const onHandleEdit = async (record) => {
        console.log("onHandleEdit", record)
        let { codeProperty } = record
        dispatch(alertType(true))
        await accountService.getPropertyDetail(codeProperty)
            .then(res => {
                if (res) {
                    console.log("binh_check_PropertyManagement", res)
                    setDataEdit(res);
                    dispatch(alertType(false))
                    setStep(2)
                }
            })
            .catch(error => {
                dispatch(alertType(false))
                ToastUtil.errorApi(error);
            });
    }

    const onHandleDelete = async (record) => {
        console.log("onHandleDelete", record)
        if (record) {
            setDataDelete(record)
            setIsOpenModalDelete(true)
        }

    }
    // console.log("binh_check_PropertyManagement", dataEdit)
    return (

        <>
            {step == 1 &&
                <PageContainerBroker
                    titleId={"Quản lý tài sản"}
                >
                    {isOpenModalDelete && <PropertyManagementDelete
                        isOpen={isOpenModalDelete}
                        onClose={() => { setIsOpenModalDelete(false) }}
                        dataDelete={dataDelete}
                    />}
                    <div className="property-management">
                        <div className="property-management-container">
                            <div className="property-management-content">
                                <div className="container-action style-add">
                                    <button className='btn btn-add' onClick={onHandleAdd}>
                                        Thêm mới tài sản
                                    </button>
                                </div>

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
                                        scroll={{ x: 1000 }}
                                    >
                                        <Column title="Mã tài sản" dataIndex="codeProperty" key="codeProperty" width={100} align='center' />
                                        <Column title="Tên tài sản" dataIndex="nameProperty" key="nameProperty" width={250} align='center'
                                            sorter={(a, b) => a.nameProperty.length - b.nameProperty.length}
                                        />
                                        <Column title="Địa chỉ" dataIndex="addressView" key="addressView" width={250} align='center'
                                            sorter={(a, b) => a.addressView.length - b.addressView.length}
                                        />
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
                                        <Column title="Ngày sửa" key="lastDateUpdate" width={150} align='center'
                                            render={(t, r) => {
                                                let data = t.lastDateUpdate
                                                return (
                                                    <div>
                                                        {CommonUtils.formatDateCeateApi(data)}
                                                    </div>
                                                )
                                            }}
                                        />
                                        {/* <Column
                                    title="Tags"
                                    dataIndex="tags"
                                    key="tags"
                                    render={(tags) => (
                                        <>
                                            {tags.map((tag) => (
                                                <Tag color="blue" key={tag}>
                                                    {tag}
                                                </Tag>
                                            ))}
                                        </>
                                    )}
                                /> */}
                                        <Column
                                            title="Thao tác"
                                            key="action"
                                            width={150}
                                            align='center'
                                            fixed="right"
                                            render={(_, record) => (
                                                <Space size="middle">
                                                    <span className="cursor-pointer" onClick={() => { onHandleEdit(record) }}>
                                                        <img src={IconEdit} />
                                                    </span>
                                                    <span className="cursor-pointer" onClick={() => { onHandleDelete(record) }} >
                                                        <img src={IconDelete} />
                                                    </span>
                                                </Space>
                                            )}
                                        />
                                    </Table>
                                </div>
                            </div>
                        </div>
                    </div>
                </PageContainerBroker >
            }
            {step === 2 && <PropertyManagementAdd
                dataEdit={dataEdit}
                setStep={setStep}
                isEdit={true}
            />}
            {/* <PropertyManagementAdd
                dataEdit={dataEdit}
                setStep={setStep}
            /> */}
        </>
    )
}

export default PropertyManagement