import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
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

export default function Home() {
  const navigate = useNavigate();

  const [text, setText] = useState("");
  const [result, setResult] = useState(null);
  const [history, setHistory] = useState([]);
  const [feedback, setFeedback] = useState(null);
  const [trend, setTrend] = useState([]);
  const [autoScan, setAutoScan] = useState(false);

  /* -------- REAL-TIME SCORE SIMULATION -------- */

  useEffect(() => {
    if (!result) return;

    const interval = setInterval(() => {
      setTrend((prev) => [
        ...prev.slice(-9),
        {
          time: new Date().toLocaleTimeString(),
          score: result.score + Math.floor(Math.random() * 5 - 2),
        },
      ]);
    }, 3000);

    return () => clearInterval(interval);
  }, [result]);

  /* -------- AUTO SCAN MODE -------- */

  useEffect(() => {
    if (autoScan && text.trim().length > 15) {
      analyze();
    }
  }, [text]);

  /* ---------------- ANALYZE ---------------- */

  const analyze = () => {
    if (!text.trim()) return;

    const isSensational = text.includes("!!!");
    const score = isSensational ? 20 : 78;

    const analysis = {
      score,
      confidence: Math.min(95, score + 10),
      risk: score < 40 ? "HIGH RISK" : score < 65 ? "SUSPICIOUS" : "SAFE",
      breakdown: {
        language: isSensational ? "Sensational" : "Neutral",
        source: "Medium",
        consistency: score > 50 ? "High" : "Low",
        bias: isSensational ? "Emotionally Manipulative" : "Low Bias",
      },
    };

    setResult(analysis);
    setTrend([]);

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
    alert("Enterprise report exported (mock PDF / JSON).");
  };

  return (
    <motion.div className="home-wrapper" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>

      {/* ================= AI STATUS BAR ================= */}
      <div className="ai-status-bar">
        🧠 Model: Active &nbsp;|&nbsp; 📡 Feed: Connected &nbsp;|&nbsp;
        ⏱ {new Date().toLocaleTimeString()}
      </div>

      {/* ================= HERO ================= */}
      <section className="home-hero">
        <motion.div className="hero-content" initial={{ y: 40 }} animate={{ y: 0 }}>
          <h1>
            Enterprise AI Platform for <br /> News Credibility Verification
          </h1>
          <p>
            Real-time, explainable AI to detect misinformation
            and reduce organizational risk.
          </p>

          <div className="hero-actions">
            <button className="primary-btn" onClick={() => navigate("/predict")}>
              Launch Verifex
            </button>
            <button className="secondary-btn">Request Demo</button>
          </div>
        </motion.div>

        <motion.div className="hero-card" whileHover={{ scale: 1.02 }}>
          <h3>Quick Credibility Check</h3>

          <textarea
            placeholder="Paste a news headline or paragraph"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />

          <div className="scan-actions">
            <button className="primary-btn" onClick={analyze}>Scan</button>
            <button
              className="secondary-btn"
              onClick={() => setAutoScan(!autoScan)}
            >
              Auto Scan: {autoScan ? "ON" : "OFF"}
            </button>
          </div>

          {result && (
            <>
              <div
                className={`result pulse ${result.score < 40 ? "low" : "high"}`}
              >
                {result.score}% — {result.risk}
              </div>

              <p><strong>Confidence:</strong> {result.confidence}%</p>

              <ul>
                <li>Language: {result.breakdown.language}</li>
                <li>Consistency: {result.breakdown.consistency}</li>
                <li>Bias: {result.breakdown.bias}</li>
              </ul>

              <button className="secondary-btn" onClick={exportReport}>
                Export Enterprise Report
              </button>

              <div className="feedback">
                <span>Was this correct?</span>
                <button onClick={() => setFeedback("positive")}>👍</button>
                <button onClick={() => setFeedback("negative")}>👎</button>
                {feedback && <p>Feedback recorded</p>}
              </div>

              <p className="ai-disclaimer">
                AI-assisted analysis · Human verification recommended
              </p>
            </>
          )}
        </motion.div>

        {/* ================= RECENT SCANS ================= */}
        {history.length > 0 && (
          <div className="recent-scans">
            <h4>Recent Scans</h4>
            {history.slice(0, 3).map((h) => (
              <div key={h.id} className="scan-item">
                <strong>{h.score}%</strong>
                <small>{h.time}</small>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* ================= LIVE TREND ================= */}
      {trend.length > 0 && (
        <section className="home-live">
          <h2>
            Real-Time Credibility Trend
            <span className="live-indicator"> ● LIVE</span>
          </h2>

          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={trend}>
              <XAxis dataKey="time" />
              <YAxis domain={[0, 100]} />
              <Tooltip />
              <Line type="monotone" dataKey="score" strokeWidth={3} />
            </LineChart>
          </ResponsiveContainer>
        </section>
      )}

      {/* ================= FOOTER ================= */}
      <footer className="home-footer">
        <div className="footer-grid">
          <div>
            <h4>Verifex AI</h4>
            <p>
              Trusted by enterprises worldwide to combat misinformation
              using transparent, ethical AI systems.
            </p>
          </div>

          <div>
            <h4>Solutions</h4>
            <ul>
              <li>News Verification</li>
              <li>Enterprise API</li>
              <li>Risk Analytics</li>
            </ul>
          </div>

          <div>
            <h4>Compliance</h4>
            <ul>
              <li>GDPR Ready</li>
              <li>ISO 27001</li>
              <li>Responsible AI</li>
            </ul>
          </div>

          <div>
            <h4>Connect</h4>
            <ul>
              <li>LinkedIn</li>
              <li>Twitter</li>
              <li>GitHub</li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          © {new Date().getFullYear()} Verifex AI · Built for Enterprise Trust
        </div>
      </footer>
    </motion.div>
  );
}
