import React, { useEffect, useState } from 'react';
import axios from 'axios';
import WeatherIcon from './WeatherIcon.jsx';

export default function WeatherCard() {
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchWeather = async (lat, lon) => {
    setLoading(true);
    setError(null);
    try {
      const weatherResponse = await axios.get('https://api.openweathermap.org/data/2.5/weather', {
        params: {
          lat,
          lon,
          appid: '99fdd4cb00e534bbbba703cfd9cfa34d',
          units: 'metric'
        }
      });
      setWeather(weatherResponse.data);

      const forecastResponse = await axios.get('https://api.openweathermap.org/data/2.5/forecast', {
        params: {
          lat,
          lon,
          appid: '99fdd4cb00e534bbbba703cfd9cfa34d',
          units: 'metric'
        }
      });
      setForecast(forecastResponse.data);
    } catch (err) {
      console.error('Error fetching weather data:', err.response ? err.response.data : err.message);
      setError(err.response ? JSON.stringify(err.response.data) : err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          fetchWeather(latitude, longitude);
        },
        (err) => {
          console.error('Error getting location:', err.message);
          setError('Error getting location');
          setLoading(false);
        }
      );
    } else {
      setError('Geolocation is not supported by this browser.');
      setLoading(false);
    }
  }, []);

  if (loading) return <div className="text-black font-extrabold">Loading...</div>;
  if (error) return <div className="text-white">Error: {error}</div>;

  return (
    <div className="relative bg-black text-white p-4 rounded-lg shadow-lg w-full flex flex-col md:flex-row" style={{ marginRight: '10px' }}>
      <div className="w-full p-2 bg-green-700 md:bg-black rounded-lg">
        <h1 className="text-2xl mb-2 md:text-white">Weather in {weather.name}</h1>
        <div className="flex justify-center mb-4">
          <WeatherIcon weather={weather.weather[0]} size="text-[3rem] md:text-[6rem]" />
        </div>
        <p className="text-2xl md:text-3xl">{weather.main.temp}°C</p>
        <p className="text-lg md:text-xl">Humidity: {weather.main.humidity}%</p>
        <p className="text-lg md:text-xl">Wind Speed: {weather.wind.speed} m/s</p>
      </div>
      <div className="w-full p-2 bg-green-700 rounded-lg hidden md:block">
        <h2 className="text-xl mb-4 text-white">Upcoming Weather</h2>
        <div className="space-y-2">
          {forecast.list.slice(0, 3).map((item, index) => (
            <div key={index} className="bg-green-500 p-2 rounded-lg shadow-md flex items-center justify-between">
              <div className="flex items-center">
                <WeatherIcon weather={item.weather[0]} size="text-2xl" />
                <p className="ml-2 text-white">{new Date(item.dt * 1000).toLocaleString()}</p>
              </div>
              <p className="text-lg text-white">{item.main.temp}°C</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}