import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';

const Contact = () => {
    return (
        <section id="contact" className="contact-container">
            <h2 className="section-title">Get In Touch</h2>
            
            <p className="contact-message">
                I'm currently seeking roles in <strong style={{color : "white"}}>Data Science, AI/ML Development,</strong> or <strong style={{color : "white"}}>Data Analytics</strong>. 
                If you have an opportunity or a project you'd like to discuss, my inbox is always open!
            </p>
            
            <div className="contact-links-block">
                <a 
                    href="mailto:hetkumar.patel1403@gmail.com" 
                    className="cta-button primary-cta contact-cta-button"
                >
                    <FontAwesomeIcon icon={faEnvelope} style={{ marginRight: '10px' }} />
                    Email Me Directly
                </a>
            </div>

            <div className="contact-social-icons">
                <a href="https://linkedin.com/in/h3t08" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="contact-social-icon">
                    <FontAwesomeIcon icon={faLinkedin} />
                </a>
                <a href="https://github.com/het0814" target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="contact-social-icon">
                    <FontAwesomeIcon icon={faGithub} />
                </a>
            </div>
            
            <footer className="site-footer">
                <p>&copy; {new Date().getFullYear()} Hetkumar Patel. Designed with React and the Gold Standard.</p>
            </footer>
        </section>
    );
};

export default Contact;