import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import ContentWrapper from './ContentWrapper';
import {
  FaCode,
  FaDatabase,
  FaCogs,
  FaTools,
  FaReact,
  FaPython,
  FaAws,
  FaMicrosoft,
  FaBrain,
  FaProjectDiagram,
} from 'react-icons/fa';

function Skills() {
  const [skills, setSkills] = useState({ research: [], technical: [], certifications: [] });

  useEffect(() => {
    fetch('/data/skills.json')
      .then((res) => res.json())
      .then((data) => setSkills(data.skills));
  }, []);

  const iconMap = {
    "Research Areas": FaBrain,
    "Programming Languages": FaCode,
    "Databases": FaDatabase,
    "Tools & Frameworks": FaCogs,
    "Cloud Services": FaAws,
    "Certifications": FaMicrosoft,
    "Other Skills": FaTools,
  };

  const categoryOrder = ["Research Areas", "Programming Languages", "Databases", "Tools & Frameworks", "Cloud Services", "Certifications", "Other Skills"];

  return (
    <ContentWrapper>
      <section id="skills" className="skills-section">
        <h2 className="skills-title">My Research, Skills & Certifications</h2>
        <p className="skills-description">Discover the breadth of my research expertise, technical skills, and certifications.</p>
        <div className="skills-container">
          {categoryOrder.map((category, catIndex) => (
            skills[category]?.length > 0 && (
              <div key={catIndex} className="skills-category">
                <motion.h3
                  className="category-title"
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  {iconMap[category] ? React.createElement(iconMap[category], { className: 'category-icon' }) : null}
                  {category}
                </motion.h3>
                <motion.div
                  className="category-grid"
                  initial="hidden"
                  animate="visible"
                  variants={{
                    hidden: { opacity: 0, scale: 0.8 },
                    visible: { opacity: 1, scale: 1, transition: { staggerChildren: 0.2 } },
                  }}
                >
                  {skills[category].map((item, index) => (
                    <motion.div
                      key={index}
                      className="skill-card"
                      whileHover={{ scale: 1.1 }}
                    >
                      <h4 className="skill-name">{item}</h4>
                    </motion.div>
                  ))}
                </motion.div>
              </div>
            )
          ))}
        </div>
      </section>
    </ContentWrapper>
  );
}

export default Skills;
