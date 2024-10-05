import React, { useState } from 'react';
import Navbar from '../components/Navbar';

const CropsData = () => {
  const [selectedCrop, setSelectedCrop] = useState(null);
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('All');

  const crops = [
    { name: 'Wheat', image: 'path/to/wheat.jpg', description: 'Wheat is a cereal grain.', waterRequirement: '500-650 mm', fullDescription: 'Wheat is a grass widely cultivated for its seed, a grain which is a worldwide staple food.' },
    { name: 'Rice', image: 'path/to/rice.jpg', description: 'Rice is a staple food.', waterRequirement: '450-700 mm', fullDescription: 'Rice is the seed of the grass species Oryza sativa or Oryza glaberrima. As a cereal grain, it is the most widely consumed staple food for a large part of the world\'s human population, especially in Asia.' },
    { name: 'Coffee', image: 'path/to/coffee.jpg', description: 'Coffee is a brewed drink prepared from roasted coffee beans.', waterRequirement: '1500-2500 mm', fullDescription: 'Coffee is a brewed drink prepared from roasted coffee beans, the seeds of berries from certain Coffea species.' },
    { name: 'Tea', image: 'path/to/tea.jpg', description: 'Tea is an aromatic beverage commonly prepared by pouring hot water over cured leaves.', waterRequirement: '1200-1400 mm', fullDescription: 'Tea is an aromatic beverage commonly prepared by pouring hot or boiling water over cured or fresh leaves of Camellia sinensis, an evergreen shrub native to East Asia.' },
    { name: 'Pepper', image: 'path/to/pepper.jpg', description: 'Pepper is a flowering vine in the family Piperaceae.', waterRequirement: '2000-3000 mm', fullDescription: 'Pepper is a flowering vine in the family Piperaceae, cultivated for its fruit, known as a peppercorn, which is usually dried and used as a spice and seasoning.' },
    { name: 'Sugarcane', image: 'path/to/sugarcane.jpg', description: 'Sugarcane is a tropical, perennial grass.', waterRequirement: '1500-2500 mm', fullDescription: 'Sugarcane is a tropical, perennial grass that forms lateral shoots at the base to produce multiple stems, typically three to four meters high and about 5 cm in diameter.' },
    { name: 'Cotton', image: 'path/to/cotton.jpg', description: 'Cotton is a soft, fluffy staple fiber.', waterRequirement: '700-1300 mm', fullDescription: 'Cotton is a soft, fluffy staple fiber that grows in a boll, or protective case, around the seeds of cotton plants of the genus Gossypium in the mallow family Malvaceae.' },
    { name: 'Maize', image: 'path/to/maize.jpg', description: 'Maize is also known as corn.', waterRequirement: '500-800 mm', fullDescription: 'Maize, also known as corn, is a cereal grain first domesticated by indigenous peoples in southern Mexico about 10,000 years ago.' },
    { name: 'Barley', image: 'path/to/barley.jpg', description: 'Barley is a major cereal grain.', waterRequirement: '450-650 mm', fullDescription: 'Barley is a major cereal grain grown in temperate climates globally. It was one of the first cultivated grains, particularly in Eurasia as early as 10,000 years ago.' },
    { name: 'Millet', image: 'path/to/millet.jpg', description: 'Millet is a group of highly variable small-seeded grasses.', waterRequirement: '300-500 mm', fullDescription: 'Millet is a group of highly variable small-seeded grasses, widely grown around the world as cereal crops or grains for fodder and human food.' },
    // Add more crops to reach around 50 crops
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
    return crop.name.toLowerCase().includes(searchTerm.toLowerCase()) && (filter === 'All' || crop.waterRequirement.includes(filter));
  });

  return (
    <div className="min-h-screen pt-20 bg-gray-100 text-gray-700 font-sans flex flex-col">
      <Navbar />
      <div className="flex-grow p-5 w-full">
        <h1 className="text-center text-green-600 text-3xl mb-5">Crops Data</h1>
        <div className="flex justify-between mb-5">
          <input
            type="text"
            placeholder="Search crops..."
            value={searchTerm}
            onChange={handleSearchChange}
            className="p-2 border border-gray-300 rounded-lg"
          />
          <select value={filter} onChange={handleFilterChange} className="p-2 border border-gray-300 rounded-lg">
            <option value="All">All</option>
            <option value="500-650 mm">500-650 mm</option>
            <option value="450-700 mm">450-700 mm</option>
            <option value="1500-2500 mm">1500-2500 mm</option>
            <option value="1200-1400 mm">1200-1400 mm</option>
            <option value="2000-3000 mm">2000-3000 mm</option>
            <option value="700-1300 mm">700-1300 mm</option>
            <option value="500-800 mm">500-800 mm</option>
            <option value="450-650 mm">450-650 mm</option>
            <option value="300-500 mm">300-500 mm</option>
          </select>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {filteredCrops.map((crop, index) => (
            <div key={index} className="bg-white p-5 rounded-lg shadow-lg cursor-pointer" onClick={() => handleCardClick(crop)}>
              <img src={crop.image} alt={crop.name} className="w-full h-32 object-cover rounded-lg mb-4" />
              <h2 className="text-xl font-bold mb-2">{crop.name}</h2>
              <p>{crop.description}</p>
            </div>
          ))}
        </div>
      </div>
      {isPopupVisible && selectedCrop && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-10 rounded-lg shadow-lg w-11/12 md:w-1/2 lg:w-1/3">
            <h2 className="text-2xl font-bold mb-4">{selectedCrop.name}</h2>
            <img src={selectedCrop.image} alt={selectedCrop.name} className="w-full h-48 object-cover rounded-lg mb-4" />
            <p className="mb-4">{selectedCrop.fullDescription}</p>
            <p className="mb-4"><strong>Water Requirement:</strong> {selectedCrop.waterRequirement}</p>
            <button className="bg-red-500 text-white px-4 py-2 rounded-lg" onClick={handleClosePopup}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CropsData;