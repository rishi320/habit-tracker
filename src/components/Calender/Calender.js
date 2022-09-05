import React, { useRef, useState } from 'react';
import moment from 'moment';
import "./Calender.css";

function Calender({dayClick}) {
    const [dateObj, setDateObj] = useState(moment());
    const [month, setMonth] = useState(moment().format("MMMM"));
    const [year, setYear] = useState(moment().format("Y"));
    const [allMonths, setAllMonths] = useState(moment.months());
    const [showMonth, setShowMonth] = useState(false);
    const [showYear, setShowYear] = useState(false);
    const [selectedDate, setSelectedDate] = useState(null);
    // const [selected, setSelected] = useState("");
  

    const weekdays = moment.weekdaysShort();

    let weekdaysshort = weekdays.map(day => {
        return (
            <th key={day} className="week-day">{day}</th>
        );
    })

    const firstDayOfMonth = () => {

        let firstDay = moment(dateObj).startOf("month").format("d");
        return firstDay;
    }

    // const handleDayClick = (e, day)=>{
    //     setSelectedDate(day);
    //     console.log("in the date function", day);

    // }

    const days = () => {

        let blanks = [];
        for (let i = 0; i < firstDayOfMonth(); i++) {
            blanks.push(
                <td className='calender-day empty'>{""}</td>
            )
        }

        let dayInMonths = [];
        for (let i = 1; i <= dateObj.daysInMonth(); i++) {
            let currentDay = (i == dateObj.format("D") ? "today" : "")
            let unselectable = (i<dateObj.format("D") ? "unselectable" : "")
            console.log("calender", unselectable);
            dayInMonths.push(
                <td key={i} id={`id ${i}`} className={`calender-day ${currentDay} ${unselectable}`} >
                <span onClick={()=>{
                   dayClick(i)
                }}>{i}</span></td>
            )
        }

        let totalCells = [...blanks, ...dayInMonths];
        let rows = [];
        let cells = [];

        totalCells.forEach((row, i) => {
            if (i % 7 !== 0) {
                cells.push(row);
            } else {
                rows.push(cells);
                cells = [];
                cells.push(row);
            }
            if (i === totalCells.length - 1) {
                rows.push(cells);
            }
        })

        let daysinmonth = rows.map((d, i) => {
            return (<tr>{d}</tr>);
        })

        return daysinmonth;
    }



    const handleMonthClick = (mon) => {
        let monthNo = allMonths.indexOf(mon);
        let dateObject = Object.assign({}, dateObj);
        dateObject = moment(dateObject).set('month', monthNo);
        setDateObj(dateObject);
        setMonth(mon);
        setShowMonth(false);
        console.log("in the calender", dateObject);
    }

    const MonthList = (props) => {
        //seee if month useSate is needed
        let months = [];
        props.data.map((data, i) => {
            months.push(
                <td key={data}
                    className="calender-month cell"
                    onClick={(e) => {
                        handleMonthClick(data);
                    }}>
                    <span>
                        {data}
                    </span></td>
            )
        })

        let rows = [];
        let cells = [];

        months.forEach((mon, i) => {
            if (i % 3 !== 0 || i === 0) {
                cells.push(mon);
            } else {
                rows.push(cells);
                cells = [];
                cells.push(mon);
            }
        });
        rows.push(cells);

        let monthlist = rows.map((d, i) => {
            return <tr>{d}</tr>
        })

        return (
            <table className='calender-main-month'>
                <thead>
                    <tr>
                        <th className='header-month' colSpan="4">
                            <span>Select a month</span></th>
                    </tr>
                </thead>
                <tbody>
                    {monthlist}
                </tbody>
            </table>
        );
    }

    const getYears = (startYear, stopYear) => {
        var yearArr = [];
        var currentYear = moment(startYear);
        var endYear = moment(stopYear);

        while (currentYear <= endYear) {
            yearArr.push(moment(currentYear).format("YYYY"));
            currentYear = moment(currentYear).add(1, "year");
        }

        return yearArr;

    }

    const handleYearClick = (year) => {
        let dateObject = Object.assign({}, dateObj);
        dateObject = moment(dateObject).set('year', year);
        setDateObj(dateObject);
        setYear(year);
        setShowYear(false);
        setShowMonth(true);

    }

    const YearTable = (props) => {
        let years = [];
        let nextten = moment().set("year", props).add(12, "year").format("Y");

        let twelveYears = getYears(props, nextten);

        twelveYears.map((data) => {
            years.push(
                <td
                    key={data}
                    className="calender-year cell"
                    onClick={() => {
                        handleYearClick(data)
                    }}>
                    <span>
                        {data}
                    </span></td>
            )
        })

        let rows = [];
        let cells = [];

        years.forEach((year, i) => {
            if (i % 3 !== 0 || i === 0) {
                cells.push(year);
            } else {
                rows.push(cells);
                cells = [];
                cells.push(year);
            }
        });
        rows.push(cells);

        let yearList = rows.map((d, i) => {
            return (<tr>{d}</tr>);
        })

        return (
            <table className='calender-main-year'>
                <thead>
                    <tr>
                        <th colSpan="4">Select a year</th>
                    </tr>
                </thead>
                <tbody>
                    {yearList}
                </tbody>
            </table>
        );


    }
    return (
        <div className='calender'>
            <div className='calender-label'>
                <span onClick={(e) => {
                    setShowMonth(true);
                    setShowYear(false);
                }} 
                className="month-label">{month}</span>
                <span onClick={(e) => {
                    setShowYear(true);
                    setShowMonth(false);
                }}
                className="year-label">{year}</span>
            </div>
            {showYear && <YearTable data={year} />}
            {showMonth && <MonthList data={allMonths} />}
            {!showMonth && !showYear && <div className='calender-main'>

                <table className='calender-main-date'>
                    <thead>
                        <tr>
                            {weekdaysshort}
                        </tr>
                    </thead>
                    <tbody>
                        {days()}
                    </tbody>
                </table>
            </div>}
        </div>
    )
}

export default Calender;