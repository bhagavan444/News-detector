import React from "react";
import { Helmet } from "react-helmet-async";
import { BASE_URL } from "./veritasSchemas";

/**
 * Reusable SEOHead component for dynamic React SEO and JSON-LD schema injection.
 */
const SEOHead = ({
  title = "VERITAS | AI Truth Extraction & Verification Engine",
  description = "VERITAS is an explainable AI truth extraction and verification engine that identifies factual claims, validates evidence, detects logical inconsistencies, and explains AI reasoning.",
  canonicalPath = "",
  keywords = "VERITAS AI, Truth Extraction Engine, AI Verification System, Explainable AI, Evidence Validation, Bias Detection AI, AI Reasoning Engine, Claim Verification, AI Trust Layer",
  noindex = false,
  schema = null,
}) => {
  const absoluteUrl = `${BASE_URL}${canonicalPath}`;
  const robotsDirective = noindex ? "noindex, nofollow" : "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1";
  const schemaArray = Array.isArray(schema) ? schema : schema ? [schema] : [];

  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <html lang="en" />
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="robots" content={robotsDirective} />
      <meta name="googlebot" content={robotsDirective} />
      <meta name="theme-color" content="#ffffff" />
      <link rel="canonical" href={absoluteUrl} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={absoluteUrl} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:site_name" content="VERITAS" />
      <meta property="og:image" content={`${BASE_URL}/og-image.png`} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={absoluteUrl} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={`${BASE_URL}/og-image.png`} />

      {/* JSON-LD Schema.org Structured Data */}
      {schemaArray.map((schemaObj, index) => (
        <script key={index} type="application/ld+json">
          {JSON.stringify(schemaObj)}
        </script>
      ))}
    </Helmet>
  );
};

export default SEOHead;
