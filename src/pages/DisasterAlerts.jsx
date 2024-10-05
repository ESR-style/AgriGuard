import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';

const DisasterAlerts = () => {
  const [floodRisk, setFloodRisk] = useState(0);
  const [floodWarning, setFloodWarning] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFloodData = async (latitude, longitude) => {
      try {
        const url = `https://flood-api.open-meteo.com/v1/flood?latitude=${latitude}&longitude=${longitude}&daily=river_discharge`;
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }
        const data = await response.json();
        if (!data.daily || !data.daily.river_discharge) {
          throw new Error('Invalid data format');
        }
        const dischargeData = data.daily.river_discharge;
        const threshold = 20; // Example threshold for flood risk in m³/s
        const latestDischarge = dischargeData[dischargeData.length - 1];

        let riskPercentage = (latestDischarge / threshold) * 100;
        let warning = latestDischarge >= threshold;

        setFloodRisk(riskPercentage);
        setFloodWarning(warning);
        setError(null);
      } catch (err) {
        setError(err.message);
        setFloodRisk(0);
        setFloodWarning(false);
      }
    };

    const getLocationAndFetchData = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            fetchFloodData(latitude, longitude);
          },
          (err) => {
            setError('Geolocation error: ' + err.message);
          }
        );
      } else {
        setError('Geolocation is not supported by this browser.');
      }
    };

    getLocationAndFetchData();
  }, []);

  return (
    <div className={`min-h-screen pt-20 ${floodWarning ? 'bg-red-600' : 'bg-gray-100'} text-gray-700 font-sans flex flex-col`}>
      <Navbar />
      <div className="flex-grow p-5 w-full">
        <h1 className="text-center text-3xl mb-5">{floodWarning ? 'Flood Alert!' : 'Flood Risk Dashboard'}</h1>
        {error && <p className="error-message text-red-500 text-center mb-5">{error}</p>}
        <div className="flex flex-col items-center">
          <div className="w-full h-auto bg-black p-10 rounded-lg shadow-lg flex flex-col items-center justify-center">
            <h2 className="text-white text-2xl mb-4">Flood Risk (Current)</h2>
            <p className="text-white text-4xl mb-4">{floodRisk.toFixed(2)}%</p>
            <div className="w-full bg-gray-300 rounded-full h-6 mb-4 overflow-hidden">
              <div
                className={`h-full rounded-full ${floodWarning ? 'bg-red-600' : 'bg-blue-600'}`}
                style={{
                  width: `${floodRisk}%`,
                  transition: 'width 1s ease-in-out'
                }}
              ></div>
            </div>
            {floodWarning && <p className="text-white text-xl mb-4">Warning: High Flood Risk!</p>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DisasterAlerts;