import React from 'react';
import { FaMapMarkerAlt } from 'react-icons/fa';
import { AiFillTwitterCircle, AiFillFacebook, AiFillInstagram } from 'react-icons/ai';
import './Footer.css'; // Custom CSS file for styling

const Footer = () => {
  const currentPath = window.location.pathname;

  return (
    <footer className="footer">
      <div className="footer-left">
        <div className="footer-location">
          <FaMapMarkerAlt className="location-icon" />
          <p>733 Highway 287 N, Suite 403 Mansfield, Tx 76063-3867</p>
        </div>
        <p>{currentPath}</p>
      </div>
      <div className="footer-right">
        {/* Placeholder for the map */}
        <iframe
          title="Location Map"
          width="250"
          height="200"
          frameBorder="0"
          style={{ border: 0 }}
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3351.1234591669803!2d-97.11381868480716!3d32.57930998099924!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x864e798ded8eeb13%3A0xd13878bf1b186a57!2s733%20Highway%20287%20N%2C%20Mansfield%2C%20TX%2076063%2C%20USA!5e0!3m2!1sen!2sca!4v1624591234567!5m2!1sen!2sca"
          allowFullScreen=""
        ></iframe>
      </div>
      <div className="footer-social">
        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer"><AiFillTwitterCircle className="social-icon" /></a>
        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer"><AiFillFacebook className="social-icon" /></a>
        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer"><AiFillInstagram className="social-icon" /></a>
      </div>
    </footer>
  );
}

export default Footer;
