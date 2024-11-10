import React from 'react';
import { motion } from 'framer-motion';
import Navbar from '../components/Navbar';
import { FaLeaf, FaSeedling, FaHandHoldingHeart } from 'react-icons/fa';

const About = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen pt-20 bg-gradient-to-br from-black via-gray-900 to-black"
    >
      <Navbar />
      
      {/* Hero Section */}
      <div className="relative h-[400px] mb-16">
        <div className="absolute inset-0">
          <img 
            src="/assets/detail-rice-plant-sunset-valencia-with-plantation-out-focus-rice-grains-plant-seed.jpg" 
            alt="Farm landscape" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-black/90" />
        </div>
        <div className="relative container mx-auto px-4 h-full flex items-center">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="max-w-2xl"
          >
            <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-green-400 via-blue-500 to-purple-500 bg-clip-text text-transparent">
              Revolutionizing Agriculture
            </h1>
            <p className="text-xl text-white/80 leading-relaxed">
              AgroTech is committed to transforming agriculture through innovative technology solutions, 
              empowering farmers to build a sustainable and prosperous future.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Mission Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <h2 className="text-3xl font-semibold text-white mb-6">Our Mission</h2>
            <p className="text-white/60 leading-relaxed mb-6">
              At AgroTech, we believe in the power of technology to transform agriculture. 
              Our mission is to provide farmers with innovative tools and expertise that enable 
              sustainable farming practices and improved yields.
            </p>
            <div className="flex items-center gap-2 text-green-400">
              <FaLeaf />
              <span>Sustainable Agriculture</span>
            </div>
          </motion.div>
          <motion.div
            initial={{ x: 20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="rounded-2xl overflow-hidden"
          >
            <img 
              src="/assets/environmental-conservation-plant-sustainability.jpg" 
              alt="Agricultural technology" 
              className="w-full h-[300px] object-cover"
            />
          </motion.div>
        </div>
      </div>

      {/* Values Section */}
      <div className="bg-white/5 backdrop-blur-xl py-16">
        <div className="container mx-auto px-4">
          <motion.h2
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="text-3xl font-semibold text-white text-center mb-12"
          >
            Our Values
          </motion.h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: FaSeedling,
                title: 'Innovation',
                description: 'Constantly evolving and adapting to bring the latest agricultural technologies.'
              },
              {
                icon: FaHandHoldingHeart,
                title: 'Empowerment',
                description: 'Supporting farmers with knowledge and tools for better decision-making.'
              },
              {
                icon: FaLeaf,
                title: 'Sustainability',
                description: 'Promoting eco-friendly farming practices for a better tomorrow.'
              }
            ].map((value, index) => (
              <motion.div
                key={index}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4 + index * 0.1 }}
                className="text-center"
              >
                <value.icon className="text-4xl text-green-400 mb-4 mx-auto" />
                <h3 className="text-xl font-semibold text-white mb-3">{value.title}</h3>
                <p className="text-white/60">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="container mx-auto px-4 py-16 text-center"
      >
        <h2 className="text-3xl font-semibold text-white mb-6">
          Join Us in Transforming Agriculture
        </h2>
        <p className="text-white/60 max-w-2xl mx-auto mb-8">
          Together, we can build a more sustainable and profitable future for agriculture. 
          Start your journey with AgroTech today.
        </p>
        <button className="px-8 py-3 bg-gradient-to-r from-green-400 to-blue-500 rounded-lg text-white font-semibold hover:opacity-90 transition-opacity">
          Get Started
        </button>
      </motion.div>
    </motion.div>
  );
};

export default About;