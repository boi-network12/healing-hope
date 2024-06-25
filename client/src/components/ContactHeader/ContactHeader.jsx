import React, { useState, useEffect } from 'react';
import './ContactHeader.css';

const ContactHeader = () => {
  const [typedText, setTypedText] = useState('');

  // Text to simulate typing effect
  const textToType = 'Contact Us';

  useEffect(() => {
    let currentIndex = 0;
    const interval = setInterval(() => {
      if (currentIndex <= textToType.length) {
        setTypedText(textToType.slice(0, currentIndex));
        currentIndex++;
      } else {
        clearInterval(interval);
      }
    }, 100); // Adjust the interval speed here (milliseconds)

    // Clean up interval on unmount or re-render
    return () => clearInterval(interval);
  }, []); // Run effect only once on component mount

  return (
    <div className='aboutHeader'>
      <h1>{typedText}</h1>
    </div>
  );
};

export default ContactHeader;
