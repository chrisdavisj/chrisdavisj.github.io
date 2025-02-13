import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaBriefcase, FaMapMarkerAlt, FaCalendarAlt } from 'react-icons/fa';
import ContentWrapper from './ContentWrapper';

function Experience() {
  const [experience, setExperience] = useState([]);

  useEffect(() => {
    fetch('/data/experience.json')
      .then((res) => res.json())
      .then((data) => setExperience(data.experience))
      .catch((error) => console.error('Error fetching experience data:', error));
  }, []);

  return (
    <ContentWrapper>
      <section id="experience" className="experience-section">
        <h2 className="experience-title">
        <FaBriefcase className="icon" /> Experience
        </h2>
        <motion.div
          className="timeline-container"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { opacity: 1, y: 0, transition: { staggerChildren: 0.2 } },
          }}
        >
          {experience.map((job, index) => (
            <motion.div
              key={index}
              className="timeline-item"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="timeline-header">
                <div className="timeline-role">{job.role}</div>
                <div className="timeline-organization">{job.organization}</div>
              </div>
              <p className="job-details">
                <FaMapMarkerAlt className="icon-location" /> {job.location}
              </p>
              <p className="job-period">
                <FaCalendarAlt className="icon-calendar" /> {job.period}
              </p>
              <ul className="job-description">
                {job.details.map((detail, idx) => (
                  <li key={idx}>{detail}</li>
                ))}
              </ul>
            </motion.div>
          ))}
        </motion.div>
      </section>
    </ContentWrapper>
  );
}

export default Experience;
