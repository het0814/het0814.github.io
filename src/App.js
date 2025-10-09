import React, { useRef } from 'react';
import Hero from './components/Hero';
import Experience from './components/Experience';
import Projects from './components/Projects';
import TechnicalSkills from './components/TechnicalSkills';
import Contact from './components/Contact';
import './App.css';

// Define the navigation items
const navItems = [
    { name: 'Experience', ref: 'experienceRef' },
    { name: 'Skills', ref: 'skillsRef' },
    { name: 'Projects', ref: 'projectsRef' },
    { name: 'Contact', ref: 'contactRef' },
];

const App = () => {
    // Refs for smooth scrolling
    const experienceRef = useRef(null);
    const skillsRef = useRef(null);
    const projectsRef = useRef(null);
    const contactRef = useRef(null); 

    const getRef = (name) => {
        switch (name) {
            case 'experienceRef': return experienceRef;
            case 'skillsRef': return skillsRef;
            case 'projectsRef': return projectsRef;
            case 'contactRef': return contactRef;
            default: return null;
        }
    };

    const scrollToSection = (refName) => {
        const ref = getRef(refName);
        if (ref && ref.current) {
            ref.current.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <div className="portfolio-wrapper">
            
            {/* Header/Navigation Bar - Sticky */}
            <header className="portfolio-header">
                <h1 className="logo-text" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
                    Hetkumar Patel
                </h1>
                <nav className="navbar-links">
                    {navItems.map((item) => (
                        <button 
                            key={item.name}
                            onClick={() => scrollToSection(item.ref)}
                            className="nav-button"
                        >
                            {item.name}
                        </button>
                    ))}
                </nav>
            </header>
            
            {/* Main Content Area */}
            <main>
                <section className="hero-section">
                    <Hero />
                </section>

                <section ref={experienceRef} className="content-section">
                    <Experience />
                </section>

                <section ref={skillsRef} className="content-section">
                    <TechnicalSkills />
                </section>

                <section ref={projectsRef} className="content-section">
                    <Projects />
                </section>

                <section ref={contactRef} className="content-section contact-section">
                    <Contact />
                </section>
            </main>
        </div>
    );
};

export default App;