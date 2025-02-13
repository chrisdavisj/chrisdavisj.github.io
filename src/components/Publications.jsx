// Redesigned Publications Component with Google Scholar Integration
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaBook, FaChalkboardTeacher, FaJournalWhills, FaGlobe, FaMicrophone, FaSearch } from 'react-icons/fa';

function Publications() {
  const [publications, setPublications] = useState([]);

  useEffect(() => {
    fetch('/src/data/publications.json')
      .then((res) => res.json())
      .then((data) => setPublications(data.publications));
  }, []);

  const getIcon = (type) => {
    switch (type) {
      case 'conference_proceeding':
        return <FaBook className="icon-conference-proceeding" />;
      case 'conference_presentation':
        return <FaChalkboardTeacher className="icon-conference-presentation" />;
      case 'journal_article':
        return <FaJournalWhills className="icon-journal-article" />;
      case 'book_chapter':
        return <FaGlobe className="icon-book-chapter" />;
      case 'invited_talk':
        return <FaMicrophone className="icon-invited-talk" />;
      default:
        return <FaBook className="icon-other-publication" />;
    }
  };

  const formatType = (type) => {
    switch (type) {
      case 'conference_proceeding':
        return 'Conference Proceeding';
      case 'conference_presentation':
        return 'Conference Presentation';
      case 'journal_article':
        return 'Journal Article';
      case 'book_chapter':
        return 'Book Chapter';
      case 'invited_talk':
        return 'Invited Talk';
      default:
        return 'Other Publication';
    }
  };

  const handleSearch = (title) => {
    const query = encodeURIComponent(title);
    window.open(`https://scholar.google.com/scholar?q=${query}`, '_blank');
  };

  return (
    <section id="publications" className="section-publications padding-adjusted">
      <div className="publications-header">
        <h2 className="publications-title">Publications</h2>
        <p className="publications-description">Explore my diverse range of academic contributions.</p>
      </div>
      <motion.div
        className="publications-grid"
        initial="hidden"
        animate="visible"
        variants={{
          hidden: { opacity: 0, y: 20 },
          visible: { opacity: 1, y: 0, transition: { staggerChildren: 0.2 } },
        }}
      >
        {publications.map((pub, index) => (
          <motion.div
            key={index}
            className="publication-card relative cursor-pointer"
            whileHover={{ scale: 1.05 }}
            onClick={() => handleSearch(pub.title)}
          >
            <div className="publication-header">
              {getIcon(pub.type)}
              <h3 className="publication-title">{pub.title || `Publication ${index + 1}`}</h3>
            </div>
            <p className="publication-type">{formatType(pub.type)}</p>
            <p className="publication-citation">{pub.citation}</p>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}

export default Publications;
