import React, { useRef, useState, useEffect } from 'react';
import Hero from './components/Hero';
import Experience from './components/Experience';
import Projects from './components/Projects';
import TechnicalSkills from './components/TechnicalSkills';
import Contact from './components/Contact';
import './App.css';

const navItems = [
    { name: 'Experience', ref: 'experienceRef' },
    { name: 'Skills', ref: 'skillsRef' },
    { name: 'Projects', ref: 'projectsRef' },
    { name: 'Contact', ref: 'contactRef' },
];

const App = () => {
    const experienceRef = useRef(null);
    const skillsRef = useRef(null);
    const projectsRef = useRef(null);
    const contactRef = useRef(null);
    
    // Add scroll state
    const [isScrolled, setIsScrolled] = useState(false);

    // Add scroll listener
    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 100) {
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

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
            
            {/* Add isScrolled class conditionally */}
            <header className={`portfolio-header ${isScrolled ? 'scrolled' : ''}`}>
                <h1 className="logo-text" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
                    <strong style={{color : "#FFD700"}}>Het</strong>kumar Patel
                </h1>
                <nav className={`navbar-links ${isScrolled ? 'visible' : 'hidden'}`}>
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