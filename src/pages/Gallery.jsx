import React, { useState } from 'react';
import Navbar from '../components/Navbar';

const Gallery = () => {
  const [selectedImage, setSelectedImage] = useState(null);

  const images = [
    {
      id: '1',
      urls: {
        small: '/assets/h1.jpg',
        regular: '/assets/h1.jpg'
      },
      alt_description: 'Image 1 description'
    },
    {
      id: '2',
      urls: {
        small: '/assets/h2.jpg',
        regular: '/assets/h2.jpg'
      },
      alt_description: 'Image 2 description'
    },
    {
      id: '3',
      urls: {
        small: '/assets/h3.jpg',
        regular: '/assets/h3.jpg'
      },
      alt_description: 'Image 3 description'
    },
    {
      id: '4',
      urls: {
        small: '/assets/h4.jpg',
        regular: '/assets/h4.jpg'
      },
      alt_description: 'Image 4 description'
    },
    {
      id: '5',
      urls: {
        small: '/assets/v5.jpg',
        regular: '/assets/v5.jpg'
      },
      alt_description: 'Image 5 description'
    },
    {
      id: '6',
      urls: {
        small: '/assets/v6.jpg',
        regular: '/assets/v6.jpg'
      },
      alt_description: 'Image 6 description'
    },
    {
      id: '7',
      urls: {
        small: '/assets/v7.jpg',
        regular: '/assets/v7.jpg'
      },
      alt_description: 'Image 7 description'
    },
    {
      id: '8',
      urls: {
        small: '/assets/v8.jpg',
        regular: '/assets/v8.jpg'
      },
      alt_description: 'Image 8 description'
    },
    {
      id: '9',
      urls: {
        small: '/assets/v9.jpg',
        regular: '/assets/v9.jpg'
      },
      alt_description: 'Image 9 description'
    },
    {
      id: '10',
      urls: {
        small: '/assets/h10.jpg',
        regular: '/assets/h10.jpg'
      },
      alt_description: 'Image 10 description'
    },
    {
      id: '11',
      urls: {
        small: '/assets/h11.jpg',
        regular: '/assets/h11.jpg'
      },
      alt_description: 'Image 11 description'
    },
    {
      id: '12',
      urls: {
        small: '/assets/h12.jpg',
        regular: '/assets/h12.jpg'
      },
      alt_description: 'Image 12 description'
    }
  ];

  const handleClose = (e) => {
    if (e.target.classList.contains('overlay')) {
      setSelectedImage(null);
    }
  };

  return (
    <div className="min-h-screen pt-20 bg-gray-100 text-gray-700 font-sans flex flex-col">
      <Navbar />
      <div className="flex-grow p-5 w-full flex flex-col items-center">
        <h1 className="text-center text-green-600 text-3xl mb-5">Gallery</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 w-full max-w-6xl">
          {images.map((image) => (
            <div key={image.id} className="relative group">
              <img
                src={image.urls.small}
                alt={image.alt_description}
                className="w-full h-full object-cover rounded-lg shadow-lg cursor-pointer transform transition-transform duration-300 hover:scale-105"
                onClick={() => setSelectedImage(image.urls.regular)}
              />
            </div>
          ))}
        </div>
        {selectedImage && (
          <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 overlay" onClick={handleClose}>
            <div className="relative">
              <button
                className="absolute top-0 right-0 m-4 text-white text-2xl"
                onClick={() => setSelectedImage(null)}
              >
                &times;
              </button>
              <img src={selectedImage} alt="Selected" className="max-w-screen max-h-screen rounded-lg" />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Gallery;