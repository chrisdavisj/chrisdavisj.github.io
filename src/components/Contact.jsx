import React from 'react';
import { FaLinkedin, FaGithub, FaEnvelope, FaTwitter } from 'react-icons/fa';

function Contact() {
  return (
    <section id="contact">
      <h2>Connect With Me</h2>
      <p>Feel free to reach out on any of the platforms below!</p>
      <div className="contact-icons">
        <a href="https://www.linkedin.com/in/chrisdavisj" target="_blank" rel="noopener noreferrer">
          <FaLinkedin />
        </a>
        <a href="https://github.com/chrisdavisj" target="_blank" rel="noopener noreferrer">
          <FaGithub />
        </a>
        <a href="mailto:jaldi.2@wright.com" target="_blank" rel="noopener noreferrer">
          <FaEnvelope />
        </a>
        {/* <a href="https://twitter.com/chrisdavisj" target="_blank" rel="noopener noreferrer">
          <FaTwitter />
        </a> */}
      </div>
    </section>
  );
}

export default Contact;
