import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Navbar from '../components/Navbar';
import { FaExclamationTriangle, FaCheckCircle, FaWater, FaLocationArrow } from 'react-icons/fa';

const DisasterAlerts = () => {
  const [floodRisk, setFloodRisk] = useState(0);
  const [floodWarning, setFloodWarning] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const fetchFloodData = async (latitude, longitude) => {
    try {
      setLoading(true);
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
    } finally {
      setLoading(false);
    }
  };

  const getLocationAndFetchData = () => {
    if (navigator.geolocation) {
      setLoading(true);
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          fetchFloodData(latitude, longitude);
        },
        (err) => {
          setError('Geolocation error: ' + err.message);
          setLoading(false);
        }
      );
    } else {
      setError('Geolocation is not supported by your browser');
      setLoading(false);
    }
  };

  useEffect(() => {
    getLocationAndFetchData();
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
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-red-400 via-orange-500 to-yellow-500 bg-clip-text text-transparent">
            Disaster Alert System
          </h1>
          <p className="text-xl text-white/60">
            Real-time monitoring of potential agricultural threats
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-6xl mx-auto">
          {/* Flood Risk Card */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="backdrop-blur-xl bg-white/5 rounded-2xl p-6 border border-white/10"
          >
            <div className="flex items-center gap-4 mb-6">
              <FaWater className="text-4xl text-blue-500" />
              <h2 className="text-2xl font-semibold text-white">Flood Risk Assessment</h2>
            </div>

            {loading ? (
              <div className="flex items-center justify-center py-12">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full"
                />
              </div>
            ) : (
              <>
                <div className="relative mb-6">
                  <div className="h-4 bg-black/50 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${Math.min(floodRisk, 100)}%` }}
                      transition={{ duration: 1 }}
                      className={`h-full ${
                        floodRisk > 75
                          ? 'bg-gradient-to-r from-red-500 to-red-600'
                          : floodRisk > 50
                          ? 'bg-gradient-to-r from-yellow-500 to-orange-500'
                          : 'bg-gradient-to-r from-green-500 to-green-600'
                      }`}
                    />
                  </div>
                  <span className="text-white/90 mt-2 block text-center">
                    {Math.round(floodRisk)}% Risk Level
                  </span>
                </div>

                {floodWarning ? (
                  <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="bg-red-500/20 border border-red-500/30 rounded-lg p-4 flex items-center gap-3"
                  >
                    <FaExclamationTriangle className="text-2xl text-red-500" />
                    <p className="text-red-400">High flood risk detected! Take necessary precautions.</p>
                  </motion.div>
                ) : (
                  <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="bg-green-500/20 border border-green-500/30 rounded-lg p-4 flex items-center gap-3"
                  >
                    <FaCheckCircle className="text-2xl text-green-500" />
                    <p className="text-green-400">Normal flood risk levels.</p>
                  </motion.div>
                )}
              </>
            )}
          </motion.div>

          {/* Location Status Card */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="backdrop-blur-xl bg-white/5 rounded-2xl p-6 border border-white/10"
          >
            <div className="flex items-center gap-4 mb-6">
              <FaLocationArrow className="text-4xl text-purple-500" />
              <h2 className="text-2xl font-semibold text-white">Location Status</h2>
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={getLocationAndFetchData}
              disabled={loading}
              className="w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg p-4 flex items-center justify-center gap-2 hover:from-blue-600 hover:to-purple-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                />
              ) : (
                'Update Location Data'
              )}
            </motion.button>

            {error && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="mt-4 text-red-400 bg-red-500/20 border border-red-500/30 rounded-lg p-4"
              >
                {error}
              </motion.div>
            )}
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default DisasterAlerts;