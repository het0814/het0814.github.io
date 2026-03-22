import React from 'react';
import { motion } from 'framer-motion';
import DPImage from '../images/DPImage.png';

const About = () => {
  const containerVariants = {
    hidden: {},
    visible: {
      transition: { staggerChildren: 0.15 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] }
    }
  };

  return (
    <div className="section-container">
      <motion.div
        className="section-header"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.6 }}
      >
        <p className="section-label">01. About</p>
        <h2 className="section-title">Get to know me</h2>
      </motion.div>

      <motion.div
        className="about-grid"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-100px' }}
      >
        <motion.div className="about-text" variants={itemVariants}>
          <p>
            Hello! I'm <strong>Het</strong>, a dedicated <strong>Computer Science</strong> graduate 
            with a specialization in <strong>Data Analytics</strong> from Sheridan College. 
            My passion lies at the intersection of <strong>artificial intelligence</strong>, 
            <strong>data science</strong>, and building real-world solutions that make an impact.
          </p>
          <p>
            I've had the privilege of working as an <strong>AI/ML Researcher</strong> at 
            Sheridan's Centre for Applied AI, an <strong>ML Developer</strong> at Naryant, 
            and an <strong>IIoT Developer</strong> at Magna International — experiences that 
            have shaped my ability to tackle complex problems from research to deployment.
          </p>
          <p>
            When I'm not coding, you'll find me exploring the latest in machine learning 
            research, building side projects, or diving into new technologies that push the 
            boundaries of what's possible.
          </p>

          <div className="about-stats">
            <div className="stat-item">
              <div className="stat-number">3+</div>
              <div className="stat-label">Years Exp</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">7+</div>
              <div className="stat-label">Projects</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">92%</div>
              <div className="stat-label">ML Accuracy</div>
            </div>
          </div>
        </motion.div>

        <motion.div className="about-image-wrapper" variants={itemVariants}>
          <div className="about-image-frame">
            <img src={DPImage} alt="Het Patel" />
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default About;
