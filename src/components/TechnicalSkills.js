const skillsData = [
    { 
        category: "Programming Languages", 
        list: ["Python", "R", "C", "C++", "C#", "JavaScript"] 
    },
    { 
        category: "AI & Machine Learning", 
        list: ["LLMs", "NLP", "BERTopic", "TensorFlow", "PyTorch"] 
    },
    { 
        category: "Data Analysis & Visualization", 
        list: ["Power BI", "Tableau", "Pandas", "Matplotlib", "MS Excel"] 
    },
    { 
        category: "Big Data & Databases", 
        list: ["Hadoop", "Apache Spark", "MongoDB", "MySQL", "NoSQL", "SQLite"] 
    },
    { 
        category: "Automation & Cloud", 
        list: ["Ignition Automation", "AWS", "GCP"] 
    },
    { 
        category: "DevOps & Version Control", 
        list: ["Git", "Bitbucket", "Docker", "CI/CD"] 
    },
    { 
        category: "Web Development", 
        list: ["HTML", "CSS", "JavaScript", "ASP.NET", "Flask", "Spring Boot"] 
    },
    { 
        category: "Other Skills", 
        list: ["Project Management", "IT Operations", "Process Mapping"] 
    },
];

const SkillCard = ({ category, list }) => (
    <div className="skill-card">
        <h3 className="skill-category">{category}</h3>
        <div className="skill-tags">
            {list.map((skill, index) => (
                <span key={index} className="skill-tag">{skill}</span>
            ))}
        </div>
    </div>
);

const TechnicalSkills = () => {
  return (
    <section id="technical-skills">
      <h2 className="section-title">Technical Skills</h2>
      
      <div className="skills-grid">
        {skillsData.map((skillGroup, index) => (
            <SkillCard 
                key={index}
                category={skillGroup.category}
                list={skillGroup.list}
            />
        ))}
      </div>
    </section>
  );
};

export default TechnicalSkills;