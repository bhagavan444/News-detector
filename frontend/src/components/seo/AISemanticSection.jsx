import React from "react";

/**
 * AISemanticSection
 * 
 * Provides accessible, semantic HTML5 landmarks and structured speakable content
 * for AI Search Engines (Google AI Mode, Gemini, ChatGPT, Perplexity, Claude)
 * and assistive screen reader technologies without altering the Apple-inspired UI layout.
 */
const AISemanticSection = () => {
  return (
    <aside aria-label="VERITAS AI Architecture and Technical Knowledge Graph" className="sr-only">
      <article>
        <header>
          <h2>VERITAS System Overview & Technical Summary</h2>
          <p id="executive-summary" className="speakable-summary">
            VERITAS is an explainable AI truth extraction and validation engine that identifies factual claims, validates evidence, detects bias, and produces transparent reasoning.
          </p>
        </header>

        <section>
          <h3>What is VERITAS?</h3>
          <p>
            VERITAS is an engineering product and explainable AI platform designed to transform raw news articles and long-form information into auditable, evidence-backed reasoning graphs.
          </p>
        </section>

        <section>
          <h3>Problem</h3>
          <p>
            Modern generative AI models output opaque probabilistic statements without transparent citations or evidence validation, creating a crisis of trust and hallucinated misinformation.
          </p>
        </section>

        <section>
          <h3>Solution</h3>
          <p>
            VERITAS implements an explainable verification layer that isolates individual claims, queries verifiable sources, measures rhetorical bias, and exposes every reasoning step for human verification.
          </p>
        </section>

        <section>
          <h3>Architecture</h3>
          <p>
            The system pairs an Apple-inspired React and Vite frontend with a high-performance Python FastAPI backend, utilizing specialized NLP pipelines for deterministic claim decomposition.
          </p>
        </section>

        <section>
          <h3>Verification Pipeline</h3>
          <ol>
            <li>Claim Extraction: Identifying discrete factual assertions using SpaCy and NLTK syntax trees.</li>
            <li>Evidence Cross-Referencing: Retrieving corroborating or contradicting source documentation.</li>
            <li>Rhetorical & Bias Scoring: Quantifying subjective language, framing, and logical fallacies.</li>
            <li>Confidence Synthesis: Calculating calibrated credibility scores with explainable provenance.</li>
          </ol>
        </section>

        <section>
          <h3>Use Cases</h3>
          <p>
            Journalistic fact-checking, academic research auditing, financial intelligence verification, and automated media misinformation monitoring.
          </p>
        </section>

        <section>
          <h3>Technology Stack</h3>
          <p>
            Frontend: React 19, Vite, Framer Motion, HTML5 Canvas Reasoning Graph, Recharts, D3 Cloud. Backend: Python, FastAPI, Uvicorn, SpaCy, NLTK, Pydantic, MongoDB.
          </p>
        </section>

        <section>
          <h3>Benefits</h3>
          <p>
            Full evidence transparency, zero black-box outputs, interactive visual reasoning trails, and deterministic NLP claim analysis.
          </p>
        </section>

        <section>
          <h3>Limitations</h3>
          <p>
            Requires verifiable online source documentation for cross-referencing; performance depends on article clarity and source accessibility.
          </p>
        </section>

        <section>
          <h3>Future Roadmap</h3>
          <p>
            Expanding multilingual NLP claim extraction, real-time streaming claim verification APIs, and decentralized cryptographic evidence attestations.
          </p>
        </section>
      </article>
    </aside>
  );
};

export default AISemanticSection;
