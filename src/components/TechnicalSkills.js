import React from 'react';
import { motion } from 'framer-motion';

const skillsData = [
  {
    category: "Programming Languages",
    list: ["Python", "R", "C", "C++", "C#", "JavaScript"]
  },
  {
    category: "AI & Machine Learning",
    list: ["LLMs", "NLP", "BERTopic", "TensorFlow", "PyTorch", "Scikit-learn"]
  },
  {
    category: "Data & Visualization",
    list: ["Power BI", "Tableau", "Pandas", "Matplotlib", "MS Excel"]
  },
  {
    category: "Big Data & Databases",
    list: ["Hadoop", "Apache Spark", "MongoDB", "MySQL", "NoSQL", "SQLite"]
  },
  {
    category: "Cloud & DevOps",
    list: ["AWS", "GCP", "Docker", "Git", "CI/CD", "Bitbucket"]
  },
  {
    category: "Web Development",
    list: ["React", "HTML/CSS", "Flask", "ASP.NET", "Spring Boot", "Node.js"]
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

const TechnicalSkills = () => {
  return (
    <div className="section-container">
      <motion.div
        className="section-header"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.6 }}
      >
        <p className="section-label">04. Skills</p>
        <h2 className="section-title">Technologies I work with</h2>
      </motion.div>

      <motion.div
        className="skills-categories"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-50px' }}
      >
        {skillsData.map((group, index) => (
          <motion.div key={index} className="skill-group" variants={itemVariants}>
            <h3 className="skill-group-title">{group.category}</h3>
            <div className="skill-tags-list">
              {group.list.map((skill, i) => (
                <span key={i} className="skill-tag">{skill}</span>
              ))}
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default TechnicalSkills;