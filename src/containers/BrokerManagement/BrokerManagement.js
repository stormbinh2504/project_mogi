import React, { useState, useEffect } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { useSelector, useDispatch } from "react-redux";
import Header from '../Header/Header'
import "./BrokerManagement.scss"
import PageContainerBroker from '../../components/Broker/PageContainerBroker/PageContainerBroker';
import Avatar from '../../assets/images/avatar.png'
import Zalo from '../../assets/images/zalo.png'
import { alertType } from '../../redux/actions';
import { ToastUtil, uploadImgToFireBase, deleteFromFirebase, CommonUtils, DF_IMAGE } from '../../utils';
import { accountService, globalService } from '../../services';
import Select from 'react-select';
import IconDelete from '../../assets/svgs/common/icon_delete.svg';
import IconEdit from '../../assets/svgs/common/icon_edit.svg';
import { Space, Table, Tag } from 'antd';
import ModalAddBroker from './ModalAddBroker/ModalAddBroker';

const { Column, ColumnGroup } = Table;


const df_dataAdd = {
    "id": null,
    "url": null,
    "nameAgency": null,
    "phone": null,
    "dateCreate": null,
    "provinceCode": null,
    "district1st": null,
}

const BrokerManagement = () => {
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
    const [nameSearch, setNameSearch] = useState("");
    const [provinceCodeFilter, setProvinceCodeFilter] = useState("");
    const [isOpenModalAdd, setIsOpenModalAdd] = useState(false);
    const [dataAdd, setDataAdd] = useState(df_dataAdd);
    const [isEdit, setIsEdit] = useState(false);

    useEffect(() => {
        fetchGetFindAllAgency(0);
    }, []);

    const fetchGetFindAllAgency = async (page) => {

        let body = {
            nameSearch,
            page,
            size: 5,
            provinceCode: provinceCodeFilter,
        }

        setLoading(true);
        dispatch(alertType(true))
        // await accountService.getAllProperty(page, records = 10, codeProperty = null, codeTypeProperty = null, nameProperty = null)
        await accountService.getFindAllAgency(body)
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


    const onHandleAdd = () => {
        setDataAdd(df_dataAdd)
        setIsEdit(false)
        setIsOpenModalAdd(true)
    }

    const onHandleEdit = async (record) => {
        console.log("onHandleEdit", record)
        let { codeProperty } = record
        dispatch(alertType(true))
        await accountService.getPropertyDetail(codeProperty)
            .then(res => {
                if (res) {
                    console.log("binh_check_PropertyManagement", res)
                    setDataAdd(res);
                    dispatch(alertType(false))
                }
            })
            .catch(error => {
                dispatch(alertType(false))
                ToastUtil.error(error);
            });
    }

    const handleChangeInput = e => {
        const { name, value } = e.target
        setNameSearch((prev) => ({ ...prev, [name]: value }))
    }

    console.log("binh_check_PropertyManagement", dataEdit)
    return (
        <PageContainerBroker
            titleId={"Quản lý môi giới"}
        >

            <div className="property-management">
                <div className="property-management-container">
                    <div className="property-management-content">

                        <div className="container-action style-add">
                            <button className='btn btn-add' onClick={onHandleAdd}>
                                Thêm mới môi giới
                            </button>
                        </div>
                        {isOpenModalAdd && <ModalAddBroker
                            isOpen={isOpenModalAdd}
                            onClose={() => {
                                setIsOpenModalAdd(false)
                                setDataAdd(df_dataAdd)
                            }}
                            dataAdd={dataAdd}
                            isEdit={isEdit}
                            onHandleCallBack={() => { fetchGetFindAllAgency(0) }}
                        />}
                        <div className="list-lookup row row gutters-5">
                            <div className="col-6 col-md-3">
                                <div className="body-content-row row gutters-5">
                                    <div className="col-12 label">
                                        Tên môi giới
                                    </div>
                                    <div className="col-12 value">
                                        <div className="mg-form-control">
                                            <input className="text-control" value={nameSearch} name="nameSearch"
                                                onChange={handleChangeInput} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="table-all-broker">
                            <Table
                                loading={loading}
                                // columns={columns}
                                dataSource={dataSource}
                                pagination={{
                                    pageSize: 5,
                                    total: totalPages,
                                    onChange: (page) => {
                                        fetchGetFindAllAgency(page - 1);
                                    },
                                }}
                                scroll={{ x: 1000 }}
                            >
                                <Column title="Mã môi giới" dataIndex="id" key="id" width={100} align='center' />
                                <Column
                                    title="Ảnh"
                                    key="url"
                                    width={200}
                                    align='center'
                                    render={(t, r) => <img src={r.url ? r.url : DF_IMAGE.AVATAR_USER_DF}  className='img-broker'/>}
                                />
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
                                            <span className="cursor-pointer item-center" onClick={() => { onHandleEdit(record) }}>
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

    )
}

export default BrokerManagement