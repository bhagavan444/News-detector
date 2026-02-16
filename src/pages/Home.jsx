import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, useMotionValue, useSpring, useScroll, useTransform } from "framer-motion";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
  BarChart,
  Bar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
} from "recharts";

/* ==================== WHITE THEME STYLES ==================== */

const styles = {
  wrapper: {
    fontFamily: "'Dancing Script', cursive",
    backgroundColor: "#ffffff",
    color: "#000000",
    minHeight: "100vh",
    overflow: "hidden",
    position: "relative",
    cursor: "none",
  },

  cursor: {
    position: "fixed",
    width: "12px",
    height: "12px",
    borderRadius: "50%",
    backgroundColor: "#000000",
    pointerEvents: "none",
    zIndex: 10000,
    mixBlendMode: "difference",
  },

  cursorFollower: {
    position: "fixed",
    width: "40px",
    height: "40px",
    border: "2px solid rgba(0, 0, 0, 0.2)",
    borderRadius: "50%",
    pointerEvents: "none",
    zIndex: 9999,
  },

  container: {
    maxWidth: "1440px",
    margin: "0 auto",
    padding: "0 80px",
    position: "relative",
  },

  section: {
    padding: "120px 0",
    position: "relative",
  },

  // Hero Section
  hero: {
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    position: "relative",
    overflow: "hidden",
  },

  heroGrid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "80px",
    alignItems: "center",
  },

  heroTitle: {
    fontSize: "82px",
    fontWeight: "700",
    lineHeight: "0.95",
    marginBottom: "32px",
    color: "#000000",
    letterSpacing: "-2px",
    fontFamily: "'Dancing Script', cursive",
  },

  heroSubtitle: {
    fontSize: "22px",
    color: "#666666",
    lineHeight: "1.7",
    marginBottom: "48px",
    fontWeight: "500",
    fontFamily: "'Dancing Script', cursive",
  },

  primaryBtn: {
    background: "#000000",
    color: "#ffffff",
    padding: "20px 48px",
    fontSize: "18px",
    fontWeight: "600",
    border: "none",
    borderRadius: "12px",
    cursor: "none",
    transition: "all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)",
    boxShadow: "0 10px 40px -10px rgba(0, 0, 0, 0.3)",
    marginRight: "16px",
    fontFamily: "'Dancing Script', cursive",
    letterSpacing: "0.5px",
  },

  secondaryBtn: {
    background: "#ffffff",
    color: "#000000",
    padding: "20px 48px",
    fontSize: "18px",
    fontWeight: "600",
    border: "2px solid #000000",
    borderRadius: "12px",
    cursor: "none",
    transition: "all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)",
    fontFamily: "'Dancing Script', cursive",
    letterSpacing: "0.5px",
  },

  // Interactive Demo Card
  demoCard: {
    background: "#f8f9fa",
    border: "1px solid #e9ecef",
    borderRadius: "24px",
    padding: "48px",
    position: "relative",
    overflow: "hidden",
    boxShadow: "0 20px 60px -20px rgba(0, 0, 0, 0.1)",
  },

  demoTitle: {
    fontSize: "26px",
    fontWeight: "600",
    marginBottom: "24px",
    fontFamily: "'Dancing Script', cursive",
  },

  textarea: {
    width: "100%",
    minHeight: "140px",
    padding: "20px",
    background: "#ffffff",
    border: "2px solid #e9ecef",
    borderRadius: "12px",
    fontSize: "16px",
    fontFamily: "'Dancing Script', cursive",
    color: "#000000",
    resize: "vertical",
    marginBottom: "20px",
    outline: "none",
    transition: "all 0.3s ease",
  },

  analyzeBtn: {
    background: "#000000",
    color: "#ffffff",
    padding: "16px 32px",
    fontSize: "17px",
    fontWeight: "600",
    border: "none",
    borderRadius: "10px",
    cursor: "none",
    width: "100%",
    transition: "all 0.3s ease",
    fontFamily: "'Dancing Script', cursive",
    letterSpacing: "0.5px",
  },

  resultCard: {
    background: "#ffffff",
    border: "2px solid #000000",
    borderRadius: "16px",
    padding: "32px",
    marginTop: "24px",
    textAlign: "center",
  },

  resultScore: {
    fontSize: "52px",
    fontWeight: "700",
    color: "#000000",
    marginBottom: "16px",
    letterSpacing: "-2px",
    fontFamily: "'Dancing Script', cursive",
  },

  resultLabel: {
    fontSize: "20px",
    fontWeight: "600",
    marginBottom: "20px",
    fontFamily: "'Dancing Script', cursive",
  },

  resultMetricLabel: {
    fontSize: "14px",
    color: "#666",
    marginBottom: "4px",
    fontFamily: "'Dancing Script', cursive",
  },

  resultMetricValue: {
    fontSize: "22px",
    fontWeight: "600",
    fontFamily: "'Dancing Script', cursive",
  },

  // Stats Section
  statsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(4, 1fr)",
    gap: "32px",
    marginTop: "64px",
  },

  statCard: {
    background: "#f8f9fa",
    border: "1px solid #e9ecef",
    borderRadius: "20px",
    padding: "48px 32px",
    textAlign: "center",
    transition: "all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)",
    cursor: "none",
  },

  statNumber: {
    fontSize: "56px",
    fontWeight: "700",
    color: "#000000",
    marginBottom: "12px",
    letterSpacing: "-2px",
    fontFamily: "'Dancing Script', cursive",
  },

  statLabel: {
    fontSize: "16px",
    color: "#666666",
    fontWeight: "600",
    textTransform: "uppercase",
    letterSpacing: "1px",
    fontFamily: "'Dancing Script', cursive",
  },

  // Feature Cards
  featureGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: "32px",
    marginTop: "64px",
  },

  featureCard: {
    background: "#ffffff",
    border: "1px solid #e9ecef",
    borderRadius: "20px",
    padding: "48px 40px",
    transition: "all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)",
    cursor: "none",
    position: "relative",
    overflow: "hidden",
  },

  featureIcon: {
    width: "64px",
    height: "64px",
    borderRadius: "16px",
    background: "#000000",
    color: "#ffffff",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "28px",
    marginBottom: "24px",
    fontWeight: "700",
  },

  featureTitle: {
    fontSize: "26px",
    fontWeight: "600",
    color: "#000000",
    marginBottom: "16px",
    letterSpacing: "-0.5px",
    fontFamily: "'Dancing Script', cursive",
  },

  featureDesc: {
    fontSize: "17px",
    color: "#666666",
    lineHeight: "1.7",
    fontFamily: "'Dancing Script', cursive",
  },

  // Threat Monitor
  threatMonitor: {
    background: "#000000",
    color: "#ffffff",
    borderRadius: "24px",
    padding: "48px",
    marginTop: "64px",
  },

  threatHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "32px",
  },

  threatTitle: {
    fontSize: "34px",
    fontWeight: "700",
    marginBottom: "8px",
    fontFamily: "'Dancing Script', cursive",
  },

  threatSubtitle: {
    color: "rgba(255, 255, 255, 0.7)",
    fontFamily: "'Dancing Script', cursive",
    fontSize: "16px",
  },

  threatStatusLabel: {
    color: "#22c55e",
    fontSize: "16px",
    fontWeight: "600",
    fontFamily: "'Dancing Script', cursive",
  },

  threatItem: {
    background: "rgba(255, 255, 255, 0.05)",
    border: "1px solid rgba(255, 255, 255, 0.1)",
    borderRadius: "12px",
    padding: "20px",
    marginBottom: "16px",
    display: "grid",
    gridTemplateColumns: "1fr 1fr 1fr 100px",
    gap: "20px",
    alignItems: "center",
  },

  threatItemLabel: {
    fontSize: "13px",
    color: "rgba(255, 255, 255, 0.5)",
    marginBottom: "4px",
    fontFamily: "'Dancing Script', cursive",
  },

  threatItemValue: {
    fontSize: "17px",
    fontWeight: "600",
    fontFamily: "'Dancing Script', cursive",
  },

  threatSeverity: {
    padding: "6px 12px",
    borderRadius: "6px",
    fontSize: "14px",
    fontWeight: "600",
    textAlign: "center",
    fontFamily: "'Dancing Script', cursive",
  },

  // Tech Stack
  techSection: {
    background: "#f8f9fa",
    padding: "80px 0",
    overflow: "hidden",
  },

  techSlider: {
    display: "flex",
    gap: "80px",
    animation: "scroll 30s linear infinite",
  },

  // Pricing
  pricingGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: "32px",
    marginTop: "64px",
  },

  pricingCard: {
    background: "#ffffff",
    border: "2px solid #e9ecef",
    borderRadius: "24px",
    padding: "48px 40px",
    transition: "all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)",
    cursor: "none",
  },

  pricingCardFeatured: {
    background: "#000000",
    color: "#ffffff",
    borderColor: "#000000",
    transform: "scale(1.05)",
  },

  pricingPlanName: {
    fontSize: "16px",
    fontWeight: "600",
    textTransform: "uppercase",
    letterSpacing: "1px",
    marginBottom: "16px",
    fontFamily: "'Dancing Script', cursive",
  },

  price: {
    fontSize: "64px",
    fontWeight: "700",
    marginBottom: "8px",
    letterSpacing: "-2px",
    fontFamily: "'Dancing Script', cursive",
  },

  pricePeriod: {
    fontSize: "22px",
    fontWeight: "500",
    fontFamily: "'Dancing Script', cursive",
  },

  pricingFeature: {
    fontSize: "17px",
    marginBottom: "12px",
    fontFamily: "'Dancing Script', cursive",
  },

  pricingButton: {
    width: "100%",
    padding: "16px",
    border: "none",
    borderRadius: "10px",
    fontSize: "17px",
    fontWeight: "600",
    cursor: "none",
    marginTop: "auto",
    fontFamily: "'Dancing Script', cursive",
    letterSpacing: "0.5px",
  },

  // Metrics Dashboard
  metricsCard: {
    background: "#ffffff",
    border: "1px solid #e9ecef",
    borderRadius: "20px",
    padding: "40px",
    marginTop: "32px",
  },

  metricTabs: {
    display: "flex",
    gap: "16px",
    marginBottom: "32px",
  },

  metricTab: {
    padding: "12px 24px",
    background: "#f8f9fa",
    border: "none",
    borderRadius: "8px",
    fontSize: "16px",
    fontWeight: "600",
    cursor: "none",
    transition: "all 0.3s ease",
    fontFamily: "'Dancing Script', cursive",
  },

  metricTabActive: {
    background: "#000000",
    color: "#ffffff",
  },

  metricsTitle: {
    fontSize: "26px",
    fontWeight: "600",
    marginBottom: "32px",
    fontFamily: "'Dancing Script', cursive",
  },

  // Section Headers
  sectionTitle: {
    fontSize: "48px",
    fontWeight: "700",
    marginBottom: "16px",
    letterSpacing: "-1px",
    fontFamily: "'Dancing Script', cursive",
  },

  sectionSubtitle: {
    fontSize: "20px",
    color: "#666",
    fontFamily: "'Dancing Script', cursive",
  },

  // CTA Section
  ctaTitle: {
    fontSize: "56px",
    fontWeight: "700",
    marginBottom: "24px",
    letterSpacing: "-1px",
    fontFamily: "'Dancing Script', cursive",
  },

  ctaSubtitle: {
    fontSize: "22px",
    color: "rgba(255,255,255,0.7)",
    marginBottom: "48px",
    fontFamily: "'Dancing Script', cursive",
  },

  ctaButton: {
    background: "#ffffff",
    color: "#000000",
    padding: "24px 56px",
    fontSize: "20px",
    fontWeight: "600",
    border: "none",
    borderRadius: "12px",
    cursor: "none",
    fontFamily: "'Dancing Script', cursive",
    letterSpacing: "0.5px",
  },

  // Footer
  footer: {
    background: "#000000",
    color: "#ffffff",
    padding: "80px 0 40px",
  },

  footerGrid: {
    display: "grid",
    gridTemplateColumns: "2fr 1fr 1fr 1fr 1fr",
    gap: "64px",
    marginBottom: "64px",
  },

  footerBrand: {
    fontSize: "26px",
    fontWeight: "700",
    marginBottom: "20px",
    fontFamily: "'Dancing Script', cursive",
  },

  footerDescription: {
    fontSize: "16px",
    color: "rgba(255,255,255,0.7)",
    lineHeight: "1.7",
    fontFamily: "'Dancing Script', cursive",
  },

  footerTitle: {
    fontSize: "16px",
    fontWeight: "600",
    marginBottom: "20px",
    textTransform: "uppercase",
    letterSpacing: "1px",
    fontFamily: "'Dancing Script', cursive",
  },

  footerLink: {
    fontSize: "16px",
    color: "rgba(255, 255, 255, 0.7)",
    marginBottom: "12px",
    cursor: "none",
    transition: "color 0.3s ease",
    fontFamily: "'Dancing Script', cursive",
  },

  footerBottom: {
    paddingTop: "40px",
    borderTop: "1px solid rgba(255,255,255,0.1)",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    fontSize: "16px",
    color: "rgba(255,255,255,0.5)",
    fontFamily: "'Dancing Script', cursive",
  },

  footerSocial: {
    display: "flex",
    gap: "24px",
    fontFamily: "'Dancing Script', cursive",
  },
};

