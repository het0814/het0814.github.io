import React, { useEffect, useState } from 'react';

const Hero = () => {
  const [text, setText] = useState('');
  const [showCursor, setShowCursor] = useState(true);
  const sentences = [
    "Honours Bachelor of Computer Science",
    "Specialty in Data Analytics",
    "Passionate about Machine Learning",
    "Experienced in Full-Stack Development",
    "Building innovative solutions",
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
      <h2>
        {text}
        {showCursor && <span className="cursor">|</span>}
      </h2>
      <div>
        <a href="https://linkedin.com/in/h3t08">LinkedIn</a>
        <a href="https://github.com/het0814">GitHub</a>
        <a href="mailto:hetkumar.patel1403@gmail.com">Email</a>
      </div>
    </section>
  );
};

export default Hero;
