import React, { useEffect } from 'react';
import Hero from './components/Hero';
import Experience from './components/Experience';
import Projects from './components/Projects';
import TechnicalSkills from './components/TechnicalSkills';
import Contact from './components/Contact';
import './App.css';

function App() {
  useEffect(() => {
    const smoothScroll = (targetId) => {
      const targetElement = document.getElementById(targetId);
      if (targetElement) {
        targetElement.scrollIntoView({ behavior: 'smooth' });
      }
    };

    const links = document.querySelectorAll('nav a');
    links.forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href').substring(1);
        smoothScroll(targetId);
      });
    });
  }, []);

  return (
    <div>
      <Hero />
      <Experience />
      <TechnicalSkills />
      <Projects />
      <Contact />
    </div>
  );
}

export default App;