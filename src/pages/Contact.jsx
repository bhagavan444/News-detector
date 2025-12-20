import React from "react";
import "./Contact.css";

function Contact() {
  return (
    <main className="contact-main">

      {/* ================= ENTERPRISE STATUS ================= */}
      <section className="contact-status-bar">
        📡 Support: Active &nbsp;|&nbsp; ⏱ Avg Response: 24 hrs &nbsp;|&nbsp;
        🔐 Secure Communication Enabled
      </section>

      {/* ================= CONTACT INTRO ================= */}
      <section className="contact-card">
        <h1 className="contact-title">Contact & Collaboration</h1>

        <p className="contact-intro">
          NewsGuard AI focuses on building intelligent solutions at the intersection of
          <strong> Artificial Intelligence, Media Integrity, and Trustworthy Information Systems</strong>.
          <br /><br />
          Organizations, researchers, and teams interested in integrating
          AI-powered misinformation detection, credibility analysis, or
          real-time media intelligence are welcome to connect.
        </p>

        {/* ================= DIRECT CONTACT ================= */}
        <div className="contact-methods">
          <a className="contact-method" href="tel:+917569205626">
            <span className="contact-details">+91 75692 05626</span>
          </a>

          <a className="contact-method" href="mailto:g.sivasatyasaibhagavan@gmail.com">
            <span className="contact-details">
              g.sivasatyasaibhagavan@gmail.com
            </span>
          </a>
        </div>

        {/* ================= SOCIAL LINKS ================= */}
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

        {/* ================= PRIMARY CTA ================= */}
        <a
          href="mailto:g.sivasatyasaibhagavan@gmail.com"
          className="contact-primary-btn"
        >
          Request Collaboration
        </a>
      </section>

      {/* ================= CONTACT FORM ================= */}
      <section className="contact-form-card">
        <h2 className="contact-section-title">Send a Message</h2>
        <p className="contact-form-desc">
          Share your inquiry or collaboration proposal and our team will respond promptly.
        </p>

        <form className="contact-form">
          <input type="text" placeholder="Full Name" className="contact-input" required />
          <input type="email" placeholder="Business Email" className="contact-input" required />

          {/* ===== Inquiry Type (Enterprise Feature) ===== */}
          <select className="contact-input" required>
            <option value="">Inquiry Type</option>
            <option>Enterprise Collaboration</option>
            <option>Research Partnership</option>
            <option>Technical Support</option>
            <option>Product Demonstration</option>
          </select>

          <textarea
            placeholder="Message / Requirements"
            rows="4"
            className="contact-textarea"
            required
          />

          <button type="submit" className="contact-submit-btn">
            Submit Inquiry
          </button>
        </form>

        <p className="contact-privacy-note">
          🔒 We respect your privacy. Your information will only be used for communication purposes.
        </p>
      </section>

      {/* ================= PARTNERSHIP TYPES ================= */}
      <section className="contact-collab-card">
        <h2 className="contact-section-title">Collaboration Areas</h2>

        <ul className="collab-list">
          <li>Enterprise AI Platform Integrations</li>
          <li>AI-Based Fake News & Misinformation Detection</li>
          <li>NLP-Driven Credibility & Trust Scoring</li>
          <li>Real-Time Media Intelligence Dashboards</li>
          <li>AI/ML Model Development & Deployment</li>
          <li>Academic & Research Collaborations</li>
        </ul>

        <p className="contact-collab-bottom">
          We partner with organizations working on high-impact information systems
          and ethical AI deployments.
        </p>
      </section>

      {/* ================= FAQ ================= */}
      <section className="contact-faq-card">
        <h2 className="contact-section-title">Frequently Asked Questions</h2>

        <div className="faq-item">
          <strong>What is the typical response time?</strong>
          <p>Most inquiries are addressed within one business day.</p>
        </div>

        <div className="faq-item">
          <strong>Do you support enterprise pilots?</strong>
          <p>Yes, we support pilot integrations and proof-of-concept deployments.</p>
        </div>

        <div className="faq-item">
          <strong>Is the platform suitable for research use?</strong>
          <p>Absolutely. Research and academic collaborations are encouraged.</p>
        </div>
      </section>

      {/* ================= AVAILABILITY ================= */}
      <section className="contact-hours-card">
        <h2 className="contact-section-title">Availability</h2>
        <p className="contact-hours-text">
          <strong>Monday – Saturday:</strong> 10:00 AM – 6:00 PM IST  
          <br />
          <strong>Sunday:</strong> Priority requests only
        </p>
      </section>

      {/* ================= LOCATION ================= */}
      <section className="contact-location-card">
        <h2 className="contact-section-title">Location</h2>
        <p>
          Based in <strong>Eluru, Andhra Pradesh, India</strong>.  
          <br />
          Supporting <strong>remote & global collaborations</strong>.
        </p>
      </section>

      {/* ================= FOOTER ================= */}
      <footer className="contact-footer-note">
        © {new Date().getFullYear()} NewsGuard AI  
        <br />
        Enterprise-grade AI solutions for trustworthy information systems
      </footer>

    </main>
  );
}

export default Contact;
