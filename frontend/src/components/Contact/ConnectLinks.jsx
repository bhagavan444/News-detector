import React from 'react';
import { motion } from 'framer-motion';
import styles from './ConnectLinks.module.css';

const socialLinks = [
  { name: 'LinkedIn', url: 'https://www.linkedin.com/in/thenameisbhagavan/' },
  { name: 'GitHub', url: 'https://github.com/thenameisbhagavan' },
  { name: 'X (Twitter)', url: 'https://x.com/nameisbhagavan' },
  { name: 'Instagram', url: 'https://www.instagram.com/thenameisbhagavan_/' },
  { name: 'YouTube', url: 'https://www.youtube.com/@TheNameIsBhagavan' },
  { name: 'Facebook', url: 'https://www.facebook.com/thenameisbhagavan' },
  { name: 'Email', url: 'mailto:thenameisbhagavan@gmail.com' },
];

const ConnectLinks = () => {
  return (
    <section className={styles.connectContainer}>
      <div className={styles.content}>
        <motion.h2 
          className={styles.heading}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        >
          Connect with Bhagavan &amp; VERITAS.
        </motion.h2>

        <div className={styles.linksWrapper}>
          {socialLinks.map((item, index) => (
            <motion.a 
              key={item.name}
              href={item.url} 
              target={item.url.startsWith('mailto:') ? undefined : "_blank"} 
              rel={item.url.startsWith('mailto:') ? undefined : "noopener noreferrer"}
              className={styles.link}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
            >
              {item.name} ↗
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ConnectLinks;
