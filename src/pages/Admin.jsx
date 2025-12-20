import React, { useEffect, useState } from "react";
import { auth } from "../firebase";
import "./Admin.css";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  PieChart,
  Pie,
  Cell,
} from "recharts";

/* ================= MOCK DATA ================= */
const stats = {
  users: 124,
  admins: 1,
  predictions: 892,
  avgConfidence: 91,
};

const predictionData = [
  { name: "Real", value: 620 },
  { name: "Fake", value: 272 },
];

const recentPredictions = [
  { id: 1, text: "Government releases new economic policy", label: "REAL", confidence: 94 },
  { id: 2, text: "Miracle cure discovered overnight!!!", label: "FAKE", confidence: 18 },
  { id: 3, text: "AI bill passed in parliament", label: "REAL", confidence: 88 },
  { id: 4, text: "Celebrity caught in scandal – click here!", label: "FAKE", confidence: 5 },
  { id: 5, text: "Central Bank lowers interest rates", label: "REAL", confidence: 97 },
];

const activityLog = [
  "Model switched to Balanced",
  "Auto Preview enabled",
  "New prediction analyzed",
  "Admin logged in",
  "Data refreshed manually",
];

const notifications = [
  "High fake news spike detected (12 in last hour)",
  "User #87 reported suspicious activity",
  "Model accuracy above 95% threshold",
];

const COLORS = ["#16a34a", "#dc2626"];

