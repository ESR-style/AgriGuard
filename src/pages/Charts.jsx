import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import Navbar from '../components/Navbar'; // Import Navbar
import WeatherCard from '../components/WeatherCard'; // Import WeatherCard

const App = () => {
  const [chartData, setChartData] = useState([]);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [error, setError] = useState(null);

  const formatDate = (date) => {
    return date.replace(/-/g, '');
  };

  const fetchPrecipitationData = async (start, end) => {
    try {
      const formattedStart = formatDate(start);
      const formattedEnd = formatDate(end);
      const url = `https://power.larc.nasa.gov/api/temporal/daily/point?start=${formattedStart}&end=${formattedEnd}&latitude=12.9326&longitude=77.6259&community=RE&parameters=PRECTOTCORR&format=JSON`;
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

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchPrecipitationData(startDate, endDate);
  };

  const formatXAxis = (tickItem) => {
    return `${tickItem.slice(0, 4)}-${tickItem.slice(4, 6)}-${tickItem.slice(6, 8)}`;
  };

  return (
    <div className="min-h-screen pt-20 bg-white text-gray-700 font-sans flex flex-col">
      <Navbar />
      <div className="flex-grow p-5 w-full">
        <h1 className="text-center text-green-600 text-3xl mb-5">Precipitation Data</h1>
        <form onSubmit={handleSubmit} className="date-form flex justify-center gap-2 mb-5">
          <label className="flex flex-col text-gray-700">
            Start Date:
            <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} required className="p-2 mt-1 border border-gray-300 bg-white text-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent" />
          </label>
          <label className="flex flex-col text-gray-700">
            End Date:
            <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} required className="p-2 mt-1 border border-gray-300 bg-white text-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent" />
          </label>
          <button type="submit" className="p-5 border-none bg-green-600 text-white text-sm cursor-pointer hover:bg-green-700 rounded-md shadow-md transition-all duration-300">Submit</button>
        </form>
        {error && <p className="error-message text-red-500 text-center mb-5">{error}</p>}
        <div className="w-full h-96 bg-white p-5 rounded-lg shadow-lg">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData} className="line-chart">
              <CartesianGrid strokeDasharray="3 3" stroke="#ccc" />
              <XAxis dataKey="date" tickFormatter={formatXAxis} stroke="#333" />
              <YAxis stroke="#333" />
              <Tooltip contentStyle={{ backgroundColor: '#f9f9f9', border: '1px solid #ccc' }} itemStyle={{ color: '#333' }} />
              <Legend />
              <Line type="monotone" dataKey="precipitation" stroke="#00ff00" activeDot={{ r: 8 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default App;