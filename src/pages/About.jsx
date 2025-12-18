import React from "react";
import "./About.css";

function About() {
  return (
    <main className="abt-main">

      {/* ================= HERO ================= */}
      <section className="abt-hero">
        <div className="abt-hero-inner">

          <div className="abt-intro">
            <h1 className="abt-name">NewsGuard AI</h1>

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
          <li>
            <strong>Credibility Scoring Engine:</strong> Evaluates content structure, language tone,
            and contextual signals to estimate trustworthiness.
          </li>
          <li>
            <strong>Explainability Layer:</strong> Human-readable breakdown of AI decisions for
            auditability and compliance.
          </li>
          <li>
            <strong>Real-Time Monitoring:</strong> Detects potentially risky or misleading headlines
            as they emerge.
          </li>
          <li>
            <strong>Modular Architecture:</strong> Easily extendable with advanced ML models and APIs.
          </li>
        </ul>
      </section>

      {/* ================= ENTERPRISE USE CASES ================= */}
      <section className="abt-card abt-usecases fade-in">
        <h2 className="abt-section-title">Enterprise Use Cases</h2>

        <div className="usecase-grid">
          <div className="usecase">
            <h3>Media & Publishing</h3>
            <p>
              Assist editorial teams by validating news credibility before publication.
            </p>
          </div>

          <div className="usecase">
            <h3>Research & Academia</h3>
            <p>
              Analyze misinformation trends, linguistic bias, and content reliability.
            </p>
          </div>

          <div className="usecase">
            <h3>Corporate Risk Intelligence</h3>
            <p>
              Identify misleading narratives that may impact brand reputation or markets.
            </p>
          </div>

          <div className="usecase">
            <h3>Public Awareness Platforms</h3>
            <p>
              Enable users to verify content encountered on digital and social channels.
            </p>
          </div>
        </div>
      </section>

      {/* ================= TECH STACK ================= */}
      <section className="abt-card abt-tech fade-in">
        <h2 className="abt-section-title">Technology Stack</h2>

        <div className="tech-grid">
          <div className="tech">
            <strong>Frontend</strong>
            <div>React.js, Modular Component Architecture</div>
          </div>

          <div className="tech">
            <strong>Backend (Pluggable)</strong>
            <div>Flask / REST APIs, ML Model Services</div>
          </div>

          <div className="tech">
            <strong>AI & NLP</strong>
            <div>Heuristic Analysis, NLP Pipelines, Transformer-ready</div>
          </div>

          <div className="tech">
            <strong>Security & Privacy</strong>
            <div>Client-side storage (prototype), secure API-ready design</div>
          </div>
        </div>
      </section>

      {/* ================= ROADMAP ================= */}
      <section className="abt-card abt-roadmap fade-in">
        <h2 className="abt-section-title">Product Roadmap</h2>

        <ol className="roadmap-list">
          <li><strong>Phase 1:</strong> Transformer-based credibility scoring models.</li>
          <li><strong>Phase 2:</strong> Source reputation analytics and dashboards.</li>
          <li><strong>Phase 3:</strong> Multi-language misinformation detection.</li>
          <li><strong>Ongoing:</strong> Performance tuning, UI enhancements, dataset expansion.</li>
        </ol>
      </section>

      {/* ================= LEADERSHIP ================= */}
      <section className="abt-card abt-personal-card fade-in">
        <h2 className="abt-section-title">Project Leadership</h2>

        <p className="abt-description">
          <strong>Project Lead:</strong> G S S S Bhagavan  
          <br />
          AI & Data Science Engineer with a strong focus on natural language processing,
          explainable AI systems, and responsible AI development.
        </p>

        <div className="abt-profile highlight-box">
          <div><strong>Expertise:</strong> AI, NLP, Data Science</div>
          <div><strong>Focus:</strong> Misinformation Detection & Media Intelligence</div>
          <div><strong>Availability:</strong> Open to research, internships, and enterprise collaboration</div>
        </div>
      </section>

      {/* ================= CTA ================= */}
      <section className="abt-card abt-cta fade-in">
        <h2 className="abt-section-title">Interested in Collaboration?</h2>

        <p className="abt-description">
          Organizations, research teams, and educators interested in evaluating or extending
          this platform are welcome to connect for pilot deployments or technical discussions.
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
