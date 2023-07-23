import React, { useState, useEffect } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { useSelector, useDispatch } from "react-redux";
import Header from '../Header/Header'
import "./HistoryRecharge.scss"
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

const df_dataNews = {
    "id": null,
    "nameNews": null,
    "codeProperty": null,
    "dateCreate": null,
    "dateExpiration": null,
}

const HistoryRecharge = () => {
    const history = useHistory()
    const dispatch = useDispatch()
    const state = useSelector((state) => state);
    const { auth, app, user } = state
    const { userInfo } = user

    const [dataSource, setDataSource] = useState([]);
    const [totalPages, setTotalPages] = useState(1);
    const [loading, setLoading] = useState(false);
    const [dataAdd, setDataAdd] = useState(df_dataNews);
    const [dataUpto, setDataUpto] = useState(null);


    useEffect(() => {
        fetchGetHistoryRechargeByClient(0);
    }, []);

    const fetchGetHistoryRechargeByClient = async (page) => {
        setLoading(true);
        dispatch(alertType(true))
        let body = {
            codeClient: userInfo.codeClient,
            page: page,
            size: 4,
        }
        await accountService.getHistoryRechargeByClient(body)
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


    console.log("binh_check_HistoryRecharge", dataSource, totalPages)
    return (

        <>
            <PageContainerBroker
                titleId={"Lịch sử nạp tiền"}
            >
                <div className="property-management">
                    <div className="property-management-container">
                        <div className="property-management-content">


                            <div className="table-all-news">
                                <Table
                                    loading={loading}
                                    // columns={columns}
                                    dataSource={dataSource}
                                    pagination={{
                                        pageSize: 4,
                                        total: totalPages,
                                        onChange: (page) => {
                                            fetchGetHistoryRechargeByClient(page - 1);
                                        },
                                    }}
                                    // scroll={{ x: true }}
                                    scroll={{ x: 1000 }}
                                >
                                    <Column title="Mã" dataIndex="id" key="id" width={80} align='center' />

                                    <Column title="Số tiền" key="money" width={150} align='center'
                                        render={(t, r) => {
                                            let data = t.money
                                            return (
                                                <div>
                                                    {CommonUtils.formatNumber(data, 0)}
                                                </div>
                                            )
                                        }}
                                    />

                                    <Column title="Ngày nạp" key="dateRecharge" width={150} align='center'
                                        render={(t, r) => {
                                            let data = t.dateRecharge
                                            return (
                                                <div>
                                                    {CommonUtils.formatDateCeateApi(data)}
                                                </div>
                                            )
                                        }}
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

export default HistoryRecharge