import React, { useState, useEffect } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { useSelector, useDispatch } from "react-redux";
import "./Report.scss"
import PageContainerBroker from '../../components/Broker/PageContainerBroker/PageContainerBroker';
import { Pie, Bar } from 'react-chartjs-2';
import NewsStatistics from './NewsStatistics/NewsStatistics';
import _ from 'lodash';
import ReportMoney from './ReportMoney/ReportMoney';

const df_tab = [
    {
        value: 1,
        name: "Tin",
        role: "ROLE_CUTOMER",
    },
    {
        value: 2,
        name: "Tiền",
        role: "ROLE_ADMIN",
    },
]

const Report = () => {
    const history = useHistory()
    const dispatch = useDispatch()
    const state = useSelector((state) => state);
    const { auth, app, user } = state
    const { userInfo } = user
    const [tab, setTab] = useState(1)

    return (

        <>
            <PageContainerBroker
                titleId={"Thống kê"}
            >
                <div className="report">
                    <div className="report-container">
                        <div className="report-content">

                            <div className="container-tab">
                                {/* {df_tab.map((item, index) => {
                                    return (
                                        <div className={"tab-item " + (item.value == tab ? "active" : "")} onClick={() => {
                                            setTab(item.value)
                                        }}>
                                            {item.name}
                                        </div>
                                    )
                                })} */}

                                <div className={"tab-item " + (tab == 1 ? "active" : "")} onClick={() => {
                                    setTab(1)
                                }}>
                                    Tin
                                </div>
                                {userInfo.role == "ROLE_ADMIN" && <div className={"tab-item " + (tab == 2 ? "active" : "")} onClick={() => {
                                    setTab(2)
                                }}>
                                    Tiền
                                </div>
                                }
                            </div>

                            {tab == 1 && <NewsStatistics />}
                            {tab == 2 && <ReportMoney />}
                        </div>
                    </div>
                </div>
            </PageContainerBroker >
        </>
    )
}

export default Report