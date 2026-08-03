import React, { useState, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import "./VeritasTransition.css";

const STATUS_MESSAGES = [
  "Understanding information",
  "Finding evidence",
  "Evaluating credibility",
  "Analyzing relationships",
  "Building reasoning",
  "Connecting knowledge",
  "Verifying consistency",
  "Preparing insights",
  "Almost ready",
  "Ready",
];

const VeritasTransition = ({ children }) => {
  const location = useLocation();
  const [isTransitioning, setIsTransitioning] = useState(true);
  const [phase, setPhase] = useState(1);
  const [statusIndex, setStatusIndex] = useState(0);
  const canvasRef = useRef(null);
  const animFrameRef = useRef(null);

  // Trigger global transition on pathname change or initial mount
  useEffect(() => {
    setIsTransitioning(true);
    setPhase(1);
    setStatusIndex(0);

    const timers = [];

    // Phase 1: Pure Black silence (0 - 200ms)
    // Phase 2: VERITAS appears (200ms)
    timers.push(
      setTimeout(() => {
        setPhase(2);
      }, 200)
    );

    // Phase 3 & 4: Abstract graph grows + Status messages rotate (700ms)
    timers.push(
      setTimeout(() => {
        setPhase(3);
      }, 700)
    );

    // Phase 5: Dissolve & Page reveal (2200ms)
    timers.push(
      setTimeout(() => {
        setPhase(5);
      }, 2200)
    );

    // Complete transition and hide overlay (2650ms)
    timers.push(
      setTimeout(() => {
        setIsTransitioning(false);
      }, 2650)
    );

    return () => {
      timers.forEach((t) => clearTimeout(t));
    };
  }, [location.pathname]);

  // Rotate status messages every 500ms during Phase 3/4
  useEffect(() => {
    if (phase !== 3) return;

    const statusInterval = setInterval(() => {
      setStatusIndex((prev) => (prev + 1) % STATUS_MESSAGES.length);
    }, 500);

    return () => clearInterval(statusInterval);
  }, [phase]);

  // HTML5 Canvas Abstract Reasoning Graph (Phase 3 & 5)
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || (phase !== 3 && phase !== 5)) return;

    const ctx = canvas.getContext("2d");
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener("resize", handleResize);

    // Initialize particles: starts with 1 particle at center and duplicates
    const nodes = [];
    const maxNodes = 42;
    const centerX = width / 2;
    const centerY = height / 2;

    nodes.push({
      x: centerX,
      y: centerY,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      radius: 2,
      alpha: 1,
    });

    let frameCount = 0;

    const renderGraph = () => {
      frameCount++;
      ctx.clearRect(0, 0, width, height);

      // Spawn new nodes organically up to maxNodes
      if (frameCount % 8 === 0 && nodes.length < maxNodes && phase === 3) {
        const parent = nodes[Math.floor(Math.random() * nodes.length)];
        const angle = Math.random() * Math.PI * 2;
        const dist = 15 + Math.random() * 45;
        nodes.push({
          x: parent.x + Math.cos(angle) * dist,
          y: parent.y + Math.sin(angle) * dist,
          vx: (Math.random() - 0.5) * 0.35,
          vy: (Math.random() - 0.5) * 0.35,
          radius: 1.2 + Math.random() * 1.5,
          alpha: 0,
        });
      }

      // Draw connection lines
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 140) {
            const lineAlpha = (1 - dist / 140) * 0.12 * nodes[i].alpha * nodes[j].alpha;
            ctx.beginPath();
            ctx.strokeStyle = `rgba(255, 255, 255, ${lineAlpha})`;
            ctx.lineWidth = 0.8;
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.stroke();
          }
        }
      }

      // Draw glowing nodes
      nodes.forEach((node) => {
        // Fade in new nodes
        if (node.alpha < 1 && phase === 3) {
          node.alpha = Math.min(1, node.alpha + 0.04);
        }
        // Fade out in phase 5
        if (phase === 5) {
          node.alpha = Math.max(0, node.alpha - 0.05);
        }

        node.x += node.vx;
        node.y += node.vy;

        // Soft center gravity so graph stays minimal and centered
        node.vx += (centerX - node.x) * 0.00015;
        node.vy += (centerY - node.y) * 0.00015;

        // Damping
        node.vx *= 0.992;
        node.vy *= 0.992;

        ctx.save();
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${node.alpha})`;
        ctx.shadowColor = "rgba(255, 255, 255, 0.4)";
        ctx.shadowBlur = 10;
        ctx.fill();
        ctx.restore();
      });

      if (phase === 3 || (phase === 5 && nodes.some((n) => n.alpha > 0))) {
        animFrameRef.current = requestAnimationFrame(renderGraph);
      }
    };

    animFrameRef.current = requestAnimationFrame(renderGraph);

    return () => {
      window.removeEventListener("resize", handleResize);
      if (animFrameRef.current) {
        cancelAnimationFrame(animFrameRef.current);
      }
    };
  }, [phase]);

  return (
    <>
      <AnimatePresence>
        {isTransitioning && (
          <motion.div
            key="veritas-global-transition"
            className="veritas-transition-overlay"
            initial={{ opacity: 1 }}
            animate={{ opacity: phase === 5 ? 0 : 1 }}
            exit={{ opacity: 0 }}
            transition={{
              duration: 0.45,
              ease: [0.65, 0, 0.35, 1],
            }}
          >
            {/* HTML5 Canvas Reasoning Graph (Phase 3 & 5) */}
            {(phase === 3 || phase === 5) && (
              <div className="veritas-canvas-container">
                <canvas ref={canvasRef} className="veritas-canvas" />
              </div>
            )}

            {/* Centered Typography Hierarchy */}
            {phase >= 2 && (
              <div className="veritas-content-center">
                <motion.h1
                  className="veritas-logo-text"
                  initial={{ opacity: 0, scale: 0.98, filter: "blur(8px)" }}
                  animate={{
                    opacity: phase === 5 ? 0 : 1,
                    scale: phase === 5 ? 1.01 : 1,
                    filter: phase === 5 ? "blur(8px)" : "blur(0px)",
                  }}
                  transition={{
                    duration: 0.5,
                    ease: [0.65, 0, 0.35, 1],
                  }}
                >
                  VERITAS
                </motion.h1>

                <motion.p
                  className="veritas-tagline"
                  initial={{ opacity: 0, y: 6 }}
                  animate={{
                    opacity: phase === 5 ? 0 : 0.85,
                    y: phase === 5 ? -6 : 0,
                  }}
                  transition={{
                    duration: 0.5,
                    delay: 0.15,
                    ease: [0.65, 0, 0.35, 1],
                  }}
                >
                  Understand What Matters.
                </motion.p>
              </div>
            )}

            {/* Status Messages Sequence (Phase 3 & 4) */}
            {phase === 3 && (
              <div className="veritas-status-container">
                <AnimatePresence mode="wait">
                  <motion.p
                    key={statusIndex}
                    className="veritas-status-message"
                    initial={{ opacity: 0, y: 6, filter: "blur(4px)" }}
                    animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    exit={{ opacity: 0, y: -6, filter: "blur(4px)" }}
                    transition={{
                      duration: 0.35,
                      ease: [0.65, 0, 0.35, 1],
                    }}
                  >
                    {STATUS_MESSAGES[statusIndex]}
                  </motion.p>
                </AnimatePresence>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Destination Page Wrapper with Stagger Reveal */}
      <div
        className={`veritas-page-wrapper ${
          !isTransitioning || phase === 5 ? "veritas-page-reveal" : ""
        }`}
      >
        {children}
      </div>
    </>
  );
};

export default VeritasTransition;
