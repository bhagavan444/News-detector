/**
 * VERITAS Authentic Schema.org JSON-LD Structured Data Generators
 *
 * CRITICAL REQUIREMENTS:
 * - Zero fabricated ratings, reviews, testimonials, statistics, awards, or unavailable technologies.
 * - Every JSON-LD field accurately represents the existing VERITAS project and architecture.
 */

export const BASE_URL = "https://news-detector.vercel.app";

/**
 * Person Schema (Creator / Architect of VERITAS)
 */
export const getPersonSchema = () => ({
  "@context": "https://schema.org",
  "@type": "Person",
  "@id": `${BASE_URL}/#creator`,
  "name": "Bhagavan",
  "alternateName": "TheNameIsBhagavan",
  "jobTitle": "Principal Frontend Architect & Senior Full-Stack AI Engineer",
  "description": "Architect and Creator of VERITAS, an explainable AI truth extraction and verification engine.",
  "url": BASE_URL,
  "sameAs": [
    "https://github.com/bhagavan444",
    "https://linkedin.com",
    "https://instagram.com",
    "https://youtube.com"
  ]
});

/**
 * Organization Schema (VERITAS System)
 */
export const getOrganizationSchema = () => ({
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": `${BASE_URL}/#organization`,
  "name": "VERITAS",
  "url": BASE_URL,
  "description": "AI truth extraction, evidence validation, and explainable misinformation detection engine.",
  "founder": {
    "@type": "Person",
    "@id": `${BASE_URL}/#creator`,
    "name": "Bhagavan"
  }
});

/**
 * WebSite Schema with SearchAction
 */
export const getWebSiteSchema = () => ({
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${BASE_URL}/#website`,
  "url": BASE_URL,
  "name": "VERITAS AI Truth Extraction Engine",
  "description": "Explainable AI truth extraction and claim verification platform.",
  "publisher": {
    "@type": "Organization",
    "@id": `${BASE_URL}/#organization`
  },
  "potentialAction": {
    "@type": "SearchAction",
    "target": {
      "@type": "EntryPoint",
      "urlTemplate": `${BASE_URL}/examples?q={search_term_string}`
    },
    "query-input": "required name=search_term_string"
  }
});

/**
 * SoftwareApplication & WebApplication Schema
 */
export const getSoftwareApplicationSchema = () => ({
  "@context": "https://schema.org",
  "@type": ["SoftwareApplication", "WebApplication"],
  "@id": `${BASE_URL}/#software`,
  "name": "VERITAS",
  "url": BASE_URL,
  "applicationCategory": "WebApplication",
  "operatingSystem": "All",
  "description": "An explainable AI truth extraction and verification engine that identifies factual claims, validates evidence, detects logical inconsistencies, and explains reasoning.",
  "creator": {
    "@type": "Person",
    "@id": `${BASE_URL}/#creator`
  },
  "author": {
    "@type": "Organization",
    "@id": `${BASE_URL}/#organization`
  },
  "browserRequirements": "Requires JavaScript. Modern HTML5 browsers supported."
});

/**
 * Speakable Schema for AI Search Engines (Google AI Mode, Gemini, Perplexity, ChatGPT)
 */
export const getSpeakableSchema = (path = "/") => ({
  "@context": "https://schema.org",
  "@type": "SpeakableSpecification",
  "xpath": [
    "//*[@id='executive-summary']",
    "//*[@class='speakable-summary']"
  ],
  "cssSelector": [
    "#executive-summary",
    ".speakable-summary"
  ],
  "url": `${BASE_URL}${path}`
});

/**
 * FAQPage Schema
 */
export const getFAQPageSchema = () => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What is VERITAS?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "VERITAS is an explainable AI truth extraction and validation engine that identifies factual claims, validates evidence against credible sources, detects logical bias, and produces transparent reasoning instead of opaque AI outputs."
      }
    },
    {
      "@type": "Question",
      "name": "How does VERITAS detect misinformation?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "VERITAS decomposes articles into discrete factual claims using natural language processing (SpaCy and NLTK), cross-references each claim against verifiable sources, evaluates rhetorical consistency, and assigns calibrated confidence scores."
      }
    },
    {
      "@type": "Question",
      "name": "How is VERITAS different from ChatGPT?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Unlike generative language models that produce probabilistic text without citing evidence, VERITAS is a specialized analytical engine engineered specifically to audit claims, expose reasoning steps, and present auditable verification trails."
      }
    },
    {
      "@type": "Question",
      "name": "Does VERITAS replace human fact-checking?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "No. VERITAS is an intelligence enhancement layer designed to assist researchers, journalists, and analysts by automating claim extraction and preliminary evidence gathering, providing transparent signals for human decision-making."
      }
    },
    {
      "@type": "Question",
      "name": "What technologies power VERITAS?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "VERITAS uses a React and Vite frontend with Apple-inspired canvas reasoning visualizations, powered by a FastAPI Python backend utilizing SpaCy, NLTK, and custom NLP extraction pipelines."
      }
    }
  ]
});

/**
 * TechArticle Schema Generator
 */
export const getTechArticleSchema = ({ title, description, path, datePublished = "2026-01-01" }) => ({
  "@context": "https://schema.org",
  "@type": "TechArticle",
  "headline": title,
  "description": description,
  "url": `${BASE_URL}${path}`,
  "datePublished": datePublished,
  "author": {
    "@type": "Person",
    "@id": `${BASE_URL}/#creator`,
    "name": "Bhagavan"
  },
  "publisher": {
    "@type": "Organization",
    "@id": `${BASE_URL}/#organization`,
    "name": "VERITAS"
  },
  "about": [
    { "@type": "Thing", "name": "Explainable AI" },
    { "@type": "Thing", "name": "Truth Extraction" },
    { "@type": "Thing", "name": "Natural Language Processing" },
    { "@type": "Thing", "name": "Misinformation Detection" }
  ]
});

/**
 * BreadcrumbList Schema Generator
 */
export const getBreadcrumbSchema = (crumbs = []) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "Home",
      "item": BASE_URL
    },
    ...crumbs.map((crumb, index) => ({
      "@type": "ListItem",
      "position": index + 2,
      "name": crumb.name,
      "item": `${BASE_URL}${crumb.path}`
    }))
  ]
});
