import React, { useState } from 'react';
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

  const fetchMoistureData = async (start, end) => {
    try {
      const url = `https://power.larc.nasa.gov/api/temporal/monthly/point?start=${start}&end=${end}&latitude=13.0016&longitude=77.4598&community=AG&parameters=GWETROOT,GWETPROF&format=JSON`;
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
    <div className="min-h-screen pt-20 bg-white text-gray-700 font-sans flex flex-col">
      <Navbar />
      <div className="flex-grow p-5 w-full">
        <h1 className="text-center text-green-600 text-3xl mb-5">Data Dashboard</h1>
        <h2 className="text-center text-green-600 text-2xl mb-5">Precipitation Data</h2>
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
        <div className="grid grid-cols-2 gap-5">
          <div className="w-full h-96 bg-black p-5 rounded-lg shadow-lg">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData} className="line-chart">
                <CartesianGrid strokeDasharray="3 3" stroke="#ccc" />
                <XAxis dataKey="date" tickFormatter={formatXAxis} stroke="#fff" />
                <YAxis stroke="#fff" />
                <Tooltip contentStyle={{ backgroundColor: '#333', border: '1px solid #ccc' }} itemStyle={{ color: '#fff' }} />
                <Legend />
                <Line type="monotone" dataKey="precipitation" stroke="#00ff00" activeDot={{ r: 8 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <div className="w-full h-96 bg-black p-5 rounded-lg shadow-lg">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData} className="bar-chart">
                <CartesianGrid strokeDasharray="3 3" stroke="#ccc" />
                <XAxis dataKey="date" tickFormatter={formatXAxis} stroke="#fff" />
                <YAxis stroke="#fff" />
                <Tooltip contentStyle={{ backgroundColor: '#333', border: '1px solid #ccc' }} itemStyle={{ color: '#fff' }} />
                <Legend />
                <Bar dataKey="precipitation" fill="#00C49F" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
        <h2 className="text-center text-green-600 text-2xl mb-5">Soil Moisture Data</h2>
        <form onSubmit={handleYearSubmit} className="year-form flex justify-center gap-2 mb-5">
          <label className="flex flex-col text-gray-700">
            Start Year:
            <input type="number" value={startYear} onChange={(e) => setStartYear(e.target.value)} required className="p-2 mt-1 border border-gray-300 bg-white text-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent" />
          </label>
          <label className="flex flex-col text-gray-700">
            End Year:
            <input type="number" value={endYear} onChange={(e) => setEndYear(e.target.value)} required className="p-2 mt-1 border border-gray-300 bg-white text-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent" />
          </label>
          <button type="submit" className="p-5 border-none bg-green-600 text-white text-sm cursor-pointer hover:bg-green-700 rounded-md shadow-md transition-all duration-300">Submit</button>
        </form>
        {error && <p className="error-message text-red-500 text-center mb-5">{error}</p>}
        <div className="grid grid-cols-2 gap-5">
          <div className="w-full h-96 bg-black p-5 rounded-lg shadow-lg">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={moistureData} className="line-chart">
                <CartesianGrid strokeDasharray="3 3" stroke="#ccc" />
                <XAxis dataKey="date" tickFormatter={formatXAxis} stroke="#fff" />
                <YAxis stroke="#fff" />
                <Tooltip contentStyle={{ backgroundColor: '#333', border: '1px solid #ccc' }} itemStyle={{ color: '#fff' }} />
                <Legend />
                <Line type="monotone" dataKey="GWETROOT" name="Root Zone Moisture" stroke="#00ff00" activeDot={{ r: 8 }} />
                <Line type="monotone" dataKey="GWETPROF" name="Profile Moisture" stroke="#ff7300" />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <div className="w-full h-96 bg-black p-5 rounded-lg shadow-lg">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={moistureData} className="bar-chart">
                <CartesianGrid strokeDasharray="3 3" stroke="#ccc" />
                <XAxis dataKey="date" tickFormatter={formatXAxis} stroke="#fff" />
                <YAxis stroke="#fff" />
                <Tooltip contentStyle={{ backgroundColor: '#333', border: '1px solid #ccc' }} itemStyle={{ color: '#fff' }} />
                <Legend />
                <Bar dataKey="GWETROOT" name="Root Zone Moisture" fill="#00C49F" />
                <Bar dataKey="GWETPROF" name="Profile Moisture" fill="#413ea0" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;