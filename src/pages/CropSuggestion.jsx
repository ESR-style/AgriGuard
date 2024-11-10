import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Navbar from '../components/Navbar';
import { FaSeedling, FaThermometerHalf, FaWater, FaCloudRain } from 'react-icons/fa';
import { FaSearch, FaMapMarkerAlt } from 'react-icons/fa';
const CropSuggestion = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [weatherData, setWeatherData] = useState(null);
  const [recommendations, setRecommendations] = useState([]);
  const [searchLocation, setSearchLocation] = useState('');
  const [currentLocation, setCurrentLocation] = useState(null);

  const searchByLocation = async (query) => {
    try {
      setLoading(true);
      const response = await fetch(
        `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(query)}&count=1`
      );
      if (!response.ok) throw new Error('Location search failed');
      
      const data = await response.json();
      if (!data.results?.[0]) {
        throw new Error('Location not found');
      }

      const { latitude, longitude, name, country } = data.results[0];
      setCurrentLocation({ latitude, longitude, name, country });
      fetchWeatherData(latitude, longitude);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  const cropDatabase = {
    rice: { 
      minTemp: 20, 
      maxTemp: 35, 
      minRain: 1200, 
      maxRain: 2400,
      description: "Staple grain crop, needs consistent water",
      season: "Kharif",
      tips: "Plant in standing water, maintain water level"
    },
    wheat: { 
      minTemp: 15, 
      maxTemp: 25, 
      minRain: 480, 
      maxRain: 1200,
      description: "Winter cereal crop, moderate water needs",
      season: "Rabi",
      tips: "Sow seeds 2-3 cm deep, needs well-drained soil"
    },
    cotton: { 
      minTemp: 20, 
      maxTemp: 30, 
      minRain: 500, 
      maxRain: 1000,
      description: "Fiber crop, needs warm climate",
      season: "Kharif",
      tips: "Plant in full sun, avoid waterlogging"
    },
    maize: { 
      minTemp: 18, 
      maxTemp: 32, 
      minRain: 500, 
      maxRain: 1000,
      description: "Grain crop, needs well-drained soil",
      season: "Kharif",
      tips: "Plant in blocks for pollination, water regularly"
    },
    sugarcane: { 
      minTemp: 20, 
      maxTemp: 35, 
      minRain: 750, 
      maxRain: 2000,
      description: "Tropical crop, high water needs",
      season: "Kharif",
      tips: "Plant in rows, needs rich soil"
    },
    potato: { 
      minTemp: 10, 
      maxTemp: 25, 
      minRain: 400, 
      maxRain: 800,
      description: "Root crop, grows in cool weather",
      season: "Rabi",
      tips: "Plant in trenches, hill up soil around plants"
    },
    tomato: { 
      minTemp: 15, 
      maxTemp: 30, 
      minRain: 500, 
      maxRain: 1000,
      description: "Warm-season crop, needs full sun",
      season: "Kharif",
      tips: "Stake plants, water at base to avoid leaf diseases"
    },
    chilli: { 
      minTemp: 20, 
      maxTemp: 30, 
      minRain: 500, 
      maxRain: 1000,
      description: "Spice crop, grows in hot climate",
      season: "Kharif",
      tips: "Mulch soil, avoid overwatering"
    },
    onion: { 
      minTemp: 10, 
      maxTemp: 25, 
      minRain: 400, 
      maxRain: 800,
      description: "Bulb crop, grows in cool weather",
      season: "Rabi",
      tips: "Plant in rows, water moderately"
    },
    banana: { 
      minTemp: 20, 
      maxTemp: 35, 
      minRain: 1000, 
      maxRain: 2000,
      description: "Tropical fruit crop, high water needs",
      season: "Kharif",
      tips: "Plant in rich soil, water regularly"
    },
    mango: { 
      minTemp: 20, 
      maxTemp: 35, 
      minRain: 1000, 
      maxRain: 2000,
      description: "Tropical fruit crop, high water needs",
      season: "Kharif",
      tips: "Prune trees, water deeply but infrequently"
    },  
    coconut: { 
      minTemp: 20, 
      maxTemp: 35, 
      minRain: 1500, 
      maxRain: 3000,
      description: "Tropical fruit crop, high water needs",
      season: "Kharif",
      tips: "Plant in sandy soil, water regularly"
    },
    tea: { 
      minTemp: 15, 
      maxTemp: 30, 
      minRain: 1500, 
      maxRain: 3000,
      description: "Beverage crop, needs humid climate",
      season: "Kharif",
      tips: "Plant in shade, water regularly"
    },  
    coffee: { 
      minTemp: 15, 
      maxTemp: 30, 
      minRain: 1500, 
      maxRain: 3000,
      description: "Beverage crop, needs humid climate",
      season: "Kharif",
      tips: "Plant in shade, water regularly"
    },  
    rubber: { 
      minTemp: 20, 
      maxTemp: 35, 
      minRain: 1500, 
      maxRain: 3000,
      description: "Latex crop, high water needs",
      season: "Kharif",
      tips: "Plant in well-drained soil, water regularly"
    },
    jute: { 
      minTemp: 20, 
      maxTemp: 35, 
      minRain: 1500, 
      maxRain: 3000,
      description: "Fiber crop, grows in hot climate",
      season: "Kharif",
      tips: "Plant in rows, water regularly"
    },
    silk: { 
      minTemp: 20, 
      maxTemp: 35, 
      minRain: 1500, 
      maxRain: 3000,
      description: "Fiber crop, high water needs",
      season: "Kharif",
      tips: "Plant in rows, water regularly"
    },
    sunflower: { 
      minTemp: 20, 
      maxTemp: 35, 
      minRain: 500, 
      maxRain: 1000,
      description: "Oilseed crop, grows in hot climate",
      season: "Kharif",
      tips: "Plant in full sun, water regularly"
    },
  };
  const fetchWeatherData = async (latitude, longitude) => {
    if (!latitude || !longitude) {
      setError('Invalid location coordinates');
      setLoading(false);
      return;
    }
  
    try {
      setLoading(true);
      const url = `https://power.larc.nasa.gov/api/temporal/monthly/point?start=2020&end=2022&latitude=${latitude}&longitude=${longitude}&community=AG&parameters=GWETROOT,GWETPROF,PRECTOTCORR&format=JSON`;
      
      const response = await fetch(url);
      if (!response.ok) throw new Error('Weather data fetch failed');
      
      const data = await response.json();
      
      if (!data.properties?.parameter) {
        throw new Error('Invalid API response structure');
      }
  
      // Calculate yearly averages from monthly data
      const yearlyData = {
        2020: { rain: 0, moisture: [] },
        2021: { rain: 0, moisture: [] },
        2022: { rain: 0, moisture: [] }
      };
  
      // Process monthly precipitation
      Object.entries(data.properties.parameter.PRECTOTCORR || {}).forEach(([date, rain]) => {
        const year = date.substring(0, 4);
        if (yearlyData[year] && rain >= 0) {
          yearlyData[year].rain += rain;
        }
      });
  
      // Process monthly soil moisture
      Object.entries(data.properties.parameter.GWETROOT || {}).forEach(([date, moisture]) => {
        const year = date.substring(0, 4);
        if (yearlyData[year] && moisture >= 0 && moisture <= 1) {
          yearlyData[year].moisture.push(moisture);
        }
      });
  
      // Calculate multi-year averages
      const totalRain = Object.values(yearlyData).reduce((sum, year) => {
        return sum + year.rain;
      }, 0) / Object.keys(yearlyData).length;
  
      const avgMoisture = Object.values(yearlyData).reduce((sum, year) => {
        const yearAvg = year.moisture.length > 0 
          ? year.moisture.reduce((a, b) => a + b, 0) / year.moisture.length 
          : 0;
        return sum + yearAvg;
      }, 0) / Object.keys(yearlyData).length;
  
      // Use NASA POWER average temperature for the location
      const avgTemp = 25; // Default temperature, adjust based on location
  
      const processedData = {
        avgTemp: avgTemp,
        totalRain: isNaN(totalRain) ? 100 : totalRain,
        soilMoisture: isNaN(avgMoisture) ? 0.5 : avgMoisture
      };
  
      console.log('Processed Weather Data:', processedData); // For debugging
  
      setWeatherData(processedData);
      generateRecommendations(processedData);
      setError(null);
    } catch (err) {
      console.error('Weather data error:', err);
      setError('Unable to fetch historical weather data');
      // Fallback data based on typical values
      const fallbackData = {
        avgTemp: 25,
        totalRain: 100,
        soilMoisture: 0.5
      };
      setWeatherData(fallbackData);
      generateRecommendations(fallbackData);
    } finally {
      setLoading(false);
    }
  };


  const generateRecommendations = (data) => {
  if (!data) return setRecommendations([]);

  try {
    const suitable = Object.entries(cropDatabase).filter(([crop, requirements]) => {
      // Scale totalRain to yearly value since we're getting monthly averages
      const yearlyRainfall = data.totalRain * 12;
      
      return data.avgTemp >= requirements.minTemp && 
             data.avgTemp <= requirements.maxTemp &&
             yearlyRainfall >= requirements.minRain &&
             yearlyRainfall <= requirements.maxRain &&
             data.soilMoisture >= 0.2; // Add minimum soil moisture requirement
    });
    setRecommendations(suitable);
  } catch (err) {
    console.error('Error generating recommendations:', err);
    setRecommendations([]);
  }
};

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          fetchWeatherData(position.coords.latitude, position.coords.longitude);
        },
        (err) => {
          setError('Location access denied');
          setLoading(false);
        }
      );
    } else {
      setError('Geolocation not supported');
      setLoading(false);
    }
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen pt-20 bg-gradient-to-br from-black via-gray-900 to-black"
    >
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-green-400 via-emerald-500 to-teal-500 bg-clip-text text-transparent">
            Smart Crop Recommendations
          </h1>
          <p className="text-xl text-white/60">
            Based on your local climate conditions
          </p>
        </motion.div>
  
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="max-w-2xl mx-auto mb-8"
        >
          <div className="backdrop-blur-xl bg-white/5 rounded-2xl p-6 border border-white/10">
            <div className="flex items-center gap-3 mb-4">
              <FaMapMarkerAlt className="text-2xl text-purple-500" />
              <h2 className="text-xl font-semibold text-white">Location Search</h2>
            </div>
            
            <form onSubmit={(e) => {
              e.preventDefault();
              if (searchLocation.trim()) {
                searchByLocation(searchLocation);
              }
            }} className="flex gap-3">
              <input
                type="text"
                value={searchLocation}
                onChange={(e) => setSearchLocation(e.target.value)}
                placeholder="Enter city name or coordinates"
                className="flex-1 bg-black/50 border border-white/10 text-white rounded-lg px-4 py-2 
                focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
              />
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                className="bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-lg px-6 py-2"
              >
                <FaSearch />
              </motion.button>
            </form>

            {currentLocation && (
              <div className="mt-4 text-white/60">
                Currently showing data for: 
                <span className="text-white ml-2">
                  {currentLocation.name}, {currentLocation.country}
                </span>
              </div>
            )}
          </div>
        </motion.div>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              className="w-16 h-16 border-4 border-green-500 border-t-transparent rounded-full"
            />
          </div>
        ) : error ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="max-w-2xl mx-auto bg-red-500/20 border border-red-500/30 rounded-lg p-4 text-red-400 text-center"
          >
            {error}
          </motion.div>
        ) : (
          <>
            {/* Weather Overview */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8"
            >
              <div className="backdrop-blur-xl bg-white/5 rounded-2xl p-6 border border-white/10">
                <div className="flex items-center gap-3 mb-4">
                  <FaThermometerHalf className="text-2xl text-orange-500" />
                  <h3 className="text-lg font-semibold text-white">Temperature</h3>
                </div>
                <p className="text-3xl font-bold text-white">
                  {weatherData?.avgTemp.toFixed(1)}°C
                </p>
                <p className="text-white/60">average temperature</p>
              </div>
  
              <div className="backdrop-blur-xl bg-white/5 rounded-2xl p-6 border border-white/10">
                <div className="flex items-center gap-3 mb-4">
                  <FaCloudRain className="text-2xl text-blue-500" />
                  <h3 className="text-lg font-semibold text-white">Rainfall</h3>
                </div>
                <p className="text-3xl font-bold text-white">
                  {weatherData?.totalRain.toFixed(1)} mm
                </p>
                <p className="text-white/60">Average</p>
              </div>
  
              <div className="backdrop-blur-xl bg-white/5 rounded-2xl p-6 border border-white/10">
                <div className="flex items-center gap-3 mb-4">
                  <FaWater className="text-2xl text-cyan-500" />
                  <h3 className="text-lg font-semibold text-white">Soil Moisture</h3>
                </div>
                <p className="text-3xl font-bold text-white">
                  {(weatherData?.soilMoisture * 100).toFixed(1)}%
                </p>
                <p className="text-white/60">Average saturation</p>
              </div>
            </motion.div>
  
            {/* Crop Recommendations */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="space-y-6"
            >
              <h2 className="text-2xl font-semibold text-white mb-6">Recommended Crops</h2>
              {recommendations.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {recommendations.map(([cropName, data]) => (
                    <motion.div
                      key={cropName}
                      whileHover={{ scale: 1.02 }}
                      className="backdrop-blur-xl bg-white/5 rounded-2xl p-6 border border-white/10"
                    >
                      <div className="flex items-center gap-3 mb-4">
                        <FaSeedling className="text-2xl text-green-500" />
                        <h3 className="text-xl font-semibold text-white capitalize">{cropName}</h3>
                      </div>
                      <div className="space-y-3">
                        <p className="text-white/80">{data.description}</p>
                        <div className="bg-black/30 rounded-lg p-3">
                          <p className="text-white/60">Season: <span className="text-white">{data.season}</span></p>
                          <p className="text-white/60">Temperature: <span className="text-white">{data.minTemp}°C - {data.maxTemp}°C</span></p>
                          <p className="text-white/60">Rainfall: <span className="text-white">{data.minRain} - {data.maxRain} mm</span></p>
                        </div>
                        <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-3">
                          <p className="text-green-400">{data.tips}</p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <div className="text-center text-white/60 py-8 bg-white/5 rounded-2xl border border-white/10">
                  No suitable crops found for current conditions
                </div>
              )}
            </motion.div>
          </>
        )}
      </div>
    </motion.div>
  );
};

export default CropSuggestion;