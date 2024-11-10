import React from 'react';
import { motion } from 'framer-motion';
import Navbar from '../components/Navbar';
import { FaPhone, FaWhatsapp, FaUser, FaRupeeSign } from 'react-icons/fa';

const Connect = () => {
  const experts = [
    {
      id: 1,
      name: 'Dr. Nishchal',
      description: 'Expert in crop management and soil health.',
      price: 100,
      imageUrl: '/assets/nishal.jpeg',
      phone: '+911234567890',
      whatsapp: '+917019160181',
    },
    {
      id: 2,
      name: 'Dr. Pratham',
      description: 'Specialist in organic farming and pest control.',
      price: 150,
      imageUrl: '/assets/Pratham.jpeg',
      phone: '+911234567891',
      whatsapp: '+911234567891',
    },
    {
      id: 3,
      name: 'Mr. Madhesh',
      description: 'Veteran in irrigation techniques and water management.',
      price: 120,
      imageUrl: '/assets/madhesh.jpeg',
      phone: '+911234567892',
      whatsapp: '+911234567892',
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
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 bg-clip-text text-transparent">
            Connect with Experts
          </h1>
          <p className="text-xl text-white/60">
            Get professional guidance from agricultural specialists
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {experts.map((expert, index) => (
            <motion.div
              key={expert.id}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: index * 0.1 }}
              className="backdrop-blur-xl bg-white/5 rounded-2xl overflow-hidden border border-white/10 hover:border-white/20 transition-all duration-300 pt-16 pb-6"
            >
              <div className="p-6 flex flex-col items-center">
                <div className="w-32 h-32 -mt-20 mb-4 relative">
                  <div 
                    className="absolute inset-0 rounded-full shadow-lg bg-gradient-to-r from-purple-500/30 to-pink-500/30"
                  ></div>
                  <img
                    src={expert.imageUrl}
                    alt={expert.name}
                    loading="lazy"
                    className="w-full h-full rounded-full object-cover object-center border-4 border-white/10 shadow-xl transform transition-transform duration-300"
                    style={{
                      imageRendering: 'crisp-edges',
                      backfaceVisibility: 'hidden'
                    }}
                  />
                </div>

                <div className="text-center w-full">
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <FaUser className="text-purple-400" />
                    <h2 className="text-xl font-semibold text-white">{expert.name}</h2>
                  </div>

                  <p className="text-white/60 mb-4">{expert.description}</p>

                  <div className="flex items-center justify-center gap-2 mb-4">
                    <FaRupeeSign className="text-green-400" />
                    <span className="text-white/80">{expert.price}/hour</span>
                  </div>

                  <div className="flex gap-3">
                    <motion.a
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      href={`tel:${expert.phone}`}
                      className="flex-1 flex items-center justify-center gap-2 bg-blue-500/20 hover:bg-blue-500/30 text-blue-400 py-2 rounded-lg transition-all"
                    >
                      <FaPhone />
                      <span>Call</span>
                    </motion.a>

                    <motion.a
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      href={`https://wa.me/${expert.whatsapp}`}
                      target="_blank"
                      rel="noopener noreferrer" 
                      className="flex-1 flex items-center justify-center gap-2 bg-green-500/20 hover:bg-green-500/30 text-green-400 py-2 rounded-lg transition-all"
                    >
                      <FaWhatsapp />
                      <span>WhatsApp</span>
                    </motion.a>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default Connect;