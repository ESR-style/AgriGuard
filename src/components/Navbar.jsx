// Navbar.jsx
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaArrowRight, FaBars, FaTimes } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  const navLinks = [
    { title: 'Home', path: '/' },
    { title: 'About', path: '/about' },
    { title: 'Gallery', path: '/gallery' }
  ];

  // Scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <motion.nav 
  initial={{ y: -100 }}
  animate={{ y: 0 }}
  transition={{ duration: 0.1 }} // Reduced from default
  className={`fixed top-0 left-0 right-0 z-50 mx-4 my-2 sm:mx-8 sm:my-4 transition-all duration-200
             ${scrolled ? 'bg-black/90' : 'bg-black/75'} 
             backdrop-blur-lg rounded-2xl border border-white/10 shadow-lg`}
>
        <div className="flex items-center justify-between h-16 px-6 sm:px-8">
          <motion.div 
            whileHover={{ scale: 1.05 }}
            className="relative"
          >
            <Link to="/" className="text-2xl font-bold bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent">
              AgriGuard
            </Link>
          </motion.div>

          {/* Desktop Menu */}
          <div className="hidden sm:flex items-center space-x-12">
            {navLinks.map((link, index) => (
              <motion.div
                key={index}
                className="relative"
              >
                <Link 
                  to={link.path}
                  className={`text-lg text-white/90 hover:text-green-400 transition-colors duration-300
                            ${location.pathname === link.path ? 'text-green-400' : ''}`}
                >
                  {link.title}
                  {location.pathname === link.path && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-green-400 to-blue-500"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </Link>
              </motion.div>
            ))}

            <motion.div 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link 
                to='/contact' 
                className="bg-gradient-to-r from-green-400 to-blue-500 text-white px-6 py-2 rounded-full 
                         flex items-center space-x-2 hover:shadow-lg hover:shadow-green-500/20 transition duration-300"
              >
                <span>Contact Us</span>
                <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>
          </div>

          {/* Mobile Menu Button */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsOpen(!isOpen)}
            className="sm:hidden text-white focus:outline-none"
          >
            {isOpen ? <FaTimes className="w-6 h-6" /> : <FaBars className="w-6 h-6" />}
          </motion.button>
        </div>
      </motion.nav>

      {/* Mobile Menu Dropdown */}
      <AnimatePresence mode="wait">
  {isOpen && (
    <motion.div
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: "auto" }}
      exit={{ opacity: 0, height: 0 }}
      transition={{ duration: 0.1 }} // Reduced from 0.3
      className="fixed top-20 left-4 right-4 z-40 sm:hidden"
    >
            <motion.div 
              className="backdrop-blur-xl bg-black/90 rounded-2xl border border-white/10 shadow-2xl 
                        overflow-hidden divide-y divide-white/10"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              {navLinks.map((link, index) => (
                <motion.div
                  key={index}
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ x: -20, opacity: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Link
                    to={link.path}
                    className={`block px-6 py-4 text-lg transition-all duration-300
                              ${location.pathname === link.path 
                                ? 'text-green-400 bg-white/5' 
                                : 'text-white/90 hover:bg-white/5'}`}
                    onClick={() => setIsOpen(false)}
                  >
                    {link.title}
                  </Link>
                </motion.div>
              ))}
              <motion.div
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: -20, opacity: 0 }}
                transition={{ delay: navLinks.length * 0.1 }}
              >
                <Link
                  to="/contact"
                  className="block px-6 py-4 text-lg text-white bg-gradient-to-r from-green-400 to-blue-500 
                           hover:opacity-90 transition-all duration-300"
                  onClick={() => setIsOpen(false)}
                >
                  Contact Us
                </Link>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;