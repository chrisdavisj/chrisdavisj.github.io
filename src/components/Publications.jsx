import React, { useState, useEffect, useMemo, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaBook, FaChalkboardTeacher, FaJournalWhills, FaGlobe, FaMicrophone, FaSearch, FaChevronDown, FaChevronUp } from 'react-icons/fa';

function Publications() {
  const [publications, setPublications] = useState([]);
  const [showAll, setShowAll] = useState(false);
  const [cols, setCols] = useState(1);
  const [rowsVisible, setRowsVisible] = useState(1);
  const gridRef = useRef(null);

  useEffect(() => {
    fetch('/data/publications.json')
      .then((res) => res.json())
      .then((data) => setPublications(data.publications));
  }, []);

  useEffect(() => {
    const computeRows = () => setRowsVisible(window.innerWidth <= 768 ? 2 : 1);
    computeRows();
    window.addEventListener('resize', computeRows);
    return () => window.removeEventListener('resize', computeRows);
  }, []);

  useEffect(() => {
    if (!gridRef.current) return;
    const computeCols = () => {
      const style = window.getComputedStyle(gridRef.current);
      const template = style.getPropertyValue('grid-template-columns') || '';
      const count = template
        .split(' ')
        .filter((t) => t.trim() && t.trim() !== '/').length;
      setCols(Math.max(1, count));
    };
    computeCols();
    const ro = new ResizeObserver(() => computeCols());
    ro.observe(gridRef.current);
    window.addEventListener('resize', computeCols);
    return () => {
      ro.disconnect();
      window.removeEventListener('resize', computeCols);
    };
  }, []);

  const getIcon = (type) => {
    switch (type) {
      case 'conference_proceeding':   return <FaBook className="icon-conference-proceeding" />;
      case 'conference_presentation': return <FaChalkboardTeacher className="icon-conference-presentation" />;
      case 'journal_article':         return <FaJournalWhills className="icon-journal-article" />;
      case 'book_chapter':            return <FaGlobe className="icon-book-chapter" />;
      case 'invited_talk':            return <FaMicrophone className="icon-invited-talk" />;
      default:                        return <FaBook className="icon-other-publication" />;
    }
  };

  const formatType = (type) => {
    switch (type) {
      case 'conference_proceeding':   return 'Conference Proceeding';
      case 'conference_presentation': return 'Conference Presentation';
      case 'journal_article':         return 'Journal Article';
      case 'book_chapter':            return 'Book Chapter';
      case 'invited_talk':            return 'Invited Talk';
      default:                        return 'Other Publication';
    }
  };

  const handleSearch = (title) => {
    const query = encodeURIComponent(title);
    window.open(`https://scholar.google.com/scholar?q=${query}`, '_blank');
  };

  const collapsedCapacity = rowsVisible * cols;
  const toggleNeeded = publications.length > collapsedCapacity;

  const visibleCount = showAll ? publications.length : collapsedCapacity;
  const visiblePubs = useMemo(
    () => publications.slice(0, visibleCount),
    [publications, visibleCount]
  );
  const remaining = Math.max(0, publications.length - visibleCount);

  return (
    <section id="publications" className="section-publications padding-adjusted">
      <div className="publications-header">
        <h2 className="publications-title">Publications</h2>
        <p className="publications-description">Explore my diverse range of academic contributions.</p>
      </div>

      <div className="relative">
        {!showAll && toggleNeeded && <div className="pubs-fade-overlay" aria-hidden="true" />}

        <motion.div
          ref={gridRef}
          className="publications-grid"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { opacity: 1, y: 0, transition: { staggerChildren: 0.2 } },
          }}
        >
          <AnimatePresence>
            {visiblePubs.map((pub, index) => (
              <motion.div
                key={`${pub.title}-${index}`}
                className="publication-card relative cursor-pointer"
                whileHover={{ scale: 1.05 }}
                onClick={() => handleSearch(pub.title)}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.2 }}
              >
                <div className="publication-header">
                  {getIcon(pub.type)}
                  <h3 className="publication-title">{pub.title || `Publication ${index + 1}`}</h3>
                </div>
                <p className="publication-type">{formatType(pub.type)}</p>
                <p className="publication-citation">{pub.citation}</p>
              </motion.div>
            ))}

            {toggleNeeded && (
              <motion.div
                key="pubs-toggle"
                className="grid-toggle-cell"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <button
                  className="icon-toggle-btn"
                  onClick={() => setShowAll((s) => !s)}
                  aria-expanded={showAll}
                  aria-label={showAll ? 'Show fewer publications' : 'Show more publications'}
                  title={showAll ? 'Show less' : 'Show more'}
                  type="button"
                >
                  {showAll ? <FaChevronUp size={5} aria-hidden="true" /> : <FaChevronDown size={5} aria-hidden="true" />}
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}

export default Publications;
