import React, { useState, useEffect } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { useSelector, useDispatch } from "react-redux";
import "./ReportMoney.scss"
import PageContainerBroker from '../../../components/Broker/PageContainerBroker/PageContainerBroker';
import { alertType } from '../../../redux/actions';
import { ToastUtil, uploadImgToFireBase, deleteFromFirebase, CommonUtils, LIST_DATE } from '../../../utils';
import { accountService, globalService } from '../../../services';
import Select from 'react-select';
import DatePickerCustom from '../../../components/DatePickerCustom/DatePickerCustom';
import ChartDataLabels from 'chartjs-plugin-datalabels';

import {
    Chart as ChartJS, ArcElement, Tooltip, Legend, BarElement, CategoryScale,
    LinearScale,
} from 'chart.js';
import { Pie, Bar } from 'react-chartjs-2';
import _ from 'lodash';
import YearPickerCustom from '../../../components/YearPickerCustom/YearPickerCustom';

ChartJS.register(BarElement, ArcElement, Tooltip, Legend, CategoryScale, LinearScale);


const backgroundColor_df = [
    "red",
    "blue",
    "green",
    "yellow",
    "orange",
    "purple",
    "pink",
    "brown",
    "gray",
    "black",
    "white",
    "cyan",
    "magenta",
    "lime",
    "teal",
    "olive",
    "navy",
    "maroon",
    "silver",
    "gold",
    "indigo",
    "violet",
    "turquoise",
    "coral",
    "salmon",
    "skyblue",
    "lavender",
    "peru",
    "sienna",
    "chartreuse",
    "aquamarine",
    "crimson",
    "darkgreen",
    "darkorange",
    "dodgerblue",
    "fuchsia",
    "hotpink",
    "mediumorchid",
    "orangered",
    "springgreen",
    "tomato"
];

const df_config_area = {
    labels: [],
    datasets: [
        {
            data: [
                // 12, 19, 3, 5, 2, 3
            ],
            backgroundColor: ["blue"],
            borderWidth: 1,
        },
    ],
};


const df_bodyGetStatistics = {
    "provinceCode": null,
    "date": null,
    "codeCategoryTypeProperty": null,
}

const df_config_money = {
    animation: {
        animateRotate: false,
        animateScale: true,
    },
    maintainAspectRatio: true,
    title: {
        display: false,
        // position: "top",
        // text: "Random Multicolor Bar Graph",
        // fontSize: 18,
        // fontColor: "#111"
    },
    plugins: {
        datalabels: {
            display: true,
            // color: ["#F93E3E", "#F93E3E", "#F93E3E", "#F9B525", "#21DB77", "#21DB77", "#21DB77"],
            // formatter: Math.round,
            formatter: (value) => {
                const numberString = value
                const number = parseFloat(numberString);
                const formattedNumber = number.toLocaleString('en-US');
                return formattedNumber
            },
            anchor: "end",
            offset: -20,
            align: "start",
        },
        legend: {
            position: "bottom",
            labels: {
                generateLabels: (chart) => {
                    const { data } = chart;
                    if (data.labels.length && data.datasets.length) {
                        return data.labels.map((label, i) => {
                            const numberString = data.datasets[0].data[i]
                            const number = parseFloat(numberString);
                            const formattedNumber = number.toLocaleString('en-US');

                            return ({
                                text: `${label}: ${formattedNumber}`,
                                fillStyle: data.datasets[0].backgroundColor[i],
                                hidden: isNaN(data.datasets[0].data[i]), // Hide NaN values
                                index: i,
                            })
                        })
                    }
                    return [];
                },
            },
        },
    },
    responsive: true,
    legend: {
        display: false,
    },
    type: 'bar',
    scales: {
        y: {
            display: false,
            beginAtZero: true,
            grace: '100' // Tăng khoảng cách column với top
        },
        x: {
            ticks: {
                color: '#000',
            }
        }
    }
}


