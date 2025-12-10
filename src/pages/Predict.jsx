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

/**
 * Predict.jsx (Feature-rich)
 * - Text + file uploader (drag & drop)
 * - Batch uploads support (queued processing)
 * - Model selection (fast / accurate / multilingual)
 * - Explainability breakdown: keywords, evidence links, NER highlights
 * - Cross-check placeholder: fact-check sources (integration point)
 * - Readability & toxicity scores (placeholders)
 * - Local history (localStorage) with export (JSON/CSV)
 * - Share / copy report, download PDF (server-side), download JSON (client-side)
 * - Streaming / progress UI placeholders for long jobs
 * - Accessibility and keyboard shortcuts (Ctrl+Enter to run)
 * - Dark mode, responsive charts, graceful error handling
 *
 * Safe env var resolution used below so browsers without `process` won't crash.
 *
 * How to set API base:
 * - CRA: add REACT_APP_API_BASE to .env
 * - Vite: add VITE_API_BASE to .env
 * - Runtime: set window.__REACT_APP_API_BASE before bundle runs
 */

const API_BASE = (() => {
  // CRA / webpack
  if (typeof process !== "undefined" && process.env && process.env.REACT_APP_API_BASE) {
    console.info("API_BASE from process.env.REACT_APP_API_BASE");
    return process.env.REACT_APP_API_BASE;
  }
  // Vite
  if (typeof import.meta !== "undefined" && import.meta.env && import.meta.env.VITE_API_BASE) {
    console.info("API_BASE from import.meta.env.VITE_API_BASE");
    return import.meta.env.VITE_API_BASE;
  }
  // runtime override (index.html)
  if (typeof window !== "undefined" && window.__REACT_APP_API_BASE) {
    console.info("API_BASE from window.__REACT_APP_API_BASE");
    return window.__REACT_APP_API_BASE;
  }
  // default fallback
  console.info("API_BASE using default http://127.0.0.1:5000");
  return "http://127.0.0.1:5000";
})();

const COLORS = ["#ef4444", "#22c55e"];

