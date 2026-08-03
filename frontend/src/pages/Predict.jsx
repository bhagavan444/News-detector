import React, { useState, useEffect, useRef } from 'react';
import SEOHead from '../components/seo/SEOHead';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import Footer from '../components/Footer/Footer';
import styles from './Predict.module.css';

// ─── Engineering Canvas Node Data ────────────────────────────────────────────
const canvasNodes = [
  {
    id: 'react',
    label: 'React Experience',
    x: 50,
    y: 8,
    detail: {
      title: 'React Frontend Layer',
      points: [
        'Component-based UI Architecture',
        'Framer Motion Animation Engine',
        'React Router Navigation',
        'Real-time State Management',
      ],
    },
  },
  {
    id: 'fastapi',
    label: 'FastAPI Intelligence Layer',
    x: 50,
    y: 26,
    detail: {
      title: 'FastAPI Backend Runtime',
      points: [
        'REST API Endpoint Layer',
        'Async Request Processing',
        'Input Validation & Routing',
        'Authentication Middleware',
      ],
    },
  },
  {
    id: 'reasoning',
    label: 'Reasoning Engine',
    x: 50,
    y: 44,
    detail: {
      title: 'Reasoning & Explainability Engine',
      points: [
        'Claim Extraction Pipeline',
        'Evidence Cross-Reference',
        'Decision Trace Generation',
        'Logical Consistency Scoring',
      ],
    },
  },
  {
    id: 'mongo',
    label: 'MongoDB',
    x: 50,
    y: 62,
    detail: {
      title: 'MongoDB Data Layer',
      points: [
        'Analysis Document Storage',
        'Report Metadata Index',
        'User History Collections',
        'Evidence Cache',
      ],
    },
  },
  {
    id: 'report',
    label: 'Report Generator',
    x: 50,
    y: 80,
    detail: {
      title: 'PDF Intelligence Reports',
      points: [
        'Structured Report Rendering',
        'Claim Intelligence Tables',
        'Credibility & Bias Scores',
        'Downloadable PDF Output',
      ],
    },
  },
];

const timelineStages = [
  { label: 'Research', done: true },
  { label: 'Architecture', done: true },
  { label: 'Backend Engineering', done: true },
  { label: 'Reasoning Engine', done: true },
  { label: 'Explainability Layer', done: true },
  { label: 'Infrastructure', done: true },
  { label: 'Public Deployment', done: false },
  { label: 'Enterprise Scale', done: false },
];

const pipelineStages = [
  'Upload',
  'Parsing',
  'Reasoning',
  'Evidence',
  'Validation',
  'Decision Trace',
  'Explainability',
  'PDF Report',
];

const infraTech = [
  { name: 'FastAPI', desc: 'Async Python REST framework' },
  { name: 'Python', desc: 'Core intelligence runtime' },
  { name: 'MongoDB', desc: 'Document & metadata storage' },
  { name: 'Document Processing', desc: 'Multi-format ingestion' },
  { name: 'Reasoning Pipeline', desc: 'Multi-stage claim analysis' },
  { name: 'Evidence Engine', desc: 'Source cross-referencing' },
  { name: 'Report Generator', desc: 'PDF intelligence output' },
  { name: 'Deployment Pipeline', desc: 'Staged release architecture' },
];

const philosophyLines = [
  'We do not optimize for public availability.',
  'We optimize for engineering quality.',
  'Infrastructure scales after architecture.',
  'Reliability before accessibility.',
  'Deterministic reasoning before automation.',
  'Production quality before production scale.',
];

// ─── Sub-components ───────────────────────────────────────────────────────────

