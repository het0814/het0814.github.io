import React, { useEffect, useState, Suspense } from 'react';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import HeroScene from './HeroScene';

const Hero = () => {
  const [typedText, setTypedText] = useState('');
  const [sentenceIndex, setSentenceIndex] = useState(0);

  const sentences = [
    "AI/ML Developer",
    "Data Science Enthusiast",
    "Full-Stack Engineer",
    "Machine Learning Researcher",
  ];

  useEffect(() => {
    let charIdx = 0;
    let isDeleting = false;
    let timeout;

    const type = () => {
      const current = sentences[sentenceIndex];
      if (!isDeleting) {
        setTypedText(current.substring(0, charIdx + 1));
        charIdx++;
        if (charIdx === current.length) {
          timeout = setTimeout(() => {
            isDeleting = true;
            type();
          }, 2000);
          return;
        }
        timeout = setTimeout(type, 80);
      } else {
        setTypedText(current.substring(0, charIdx - 1));
        charIdx--;
        if (charIdx === 0) {
          isDeleting = false;
          setSentenceIndex((prev) => (prev + 1) % sentences.length);
          return;
        }
        timeout = setTimeout(type, 40);
      }
    };

    type();
    return () => clearTimeout(timeout);
  }, [sentenceIndex]);

  const containerVariants = {
    hidden: {},
    visible: {
      transition: { staggerChildren: 0.12, delayChildren: 0.3 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] }
    }
  };

  return (
    <section className="hero-section" id="hero">
      {/* Background elements */}
      <div className="hero-grid-bg" />
      <div className="hero-ambient" />

      {/* 3D Model */}
      <Suspense fallback={null}>
        <HeroScene />
      </Suspense>

      <motion.div
        className="hero-content"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.p className="hero-greeting" variants={itemVariants}>
          Hi, my name is
        </motion.p>

        <motion.h1 className="hero-name" variants={itemVariants}>
          Het Patel<span className="hero-name-accent">.</span>
        </motion.h1>

        <motion.h2 className="hero-tagline" variants={itemVariants}>
          I build things with data & code.
        </motion.h2>

        <motion.div className="hero-typing-wrapper" variants={itemVariants}>
          <p className="hero-typing">
            {'> '}<span className="typed-text">{typedText}</span>
            <span className="cursor-blink">|</span>
          </p>
        </motion.div>

        <motion.p className="hero-description" variants={itemVariants}>
          I'm a <strong>Computer Science</strong> graduate specializing in{' '}
          <strong>Data Analytics</strong>, passionate about leveraging{' '}
          <strong>AI and machine learning</strong> to solve complex problems 
          and drive data-driven decisions.
        </motion.p>

        <motion.div className="hero-cta-group" variants={itemVariants}>
          <a
            href="mailto:hetkumar.patel1403@gmail.com"
            className="btn-primary"
          >
            <FontAwesomeIcon icon={faEnvelope} />
            Get in Touch
          </a>
          <a
            href="Resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-secondary"
          >
            View Resume
          </a>
        </motion.div>

        <motion.div className="hero-social-links" variants={itemVariants}>
          <a href="https://github.com/het0814" target="_blank" rel="noopener noreferrer" className="hero-social-link" aria-label="GitHub">
            <FontAwesomeIcon icon={faGithub} />
          </a>
          <a href="https://linkedin.com/in/h3t08" target="_blank" rel="noopener noreferrer" className="hero-social-link" aria-label="LinkedIn">
            <FontAwesomeIcon icon={faLinkedin} />
          </a>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <div className="scroll-indicator">
        <span>scroll</span>
        <div className="scroll-indicator-line" />
      </div>
    </section>
  );
};

export default Hero;