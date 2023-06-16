import React, { useState, useEffect } from 'react'
import './DatePickerCustom.scss';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { CommonUtils } from '../../utils';
const DatePickerCustom = (props) => {
    const { date, onChange } = props
    const [startDate, setStartDate] = useState(new Date());


    useEffect(() => {
        console.log("DatePickerCustom_useEffect1", { date1: date })
        // if (date) {
        let _date = startDate
        _date = CommonUtils.convertDateApiToDate(date) || null
        console.log("DatePickerCustom_useEffect2", { date1: _date })
        setStartDate(_date);
        // }
    }, [date]);

    const handleDateChange = (date) => {
        // setStartDate(date);
        // console.log("binh_handleDateChange", { date1: date, date2: date.toISOString() })
        let _date = startDate
        _date = CommonUtils.convertDateToDateApi(date) || null
        onChange(_date)
    }

    return (
        <div className="date-picker-custom">
            <DatePicker
                selected={startDate}
                // timeFormat="HH:mm"
                onChange={handleDateChange}
                showTimeSelect
                timeFormat={"p"}
            />
        </div>
    )
}


export default DatePickerCustom