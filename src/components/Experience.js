const experienceData = [
    {
        title: "Artificial Intelligence Researcher (Part-Time)",
        company: "Sheridan College, Centre for Applied AI (CAAI)",
        dates: "September 2024 – April 2025",
        description: [
            "Led research and development for AI/ML-based pipelines for fleet management.",
            "Worked with LLM (Large Language Models) to design a KPI scorecard system for fleet management based on industrial documents.",
            "Used BERTopic for advanced topic modeling and analysis of key insights from fleet-related reports.",
            "Conducted extensive research by reviewing academic papers, industry standards, and emerging tools in AI/ML.",
            "Worked on code, prompts, and workflows to test and validate approaches, ensuring project goals were met with quality results.",
            "Regularly communicated and presented project progress, findings, and outcomes to industry partners, ensuring alignment with business goals and collaboration."
        ]
    },
    {
        title: "AI/ML Software Developer (CO-OP)",
        company: "Naryant, Centre for Applied AI (CAAI)",
        dates: "May 2024 – September 2024",
        description: [
            "Built a CTGAN-based synthetic data generation pipeline for SUMO mobility simulations, enhancing dataset availability and realism for transportation studies.",
            "Designed, trained, and optimized machine learning models for transportation mode detection, achieving 92% improvement in classification accuracy.",
            "Collaborated closely with stakeholders to translate project requirements into actionable technical solutions, ensuring project alignment and success.",
            "Utilized Python (Pandas, Scikit-learn, TensorFlow), SUMO, and CTGAN (Generative AI Model) frameworks to deliver powerful and scalable models."
        ]
    },
    {
        title: "IIot Developer (CO-OP)",
        company: "MAGNA INTERNATIONAL",
        dates: "May 2023 – February 2024",
        description: [
            "Created Web Pages in ignition software for maintenance department to monitor various machinery status and detect faults.",
            "Modified PLC programs to retrieve live data from PLC, integrating them seamlessly into different visualization components for efficient data analysis.",
            "Successfully reduced troubleshooting time by 85% and increased monitoring accuracy by 97% through strategic improvements in processes and technology.",
            "Used python scripts to filter data appropriately to fit them into different graphs.",
            "Associated in team environment to maintain high levels of productivity.",
            "Communicated regularly with management to provide feedback and updates."
        ]
    }
];

const ExperienceItem = ({ title, company, dates, description }) => (
    <div className="experience-item">
        <div className="item-header">
            <h3 className="job-title">{title}</h3>
            <p className="job-company">{company}</p>
        </div>
        <p className="job-dates">{dates}</p>
        <ul className="job-description-list">
            {description.map((point, index) => (
                <li key={index} className="description-point">{point}</li>
            ))}
        </ul>
    </div>
);

const Experience = () => {
    return (
        <section id="experience">
            <h2 className="section-title">Experience</h2>
            <div className="experience-timeline">
                {experienceData.map((job, index) => (
                    <ExperienceItem 
                        key={index}
                        title={job.title}
                        company={job.company}
                        dates={job.dates}
                        description={job.description}
                    />
                ))}
            </div>
        </section>
    );
};

export default Experience;
