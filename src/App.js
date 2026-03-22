import React, { useRef, useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Hero from './components/Hero';
import About from './components/About';
import Experience from './components/Experience';
import Education from './components/Education';
import TechnicalSkills from './components/TechnicalSkills';
import Projects from './components/Projects';
import Contact from './components/Contact';
import './App.css';

const navItems = [
  { name: 'About', id: 'about', number: '01' },
  { name: 'Experience', id: 'experience', number: '02' },
  { name: 'Education', id: 'education', number: '03' },
  { name: 'Skills', id: 'skills', number: '04' },
  { name: 'Projects', id: 'projects', number: '05' },
  { name: 'Contact', id: 'contact', number: '06' },
];

const App = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [loaderProgress, setLoaderProgress] = useState(0);
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  const [cursorHovering, setCursorHovering] = useState(false);

  const sectionRefs = {
    about: useRef(null),
    experience: useRef(null),
    education: useRef(null),
    skills: useRef(null),
    projects: useRef(null),
    contact: useRef(null),
  };

  // Page loader
  useEffect(() => {
    let progress = 0;
    const interval = setInterval(() => {
      progress += Math.random() * 30 + 10;
      if (progress >= 100) {
        progress = 100;
        setLoaderProgress(100);
        clearInterval(interval);
        setTimeout(() => setLoading(false), 400);
      } else {
        setLoaderProgress(progress);
      }
    }, 200);
    return () => clearInterval(interval);
  }, []);

  // Scroll listener
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 60);

      // Scroll spy
      const sections = Object.entries(sectionRefs);
      for (const [id, ref] of sections.reverse()) {
        if (ref.current) {
          const rect = ref.current.getBoundingClientRect();
          if (rect.top <= window.innerHeight / 3) {
            setActiveSection(id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Custom cursor
  useEffect(() => {
    const handleMouseMove = (e) => {
      setCursorPos({ x: e.clientX, y: e.clientY });
    };

    const handleHoverStart = () => setCursorHovering(true);
    const handleHoverEnd = () => setCursorHovering(false);

    window.addEventListener('mousemove', handleMouseMove);

    const interactives = document.querySelectorAll('a, button, .project-card, .skill-tag, .experience-card');
    interactives.forEach(el => {
      el.addEventListener('mouseenter', handleHoverStart);
      el.addEventListener('mouseleave', handleHoverEnd);
    });

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      interactives.forEach(el => {
        el.removeEventListener('mouseenter', handleHoverStart);
        el.removeEventListener('mouseleave', handleHoverEnd);
      });
    };
  });

  const scrollToSection = useCallback((id) => {
    const ref = sectionRefs[id];
    if (ref && ref.current) {
      ref.current.scrollIntoView({ behavior: 'smooth' });
      setMobileMenuOpen(false);
    }
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Animation variants
  const pageVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] }
    }
  };

  return (
    <>
      {/* Page Loader */}
      <AnimatePresence>
        {loading && (
          <motion.div
            className="page-loader"
            exit={{ opacity: 0, transition: { duration: 0.5 } }}
          >
            <div className="loader-text">Het Patel</div>
            <div className="loader-bar-track">
              <motion.div
                className="loader-bar-fill"
                animate={{ width: `${loaderProgress}%` }}
                transition={{ duration: 0.3, ease: 'easeOut' }}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Custom Cursor */}
      <div
        className={`custom-cursor ${cursorHovering ? 'hovering' : ''}`}
        style={{ left: cursorPos.x, top: cursorPos.y }}
      />

      {/* Noise Overlay */}
      <div className="noise-overlay" />
      <div className="dot-texture" />

      {!loading && (
        <motion.div
          className="app-container"
          variants={pageVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Navigation */}
          <header className={`site-nav ${isScrolled ? 'scrolled' : ''}`}>
            <div className="nav-logo" onClick={scrollToTop}>
              <span>H</span>et Patel
            </div>

            <nav className={`nav-links ${mobileMenuOpen ? 'mobile-open' : ''}`}>
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`nav-link ${activeSection === item.id ? 'active' : ''}`}
                >
                  <span className="nav-link-number">{item.number}.</span>
                  {item.name}
                </button>
              ))}
              <a
                href="Resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="nav-resume-btn"
              >
                Resume
              </a>
            </nav>

            <button
              className={`mobile-menu-toggle ${mobileMenuOpen ? 'open' : ''}`}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
            >
              <span className="menu-bar" />
              <span className="menu-bar" />
              <span className="menu-bar" />
            </button>
          </header>

          {/* Main Content */}
          <main className="main-content">
            <Hero />

            <section ref={sectionRefs.about} id="about" className="content-section">
              <About />
            </section>

            <section ref={sectionRefs.experience} id="experience" className="content-section">
              <Experience />
            </section>

            <section ref={sectionRefs.education} id="education" className="content-section">
              <Education />
            </section>

            <section ref={sectionRefs.skills} id="skills" className="content-section">
              <TechnicalSkills />
            </section>

            <section ref={sectionRefs.projects} id="projects" className="content-section">
              <Projects />
            </section>

            <section ref={sectionRefs.contact} id="contact">
              <Contact />
            </section>
          </main>

          {/* Footer */}
          <footer className="site-footer">
            <p className="footer-text">
              Designed & Built by <a href="https://github.com/het0814" target="_blank" rel="noopener noreferrer">Het Patel</a>
            </p>
          </footer>
        </motion.div>
      )}
    </>
  );
};

export default App;