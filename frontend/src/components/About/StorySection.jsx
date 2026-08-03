import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import styles from './StorySection.module.css';

const StatementItem = ({ statement, index, totalStatements, scrollYProgress }) => {
  const step = 1 / totalStatements;
  const start = index * step;
  const end = start + step;

  const opacity = useTransform(
    scrollYProgress,
    [Math.max(0, start - 0.05), start + 0.05, end - 0.05, Math.min(1, end + 0.05)],
    [0, 1, 1, 0]
  );

  const y = useTransform(
    scrollYProgress,
    [Math.max(0, start - 0.05), start + 0.05, end - 0.05, Math.min(1, end + 0.05)],
    [50, 0, 0, -50]
  );

  return (
    <motion.div
      className={styles.statementWrapper}
      style={{ opacity, y, pointerEvents: 'none' }}
    >
      <h2 className={styles.statementText}>{statement}</h2>
    </motion.div>
  );
};

const StorySection = () => {
  const containerRef = useRef(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const statements = [
    "The internet solved access.",
    "It did not solve understanding.",
    "Millions of articles.",
    "Millions of opinions.",
    "Millions of narratives.",
    "Very little reasoning."
  ];

  return (
    <section ref={containerRef} className={styles.storyContainer}>
      <div className={styles.stickyContent}>
        {statements.map((statement, index) => (
          <StatementItem
            key={index}
            statement={statement}
            index={index}
            totalStatements={statements.length}
            scrollYProgress={scrollYProgress}
          />
        ))}
      </div>
    </section>
  );
};

export default StorySection;

