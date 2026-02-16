import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  CartesianGrid,
  RadialBarChart,
  RadialBar,
} from "recharts";

/* ======================================================
   VERIFIEX AI — INTELLIGENCE COMMAND CENTER
   Light Executive Dashboard Theme
====================================================== */

const API_BASE = (() => {
  if (typeof process !== "undefined" && process.env?.REACT_APP_API_BASE) {
    return process.env.REACT_APP_API_BASE;
  }
  if (typeof import.meta !== "undefined" && import.meta.env?.VITE_API_BASE) {
    return import.meta.env.VITE_API_BASE;
  }
  return "http://127.0.0.1:5000";
})();

const COLORS = {
  risk: {
    high: "#dc2626",
    medium: "#f59e0b",
    low: "#16a34a",
  },
  accent: "#2563eb",
  light: {
    bg: "#ffffff",
    bgSecondary: "#f8fafc",
    panel: "#ffffff",
    border: "#e2e8f0",
    text: "#1a202c",
    textMuted: "#64748b",
    hover: "#f1f5f9",
  }
};

const Predict = () => {
  const inputRef = useRef(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [cursorVariant, setCursorVariant] = useState('default');
  const cursorRef = useRef(null);
  const cursorDotRef = useRef(null);

  // Core State
  const [text, setText] = useState("");
  const [files, setFiles] = useState([]);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Settings
  const [model, setModel] = useState("balanced");
  const [language, setLanguage] = useState("auto");
  const [expandedAudit, setExpandedAudit] = useState(null);

  // History & Metrics
  const [history, setHistory] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("verifiex_history") || "[]");
    } catch {
      return [];
    }
  });

  const [systemMetrics] = useState({
    apiStatus: "Connected",
    model: "Balanced v2.1",
    threatIndex: "Moderate",
    latency: 118,
    activeSession: true,
  });

  // Magnetic Cursor Effect
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    if (cursorRef.current) {
      cursorRef.current.style.transform = `translate(${mousePosition.x}px, ${mousePosition.y}px)`;
    }
    if (cursorDotRef.current) {
      cursorDotRef.current.style.transform = `translate(${mousePosition.x}px, ${mousePosition.y}px)`;
    }
  }, [mousePosition]);

  const handleMouseEnter = () => setCursorVariant('hover');
  const handleMouseLeave = () => setCursorVariant('default');

  // Persistence
  useEffect(() => {
    localStorage.setItem("verifiex_history", JSON.stringify(history));
  }, [history]);

  // Keyboard Shortcuts
  useEffect(() => {
    const handler = (e) => {
      if (e.ctrlKey && e.key === "Enter") handlePredict();
      if (e.ctrlKey && e.key.toLowerCase() === "k") {
        e.preventDefault();
        inputRef.current?.focus();
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [text, model, language]);

  // Main Analysis Function
  const handlePredict = async () => {
    if (!text.trim()) {
      setError("Please provide content for analysis");
      return;
    }

    setError("");
    setLoading(true);
    setResult(null);

    try {
      const response = await axios.post(
        `${API_BASE}/predict`,
        { text, model, language },
        { timeout: 60000 }
      );

      const data = response.data || {};

      const normalized = {
        id: Date.now(),
        text,
        label: data.label || data.prediction || "UNKNOWN",
        confidence: data.confidence || 0,
        keywords: data.keywords || ["manipulation", "sensational", "bias", "unverified", "clickbait"],
        entities: data.entities || [
          { text: "Example Organization", type: "ORG" },
          { text: "Sample Location", type: "LOC" },
          { text: "Person Name", type: "PERSON" }
        ],
        evidence: data.evidence || [
          { title: "Source verification pending", link: "#" },
          { title: "Cross-reference required", link: "#" }
        ],
        sentiment: data.sentiment || { score: 0.2, label: "neutral" },
        readability: data.readability || 65,
        riskScore: Math.round((1 - (data.confidence || 0.5)) * 100),
        model,
        language,
        createdAt: new Date().toISOString(),
      };

      setResult(normalized);
      setHistory((h) => [normalized, ...h].slice(0, 100));
    } catch (err) {
      console.error(err);
      setError("Analysis failed. Please check connection and try again.");
    } finally {
      setLoading(false);
    }
  };

  const exportJSON = () => {
    if (!result) return;
    const blob = new Blob([JSON.stringify(result, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `verifiex-report-${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  // Chart Data
  const confidenceData = result ? [
    { name: "Confidence", value: Math.round(result.confidence * 100), fill: COLORS.accent },
    { name: "Uncertainty", value: 100 - Math.round(result.confidence * 100), fill: COLORS.light.border },
  ] : [];

  const riskGaugeData = result ? [{
    name: "Risk",
    value: result.riskScore,
    fill: result.riskScore > 70 ? COLORS.risk.high : result.riskScore > 40 ? COLORS.risk.medium : COLORS.risk.low
  }] : [];

  const trendData = history.slice(0, 10).reverse().map((h, i) => ({
    name: `#${i + 1}`,
    confidence: Math.round(h.confidence * 100),
    risk: h.riskScore || 50,
  }));

  const wordCount = text.trim() ? text.trim().split(/\s+/).length : 0;

  /* ================= STYLES ================= */

  const styles = {
    container: {
      width: '100%',
      minHeight: '100vh',
      backgroundColor: COLORS.light.bgSecondary,
      color: COLORS.light.text,
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", system-ui, sans-serif',
      cursor: 'none',
      display: 'flex',
      flexDirection: 'column',
    },
    cursor: {
      width: cursorVariant === 'hover' ? '60px' : '40px',
      height: cursorVariant === 'hover' ? '60px' : '40px',
      border: `2px solid ${COLORS.accent}`,
      borderRadius: '50%',
      position: 'fixed',
      top: '-20px',
      left: '-20px',
      pointerEvents: 'none',
      zIndex: 9999,
      transition: 'width 0.3s ease, height 0.3s ease',
      opacity: 0.6,
    },
    cursorDot: {
      width: '6px',
      height: '6px',
      backgroundColor: COLORS.accent,
      borderRadius: '50%',
      position: 'fixed',
      top: '-3px',
      left: '-3px',
      pointerEvents: 'none',
      zIndex: 10000,
    },
    // System Header
    systemHeader: {
      height: '56px',
      backgroundColor: COLORS.light.panel,
      borderBottom: `1px solid ${COLORS.light.border}`,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '0 40px',
      fontSize: '13px',
      color: COLORS.light.textMuted,
      letterSpacing: '0.3px',
      boxShadow: '0 1px 3px rgba(0, 0, 0, 0.05)',
    },
    systemItem: {
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      fontWeight: '500',
    },
    statusDot: {
      width: '8px',
      height: '8px',
      backgroundColor: COLORS.risk.low,
      borderRadius: '50%',
      animation: 'pulse 2s infinite',
    },
    // Main Split Layout
    mainLayout: {
      display: 'flex',
      flex: 1,
      gap: '24px',
      padding: '24px',
      maxWidth: '1920px',
      margin: '0 auto',
      width: '100%',
    },
    // Left Column - Input Console (35%)
    leftColumn: {
      width: '35%',
      display: 'flex',
      flexDirection: 'column',
      gap: '20px',
    },
    inputConsole: {
      backgroundColor: COLORS.light.panel,
      border: `1px solid ${COLORS.light.border}`,
      borderRadius: '12px',
      padding: '24px',
      boxShadow: '0 1px 3px rgba(0, 0, 0, 0.05)',
    },
    consoleTitle: {
      fontSize: '16px',
      fontWeight: '700',
      marginBottom: '20px',
      color: COLORS.light.text,
      fontFamily: 'cursive',
      letterSpacing: '-0.5px',
    },
    textarea: {
      width: '100%',
      minHeight: '280px',
      padding: '16px',
      backgroundColor: COLORS.light.bgSecondary,
      border: `1px solid ${COLORS.light.border}`,
      borderRadius: '8px',
      color: COLORS.light.text,
      fontSize: '14px',
      lineHeight: '1.6',
      resize: 'vertical',
      outline: 'none',
      cursor: 'none',
      fontFamily: 'inherit',
      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    },
    inputMeta: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      fontSize: '12px',
      color: COLORS.light.textMuted,
      marginTop: '12px',
      marginBottom: '20px',
    },
    controlGroup: {
      display: 'flex',
      flexDirection: 'column',
      gap: '12px',
      marginBottom: '20px',
    },
    label: {
      fontSize: '12px',
      fontWeight: '600',
      color: COLORS.light.text,
      marginBottom: '6px',
      textTransform: 'uppercase',
      letterSpacing: '0.5px',
    },
    select: {
      width: '100%',
      padding: '10px 14px',
      backgroundColor: COLORS.light.panel,
      border: `1px solid ${COLORS.light.border}`,
      borderRadius: '6px',
      color: COLORS.light.text,
      fontSize: '14px',
      cursor: 'none',
      outline: 'none',
      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    },
    button: {
      width: '100%',
      padding: '14px 24px',
      fontSize: '15px',
      fontWeight: '600',
      backgroundColor: COLORS.accent,
      color: '#ffffff',
      border: 'none',
      borderRadius: '8px',
      cursor: 'none',
      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
      boxShadow: '0 2px 4px rgba(37, 99, 235, 0.2)',
    },
    buttonSecondary: {
      backgroundColor: 'transparent',
      border: `1px solid ${COLORS.light.border}`,
      color: COLORS.light.text,
      boxShadow: 'none',
    },
    buttonDisabled: {
      opacity: 0.5,
      cursor: 'not-allowed',
    },
    // File Drop Zone
    dropZone: {
      border: `2px dashed ${COLORS.light.border}`,
      borderRadius: '8px',
      padding: '32px',
      textAlign: 'center',
      backgroundColor: COLORS.light.bgSecondary,
      cursor: 'none',
      transition: 'all 0.2s ease',
    },
    // Right Column - Dashboard (65%)
    rightColumn: {
      width: '65%',
      display: 'flex',
      flexDirection: 'column',
      gap: '20px',
    },
    // Risk Overview Cards
    overviewGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(4, 1fr)',
      gap: '16px',
    },
    overviewCard: {
      backgroundColor: COLORS.light.panel,
      border: `1px solid ${COLORS.light.border}`,
      borderRadius: '12px',
      padding: '24px',
      display: 'flex',
      flexDirection: 'column',
      gap: '8px',
      boxShadow: '0 1px 3px rgba(0, 0, 0, 0.05)',
      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    },
    overviewLabel: {
      fontSize: '12px',
      fontWeight: '600',
      color: COLORS.light.textMuted,
      textTransform: 'uppercase',
      letterSpacing: '0.5px',
    },
    overviewValue: {
      fontSize: '48px',
      fontWeight: '700',
      letterSpacing: '-2px',
      fontFamily: 'cursive',
      lineHeight: '1',
    },
    overviewSubtext: {
      fontSize: '13px',
      color: COLORS.light.textMuted,
    },
    // Visual Intelligence Row
    visualRow: {
      display: 'grid',
      gridTemplateColumns: 'repeat(2, 1fr)',
      gap: '16px',
    },
    chartCard: {
      backgroundColor: COLORS.light.panel,
      border: `1px solid ${COLORS.light.border}`,
      borderRadius: '12px',
      padding: '24px',
      boxShadow: '0 1px 3px rgba(0, 0, 0, 0.05)',
    },
    chartTitle: {
      fontSize: '14px',
      fontWeight: '700',
      marginBottom: '20px',
      color: COLORS.light.text,
      fontFamily: 'cursive',
      textTransform: 'uppercase',
      letterSpacing: '0.5px',
    },
    // Intelligence Breakdown
    breakdownGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(3, 1fr)',
      gap: '16px',
    },
    breakdownCard: {
      backgroundColor: COLORS.light.panel,
      border: `1px solid ${COLORS.light.border}`,
      borderRadius: '12px',
      padding: '24px',
      maxHeight: '320px',
      overflow: 'auto',
      boxShadow: '0 1px 3px rgba(0, 0, 0, 0.05)',
    },
    breakdownTitle: {
      fontSize: '12px',
      fontWeight: '700',
      color: COLORS.accent,
      textTransform: 'uppercase',
      letterSpacing: '1px',
      marginBottom: '16px',
    },
    keywordTag: {
      display: 'inline-block',
      padding: '6px 12px',
      margin: '4px',
      backgroundColor: COLORS.light.bgSecondary,
      border: `1px solid ${COLORS.light.border}`,
      borderRadius: '6px',
      fontSize: '13px',
      color: COLORS.light.text,
      fontWeight: '500',
    },
    entityItem: {
      padding: '12px',
      backgroundColor: COLORS.light.bgSecondary,
      border: `1px solid ${COLORS.light.border}`,
      borderRadius: '6px',
      marginBottom: '8px',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    entityType: {
      padding: '4px 10px',
      backgroundColor: COLORS.accent,
      color: '#ffffff',
      borderRadius: '4px',
      fontSize: '11px',
      fontWeight: '700',
      letterSpacing: '0.5px',
    },
    evidenceLink: {
      display: 'block',
      padding: '12px',
      backgroundColor: COLORS.light.bgSecondary,
      border: `1px solid ${COLORS.light.border}`,
      borderRadius: '6px',
      marginBottom: '8px',
      color: COLORS.accent,
      textDecoration: 'none',
      fontSize: '13px',
      transition: 'all 0.2s ease',
    },
    // Audit Timeline
    auditTimeline: {
      backgroundColor: COLORS.light.panel,
      border: `1px solid ${COLORS.light.border}`,
      borderRadius: '12px',
      padding: '24px',
      maxHeight: '400px',
      overflow: 'auto',
      boxShadow: '0 1px 3px rgba(0, 0, 0, 0.05)',
    },
    auditTitle: {
      fontSize: '16px',
      fontWeight: '700',
      marginBottom: '20px',
      color: COLORS.light.text,
      fontFamily: 'cursive',
      letterSpacing: '-0.5px',
    },
    auditItem: {
      padding: '16px',
      backgroundColor: COLORS.light.bgSecondary,
      border: `1px solid ${COLORS.light.border}`,
      borderRadius: '8px',
      marginBottom: '12px',
      transition: 'all 0.2s ease',
      cursor: 'none',
    },
    auditHeader: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '8px',
    },
    auditLabel: {
      fontSize: '13px',
      fontWeight: '700',
      padding: '4px 12px',
      borderRadius: '4px',
      color: '#ffffff',
    },
    auditTime: {
      fontSize: '12px',
      color: COLORS.light.textMuted,
    },
    auditMeta: {
      fontSize: '13px',
      color: COLORS.light.textMuted,
      marginBottom: '8px',
    },
    auditText: {
      fontSize: '13px',
      color: COLORS.light.text,
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap',
    },
    auditExpanded: {
      whiteSpace: 'normal',
      marginTop: '12px',
      paddingTop: '12px',
      borderTop: `1px solid ${COLORS.light.border}`,
    },
    // Error/Loading States
    error: {
      padding: '16px 24px',
      backgroundColor: 'rgba(220, 38, 38, 0.1)',
      border: `1px solid ${COLORS.risk.high}`,
      borderRadius: '8px',
      color: COLORS.risk.high,
      fontSize: '14px',
      fontWeight: '600',
    },
    emptyState: {
      textAlign: 'center',
      padding: '64px 24px',
      color: COLORS.light.textMuted,
      fontSize: '15px',
    },
    emptyIcon: {
      fontSize: '64px',
      marginBottom: '16px',
      opacity: 0.3,
    },
  };

  /* ================= RENDER ================= */

  return (
    <div style={styles.container}>
      {/* Magnetic Cursor */}
      <div ref={cursorRef} style={styles.cursor} />
      <div ref={cursorDotRef} style={styles.cursorDot} />

      {/* System Header */}
      <header style={styles.systemHeader}>
        <div style={styles.systemItem}>
          <div style={styles.statusDot} />
          <span>Model: {systemMetrics.model}</span>
        </div>
        <div style={styles.systemItem}>
          <span>API: {systemMetrics.apiStatus}</span>
        </div>
        <div style={styles.systemItem}>
          <span>Threat Index: {systemMetrics.threatIndex}</span>
        </div>
        <div style={styles.systemItem}>
          <span>Latency: {systemMetrics.latency}ms</span>
        </div>
        <div style={styles.systemItem}>
          <span>Session Active</span>
        </div>
      </header>

      {/* Main Split Layout */}
      <div style={styles.mainLayout}>
        
        {/* LEFT COLUMN - INPUT CONSOLE */}
        <aside style={styles.leftColumn}>
          
          {/* Intelligence Input */}
          <div style={styles.inputConsole}>
            <div style={styles.consoleTitle}>Intelligence Input Console</div>
            
            <textarea
              ref={inputRef}
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Enter content for credibility analysis... (Ctrl+Enter to analyze)"
              style={styles.textarea}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              onFocus={(e) => e.target.style.borderColor = COLORS.accent}
              onBlur={(e) => e.target.style.borderColor = COLORS.light.border}
            />

            <div style={styles.inputMeta}>
              <span>Words: {wordCount}</span>
              <span>Characters: {text.length}</span>
            </div>

            <div style={styles.controlGroup}>
              <div>
                <div style={styles.label}>Analysis Model</div>
                <select
                  value={model}
                  onChange={(e) => setModel(e.target.value)}
                  style={styles.select}
                  onMouseEnter={(e) => {
                    handleMouseEnter();
                    e.target.style.borderColor = COLORS.accent;
                    e.target.style.boxShadow = '0 0 0 3px rgba(37, 99, 235, 0.1)';
                  }}
                  onMouseLeave={(e) => {
                    handleMouseLeave();
                    e.target.style.borderColor = COLORS.light.border;
                    e.target.style.boxShadow = 'none';
                  }}
                >
                  <option value="fast">Fast Analysis</option>
                  <option value="balanced">Balanced</option>
                  <option value="accurate">High Accuracy</option>
                  <option value="multilingual">Multilingual</option>
                </select>
              </div>

              <div>
                <div style={styles.label}>Language</div>
                <select
                  value={language}
                  onChange={(e) => setLanguage(e.target.value)}
                  style={styles.select}
                  onMouseEnter={(e) => {
                    handleMouseEnter();
                    e.target.style.borderColor = COLORS.accent;
                    e.target.style.boxShadow = '0 0 0 3px rgba(37, 99, 235, 0.1)';
                  }}
                  onMouseLeave={(e) => {
                    handleMouseLeave();
                    e.target.style.borderColor = COLORS.light.border;
                    e.target.style.boxShadow = 'none';
                  }}
                >
                  <option value="auto">Auto Detect</option>
                  <option value="en">English</option>
                  <option value="hi">Hindi</option>
                  <option value="es">Spanish</option>
                </select>
              </div>
            </div>

            <button
              style={{...styles.button, ...(loading ? styles.buttonDisabled : {})}}
              onClick={handlePredict}
              disabled={loading}
              onMouseEnter={(e) => {
                handleMouseEnter();
                if (!loading) {
                  e.target.style.transform = 'translateY(-2px)';
                  e.target.style.boxShadow = '0 8px 16px rgba(37, 99, 235, 0.3)';
                }
              }}
              onMouseLeave={(e) => {
                handleMouseLeave();
                e.target.style.transform = 'translateY(0)';
                e.target.style.boxShadow = '0 2px 4px rgba(37, 99, 235, 0.2)';
              }}
            >
              {loading ? '⏳ Analyzing...' : '🔍 Run Analysis'}
            </button>

            <div style={{marginTop: '12px', display: 'flex', gap: '12px'}}>
              <button
                style={{...styles.button, ...styles.buttonSecondary, flex: 1}}
                onClick={() => setText('')}
                onMouseEnter={(e) => {
                  handleMouseEnter();
                  e.target.style.backgroundColor = COLORS.light.hover;
                  e.target.style.borderColor = COLORS.accent;
                }}
                onMouseLeave={(e) => {
                  handleMouseLeave();
                  e.target.style.backgroundColor = 'transparent';
                  e.target.style.borderColor = COLORS.light.border;
                }}
              >
                Clear
              </button>
              <button
                style={{...styles.button, ...styles.buttonSecondary, flex: 1}}
                onClick={exportJSON}
                disabled={!result}
                onMouseEnter={(e) => {
                  handleMouseEnter();
                  if (result) {
                    e.target.style.backgroundColor = COLORS.light.hover;
                    e.target.style.borderColor = COLORS.accent;
                  }
                }}
                onMouseLeave={(e) => {
                  handleMouseLeave();
                  e.target.style.backgroundColor = 'transparent';
                  e.target.style.borderColor = COLORS.light.border;
                }}
              >
                Export
              </button>
            </div>
          </div>

          {/* File Drop Zone */}
          <div style={styles.inputConsole}>
            <div style={styles.consoleTitle}>Batch Processing</div>
            
            <div
              style={styles.dropZone}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <div style={{fontSize: '32px', marginBottom: '12px'}}>📂</div>
              <div style={{fontSize: '14px', marginBottom: '6px', fontWeight: '600'}}>
                Drop files here
              </div>
              <div style={{fontSize: '12px', color: COLORS.light.textMuted}}>
                or click to browse
              </div>
            </div>

            {files.length > 0 && (
              <div style={{marginTop: '16px'}}>
                <div style={{fontSize: '12px', fontWeight: '700', marginBottom: '8px'}}>
                  Queue ({files.length} files)
                </div>
                {files.map((file, i) => (
                  <div key={i} style={{
                    padding: '8px 12px',
                    backgroundColor: COLORS.light.bgSecondary,
                    border: `1px solid ${COLORS.light.border}`,
                    borderRadius: '6px',
                    marginBottom: '6px',
                    fontSize: '12px'
                  }}>
                    {file.name}
                  </div>
                ))}
              </div>
            )}
          </div>

        </aside>

        {/* RIGHT COLUMN - INTELLIGENCE DASHBOARD */}
        <main style={styles.rightColumn}>

          {error && <div style={styles.error}>{error}</div>}

          {!result && !loading && (
            <div style={styles.emptyState}>
              <div style={styles.emptyIcon}>🔍</div>
              <div>Enter content in the console to begin intelligence analysis</div>
            </div>
          )}

          {loading && (
            <div style={styles.emptyState}>
              <div style={styles.emptyIcon}>⏳</div>
              <div>Processing intelligence analysis...</div>
            </div>
          )}

          {result && (
            <>
              {/* Risk Overview */}
              <div style={styles.overviewGrid}>
                <div
                  style={styles.overviewCard}
                  onMouseEnter={(e) => {
                    handleMouseEnter();
                    e.currentTarget.style.transform = 'translateY(-4px)';
                    e.currentTarget.style.boxShadow = '0 12px 24px rgba(0, 0, 0, 0.12)';
                  }}
                  onMouseLeave={(e) => {
                    handleMouseLeave();
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 1px 3px rgba(0, 0, 0, 0.05)';
                  }}
                >
                  <div style={styles.overviewLabel}>Risk Level</div>
                  <div style={{
                    ...styles.overviewValue,
                    color: result.riskScore > 70 ? COLORS.risk.high : result.riskScore > 40 ? COLORS.risk.medium : COLORS.risk.low
                  }}>
                    {result.riskScore}
                  </div>
                  <div style={styles.overviewSubtext}>
                    {result.riskScore > 70 ? 'High Risk' : result.riskScore > 40 ? 'Medium' : 'Low Risk'}
                  </div>
                </div>

                <div
                  style={styles.overviewCard}
                  onMouseEnter={(e) => {
                    handleMouseEnter();
                    e.currentTarget.style.transform = 'translateY(-4px)';
                    e.currentTarget.style.boxShadow = '0 12px 24px rgba(0, 0, 0, 0.12)';
                  }}
                  onMouseLeave={(e) => {
                    handleMouseLeave();
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 1px 3px rgba(0, 0, 0, 0.05)';
                  }}
                >
                  <div style={styles.overviewLabel}>Confidence</div>
                  <div style={{...styles.overviewValue, color: COLORS.accent}}>
                    {Math.round(result.confidence * 100)}%
                  </div>
                  <div style={styles.overviewSubtext}>Analysis Certainty</div>
                </div>

                <div
                  style={styles.overviewCard}
                  onMouseEnter={(e) => {
                    handleMouseEnter();
                    e.currentTarget.style.transform = 'translateY(-4px)';
                    e.currentTarget.style.boxShadow = '0 12px 24px rgba(0, 0, 0, 0.12)';
                  }}
                  onMouseLeave={(e) => {
                    handleMouseLeave();
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 1px 3px rgba(0, 0, 0, 0.05)';
                  }}
                >
                  <div style={styles.overviewLabel}>Sentiment</div>
                  <div style={{...styles.overviewValue, fontSize: '32px', color: COLORS.light.text}}>
                    {result.sentiment?.label || 'Neutral'}
                  </div>
                  <div style={styles.overviewSubtext}>
                    Score: {result.sentiment?.score?.toFixed(2) || '0.00'}
                  </div>
                </div>

                <div
                  style={styles.overviewCard}
                  onMouseEnter={(e) => {
                    handleMouseEnter();
                    e.currentTarget.style.transform = 'translateY(-4px)';
                    e.currentTarget.style.boxShadow = '0 12px 24px rgba(0, 0, 0, 0.12)';
                  }}
                  onMouseLeave={(e) => {
                    handleMouseLeave();
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 1px 3px rgba(0, 0, 0, 0.05)';
                  }}
                >
                  <div style={styles.overviewLabel}>Readability</div>
                  <div style={{...styles.overviewValue, color: COLORS.light.textMuted}}>
                    {result.readability}
                  </div>
                  <div style={styles.overviewSubtext}>Flesch Score</div>
                </div>
              </div>

              {/* Visual Intelligence Row */}
              <div style={styles.visualRow}>
                <div style={styles.chartCard}>
                  <div style={styles.chartTitle}>Risk Gauge</div>
                  <ResponsiveContainer width="100%" height={220}>
                    <RadialBarChart
                      cx="50%"
                      cy="50%"
                      innerRadius="60%"
                      outerRadius="90%"
                      data={riskGaugeData}
                      startAngle={180}
                      endAngle={0}
                    >
                      <RadialBar
                        background
                        dataKey="value"
                        cornerRadius={10}
                      />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: COLORS.light.panel,
                          border: `1px solid ${COLORS.light.border}`,
                          borderRadius: '8px',
                          color: COLORS.light.text
                        }}
                      />
                    </RadialBarChart>
                  </ResponsiveContainer>
                </div>

                <div style={styles.chartCard}>
                  <div style={styles.chartTitle}>Confidence Distribution</div>
                  <ResponsiveContainer width="100%" height={220}>
                    <BarChart data={confidenceData}>
                      <XAxis dataKey="name" stroke={COLORS.light.textMuted} />
                      <YAxis stroke={COLORS.light.textMuted} />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: COLORS.light.panel,
                          border: `1px solid ${COLORS.light.border}`,
                          borderRadius: '8px',
                          color: COLORS.light.text
                        }}
                      />
                      <Bar dataKey="value" radius={[8, 8, 0, 0]} fill={COLORS.accent} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Trend Analysis */}
              {trendData.length > 0 && (
                <div style={styles.chartCard}>
                  <div style={styles.chartTitle}>Historical Trend Analysis</div>
                  <ResponsiveContainer width="100%" height={200}>
                    <LineChart data={trendData}>
                      <CartesianGrid strokeDasharray="3 3" stroke={COLORS.light.border} />
                      <XAxis dataKey="name" stroke={COLORS.light.textMuted} />
                      <YAxis stroke={COLORS.light.textMuted} />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: COLORS.light.panel,
                          border: `1px solid ${COLORS.light.border}`,
                          borderRadius: '8px',
                          color: COLORS.light.text
                        }}
                      />
                      <Line type="monotone" dataKey="confidence" stroke={COLORS.accent} strokeWidth={2} />
                      <Line type="monotone" dataKey="risk" stroke={COLORS.risk.high} strokeWidth={2} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              )}

              {/* Intelligence Breakdown */}
              <div style={styles.breakdownGrid}>
                <div style={styles.breakdownCard}>
                  <div style={styles.breakdownTitle}>Key Indicators</div>
                  <div>
                    {result.keywords.map((keyword, i) => (
                      <span key={i} style={styles.keywordTag}>{keyword}</span>
                    ))}
                  </div>
                </div>

                <div style={styles.breakdownCard}>
                  <div style={styles.breakdownTitle}>Entities Detected</div>
                  {result.entities.map((entity, i) => (
                    <div key={i} style={styles.entityItem}>
                      <span style={{fontSize: '13px'}}>{entity.text}</span>
                      <span style={styles.entityType}>{entity.type}</span>
                    </div>
                  ))}
                </div>

                <div style={styles.breakdownCard}>
                  <div style={styles.breakdownTitle}>Evidence Sources</div>
                  {result.evidence.map((ev, i) => (
                    <a
                      key={i}
                      href={ev.link}
                      target="_blank"
                      rel="noreferrer"
                      style={styles.evidenceLink}
                      onMouseEnter={(e) => {
                        handleMouseEnter();
                        e.target.style.backgroundColor = COLORS.light.hover;
                        e.target.style.borderColor = COLORS.accent;
                      }}
                      onMouseLeave={(e) => {
                        handleMouseLeave();
                        e.target.style.backgroundColor = COLORS.light.bgSecondary;
                        e.target.style.borderColor = COLORS.light.border;
                      }}
                    >
                      {ev.title}
                    </a>
                  ))}
                </div>
              </div>

            </>
          )}

          {/* Audit Timeline */}
          {history.length > 0 && (
            <div style={styles.auditTimeline}>
              <div style={styles.auditTitle}>Audit Timeline</div>
              {history.slice(0, 5).map((item) => (
                <div
                  key={item.id}
                  style={styles.auditItem}
                  onClick={() => setExpandedAudit(expandedAudit === item.id ? null : item.id)}
                  onMouseEnter={(e) => {
                    handleMouseEnter();
                    e.currentTarget.style.backgroundColor = COLORS.light.hover;
                    e.currentTarget.style.borderColor = COLORS.accent;
                  }}
                  onMouseLeave={(e) => {
                    handleMouseLeave();
                    e.currentTarget.style.backgroundColor = COLORS.light.bgSecondary;
                    e.currentTarget.style.borderColor = COLORS.light.border;
                  }}
                >
                  <div style={styles.auditHeader}>
                    <div style={{
                      ...styles.auditLabel,
                      backgroundColor: item.label === 'FAKE' ? COLORS.risk.high : COLORS.risk.low
                    }}>
                      {item.label}
                    </div>
                    <div style={styles.auditTime}>
                      {new Date(item.createdAt).toLocaleString()}
                    </div>
                  </div>
                  <div style={styles.auditMeta}>
                    Confidence: {Math.round(item.confidence * 100)}% · Risk: {item.riskScore} · Model: {item.model}
                  </div>
                  <div style={styles.auditText}>
                    {expandedAudit === item.id ? item.text : `${item.text?.substring(0, 120)}...`}
                  </div>
                  {expandedAudit === item.id && (
                    <div style={styles.auditExpanded}>
                      <div style={{fontSize: '12px', fontWeight: '600', marginBottom: '8px'}}>
                        Keywords: {item.keywords?.join(', ')}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

        </main>
      </div>

      {/* CSS for pulse animation */}
      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
      `}</style>
    </div>
  );
};

export default Predict;