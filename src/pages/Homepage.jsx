import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaSeedling, FaWater, FaExclamationTriangle, FaChartLine, FaUserTie, FaRobot, FaTint, FaDatabase } from 'react-icons/fa';
import Navbar from '../components/Navbar';
import WeatherCard from '../components/WeatherCard';

const FeatureIcon = ({ icon: Icon, label, path }) => {
  const navigate = useNavigate();
  return (
    <div
      className='flex flex-col items-center m-2 p-6 w-40 h-40 bg-green-200 rounded-lg shadow-lg cursor-pointer hover:bg-green-300 transition-all duration-300'
      onClick={() => navigate(path)}
    >
      <Icon className='text-4xl text-green-800' />
      <div className='mt-2 text-lg text-center text-green-900'>
        {label.split(' ').map((word, index) => (
          <span key={index} className='block'>
            {word}
          </span>
        ))}
      </div>
    </div>
  );
};

const Homepage = () => {
  return (
    <div className='min-h-screen pt-20'>
      <Navbar />
      <div className='flex flex-col items-center m-10'>
        <div className='w-full h-40 mb-40'>
          <WeatherCard />
        </div>
      </div>
      <div className='w-full flex justify-center mt-10'>
        <div className='grid grid-cols-2 md:grid-cols-4 gap-x-36 gap-y-6'>
          <FeatureIcon icon={FaSeedling} label='Crop Recommendation' path='/CropSuggestion' />
          <FeatureIcon icon={FaWater} label='Irrigation Requirement' path='/Irrigation' />
          <FeatureIcon icon={FaExclamationTriangle} label='Flood Alerts' path='/DisasterAlerts' />
          <FeatureIcon icon={FaChartLine} label='Charts' path='/Charts' />
          <FeatureIcon icon={FaUserTie} label='Connect with Expert' path='/Expert' />
          <FeatureIcon icon={FaRobot} label='AI Chatbot' path='/Chatbot' />
          <FeatureIcon icon={FaTint} label='Water Management' path='/WaterManagement' />
          <FeatureIcon icon={FaDatabase} label='Crop Data' path='/CropData' />
        </div>
      </div>
    </div>
  );
};

export default Homepage;