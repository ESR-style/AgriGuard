import React from 'react';
import { motion } from 'framer-motion';
import Navbar from '../components/Navbar';
import { FaEnvelope, FaUser, FaPencilAlt, FaPaperPlane } from 'react-icons/fa';

const Contact = () => {
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
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
            Contact Us
          </h1>
          <p className="text-xl text-white/60">
            Get in touch with our agricultural experts
          </p>
        </motion.div>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="max-w-xl mx-auto backdrop-blur-xl bg-white/5 p-8 rounded-2xl border border-white/10"
        >
          <form className="space-y-6">
            <div>
              <label className="block text-white/80 text-sm font-medium mb-2" htmlFor="name">
                Name
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaUser className="text-purple-400" />
                </div>
                <input
                  type="text"
                  id="name"
                  name="name"
                  className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-lg 
                           text-white placeholder-white/40 focus:outline-none focus:border-purple-500
                           transition-colors"
                  placeholder="Your Name"
                />
              </div>
            </div>

            <div>
              <label className="block text-white/80 text-sm font-medium mb-2" htmlFor="email">
                Email
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaEnvelope className="text-purple-400" />
                </div>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-lg 
                           text-white placeholder-white/40 focus:outline-none focus:border-purple-500
                           transition-colors"
                  placeholder="Your Email"
                />
              </div>
            </div>

            <div>
              <label className="block text-white/80 text-sm font-medium mb-2" htmlFor="subject">
                Subject
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaPencilAlt className="text-purple-400" />
                </div>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-lg 
                           text-white placeholder-white/40 focus:outline-none focus:border-purple-500
                           transition-colors"
                  placeholder="Subject"
                />
              </div>
            </div>

            <div>
              <label className="block text-white/80 text-sm font-medium mb-2" htmlFor="message">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                rows="4"
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg 
                         text-white placeholder-white/40 focus:outline-none focus:border-purple-500
                         transition-colors resize-none"
                placeholder="Your Message"
              ></textarea>
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-gradient-to-r 
                       from-purple-500 to-pink-500 text-white rounded-lg font-medium 
                       hover:from-purple-600 hover:to-pink-600 transition-all duration-200"
            >
              <FaPaperPlane />
              Send Message
            </motion.button>
          </form>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Contact;