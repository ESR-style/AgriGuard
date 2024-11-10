import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Navbar from '../components/Navbar';
import { FaSearch, FaFilter, FaSeedling } from 'react-icons/fa';

const CropsData = () => {
  const [selectedCrop, setSelectedCrop] = useState(null);
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('All');

  const crops = [
    { name: 'Wheat', image: '/assets/wheat.jpeg', description: 'Wheat is a cereal grain.', waterRequirement: '500-650 mm', fullDescription: 'Wheat is a grass widely cultivated for its seed, a grain which is a worldwide staple food.' },
    { name: 'Rice', image: '/assets/rice.jpeg', description: 'Rice is a staple food.', waterRequirement: '450-700 mm', fullDescription: 'Rice is the seed of the grass species Oryza sativa or Oryza glaberrima. As a cereal grain, it is the most widely consumed staple food for a large part of the world\'s human population, especially in Asia.' },
    { name: 'Coffee', image: '/assets/coffee.jpeg', description: 'Coffee is a brewed drink prepared from roasted coffee beans.', waterRequirement: '1500-2500 mm', fullDescription: 'Coffee is a brewed drink prepared from roasted coffee beans, the seeds of berries from certain Coffea species.' },
    { name: 'Tea', image: '/assets/tea.jpeg', description: 'Tea is an aromatic beverage commonly prepared by pouring hot water over cured leaves.', waterRequirement: '1200-1400 mm', fullDescription: 'Tea is an aromatic beverage commonly prepared by pouring hot or boiling water over cured or fresh leaves of Camellia sinensis, an evergreen shrub native to East Asia.' },
    { name: 'Pepper', image: '/assets/pepper.jpeg', description: 'Pepper is a flowering vine in the family Piperaceae.', waterRequirement: '2000-3000 mm', fullDescription: 'Pepper is a flowering vine in the family Piperaceae, cultivated for its fruit, known as a peppercorn, which is usually dried and used as a spice and seasoning.' },
    { name: 'Sugarcane', image: '/assets/shugarcane.jpeg', description: 'Sugarcane is a tropical, perennial grass.', waterRequirement: '1500-2500 mm', fullDescription: 'Sugarcane is a tropical, perennial grass that forms lateral shoots at the base to produce multiple stems, typically three to four meters high and about 5 cm in diameter.' },
    { name: 'Cotton', image: '/assets/cotton.jpeg', description: 'Cotton is a soft, fluffy staple fiber.', waterRequirement: '700-1300 mm', fullDescription: 'Cotton is a soft, fluffy staple fiber that grows in a boll, or protective case, around the seeds of cotton plants of the genus Gossypium in the mallow family Malvaceae.' },
    { name: 'Maize', image: '/assets/corn.jpeg', description: 'Maize is also known as corn.', waterRequirement: '500-800 mm', fullDescription: 'Maize, also known as corn, is a cereal grain first domesticated by indigenous peoples in southern Mexico about 10,000 years ago.' },
    { name: 'Barley', image: '/assets/barley.jpeg', description: 'Barley is a major cereal grain.', waterRequirement: '450-650 mm', fullDescription: 'Barley is a major cereal grain grown in temperate climates globally. It was one of the first cultivated grains, particularly in Eurasia as early as 10,000 years ago.' },
    { name: 'Millet', image: '/assets/millet.jpeg', description: 'Millet is a group of highly variable small-seeded grasses.', waterRequirement: '300-500 mm', fullDescription: 'Millet is a group of highly variable small-seeded grasses, widely grown around the world as cereal crops or grains for fodder and human food.' },
  ]; 

  const handleCardClick = (crop) => {
    setSelectedCrop(crop);
    setIsPopupVisible(true);
  };

  const handleClosePopup = () => {
    setIsPopupVisible(false);
    setSelectedCrop(null);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  const filteredCrops = crops.filter(crop => {
    return crop.name.toLowerCase().includes(searchTerm.toLowerCase()) && 
           (filter === 'All' || crop.waterRequirement.includes(filter));
  });

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
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-green-400 via-blue-500 to-purple-500 bg-clip-text text-transparent">
            Crop Database
          </h1>
          <p className="text-xl text-white/60">
            Comprehensive information about various crops
          </p>
        </motion.div>

        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="flex-1 relative">
            <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white/40" />
            <input
              type="text"
              placeholder="Search crops..."
              value={searchTerm}
              onChange={handleSearchChange}
              className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/10 rounded-lg 
                       text-white placeholder-white/40 focus:outline-none focus:border-blue-500"
            />
          </div>
          <div className="relative">
            <FaFilter className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white/40" />
            <select
  value={filter}
  onChange={handleFilterChange}
  className="pl-12 pr-8 py-3 bg-white/5 border border-white/10 rounded-lg 
             text-white appearance-none focus:outline-none focus:border-blue-500
             [&>option]:bg-gray-800 [&>option]:text-white"
>
  <option value="All" className="text-white bg-gray-800">All Water Requirements</option>
  <option value="500-650 mm" className="text-white bg-gray-800">500-650 mm</option>
  <option value="450-700 mm" className="text-white bg-gray-800">450-700 mm</option>
  <option value="1500-2500 mm" className="text-white bg-gray-800">1500-2500 mm</option>
  <option value="1200-1400 mm" className="text-white bg-gray-800">1200-1400 mm</option>
  <option value="2000-3000 mm" className="text-white bg-gray-800">2000-3000 mm</option>
  <option value="700-1300 mm" className="text-white bg-gray-800">700-1300 mm</option>
  <option value="500-800 mm" className="text-white bg-gray-800">500-800 mm</option>
  <option value="450-650 mm" className="text-white bg-gray-800">450-650 mm</option>
  <option value="300-500 mm" className="text-white bg-gray-800">300-500 mm</option>
</select>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
        >
          {filteredCrops.map((crop, index) => (
            <motion.div
              key={index}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleCardClick(crop)}
              className="backdrop-blur-xl bg-white/5 rounded-2xl p-6 border border-white/10
                         cursor-pointer hover:border-white/20 transition-all duration-300"
            >
              <div className="relative h-48 mb-4 rounded-lg overflow-hidden">
                <img 
                  src={crop.image} 
                  alt={crop.name} 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              </div>
              <h2 className="text-xl font-semibold text-white mb-2">{crop.name}</h2>
              <p className="text-white/60 text-sm mb-3">{crop.description}</p>
              <div className="flex items-center text-blue-400">
                <FaSeedling className="mr-2" />
                <span>{crop.waterRequirement}</span>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {isPopupVisible && selectedCrop && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50"
            onClick={handleClosePopup}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="bg-gray-900/90 p-8 rounded-2xl border border-white/10 max-w-2xl mx-4"
              onClick={e => e.stopPropagation()}
            >
              <img 
                src={selectedCrop.image} 
                alt={selectedCrop.name} 
                className="w-full h-64 object-cover rounded-lg mb-6"
              />
              <h2 className="text-3xl font-bold text-white mb-4">{selectedCrop.name}</h2>
              <p className="text-white/80 mb-6">{selectedCrop.fullDescription}</p>
              <div className="flex items-center text-blue-400 mb-6">
                <FaSeedling className="mr-2" />
                <span>Water Requirement: {selectedCrop.waterRequirement}</span>
              </div>
              <button
                onClick={handleClosePopup}
                className="w-full bg-gradient-to-r from-red-500 to-pink-500 text-white py-3 rounded-lg
                         hover:from-red-600 hover:to-pink-600 transition-all duration-300"
              >
                Close
              </button>
            </motion.div>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

export default CropsData;