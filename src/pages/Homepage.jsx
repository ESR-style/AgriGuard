// Homepage.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  FaChartLine, FaBell, FaTint, FaMicroscope,
  FaSeedling, FaDatabase, FaUsers, FaHandHoldingWater,
  FaRobot 
} from 'react-icons/fa';
import Navbar from '../components/Navbar';
import WeatherCard from '../components/WeatherCard';

const FeatureIcon = ({ icon: Icon, label, path, description }) => {
  const navigate = useNavigate();
  return (
    <motion.div
      whileHover={{ scale: 1.05, y: -5 }}
      whileTap={{ scale: 0.95 }}
      onClick={() => navigate(path)}
      className="flex flex-col p-6 rounded-2xl cursor-pointer
                 bg-gradient-to-br from-green-400/10 via-blue-500/10 to-purple-500/10 
                 backdrop-blur-xl border border-white/10 shadow-lg
                 hover:shadow-xl hover:shadow-green-500/20 hover:border-white/20 
                 transition-all duration-300"
    >
      <motion.div
        animate={{ y: [0, -5, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="text-5xl mb-4 text-white"
      >
        <Icon />
      </motion.div>
      <h3 className="text-lg font-semibold text-white mb-2">{label}</h3>
      <p className="text-sm text-white/60">{description}</p>
    </motion.div>
  );
};

const Homepage = () => {
  const navigate = useNavigate();
  
  const features = [
    { 
      icon: FaChartLine, 
      label: 'Analytics', 
      path: '/Charts',
      description: 'View detailed agricultural analytics and trends'
    },
    { 
      icon: FaBell, 
      label: 'Alerts', 
      path: '/DisasterAlerts',
      description: 'Get real-time disaster and weather alerts'
    },
    { 
      icon: FaTint, 
      label: 'Irrigation', 
      path: '/Irrigation',
      description: 'Smart irrigation control and monitoring'
    },
    { 
      icon: FaSeedling, 
      label: 'Crop Guide', 
      path: '/CropSuggestion',
      description: 'Get personalized crop suggestions'
    },
    { 
      icon: FaMicroscope, 
      label: 'Disease Detection', 
      path: '/disease-detection',
      description: 'AI-powered plant disease detection'
    },
    { 
      icon: FaDatabase, 
      label: 'Crop Data', 
      path: '/cropdata',
      description: 'Access comprehensive crop database'
    },
    { 
      icon: FaUsers, 
      label: 'Connect', 
      path: '/Expert',
      description: 'Connect with agriculture experts'
    },
    { 
      icon: FaHandHoldingWater, 
      label: 'Water Management', 
      path: '/WaterManagement',
      description: 'Efficient water conservation techniques'
    }
  ];

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen pt-20 bg-gradient-to-br from-black via-gray-900 to-black relative"
    >
      <Navbar />
      
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="text-center mb-8"
        >
          <h1 className="text-5xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-green-400 via-blue-500 to-purple-500 bg-clip-text text-transparent">
            Welcome to AgriGuard
          </h1>
          <p className="text-xl text-white/60">
            Your Complete Smart Farming Solution
          </p>
        </motion.div>

        <div className="mb-12">
          <WeatherCard />
        </div>

        <motion.div 
          variants={container}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 max-w-7xl mx-auto pb-24"
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={item}
              custom={index}
            >
              <FeatureIcon {...feature} />
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Floating Chatbot Button */}
      <motion.div
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="fixed bottom-6 right-6 bg-gradient-to-r from-green-400 to-blue-500 
                   rounded-full p-4 shadow-lg cursor-pointer hover:shadow-xl 
                   transition-all duration-300 z-50"
        onClick={() => navigate('/chatbot')}
      >
        <FaRobot className="text-white text-2xl" />
        <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
          1
        </span>
      </motion.div>
    </motion.div>
  );
};

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const item = {
  hidden: { y: 20, opacity: 0 },
  show: i => ({
    y: 0,
    opacity: 1,
    transition: {
      delay: i * 0.1
    }
  })
};

export default Homepage;