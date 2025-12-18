import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Home.css";

/* ---------------- MOCK LIVE DATA ---------------- */

const LIVE_NEWS = [
  { id: 1, title: "Government releases official economic report", source: "Reuters", score: 82 },
  { id: 2, title: "Miracle cure discovered overnight!!!", source: "Unknown Blog", score: 18 },
  { id: 3, title: "AI regulation bill passed in parliament", source: "BBC News", score: 76 },
];

/* ---------------- SOURCE TRUST ---------------- */

const SOURCE_TRUST = {
  Reuters: "High",
  "BBC News": "High",
  "Unknown Blog": "Low",
};

/* ---------------- MAIN COMPONENT ---------------- */

export default function Home() {
  const navigate = useNavigate();

  const [text, setText] = useState("");
  const [result, setResult] = useState(null);
  const [history, setHistory] = useState([]);
  const [feedback, setFeedback] = useState(null);

  const analyze = () => {
    if (!text.trim()) return;

    const isSensational = text.includes("!!!");
    const score = isSensational ? 20 : 78;

    const analysis = {
      score,
      confidence: Math.min(95, score + 10),
      breakdown: {
        language: isSensational ? "Sensational" : "Neutral",
        source: "Medium",
        consistency: score > 50 ? "High" : "Low",
      },
    };

    setResult(analysis);

    setHistory([
      {
        id: Date.now(),
        text,
        score,
        time: new Date().toLocaleString(),
      },
      ...history.slice(0, 5),
    ]);
  };

  const exportReport = () => {
    alert("Report exported successfully (mock).");
  };

  return (
    <div className="home-wrapper">

      {/* ================= HERO ================= */}
      <section className="home-hero">
        <div className="hero-content">
          <h1>
            Enterprise AI Platform for <br />
            News Credibility Verification
          </h1>

          <p>
            A scalable, explainable AI solution designed to help
            organizations identify misinformation and assess
            news credibility in real time.
          </p>

          <div className="hero-actions">
            <button className="primary-btn" onClick={() => navigate("/predict")}>
              Launch Detector
            </button>
            <button className="secondary-btn">Request Demo</button>
          </div>
        </div>

        <div className="hero-card">
          <h3>Quick Credibility Check</h3>

          <textarea
            placeholder="Paste a news headline or paragraph"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />

          <button className="primary-btn" onClick={analyze}>
            Analyze
          </button>

          {result && (
            <>
              <div className={`result ${result.score < 40 ? "low" : "high"}`}>
                Credibility Score: {result.score}%
              </div>

              <div className="result-details">
                <p><strong>Model Confidence:</strong> {result.confidence}%</p>

                <h4>Explainable AI Breakdown</h4>
                <ul>
                  <li>Language Tone: {result.breakdown.language}</li>
                  <li>Source Reliability: {result.breakdown.source}</li>
                  <li>Content Consistency: {result.breakdown.consistency}</li>
                </ul>

                <button className="secondary-btn" onClick={exportReport}>
                  Export Report
                </button>

                <div className="feedback">
                  <span>Was this correct?</span>
                  <button onClick={() => setFeedback("positive")}>👍</button>
                  <button onClick={() => setFeedback("negative")}>👎</button>
                  {feedback && <p>Feedback recorded</p>}
                </div>
              </div>
            </>
          )}
        </div>
      </section>

      {/* ================= TRUST ================= */}
      <section className="home-trust">
        <h2>Trusted by Professionals</h2>
        <div className="trust-grid">
          <div>Journalists</div>
          <div>Research Institutions</div>
          <div>Enterprises</div>
          <div>Government Analysts</div>
        </div>
      </section>

      {/* ================= LIVE MONITOR ================= */}
      <section className="home-live">
        <h2>
          Live News Risk Monitor
          <span className="live-indicator"> ● LIVE</span>
        </h2>

        <div className="live-grid">
          {LIVE_NEWS.map((n) => (
            <div className="live-card" key={n.id}>
              <h4>{n.title}</h4>
              <span>{n.source}</span>

              <p>
                Source Trust:
                <strong> {SOURCE_TRUST[n.source] || "Unknown"}</strong>
              </p>

              <strong className={n.score < 40 ? "low" : "high"}>
                {n.score}% Credibility
              </strong>
            </div>
          ))}
        </div>
      </section>

      {/* ================= FEATURES ================= */}
      <section className="home-features">
        <h2>Platform Capabilities</h2>
        <div className="features-grid">
          <div className="feature-card">
            <h4>Explainable AI</h4>
            <p>Transparent scoring with human-readable explanations.</p>
          </div>
          <div className="feature-card">
            <h4>Enterprise Ready</h4>
            <p>Scalable APIs, audit logs, and compliance support.</p>
          </div>
          <div className="feature-card">
            <h4>Real-Time Analysis</h4>
            <p>Instant credibility scoring for live news streams.</p>
          </div>
          <div className="feature-card">
            <h4>Secure by Design</h4>
            <p>Privacy-first architecture with secure data handling.</p>
          </div>
        </div>
      </section>

      {/* ================= CTA ================= */}
      <section className="home-cta">
        <h2>Reduce the Risk of Misinformation</h2>
        <p>Deploy AI-driven news verification across your organization.</p>
        <button className="primary-btn" onClick={() => navigate("/predict")}>
          Get Started
        </button>
      </section>

      {/* ================= FOOTER ================= */}
      <footer className="home-footer">
        <div className="footer-grid">
          <div>
            <h4>NewsGuard AI</h4>
            <p>
              Enterprise-grade AI platform for detecting
              misinformation and verifying news credibility.
            </p>
          </div>

          <div>
            <h4>Product</h4>
            <ul>
              <li>Detector</li>
              <li>Enterprise API</li>
              <li>Pricing</li>
            </ul>
          </div>

          <div>
            <h4>Company</h4>
            <ul>
              <li>About Us</li>
              <li>Careers</li>
              <li>Contact</li>
            </ul>
          </div>

          <div>
            <h4>Legal</h4>
            <ul>
              <li>Privacy Policy</li>
              <li>Terms</li>
              <li>Security</li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          © {new Date().getFullYear()} NewsGuard AI. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
