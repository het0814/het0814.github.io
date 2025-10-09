import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { faExternalLinkAlt } from '@fortawesome/free-solid-svg-icons';

const projectsData = [
    {
        name: "ContextIQ: RAG-based Chatbot",
        description: "Built a full-stack Retrieval-Augmented Generation (RAG) chatbot that ingests documents, URLs, and user inputs to deliver real-time, context-aware responses using vector database retrieval and LLMs.",
        tech: ["LLMs", "RAG", "VectorDB", "Full-Stack"],
        github: "https://github.com/het0814/ContextIQ-rag-chatbot", // ⬅️ UPDATE THIS LINK
        live: "" // ⬅️ UPDATE THIS LINK
    },
    {
        name: "Climate Change Prediction",
        description: "Developed a time series forecasting pipeline using machine learning to analyze historical climate data and predict future climate trends, enabling data-driven insights into climate pattern shifts.",
        tech: ["Time Series", "Machine Learning", "Python", "Forecasting"],
        github: "https://github.com/het0814/Climate-Change-Prediction", // ⬅️ UPDATE THIS LINK
        live: null
    },
    {
        name: "Synthetic Mobility Data Generation",
        description: "Developed a CTGAN-based system to generate synthetic mobility data for SUMO simulations, enhancing dataset availability and realism for transportation studies.",
        tech: ["CTGAN", "Generative AI", "SUMO", "Python"],
        github: null, // ⬅️ UPDATE THIS LINK
        live: null
    },
    {
        name: "Fleet Management KPI Scorecard",
        description: "Designed a pipeline to extract and rank Key Performance Indicators (KPIs) from industrial documents using LLMs, BERTopic, and other topic modeling techniques.",
        tech: ["LLMs", "NLP", "BERTopic", "Topic Modeling"],
        github: null, // ⬅️ UPDATE THIS LINK
        live: null
    },
    {
        name: "SnapCal: Food Image Classifier",
        description: "Built a Flask-based web application to classify food images and estimate calorie content using a pre-trained Convolutional Neural Network (CNN).",
        tech: ["Flask", "CNN", "Image Classification", "Web App"],
        github: "https://github.com/het0814/Snap_Cal", // ⬅️ UPDATE THIS LINK
        live: "" // ⬅️ UPDATE THIS LINK
    },
    {
        name: "SCADA Real-Time Dashboard",
        description: "Implemented a real-time monitoring dashboard for industrial processes using Ignition software for efficient data visualization and process analysis.",
        tech: ["SCADA", "IIoT", "Ignition", "Real-Time"],
        github: null, 
        live: null
    },
    {
        name: "Inventory Management System",
        description: "Developed an inventory tracking system with real-time updates and relational database integration to maintain high levels of inventory accuracy.",
        tech: ["Database", "Full-Stack", "Tracking", "MySQL"],
        github: "https://github.com/het0814", // ⬅️ UPDATE THIS LINK
        live: null
    },
];

const ProjectCard = ({ name, description, tech, github, live }) => (
    <div className="project-card">
        <div className="project-header">
            <h3 className="project-title">{name}</h3>
            <div className="project-links">
                {github && (
                    <a href={github} target="_blank" rel="noopener noreferrer" aria-label="GitHub Repository" className="project-icon-link">
                        <FontAwesomeIcon icon={faGithub} />
                    </a>
                )}
                {live && (
                    <a href={live} target="_blank" rel="noopener noreferrer" aria-label="Live Demo" className="project-icon-link">
                        <FontAwesomeIcon icon={faExternalLinkAlt} />
                    </a>
                )}
            </div>
        </div>
        
        <p className="project-description">{description}</p>
        
        <div className="project-tech-tags">
            {tech.map((t, index) => (
                <span key={index} className="tech-tag">{t}</span>
            ))}
        </div>
    </div>
);

const Projects = () => {
    return (
        <section id="projects">
            <h2 className="section-title">Projects</h2>
            
            <div className="projects-grid">
                {projectsData.map((project, index) => (
                    <ProjectCard 
                        key={index}
                        name={project.name}
                        description={project.description}
                        tech={project.tech}
                        github={project.github}
                        live={project.live}
                    />
                ))}
            </div>
        </section>
    );
};

export default Projects;