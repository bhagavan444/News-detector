import React from "react";
import "./About.css";

function About() {
  return (
    <main className="abt-main">

      {/* ================= PLATFORM STATUS ================= */}
      <section className="abt-status-bar">
        🧠 AI Engine: Active &nbsp;|&nbsp; 📡 Monitoring: Live &nbsp;|&nbsp;
        🔐 Security Mode: Enabled &nbsp;|&nbsp; 🌍 Region: Global (Prototype)
      </section>

      {/* ================= HERO ================= */}
      <section className="abt-hero">
        <div className="abt-hero-inner">
          <div className="abt-intro">
            <h1 className="abt-name">Verifiex AI</h1>

            <p className="abt-title">
              <span className="gradient-text">
                Enterprise-Grade News Credibility & Misinformation Intelligence Platform
              </span>
            </p>

            <p className="abt-description">
              NewsGuard AI is a scalable, explainable, and real-time platform designed to help
              organizations assess the credibility of digital news content and mitigate the
              risks associated with misinformation.
            </p>

            <div className="abt-location">
              <span><strong>Domain:</strong> Artificial Intelligence & Data Science</span><br />
              <span><strong>Focus Areas:</strong> NLP, Explainable AI, Media Intelligence</span><br />
              <span><strong>Deployment:</strong> Web-based SaaS (Prototype)</span>
            </div>
          </div>
        </div>
      </section>

      {/* ================= BUSINESS HIGHLIGHTS ================= */}
      <section className="abt-card abt-highlights">
        <div className="highlight-grid">
          <div className="highlight">
            <div className="highlight-value">Real-Time</div>
            <div className="highlight-label">Instant credibility assessment</div>
          </div>
          <div className="highlight">
            <div className="highlight-value">Explainable AI</div>
            <div className="highlight-label">Transparent reasoning for decisions</div>
          </div>
          <div className="highlight">
            <div className="highlight-value">Enterprise Ready</div>
            <div className="highlight-label">Scalable & modular architecture</div>
          </div>
          <div className="highlight">
            <div className="highlight-value">Secure</div>
            <div className="highlight-label">Privacy-first prototype design</div>
          </div>
        </div>
      </section>

      {/* ================= WHY VERIFIEX AI ================= */}
      <section className="abt-card fade-in">
        <h2 className="abt-section-title">Why Verifiex AI?</h2>
        <ul className="abt-values">
          <li>Explainable, audit-ready credibility scoring — not a black box.</li>
          <li>Bias-aware and manipulation-sensitive language analysis.</li>
          <li>Designed for enterprise, research, and governance use cases.</li>
          <li>Real-time risk intelligence instead of static fact-checking.</li>
        </ul>
      </section>

      {/* ================= IMPACT METRICS ================= */}
      <section className="abt-card abt-metrics fade-in">
        <h2 className="abt-section-title">Platform Impact</h2>

        <div className="metrics-grid">
          <div className="metric">
            <h3>95%</h3>
            <p>Explainability Confidence</p>
          </div>
          <div className="metric">
            <h3>Real-Time</h3>
            <p>Content Risk Detection</p>
          </div>
          <div className="metric">
            <h3>Multi-Domain</h3>
            <p>News & Media Coverage</p>
          </div>
          <div className="metric">
            <h3>Prototype</h3>
            <p>Enterprise SaaS Ready</p>
          </div>
        </div>
      </section>

      {/* ================= TRUST & COMPLIANCE ================= */}
      <section className="abt-card fade-in">
        <h2 className="abt-section-title">Trust & Compliance</h2>
        <ul className="abt-values">
          <li>GDPR-aware architecture (data-minimal design).</li>
          <li>Responsible AI development principles.</li>
          <li>Security-first SaaS-ready system design.</li>
          <li>Research and audit-friendly explainability layer.</li>
        </ul>
      </section>

      {/* ================= PLATFORM OVERVIEW ================= */}
      <section className="abt-card abt-project-card fade-in">
        <h2 className="abt-section-title">Platform Overview</h2>

        <p className="abt-description">
          NewsGuard AI provides an intelligent framework for analyzing digital news content using
          natural language processing techniques, heuristic analysis, and explainable AI principles.
          The platform generates credibility scores along with interpretable reasoning, enabling
          users to make informed decisions with confidence.
        </p>

        <ul className="abt-values">
          <li><strong>Credibility Scoring Engine:</strong> Structural & linguistic analysis.</li>
          <li><strong>Explainability Layer:</strong> Human-readable reasoning.</li>
          <li><strong>Real-Time Monitoring:</strong> Emerging misinformation detection.</li>
          <li><strong>Modular Architecture:</strong> ML & API extensibility.</li>
        </ul>
      </section>

      {/* ================= DATA & MODEL TRANSPARENCY ================= */}
      <section className="abt-card fade-in">
        <h2 className="abt-section-title">Data & Model Transparency</h2>
        <ul className="abt-values">
          <li>Inputs: Language tone, structure, signals, and context.</li>
          <li>Outputs: Credibility score, risk level, and reasoning.</li>
          <li>Human-in-the-loop decision support.</li>
          <li>Designed for explainability and audit use cases.</li>
        </ul>
      </section>

      {/* ================= ENTERPRISE USE CASES ================= */}
      <section className="abt-card abt-usecases fade-in">
        <h2 className="abt-section-title">Enterprise Use Cases</h2>

        <div className="usecase-grid">
          <div className="usecase">
            <h3>Media & Publishing</h3>
            <p>Assist editorial teams by validating news credibility.</p>
          </div>
          <div className="usecase">
            <h3>Research & Academia</h3>
            <p>Analyze misinformation and bias trends.</p>
          </div>
          <div className="usecase">
            <h3>Corporate Risk Intelligence</h3>
            <p>Identify narratives impacting brand or markets.</p>
          </div>
          <div className="usecase">
            <h3>Public Awareness Platforms</h3>
            <p>Empower users to verify digital content.</p>
          </div>
        </div>
      </section>

      {/* ================= WHO USES THIS ================= */}
      <section className="abt-card fade-in">
        <h2 className="abt-section-title">Who Uses Verifiex AI?</h2>
        <ul className="abt-values">
          <li>Journalists & Editors</li>
          <li>Researchers & Academicians</li>
          <li>Corporate Analysts</li>
          <li>Policy & Governance Teams</li>
          <li>Educators & Media Literacy Platforms</li>
        </ul>
      </section>

      {/* ================= AI LIMITATIONS ================= */}
      <section className="abt-card fade-in">
        <h2 className="abt-section-title">AI Limitations & Disclaimers</h2>
        <ul className="abt-values">
          <li>AI-generated scores are probabilistic, not absolute truth.</li>
          <li>Human judgment is always recommended.</li>
          <li>Model behavior may evolve with new data.</li>
          <li>Designed to assist — not replace — decision-makers.</li>
        </ul>
      </section>

      {/* ================= RESPONSIBLE AI ================= */}
      <section className="abt-card abt-ethics fade-in">
        <h2 className="abt-section-title">Responsible AI Principles</h2>

        <ul className="abt-values">
          <li><strong>Transparency:</strong> Explainable decisions.</li>
          <li><strong>Accountability:</strong> Human oversight.</li>
          <li><strong>Privacy:</strong> Minimal data usage.</li>
          <li><strong>Fairness:</strong> Bias-aware design.</li>
        </ul>
      </section>

      {/* ================= VISION ================= */}
      <section className="abt-card fade-in">
        <h2 className="abt-section-title">Our Vision</h2>
        <p className="abt-description">
          To build a transparent, accountable AI intelligence layer that helps
          societies, organizations, and individuals navigate digital information
          with clarity, trust, and responsibility.
        </p>
      </section>

      {/* ================= TECH STACK ================= */}
      <section className="abt-card abt-tech fade-in">
        <h2 className="abt-section-title">Technology Stack</h2>

        <div className="tech-grid">
          <div className="tech"><strong>Frontend</strong><div>React.js</div></div>
          <div className="tech"><strong>Backend</strong><div>Flask / REST APIs</div></div>
          <div className="tech"><strong>AI & NLP</strong><div>NLP Pipelines</div></div>
          <div className="tech"><strong>Security</strong><div>API-ready design</div></div>
        </div>
      </section>

      {/* ================= CTA ================= */}
      <section className="abt-card abt-cta fade-in">
        <h2 className="abt-section-title">Interested in Collaboration?</h2>
        <p className="abt-description">
          Organizations, researchers, and enterprises are welcome to connect.
        </p>
        <div className="cta-row">
          <a className="cta-btn primary" href="mailto:contact@newsguardai.com">
            Request Enterprise Demo
          </a>
        </div>
      </section>

    </main>
  );
}

export default About;
