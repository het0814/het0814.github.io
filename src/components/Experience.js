import React from 'react';
import { motion } from 'framer-motion';

const experienceData = [
  {
    title: "Artificial Intelligence Researcher",
    type: "Part-Time",
    company: "Sheridan College, Centre for Applied AI (CAAI)",
    dates: "Sep 2024 — Apr 2025",
    description: [
      "Led R&D for AI/ML-based pipelines for fleet management systems",
      "Designed KPI scorecard systems using LLMs for industrial document analysis",
      "Applied BERTopic for advanced topic modeling and insight extraction",
      "Conducted extensive research reviewing academic papers and industry standards",
      "Presented findings and progress to industry partners regularly",
    ]
  },
  {
    title: "AI/ML Software Developer",
    type: "CO-OP",
    company: "Naryant, Centre for Applied AI (CAAI)",
    dates: "May 2024 — Sep 2024",
    description: [
      "Built CTGAN-based synthetic data generation pipeline for SUMO mobility simulations",
      "Designed and optimized ML models achieving 92% improvement in classification accuracy",
      "Collaborated with stakeholders to translate requirements into technical solutions",
      "Utilized Python (Pandas, Scikit-learn, TensorFlow), SUMO, and CTGAN frameworks",
    ]
  },
  {
    title: "IIoT Developer",
    type: "CO-OP",
    company: "Magna International",
    dates: "May 2023 — Feb 2024",
    description: [
      "Created monitoring dashboards in Ignition for real-time machinery status tracking",
      "Modified PLC programs for live data retrieval and visualization integration",
      "Reduced troubleshooting time by 85% and increased monitoring accuracy by 97%",
      "Developed Python scripts for data filtering and visualization pipelines",
    ]
  }
];

const Experience = () => {
  return (
    <div className="section-container">
      <motion.div
        className="section-header"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.6 }}
      >
        <p className="section-label">02. Experience</p>
        <h2 className="section-title">Where I've worked</h2>
      </motion.div>

      <div className="experience-list">
        {experienceData.map((job, index) => (
          <motion.div
            key={index}
            className="experience-card"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <div className="experience-card-header">
              <h3 className="experience-role">
                {job.title} <span className="at-company">@ {job.company}</span>
              </h3>
              <span className="experience-dates">{job.dates}</span>
            </div>
            <ul className="experience-bullets">
              {job.description.map((point, i) => (
                <li key={i}>{point}</li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Experience;
