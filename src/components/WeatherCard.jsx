// WeatherCard.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import WeatherIcon from './WeatherIcon';
import { FaTemperatureHigh, FaWind, FaTint } from 'react-icons/fa';

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

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-green-400"></div>
      </div>
    );
  }

  if (error) {
    return (
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="bg-red-500/10 backdrop-blur-lg rounded-xl p-6 text-white border border-red-500/20"
      >
        <p className="text-center">Error: {error}</p>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full max-w-6xl mx-auto px-2 sm:px-4" // Reduced padding on mobile
    >
      <motion.div 
        whileHover={{ scale: 1.01 }}
        className="backdrop-blur-md bg-black/40 rounded-xl sm:rounded-2xl p-4 sm:p-8 border border-white/10 shadow-lg"
      >
        {/* Main Weather Display */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 sm:gap-8 mb-6 sm:mb-8">
          <div className="text-center md:text-left">
            <h2 className="text-2xl sm:text-4xl font-bold text-white mb-2 sm:mb-3">
              {weather.name}
            </h2>
            <p className="text-4xl sm:text-6xl font-bold bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent">
              {Math.round(weather.main.temp)}°C
            </p>
            <p className="text-base sm:text-lg text-white/80 mt-2 sm:mt-3 capitalize">
              {weather.weather[0].description}
            </p>
          </div>
          
          <motion.div
            animate={{ rotate: [0, 5, -5, 0] }}
            transition={{ duration: 6, repeat: Infinity }}
            className="w-24 h-24 sm:w-32 sm:h-32 flex items-center justify-center"
          >
            <WeatherIcon 
              weather={weather.weather[0]} 
              size="text-6xl sm:text-8xl text-white" // Added text-white
            />
          </motion.div>
        </div>
  
        {/* Weather Metrics */}
        <div className="grid grid-cols-3 gap-2 sm:gap-4 mb-6 sm:mb-8">
          {[
            { icon: <FaTemperatureHigh className="text-white" />, label: "Feels Like", value: `${Math.round(weather.main.feels_like)}°C` },
            { icon: <FaTint className="text-white" />, label: "Humidity", value: `${weather.main.humidity}%` },
            { icon: <FaWind className="text-white" />, label: "Wind", value: `${weather.wind.speed} m/s` }
          ].map((item, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.05 }}
              className="bg-white/5 rounded-lg sm:rounded-xl p-3 sm:p-4 text-center border border-white/10"
            >
              <div className="text-xl sm:text-2xl text-green-400 mb-1 sm:mb-2">{item.icon}</div>
              <p className="text-xs sm:text-sm text-white/60 mb-1">{item.label}</p>
              <p className="text-sm sm:text-lg font-semibold text-white">{item.value}</p>
            </motion.div>
          ))}
        </div>
  
        {/* Divider */}
        <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent my-6 sm:my-8" />
  
        {/* Forecast Section */}
        <div>
          <h3 className="text-lg sm:text-xl font-bold text-white mb-4 sm:mb-6">
            Upcoming Weather
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
            {forecast.list.slice(0, 6).map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white/5 rounded-lg sm:rounded-xl p-3 sm:p-4 border border-white/10 hover:bg-white/10 transition-colors"
              >
                <div className="flex items-center justify-between gap-2 sm:gap-4">
                  <div className="flex items-center gap-2 sm:gap-4">
                    <WeatherIcon 
                      weather={item.weather[0]} 
                      size="text-2xl sm:text-3xl text-white" // Added text-white
                    />
                    <div>
                      <p className="text-xs sm:text-sm text-white font-medium">
                        {Math.round(item.main.temp)}°C
                      </p>
                      <p className="text-[10px] sm:text-xs text-white/60">
                        {new Date(item.dt * 1000).toLocaleTimeString([], { 
                          hour: '2-digit', 
                          minute: '2-digit',
                          hour12: true 
                        })}
                      </p>
                    </div>
                  </div>
                  <p className="text-[10px] sm:text-xs text-white/60 capitalize">
                    {item.weather[0].description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}