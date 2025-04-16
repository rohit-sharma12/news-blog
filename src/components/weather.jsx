import React, { useEffect, useState } from 'react'
import './weather.css'
import axios from 'axios';

const Weather = () => {
    const [data, setData] = useState({});
    const [location, setLocation] = useState("");

    useEffect(() => {
        const fetchDefaultLocation = async () => {
            const defaultLocation = "Delhi"
            const url = `https://api.openweathermap.org/data/2.5/weather?q=${defaultLocation}&appid=509330fed87f1efb81916bb3b0737811`

            const response = await axios.get(url)
            setData(response.data)
        }
        fetchDefaultLocation()
    }, [])

    const search = async () => {
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=509330fed87f1efb81916bb3b0737811`
        try {
            const response = await axios.get(url)
            if (response.data.cod !== 200) {
                setData({ notFound: true })
            } else {
                setData(response.data)
                setLocation("")
            }
        } catch (error) {
            if (error.response && error.response.status == 404) {
                setData({ notFound: true })
            } else {
                console.error("An Unexpected error occurred, error")
            }
        }

        setData(response.data)
        setLocation('')
    }

    const handleInputChange = (e) => {
        setLocation(e.target.value)
    }

    const getWheatherIcon = (weatherType) => {
        switch (weatherType) {
            case "Clear":
                return <i class="fa-solid fa-cloud-sun"></i>
            case "Cloud":
                return <i class="fa-solid fa-cloud"></i>
            case "Rain":
                return <i class="fa-solid fa-cloud-rain"></i>
            case "Thunder":
                return <i class="fa-solid fa-bolt"></i>
            case "Snow":
                return <i class="fa-solid fa-snowman"></i>
            case "Haze":
                return <i class="fa-solid fa-smog"></i>
            default:
                return <i class="fa-solid fa-cloud"></i>
        }
    }

    const handleKey = (e) => {
        if (e.key === 'Enter') {
            search()
        }
    }
    return (
        <div className='weather'>
            <div className="search">
                <div className="search-top">
                    <i className="fa-solid fa-location-dot"></i>
                    <div className="location">{data.name}</div>
                </div>
                <div className="search-location">
                    <input type="text" placeholder='Enter Location' value={location} onChange={handleInputChange} onKeyDown={handleKey} />
                    <i className='fa-solid fa-magnifying-glass' onClick={search}></i>
                </div>
            </div>
            {data.notFound ? (<div className='not-found'>Not Found 😱</div>) : (
                <div className="weather-data">
                    {data.weather && data.weather[0] && getWheatherIcon(data.weather[0].main)}
                    <div className="weather-type">{data.weather ? data.weather[0].main : null}</div>
                    <div className="temp">  {data.main ? `${Math.floor(data.main.temp - 273.15).toFixed(1)}°C` : null}</div>
                </div>
            )}

        </div>
    )
}

export default Weather
