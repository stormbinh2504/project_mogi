import React, { useState, useEffect } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { useSelector, useDispatch } from "react-redux";
import Header from '../Header/Header'
import "./BlogManagement.scss"
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
import ModalAddBroker from './ModalAddBlog/ModalAddBlog';
import ModalDeleteBroker from './ModalDeleteBroker/ModalDeleteBroker';
import ModalAddBlog from './ModalAddBlog/ModalAddBlog';

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

const BlogManagement = () => {
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
    const [provinceCodeFilter, setProvinceCodeFilter] = useState("");
    const [isOpenModalAdd, setIsOpenModalAdd] = useState(false);
    const [dataAdd, setDataAdd] = useState(df_dataAdd);
    const [isEdit, setIsEdit] = useState(false);
    const [provinceAll, setProvinceAll] = useState([])


    const [dataDelete, setDataDelete] = useState({});
    const [isOpenModalDelete, setIsOpenModalDelete] = useState(false);

    useEffect(() => {
        fetchGetFindAllBlogs(0);
    }, []);

    const fetchGetFindAllBlogs = async (page) => {
        let body = {
            searchName: searchName,
            page,
            size: 5,
        }

        setLoading(true);
        dispatch(alertType(true))
        // await accountService.getAllProperty(page, records = 10, codeProperty = null, codeTypeProperty = null, nameProperty = null)
        await accountService.getAllBlogs(body)
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
        setDataAdd(record)
        setIsEdit(true)
        setIsOpenModalAdd(true)
    }

    const onHandleDelete = async (record) => {
        console.log("onHandleEdit", record)
        let { id } = record
        dispatch(alertType(true))
        await accountService.deleteBlogs(id)
            .then(res => {
                dispatch(alertType(false))
                ToastUtil.success("Xóa blog thành công");
                onSearch()
            })
            .catch(error => {
                dispatch(alertType(false))
                ToastUtil.success("Xóa blog không thành công");
            });
    }

    const handleChangeInput = e => {
        const { name, value } = e.target
        setSearchName((prev) => (value))
    }

    const onChangeSelectProvince = (objValue) => {
        setProvinceCodeFilter(objValue.value)
    }

    const onSearch = () => {
        fetchGetFindAllBlogs(0)
    }



    console.log("binh_check_PropertyManagement", dataEdit)
    return (
        <PageContainerBroker
            titleId={"Quản lý blogs"}
        >

            <div className="property-management">
                <div className="property-management-container">
                    <div className="property-management-content">

                        <div className="container-action style-add">
                            <button className='btn btn-add' onClick={onHandleAdd}>
                                Thêm mới blog
                            </button>
                        </div>
                        {isOpenModalAdd && <ModalAddBlog
                            isOpen={isOpenModalAdd}
                            onClose={() => {
                                setIsOpenModalAdd(false)
                                setDataAdd(df_dataAdd)
                            }}
                            dataAdd={dataAdd}
                            isEdit={isEdit}
                            onHandleCallBack={() => { fetchGetFindAllBlogs(0) }}
                        />}
                        {isOpenModalDelete && <ModalDeleteBroker
                            isOpen={isOpenModalDelete}
                            onClose={() => {
                                setIsOpenModalDelete(false)
                                setDataEdit({})
                            }}
                            dataDelete={dataDelete}
                            onHandleCallBack={() => { fetchGetFindAllBlogs(0) }}
                        />}
                        <div className="list-lookup row row gutters-5">
                            <div className="col-6 col-md-3">
                                <div className="body-content-row row gutters-5">
                                    <div className="col-12 label">
                                        Tên blogs
                                    </div>
                                    <div className="col-12 value">
                                        <div className="mg-form-control">
                                            <input className="text-control" value={searchName} name="searchName"
                                                onChange={handleChangeInput} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-12">
                                <div className="container-action item-center"><button class="btn btn-add" onClick={onSearch}>Tìm kiếm</button></div>
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
                                        fetchGetFindAllBlogs(page - 1);
                                    },
                                }}
                                scroll={{ x: 1000 }}
                            >
                                <Column title="Mã blog" dataIndex="id" key="id" width={100} align='center' />
                                <Column
                                    title="Ảnh"
                                    key="url"
                                    width={200}
                                    align='center'
                                    render={(t, r) => <img src={r.url ? r.url : DF_IMAGE.AVATAR_USER_DF} className='img-broker' />}
                                />
                                <Column title="Tên blog" dataIndex="title" key="title" width={250} align='center'
                                    sorter={(a, b) => a.title.length - b.title.length}
                                />
                                <Column
                                    title="Thao tác"
                                    key="action"
                                    width={150}
                                    align='center'
                                    fixed="right"
                                    render={(_, record) => (
                                        <Space size="middle">
                                            {/* <span className="cursor-pointer" onClick={() => { onHandleEdit(record) }}>
                                                <img src={IconEdit} />
                                            </span> */}
                                            <span className="cursor-pointer item-center" onClick={() => { onHandleDelete(record) }}>
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

export default BlogManagement