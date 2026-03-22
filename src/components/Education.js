import React from 'react';
import { motion } from 'framer-motion';

const educationData = [
  {
    degree: "Honours Bachelor of Computer Science",
    specialization: "Specialization in Data Analytics",
    school: "Sheridan College",
    year: "2021 — 2025",
    details: "Relevant coursework: Machine Learning, Data Structures, Algorithms, Database Systems, Big Data Analytics, Statistical Methods, Software Engineering"
  }
];

const certificationsData = [
  "AWS Cloud Practitioner Fundamentals",
  "Google Data Analytics Professional Certificate",
  "TensorFlow Developer Certificate",
];

const Education = () => {
  return (
    <div className="section-container">
      <motion.div
        className="section-header"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.6 }}
      >
        <p className="section-label">03. Education</p>
        <h2 className="section-title">Academic background</h2>
      </motion.div>

      <div className="education-list">
        {educationData.map((edu, index) => (
          <motion.div
            key={index}
            className="education-card"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <div className="education-card-header">
              <h3 className="education-degree">{edu.degree}</h3>
              <span className="education-year">{edu.year}</span>
            </div>
            <p className="education-school">{edu.school}</p>
            {edu.specialization && (
              <p className="education-detail" style={{ marginBottom: '8px', fontWeight: 500, color: '#e8e8e8' }}>
                {edu.specialization}
              </p>
            )}
            <p className="education-detail">{edu.details}</p>
          </motion.div>
        ))}

        {certificationsData.length > 0 && (
          <motion.div
            className="education-card"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h3 className="education-degree" style={{ marginBottom: '16px' }}>Certifications</h3>
            <ul style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {certificationsData.map((cert, i) => (
                <li key={i} style={{
                  paddingLeft: '20px',
                  position: 'relative',
                  fontSize: '0.92rem',
                  color: '#888',
                  lineHeight: '1.6',
                }}>
                  <span style={{ position: 'absolute', left: 0, color: '#00d2be', fontSize: '0.85rem' }}>▹</span>
                  {cert}
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Education;
