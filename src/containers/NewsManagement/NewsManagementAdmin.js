import React, { useState, useEffect } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { useSelector, useDispatch } from "react-redux";
import Header from '../Header/Header'
import "./NewsManagement.scss"
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
import ModalAddNewsManagement from './ModalAddNewsManagement/ModalAddNewsManagement';
import ModalListPropertyManagement from './ModalListPropertyManagement/ModalListPropertyManagement';
import DatePickerCustom from '../../components/DatePickerCustom/DatePickerCustom';
import ModalUptoNews from './ModalUptoNews/ModalUptoNews';
import ModalPreviewNews from './ModalPreviewNews/ModalPreviewNews';

const { Column, ColumnGroup } = Table;

const df_bodyGetManagerNews = {
    "nameNews": null,
    "dateCreate": null,
    "dateExpiration": null,
    "statusNews": null,
    "codeTypeProperty": null,
    "codeCateTypePropertyCategory": null,
    "page": 0,
    "records": 0,
    "sort": null,
    "order": null
}

const NewsManagementAdmin = () => {
    const history = useHistory()
    const dispatch = useDispatch()
    const state = useSelector((state) => state);
    const { auth, app, user } = state
    const { userInfo } = user

    const [dataSource, setDataSource] = useState([]);
    const [totalPages, setTotalPages] = useState(1);
    const [loading, setLoading] = useState(false);
    const [dataAdd, setDataAdd] = useState({
        "id": null,
        "nameNews": null,
        "codeProperty": null,
        "dateCreate": null,
        "dateExpiration": null,
    });
    const [dataUpto, setDataUpto] = useState(null);
    const [dataPreview, setDataPreview] = useState(null);

    const [isOpenModalList, setIsOpenModalList] = useState(false);
    const [isOpenModalAdd, setIsOpenModalAdd] = useState(false);
    const [isOpenModalUpto, setIsOpenModalUpto] = useState(false);
    const [isOpenModalPreview, setIsOpenModalPreview] = useState(false);
    const [isEdit, setIsEdit] = useState(false);
    const [statusNewsAll, setStatusNewsAll] = useState([]);
    const [bodyGetManagerNews, setBodyGetManagerNews] = useState(df_bodyGetManagerNews);

    const onHandleAdd = () => {
        setIsOpenModalList(true)
        setIsEdit(false)
        setBodyGetManagerNews(df_bodyGetManagerNews)
    }

    useEffect(() => {
        fetchGetAllStatusNews()
        fetchGetNewsManagerAll(0);
    }, []);

    const fetchGetNewsManagerAll = async (page) => {
        setLoading(true);
        dispatch(alertType(true))
        let body = {
            // "nameNews": "KHÁNH",
            // "dateCreate": "2023-05-01T15:00:00",
            // "dateExpiration": "2023-05-02T15:00:00",
            // "statusNews": "2",
            // "codeTypeProperty": "typeproperty_7",
            // "codeCateTypePropertyCategory": null,
            // "records": 4,
            // "sort": "desc",
            // "order": null
            ...bodyGetManagerNews,
            // codeClient: userInfo.codeClient,
            page: page,
            records: 4,
        }
        // await accountService.getNewsManagerAll(page, records = 10, codeProperty = null, codeTypeProperty = null, nameProperty = null)
        await accountService.getNewsManagerAll(body)
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
                ToastUtil.errorApi(error, "Không thể tải về danh sách tài sản");
            });
    }


    const fetchGetAllStatusNews = async () => {
        dispatch(alertType(true))
        await globalService.getAllStatusNews()
            .then(res => {
                if (res && res.length > 0) {
                    let _statusNewsAll = res.map((item, index) => {
                        return { value: item.value, label: item.name }
                    })
                    setStatusNewsAll(_statusNewsAll)
                    dispatch(alertType(false))
                }
            })
            .catch(error => {
                dispatch(alertType(false))
                ToastUtil.errorApi(error);
            });
    }

    const handleChangeInput = e => {
        const { name, value } = e.target
        setBodyGetManagerNews((prev) => ({ ...prev, [name]: value }))
    }

    const onChangeStatusNews = (objValue) => {
        setBodyGetManagerNews((prev) => ({ ...prev, statusNews: objValue.value }))
    }

    const onChangeDateCreate = (value) => {
        console.log("binh_onChangeDateCreate", value)
        setBodyGetManagerNews((prev) => ({ ...prev, ["dateCreate"]: value }))
    }


    const onChangeDateExpiration = (value) => {
        setBodyGetManagerNews((prev) => ({ ...prev, ["dateExpiration"]: value }))
    }


    const onHandleEdit = async (record) => {
        console.log("onHandleEdit", record)
        let { id } = record
        dispatch(alertType(true))
        await accountService.getNewsDetail(id)
            .then(res => {
                if (res) {
                    console.log("binh_check_NewsManagement", res)
                    setDataAdd(res);
                    setIsOpenModalAdd(true)
                    setIsEdit(true)
                    dispatch(alertType(false))
                }
            })
            .catch(error => {
                dispatch(alertType(false))
                ToastUtil.errorApi(error);
            });
    }

    const onHandleDelete = async (record) => {
        console.log("onHandleEdit", record)
        let { id } = record
        dispatch(alertType(true))
        await accountService.deleteNews(id)
            .then(res => {
                dispatch(alertType(false))
                ToastUtil.success("Xóa tin thành công");
                onSearch()
            })
            .catch(error => {
                dispatch(alertType(false))
                ToastUtil.success("Xóa tin không thành công");
            });
    }

    const onHandleUpto = async (record) => {
        console.log("onHandleUpto", record)
        setDataUpto(record)
        setIsOpenModalUpto(true)
    }


    const onHandlePreview = async (record) => {
        console.log("onHandleUpto", record)
        setDataPreview(record)
        setIsOpenModalPreview(true)
    }


    const onSearch = () => {
        fetchGetNewsManagerAll(0)
    }
    console.log("binh_check_NewsManagement", dataSource, totalPages)
    return (

        <>
            <PageContainerBroker
                titleId={"Quản lý tin"}
            >
                <div className="property-management">
                    <div className="property-management-container">
                        <div className="property-management-content">
                            {isOpenModalList && <ModalListPropertyManagement
                                isOpen={isOpenModalList}
                                onClose={() => { setIsOpenModalList(false) }}
                                setOpenModalAdd={(flag) => { setIsOpenModalAdd(flag) }}
                                setDataAdd={(data) => { setDataAdd((prev) => ({ ...prev, ...data })) }}
                            />}
                            {isOpenModalAdd && <ModalAddNewsManagement
                                isOpen={isOpenModalAdd}
                                onClose={() => { setIsOpenModalAdd(false) }}
                                setDataAdd={(data) => { setDataAdd((prev) => ({ ...prev, ...data })) }}
                                dataAdd={dataAdd}
                                setIsEdit={(data) => { setIsEdit(data) }}
                                isEdit={isEdit}
                                onHandleCallBack={onSearch}
                            />}
                            {isOpenModalUpto && <ModalUptoNews
                                isOpen={isOpenModalUpto}
                                onClose={() => { setIsOpenModalUpto(false) }}
                                dataUpto={dataUpto}
                            />}
                            {isOpenModalPreview && <ModalPreviewNews
                                isOpen={isOpenModalPreview}
                                onClose={() => { setIsOpenModalPreview(false) }}
                                dataPreview={dataPreview}
                            />}
                            <div className="list-lookup row row gutters-5">
                                <div className="col-6 col-md-3">
                                    <div className="body-content-row row gutters-5">
                                        <div className="col-12 label">
                                            Tên tin
                                        </div>
                                        <div className="col-12 value">
                                            <div className="mg-form-control">
                                                <input className="text-control" value={bodyGetManagerNews.nameNews} name="nameNews"
                                                    onChange={handleChangeInput} />
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="col-6 col-md-3">
                                    <div className="body-content-row row gutters-5">
                                        <div className="col-12 label">
                                            Trạng thái tin
                                        </div>
                                        <div className="col-12 value">
                                            <div className="custom-input-react-select">
                                                <Select
                                                    onChange={onChangeStatusNews}
                                                    options={statusNewsAll}
                                                    value={
                                                        statusNewsAll.filter((option) => {
                                                            return option.value == bodyGetManagerNews.statusNews
                                                        })
                                                    }
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>


                                <div className="col-6 col-md-3">
                                    <div className="body-content-row row gutters-5">
                                        <div className="col-12 label">
                                            Ngày tạo
                                        </div>
                                        <div className="col-12 value">
                                            <div className="mg-form-control">
                                                <DatePickerCustom
                                                    date={bodyGetManagerNews.dateCreate}
                                                    onChange={(value) => onChangeDateCreate(value)}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="col-6 col-md-3">
                                    <div className="body-content-row row gutters-5">
                                        <div className="col-12 label">
                                            Ngày hết hạn
                                        </div>
                                        <div className="col-12 value">
                                            <div className="mg-form-control">
                                                <DatePickerCustom
                                                    date={bodyGetManagerNews.dateExpiration}
                                                    onChange={(value) => onChangeDateExpiration(value)}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>


                                <div className="col-12">
                                    <div className="container-action item-center"><button class="btn btn-add" onClick={onSearch}>Tìm kiếm</button></div>
                                </div>
                            </div>

                            <div className="table-all-news">
                                <Table
                                    loading={loading}
                                    // columns={columns}
                                    dataSource={dataSource}
                                    pagination={{
                                        pageSize: 4,
                                        total: totalPages,
                                        onChange: (page) => {
                                            fetchGetNewsManagerAll(page - 1);
                                        },
                                    }}
                                    // scroll={{ x: true }}
                                    scroll={{ x: 1000 }}
                                >
                                    <Column title="Mã" dataIndex="id" key="id" width={80} align='center' />
                                    <Column
                                        title="Ảnh"
                                        key="url"
                                        width={200}
                                        align='center'
                                        render={(t, r) => <img src={`${r.url}`}
                                            className="img-news"
                                        />}
                                    />
                                    <Column title="Tên tin" dataIndex="nameNews" key="nameNews" width={250} align='center' />
                                    <Column title="Địa chỉ" dataIndex="address" key="address" width={250} align='center' />

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
                                    />
                                    <Column
                                        title="Thao tác"
                                        key="action"
                                        fixed="right"
                                        width={150} align='center'
                                        render={(_, record) => (
                                            <Space size="middle">
                                                {/* <span className="cursor-pointer item-center" onClick={() => { onHandleEdit(record) }}>
                                                    <img src={IconEdit} />
                                                </span> */}
                                                <span className="cursor-pointer item-center" onClick={() => { onHandleDelete(record) }}>
                                                    <img src={IconDelete} />
                                                </span>
                                                {/* <span className="cursor-pointer item-center" onClick={() => { onHandleUpto(record) }}>
                                                    <i class="fa fa-level-up" aria-hidden="true"></i>
                                                </span> */}
                                            </Space>
                                        )}
                                    />
                                    <Column
                                        title="Xem trước"
                                        key="detail"
                                        fixed="right"
                                        width={150} align='center'
                                        render={(_, record) => (
                                            <Space size="middle">
                                                <span className="cursor-pointer item-center text-table detail" onClick={() => { onHandlePreview(record) }}>
                                                    Xem chi tiết
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
        </>
    )
}

export default NewsManagementAdmin