/* ==================== TECH COLORS ==================== */

const techColors = [
  "#61DAFB", "#68A063", "#3776AB", "#FF6F00",
  "#336791", "#2496ED", "#326CE5", "#47A248"
];

/* ==================== MAIN COMPONENT ==================== */

export default function Home() {
  const navigate = useNavigate();
  const [text, setText] = useState("");
  const [result, setResult] = useState(null);
  const [activeTab, setActiveTab] = useState("accuracy");
  const [threats, setThreats] = useState([]);

  // Magnetic Cursor
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const springConfig = { damping: 25, stiffness: 300 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    const moveCursor = (e) => {
      cursorX.set(e.clientX - 6);
      cursorY.set(e.clientY - 6);
    };
    window.addEventListener("mousemove", moveCursor);
    return () => window.removeEventListener("mousemove", moveCursor);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      const newThreat = {
        id: Date.now(),
        type: ["Deepfake", "Misattribution", "Fabrication", "Manipulation"][Math.floor(Math.random() * 4)],
        severity: ["Low", "Medium", "High", "Critical"][Math.floor(Math.random() * 4)],
        confidence: Math.floor(Math.random() * 30 + 70),
        source: ["Twitter", "Facebook", "News", "Blog"][Math.floor(Math.random() * 4)],
      };
      setThreats(prev => [newThreat, ...prev.slice(0, 4)]);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const handleMagneticMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    const distance = Math.sqrt(x * x + y * y);
    const maxDistance = 100;
    if (distance < maxDistance) {
      const strength = (maxDistance - distance) / maxDistance;
      e.currentTarget.style.transform = `translate(${x * strength * 0.3}px, ${y * strength * 0.3}px) scale(1.05)`;
    }
  };

  const handleMagneticLeave = (e) => {
    e.currentTarget.style.transform = "translate(0, 0) scale(1)";
  };

  const analyze = () => {
    if (!text.trim()) return;
    const isSensational = text.includes("!!!") || text.toLowerCase().includes("miracle");
    const score = isSensational ? Math.floor(Math.random() * 20 + 15) : Math.floor(Math.random() * 25 + 70);
    
    setResult({
      score,
      confidence: Math.min(98, score + 12),
      risk: score < 40 ? "HIGH RISK" : score < 65 ? "SUSPICIOUS" : "VERIFIED",
      entities: Math.floor(Math.random() * 10 + 5),
      sources: Math.floor(Math.random() * 8 + 3),
      sentiment: score > 60 ? "Neutral" : "Negative",
    });
  };

  const techStack = [
    "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
    "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg",
    "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg",
    "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tensorflow/tensorflow-original.svg",
    "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg",
    "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg",
    "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kubernetes/kubernetes-plain.svg",
    "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg",
  ];

  const metricsData = {
    accuracy: [
      { month: "Jan", value: 87 },
      { month: "Feb", value: 89 },
      { month: "Mar", value: 92 },
      { month: "Apr", value: 91 },
      { month: "May", value: 94 },
      { month: "Jun", value: 96 },
    ],
    speed: [
      { month: "Jan", value: 245 },
      { month: "Feb", value: 198 },
      { month: "Mar", value: 175 },
      { month: "Apr", value: 156 },
      { month: "May", value: 128 },
      { month: "Jun", value: 95 },
    ],
    coverage: [
      { month: "Jan", value: 1200 },
      { month: "Feb", value: 1450 },
      { month: "Mar", value: 1680 },
      { month: "Apr", value: 1920 },
      { month: "May", value: 2150 },
      { month: "Jun", value: 2400 },
    ],
  };

  const radarData = [
    { subject: "Accuracy", A: 96, fullMark: 100 },
    { subject: "Speed", A: 88, fullMark: 100 },
    { subject: "Coverage", A: 92, fullMark: 100 },
    { subject: "Reliability", A: 94, fullMark: 100 },
    { subject: "Scale", A: 90, fullMark: 100 },
  ];

  return (
    <div style={styles.wrapper}>
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Dancing+Script:wght@400;500;600;700&display=swap');
          
          * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
          }
          
          @keyframes scroll {
            0% { transform: translateX(0); }
            100% { transform: translateX(calc(-100% - 80px)); }
          }
          
          @keyframes float {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-20px); }
          }
          
          @keyframes pulse {
            0%, 100% { opacity: 1; }
            50% { opacity: 0.7; }
          }
          
          @keyframes slideUp {
            from { transform: translateY(30px); opacity: 0; }
            to { transform: translateY(0); opacity: 1; }
          }
          
          .magnetic {
            transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
          }
        `}
      </style>

      {/* Custom Cursor */}
      <motion.div
        style={{
          ...styles.cursor,
          left: cursorXSpring,
          top: cursorYSpring,
        }}
      />
      <motion.div
        style={{
          ...styles.cursorFollower,
          left: cursorXSpring,
          top: cursorYSpring,
          transform: "translate(-50%, -50%)",
        }}
        transition={{ type: "spring", damping: 30, stiffness: 200 }}
      />

      {/* HERO SECTION */}
      <section style={{...styles.hero}}>
        <div style={styles.container}>
          <div style={styles.heroGrid}>
            <motion.div
              initial={{ opacity: 0, x: -60 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <motion.h1 
                style={styles.heroTitle}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.8 }}
              >
                Combat
                <br />
                Misinformation
                <br />
                in Real-Time
              </motion.h1>
              <motion.p 
                style={styles.heroSubtitle}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.8 }}
              >
                AI-powered credibility verification platform trusted by enterprises 
                to detect deepfakes, manipulation, and false narratives at scale.
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.8 }}
              >
                <motion.button
                  className="magnetic"
                  style={styles.primaryBtn}
                  onMouseMove={handleMagneticMove}
                  onMouseLeave={handleMagneticLeave}
                  whileHover={{ scale: 1.05, boxShadow: "0 15px 50px -15px rgba(0, 0, 0, 0.4)" }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => navigate("/predict")}
                >
                  Start Free Trial
                </motion.button>
                <motion.button
                  className="magnetic"
                  style={styles.secondaryBtn}
                  onMouseMove={handleMagneticMove}
                  onMouseLeave={handleMagneticLeave}
                  whileHover={{ scale: 1.05, background: "#000000", color: "#ffffff" }}
                  whileTap={{ scale: 0.98 }}
                >
                  Watch Demo
                </motion.button>
              </motion.div>
            </motion.div>

            {/* Interactive Demo Card */}
            <motion.div
              style={styles.demoCard}
              initial={{ opacity: 0, x: 60 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              whileHover={{ scale: 1.02 }}
            >
              <h3 style={styles.demoTitle}>
                Try It Now
              </h3>
              <textarea
                style={styles.textarea}
                placeholder="Paste any news headline, article, or social media post..."
                value={text}
                onChange={(e) => setText(e.target.value)}
                onFocus={(e) => e.target.style.borderColor = "#000000"}
                onBlur={(e) => e.target.style.borderColor = "#e9ecef"}
              />
              <motion.button
                className="magnetic"
                style={styles.analyzeBtn}
                onClick={analyze}
                onMouseMove={handleMagneticMove}
                onMouseLeave={handleMagneticLeave}
                whileHover={{ scale: 1.02, boxShadow: "0 10px 30px -10px rgba(0, 0, 0, 0.4)" }}
                whileTap={{ scale: 0.98 }}
              >
                Analyze Credibility
              </motion.button>

              {result && (
                <motion.div
                  style={styles.resultCard}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ type: "spring", stiffness: 200 }}
                >
                  <motion.div 
                    style={styles.resultScore}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    {result.score}%
                  </motion.div>
                  <div style={styles.resultLabel}>
                    {result.risk}
                  </div>
                  <div style={{display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", textAlign: "left"}}>
                    <div>
                      <div style={styles.resultMetricLabel}>Confidence</div>
                      <div style={styles.resultMetricValue}>{result.confidence}%</div>
                    </div>
                    <div>
                      <div style={styles.resultMetricLabel}>Entities</div>
                      <div style={styles.resultMetricValue}>{result.entities}</div>
                    </div>
                    <div>
                      <div style={styles.resultMetricLabel}>Sources</div>
                      <div style={styles.resultMetricValue}>{result.sources}</div>
                    </div>
                    <div>
                      <div style={styles.resultMetricLabel}>Sentiment</div>
                      <div style={styles.resultMetricValue}>{result.sentiment}</div>
                    </div>
                  </div>
                </motion.div>
              )}
            </motion.div>
          </div>
        </div>
      </section>

      {/* STATS SECTION */}
      <section style={{...styles.section, background: "#f8f9fa"}}>
        <div style={styles.container}>
          <motion.div
            style={{textAlign: "center", marginBottom: "64px"}}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 style={styles.sectionTitle}>
              Proven at Enterprise Scale
            </h2>
            <p style={styles.sectionSubtitle}>
              Trusted by organizations processing millions of content pieces daily
            </p>
          </motion.div>

          <div style={styles.statsGrid}>
            {[
              {number: "99.2%", label: "Accuracy Rate"},
              {number: "2.4M", label: "Daily Checks"},
              {number: "< 100ms", label: "Avg Response"},
              {number: "24/7", label: "Monitoring"},
            ].map((stat, idx) => (
              <motion.div
                key={idx}
                className="magnetic"
                style={styles.statCard}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1, duration: 0.6 }}
                onMouseMove={handleMagneticMove}
                onMouseLeave={handleMagneticLeave}
                whileHover={{
                  y: -10,
                  boxShadow: "0 20px 40px -15px rgba(0, 0, 0, 0.15)",
                  background: "#ffffff",
                }}
              >
                <div style={styles.statNumber}>{stat.number}</div>
                <div style={styles.statLabel}>{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURES SECTION */}
      <section style={styles.section}>
        <div style={styles.container}>
          <motion.div
            style={{textAlign: "center", marginBottom: "64px"}}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 style={styles.sectionTitle}>
              Advanced Detection Capabilities
            </h2>
            <p style={styles.sectionSubtitle}>
              Multi-layered AI analysis for comprehensive credibility assessment
            </p>
          </motion.div>

          <div style={styles.featureGrid}>
            {[
              {icon: "🔍", title: "Deep Content Analysis", desc: "NLP-powered linguistic pattern recognition and context evaluation"},
              {icon: "🎭", title: "Deepfake Detection", desc: "Advanced computer vision to identify synthetic media and manipulated content"},
              {icon: "🌐", title: "Cross-Reference Verification", desc: "Real-time validation against 10,000+ trusted sources worldwide"},
              {icon: "📊", title: "Sentiment & Bias Analysis", desc: "Emotion detection and political leaning identification"},
              {icon: "⚡", title: "Real-Time Monitoring", desc: "Continuous scanning of social media, news, and web content"},
              {icon: "🛡️", title: "Threat Intelligence", desc: "Proactive identification of coordinated disinformation campaigns"},
            ].map((feature, idx) => (
              <motion.div
                key={idx}
                className="magnetic"
                style={styles.featureCard}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1, duration: 0.6 }}
                onMouseMove={handleMagneticMove}
                onMouseLeave={handleMagneticLeave}
                whileHover={{
                  y: -10,
                  boxShadow: "0 25px 50px -15px rgba(0, 0, 0, 0.15)",
                  borderColor: "#000000",
                }}
              >
                <motion.div 
                  style={styles.featureIcon}
                  whileHover={{ rotate: 360, scale: 1.1 }}
                  transition={{ duration: 0.6 }}
                >
                  {feature.icon}
                </motion.div>
                <h3 style={styles.featureTitle}>{feature.title}</h3>
                <p style={styles.featureDesc}>{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* THREAT MONITOR SECTION */}
      <section style={{...styles.section, background: "#f8f9fa"}}>
        <div style={styles.container}>
          <motion.div
            style={styles.threatMonitor}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div style={styles.threatHeader}>
              <div>
                <h2 style={styles.threatTitle}>
                  Live Threat Monitor
                </h2>
                <p style={styles.threatSubtitle}>
                  Real-time detection of misinformation threats
                </p>
              </div>
              <div style={{
                display: "flex",
                alignItems: "center",
                gap: "12px",
              }}>
                <motion.div
                  style={{
                    width: "12px",
                    height: "12px",
                    borderRadius: "50%",
                    background: "#22c55e",
                  }}
                  animate={{
                    boxShadow: [
                      "0 0 10px #22c55e",
                      "0 0 20px #22c55e",
                      "0 0 10px #22c55e"
                    ]
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
                <span style={styles.threatStatusLabel}>SYSTEM ACTIVE</span>
              </div>
            </div>

            {threats.length > 0 ? threats.map((threat, idx) => (
              <motion.div
                key={threat.id}
                style={styles.threatItem}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4 }}
                exit={{ opacity: 0, x: 20 }}
              >
                <div>
                  <div style={styles.threatItemLabel}>
                    Threat Type
                  </div>
                  <div style={styles.threatItemValue}>{threat.type}</div>
                </div>
                <div>
                  <div style={styles.threatItemLabel}>
                    Source
                  </div>
                  <div style={styles.threatItemValue}>{threat.source}</div>
                </div>
                <div>
                  <div style={styles.threatItemLabel}>
                    Confidence
                  </div>
                  <div style={styles.threatItemValue}>{threat.confidence}%</div>
                </div>
                <div style={{
                  ...styles.threatSeverity,
                  background: threat.severity === "Critical" ? "#dc2626" :
                             threat.severity === "High" ? "#ea580c" :
                             threat.severity === "Medium" ? "#f59e0b" : "#84cc16"
                }}>
                  {threat.severity}
                </div>
              </motion.div>
            )) : (
              <div style={{textAlign: "center", padding: "60px", color: "rgba(255, 255, 255, 0.5)", fontFamily: "'Dancing Script', cursive", fontSize: "18px"}}>
                Monitoring for threats...
              </div>
            )}
          </motion.div>
        </div>
      </section>

      {/* METRICS DASHBOARD */}
      <section style={styles.section}>
        <div style={styles.container}>
          <motion.div
            style={{textAlign: "center", marginBottom: "48px"}}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 style={styles.sectionTitle}>
              Performance Metrics
            </h2>
            <p style={styles.sectionSubtitle}>
              Track system performance and improvements over time
            </p>
          </motion.div>

          <motion.div
            style={styles.metricsCard}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div style={styles.metricTabs}>
              {["accuracy", "speed", "coverage"].map((tab) => (
                <motion.button
                  key={tab}
                  style={{
                    ...styles.metricTab,
                    ...(activeTab === tab ? styles.metricTabActive : {})
                  }}
                  onClick={() => setActiveTab(tab)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </motion.button>
              ))}
            </div>

            <ResponsiveContainer width="100%" height={320}>
              <AreaChart data={metricsData[activeTab]}>
                <defs>
                  <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#000000" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#000000" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <XAxis 
                  dataKey="month" 
                  stroke="#666"
                  style={{fontSize: "14px", fontWeight: "600", fontFamily: "'Dancing Script', cursive"}}
                />
                <YAxis 
                  stroke="#666"
                  style={{fontSize: "14px", fontWeight: "600", fontFamily: "'Dancing Script', cursive"}}
                />
                <Tooltip 
                  contentStyle={{
                    background: "#ffffff",
                    border: "1px solid #e9ecef",
                    borderRadius: "8px",
                    fontWeight: "600",
                    fontFamily: "'Dancing Script', cursive"
                  }}
                />
                <Area 
                  type="monotone" 
                  dataKey="value" 
                  stroke="#000000" 
                  strokeWidth={3}
                  fill="url(#colorValue)" 
                />
              </AreaChart>
            </ResponsiveContainer>
          </motion.div>

          <motion.div
            style={{...styles.metricsCard, marginTop: "32px"}}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <h3 style={styles.metricsTitle}>
              System Capabilities Overview
            </h3>
            <ResponsiveContainer width="100%" height={400}>
              <RadarChart data={radarData}>
                <PolarGrid stroke="#e9ecef" />
                <PolarAngleAxis 
                  dataKey="subject" 
                  style={{fontSize: "16px", fontWeight: "600", fontFamily: "'Dancing Script', cursive"}}
                />
                <PolarRadiusAxis stroke="#e9ecef" />
                <Radar 
                  name="Performance" 
                  dataKey="A" 
                  stroke="#000000" 
                  fill="#000000" 
                  fillOpacity={0.3}
                  strokeWidth={2}
                />
              </RadarChart>
            </ResponsiveContainer>
          </motion.div>
        </div>
      </section>

      {/* TECH STACK */}
      <section style={styles.techSection}>
        <div style={styles.container}>
          <motion.div
            style={{textAlign: "center", marginBottom: "48px"}}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 style={{fontSize: "38px", fontWeight: "700", marginBottom: "16px", fontFamily: "'Dancing Script', cursive"}}>
              Enterprise Technology Stack
            </h2>
          </motion.div>
        </div>
        
        <div style={{overflow: "hidden"}}>
          <div style={styles.techSlider}>
            {[...techStack, ...techStack, ...techStack].map((icon, idx) => (
              <motion.div
                key={idx}
                whileHover={{ scale: 1.2 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <img
                  src={icon}
                  alt="tech"
                  style={{
                    width: "64px",
                    height: "64px",
                    filter: `drop-shadow(0 4px 12px ${techColors[idx % techColors.length]}80)`,
                  }}
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* PRICING SECTION */}
      <section style={styles.section}>
        <div style={styles.container}>
          <motion.div
            style={{textAlign: "center", marginBottom: "64px"}}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 style={styles.sectionTitle}>
              Choose Your Plan
            </h2>
            <p style={styles.sectionSubtitle}>
              Flexible pricing for teams of all sizes
            </p>
          </motion.div>

          <div style={styles.pricingGrid}>
            {[
              {name: "Starter", price: "$299", period: "/month", features: ["Up to 10,000 checks/mo", "Basic API access", "Email support", "7-day history"]},
              {name: "Professional", price: "$999", period: "/month", features: ["Up to 100,000 checks/mo", "Full API access", "Priority support", "30-day history", "Custom integrations"], featured: true},
              {name: "Enterprise", price: "Custom", period: "", features: ["Unlimited checks", "Dedicated infrastructure", "24/7 phone support", "Unlimited history", "SLA guarantee", "On-premise option"]},
            ].map((plan, idx) => (
              <motion.div
                key={idx}
                className="magnetic"
                style={{
                  ...styles.pricingCard,
                  ...(plan.featured ? styles.pricingCardFeatured : {})
                }}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1, duration: 0.6 }}
                onMouseMove={handleMagneticMove}
                onMouseLeave={handleMagneticLeave}
                whileHover={{
                  y: -10,
                  boxShadow: plan.featured ? 
                    "0 30px 60px -20px rgba(0, 0, 0, 0.4)" : 
                    "0 25px 50px -15px rgba(0, 0, 0, 0.15)",
                }}
              >
                <div style={{
                  ...styles.pricingPlanName,
                  color: plan.featured ? "#ffffff" : "#666"
                }}>
                  {plan.name}
                </div>
                <div style={{
                  ...styles.price,
                  color: plan.featured ? "#ffffff" : "#000000"
                }}>
                  {plan.price}
                  <span style={styles.pricePeriod}>{plan.period}</span>
                </div>
                <div style={{
                  margin: "32px 0",
                  paddingTop: "32px",
                  borderTop: `1px solid ${plan.featured ? "rgba(255,255,255,0.2)" : "#e9ecef"}`
                }}>
                  {plan.features.map((feature, i) => (
                    <div key={i} style={{
                      ...styles.pricingFeature,
                      color: plan.featured ? "rgba(255,255,255,0.9)" : "#666"
                    }}>
                      ✓ {feature}
                    </div>
                  ))}
                </div>
                <motion.button
                  style={{
                    ...styles.pricingButton,
                    background: plan.featured ? "#ffffff" : "#000000",
                    color: plan.featured ? "#000000" : "#ffffff",
                  }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {plan.name === "Enterprise" ? "Contact Sales" : "Start Free Trial"}
                </motion.button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA SECTION */}
      <section style={{...styles.section, background: "#000000", color: "#ffffff"}}>
        <div style={styles.container}>
          <motion.div
            style={{textAlign: "center"}}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 style={styles.ctaTitle}>
              Ready to Combat Misinformation?
            </h2>
            <p style={styles.ctaSubtitle}>
              Join leading organizations protecting information integrity
            </p>
            <motion.button
              className="magnetic"
              style={styles.ctaButton}
              onMouseMove={handleMagneticMove}
              onMouseLeave={handleMagneticLeave}
              whileHover={{ scale: 1.05, boxShadow: "0 20px 60px -15px rgba(255,255,255,0.5)" }}
              whileTap={{ scale: 0.98 }}
              onClick={() => navigate("/predict")}
            >
              Get Started Today
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={styles.footer}>
        <div style={styles.container}>
          <div style={styles.footerGrid}>
            <div>
              <div style={styles.footerBrand}>
                VERIFEX
              </div>
              <p style={styles.footerDescription}>
                Enterprise AI platform for combating misinformation 
                and protecting information integrity at scale.
              </p>
            </div>

            {[
              {title: "Product", links: ["Features", "Pricing", "API", "Documentation"]},
              {title: "Company", links: ["About", "Careers", "Press", "Contact"]},
              {title: "Resources", links: ["Blog", "Case Studies", "Guides", "Support"]},
              {title: "Legal", links: ["Privacy", "Terms", "Security", "Compliance"]},
            ].map((column, idx) => (
              <div key={idx}>
                <div style={styles.footerTitle}>{column.title}</div>
                {column.links.map((link, i) => (
                  <motion.div
                    key={i}
                    style={styles.footerLink}
                    whileHover={{color: "#ffffff", x: 5}}
                  >
                    {link}
                  </motion.div>
                ))}
              </div>
            ))}
          </div>

          <div style={styles.footerBottom}>
            <div>© {new Date().getFullYear()} Verifex AI. All rights reserved.</div>
            <div style={styles.footerSocial}>
              <motion.span whileHover={{color: "#ffffff"}}>Twitter</motion.span>
              <motion.span whileHover={{color: "#ffffff"}}>LinkedIn</motion.span>
              <motion.span whileHover={{color: "#ffffff"}}>GitHub</motion.span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}