function PipelineAnimation() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [running, setRunning] = useState(false);

  function startPipeline() {
    setActiveIndex(0);
    setRunning(true);
  }

  useEffect(() => {
    if (!running) return;
    if (activeIndex >= pipelineStages.length - 1) {
      const t = setTimeout(() => setRunning(false), 1200);
      return () => clearTimeout(t);
    }
    const t = setTimeout(() => setActiveIndex((i) => i + 1), 700);
    return () => clearTimeout(t);
  }, [running, activeIndex]);

  return (
    <div className={styles.pipelineWrapper}>
      <div className={styles.pipelineTrack}>
        {pipelineStages.map((stage, i) => (
          <React.Fragment key={stage}>
            <motion.div
              className={styles.pipelineNode}
              animate={{
                backgroundColor:
                  running && i <= activeIndex
                    ? 'rgba(255,255,255,0.95)'
                    : 'rgba(255,255,255,0.06)',
                color:
                  running && i <= activeIndex
                    ? '#000'
                    : 'rgba(255,255,255,0.55)',
                borderColor:
                  running && i <= activeIndex
                    ? 'rgba(255,255,255,0.9)'
                    : 'rgba(255,255,255,0.12)',
              }}
              transition={{ duration: 0.3 }}
            >
              <span className={styles.pipelineNodeLabel}>{stage}</span>
              {running && i === activeIndex && (
                <motion.div
                  className={styles.pipelineNodePulse}
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1.5, opacity: 0 }}
                  transition={{ duration: 0.6, repeat: Infinity }}
                />
              )}
            </motion.div>
            {i < pipelineStages.length - 1 && (
              <motion.div
                className={styles.pipelineConnector}
                animate={{
                  backgroundColor:
                    running && i < activeIndex
                      ? 'rgba(255,255,255,0.6)'
                      : 'rgba(255,255,255,0.1)',
                }}
                transition={{ duration: 0.3 }}
              />
            )}
          </React.Fragment>
        ))}
      </div>
      <button
        className={styles.pipelineBtn}
        onClick={startPipeline}
        disabled={running}
      >
        {running ? 'Executing…' : 'Run Pipeline Demonstration'}
      </button>
    </div>
  );
}

