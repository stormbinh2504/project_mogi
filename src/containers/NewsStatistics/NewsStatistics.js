import React, { useState, useEffect } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { useSelector, useDispatch } from "react-redux";
import "./NewsStatistics.scss"
import PageContainerBroker from '../../components/Broker/PageContainerBroker/PageContainerBroker';
import { alertType } from '../../redux/actions';
import { ToastUtil, uploadImgToFireBase, deleteFromFirebase, CommonUtils } from '../../utils';
import { accountService, globalService } from '../../services';
import Select from 'react-select';
import DatePickerCustom from '../../components/DatePickerCustom/DatePickerCustom';
import ChartDataLabels from 'chartjs-plugin-datalabels';

import {
    Chart as ChartJS, ArcElement, Tooltip, Legend, BarElement, CategoryScale,
    LinearScale,
} from 'chart.js';
import { Pie, Bar } from 'react-chartjs-2';
import _ from 'lodash';

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
const df_bodyGetStatistics = {
    "provinceCode": null,
    "date": null,
    "codeCategoryTypeProperty": null,
}


const df_config_area = {
    labels: [],
    datasets: [
        {
            data: [
                // 12, 19, 3, 5, 2, 3
            ],
            backgroundColor: backgroundColor_df,
            borderWidth: 1,
        },
    ],
};


let df_option_area = {
    // responsive: true,
    animation: {
        animateRotate: false,
        animateScale: true,
    },
    maintainAspectRatio: true,
    plugins: {
        datalabels: {
            color: 'white',
            font: {
                weight: 'bold',
            },
            formatter: (value) => value + '%',
        },
        tooltip: {
            callbacks: {
                label: (context) => {
                    // console.log("binh_legendCallback", context)
                    const label = context.label || '';
                    const value = context.formattedValue || '';
                    return `${label}: ${value}%`;
                },
            },
        },
        legend: {
            position: "bottom",
            labels: {
                generateLabels: (chart) => {
                    const { data } = chart;
                    if (data.labels.length && data.datasets.length) {
                        return data.labels.map((label, i) => ({
                            text: `${label}: ${data.datasets[0].data[i]}%`,
                            fillStyle: data.datasets[0].backgroundColor[i],
                            hidden: isNaN(data.datasets[0].data[i]), // Hide NaN values
                            index: i,
                        }));
                    }
                    return [];
                },
            },
        },
    },
};


