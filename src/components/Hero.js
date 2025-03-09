import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';

const Hero = () => {
  const [text, setText] = useState('');
  const [showCursor, setShowCursor] = useState(true);
  const [currentSentenceIndex, setCurrentSentenceIndex] = useState(0);
  const sentences = [
    "Honours Bachelor of Computer Science",
    "Specialty in Data Analytics",
    "Passionate about Machine Learning",
    "Experienced in Full-Stack Development",
    "Building innovative solutions",
  ];
  const colors = [
    '#00ffcc', // Neon cyan
    '#ff00ff', // Neon pink
    '#ffcc00', // Gold
    '#00ffff', // Cyan
    '#ff6600', // Orange
    '#cc00ff', // Purple
    '#00ff66'  // Green
  ];
  const typingSpeed = 100;
  const sentencePause = 1000; 

  useEffect(() => {
    let sentenceIndex = 0;
    let charIndex = 0;
    let currentText = '';

    const typeSentence = () => {
      if (charIndex < sentences[sentenceIndex].length) {
        currentText += sentences[sentenceIndex][charIndex];
        setText(currentText);
        charIndex++;
        setTimeout(typeSentence, typingSpeed);
      } else {
        setTimeout(() => {
          charIndex = 0;
          currentText = '';
          setText('');
          sentenceIndex = (sentenceIndex + 1) % sentences.length;
          setCurrentSentenceIndex(sentenceIndex);
          setTimeout(typeSentence, typingSpeed);
        }, sentencePause);
      }
    };

    typeSentence();
  }, []);

  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setShowCursor((prev) => !prev);
    }, 500);

    return () => clearInterval(cursorInterval);
  }, []);

  return (
    <section id="hero">
      <h1>Hetkumar Patel</h1>
      <h2 style={{ color: colors[currentSentenceIndex] }}>
        {text}
        {showCursor && <span className="cursor">|</span>}
      </h2>
      <div>
        <p>
          Hi,this is Het. I'm a dedicated and skilled Computer Science student specializing in Data Analytics at Sheridan College. 
          With a strong foundation in programming, data analysis, and machine learning, I am passionate about 
          leveraging technology to solve complex problems and drive data-driven decisions.
        </p>
      </div>
      <div className="hero-links">
          <a href="https://linkedin.com/in/h3t08" aria-label="LinkedIn">
            <FontAwesomeIcon icon={faLinkedin} className="icon" />
          </a>
          <a href="https://github.com/het0814" aria-label="GitHub">
            <FontAwesomeIcon icon={faGithub} className="icon" />
          </a>
          <a href="mailto:hetkumar.patel1403@gmail.com" aria-label="Email">
            <FontAwesomeIcon icon={faEnvelope} className="icon" />
          </a>
      </div>
    </section>
  );
};

export default Hero;
