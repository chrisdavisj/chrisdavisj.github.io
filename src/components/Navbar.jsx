import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { FaUserAlt, FaBriefcase, FaProjectDiagram, FaBook, FaEnvelope } from 'react-icons/fa';

function Navbar() {
  const [visible, setVisible] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const hoverTimeout = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      const heroSection = document.getElementById('hero');
      if (heroSection) {
        const heroVisible = heroSection.getBoundingClientRect().bottom > heroSection.getBoundingClientRect().height / 3;
        setVisible(!heroVisible);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleMouseEnter = () => {
    if (hoverTimeout.current) {
      clearTimeout(hoverTimeout.current);
    }
    setExpanded(true);
  };

  const handleMouseLeave = () => {
    hoverTimeout.current = setTimeout(() => {
      setExpanded(false);
    }, 300); // Delay before collapsing
  };

  const handleSmoothScroll = (e, targetId) => {
    e.preventDefault();
    const targetElement = document.getElementById(targetId);
    if (targetElement) {
      window.scrollTo({
        top: targetElement.offsetTop - 50, // Adjust for fixed navbar height if necessary
        behavior: 'smooth',
      });
    }
  };

  const menuItems = [
    { name: 'Skills', icon: <FaUserAlt /> },
    { name: 'Experience', icon: <FaBriefcase /> },
    { name: 'Projects', icon: <FaProjectDiagram /> },
    { name: 'Publications', icon: <FaBook /> },
    { name: 'Contact', icon: <FaEnvelope /> },
  ];

  return (
    <motion.nav
      className={`navbar ${visible ? 'visible' : 'hidden'} ${expanded ? 'expanded' : 'collapsed'}`}
      initial={false}
      animate={{ x: visible || expanded ? 0 : '-90%', opacity: visible ? 1 : 0 }}
      transition={{ duration: 0.75 }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <ul className="navbar-list">
        {menuItems.map((item, index) => (
          <motion.li
            key={index}
            whileHover={{ scale: 1.1, rotate: 2 }}
            className="navbar-item"
          >
            <a
              href={`#${item.name.toLowerCase()}`}
              className="navbar-link"
              tabIndex={0}
              onClick={(e) => handleSmoothScroll(e, item.name.toLowerCase())}
            >
              {expanded ? item.name : item.icon}
            </a>
          </motion.li>
        ))}
      </ul>
    </motion.nav>
  );
}

export default Navbar;
