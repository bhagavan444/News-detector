import React, { useState, useEffect, useRef } from 'react';

function About() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [cursorVariant, setCursorVariant] = useState('default');
  const cursorRef = useRef(null);
  const cursorDotRef = useRef(null);

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

  // Styles
  const styles = {
    container: {
      width: '100%',
      minHeight: '100vh',
      backgroundColor: '#ffffff',
      color: '#1a1a1a',
      fontFamily: 'cursive',
      cursor: 'none',
      overflow: 'hidden',
    },
    cursor: {
      width: cursorVariant === 'hover' ? '60px' : '40px',
      height: cursorVariant === 'hover' ? '60px' : '40px',
      border: '2px solid rgba(37, 99, 235, 0.6)',
      borderRadius: '50%',
      position: 'fixed',
      top: '-20px',
      left: '-20px',
      pointerEvents: 'none',
      zIndex: 9999,
      transition: 'width 0.3s ease, height 0.3s ease, border-color 0.3s ease',
    },
    cursorDot: {
      width: '6px',
      height: '6px',
      backgroundColor: '#2563eb',
      borderRadius: '50%',
      position: 'fixed',
      top: '-3px',
      left: '-3px',
      pointerEvents: 'none',
      zIndex: 10000,
      transition: 'transform 0.1s ease',
    },
    main: {
      paddingTop: '0',
    },
    section: {
      maxWidth: '1280px',
      margin: '0 auto',
      padding: '120px 48px',
    },
    hero: {
      minHeight: '90vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      textAlign: 'center',
      padding: '160px 48px',
    },
    heroTitle: {
      fontSize: '72px',
      fontWeight: '600',
      lineHeight: '1.1',
      marginBottom: '32px',
      letterSpacing: '-2px',
      background: 'linear-gradient(135deg, #1a1a1a 0%, #4a4a4a 100%)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      backgroundClip: 'text',
    },
    heroSubtitle: {
      fontSize: '24px',
      lineHeight: '1.6',
      color: '#4a4a4a',
      maxWidth: '800px',
      margin: '0 auto 48px',
      fontWeight: '300',
    },
    sectionTitle: {
      fontSize: '48px',
      fontWeight: '600',
      marginBottom: '48px',
      letterSpacing: '-1px',
      lineHeight: '1.2',
    },
    problemSection: {
      backgroundColor: 'rgba(240, 240, 240, 0.5)',
      borderTop: '1px solid rgba(37, 99, 235, 0.2)',
      borderBottom: '1px solid rgba(37, 99, 235, 0.2)',
    },
    statsGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
      gap: '48px',
      marginTop: '64px',
    },
    statCard: {
      textAlign: 'left',
    },
    statValue: {
      fontSize: '56px',
      fontWeight: '700',
      color: '#2563eb',
      marginBottom: '16px',
      letterSpacing: '-1px',
    },
    statLabel: {
      fontSize: '18px',
      color: '#4a4a4a',
      lineHeight: '1.6',
    },
    pillarsGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
      gap: '40px',
      marginTop: '64px',
    },
    pillarCard: {
      padding: '40px',
      backgroundColor: 'rgba(250, 250, 250, 0.8)',
      border: '1px solid rgba(0, 0, 0, 0.1)',
      borderRadius: '8px',
      transition: 'all 0.4s ease',
    },
    pillarIcon: {
      width: '56px',
      height: '56px',
      borderRadius: '12px',
      backgroundColor: 'rgba(37, 99, 235, 0.1)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: '24px',
      fontSize: '28px',
    },
    pillarTitle: {
      fontSize: '24px',
      fontWeight: '600',
      marginBottom: '16px',
      color: '#1a1a1a',
    },
    pillarDescription: {
      fontSize: '16px',
      lineHeight: '1.7',
      color: '#4a4a4a',
    },
    architectureSection: {
      backgroundColor: 'rgba(248, 248, 248, 0.9)',
    },
    layerStack: {
      display: 'flex',
      flexDirection: 'column',
      gap: '24px',
      marginTop: '64px',
    },
    layer: {
      padding: '32px 40px',
      backgroundColor: 'rgba(255, 255, 255, 0.8)',
      border: '1px solid rgba(37, 99, 235, 0.2)',
      borderLeft: '4px solid #2563eb',
      borderRadius: '4px',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      transition: 'all 0.3s ease',
    },
    layerTitle: {
      fontSize: '22px',
      fontWeight: '600',
      color: '#1a1a1a',
    },
    layerDescription: {
      fontSize: '16px',
      color: '#4a4a4a',
      marginTop: '8px',
    },
    segmentGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
      gap: '32px',
      marginTop: '64px',
    },
    segmentCard: {
      padding: '32px',
      backgroundColor: 'rgba(250, 250, 250, 0.6)',
      border: '1px solid rgba(0, 0, 0, 0.1)',
      borderRadius: '4px',
      transition: 'all 0.3s ease',
    },
    segmentTitle: {
      fontSize: '20px',
      fontWeight: '600',
      marginBottom: '12px',
      color: '#1a1a1a',
    },
    segmentDescription: {
      fontSize: '15px',
      lineHeight: '1.6',
      color: '#4a4a4a',
    },
    principlesList: {
      marginTop: '64px',
      maxWidth: '900px',
    },
    principle: {
      padding: '32px 0',
      borderBottom: '1px solid rgba(0, 0, 0, 0.1)',
    },
    principleTitle: {
      fontSize: '24px',
      fontWeight: '600',
      marginBottom: '12px',
      color: '#2563eb',
    },
    principleText: {
      fontSize: '18px',
      lineHeight: '1.7',
      color: '#4a4a4a',
    },
    visionSection: {
      textAlign: 'center',
      padding: '160px 48px',
      backgroundColor: 'rgba(245, 248, 255, 0.5)',
      borderTop: '1px solid rgba(37, 99, 235, 0.2)',
      borderBottom: '1px solid rgba(37, 99, 235, 0.2)',
    },
    visionStatement: {
      fontSize: '56px',
      fontWeight: '600',
      lineHeight: '1.3',
      maxWidth: '1000px',
      margin: '0 auto 32px',
      letterSpacing: '-1px',
      color: '#1a1a1a',
    },
    visionText: {
      fontSize: '20px',
      lineHeight: '1.8',
      color: '#4a4a4a',
      maxWidth: '800px',
      margin: '0 auto',
    },
    ctaSection: {
      textAlign: 'center',
      padding: '120px 48px',
      backgroundColor: 'rgba(248, 248, 248, 0.9)',
    },
    ctaTitle: {
      fontSize: '48px',
      fontWeight: '600',
      marginBottom: '24px',
      letterSpacing: '-1px',
      color: '#1a1a1a',
    },
    ctaText: {
      fontSize: '20px',
      color: '#4a4a4a',
      marginBottom: '48px',
      maxWidth: '600px',
      margin: '0 auto 48px',
    },
    ctaButton: {
      display: 'inline-block',
      padding: '20px 48px',
      fontSize: '18px',
      fontWeight: '600',
      color: '#ffffff',
      backgroundColor: '#2563eb',
      border: 'none',
      borderRadius: '6px',
      textDecoration: 'none',
      transition: 'all 0.3s ease',
      cursor: 'none',
    },
  };

  const pillars = [
    {
      icon: '⚡',
      title: 'Real-Time Intelligence',
      description: 'Continuous monitoring and analysis of information flows across digital ecosystems.'
    },
    {
      icon: '🧬',
      title: 'Explainable AI',
      description: 'Transparent decision-making processes with audit-ready reasoning at every layer.'
    },
    {
      icon: '📊',
      title: 'Risk Modeling',
      description: 'Probabilistic assessment frameworks designed for enterprise risk management.'
    },
    {
      icon: '🛡️',
      title: 'Responsible Deployment',
      description: 'Human-in-the-loop systems built with accountability and oversight as core principles.'
    }
  ];

  const layers = [
    { title: 'Data Layer', description: 'Multi-source ingestion & normalization' },
    { title: 'Intelligence Engine', description: 'NLP, pattern recognition & signal detection' },
    { title: 'Explainability Layer', description: 'Human-readable reasoning & audit trails' },
    { title: 'Enterprise API', description: 'Scalable integration & access control' }
  ];

  const segments = [
    { title: 'Governments', description: 'Policy intelligence and public information integrity.' },
    { title: 'Media Organizations', description: 'Editorial verification and source validation.' },
    { title: 'Research Institutions', description: 'Academic analysis and trend identification.' },
    { title: 'Corporate Risk Teams', description: 'Reputation monitoring and narrative tracking.' },
    { title: 'Digital Platforms', description: 'Content moderation and trust & safety operations.' }
  ];

  const principles = [
    { title: 'Transparency', text: 'We prioritize transparency over opacity in every algorithmic decision.' },
    { title: 'Assistance', text: 'We design systems that assist human judgment, not replace it.' },
    { title: 'Accountability', text: 'We measure bias continuously and evolve responsibly with oversight.' },
    { title: 'Privacy', text: 'We maintain data-minimal architectures that respect user privacy by design.' }
  ];

  return (
    <div style={styles.container}>
      {/* Custom Cursor */}
      <div ref={cursorRef} style={styles.cursor} />
      <div ref={cursorDotRef} style={styles.cursorDot} />

      <main style={styles.main}>
        {/* Hero Section */}
        <section style={styles.hero}>
          <div>
            <h1 style={styles.heroTitle}>
              Building the Infrastructure<br />for Information Integrity
            </h1>
            <p style={styles.heroSubtitle}>
              Verifiex is an enterprise-grade AI platform designed to help institutions
              navigate the complexity of digital information with clarity, confidence, and responsibility.
            </p>
          </div>
        </section>

        {/* Problem Section */}
        <section style={{...styles.section, ...styles.problemSection}}>
          <h2 style={styles.sectionTitle}>The Misinformation Crisis</h2>
          <div style={styles.statsGrid}>
            <div style={styles.statCard}>
              <div style={styles.statValue}>$78B</div>
              <div style={styles.statLabel}>Annual economic impact of misinformation globally</div>
            </div>
            <div style={styles.statCard}>
              <div style={styles.statValue}>67%</div>
              <div style={styles.statLabel}>of organizations report reputational damage from false narratives</div>
            </div>
            <div style={styles.statCard}>
              <div style={styles.statValue}>94%</div>
              <div style={styles.statLabel}>of executives cite information integrity as critical infrastructure</div>
            </div>
          </div>
        </section>

        {/* Our Approach */}
        <section style={styles.section}>
          <h2 style={styles.sectionTitle}>Our Approach</h2>
          <p style={{fontSize: '20px', lineHeight: '1.8', color: '#4a4a4a', maxWidth: '900px'}}>
            Verifiex operates at the intersection of artificial intelligence, information science, and responsible technology.
            We build systems that enhance human judgment rather than automate it away.
          </p>
          <div style={styles.pillarsGrid}>
            {pillars.map((pillar, index) => (
              <div
                key={index}
                style={styles.pillarCard}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              >
                <div style={styles.pillarIcon}>{pillar.icon}</div>
                <h3 style={styles.pillarTitle}>{pillar.title}</h3>
                <p style={styles.pillarDescription}>{pillar.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Architecture */}
        <section style={{...styles.section, ...styles.architectureSection}}>
          <h2 style={styles.sectionTitle}>Designed for Enterprise Scale</h2>
          <p style={{fontSize: '20px', lineHeight: '1.8', color: '#4a4a4a', maxWidth: '900px'}}>
            Our architecture is modular, scalable, and built for mission-critical deployments.
          </p>
          <div style={styles.layerStack}>
            {layers.map((layer, index) => (
              <div
                key={index}
                style={styles.layer}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              >
                <div>
                  <div style={styles.layerTitle}>{layer.title}</div>
                  <div style={styles.layerDescription}>{layer.description}</div>
                </div>
                <div style={{fontSize: '32px', color: 'rgba(37, 99, 235, 0.5)'}}>→</div>
              </div>
            ))}
          </div>
        </section>

        {/* Who We Serve */}
        <section style={styles.section}>
          <h2 style={styles.sectionTitle}>Who We Serve</h2>
          <div style={styles.segmentGrid}>
            {segments.map((segment, index) => (
              <div
                key={index}
                style={styles.segmentCard}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              >
                <h3 style={styles.segmentTitle}>{segment.title}</h3>
                <p style={styles.segmentDescription}>{segment.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Responsible AI */}
        <section style={styles.section}>
          <h2 style={styles.sectionTitle}>Responsible AI Commitment</h2>
          <div style={styles.principlesList}>
            {principles.map((principle, index) => (
              <div key={index} style={styles.principle}>
                <h3 style={styles.principleTitle}>{principle.title}</h3>
                <p style={styles.principleText}>{principle.text}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Vision */}
        <section style={styles.visionSection}>
          <h2 style={styles.visionStatement}>
            A World Where Information Can Be Trusted
          </h2>
          <p style={styles.visionText}>
            We envision digital ecosystems where institutions, researchers, and citizens can navigate
            information with confidence—supported by transparent, accountable intelligence infrastructure
            that strengthens democratic discourse and organizational resilience.
          </p>
        </section>

        {/* CTA */}
        <section style={styles.ctaSection}>
          <h2 style={styles.ctaTitle}>Partner With Us</h2>
          <p style={styles.ctaText}>
            Join leading institutions in strengthening information integrity across digital ecosystems.
          </p>
          <a
            href="mailto:contact@verifiex.ai"
            style={styles.ctaButton}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            Request Enterprise Demo
          </a>
        </section>
      </main>
    </div>
  );
}

export default About;