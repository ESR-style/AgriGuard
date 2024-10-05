import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import { FaWater, FaSeedling, FaCloudRain } from 'react-icons/fa';

const CropSuggestion = () => {
  const [data, setData] = useState(null);
  const [cropSuggestions, setCropSuggestions] = useState([]);
  const [error, setError] = useState(null);
  const [avgGWETROOT, setAvgGWETROOT] = useState(null);
  const [avgGWETPROF, setAvgGWETPROF] = useState(null);
  const [avgPRECTOTCORR, setAvgPRECTOTCORR] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const url = 'https://power.larc.nasa.gov/api/temporal/monthly/point?start=2020&end=2022&latitude=13.0016&longitude=77.4598&community=AG&parameters=GWETROOT,GWETPROF,PRECTOTCORR&format=JSON';
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }
        const data = await response.json();
        if (!data.properties || !data.properties.parameter) {
          throw new Error('Invalid data format');
        }
        setData(data.properties.parameter);
        setError(null);

        // Process data and determine crop suggestions
        const { GWETROOT, GWETPROF, PRECTOTCORR } = data.properties.parameter;
        const avgGWETROOT = Object.values(GWETROOT).reduce((sum, value) => sum + value, 0) / Object.values(GWETROOT).length;
        const avgGWETPROF = Object.values(GWETPROF).reduce((sum, value) => sum + value, 0) / Object.values(GWETPROF).length;
        const avgPRECTOTCORR = Object.values(PRECTOTCORR).reduce((sum, value) => sum + value, 0) / Object.values(PRECTOTCORR).length;

        setAvgGWETROOT(avgGWETROOT);
        setAvgGWETPROF(avgGWETPROF);
        setAvgPRECTOTCORR(avgPRECTOTCORR);

        let suggestions = new Set();
        if (avgGWETROOT > 0.5 && avgPRECTOTCORR > 100) {
          suggestions.add('Rice').add('Sugarcane').add('Banana').add('Turmeric').add('Arecanut');
        }
        if (avgGWETPROF > 0.3 && avgPRECTOTCORR < 100) {
          suggestions.add('Ragi').add('Maize').add('Groundnut').add('Sunflower').add('Cotton');
        }
        if (avgGWETROOT < 0.3 && avgPRECTOTCORR < 50) {
          suggestions.add('Millet').add('Sorghum').add('Chickpeas').add('Pigeon Pea').add('Cowpea');
        }
        if (avgGWETROOT > 0.4 && avgPRECTOTCORR > 80) {
          suggestions.add('Maize').add('Soybean').add('Cotton').add('Groundnut').add('Sunflower');
        }
        if (avgGWETPROF < 0.2 && avgPRECTOTCORR < 30) {
          suggestions.add('Peanuts').add('Pigeon Pea').add('Cowpea').add('Sesame').add('Castor');
        }
        if (avgGWETROOT > 0.6 && avgPRECTOTCORR > 120) {
          suggestions.add('Paddy').add('Sugarcane').add('Banana').add('Turmeric').add('Arecanut');
        }
        if (avgGWETPROF > 0.4 && avgPRECTOTCORR < 90) {
          suggestions.add('Ragi').add('Maize').add('Groundnut').add('Sunflower').add('Cotton');
        }
        if (avgGWETROOT < 0.2 && avgPRECTOTCORR < 40) {
          suggestions.add('Millet').add('Sorghum').add('Chickpeas').add('Pigeon Pea').add('Cowpea').add('Sesame');
        }

        setCropSuggestions(Array.from(suggestions));
      } catch (err) {
        setError(err.message);
        setData(null);
        setCropSuggestions([]);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="min-h-screen pt-20 bg-white text-gray-700 font-sans flex flex-col">
      <Navbar />
      <div className="flex-grow p-5 w-full">
        <h1 className="text-center text-green-600 text-4xl mb-5">Crop Suggestion Dashboard</h1>
        {error && <p className="error-message text-red-500 text-center mb-5">{error}</p>}
        <div className="flex flex-col items-center">
          <div className="w-full h-auto bg-black p-10 rounded-lg shadow-lg flex flex-col items-center justify-center">
            <h2 className="text-white text-3xl mb-4">Average Data (2020-2022)</h2>
            {data ? (
              <>
                <div className="flex items-center mb-4">
                  <FaWater className="text-white text-2xl mr-2" />
                  <p className="text-white text-2xl">Average Root Zone Soil Moisture: {avgGWETROOT.toFixed(2)}</p>
                </div>
                <div className="flex items-center mb-4">
                  <FaSeedling className="text-white text-2xl mr-2" />
                  <p className="text-white text-2xl">Average Profile Soil Moisture: {avgGWETPROF.toFixed(2)}</p>
                </div>
                <div className="flex items-center mb-4">
                  <FaCloudRain className="text-white text-2xl mr-2" />
                  <p className="text-white text-2xl">Average Precipitation: {avgPRECTOTCORR.toFixed(2)} mm</p>
                </div>
                <h3 className="text-white text-3xl mb-4">Suggested Crops</h3>
                <ul className="text-white text-2xl">
                  {cropSuggestions.map((crop, index) => (
                    <li key={index}>{crop}</li>
                  ))}
                </ul>
              </>
            ) : (
              <p className="text-white text-2xl">Loading...</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CropSuggestion;