const ReportMoney = () => {
    const history = useHistory()
    const dispatch = useDispatch()
    const state = useSelector((state) => state);
    const { auth, app, user } = state
    const { userInfo } = user
    const [bodyGetStatistics, setBodyGetStatistics] = useState({ ...df_bodyGetStatistics, date: new Date });
    const [provinceAll, setProvinceAll] = useState([])
    const [typePropertyCategoryAll, SetTypePropertyCategoryAll] = useState([])
    const [statisticsArea, setStatisticsArea] = useState([])
    const [configChartArea, setConfigChartArea] = useState(null)

    const [statisticsMoney, setStatisticsMoney] = useState([])
    const [configChartMoney, setConfigChartMoney] = useState(null)

    useEffect(() => {
        if (statisticsMoney && statisticsMoney.length >= 0) {
            setDataChartMoney()
        }
    }, [statisticsMoney]);


    useEffect(() => {
        if (bodyGetStatistics.date) {
            fetchGetStatisticsByPrice()
        }
    }, [bodyGetStatistics]);

    const fetchGetStatisticsByPrice = async () => {
        const dateString = bodyGetStatistics.date;
        const date = new Date(dateString);
        const month = date.getMonth() + 1
        const year = date.getFullYear()

        let body = {
            year,
        }

        dispatch(alertType(true))
        await accountService.getRepotByMoney(body)
            .then(res => {
                if (res && res.length > 0) {
                    setStatisticsMoney(res)
                } else {
                    setStatisticsMoney([])
                }
                dispatch(alertType(false))
            })
            .catch(error => {
                dispatch(alertType(false))
                ToastUtil.errorApi(error, "Không thể tải về thông tin");
            });
    }


    const formatPrice = (value) => { //"1000000 - 5000000"
        if (value) {
            const numberString = value
            const number = parseFloat(numberString);
            const formattedNumber = number.toLocaleString('en-US');
            return formattedNumber
        }
        return value
    }

    const setDataChartMoney = () => {

        let labels = []
        let dataAssest = []
        let backgroundColor = []
        labels = LIST_DATE.map((item, index) => {
            return item.name
        })

        dataAssest = LIST_DATE.map((item, index) => {
            return 0
        })

        backgroundColor = LIST_DATE.map((item, index) => {
            return backgroundColor_df[index]
        })


        statisticsMoney.forEach((element, index) => {
            if (element.month) {
                dataAssest[Number(element.month) - 1] = element.money
            }
        })

        let configChart = _.cloneDeep(df_config_area)
        configChart.labels = labels
        configChart["datasets"][0].data = dataAssest
        configChart["datasets"][0].backgroundColor = backgroundColor

        console.log("binh_setDataChartMoney", { configChart })
        setConfigChartMoney(configChart)
    }

    const onChangeDateCreate = (value) => {
        console.log("binh_onChangeDateCreate", value)
        setBodyGetStatistics((prev) => ({ ...prev, ["date"]: value }))
    }

    console.log("binh_check_NewsStatistics", { bodyGetStatistics, statisticsMoney, configChartMoney })

    return (
        <>
            <div className="list-lookup row row gutters-5">
                <div className="col-6 col-md-3">
                    <div className="body-content-row row gutters-5">
                        <div className="col-12 label">
                            Năm
                        </div>
                        <div className="col-12 value">
                            <div className="mg-form-control">
                                <YearPickerCustom
                                    date={bodyGetStatistics.date}
                                    onChange={(value) => onChangeDateCreate(value)}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="wrap-chart">
                <div className="block-chart">
                    <h2>Thống kê tiền theo năm</h2>
                    {configChartMoney ?
                        <div className="chart-content" style={{ width: "400px" }} >
                            <Bar
                                height={200}
                                width={200}
                                options={df_config_money}
                                data={configChartMoney}
                                plugins={[ChartDataLabels]}
                            // data={setDataChart()}
                            // plugins={[ChartDataLabels]}
                            />
                        </div>
                        : null
                    }
                </div>
            </div>
        </>
    )
}

export default ReportMoney