const df_config_price = {
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
            formatter: (value) => value + '%',
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
                        return data.labels.map((label, i) => ({
                            text: `${label}: ${data.datasets[0].data[i]}%`,
                            fillStyle: data.datasets[0].backgroundColor[i],
                            hidden: isNaN(data.datasets[0].data[i]), // Hide NaN values
                            index: i,
                        }));
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


const NewsStatistics = () => {
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

    const [statisticsPrice, setStatisticsPrice] = useState([])
    const [configChartPrice, setConfigChartPrice] = useState(null)



    useEffect(() => {
        fetchGetProvinceAll()
        fetchGetAllTypePropertyCategory()
    }, []);


    useEffect(() => {
        if (bodyGetStatistics.date && bodyGetStatistics.provinceCode && bodyGetStatistics.codeCategoryTypeProperty) {
            fetchGetStatisticsByDistrict()
            fetchGetStatisticsByPrice()
        }
    }, [bodyGetStatistics]);

    useEffect(() => {
        if (statisticsArea && statisticsArea.length > 0) {
            setDataChartArea()
        }
    }, [statisticsArea]);


    useEffect(() => {
        if (statisticsPrice && statisticsPrice.length > 0) {
            setDataChartPrice()
        }
    }, [statisticsPrice]);

    const fetchGetStatisticsByDistrict = async () => {

        const dateString = bodyGetStatistics.date;
        const date = new Date(dateString);
        const month = date.getMonth() + 1
        const year = date.getFullYear()

        let body = {
            provinceCode: bodyGetStatistics.provinceCode,
            month,
            year,
            codeCategoryTypeProperty: bodyGetStatistics.codeCategoryTypeProperty
        }

        dispatch(alertType(true))
        await accountService.getStatisticsByDistrict(body)
            .then(res => {
                if (res && res.length > 0) {
                    setStatisticsArea(res)
                }
                dispatch(alertType(false))
            })
            .catch(error => {
                dispatch(alertType(false))
                ToastUtil.errorApi(error, "Không thể tải về thông tin");
            });
    }

    const fetchGetStatisticsByPrice = async () => {

        const dateString = bodyGetStatistics.date;
        const date = new Date(dateString);
        const month = date.getMonth() + 1
        const year = date.getFullYear()

        let body = {
            provinceCode: bodyGetStatistics.provinceCode,
            month,
            year,
            codeCategoryTypeProperty: bodyGetStatistics.codeCategoryTypeProperty
        }

        dispatch(alertType(true))
        await accountService.getStatisticsByPrice(body)
            .then(res => {
                if (res && res.length > 0) {
                    setStatisticsPrice(res)
                }
                dispatch(alertType(false))
            })
            .catch(error => {
                dispatch(alertType(false))
                ToastUtil.errorApi(error, "Không thể tải về thông tin");
            });
    }


    const fetchGetProvinceAll = async () => {
        dispatch(alertType(true))
        await globalService.getProvinceAll()
            .then(res => {
                if (res && res.length > 0) {
                    let _provinceAll = res.map((item, index) => {
                        return { value: item.provinceCode, label: item.provinceName }
                    })
                    setProvinceAll(_provinceAll)
                    dispatch(alertType(false))
                    onChangeSelectProvince(_provinceAll[0])
                }
            })
            .catch(error => {
                dispatch(alertType(false))
                ToastUtil.error(error);
            });
    }

    const fetchGetAllTypePropertyCategory = async () => {
        dispatch(alertType(true))
        await globalService.getAllTypePropertyCategory()
            .then(res => {
                if (res && res.length > 0) {

                    let _typePropertyCategoryAll = res.filter((item, index) => item.value != '1')
                        .map((item2, index2) => { return { value: item2.value, label: item2.name } })
                    SetTypePropertyCategoryAll(_typePropertyCategoryAll)
                    dispatch(alertType(false))
                    onChangeSelectCateTypePropertyCategory(_typePropertyCategoryAll[0])
                }
            })
            .catch(error => {
                dispatch(alertType(false))
                ToastUtil.error(error);
            });
    }

    const onChangeDateCreate = (value) => {
        console.log("binh_onChangeDateCreate", value)
        setBodyGetStatistics((prev) => ({ ...prev, ["date"]: value }))
    }

    const onChangeSelectProvince = (objValue) => {
        setBodyGetStatistics((prev) => ({ ...prev, provinceCode: objValue.value }))

    }

    const onChangeSelectCateTypePropertyCategory = (objValue) => {
        setBodyGetStatistics((prev) => ({ ...prev, codeCategoryTypeProperty: objValue.value }))
    }



    const setDataChartArea = () => {

        let labels = []
        let dataAssest = []
        let totalCount = 0
        let backgroundColor = []
        statisticsArea.forEach((element, index) => {
            totalCount += Number(element.count)
        })

        statisticsArea.forEach((element, index) => {
            let percentItem = (Number(element.count) / totalCount) * 100
            percentItem = Number(percentItem) || 0
            if (percentItem) {
                labels.push(element.districtName)
                dataAssest.push(percentItem.toFixed(2))
                backgroundColor.push(backgroundColor_df[index])
            }
        })

        if (dataAssest && dataAssest.length == 0) {
            dataAssest = [100]
            labels = ["Empty"]
            backgroundColor = ['gray']
        }

        let configChart = _.cloneDeep(df_config_area)
        configChart.labels = labels
        configChart["datasets"][0].data = dataAssest
        configChart["datasets"][0].backgroundColor = backgroundColor

        console.log("binh_setDataChart", { configChart })
        setConfigChartArea(configChart)
    }

    const setDataChartPrice = () => {

        let labels = []
        let dataAssest = []
        let totalCount = 0
        let backgroundColor = []
        statisticsPrice.forEach((element, index) => {
            totalCount += Number(element.rangeCount)
        })

        statisticsPrice.forEach((element, index) => {
            let percentItem = (Number(element.rangeCount) / totalCount) * 100
            percentItem = Number(percentItem) || 0
            if (percentItem) {
                labels.push(element.rangeName)
                dataAssest.push(percentItem.toFixed(2))
                backgroundColor.push('green')
            }
        })

        if (dataAssest && dataAssest.length == 0) {
            dataAssest = [100]
            labels = ["Empty"]
            backgroundColor = ['gray']
        }

        let configChart = _.cloneDeep(df_config_area)
        configChart.labels = labels
        configChart["datasets"][0].data = dataAssest
        configChart["datasets"][0].backgroundColor = backgroundColor

        console.log("binh_setDataChartPrice", { configChart })
        setConfigChartPrice(configChart)
    }

    console.log("binh_check_NewsStatistics", { bodyGetStatistics, configChartArea, configChartPrice })

    return (

        <>
            <PageContainerBroker
                titleId={"Thống kê tin"}
            >
                <div className="property-management">
                    <div className="property-management-container">
                        <div className="property-management-content">

                            <div className="list-lookup row row gutters-5">

                                <div className="col-6 col-md-3">
                                    <div className="body-content-row row gutters-5">
                                        <div className="col-12 label">
                                            Tỉnh/Thành phố
                                        </div>
                                        <div className="col-12 value">
                                            <div className="custom-input-react-select">
                                                <Select
                                                    onChange={onChangeSelectProvince}
                                                    options={provinceAll}
                                                    value={
                                                        provinceAll.filter((option) => {
                                                            return option.value == bodyGetStatistics.provinceCode
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
                                            Tháng năm
                                        </div>
                                        <div className="col-12 value">
                                            <div className="mg-form-control">
                                                <DatePickerCustom
                                                    date={bodyGetStatistics.date}
                                                    onChange={(value) => onChangeDateCreate(value)}
                                                    dateFormatValue="MM/yyyy"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>


                                <div className="col-6 col-md-3">
                                    <div className="body-content-row row gutters-5">
                                        <div className="col-12 label">
                                            Loại tài sản
                                        </div>
                                        <div className="col-12 value">
                                            <div className="custom-input-react-select">
                                                <Select
                                                    onChange={onChangeSelectCateTypePropertyCategory}
                                                    options={typePropertyCategoryAll}
                                                    value={
                                                        typePropertyCategoryAll.filter((option) => {
                                                            return option.value == bodyGetStatistics.codeCategoryTypeProperty
                                                        })
                                                    }
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </div>
                            <div className="wrap-chart">
                                <div className="block-chart">
                                    <h2>Số lượng tin đăng bán theo khu vực</h2>
                                    {configChartArea ?
                                        <div className="chart-content" style={{ textAlign: 'center', width: "400px" }} >
                                            <Pie
                                                height={200}
                                                width={200}
                                                options={df_option_area}
                                                data={configChartArea}
                                                // data={setDataChart()}
                                                plugins={[ChartDataLabels]}
                                            />
                                        </div>
                                        : null
                                    }
                                </div>
                                <div className="block-chart">
                                    <h2>Số lượng tin đăng bán theo khoảng giá</h2>
                                    {configChartPrice ?
                                        <div className="chart-content" style={{ width: "400px" }} >
                                            <Bar
                                                height={200}
                                                width={200}
                                                options={df_config_price}
                                                data={configChartPrice}
                                                plugins={[ChartDataLabels]}
                                            // data={setDataChart()}
                                            // plugins={[ChartDataLabels]}
                                            />
                                        </div>
                                        : null
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </PageContainerBroker >
        </>
    )
}

export default NewsStatistics