import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope, faFilePdf } from '@fortawesome/free-solid-svg-icons';
import DPImage from '../images/DPImage.png'; // Make sure this path is correct!

const Hero = () => {
    const [text, setText] = useState('');
    const [showCursor, setShowCursor] = useState(true);
    const sentences = [
        "Honours Bachelor of Computer Science",
        "Specialty in Data Analytics",
        "Passionate about Data Science",
        "Machine Learning Developer",
        "Experienced in Full-Stack Development",
        "Building innovative solutions",
    ];
    // Using CSS variables for consistent theming
    const colors = [
        'var(--accent-gold)', 
        '#00ffcc', 
        '#ff00ff', 
        '#00ffff', 
        '#ff6600', 
        '#cc00ff', 
    ]; 
    const typingSpeed = 100;
    const sentencePause = 1000; 
    
    const [currentSentenceIndex, setCurrentSentenceIndex] = useState(0); 

    useEffect(() => {
        let sentenceIndex = 0;
        let charIndex = 0;
        let currentText = '';
        let typingTimeout;
        let pauseTimeout;

        const typeSentence = () => {
            if (charIndex < sentences[sentenceIndex].length) {
                currentText += sentences[sentenceIndex][charIndex];
                setText(currentText);
                charIndex++;
                typingTimeout = setTimeout(typeSentence, typingSpeed);
            } else {
                pauseTimeout = setTimeout(() => {
                    charIndex = 0;
                    currentText = '';
                    setText('');
                    sentenceIndex = (sentenceIndex + 1) % sentences.length;
                    setCurrentSentenceIndex(sentenceIndex);
                    typingTimeout = setTimeout(typeSentence, typingSpeed);
                }, sentencePause);
            }
        };

        typeSentence();

        return () => {
            clearTimeout(typingTimeout);
            clearTimeout(pauseTimeout);
        };
    }, []);

    useEffect(() => {
        const cursorInterval = setInterval(() => {
            setShowCursor((prev) => !prev);
        }, 500);

        return () => clearInterval(cursorInterval);
    }, []);

    return (
        <section id="hero" className="hero-container">
            <div className="hero-image-wrapper">
                <img 
                    src={DPImage} 
                    alt="Hetkumar Patel Profile"
                    className="hero-dp-image" 
                />
            </div>

            <h1 className="hero-title"> 
                Hetkumar Patel
            </h1>
            
            <h2 className="hero-specialty" style={{ color: colors[currentSentenceIndex % colors.length] }}>
                {text}
                {showCursor && <span className="cursor">|</span>}
            </h2>
            
            <div className="hero-bio">
                <p style={{color : "#A9A9A9"}}>
                  Hi,this is <strong style={{color : "white"}}>Het.</strong><br></br>
                  I'm a dedicated and skilled <strong style={{color : "white"}}>Computer Science</strong> recent graduate with specialization in Data Analytics.<br></br> 
                  With a strong foundation in <strong style={{color : "white"}}>programming, data analysis, </strong>and <strong style={{color : "white"}}>machine learning</strong>.<br></br>
                  I am passionate about leveraging technology to solve complex problems and drive data-driven decisions.
                </p>
            </div>
            
            <div className="hero-actions">
                <a 
                    href="Resume.pdf"

                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="cta-button primary-cta"
                >  
                    <FontAwesomeIcon icon={faFilePdf} style={{ marginRight: '8px' }} />
                    View Resume
                </a>
                
                <a 
                    href="mailto:hetkumar.patel1403@gmail.com" 
                    className="cta-button secondary-cta"
                >
                    <FontAwesomeIcon icon={faEnvelope} style={{ marginRight: '8px' }} />
                    Get in Touch
                </a>
            </div>

            <div className="hero-social-links">
                <a href="https://linkedin.com/in/h3t08" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="social-icon">
                    <FontAwesomeIcon icon={faLinkedin} />
                </a>
                <a href="https://github.com/het0814" target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="social-icon">
                    <FontAwesomeIcon icon={faGithub} />
                </a>
            </div>
        </section>
    );
};

export default Hero;