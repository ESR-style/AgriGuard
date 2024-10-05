import React from 'react';
import Navbar from '../components/Navbar';
import WeatherCard from '../components/WeatherCard';

const Homepage = () => {
  return (
    <div>
      <Navbar />
      <div className='flex flex-col items-center m-10'>
        <div className='w-full h-20 '>
          <WeatherCard className/>
        </div>
        {/* Placeholder for future icons */}
        <div className='w-full md:w-1/2 flex flex-wrap justify-center'>
          {/* Future icons will be added here */}
        </div>
      </div>
    </div>
  );
};

export default Homepage;