function Admin() {
  const [adminEmail, setAdminEmail] = useState("");
  const [model, setModel] = useState("balanced");
  const [autoPreview, setAutoPreview] = useState(true);
  const [search, setSearch] = useState("");
  const [viewMode, setViewMode] = useState("standard");
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [uptime, setUptime] = useState(0);
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const user = auth.currentUser;
    if (user) setAdminEmail(user.email);

    // Uptime counter
    const uptimeInterval = setInterval(() => {
      setUptime(prev => prev + 1);
    }, 60000); // Update every minute

    // Live clock
    const clockInterval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => {
      clearInterval(uptimeInterval);
      clearInterval(clockInterval);
    };
  }, []);

  const formatUptime = (minutes) => {
    const h = Math.floor(minutes / 60);
    const m = minutes % 60;
    return `${h}h ${m}m`;
  };

  const handleExportCSV = () => {
    const csvContent = recentPredictions.map(p => `${p.id},"${p.text}",${p.label},${p.confidence}%`).join("\n");
    console.log("Exported CSV:\nID,Text,Label,Confidence\n" + csvContent);
    alert("CSV Export Simulated! Check console for data.");
  };

  const handleRefresh = () => {
    alert("Data refreshed! (Mock action)");
    // In real app: fetch latest stats
  };

  return (
    <main className={`admin-main ${viewMode} ${isDarkMode ? "dark-mode" : ""}`}>
      {/* ================= HEADER ================= */}
      <header className="admin-header">
        <div className="header-left">
          <h1>Admin Dashboard</h1>
          <p>
            Welcome, <strong>{adminEmail || "Admin"}</strong>
          </p>
        </div>
        <div className="header-right">
          <span className="live-clock">
            {currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </span>
          <button
            className="theme-toggle"
            onClick={() => setIsDarkMode(prev => !prev)}
            title="Toggle Dark/Light Mode"
          >
            {isDarkMode ? "☀️" : "🌙"}
          </button>
          <div className="notification-bell">
            🔔
            {notifications.length > 0 && <span className="badge-notif">{notifications.length}</span>}
          </div>
        </div>
      </header>

      {/* ================= SYSTEM HEALTH ================= */}
      <section className="admin-health">
        <span className="health ok">API: Online</span>
        <span className="health ok">Model: Active</span>
        <span className="health warn">DB: Mock</span>
        <span className="health info">Uptime: {formatUptime(uptime)}</span>
      </section>

      {/* ================= NOTIFICATIONS ================= */}
      {notifications.length > 0 && (
        <section className="admin-notifications">
          <h3>🔔 Alerts & Notifications</h3>
          <ul>
            {notifications.map((note, i) => (
              <li key={i} className={note.includes("spike") ? "alert-critical" : "alert-info"}>
                {note}
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* ================= STATS ================= */}
      <section className="admin-stats">
        <div className="stat-card">
          <h3>{stats.users}</h3>
          <p>Total Users</p>
          <small className="trend-up">↑ 12% this week</small>
        </div>
        <div className="stat-card">
          <h3>{stats.predictions}</h3>
          <p>Total Predictions</p>
          <small className="trend-up">↑ 45 today</small>
        </div>
        <div className="stat-card">
          <h3>{stats.avgConfidence}%</h3>
          <p>Avg Confidence</p>
          <small className="trend-stable">Stable</small>
        </div>
        <div className="stat-card live-status">
          <h3>LIVE</h3>
          <p>System Status</p>
          <span className="pulse"></span>
        </div>
      </section>

      {/* ================= CHARTS ================= */}
      <section className="admin-charts">
        <div className="chart-card">
          <h3>Fake vs Real Distribution</h3>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie data={predictionData} dataKey="value" cx="50%" cy="50%" outerRadius={80} label>
                {predictionData.map((_, i) => <Cell key={i} fill={COLORS[i]} />)}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="chart-card">
          <h3>Prediction Volume</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={predictionData}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" fill="#2563eb" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </section>

      {/* ================= SEARCH & FILTER ================= */}
      <section className="admin-filter">
        <input
          type="text"
          placeholder="Search predictions..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button onClick={handleRefresh} className="refresh-btn" title="Refresh Data">
          🔄 Refresh
        </button>
        <span className="badge real">REAL</span>
        <span className="badge fake">FAKE</span>
      </section>

      {/* ================= RECENT PREDICTIONS ================= */}
      <section className="admin-table">
        <h3>Recent Predictions</h3>
        <table>
          <thead>
            <tr>
              <th>Text</th>
              <th>Label</th>
              <th>Confidence</th>
            </tr>
          </thead>
          <tbody>
            {recentPredictions
              .filter(p => p.text.toLowerCase().includes(search.toLowerCase()))
              .map(p => (
                <tr key={p.id}>
                  <td>{p.text}</td>
                  <td className={p.label === "FAKE" ? "fake" : "real"}>{p.label}</td>
                  <td>{p.confidence}%</td>
                </tr>
              ))}
          </tbody>
        </table>
      </section>

      {/* ================= ACTIVITY FEED ================= */}
      <section className="admin-activity">
        <h3>Recent Admin Activity</h3>
        <ul>
          {activityLog.map((a, i) => <li key={i}>{a}</li>)}
        </ul>
      </section>

      {/* ================= ADMIN CONTROLS ================= */}
      <section className="admin-controls">
        <h3>Admin Controls</h3>
        <div className="control-row">
          <label>Model Version</label>
          <select value={model} onChange={(e) => setModel(e.target.value)}>
            <option value="fast">Fast</option>
            <option value="balanced">Balanced</option>
            <option value="accurate">High Accuracy</option>
          </select>
        </div>
        <div className="control-row">
          <label>Auto Preview</label>
          <button onClick={() => setAutoPreview(p => !p)}>
            {autoPreview ? "Enabled" : "Disabled"}
          </button>
        </div>
        <div className="control-row">
          <label>View Mode</label>
          <button onClick={() => setViewMode(v => v === "standard" ? "compact" : "standard")}>
            {viewMode === "standard" ? "Compact" : "Standard"}
          </button>
        </div>
        <div className="control-row actions">
          <button className="danger-btn">Clear Logs</button>
          <button className="export-btn" onClick={handleExportCSV}>
            Export Report (CSV)
          </button>
        </div>
      </section>

      {/* ================= FOOTER ================= */}
      <footer className="admin-footer">
        <span>© {new Date().getFullYear()} NewsGuard AI — Admin Panel</span>
        <small>Last login: {new Date().toLocaleString()}</small>
      </footer>
    </main>
  );
}

export default Admin;