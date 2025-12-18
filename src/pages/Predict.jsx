import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import "./Predict.css";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
  LineChart,
  Line,
  CartesianGrid,
} from "recharts";

import WordCloud from "react-d3-cloud";

/* ======================================================
   API BASE RESOLUTION (Enterprise-safe)
====================================================== */

const API_BASE = (() => {
  if (typeof process !== "undefined" && process.env?.REACT_APP_API_BASE) {
    return process.env.REACT_APP_API_BASE;
  }
  if (typeof import.meta !== "undefined" && import.meta.env?.VITE_API_BASE) {
    return import.meta.env.VITE_API_BASE;
  }
  if (typeof window !== "undefined" && window.__REACT_APP_API_BASE) {
    return window.__REACT_APP_API_BASE;
  }
  return "http://127.0.0.1:5000";
})();

const COLORS = ["#dc2626", "#16a34a"];

/* ======================================================
   MAIN COMPONENT
====================================================== */

const Predict = () => {
  const inputRef = useRef(null);

  const [text, setText] = useState("");
  const [files, setFiles] = useState([]);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [history, setHistory] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("ng_history_v1") || "[]");
    } catch {
      return [];
    }
  });

  const [darkMode, setDarkMode] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("ng_dark_v1") || "false");
    } catch {
      return false;
    }
  });

  const [model, setModel] = useState("balanced");
  const [language, setLanguage] = useState("auto");
  const [queue, setQueue] = useState([]);
  const [showExplain, setShowExplain] = useState(true);

  /* ======================================================
     PERSISTENCE
  ====================================================== */

  useEffect(() => {
    localStorage.setItem("ng_history_v1", JSON.stringify(history));
  }, [history]);

  useEffect(() => {
    localStorage.setItem("ng_dark_v1", JSON.stringify(darkMode));
    document.documentElement.classList.toggle("dark", darkMode);
  }, [darkMode]);

  /* ======================================================
     KEYBOARD SHORTCUTS
  ====================================================== */

  useEffect(() => {
    const handler = (e) => {
      if (e.ctrlKey && e.key === "Enter") handlePredict();
      if (e.ctrlKey && e.key.toLowerCase() === "k") {
        e.preventDefault();
        inputRef.current?.focus();
      }
      if (e.key === "?") setShowExplain((s) => !s);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  /* ======================================================
     HELPERS
  ====================================================== */

  const wordCount = text.trim() ? text.trim().split(/\s+/).length : 0;

  const handleFileInput = (e) => {
    setFiles(Array.from(e.target.files || []));
  };

  const enqueueFiles = () => {
    const jobs = files.map((file) => ({
      id: Date.now() + Math.random(),
      file,
      status: "pending",
    }));
    setQueue((q) => [...q, ...jobs]);
    setFiles([]);
  };

  /* ======================================================
     EXPORT UTILITIES
  ====================================================== */

  const exportJSON = (data, name) => {
    const blob = new Blob([JSON.stringify(data, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = name;
    a.click();
    URL.revokeObjectURL(url);
  };

  /* ======================================================
     MAIN PREDICTION
  ====================================================== */

  const handlePredict = async (opts = {}) => {
    const payloadText = opts.text ?? text;
    const payloadFile = opts.file ?? null;

    if (!payloadText.trim() && !payloadFile) {
      setError("Please provide text or upload a file for analysis.");
      return;
    }

    setError("");
    setLoading(true);
    setResult(null);

    try {
      let response;

      if (payloadFile) {
        const fd = new FormData();
        fd.append("file", payloadFile);
        fd.append("model", model);
        fd.append("language", language);

        response = await axios.post(`${API_BASE}/predict_file`, fd, {
          headers: { "Content-Type": "multipart/form-data" },
          timeout: 120000,
        });
      } else {
        response = await axios.post(
          `${API_BASE}/predict`,
          { text: payloadText, model, language },
          { timeout: 60000 }
        );
      }

      const data = response.data || {};

      const normalized = {
        id: Date.now(),
        text: payloadText,
        fileName: payloadFile?.name || null,
        label: data.label || data.prediction || "UNKNOWN",
        confidence: data.confidence || 0,
        keywords: data.keywords || [],
        entities: data.entities || [],
        evidence: data.evidence || [],
        sentiment: data.sentiment || null,
        readability: data.readability || null,
        model,
        language,
        createdAt: new Date().toISOString(),
      };

      setResult(normalized);
      setHistory((h) => [normalized, ...h].slice(0, 200));
    } catch (err) {
      console.error(err);
      setError("Analysis failed due to a server or network issue.");
    } finally {
      setLoading(false);
    }
  };

  /* ======================================================
     CHART DATA
  ====================================================== */

  const chartData = result
    ? [
        {
          name: "Confidence",
          value: Math.round(result.confidence * 100),
        },
        {
          name: "Uncertainty",
          value: 100 - Math.round(result.confidence * 100),
        },
      ]
    : [];

  const lineData = history.map((h, i) => ({
    name: `#${history.length - i}`,
    confidence: Math.round((h.confidence || 0) * 100),
  }));

  const wordsData = (result?.keywords || []).map((w, i) => ({
    text: w,
    value: Math.max(8, 30 - i),
  }));

  /* ======================================================
     RENDER
  ====================================================== */

  return (
    <main className={`predict-main ${darkMode ? "dark" : ""}`}>
      <div className="predict-container">

        {/* HEADER */}
        <header className="predict-header">
          <h1>NewsGuard AI — Credibility Analysis Platform</h1>

          <div className="header-controls">
            <label>Model</label>
            <select value={model} onChange={(e) => setModel(e.target.value)}>
              <option value="fast">Fast</option>
              <option value="balanced">Balanced</option>
              <option value="accurate">High Accuracy</option>
              <option value="multilingual">Multilingual</option>
            </select>

            <button onClick={() => setDarkMode((d) => !d)}>
              {darkMode ? "Light Mode" : "Dark Mode"}
            </button>
          </div>
        </header>

        {/* INPUT */}
        <section className="input-section">
          <textarea
            ref={inputRef}
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Paste or type news content for analysis (Ctrl + Enter)"
          />

          <div className="input-meta">
            <span>Words: {wordCount}</span>
            <span>
              Language:
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
              >
                <option value="auto">Auto</option>
                <option value="en">English</option>
                <option value="hi">Hindi</option>
              </select>
            </span>
          </div>

          <div className="actions">
            <input type="file" multiple onChange={handleFileInput} />
            <button onClick={enqueueFiles} disabled={!files.length}>
              Queue Files
            </button>
            <button onClick={handlePredict} disabled={loading}>
              {loading ? "Processing…" : "Analyze"}
            </button>
            <button onClick={() => setText("")}>Clear</button>
          </div>
        </section>

        {error && <div className="error">{error}</div>}

        {/* RESULT */}
        {result && (
          <section className="result-section">
            <h2>
              Classification Result:{" "}
              {result.label === "FAKE" ? "High Risk" : "Low Risk"}
            </h2>

            <p>Confidence: {(result.confidence * 100).toFixed(2)}%</p>

            <div className="export-actions">
              <button onClick={() => exportJSON(result, "report.json")}>
                Export JSON
              </button>
              <button onClick={() => navigator.clipboard.writeText(JSON.stringify(result, null, 2))}>
                Copy Report
              </button>
            </div>

            {showExplain && (
              <div className="explain-grid">
                <div>
                  <h4>Key Indicators</h4>
                  <ul>
                    {result.keywords.map((k, i) => (
                      <li key={i}>{k}</li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4>Entities</h4>
                  <ul>
                    {result.entities.map((e, i) => (
                      <li key={i}>{e.text} ({e.type})</li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4>Evidence</h4>
                  <ul>
                    {result.evidence.map((ev, i) => (
                      <li key={i}>
                        <a href={ev.link} target="_blank" rel="noreferrer">
                          {ev.title || ev.link}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
          </section>
        )}

        {/* CHARTS */}
        {result && (
          <section className="charts">
            <ResponsiveContainer width="100%" height={240}>
              <BarChart data={chartData}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="value" fill={result.label === "FAKE" ? COLORS[0] : COLORS[1]} />
              </BarChart>
            </ResponsiveContainer>
          </section>
        )}

        {/* HISTORY */}
        <section className="history">
          <h3>Recent Analyses</h3>

          {history.map((h) => (
            <div key={h.id} className="history-item">
              <div>
                <strong>{h.label}</strong> —{" "}
                {(h.confidence * 100).toFixed(1)}%
              </div>
              <small>{new Date(h.createdAt).toLocaleString()}</small>
            </div>
          ))}
        </section>

        <footer className="predict-footer">
          <span>
            Keyboard: Ctrl+Enter (Analyze), Ctrl+K (Focus), ? (Explainability)
          </span>
        </footer>

      </div>
    </main>
  );
};

export default Predict;
