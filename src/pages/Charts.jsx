import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar } from 'recharts';
import Navbar from '../components/Navbar';


const App = () => {
  const [chartData, setChartData] = useState([]);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [startYear, setStartYear] = useState('');
  const [endYear, setEndYear] = useState('');
  const [error, setError] = useState(null);
  const [moistureData, setMoistureData] = useState([]);
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [currentChart, setCurrentChart] = useState('line'); // State to manage current chart view

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLatitude(position.coords.latitude);
        setLongitude(position.coords.longitude);
      },
      (err) => {
        setError('Failed to get current location');
      }
    );
  }, []);

  const formatDate = (date) => {
    return date.replace(/-/g, '');
  };

  const fetchPrecipitationData = async (start, end) => {
    if (latitude === null || longitude === null) {
      setError('Location not available');
      return;
    }

    try {
      const formattedStart = formatDate(start);
      const formattedEnd = formatDate(end);
      const url = `https://power.larc.nasa.gov/api/temporal/daily/point?start=${formattedStart}&end=${formattedEnd}&latitude=${latitude}&longitude=${longitude}&community=RE&parameters=PRECTOTCORR&format=JSON`;
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
      const data = await response.json();
      if (!data.properties || !data.properties.parameter || !data.properties.parameter.PRECTOTCORR) {
        throw new Error('Invalid data format');
      }
      const precipitationData = data.properties.parameter.PRECTOTCORR;
      const formattedData = Object.keys(precipitationData).map(date => ({
        date,
        precipitation: precipitationData[date],
      }));

      setChartData(formattedData);
      setError(null);
    } catch (err) {
      setError(err.message);
      setChartData([]);
    }
  };

  const fetchMoistureData = async (start, end) => {
    if (latitude === null || longitude === null) {
      setError('Location not available');
      return;
    }

    try {
      const url = `https://power.larc.nasa.gov/api/temporal/monthly/point?start=${start}&end=${end}&latitude=${latitude}&longitude=${longitude}&community=AG&parameters=GWETROOT,GWETPROF&format=JSON`;
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
      const data = await response.json();
      if (!data.properties || !data.properties.parameter) {
        throw new Error('Invalid data format');
      }
      const { GWETROOT, GWETPROF } = data.properties.parameter;
      const formattedData = Object.keys(GWETROOT).map(date => ({
        date,
        GWETROOT: GWETROOT[date],
        GWETPROF: GWETPROF[date],
      }));

      setMoistureData(formattedData);
      setError(null);
    } catch (err) {
      setError(err.message);
      setMoistureData([]);
    }
  };

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-black/80 backdrop-blur-sm p-4 rounded-lg border border-white/20 shadow-xl">
          <p className="text-white/80 mb-2">
            {label ? new Date(label.replace(/(\d{4})(\d{2})(\d{2})/, '$1-$2-$3')).toLocaleDateString() : ''}
          </p>
          {payload.map((entry, index) => (
            <p key={index} className="text-sm" style={{ color: entry.color }}>
              {`${entry.name}: ${entry.value.toFixed(2)}`}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchPrecipitationData(startDate, endDate);
  };

  const handleYearSubmit = (e) => {
    e.preventDefault();
    fetchMoistureData(startYear, endYear);
  };

  const formatXAxis = (tickItem) => {
    return `${tickItem.slice(0, 4)}-${tickItem.slice(4, 6)}-${tickItem.slice(6, 8)}`;
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen pt-20 bg-gradient-to-br from-black via-gray-900 to-black"
    >
      <Navbar />
      <div className="container mx-auto px-4 pb-12">
        {/* Header Section */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-green-400 via-blue-500 to-purple-500 bg-clip-text text-transparent">
            Agricultural Analytics
          </h1>
          <p className="text-xl text-white/60">
            Monitor weather and soil conditions for better farming
          </p>
        </motion.div>
  
        {/* Precipitation Section */}
        <motion.section 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="mb-12 backdrop-blur-xl bg-white/5 rounded-2xl p-6 border border-white/10"
        >
          <h2 className="text-2xl font-semibold text-white mb-6">Precipitation Analysis</h2>
          
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="space-y-2">
  <label className="text-white/60">Start Date</label>
  <input
    type="date"
    value={startDate}
    onChange={(e) => setStartDate(e.target.value)}
    className="w-full bg-black/50 border border-white/10 text-white rounded-lg p-3 
    focus:ring-2 focus:ring-green-500 focus:border-green-500
    hover:border-white/30 transition-colors
    [color-scheme:dark]" // This ensures the date picker UI follows dark theme
    required
  />
</div>

<div className="space-y-2">
  <label className="text-white/60">End Date</label>
  <input
    type="date"
    value={endDate}
    onChange={(e) => setEndDate(e.target.value)}
    className="w-full bg-black/50 border border-white/10 text-white rounded-lg p-3 
    focus:ring-2 focus:ring-green-500 focus:border-green-500
    hover:border-white/30 transition-colors
    [color-scheme:dark]"
    required
  />
</div>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              className="bg-gradient-to-r from-green-400 to-blue-500 text-white rounded-lg p-3 h-[46px] mt-auto"
            >
              Analyze Data
            </motion.button>
          </form>
  
          {error && (
            <div className="text-red-400 text-center mb-4">
              {error}
            </div>
          )}
  
  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
  <motion.div 
    className="bg-black/50 backdrop-blur-xl rounded-xl p-4 border border-white/10"
    whileHover={{ scale: 1.01 }}
  >
    <ResponsiveContainer width="100%" height={400}>
      <LineChart data={chartData}>
        <defs>
          <linearGradient id="precipGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#00ff00" stopOpacity={0.8}/>
            <stop offset="95%" stopColor="#00ff00" stopOpacity={0.2}/>
          </linearGradient>
        </defs>
        <CartesianGrid 
          strokeDasharray="3 3" 
          stroke="#333"
          vertical={false}
        />
        <XAxis 
          dataKey="date" 
          tickFormatter={formatXAxis} 
          stroke="#fff"
          tick={{ fill: '#fff', fontSize: 12 }}
          tickLine={{ stroke: '#fff' }}
        />
        <YAxis 
          stroke="#fff"
          tick={{ fill: '#fff', fontSize: 12 }}
          tickLine={{ stroke: '#fff' }}
        />
        <Tooltip content={<CustomTooltip />} />
        <Legend 
          wrapperStyle={{
            padding: '10px',
            borderRadius: '8px',
            backgroundColor: 'rgba(0,0,0,0.6)',
            border: '1px solid rgba(255,255,255,0.1)'
          }}
        />
        <Line 
          type="monotone" 
          dataKey="precipitation" 
          stroke="#00ff00"
          strokeWidth={2}
          dot={false}
          activeDot={{ r: 8, fill: '#00ff00' }}
          fill="url(#precipGradient)"
        />
      </LineChart>
    </ResponsiveContainer>
  </motion.div>

  <motion.div 
    className="bg-black/50 backdrop-blur-xl rounded-xl p-4 border border-white/10"
    whileHover={{ scale: 1.01 }}
  >
    <ResponsiveContainer width="100%" height={400}>
      <BarChart data={chartData}>
        <defs>
          <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#00C49F" stopOpacity={0.8}/>
            <stop offset="95%" stopColor="#00C49F" stopOpacity={0.2}/>
          </linearGradient>
        </defs>
        <CartesianGrid 
          strokeDasharray="3 3" 
          stroke="#333"
          vertical={false}
        />
        <XAxis 
          dataKey="date" 
          tickFormatter={formatXAxis} 
          stroke="#fff"
          tick={{ fill: '#fff', fontSize: 12 }}
          tickLine={{ stroke: '#fff' }}
        />
        <YAxis 
          stroke="#fff"
          tick={{ fill: '#fff', fontSize: 12 }}
          tickLine={{ stroke: '#fff' }}
        />
        <Tooltip content={<CustomTooltip />} />
        <Legend
          wrapperStyle={{
            padding: '10px',
            borderRadius: '8px',
            backgroundColor: 'rgba(0,0,0,0.6)',
            border: '1px solid rgba(255,255,255,0.1)'
          }}
        />
        <Bar 
          dataKey="precipitation" 
          fill="url(#barGradient)"
          radius={[4, 4, 0, 0]}
        />
      </BarChart>
    </ResponsiveContainer>
  </motion.div>
</div>
        </motion.section>
  
        {/* Soil Moisture Section */}
        <motion.section 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="backdrop-blur-xl bg-white/5 rounded-2xl p-6 border border-white/10"
        >
          <h2 className="text-2xl font-semibold text-white mb-6">Soil Moisture Analysis</h2>
          
          <form onSubmit={handleYearSubmit} className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="space-y-2">
              <label className="text-white/60">Start Year</label>
              <input
                type="number"
                value={startYear}
                onChange={(e) => setStartYear(e.target.value)}
                className="w-full bg-black/50 border border-white/10 text-white rounded-lg p-3 focus:ring-2 focus:ring-green-500"
                required
              />
            </div>
            <div className="space-y-2">
              <label className="text-white/60">End Year</label>
              <input
                type="number"
                value={endYear}
                onChange={(e) => setEndYear(e.target.value)}
                className="w-full bg-black/50 border border-white/10 text-white rounded-lg p-3 focus:ring-2 focus:ring-green-500"
                required
              />
            </div>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              className="bg-gradient-to-r from-green-400 to-blue-500 text-white rounded-lg p-3 h-[46px] mt-auto"
            >
              Analyze Data
            </motion.button>
          </form>
  
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <motion.div 
              className="bg-black/50 backdrop-blur-xl rounded-xl p-4 border border-white/10"
              whileHover={{ scale: 1.01 }}
            >
              <ResponsiveContainer width="100%" height={400}>
                <LineChart data={moistureData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                  <XAxis dataKey="date" tickFormatter={formatXAxis} stroke="#fff" />
                  <YAxis stroke="#fff" />
                  <Tooltip contentStyle={{ backgroundColor: '#1a1a1a', border: '1px solid #333' }} />
                  <Legend />
                  <Line type="monotone" dataKey="GWETROOT" name="Root Zone Moisture" stroke="#00ff00" activeDot={{ r: 8 }} />
                  <Line type="monotone" dataKey="GWETPROF" name="Profile Moisture" stroke="#ff7300" />
                </LineChart>
              </ResponsiveContainer>
            </motion.div>
  
            <motion.div 
              className="bg-black/50 backdrop-blur-xl rounded-xl p-4 border border-white/10"
              whileHover={{ scale: 1.01 }}
            >
              <ResponsiveContainer width="100%" height={400}>
                <BarChart data={moistureData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                  <XAxis dataKey="date" tickFormatter={formatXAxis} stroke="#fff" />
                  <YAxis stroke="#fff" />
                  <Tooltip contentStyle={{ backgroundColor: '#1a1a1a', border: '1px solid #333' }} />
                  <Legend />
                  <Bar dataKey="GWETROOT" name="Root Zone Moisture" fill="#00C49F" />
                  <Bar dataKey="GWETPROF" name="Profile Moisture" fill="#413ea0" />
                </BarChart>
              </ResponsiveContainer>
            </motion.div>
          </div>
        </motion.section>
      </div>
    </motion.div>
  );
}

export default App;