import React from 'react';

const Projects = () => {
  return (
    <section id="projects">
      <h2>Projects</h2>
      <ul>
        <li><strong>Climate Change Prediction</strong> - Developed a time series forecasting pipeline using machine learning to analyze historical climate data and predict future climate trends, enabling data-driven insights into climate pattern shifts.</li>
        <li><strong>ContextIQ: RAG-based Chatbot</strong> - Built a full-stack Retrieval-Augmented Generation (RAG) chatbot that ingests documents, URLs, and user inputs to deliver real-time, context-aware responses using vector database retrieval and LLMs.</li>
        <li><strong>Fleet Management KPI Scorecard Development</strong> - Designed a pipeline to extract and rank KPIs using LLMs and topic modeling.</li>
        <li><strong>Synthetic Mobility Data Generation</strong> - Developed a CTGAN-based system to generate synthetic mobility data.</li>
        <li><strong>SCADA</strong> - Implemented a real-time monitoring dashboard for industrial processes.</li>
        <li><strong>SnapCal</strong> - Built a Flask-based web app to classify food images and estimate calorie content.</li>
        <li><strong>Inventory Management System</strong> - Developed an inventory tracking system with real-time updates.</li>
      </ul>
    </section>
  );
};

export default Projects;