const Predict = () => {
  const [text, setText] = useState("");
  const [files, setFiles] = useState([]); // support multiple files
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [history, setHistory] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("ng_predict_history_v1") || "[]");
    } catch {
      return [];
    }
  });
  const [darkMode, setDarkMode] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("ng_dark_mode_v1") || "false");
    } catch {
      return false;
    }
  });
  const [model, setModel] = useState("balanced"); // fast | balanced | accurate | multilingual
  const [language, setLanguage] = useState("auto");
  const [queue, setQueue] = useState([]); // queued batch jobs
  const [processingId, setProcessingId] = useState(null);
  const [showExplain, setShowExplain] = useState(true);
  const inputRef = useRef(null);

  useEffect(() => {
    try {
      localStorage.setItem("ng_predict_history_v1", JSON.stringify(history));
    } catch {}
  }, [history]);

  useEffect(() => {
    try {
      localStorage.setItem("ng_dark_mode_v1", JSON.stringify(darkMode));
    } catch {}
    document.documentElement.classList.toggle("dark", darkMode);
  }, [darkMode]);

  // Keyboard shortcuts: Ctrl+Enter to run; Ctrl+K focus
  useEffect(() => {
    const onKey = (e) => {
      if (e.ctrlKey && e.key === "Enter") {
        // call handlePredict safely (declared below)
        if (typeof handlePredict === "function") handlePredict();
      }
      if (e.ctrlKey && e.key.toLowerCase() === "k") {
        e.preventDefault();
        inputRef.current?.focus();
      }
      if (e.key === "?") setShowExplain((s) => !s);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // empty deps — handler calls handlePredict via reference

  const wordCount = text.trim() ? text.trim().split(/\s+/).length : 0;
  const charCount = text.length;

  const handleFileInput = (e) => {
    const incoming = Array.from(e.target.files || []);
    setFiles((f) => [...f, ...incoming]);
  };

  const onDrop = (e) => {
    e.preventDefault();
    const incoming = Array.from(e.dataTransfer.files || []);
    setFiles((f) => [...f, ...incoming]);
  };

  const onDragOver = (e) => e.preventDefault();

  const enqueueFiles = (list) => {
    // convert files into queue jobs
    const jobs = list.map((file) => ({ id: Date.now() + Math.random(), file, status: "pending" }));
    setQueue((q) => [...q, ...jobs]);
  };

  const clearHistory = () => {
    setHistory([]);
    try {
      localStorage.removeItem("ng_predict_history_v1");
    } catch {}
  };

  const exportHistoryJSON = () => {
    try {
      const blob = new Blob([JSON.stringify({ history, exportedAt: new Date().toISOString() }, null, 2)], { type: "application/json" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `newsguard_history_${new Date().toISOString()}.json`;
      a.click();
      URL.revokeObjectURL(url);
    } catch (err) {
      console.error(err);
      alert("Failed to export history.");
    }
  };

  const exportHistoryCSV = () => {
    try {
      const rows = ["id,label,confidence,createdAt,textSnippet"].concat(
        history.map((h) => `${h.id},${h.label},${(h.confidence * 100).toFixed(2)},${h.createdAt},"${String(h.text || "").replace(/"/g, '""').slice(0, 80)}"`)
      );
      const blob = new Blob([rows.join("\n")], { type: "text/csv" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `newsguard_history_${new Date().toISOString()}.csv`;
      a.click();
      URL.revokeObjectURL(url);
    } catch (err) {
      console.error(err);
      alert("Failed to export CSV.");
    }
  };

  const copyReportToClipboard = async (r) => {
    try {
      await navigator.clipboard.writeText(JSON.stringify(r, null, 2));
      alert("Report copied to clipboard!");
    } catch (e) {
      console.warn(e);
      alert("Failed to copy. You can export JSON instead.");
    }
  };

  const downloadReportJSON = (r) => {
    try {
      const blob = new Blob([JSON.stringify(r, null, 2)], { type: "application/json" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `newsguard_report_${new Date().toISOString()}.json`;
      a.click();
      URL.revokeObjectURL(url);
    } catch (err) {
      console.error(err);
      alert("Failed to download report JSON.");
    }
  };

  // handlePredict is declared as function so keyboard listener can call it safely
  const handlePredict = async (opts = {}) => {
    // opts: { fromHistory, textOverride, file }
    const payloadText = opts.textOverride ?? text;
    const payloadFile = opts.file ?? (files[0] ?? null);

    if (!payloadText.trim() && !payloadFile) {
      setError("Please enter text or upload a file.");
      return;
    }
    setError("");
    setLoading(true);
    setResult(null);

    try {
      // choose endpoint based on file vs text and model
      let response;
      if (payloadFile) {
        const fd = new FormData();
        fd.append("file", payloadFile);
        fd.append("model", model);
        fd.append("language", language);
        // server should support multi-file / OCR if pdf/image
        response = await axios.post(`${API_BASE}/predict_file`, fd, {
          headers: { "Content-Type": "multipart/form-data" },
          onUploadProgress: (e) => {
            // optional: show upload progress
          },
          timeout: 120000,
        });
      } else {
        response = await axios.post(
          `${API_BASE}/predict`,
          { text: payloadText, model, language },
          { timeout: 60000 }
        );
      }

      // expected structured response: { label, confidence (0-1), keywords:[], entities:[], evidence:[], sentiment, readability }
      const data = response.data || {};
      const normalized = {
        id: Date.now(),
        text: payloadText.slice(0, 10000),
        fileName: payloadFile?.name || null,
        label: data.prediction || data.label || "UNKNOWN",
        confidence: typeof data.confidence === "number" ? data.confidence : (data.confidence?.score ?? 0),
        keywords: data.keywords || [],
        entities: data.entities || [],
        evidence: data.evidence || [],
        sentiment: data.sentiment || null,
        readability: data.readability || null,
        model: model,
        language: language,
        createdAt: new Date().toISOString(),
      };

      setResult(normalized);
      setHistory((h) => [normalized, ...h].slice(0, 200));

      // If batch: mark job as done
      if (opts.jobId) {
        setQueue((q) => q.map((j) => (j.id === opts.jobId ? { ...j, status: "done", result: normalized } : j)));
      }
    } catch (err) {
      console.error(err);
      setError("Server error or timeout — try again or check your backend.");
    } finally {
      setLoading(false);
    }
  };

  // Batch processor: process queue one-by-one
  useEffect(() => {
    if (!queue.length) return;
    // find next pending
    const next = queue.find((j) => j.status === "pending");
    if (!next) return;
    (async () => {
      setQueue((q) => q.map((j) => (j.id === next.id ? { ...j, status: "processing" } : j)));
      setProcessingId(next.id);
      try {
        await handlePredict({ file: next.file, jobId: next.id });
        setQueue((q) => q.map((j) => (j.id === next.id ? { ...j, status: "done" } : j)));
      } catch (e) {
        setQueue((q) => q.map((j) => (j.id === next.id ? { ...j, status: "error" } : j)));
      }
      setProcessingId(null);
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [queue]);

  const fakeCount = history.filter((h) => h.label === "FAKE").length;
  const realCount = history.filter((h) => h.label === "REAL").length;
  const pieData = [
    { name: "FAKE", value: fakeCount },
    { name: "REAL", value: realCount },
  ];

  const lineData = history.map((h, idx) => ({ name: `#${history.length - idx}`, confidence: Math.round((h.confidence || 0) * 100), label: h.label }));

  const chartData = result ? [{ name: "Confidence", value: Math.round((result.confidence || 0) * 100) }, { name: "Uncertainty", value: 100 - Math.round((result.confidence || 0) * 100) }] : [];

  const wordsData = (result?.keywords || []).map((w, i) => ({ text: w, value: Math.max(6, 30 - i) }));
  const fontSizeMapper = (word) => Math.log2(word.value + 1) * 8;

  return (
    <div className={`predict-main ${darkMode ? "dark" : ""}`}>
      <div className="predict-container max-w-4xl mx-auto p-4">
        <header className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-bold">📰 NewsGuard AI — Fake News Detector</h1>
          <div className="flex items-center gap-3">
            <label className="text-sm">Model</label>
            <select value={model} onChange={(e) => setModel(e.target.value)} className="p-1 rounded border">
              <option value="fast">Fast (low latency)</option>
              <option value="balanced">Balanced</option>
              <option value="accurate">Accurate (slower)</option>
              <option value="multilingual">Multilingual</option>
            </select>
            <button onClick={() => setDarkMode((d) => !d)} className="px-2 py-1 border rounded">{darkMode ? "☀️" : "🌙"}</button>
          </div>
        </header>

        {/* uploader + text area */}
        <section className="mb-4">
          <div className="mb-2 text-sm text-gray-600">Paste text or upload files (PDF, TXT, DOCX). Use drag & drop below to queue multiple files.</div>

          <div onDrop={onDrop} onDragOver={onDragOver} className="uploader p-3 rounded border-dashed border-2 border-gray-300 dark:border-gray-700 mb-2">
            <input ref={inputRef} type="file" multiple onChange={handleFileInput} className="mb-2" />
            <textarea aria-label="News text" value={text} onChange={(e) => setText(e.target.value)} placeholder="Paste or type your article... (Ctrl+Enter to analyze)" rows={6} className="w-full p-2 rounded border" />
            <div className="flex items-center justify-between mt-2 text-sm text-gray-600">
              <div>Words: {wordCount} • Characters: {charCount}</div>
              <div>Language: <select value={language} onChange={(e) => setLanguage(e.target.value)} className="p-1 rounded border ml-2"><option value="auto">Auto</option><option value="en">English</option><option value="hi">Hindi</option></select></div>
            </div>

            <div className="mt-3 flex gap-2">
              <button onClick={() => { enqueueFiles(files); setFiles([]); }} className="px-4 py-2 bg-yellow-500 text-white rounded" disabled={!files.length}>Queue Files</button>
              <button onClick={() => handlePredict()} className="px-4 py-2 bg-blue-600 text-white rounded" disabled={loading}>{loading ? "Processing..." : "Analyze"}</button>
              <button onClick={() => { setText(""); setResult(null); }} className="px-4 py-2 border rounded">Clear</button>
              <button onClick={() => { setFiles([]); setQueue([]); }} className="px-4 py-2 border rounded">Clear Queue</button>
            </div>
          </div>

          {/* queued list */}
          {queue.length > 0 && (
            <div className="mb-2">
              <strong>Queue ({queue.length})</strong>
              <ul className="mt-2 space-y-1 text-sm">
                {queue.map((j) => (
                  <li key={j.id} className="flex items-center justify-between p-2 bg-gray-50 dark:bg-gray-900 rounded">
                    <div>{j.file.name}</div>
                    <div className="flex items-center gap-2">
                      <div className="text-xs text-gray-500">{j.status}</div>
                      {j.status === "pending" && <button onClick={() => setQueue((q) => q.filter(x => x.id !== j.id))} className="text-xs underline">Remove</button>}
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </section>

        {/* Error */}
        {error && <div className="mb-3 text-red-600">{error}</div>}

        {/* Result card */}
        {result && (
          <section className={`result-card mb-4 p-4 rounded border ${result.label === "FAKE" ? "bg-red-50 dark:bg-red-900" : "bg-green-50 dark:bg-green-900"}`}>
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2 className="text-lg font-semibold">{result.label === "FAKE" ? "🚨 Likely FAKE" : "✅ Likely REAL"}</h2>
                <div className="text-sm text-gray-600">Confidence: {(result.confidence * 100 || 0).toFixed(2)}%</div>
                {result.sentiment && <div className="text-sm">Sentiment: {result.sentiment}</div>}
                {result.readability && <div className="text-sm">Readability score: {result.readability}</div>}
              </div>

              <div className="flex flex-col items-end gap-2">
                <div className="text-xs">Model: {result.model}</div>
                <div className="text-xs">Checked: {new Date(result.createdAt).toLocaleString()}</div>
                <div className="flex gap-2 mt-2">
                  <button onClick={() => downloadReportJSON(result)} className="px-3 py-1 border rounded text-sm">Export JSON</button>
                  <button onClick={() => copyReportToClipboard(result)} className="px-3 py-1 border rounded text-sm">Copy</button>
                  <button onClick={() => { /* server-side PDF download previously implemented */ window.open(`${API_BASE}/download-report?id=${result.id}`, '_blank'); }} className="px-3 py-1 border rounded text-sm">Download PDF</button>
                </div>
              </div>
            </div>

            {/* Explainability */}
            {showExplain && (
              <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-3">
                <div className="p-2 rounded bg-white dark:bg-gray-800">
                  <h4 className="font-semibold">Top Keywords</h4>
                  <ul className="text-sm mt-2">
                    {(result.keywords || []).slice(0, 8).map((k, i) => <li key={i}>• {k}</li>)}
                    {!result.keywords?.length && <li className="text-xs text-gray-500">No keywords provided by model.</li>}
                  </ul>
                </div>

                <div className="p-2 rounded bg-white dark:bg-gray-800">
                  <h4 className="font-semibold">Named Entities</h4>
                  <ul className="text-sm mt-2">
                    {(result.entities || []).map((e, i) => <li key={i}>• {e.text} ({e.type})</li>)}
                    {!result.entities?.length && <li className="text-xs text-gray-500">No entities detected.</li>}
                  </ul>
                </div>

                <div className="p-2 rounded bg-white dark:bg-gray-800">
                  <h4 className="font-semibold">Evidence / Sources</h4>
                  <ul className="text-sm mt-2">
                    {(result.evidence || []).map((ev, i) => (<li key={i}><a href={ev.link} target="_blank" rel="noopener noreferrer" className="underline">{ev.title || ev.link}</a></li>))}
                    {!result.evidence?.length && <li className="text-xs text-gray-500">No external evidence provided (integration point).</li>}
                  </ul>
                </div>
              </div>
            )}
          </section>
        )}

        {/* Charts */}
        <section className="charts grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          {result && (
            <div className="p-3 rounded bg-white dark:bg-gray-900">
              <h4 className="font-semibold mb-2">Confidence Breakdown</h4>
              <ResponsiveContainer width="100%" height={220}>
                <BarChart data={chartData}>
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="value" fill={result.label === "FAKE" ? COLORS[0] : COLORS[1]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          )}

          {history.length > 1 && (
            <div className="p-3 rounded bg-white dark:bg-gray-900">
              <h4 className="font-semibold mb-2">Trend (Confidence over time)</h4>
              <ResponsiveContainer width="100%" height={220}>
                <LineChart data={lineData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis domain={[0, 100]} />
                  <Tooltip />
                  <Line type="monotone" dataKey="confidence" stroke="#8884d8" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          )}
        </section>

        {/* WordCloud */}
        {wordsData.length > 0 && (
          <section className="mb-4 p-3 rounded bg-white dark:bg-gray-900">
            <h4 className="font-semibold mb-2">Influential Keywords (Word Cloud)</h4>
            <div style={{ width: "100%", height: 220 }}>
              <WordCloud data={wordsData} fontSizeMapper={fontSizeMapper} rotate={() => 0} />
            </div>
          </section>
        )}

        {/* History */}
        <section className="history mb-6 p-3 rounded bg-gray-50 dark:bg-gray-800">
          <div className="flex items-center justify-between mb-2">
            <h4 className="font-semibold">Recent Checks</h4>
            <div className="flex gap-2">
              <button onClick={exportHistoryJSON} className="px-3 py-1 border rounded text-sm">Export JSON</button>
              <button onClick={exportHistoryCSV} className="px-3 py-1 border rounded text-sm">Export CSV</button>
              <button onClick={clearHistory} className="px-3 py-1 border rounded text-sm">Clear</button>
            </div>
          </div>

          <div className="space-y-2">
            {history.length === 0 && <div className="text-sm text-gray-500">No checks yet — run an analysis to populate history.</div>}
            {history.map((h) => (
              <div key={h.id} className="p-2 rounded bg-white dark:bg-gray-900 flex items-start justify-between">
                <div>
                  <div className="text-sm font-medium">{h.text?.slice(0, 120) || h.fileName}</div>
                  <div className="text-xs text-gray-500">{new Date(h.createdAt).toLocaleString()}</div>
                </div>
                <div className="text-right">
                  <div className={`px-2 py-1 rounded text-sm ${h.label === "FAKE" ? "bg-red-500 text-white" : "bg-green-500 text-white"}`}>{h.label}</div>
                  <div className="mt-2 flex gap-2">
                    <button onClick={() => { setText(h.text || ""); handlePredict({ textOverride: h.text }); }} className="text-xs underline">Rerun</button>
                    <button onClick={() => { setHistory(history.filter(x => x.id !== h.id)); }} className="text-xs underline text-red-500">Delete</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Footer actions */}
        <footer className="flex flex-col sm:flex-row gap-3 items-center justify-between">
          <div className="text-sm text-gray-500">Tip: Use Ctrl+Enter to analyze quickly. Toggle explainability with ?</div>
          <div className="flex gap-2">
            <button onClick={() => downloadReportJSON(result || { history })} className="px-3 py-1 border rounded">Export Report</button>
            <button onClick={() => copyReportToClipboard(result || { history })} className="px-3 py-1 border rounded">Copy Report</button>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Predict;
