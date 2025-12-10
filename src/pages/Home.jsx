import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "./Home.css";

/**
 * Home.jsx
 * Feature-rich homepage for NewsGuard AI — enhanced detector preview + UX
 * - Live detector with detailed breakdown
 * - History (localStorage)
 * - Save / Export report (JSON / CSV)
 * - Share report (Web Share API fallback)
 * - Language selector + accessibility tweaks
 * - Keyboard shortcuts and onboarding tour modal
 * - Mock API placeholder for real integration
 *
 * Drop-in replacement for your previous Home.jsx — Tailwind-friendly classes used
 */

const MOCK_LIVE_NEWS = [
  { id: 1, headline: "New Tech Breakthrough Claimed!", source: "TechBuzz", score: 45, time: "09:40 PM IST" },
  { id: 2, headline: "Government Scandal Exposed!", source: "NewsNow", score: 20, time: "09:35 PM IST" },
  { id: 3, headline: "Space Travel Now Affordable?", source: "SpaceDaily", score: 70, time: "09:30 PM IST" },
];

function formatDateISO(d = new Date()) {
  return d.toISOString();
}

function computeCredibility(text) {
  // Improved heuristic used only for demo. Replace with API call to real model.
  if (!text || !text.trim()) return null;
  const len = text.trim().length;
  const lengthScore = Math.min(1, len / 300) * 40; // more weight to content length
  const domainKeywords = ["official", "press release", "study", "report", "journal", "verified"];
  const domainHits = domainKeywords.reduce((acc, k) => acc + (text.toLowerCase().includes(k) ? 1 : 0), 0);
  const keywordScore = Math.min(20, domainHits * 7);
  const sensational = /(shocking|you won't believe|miracle|overnight|cure)/i.test(text) ? -30 : 0;
  const punctuationPenalty = /!!!|\?\?\?/.test(text) ? -10 : 0;
  const score = Math.max(0, Math.min(100, Math.round(lengthScore + keywordScore + sensational + punctuationPenalty + 30)));
  // Confidence estimate (mock)
  const confidence = Math.min(99, Math.round(score * 0.88 + (Math.random() * 10 - 3)));
  // Explanation mock
  const explanation = [];
  if (len < 50) explanation.push("Short text — harder to verify.");
  if (domainHits) explanation.push(`Found ${domainHits} authoritative cues (e.g. \"official\", \"report\").`);
  if (sensational) explanation.push("Contains sensational phrasing which lowers credibility.");
  if (punctuationPenalty) explanation.push("Excessive punctuation often used in clickbait.");
  if (!explanation.length) explanation.push("Balanced cues matched — content appears plausible.");

  return { score, confidence, explanation };
}

export default function Home() {
  const navigate = useNavigate();
  const [newsInput, setNewsInput] = useState("");
  const [result, setResult] = useState(null); // {score, confidence, explanation}
  const [theme, setTheme] = useState("light");
  const [history, setHistory] = useState([]);
  const [liveNews, setLiveNews] = useState(MOCK_LIVE_NEWS);
  const [activeFAQ, setActiveFAQ] = useState(null);
  const [showTutorial, setShowTutorial] = useState(false);
  const [language, setLanguage] = useState("en");
  const [userProgress, setUserProgress] = useState(0);
  const inputRef = useRef(null);

  useEffect(() => {
    // load history from localStorage
    try {
      const raw = localStorage.getItem("ng_history_v1");
      if (raw) setHistory(JSON.parse(raw));
      const progress = Number(localStorage.getItem("ng_progress_v1") || 0);
      setUserProgress(progress);
    } catch (e) {
      console.warn("Failed to load history", e);
    }
  }, []);

  useEffect(() => {
    // save history on change
    try {
      localStorage.setItem("ng_history_v1", JSON.stringify(history));
      localStorage.setItem("ng_progress_v1", String(userProgress));
    } catch (e) {
      console.warn("Failed to save history", e);
    }
  }, [history, userProgress]);

  useEffect(() => {
    // theme persistent
    const t = localStorage.getItem("ng_theme_v1") || "light";
    setTheme(t);
    document.documentElement.classList.toggle("dark", t === "dark");
  }, []);

  useEffect(() => {
    // mock live updates
    const id = setInterval(() => {
      setLiveNews((prev) => prev.map((n) => ({ ...n, score: Math.max(0, Math.min(100, Math.round(n.score + (Math.random() * 14 - 7)))) })))
    }, 25000);
    return () => clearInterval(id);
  }, []);

  // Keyboard shortcuts
  useEffect(() => {
    function onKey(e) {
      if (e.ctrlKey && e.key.toLowerCase() === "k") {
        e.preventDefault();
        inputRef.current?.focus();
      }
      if (e.key === "?") setShowTutorial((s) => !s);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const toggleFAQ = (i) => setActiveFAQ(activeFAQ === i ? null : i);

  const handleInputChange = (e) => setNewsInput(e.target.value);

  const runDetector = async ({ fromHistory = false, text } = {}) => {
    const payloadText = fromHistory ? text : newsInput;
    if (!payloadText || !payloadText.trim()) return;

    // Placeholder for real API call — use fetch('/api/verify', {method:'POST', body: JSON.stringify({text})})
    const localResult = computeCredibility(payloadText);

    const record = {
      id: Date.now(),
      text: payloadText,
      result: localResult,
      createdAt: formatDateISO(),
    };

    // update UI
    setResult(localResult);

    // save history (dedupe last identical)
    setHistory((h) => {
      const newHist = [record, ...h].slice(0, 50);
      return newHist;
    });

    setUserProgress((p) => p + 1);
    // set newsInput to text if running from history
    if (fromHistory) setNewsInput(payloadText);
  };

  const clearHistory = () => {
    setHistory([]);
    setUserProgress(0);
    localStorage.removeItem("ng_history_v1");
    localStorage.removeItem("ng_progress_v1");
  };

  const exportReportJSON = () => {
    const blob = new Blob([JSON.stringify({ history, exportedAt: formatDateISO() }, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url; a.download = `newsguard_export_${new Date().toISOString()}.json`; a.click();
    URL.revokeObjectURL(url);
  };

  const exportReportCSV = () => {
    const rows = ["id,text,score,confidence,createdAt"];
    history.forEach(h => {
      const row = [
        h.id,
        '"' + String(h.text).replace(/"/g, '""') + '"',
        h.result?.score ?? "",
        h.result?.confidence ?? "",
        h.createdAt
      ];
      rows.push(row.join(","));
    });
    const blob = new Blob([rows.join("\n")], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a"); a.href = url; a.download = `newsguard_export_${new Date().toISOString()}.csv`; a.click(); URL.revokeObjectURL(url);
  };

  const shareResult = async () => {
    if (!result) return;
    const payload = `NewsGuard AI Report:\nScore: ${result.score}%\nConfidence: ${result.confidence}%\nText: "${newsInput.slice(0,200)}${newsInput.length>200?"...":""}`;
    try {
      if (navigator.share) {
        await navigator.share({ title: "NewsGuard AI Report", text: payload });
      } else {
        await navigator.clipboard.writeText(payload);
        alert("Report copied to clipboard — share it anywhere!");
      }
    } catch (e) {
      console.warn("Share failed", e);
    }
  };

  const faqs = [
    { q: "How does the detector work?", a: "We analyze linguistic cues, source cues, and model-based signatures. For production, connect to a server-side model for best results." },
    { q: "Is my data private?", a: "Yes — by default history is stored locally in your browser. Pro users will have secure cloud storage options." },
    { q: "Can I integrate this into my platform?", a: "Yes — API endpoints are available on Pro and Enterprise tiers (placeholder in this demo)." },
  ];

  const trendingFakeNews = [
    { headline: "Aliens Landed in Florida!", source: "Unknown Blog", score: 10 },
    { headline: "Shocking Cure Discovered Overnight!", source: "ClickDaily", score: 15 },
    { headline: "Celebrity Faked Death!", source: "GossipNet", score: 5 },
  ];

  return (
    <main className="homepage-main max-w-7xl mx-auto p-4 sm:p-6 lg:p-8 text-gray-900 dark:text-gray-100">

      {/* HERO */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center mb-8">
        <div>
          <h1 className="text-3xl sm:text-4xl font-extrabold mb-2">NewsGuard AI — <span className="text-blue-600 dark:text-blue-400">AI-Powered News Verification</span></h1>
          <p className="text-gray-700 dark:text-gray-300 mb-4">Paste a headline or snippet to receive an instant credibility assessment, context, and a saveable report. Press <kbd className="px-2 py-1 bg-gray-100 rounded">Ctrl</kbd>+<kbd className="px-2 py-1 bg-gray-100 rounded">K</kbd> to focus the detector.</p>

          <div className="flex gap-3 flex-wrap">
            <button onClick={() => navigate('/predict')} className="px-4 py-2 bg-blue-600 text-white rounded shadow hover:bg-blue-700">Try Detector</button>
            <button onClick={() => setShowTutorial(true)} className="px-4 py-2 border border-blue-600 text-blue-600 rounded hover:bg-blue-50 dark:hover:bg-gray-800">Start Tour</button>
            <button onClick={() => { setNewsInput('Breaking: Study shows dramatic benefits of regular exercise — official report released.'); inputRef.current?.focus(); }} className="px-4 py-2 bg-gray-100 rounded">Try Example</button>
          </div>

        </div>
        <div className="bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 p-6 rounded-lg shadow">
          <h3 className="font-semibold mb-2">Quick Detector Preview</h3>
          <textarea ref={inputRef} value={newsInput} onChange={handleInputChange} rows={4} placeholder="Paste headline or snippet..." className="w-full p-3 rounded border dark:bg-gray-800 dark:border-gray-700 focus:outline-none" aria-label="News input" />
          <div className="flex gap-2 mt-3">
            <button onClick={() => runDetector()} className="px-4 py-2 bg-green-600 text-white rounded">Analyze</button>
            <button onClick={() => { setNewsInput(''); setResult(null); }} className="px-4 py-2 border rounded">Clear</button>
            <button onClick={shareResult} className="px-4 py-2 border rounded">Share</button>
            <div className="ml-auto flex items-center gap-2">
              <label className="text-sm">Lang</label>
              <select aria-label="Language" value={language} onChange={(e) => setLanguage(e.target.value)} className="p-1 rounded border dark:bg-gray-800 dark:border-gray-700">
                <option value="en">English</option>
                <option value="hi">Hindi</option>
                <option value="es">Spanish</option>
              </select>
            </div>
          </div>

          {/* result */}
          {result && (
            <div className="mt-4 p-3 rounded border dark:border-gray-700 bg-white dark:bg-gray-800">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-bold">Credibility: {result.score}%</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Confidence: {result.confidence}%</p>
                </div>
                <div>
                  <button onClick={exportReportJSON} className="px-3 py-1 border rounded mr-2">Export JSON</button>
                  <button onClick={exportReportCSV} className="px-3 py-1 border rounded">Export CSV</button>
                </div>
              </div>

              <div className="mt-3">
                <strong className="block">Why:</strong>
                <ul className="list-disc ml-5 mt-2 text-sm">
                  {result.explanation.map((s, i) => <li key={i}>{s}</li>)}
                </ul>
              </div>
            </div>
          )}

        </div>
      </section>

      {/* TWO-COLUMN: Live Feed + History */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <div className="lg:col-span-2 space-y-4">

          {/* Live News */}
          <div className="p-4 rounded bg-gray-50 dark:bg-gray-800">
            <h3 className="font-semibold mb-3">Live News Feed</h3>
            <div className="space-y-3">
              {liveNews.map(n => (
                <div key={n.id} className="flex justify-between items-center p-3 bg-white dark:bg-gray-900 rounded">
                  <div>
                    <div className="font-medium">{n.headline}</div>
                    <div className="text-xs text-gray-500">{n.source} • {n.time}</div>
                  </div>
                  <div>
                    <span className={`px-2 py-1 rounded text-sm ${n.score<30? 'bg-red-500 text-white' : n.score<70? 'bg-yellow-400 text-black': 'bg-green-500 text-white'}`}>Cred: {n.score}%</span>
                    <button onClick={() => { setNewsInput(n.headline); runDetector({ fromHistory:true, text: n.headline }) }} className="ml-2 text-sm underline">Analyze</button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Features cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 rounded bg-gray-50 dark:bg-gray-800">
              <h4 className="font-semibold">Explainability</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">Get short, human-readable reasons why a piece of content is marked low or high credibility.</p>
            </div>
            <div className="p-4 rounded bg-gray-50 dark:bg-gray-800">
              <h4 className="font-semibold">Team & API</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">Connect to our API for high-volume checks, audit logs and enterprise integrations.</p>
            </div>
            <div className="p-4 rounded bg-gray-50 dark:bg-gray-800">
              <h4 className="font-semibold">Multi-Language</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">Switch languages to analyze local-language content with specific models.</p>
            </div>
            <div className="p-4 rounded bg-gray-50 dark:bg-gray-800">
              <h4 className="font-semibold">Rate Limits & Quotas</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">Manage usage across Free / Pro / Enterprise plans.</p>
            </div>
          </div>

        </div>

        {/* History Column */}
        <aside className="p-4 rounded bg-gray-50 dark:bg-gray-800">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-semibold">Your Verifications</h3>
            <div className="text-sm">You've verified <strong>{userProgress}</strong></div>
          </div>

          <div className="space-y-2 max-h-96 overflow-auto">
            {history.length === 0 && <div className="text-sm text-gray-500">No saved checks yet — results appear here.</div>}
            {history.map(h => (
              <div key={h.id} className="p-2 rounded bg-white dark:bg-gray-900 flex justify-between items-start">
                <div>
                  <div className="text-sm font-medium">{h.text.length>80? h.text.slice(0,80)+'...' : h.text}</div>
                  <div className="text-xs text-gray-500">{new Date(h.createdAt).toLocaleString()}</div>
                </div>
                <div className="text-right">
                  <div className={`px-2 py-1 rounded text-sm ${h.result.score<30? 'bg-red-500 text-white' : h.result.score<70? 'bg-yellow-400 text-black' : 'bg-green-500 text-white'}`}>{h.result.score}%</div>
                  <div className="mt-2 flex gap-1">
                    <button onClick={() => { setNewsInput(h.text); runDetector({ fromHistory:true, text: h.text }); }} className="text-xs underline">Rerun</button>
                    <button onClick={() => setHistory(history.filter(x=>x.id!==h.id))} className="text-xs underline text-red-500">Delete</button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-4 flex gap-2">
            <button onClick={clearHistory} className="px-3 py-1 border rounded text-sm">Clear</button>
            <button onClick={exportReportJSON} className="px-3 py-1 border rounded text-sm">Export JSON</button>
            <button onClick={exportReportCSV} className="px-3 py-1 border rounded text-sm">Export CSV</button>
          </div>
        </aside>
      </section>

      {/* FAQ / Trending / CTA */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <div className="lg:col-span-2 p-4 rounded bg-gray-50 dark:bg-gray-800">
          <h3 className="font-semibold mb-3">Frequently Asked Questions</h3>
          <div className="space-y-2">
            {faqs.map((f, i) => (
              <div key={i} className={`p-3 rounded ${activeFAQ===i? 'bg-white dark:bg-gray-900': ''}`} onClick={() => toggleFAQ(i)} role="button" tabIndex={0}>
                <strong>{f.q}</strong>
                {activeFAQ===i && <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">{f.a}</p>}
              </div>
            ))}
          </div>
        </div>

        <aside className="p-4 rounded bg-gray-50 dark:bg-gray-800">
          <h3 className="font-semibold mb-3">Trending Fake Alerts</h3>
          <div className="space-y-2">
            {trendingFakeNews.map((t,i)=> (
              <div key={i} className="p-2 rounded bg-white dark:bg-gray-900">
                <div className="font-medium">{t.headline}</div>
                <div className="text-xs text-gray-500">{t.source}</div>
                <div className="mt-2"><span className="text-sm px-2 py-1 bg-red-500 text-white rounded">Low ({t.score}%)</span></div>
              </div>
            ))}
          </div>
        </aside>
      </section>

      {/* CTA and Footer */}
      <section className="p-6 rounded bg-blue-50 dark:bg-blue-900 mb-6">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <h3 className="font-semibold text-lg">Ready to verify what you read?</h3>
            <p className="text-sm text-gray-600 dark:text-gray-300">Use NewsGuard AI to avoid sharing misleading stories — trusted by hundreds of thousands.</p>
          </div>
          <div className="flex gap-3">
            <button onClick={() => navigate('/predict')} className="px-4 py-2 bg-blue-600 text-white rounded">Open Detector</button>
            <button onClick={() => navigate('/plans')} className="px-4 py-2 border rounded">View Plans</button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="text-sm text-gray-600 dark:text-gray-400">© {new Date().getFullYear()} NewsGuard AI • <a href="/privacy" className="underline">Privacy</a> • <a href="/terms" className="underline">Terms</a></footer>

      {/* Tutorial Modal */}
      {showTutorial && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40 p-4">
          <div className="w-full max-w-2xl bg-white dark:bg-gray-900 rounded p-6">
            <h2 className="text-xl font-bold mb-2">Getting started with NewsGuard AI</h2>
            <ol className="list-decimal ml-5 text-sm space-y-2">
              <li>Paste a headline or snippet into the input box.</li>
              <li>Click Analyze to get a credibility score and short explanation.</li>
              <li>Export or share reports, and revisit items from your history.</li>
              <li>Use Ctrl+K to focus the input quickly and ? to toggle this tour.</li>
            </ol>
            <div className="mt-4 flex justify-end gap-2">
              <button onClick={() => setShowTutorial(false)} className="px-4 py-2 border rounded">Close</button>
            </div>
          </div>
        </div>
      )}

    </main>
  );
}
