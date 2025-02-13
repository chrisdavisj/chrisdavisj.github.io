import React from 'react';
import { motion } from 'framer-motion';

function Hero() {
  const handleSmoothScroll = (e, targetId) => {
    e.preventDefault();
    const targetElement = document.getElementById(targetId);
    if (targetElement) {
      window.scrollTo({
        top: targetElement.offsetTop,
        behavior: 'smooth',
      });
    }
  };

  const scrollByPercent = () => {
    window.scrollBy({
      top: window.innerHeight * 0.7,
      behavior: 'smooth',
    });
  };

  return (
    <section id="hero" className="hero-section">
      {/* Background Animation */}
      <motion.div
        className="hero-background"
        animate={{
          backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
      ></motion.div>

      {/* Profile Image */}
      <motion.div
        className="hero-image-wrapper"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.5 }}
      >
        <img
          src="https://ca.slack-edge.com/T0403ND1REU-U07H3R0JCNL-0f5f53443584-512"
          alt="Profile"
          className="hero-image"
        />
      </motion.div>

      {/* Title and Subtitle */}
      <motion.h1
        className="hero-title"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 1 }}
      >
        Chris Davis Jaldi
      </motion.h1>
      <motion.p
        className="hero-subtitle"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7, duration: 1 }}
      >
        Developer | Computer Science | Researcher
      </motion.p>

      {/* Call to Action Buttons */}
      <motion.div
        className="hero-buttons"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
      >
        <button className="hero-button projects-button" onClick={scrollByPercent}>
          Explore
        </button>
        <button className="hero-button contact-button" onClick={(e) => handleSmoothScroll(e, 'contact')}>
        Contact Me
        </button>
        
      </motion.div>

      {/* Decorative Elements */}
      <motion.div
        className="decorative-circle small"
        initial={{ y: -10 }}
        animate={{ y: 10 }}
        transition={{ repeat: Infinity, duration: 2, repeatType: "reverse" }}
      ></motion.div>
      <motion.div
        className="decorative-circle large"
        initial={{ y: -10 }}
        animate={{ y: 10 }}
        transition={{ repeat: Infinity, duration: 3, repeatType: "reverse" }}
      ></motion.div>
    </section>
  );
}

export default Hero;
