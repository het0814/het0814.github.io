import React from 'react';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { faExternalLinkAlt, faFolder } from '@fortawesome/free-solid-svg-icons';

const projectsData = [
  {
    name: "ContextIQ: RAG-based Chatbot",
    description: "Full-stack Retrieval-Augmented Generation chatbot that ingests documents, URLs, and user inputs to deliver real-time, context-aware responses using vector database retrieval and LLMs.",
    tech: ["LLMs", "RAG", "VectorDB", "Full-Stack"],
    github: "https://github.com/het0814/ContextIQ-rag-chatbot",
    live: ""
  },
  {
    name: "Climate Change Prediction",
    description: "Time series forecasting pipeline using machine learning to analyze historical climate data and predict future climate trends with data-driven insights.",
    tech: ["Time Series", "ML", "Python", "Forecasting"],
    github: "https://github.com/het0814/Climate-Change-Prediction",
    live: null
  },
  {
    name: "Synthetic Mobility Data Generation",
    description: "CTGAN-based system to generate synthetic mobility data for SUMO simulations, enhancing dataset availability and realism for transportation studies.",
    tech: ["CTGAN", "Generative AI", "SUMO", "Python"],
    github: null,
    live: null
  },
  {
    name: "Fleet Management KPI Scorecard",
    description: "Pipeline to extract and rank Key Performance Indicators from industrial documents using LLMs, BERTopic, and topic modeling techniques.",
    tech: ["LLMs", "NLP", "BERTopic", "Topic Modeling"],
    github: null,
    live: null
  },
  {
    name: "SnapCal: Food Image Classifier",
    description: "Flask-based web application to classify food images and estimate calorie content using a pre-trained Convolutional Neural Network.",
    tech: ["Flask", "CNN", "Image Classification", "Web App"],
    github: "https://github.com/het0814/Snap_Cal",
    live: ""
  },
  {
    name: "SCADA Real-Time Dashboard",
    description: "Real-time monitoring dashboard for industrial processes using Ignition software for efficient data visualization and process analysis.",
    tech: ["SCADA", "IIoT", "Ignition", "Real-Time"],
    github: null,
    live: null
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] }
  }
};

const Projects = () => {
  return (
    <div className="section-container">
      <motion.div
        className="section-header"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.6 }}
      >
        <p className="section-label">05. Projects</p>
        <h2 className="section-title">Things I've built</h2>
      </motion.div>

      <motion.div
        className="projects-grid"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-50px' }}
      >
        {projectsData.map((project, index) => (
          <motion.div key={index} className="project-card" variants={itemVariants}>
            <div className="project-card-top">
              <FontAwesomeIcon icon={faFolder} className="project-folder-icon" />
              <div className="project-external-links">
                {project.github && (
                  <a href={project.github} target="_blank" rel="noopener noreferrer" className="project-ext-link" aria-label="GitHub">
                    <FontAwesomeIcon icon={faGithub} />
                  </a>
                )}
                {project.live && (
                  <a href={project.live} target="_blank" rel="noopener noreferrer" className="project-ext-link" aria-label="Live Demo">
                    <FontAwesomeIcon icon={faExternalLinkAlt} />
                  </a>
                )}
              </div>
            </div>

            <h3 className="project-card-title">{project.name}</h3>
            <p className="project-card-description">{project.description}</p>

            <div className="project-tech-list">
              {project.tech.map((t, i) => (
                <span key={i} className="project-tech-item">{t}</span>
              ))}
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default Projects;