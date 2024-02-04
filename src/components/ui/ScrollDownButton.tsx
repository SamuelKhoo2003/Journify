'use client'
import React from 'react';
import { FaArrowDown } from 'react-icons/fa'; // Make sure to import the icon

const ScrollDownButton = ({ targetId }) => {
  const scrollToTarget = () => {
    const target = document.getElementById(targetId);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <button 
      onClick={scrollToTarget}
      style={{
        position: 'fixed',
        bottom: '20px',
        left: '50%', // Set the left edge to be in the center of the screen
        transform: 'translateX(-50%)', // Shift button left by half its width to center it
        width: '50px',
        height: '50px',
        borderRadius: '50%',
        backgroundColor: '#9F8272',
        color: 'white',
        border: 'none',
        cursor: 'pointer',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 49,
      }}
      aria-label="Scroll down"
    >
      <FaArrowDown />
    </button>
  );
};

export default ScrollDownButton;