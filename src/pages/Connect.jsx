import React from 'react';
import Navbar from '../components/Navbar';

const experts = [
  {
    id: 1,
    name: 'Dr. Rajesh Kumar',
    description: 'Expert in crop management and soil health.',
    price: 100,
    imageUrl: 'https://source.unsplash.com/random/200x200?person',
  },
  {
    id: 2,
    name: 'Ms. Anjali Sharma',
    description: 'Specialist in organic farming and pest control.',
    price: 150,
    imageUrl: 'https://source.unsplash.com/random/200x200?woman',
  },
  {
    id: 3,
    name: 'Mr. Suresh Patel',
    description: 'Veteran in irrigation techniques and water management.',
    price: 120,
    imageUrl: 'https://source.unsplash.com/random/200x200?man',
  },
];

const Connect = () => {
  return (
    <div className="min-h-screen pt-20 bg-gray-100 text-gray-700 font-sans flex flex-col">
      <Navbar />
      <div className="flex-grow p-5 w-full flex flex-col items-center">
        <h1 className="text-center text-green-600 text-3xl mb-5">Connect with an Expert</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 w-full max-w-6xl">
          {experts.map((expert) => (
            <div key={expert.id} className="bg-white p-5 rounded-lg shadow-lg flex flex-col items-center">
              <img src={expert.imageUrl} alt={expert.name} className="w-32 h-32 rounded-full mb-4" />
              <h2 className="text-xl font-bold mb-2">{expert.name}</h2>
              <p className="text-gray-600 mb-4">{expert.description}</p>
              <p className="text-green-600 font-bold mb-4">₹{expert.price}</p>
              <div className="flex space-x-3">
                <button className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                  Call
                </button>
                <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                  Chat
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Connect;