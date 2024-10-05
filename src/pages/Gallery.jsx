import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import axios from 'axios';

const Gallery = () => {
  const [images, setImages] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await axios.get('https://api.unsplash.com/search/photos', {
          params: { query: 'crops', per_page: 12 },
          headers: {
            Authorization: `Client-ID sS3H6oENtaHP_IwWLdUazee4zEbHXX9mNTrYua72ys8`
          }
        });
        setImages(response.data.results);
      } catch (error) {
        console.error('Error fetching images from Unsplash:', error);
      }
    };

    fetchImages();
  }, []);

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