function EngineeringCanvas() {
  const [activeNode, setActiveNode] = useState(null);

  return (
    <div className={styles.canvasWrapper}>
      <div className={styles.canvasTrack}>
        {canvasNodes.map((node, i) => (
          <React.Fragment key={node.id}>
            <motion.button
              className={`${styles.canvasNode} ${activeNode?.id === node.id ? styles.canvasNodeActive : ''}`}
              onClick={() => setActiveNode(activeNode?.id === node.id ? null : node)}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
            >
              {node.label}
            </motion.button>
            {i < canvasNodes.length - 1 && (
              <div className={styles.canvasConnector}>
                <div className={styles.canvasConnectorDot} />
              </div>
            )}
          </React.Fragment>
        ))}
      </div>

      <AnimatePresence mode="wait">
        {activeNode && (
          <motion.div
            key={activeNode.id}
            className={styles.canvasDetail}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          >
            <h4 className={styles.canvasDetailTitle}>{activeNode.detail.title}</h4>
            <ul className={styles.canvasDetailList}>
              {activeNode.detail.points.map((p) => (
                <li key={p}>{p}</li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
      {!activeNode && (
        <p className={styles.canvasHint}>Select a layer to inspect its components</p>
      )}
    </div>
  );
}

function EngineeringTimeline() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 0.8', 'end 0.6'],
  });

  return (
    <div ref={containerRef} className={styles.timelineTrack}>
      {timelineStages.map((stage, i) => {
        const start = i / timelineStages.length;
        const end = (i + 1) / timelineStages.length;
        return (
          <TimelineItem
            key={stage.label}
            stage={stage}
            index={i}
            scrollYProgress={scrollYProgress}
            start={start}
            end={end}
            total={timelineStages.length}
          />
        );
      })}
    </div>
  );
}

function TimelineItem({ stage, index, scrollYProgress, start, end, total }) {
  const opacity = useTransform(scrollYProgress, [start, Math.min(start + 0.15, end)], [0.2, 1]);
  const y = useTransform(scrollYProgress, [start, Math.min(start + 0.15, end)], [20, 0]);

  return (
    <motion.div style={{ opacity, y }} className={styles.timelineItem}>
      <div className={`${styles.timelineDot} ${stage.done ? styles.timelineDotDone : styles.timelineDotPending}`} />
      {index < total - 1 && (
        <div className={`${styles.timelineLine} ${stage.done ? styles.timelineLineDone : ''}`} />
      )}
      <span className={`${styles.timelineLabel} ${stage.done ? styles.timelineLabelDone : styles.timelineLabelPending}`}>
        {stage.label}
        {stage.done && <span className={styles.timelineCheck}>✓</span>}
      </span>
    </motion.div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function Predict() {
  const architectureRef = useRef(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const scrollToArchitecture = () => {
    architectureRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } },
  };

  return (
    <main className={styles.predictPage}>
      <SEOHead
        title="VERITAS Production Intelligence Engine"
        description="VERITAS is a production-grade explainable intelligence platform. Explore the engineering architecture, reasoning methodology, and infrastructure of the VERITAS AI system."
        canonicalPath="/predict"
        noindex={false}
      />

      {/* ── 1. HERO ──────────────────────────────────────────────────────── */}
      <section className={styles.heroSection}>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        >
          <p className={styles.heroBadge}>Engineering Preview</p>
          <h1 className={styles.heroTitle}>Production Intelligence Engine</h1>
          <p className={styles.heroSubtitle}>
            The complete reasoning engine currently operates within VERITAS' dedicated engineering
            environment. The public experience showcases the platform's architecture, explainability
            methodology, and engineering principles while production infrastructure is being prepared
            for scalable public deployment.
          </p>
          <div className={styles.heroActions}>
            <button className={styles.primaryBtn} onClick={scrollToArchitecture}>
              View Architecture
            </button>
            <a href="/how-it-works" className={styles.ghostBtn}>
              Methodology
            </a>
          </div>
        </motion.div>
      </section>

      {/* ── 2. CAPABILITY CARDS ──────────────────────────────────────────── */}
      <motion.section
        className={styles.cardsSection}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-80px' }}
        variants={{ visible: { transition: { staggerChildren: 0.1 } }, hidden: {} }}
      >
        {[
          {
            icon: (
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                <polyline points="14 2 14 8 20 8" />
                <line x1="16" y1="13" x2="8" y2="13" />
                <line x1="16" y1="17" x2="8" y2="17" />
              </svg>
            ),
            title: 'Claim Extraction',
            desc: 'Detect factual statements using multi-stage NLP processing pipelines.',
          },
          {
            icon: (
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <ellipse cx="12" cy="5" rx="9" ry="3" />
                <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" />
                <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
              </svg>
            ),
            title: 'Evidence Retrieval',
            desc: 'Cross-reference trusted sources before generating conclusions.',
          },
          {
            icon: (
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" />
                <circle cx="12" cy="12" r="6" />
                <circle cx="12" cy="12" r="2" />
                <line x1="12" y1="12" x2="20" y2="4" />
              </svg>
            ),
            title: 'Bias Detection',
            desc: 'Measure political, emotional, and narrative bias across the source material.',
          },
          {
            icon: (
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 3l1.912 5.813a2 2 0 001.275 1.275L21 12l-5.813 1.912a2 2 0 00-1.275 1.275L12 21l-1.912-5.813a2 2 0 00-1.275-1.275L3 12l5.813-1.912a2 2 0 001.275-1.275L12 3z" />
              </svg>
            ),
            title: 'Explainable Verdict',
            desc: 'Generate transparent decision traces instead of black-box predictions.',
          },
        ].map((card) => (
          <motion.div key={card.title} className={styles.featureCard} variants={fadeUp}>
            <div className={styles.cardIcon}>{card.icon}</div>
            <h3 className={styles.cardTitle}>{card.title}</h3>
            <p className={styles.cardDesc}>{card.desc}</p>
          </motion.div>
        ))}
      </motion.section>

      {/* ── 3. PRODUCTION WORKSPACE STATEMENT ────────────────────────────── */}
      <motion.section
        className={styles.workspaceSection}
        initial={{ opacity: 0, y: 32 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className={styles.workspaceInner}>
          <p className={styles.workspaceEyebrow}>Production Intelligence Workspace</p>
          <h2 className={styles.workspaceTitle}>
            Fully engineered.<br />Architecturally complete.<br />Infrastructure in preparation.
          </h2>
          <p className={styles.workspacePara}>
            VERITAS performs computationally intensive reasoning, evidence extraction,
            explainability generation, and document intelligence. Rather than exposing an
            under-provisioned public endpoint, the reasoning engine currently operates within
            the internal engineering environment while production infrastructure is being
            prepared for public-scale deployment.
          </p>
          <p className={styles.workspaceNote}>
            This is an engineering decision — not a product limitation.
          </p>
        </div>
      </motion.section>

      {/* ── 4. CINEMATIC PIPELINE DEMONSTRATION ──────────────────────────── */}
      <motion.section
        className={styles.pipelineSection}
        initial={{ opacity: 0, y: 32 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
      >
        <p className={styles.sectionEyebrow}>Production Demonstration</p>
        <h2 className={styles.sectionTitle}>The Reasoning Pipeline</h2>
        <p className={styles.sectionSubtitle}>
          A sequential visualization of how VERITAS processes, reasons, and delivers intelligence reports.
        </p>
        <PipelineAnimation />
      </motion.section>

      {/* ── 5. INTERACTIVE ENGINEERING CANVAS ────────────────────────────── */}
      <section className={styles.canvasSection} ref={architectureRef}>
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        >
          <p className={styles.sectionEyebrow}>Engineering Infrastructure</p>
          <h2 className={styles.sectionTitle}>Interactive Architecture</h2>
          <p className={styles.sectionSubtitle}>
            Select any layer to inspect its engineering components.
          </p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        >
          <EngineeringCanvas />
          <p className={styles.canvasCaption}>
            Internal Engineering Runtime — backend executes within the dedicated engineering environment.
          </p>
        </motion.div>
      </section>

      {/* ── 6. ENGINEERING TIMELINE ──────────────────────────────────────── */}
      <motion.section
        className={styles.timelineSection}
        initial={{ opacity: 0, y: 32 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
      >
        <p className={styles.sectionEyebrow}>Engineering Lifecycle</p>
        <h2 className={styles.sectionTitle}>Engineering Timeline</h2>
        <p className={styles.sectionSubtitle}>
          A clear engineering lifecycle with a defined progression toward public deployment.
        </p>
        <EngineeringTimeline />
      </motion.section>

      {/* ── 7. INFRASTRUCTURE STORY ──────────────────────────────────────── */}
      <motion.section
        className={styles.infraSection}
        initial={{ opacity: 0, y: 32 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
      >
        <p className={styles.sectionEyebrow}>Technology Stack</p>
        <h2 className={styles.sectionTitle}>Modular Backend Architecture</h2>
        <p className={styles.sectionSubtitle}>
          VERITAS was engineered with a fully modular backend architecture, enabling independent scaling of each reasoning subsystem.
        </p>
        <motion.div
          className={styles.infraGrid}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          variants={{ visible: { transition: { staggerChildren: 0.07 } }, hidden: {} }}
        >
          {infraTech.map((t) => (
            <motion.div key={t.name} className={styles.infraCard} variants={fadeUp}>
              <h4 className={styles.infraCardTitle}>{t.name}</h4>
              <p className={styles.infraCardDesc}>{t.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </motion.section>

      {/* ── 8. ENGINEERING PHILOSOPHY ────────────────────────────────────── */}
      <motion.section
        className={styles.philosophySection}
        initial={{ opacity: 0, y: 32 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
      >
        <p className={styles.sectionEyebrow}>Engineering Philosophy</p>
        <div className={styles.philosophyList}>
          {philosophyLines.map((line, i) => (
            <motion.p
              key={line}
              className={styles.philosophyLine}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
            >
              {line}
            </motion.p>
          ))}
        </div>
      </motion.section>

      <Footer />
    </main>
  );
}
