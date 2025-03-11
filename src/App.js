import React, { useRef } from 'react';
import Hero from './components/Hero';
import Experience from './components/Experience';
import Projects from './components/Projects';
import TechnicalSkills from './components/TechnicalSkills';
import Contact from './components/Contact';
import './App.css';

// function App() {
//   return (
//     <div>
//       <Hero />
//       <Experience />
//       <TechnicalSkills />
//       <Projects />
//       <Contact />
//     </div>
//   );
// }

// export default App;
const App = () => {

  const experienceRef = useRef(null);
  const skillsRef = useRef(null);
  const projectsRef = useRef(null);

  const scrollToSection = (ref) => {
    ref.current.scrollIntoView({ behavior: 'smooth' });
  };
  return (
    <div>
      <nav className="navbar">
        <ul>
          <li><button onClick={() => scrollToSection(experienceRef)}>Experience</button></li>
          <li><button onClick={() => scrollToSection(skillsRef)}>Skills</button></li>
          <li><button onClick={() => scrollToSection(projectsRef)}>Projects</button></li>
        </ul>
      </nav>
      <div>
        <Hero />
      </div>
      <div ref={experienceRef}>
        <Experience />
      </div>
      <div ref={skillsRef} className="section">
        <TechnicalSkills />
      </div>
      <div ref={projectsRef} className="section">
        <Projects />
      </div>
      <Contact />
    </div>
  );
};

export default App;
