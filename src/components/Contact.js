import React from 'react';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';

const Contact = () => {
  return (
    <motion.div
      className="contact-section"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.6 }}
    >
      <p className="contact-overline">06. What's Next?</p>
      <h2 className="contact-heading">Let's Talk</h2>
      <p className="contact-text">
        I'm currently looking for new opportunities in <strong style={{ color: '#e8e8e8' }}>Data Science</strong>,{' '}
        <strong style={{ color: '#e8e8e8' }}>AI/ML Development</strong>, or{' '}
        <strong style={{ color: '#e8e8e8' }}>Data Analytics</strong>.
        Whether you have a question, a project idea, or just want to say hello — my inbox
        is always open.
      </p>
      <a
        href="mailto:hetkumar.patel1403@gmail.com"
        className="contact-cta"
      >
        <FontAwesomeIcon icon={faEnvelope} />
        Say Hello
      </a>

      <div className="contact-socials">
        <a href="https://github.com/het0814" target="_blank" rel="noopener noreferrer" className="contact-social-link" aria-label="GitHub">
          <FontAwesomeIcon icon={faGithub} />
        </a>
        <a href="https://linkedin.com/in/h3t08" target="_blank" rel="noopener noreferrer" className="contact-social-link" aria-label="LinkedIn">
          <FontAwesomeIcon icon={faLinkedin} />
        </a>
        <a href="mailto:hetkumar.patel1403@gmail.com" className="contact-social-link" aria-label="Email">
          <FontAwesomeIcon icon={faEnvelope} />
        </a>
      </div>
    </motion.div>
  );
};

export default Contact;