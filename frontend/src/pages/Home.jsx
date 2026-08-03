import React, { useEffect } from "react";
import HeroSection from "../components/Home/HeroSection";
import ProblemSection from "../components/Home/ProblemSection";
import TransformationSection from "../components/Home/TransformationSection";
import ProductReveal from "../components/Home/ProductReveal";
import PhilosophySection from "../components/Home/PhilosophySection";
import FinalCTA from "../components/Home/FinalCTA";
import Footer from '../components/Footer/Footer';
import SEOHead from "../components/seo/SEOHead";
import AISemanticSection from "../components/seo/AISemanticSection";
import {
  getWebSiteSchema,
  getOrganizationSchema,
  getSoftwareApplicationSchema,
  getPersonSchema,
  getSpeakableSchema,
  getFAQPageSchema,
} from "../components/seo/veritasSchemas";

export default function Home() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main style={{ backgroundColor: "#000", color: "#fff", overflowX: "hidden", width: "100%", position: "relative" }}>
      <SEOHead
        title="VERITAS — AI Truth Extraction & Verification Engine"
        description="VERITAS is an explainable AI truth extraction and verification engine that identifies factual claims, validates evidence, detects logical inconsistencies, and explains AI reasoning."
        canonicalPath="/"
        schema={[
          getWebSiteSchema(),
          getOrganizationSchema(),
          getSoftwareApplicationSchema(),
          getPersonSchema(),
          getSpeakableSchema("/"),
          getFAQPageSchema(),
        ]}
      />
      <AISemanticSection />
      <HeroSection />
      <ProblemSection />
      <TransformationSection />
      <ProductReveal />
      <PhilosophySection />
      <FinalCTA />
      <Footer />
    </main>
  );
}

