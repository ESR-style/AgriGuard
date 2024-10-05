import React from 'react';
import Navbar from '../components/Navbar';

const About = () => {
  return (
    <div className="min-h-screen pt-20 bg-gray-100 text-gray-700 font-sans flex flex-col">
      <Navbar />
      <div className="flex-grow p-5 w-full flex flex-col items-center">
        <h1 className="text-center text-green-600 text-3xl mb-5">About Us</h1>
        <div className="bg-white p-10 rounded-lg shadow-lg w-full max-w-4xl">
          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-3">Our Mission</h2>
            <p>
              Our mission is to empower farmers by providing them with the tools and knowledge they need to succeed. We aim to bring a positive change in their lives by offering a platform that connects them with agricultural experts, provides crop management solutions, and offers a marketplace for their produce.
            </p>
          </section>
          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-3">Impact on Farmers' Lives</h2>
            <p>
              We are dedicated to improving the livelihoods of farmers by offering them access to expert advice, modern farming techniques, and a platform to sell their produce. Our services help farmers increase their crop yield, manage pests and diseases, and get fair prices for their produce.
            </p>
          </section>
          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-3">Features</h2>
            <ul className="list-disc list-inside">
              <li className="mb-2">
                <strong>Expert Consultation:</strong> Connect with agricultural experts for advice on crop management, soil health, pest control, and more.
              </li>
              <li className="mb-2">
                <strong>Crop Management:</strong> Get personalized crop management plans to maximize your yield and minimize losses.
              </li>
              <li className="mb-2">
                <strong>Marketplace:</strong> Sell your produce directly to buyers and get fair prices without middlemen.
              </li>
              <li className="mb-2">
                <strong>Weather Updates:</strong> Receive real-time weather updates to plan your farming activities better.
              </li>
              <li className="mb-2">
                <strong>Community Forum:</strong> Join a community of farmers to share experiences, ask questions, and learn from each other.
              </li>
            </ul>
          </section>
        </div>
      </div>
    </div>
  );
};

export default About;