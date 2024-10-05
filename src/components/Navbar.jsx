// Navbar.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaArrowRight } from 'react-icons/fa';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className='bg-black h-14 shadow-lg mx-4 my-2 sm:mx-8 sm:my-4 rounded-full flex items-center justify-between px-4 sm:px-8 py-2 fixed top-0 left-0 right-0 z-50'>
      <div className='text-white text-lg sm:text-xl'>
        <span className='text-white'>Agri</span>
        <span className='text-green-500'>Guard</span>
      </div>
      <div className='hidden sm:flex space-x-28 text-base sm:text-lg'>
        <Link to='/' className='text-white hover:text-green-500'>Home</Link>
        <Link to='/about' className='text-white hover:text-green-500'>About</Link>
        <Link to='/gallery' className='text-white hover:text-green-500'>Gallery</Link>
      </div>
      <div className='hidden sm:flex'>
        <Link to='/contact' className='bg-green-700 text-white px-4 py-2 rounded-full flex items-center space-x-2 hover:bg-green-900 transition ease-in'>
          <span>Contact Us</span>
          <FaArrowRight />
        </Link>
      </div>
      <div className='sm:hidden flex items-center'>
        <button onClick={toggleMenu} className='text-white focus:outline-none'>
          <svg className='w-6 h-6' fill='none' stroke='currentColor' viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'>
            <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M4 6h16M4 12h16m-7 6h7'></path>
          </svg>
        </button>
      </div>
      {isOpen && (
        <div className='sm:hidden absolute top-16 left-4 right-4 bg-black flex flex-col items-center space-y-6 py-4 rounded-lg shadow-lg'>
          <Link to='/' className='text-white hover:text-green-500' onClick={toggleMenu}>Home</Link>
          <Link to='/about' className='text-white hover:text-green-500' onClick={toggleMenu}>About</Link>
          <Link to='/gallery' className='text-white hover:text-green-500' onClick={toggleMenu}>Gallery</Link>
          <Link to='/contact' className='bg-green-700 text-white px-4 py-2 rounded-full flex items-center space-x-2 hover:bg-green-900 transition ease-in' onClick={toggleMenu}>
            <span>Contact Us</span>
            <FaArrowRight />
          </Link>
        </div>
      )}
    </div>
  );
};

export default Navbar;