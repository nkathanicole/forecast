import React, { useState } from 'react';
import axios from 'axios';

const Weather = () => {
    const [city, setCity] = useState('');
    const [weatherData, setWeatherData] = useState(null);
    const [error, setError] = useState(null);
    const apiKey = "77fbc8aa4b1792e9142b52bebcc4928e";
    const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

    const checkWeather = async () => {
        try {
            const response = await axios.get(`${apiUrl}${city}&appid=${apiKey}`);
            setWeatherData(response.data);
            setError(null);
        } catch (error) {
            setError("City not found!");
            setWeatherData(null);
        }
    };

    const setWeatherIcon = (weatherCondition) => {
        switch (weatherCondition) {
            case "Clouds":
                return "images/clouds.png";
            case "Clear":
                return "images/clear.png";
            case "Rain":
                return "images/rain.png";
            case "Drizzle":
                return "images/drizzle.png";
            case "Mist":
                return "images/mist.png";
            case "Snow":
                return "images/snow.png";
            case "Sunny":
                return "images/sunny.png";
            default:
                return "images/unknown.png";
        }
    };

    return (
        <div className="container">
            <h1>Weather App</h1>
            <div className="search">
                <input
                    type="text"
                    placeholder="Enter city name"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                />
                <button onClick={checkWeather}>Search</button>
            </div>
            {error && <div className="error">{error}</div>}
            {weatherData && (
                <div className="weather">
                    <h2 className="city">{weatherData.name}</h2>
                    <p className="temp">{Math.round(weatherData.main.temp)}°C</p>
                    <img className="weather-icon" src={setWeatherIcon(weatherData.weather[0].main)} alt="Weather Icon" />
                </div>
            )}
        </div>
    );
};

export default Weather;