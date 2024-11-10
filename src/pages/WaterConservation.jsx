import React from 'react';
import { motion } from 'framer-motion';
import Navbar from '../components/Navbar';
import { 
  FaTint, 
  FaLeaf, 
  FaCloudRain, 
  FaTemperatureLow, 
  FaMountain, 
  FaRecycle 
} from 'react-icons/fa';

const WaterConservation = () => {
  const conservationTips = [
    {
      icon: FaTint,
      title: 'Smart Irrigation',
      description: 'Use drip irrigation and smart controllers to optimize water usage in your fields.',
      color: 'blue'
    },
    {
      icon: FaLeaf,
      title: 'Mulching',
      description: 'Apply organic mulch to reduce water evaporation and maintain soil moisture.',
      color: 'green'
    },
    {
      icon: FaCloudRain,
      title: 'Rainwater Harvesting',
      description: 'Implement rainwater collection systems to store water for dry periods.',
      color: 'purple'
    },
    {
      icon: FaTemperatureLow,
      title: 'Drought-Resistant Crops',
      description: 'Choose crops that require less water and are suitable for your climate.',
      color: 'emerald'
    },
    {
      icon: FaMountain,
      title: 'Soil Management',
      description: 'Maintain healthy soil structure to improve water retention capacity.',
      color: 'amber'
    },
    {
      icon: FaRecycle,
      title: 'Water Recycling',
      description: 'Reuse greywater and implement water recycling systems in your farm.',
      color: 'cyan'
    }
  ];


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
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-blue-400 via-cyan-500 to-teal-500 bg-clip-text text-transparent">
            Water Conservation
          </h1>
          <p className="text-xl text-white/60">
            Sustainable practices for efficient water management in agriculture
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {conservationTips.map((tip, index) => (
            <motion.div
              key={index}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className="backdrop-blur-xl bg-white/5 rounded-2xl p-6 border border-white/10 
                         hover:border-white/20 transition-all duration-300"
            >
              <div className={`w-12 h-12 rounded-lg mb-4 flex items-center justify-center 
                              bg-${tip.color}-500/20`}>
                <tip.icon className={`text-2xl text-${tip.color}-400`} />
              </div>
              
              <h3 className="text-xl font-semibold text-white mb-3">{tip.title}</h3>
              <p className="text-white/60">{tip.description}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mt-12 p-6 backdrop-blur-xl bg-white/5 rounded-2xl border border-white/10"
        >
          <h2 className="text-2xl font-semibold text-white mb-4">Why Water Conservation Matters</h2>
          <p className="text-white/60">
            Water conservation in agriculture is crucial for sustainable farming and environmental protection. 
            By implementing these practices, you can reduce water waste, lower costs, and contribute to a more 
            sustainable future for agriculture.
          </p>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default WaterConservation;