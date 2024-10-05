import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';

const Irrigation = () => {
  const [averagePrecipitation, setAveragePrecipitation] = useState(null);
  const [irrigationAdvice, setIrrigationAdvice] = useState('');
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPrecipitationData = async () => {
      try {
        const endDate = new Date();
        const startDate = new Date();
        startDate.setDate(endDate.getDate() - 7);

        const formatDate = (date) => {
          return date.toISOString().split('T')[0].replace(/-/g, '');
        };

        const formattedStart = formatDate(startDate);
        const formattedEnd = formatDate(endDate);
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
        const validData = Object.values(precipitationData).filter(value => value >= 0);
        const average = validData.reduce((sum, value) => sum + value, 0) / validData.length;

        setAveragePrecipitation(average);
        setError(null);

        if (average < 5) {
          setIrrigationAdvice('Increase irrigation');
        } else if (average > 20) {
          setIrrigationAdvice('Reduce irrigation');
        } else {
          setIrrigationAdvice('Maintain current irrigation');
        }
      } catch (err) {
        setError(err.message);
        setAveragePrecipitation(null);
        setIrrigationAdvice('');
      }
    };

    fetchPrecipitationData();
  }, []);

  const getIcon = () => {
    if (irrigationAdvice === 'Increase irrigation') {
      return 'https://example.com/increase-irrigation-icon.png';
    } else if (irrigationAdvice === 'Reduce irrigation') {
      return 'https://example.com/reduce-irrigation-icon.png';
    } else {
      return 'https://example.com/maintain-irrigation-icon.png';
    }
  };

  return (
    <div className="min-h-screen pt-20 bg-gray-100 text-gray-700 font-sans flex flex-col">
      <Navbar />
      <div className="flex-grow p-5 w-full">
        <h1 className="text-center text-green-600 text-3xl mb-5">Irrigation Advisory Dashboard</h1>
        {error && <p className="error-message text-red-500 text-center mb-5">{error}</p>}
        <div className="flex flex-col items-center">
          <div className="w-full h-auto bg-black p-10 rounded-lg shadow-lg flex flex-col items-center justify-center">
            <h2 className="text-white text-2xl mb-4">Average Precipitation (Last Week)</h2>
            <p className="text-white text-4xl mb-4">{averagePrecipitation !== null ? `${averagePrecipitation.toFixed(2)} mm` : 'Loading...'}</p>
            <p className="text-white text-xl mb-4">{irrigationAdvice}</p>
            <img src={getIcon()} alt="Irrigation Icon" className="w-32 h-32 mb-4" />
            <p className="text-white text-lg text-center">Based on the average precipitation data collected from the last week, it is advised to {irrigationAdvice.toLowerCase()}.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Irrigation;