import React, { useState } from 'react'
import './calendar.css'

const Calender = () => {
    const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
    const month0fYear = [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'November',
        'December'
    ]
    const currentDate = new Date()

    const [currentMonth, setCurrrentMonth] = useState(currentDate.getMonth());
    const [currentYear, setCurrentYear] = useState(currentDate.getFullYear());

    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
    const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();

    const prevMonth = () => {
        setCurrrentMonth((prevMonth) => (prevMonth === 0 ? 11 : prevMonth - 1))
        setCurrentYear((prevYear) => (currentMonth === 11 ? prevYear + 1 : prevYear))
    }

    const nextMonth = () => {
        setCurrrentMonth((prevMonth) => (prevMonth === 11 ? 0 : prevMonth + 1))
        setCurrentYear((prevYear) => (currentMonth === 11 ? prevYear + 1 : prevYear))
    }

    return (
        <div className='calender'>
            <div className="date">
                <h2 className="month">{month0fYear[currentMonth]},</h2>
                <h2 className="year">{currentYear}</h2>
                <div className="btns">
                    <i class="fa-solid fa-arrow-right" onClick={nextMonth}></i>
                    <i class="fa-solid fa-arrow-left" onClick={prevMonth}></i>
                </div>
            </div>
            <div className="weekdays">
                {daysOfWeek.map((day) => (
                    <span key={day}>{day}</span>
                ))}

            </div>
            <div className="days">
                {[...Array(firstDayOfMonth).keys()].map((_, index) => (
                    <span key={`empty-${index}`}></span>
                ))}
                {[...Array(daysInMonth).keys()].map((day) => (
                    <span className={day + 1 === currentDate.getDate() && currentMonth === currentDate.getMonth() && currentYear === currentDate.getFullYear() ? 'current-day' : ''} key={day + 1}>{day + 1}</span>
                ))}
            </div>
        </div >
    )
}

export default Calender
