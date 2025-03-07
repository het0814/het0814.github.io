import React from 'react';
import Hero from './components/Hero';
import About from './components/About';
import Experience from './components/Experience';
import Projects from './components/Projects';
import TechnicalSkills from './components/TechnicalSkills';
import Contact from './components/Contact';
import './App.css';

function App() {
  return (
    <div>
      <Hero />
      <About />
      <Experience />
      <Projects />
      <TechnicalSkills />
      <Contact />
    </div>
  );
}

export default App;