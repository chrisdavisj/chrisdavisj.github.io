import React, { useState, useEffect, useMemo, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaGithub, FaChevronDown, FaChevronUp, FaMobileAlt, FaBrain, FaMapMarkedAlt, FaHeartbeat, FaUniversity, FaProjectDiagram, FaCode } from 'react-icons/fa';

function Projects() {
  const [projects, setProjects] = useState([]);
  const [showAll, setShowAll] = useState(false);
  const [cols, setCols] = useState(1);
  const [rowsVisible, setRowsVisible] = useState(1);
  const gridRef = useRef(null);
  const [brokenThumbs, setBrokenThumbs] = useState(() => new Set());

  useEffect(() => {
    fetch('/data/projects.json')
      .then((res) => res.json())
      .then((data) => setProjects(data.projects));
  }, []);

  // 2 rows on mobile, 1 row on desktop (same as Publications)
  useEffect(() => {
    const computeRows = () => setRowsVisible(window.innerWidth <= 768 ? 2 : 1);
    computeRows();
    window.addEventListener('resize', computeRows);
    return () => window.removeEventListener('resize', computeRows);
  }, []);

  // Measure grid columns like Publications
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

  const collapsedCapacity = rowsVisible * cols;
  const toggleNeeded = projects.length > collapsedCapacity;

  const visibleCount = showAll ? projects.length : collapsedCapacity;
  const visibleProjects = useMemo(
    () => projects.slice(0, visibleCount),
    [projects, visibleCount]
  );

  const getProjectIcon = (project) => {
    // Todo: improve with keywords to semantic matching
    var text = `${project.name} ${project.description}`;

    if (text.includes('AI') || text.includes('ML') || text.includes('LLM'))
      return <FaBrain size={36} />;
    
    text = text.toLowerCase();

    if (text.includes('mobile') || text.includes('ios') || text.includes('android'))
      return <FaMobileAlt size={36} />;

    if (text.includes('health') || text.includes('covid'))
      return <FaHeartbeat size={36} />;

    if (text.includes('transport') || text.includes('map'))
      return <FaMapMarkedAlt size={36} />;

    if (text.includes('education') || text.includes('campus'))
      return <FaUniversity size={36} />;

    if (text.includes('graph'))
      return <FaProjectDiagram size={36} />;

    return <FaCode size={36} />; // default};
  };

  return (
    <section id="projects" className="projects-section">
      <div className="projects-container">
        <motion.h2
          className="projects-title"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Projects
        </motion.h2>

        <div className="relative">
          {!showAll && toggleNeeded && <div className="projects-fade-overlay" aria-hidden="true" />}

          <motion.div
            ref={gridRef}
            className="projects-grid"
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: { staggerChildren: 0.2 },
              },
            }}
          >
            <AnimatePresence>
              {visibleProjects.map((project, index) => (
                <motion.div
                  key={`${project.name}-${index}`}
                  className="project-card"
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ delay: showAll ? 0 : index * 0.2, duration: 0.5 }}
                >
                  <div className="project-image-wrapper">
                    {project.thumbnail && !brokenThumbs.has(`${project.name}-${index}`) ? (
                      <img
                        src={project.thumbnail}
                        alt={project.name}
                        className="project-image"
                        onError={() => {
                          setBrokenThumbs((prev) => {
                            const next = new Set(prev);
                            next.add(`${project.name}-${index}`);
                            return next;
                          });
                        }}
                      />
                    ) : (
                      <div className="project-icon-fallback" aria-label={`${project.name} icon`}>
                        {getProjectIcon(project)}
                      </div>
                    )}
                  </div>

                  <h3 className="project-name">{project.name}</h3>
                  <p className="project-description">{project.description}</p>
                  <div className="project-link-wrapper">
                    <a
                      href={project.repo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="project-link"
                    >
                      <FaGithub className="inline-block mr-2" /> Source
                    </a>
                  </div>
                </motion.div>
              ))}

              {toggleNeeded && (
                <motion.div
                  key="projects-toggle"
                  className="grid-toggle-cell"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <button
                    className="icon-toggle-btn"
                    onClick={() => setShowAll((s) => !s)}
                    aria-expanded={showAll}
                    aria-label={showAll ? 'Show fewer projects' : 'Show more projects'}
                    title={showAll ? 'Show less' : 'Show more'}
                    type="button"
                  >
                    {showAll ? (
                      <FaChevronUp size={5} aria-hidden="true" />
                    ) : (
                      <FaChevronDown size={5} aria-hidden="true" />
                    )}
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default Projects;
