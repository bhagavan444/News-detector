import React from "react";
import "./Contact.css";

function Contact() {
  return (
    <main className="contact-main">

      {/* Contact Card */}
      <section className="contact-card">
        <h1 className="contact-title">
          <span className="contact-emoji">📬</span> Get in Touch
        </h1>

        <p className="contact-intro">
          Building solutions at the intersection of <strong>AI and Media Integrity</strong>.  
          Whether you're exploring collaborations, aiming to integrate misinformation detection
          into your platform, or want to enhance digital trust using AI —
          I'm always open to impactful discussions.
          <br /><br />
          <span className="contact-highlight">
            Reach out today — together we can fight misinformation and strengthen trustworthy digital ecosystems.
          </span>
        </p>

        {/* Direct Contact Methods */}
        <div className="contact-methods">
          <a
            className="contact-method"
            href="tel:+917569205626"
            aria-label="Call G S S S Bhagavan at +91 7569205626"
          >
            <span className="contact-icon">📞</span>
            <span className="contact-details">+91 7569205626</span>
          </a>

          <a
            className="contact-method"
            href="mailto:g.sivasatyasaibhagavan@gmail.com"
            aria-label="Email G S S S Bhagavan"
          >
            <span className="contact-icon">✉️</span>
            <span className="contact-details">g.sivasatyasaibhagavan@gmail.com</span>
          </a>
        </div>

        {/* Social Buttons */}
        <div className="contact-socials">
          <a
            href="https://github.com/bhagavan444"
            className="contact-social-btn github"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg"
              alt="GitHub"
            />
            <span className="contact-social-text">GitHub</span>
          </a>

          <a
            href="https://linkedin.com/in/bhagavan444"
            className="contact-social-btn linkedin"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linkedin/linkedin-original.svg"
              alt="LinkedIn"
            />
            <span className="contact-social-text">LinkedIn</span>
          </a>
        </div>

        {/* CTA Button */}
        <a
          href="mailto:g.sivasatyasaibhagavan@gmail.com"
          className="abt-cta-btn contact-primary-btn"
        >
          Contact Me Now
        </a>
      </section>

      {/* Mini Contact Form */}
      <section className="contact-form-card">
        <h2 className="contact-section-title">Send a Quick Message</h2>
        <p className="contact-form-desc">
          Have a question or collaboration idea? Leave a message and I’ll respond shortly.
        </p>
        <form className="contact-form">
          <input type="text" placeholder="Your Name" className="contact-input" required />
          <input type="email" placeholder="Your Email" className="contact-input" required />
          <textarea placeholder="Your Message..." rows="4" className="contact-textarea" required />
          <button type="submit" className="contact-submit-btn">
            Send Message
          </button>
        </form>
      </section>

      {/* Collaboration Section */}
      <section className="contact-collab-card">
        <h2 className="contact-section-title">Collaboration Opportunities</h2>

        <p className="contact-collab-text">
          I collaborate with <strong>media organizations</strong>,
          <strong>research groups</strong>, <strong>AI ethics teams</strong>,
          <strong>fact-checking units</strong>, and <strong>cybersecurity analysts</strong>
          who want to strengthen digital news verification using AI.
        </p>

        <ul className="collab-list">
          <li>📰 Fake News & Misinformation Detection</li>
          <li>🔍 NLP-based Credibility Scoring</li>
          <li>📊 Real-Time News Monitoring Dashboards</li>
          <li>🤖 AI/ML Model Development & Deployment</li>
          <li>🌐 MERN + Flask Full-Stack Integrations</li>
        </ul>

        <p className="contact-collab-bottom">
          If your work involves truth, trust, or media integrity — let’s build something meaningful!
        </p>
      </section>

      {/* Contact FAQ */}
      <section className="contact-faq-card">
        <h2 className="contact-section-title">Frequently Asked Questions</h2>

        <div className="faq-item">
          <strong>📌 What is your typical response time?</strong>
          <p>Most messages are answered within 24 hours.</p>
        </div>

        <div className="faq-item">
          <strong>📌 Do you work on misinformation research?</strong>
          <p>Yes — I collaborate on projects involving NLP, fake news classification, and trust scoring.</p>
        </div>

        <div className="faq-item">
          <strong>📌 Can I request a demo?</strong>
          <p>Absolutely. Email me to schedule a walkthrough of the Fake News Detector platform.</p>
        </div>
      </section>

      {/* Availability / Support Hours */}
      <section className="contact-hours-card">
        <h2 className="contact-section-title">Availability</h2>
        <p className="contact-hours-text">
          <strong>Monday – Saturday:</strong> 10:00 AM – 6:00 PM  
          <br />
          <strong>Sunday:</strong> Available for urgent inquiries only
        </p>
      </section>

      {/* Location Info */}
      <section className="contact-location-card">
        <h2 className="contact-section-title">Location</h2>
        <p>
          Based in <strong>Eluru, Andhra Pradesh, India</strong>.  
          Open to <strong>remote collaborations</strong> with teams across the globe.
        </p>
      </section>

      {/* Footer Note */}
      <footer className="contact-footer-note">
        © {new Date().getFullYear()} G S S S Bhagavan — AI Developer (Fake News & NLP).  
        <br />
        Building tools that make information safer, smarter, and more trustworthy.
      </footer>
    </main>
  );
}

export default Contact;
