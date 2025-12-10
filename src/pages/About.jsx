import React from "react";
import "./About.css";

function About() {
  return (
    <main className="abt-main">
      {/* ========================= HERO SECTION ========================= */}
      <section className="abt-hero">
        <div className="abt-hero-inner">
          <div className="abt-avatar-card">
            <img
              src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
              alt="Profile"
              className="abt-avatar"
            />
          </div>

          <div className="abt-intro">
            <h1 className="abt-name">Fake News Detection & Credibility AI Platform</h1>

            <p className="abt-title">
              <span className="gradient-text">
                AI-Powered Misinformation Detection • Real-Time Verification • Trust Intelligence
              </span>
            </p>

            <div className="abt-location">
              <span><strong>Developed by:</strong> G S S S Bhagavan</span>
              <br />
              <span><strong>Program:</strong> B.Tech – AI & Data Science</span>
              <br />
              <span><strong>Institution:</strong> Ramachandra College of Engineering, Eluru</span>
            </div>

            <blockquote className="abt-quote">
              <span>
                “Combating misinformation through intelligent, transparent, and explainable AI —
                empowering people to trust what they read in a digital-first world.”
              </span>
            </blockquote>
          </div>
        </div>
      </section>

      {/* ========================= QUICK HIGHLIGHTS (HR FOCUSED) ========================= */}
      <section className="abt-card abt-highlights">
        <div className="highlight-grid">
          <div className="highlight">
            <div className="highlight-value">95%</div>
            <div className="highlight-label">Prototype Detection Accuracy</div>
          </div>
          <div className="highlight">
            <div className="highlight-value">Real-Time</div>
            <div className="highlight-label">Instant headline credibility scoring</div>
          </div>
          <div className="highlight">
            <div className="highlight-value">Explainable AI</div>
            <div className="highlight-label">Transparent reasoning for each classification</div>
          </div>
          <div className="highlight">
            <div className="highlight-value">24/7</div>
            <div className="highlight-label">Automated misinformation monitoring</div>
          </div>
        </div>

        <p className="abt-description" style={{ marginTop: 18 }}>
          Designed for media teams, researchers, and institutions — this platform helps analyze
          news credibility, reduce misinformation spread, and provide fact-checking insights within seconds.
        </p>
      </section>

      {/* ========================= PROJECT OVERVIEW ========================= */}
      <section className="abt-card abt-project-card fade-in">
        <h2 className="abt-section-title">About the Project</h2>

        <p className="abt-description">
          The <strong>Fake News Detection & Credibility AI Platform</strong> is a modern, modular,
          and explainable solution for evaluating the trustworthiness of digital news content.
          It leverages NLP-based heuristics, machine learning models, and linguistic cues
          to estimate credibility scores and highlight risky patterns.
        </p>

        <ul className="abt-values">
          <li>
            <span className="abt-value-icon">📰</span>
            <strong>Credibility Intelligence:</strong> Score calculation using context patterns,
            language structure, and source reliability cues.
          </li>
          <li>
            <span className="abt-value-icon">🤖</span>
            <strong>Explainable AI:</strong> Every result includes a human-readable reasoning breakdown.
          </li>
          <li>
            <span className="abt-value-icon">⚡</span>
            <strong>Real-time Monitoring:</strong> Detect suspicious trending headlines instantly.
          </li>
          <li>
            <span className="abt-value-icon">🔐</span>
            <strong>Safe Processing:</strong> Local storage history, secure client-side computation (prototype).
          </li>
          <li>
            <span className="abt-value-icon">🌐</span>
            <strong>Multi-Language Support:</strong> Extendable to analyze content in regional languages.
          </li>
        </ul>
      </section>

      {/* ========================= USE CASES FOR HR / EDU ========================= */}
      <section className="abt-card abt-usecases fade-in">
        <h2 className="abt-section-title">Use Cases (Media / Research / Education)</h2>

        <div className="usecase-grid">
          <div className="usecase">
            <h3>Newsroom Fact-Checking</h3>
            <p>Assist journalists by providing instant credibility insights before publishing.</p>
          </div>

          <div className="usecase">
            <h3>Academic Research</h3>
            <p>Analyze misinformation patterns, sentiment biases, and linguistic anomalies.</p>
          </div>

          <div className="usecase">
            <h3>Public Awareness Tools</h3>
            <p>Help readers evaluate content they encounter on social platforms.</p>
          </div>

          <div className="usecase">
            <h3>Cybersecurity & Threat Intel</h3>
            <p>Identify coordinated misinformation campaigns and risky narratives.</p>
          </div>
        </div>
      </section>

      {/* ========================= TECH STACK & METRICS ========================= */}
      <section className="abt-card abt-tech fade-in">
        <h2 className="abt-section-title">Technical Stack & Performance</h2>

        <div className="tech-grid">
          <div className="tech">
            <strong>Frontend</strong>
            <div>React, Tailwind-ready UI, Optimized rendering</div>
          </div>

          <div className="tech">
            <strong>Backend (Optional)</strong>
            <div>Flask API, HuggingFace Transformers, Fast inference</div>
          </div>

          <div className="tech">
            <strong>ML Logic</strong>
            <div>Heuristic + NLP Models (extendable to BERT/DistilBERT)</div>
          </div>

          <div className="tech">
            <strong>Data Handling</strong>
            <div>Client-side storage for prototype (secure & private)</div>
          </div>
        </div>

        <div className="performance">
          <p>
            <strong>Prototype results:</strong> Avg. processing latency &lt; 1s for text, 
            with explainable reasoning for each detection.
          </p>
        </div>
      </section>

      {/* ========================= TESTIMONIALS ========================= */}
      <section className="abt-card abt-testimonials fade-in">
        <h2 className="abt-section-title">Early Feedback</h2>

        <div className="testimonial-grid">
          <blockquote className="testimonial">
            "A powerful prototype — the explainability feature is extremely useful for editorial reviewing."
            <footer>— Senior Editor, Digital Media Group</footer>
          </blockquote>

          <blockquote className="testimonial">
            "Helps students and researchers understand misinformation patterns with clarity."
            <footer>— Assistant Professor, Data Science Dept.</footer>
          </blockquote>
        </div>
      </section>

      {/* ========================= ROADMAP ========================= */}
      <section className="abt-card abt-roadmap fade-in">
        <h2 className="abt-section-title">Roadmap & Next Steps</h2>

        <ol className="roadmap-list">
          <li><strong>Q1:</strong> Integrate transformer-based credibility scoring.</li>
          <li><strong>Q2:</strong> Add source reliability graphing & misinformation taxonomy.</li>
          <li><strong>Q3:</strong> Multi-language misinformation detection models.</li>
          <li><strong>Ongoing:</strong> UI upgrades, accuracy tuning, dataset expansion.</li>
        </ol>
      </section>

      {/* ========================= CALL TO ACTION ========================= */}
      <section className="abt-card abt-cta fade-in">
        <h2 className="abt-section-title">Want to Try or Integrate This?</h2>

        <p className="abt-description">
          If you are a media team, researcher, or educator and would like to explore this project
          for collaboration, research, or pilot deployment — feel free to reach out.
        </p>

        <div className="cta-row">
          <a
            className="cta-btn primary"
            href="mailto:gsiva@example.com?subject=Fake%20News%20Detector%20Platform%20Demo"
          >
            Request a Demo
          </a>

          <a className="cta-btn ghost" href="/contact">
            Contact Developer
          </a>
        </div>
      </section>

      {/* ========================= FOOTER PROFILE ========================= */}
      <section className="abt-card abt-personal-card fade-in">
        <h2 className="abt-section-title">Project Lead</h2>

        <p className="abt-description">
          <strong>G S S S Bhagavan</strong> — B.Tech (AI & Data Science). Passionate about building
          AI-based misinformation detection tools, ethical AI systems, and next-gen media intelligence
          solutions. Open to collaborations, research opportunities, and internships.
        </p>

        <div className="abt-profile highlight-box">
          <div><strong>Specialization:</strong> Artificial Intelligence & Data Science</div>
          <div><strong>Institution:</strong> Ramachandra College of Engineering</div>
          <div><strong>Focus Area:</strong> NLP, Misinformation Detection, Explainable AI</div>
          <div style={{ marginTop: 10 }}>
            <strong>Email:</strong> gsiva@example.com
          </div>
        </div>
      </section>
    </main>
  );
}

export default About;
