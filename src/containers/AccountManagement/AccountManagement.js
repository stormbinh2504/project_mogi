import React, { useState, useEffect } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { useSelector, useDispatch } from "react-redux";
import Header from '../Header/Header'
import "./AccountManagement.scss"
import PageContainerBroker from '../../components/Broker/PageContainerBroker/PageContainerBroker';
import Avatar from '../../assets/images/avatar.png'
import Zalo from '../../assets/images/zalo.png'
import { alertType } from '../../redux/actions';
import { ToastUtil, uploadImgToFireBase, deleteFromFirebase, CommonUtils } from '../../utils';
import { accountService, globalService } from '../../services';
import Select from 'react-select';
import IconEdit from '../../assets/svgs/common/icon_edit.svg';
import { Space, Table, Tag } from 'antd';
import ModalResetPassword from './ModalResetPassword/ModalResetPassword';

const { Column, ColumnGroup } = Table;

const AccountManagement = () => {
    const history = useHistory()
    const dispatch = useDispatch()
    const state = useSelector((state) => state);
    const { auth, app, user } = state
    const { userInfo } = user

    const [dataSource, setDataSource] = useState([]);
    const [totalPages, setTotalPages] = useState(1);
    const [loading, setLoading] = useState(false);
    const [dataEdit, setDataEdit] = useState({});
    const [step, setStep] = useState(1);
    const [isOpenModalResetPassword, setIsOpenModalResetPassword] = useState(false);
    const [dataResetPassword, setDataResetPassword] = useState(false);
    const [searchName, setSearchName] = useState("");

    const onHandleAdd = () => {
        history.push("/property-management-add")
    }
    useEffect(() => {
        fetchGetFindAllUser(0);
    }, []);

    const fetchGetFindAllUser = async (page) => {

        let body = {
            searchName,
            page,
            size: 5,
        }

        setLoading(true);
        dispatch(alertType(true))
        // await accountService.getAllProperty(page, records = 10, codeProperty = null, codeTypeProperty = null, nameProperty = null)
        await accountService.getFindAllUser(body)
            .then(res => {
                if (res) {
                    setDataSource(res.content);
                    setTotalPages(res.totalElements);
                    setLoading(false);
                }
                dispatch(alertType(false))
            })
            .catch(error => {
                dispatch(alertType(false))
                setLoading(false);
                // ToastUtil.error(error);
                ToastUtil.errorApi(error, "Không thể tải về danh sách tài khoản");
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
                ToastUtil.error(error);
            });
    }

    const handleChangeInput = e => {
        const { name, value } = e.target
        setSearchName((prev) => ({ ...prev, [name]: value }))
    }

    console.log("binh_check_PropertyManagement", dataEdit)
    return (
        <PageContainerBroker
            titleId={"Quản lý tài khoản"}
        >
            {isOpenModalResetPassword && <ModalResetPassword
                isOpen={isOpenModalResetPassword}
                onClose={() => {
                    setIsOpenModalResetPassword(false)
                    setDataResetPassword(null)
                }}
                dataResetPassword={dataResetPassword}
            />}
            <div className="property-management">
                <div className="property-management-container">
                    <div className="property-management-content">
                        <div className="list-lookup row row gutters-5">
                            <div className="col-6 col-md-3">
                                <div className="body-content-row row gutters-5">
                                    <div className="col-12 label">
                                        Tên người cho thuê
                                    </div>
                                    <div className="col-12 value">
                                        <div className="mg-form-control">
                                            <input className="text-control" value={searchName} name="searchName"
                                                onChange={handleChangeInput} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="table-all-property">
                            <Table
                                loading={loading}
                                // columns={columns}
                                dataSource={dataSource}
                                pagination={{
                                    pageSize: 5,
                                    total: totalPages,
                                    onChange: (page) => {
                                        fetchGetFindAllUser(page - 1);
                                    },
                                }}
                                scroll={{ x: 1000 }}
                            >
                                <Column title="Mã tài khoản" dataIndex="id" key="id" width={100} align='center' />
                                <Column title="Tên người cho thuê" dataIndex="fullName" key="fullName" width={250} align='center'
                                    sorter={(a, b) => a.fullName.length - b.fullName.length}
                                />
                                <Column title="Số điện thoại" dataIndex="phone" key="phone" width={250} align='center'
                                    sorter={(a, b) => a.phone.length - b.phone.length}
                                />
                                <Column title="Trạng thái" dataIndex="statusAccountName" key="statusAccountName" width={150} align='center'
                                />
                                <Column
                                    title="Xem chi tiết"
                                    key="detail"
                                    fixed="right"
                                    width={150} align='center'
                                    render={(_, record) => (
                                        <Space size="middle">
                                            <span className="cursor-pointer item-center" onClick={() => { onHandleEdit(record) }}>
                                                Chi tiết
                                            </span>
                                        </Space>
                                    )}
                                />
                                <Column
                                    title="Thay đổi trạng thái"
                                    key="changeStaus"
                                    fixed="right"
                                    width={150} align='center'
                                    render={(_, record) => (
                                        <Space size="middle">
                                            <span className="cursor-pointer item-center" onClick={() => { onHandleEdit(record) }}>
                                                Đổi trạng thái
                                            </span>
                                        </Space>
                                    )}
                                />
                                <Column
                                    title="Khôi phục mật khẩu"
                                    key="restore"
                                    fixed="right"
                                    width={150} align='center'
                                    render={(_, record) => (
                                        <Space size="middle">
                                            <span className="cursor-pointer item-center" onClick={() => {
                                                setDataResetPassword(record)
                                                setIsOpenModalResetPassword(true)
                                            }}
                                            >
                                                Khôi phục
                                            </span>
                                        </Space>
                                    )}
                                />
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
                                        </Space>
                                    )}
                                />
                            </Table>
                        </div>
                    </div>
                </div>
            </div>
        </PageContainerBroker >

    )
}

export default AccountManagement