import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import { FaWater, FaLeaf, FaTint, FaSeedling, FaRecycle } from 'react-icons/fa';

const WaterConservation = () => {
  const [methods, setMethods] = useState([]);
  const [selectedMethod, setSelectedMethod] = useState(null);

  useEffect(() => {
    // Hardcoded water conservation methods with descriptions
    const methodsData = [
      {
        title: 'Drip Irrigation',
        description: 'Drip irrigation involves dripping water onto the soil at very low rates (2-20 liters/hour) from a system of small diameter plastic pipes fitted with outlets called emitters or drippers.',
        icon: FaTint
      },
      {
        title: 'Rainwater Harvesting',
        description: 'Rainwater harvesting is the accumulation and storage of rainwater for reuse on-site, rather than allowing it to run off.',
        icon: FaWater
      },
      {
        title: 'Soil Moisture Monitoring',
        description: 'Soil moisture monitoring involves measuring the amount of water present in the soil to optimize irrigation schedules and improve water use efficiency.',
        icon: FaLeaf
      },
      {
        title: 'Mulching',
        description: 'Mulching involves covering the soil with organic or inorganic materials to retain moisture, reduce erosion, and improve soil health.',
        icon: FaSeedling
      },
      {
        title: 'Crop Rotation',
        description: 'Crop rotation is the practice of growing different types of crops in the same area in sequential seasons to improve soil health and reduce the need for chemical fertilizers.',
        icon: FaRecycle
      }
    ];
    setMethods(methodsData);
  }, []);

  return (
    <div className="min-h-screen pt-20 bg-green-50">
      <Navbar />
      <div className="p-6 font-sans">
        <h1 className="text-3xl font-bold text-gray-800">Water Conservation Methods for Farmers</h1>
        <section className="mt-6">
          <h2 className="text-2xl font-semibold text-gray-700">Methods</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
            {methods.map((method, index) => (
              <div
                key={index}
                className="flex flex-col items-center p-6 bg-green-200 rounded-lg shadow-lg cursor-pointer hover:bg-green-300 transition-all duration-300"
                onClick={() => setSelectedMethod(method)}
              >
                <method.icon className="text-4xl text-green-800" />
                <h3 className="mt-2 text-xl font-bold text-green-800">{method.title}</h3>
              </div>
            ))}
          </div>
        </section>
        {selectedMethod && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
              <h3 className="text-2xl font-bold text-green-800">{selectedMethod.title}</h3>
              <p className="mt-4 text-green-900">{selectedMethod.description}</p>
              <button
                className="mt-6 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                onClick={() => setSelectedMethod(null)}
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default WaterConservation;