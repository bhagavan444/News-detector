import React, { useEffect } from 'react';
import HeroSection from '../components/About/HeroSection';
import StorySection from '../components/About/StorySection';
import PhilosophySection from '../components/About/PhilosophySection';
import ArchitectureSection from '../components/About/ArchitectureSection';
import ReportShowcase from '../components/About/ReportShowcase';
import PrincipleSection from '../components/About/PrincipleSection';
import FutureSection from '../components/About/FutureSection';
import FinalCTA from '../components/About/FinalCTA';
import Footer from '../components/Footer/Footer'; // Reusing Home Footer
import SEOHead from '../components/seo/SEOHead';
import {
  getOrganizationSchema,
  getPersonSchema,
  getTechArticleSchema,
  getBreadcrumbSchema,
  getSpeakableSchema,
} from '../components/seo/veritasSchemas';

export default function About() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main style={{ backgroundColor: "#000", color: "#fff" }}>
      <SEOHead
        title="About VERITAS | Engineering Explainable AI & Truth Extraction"
        description="Learn about the engineering philosophy behind VERITAS: an explainable AI system engineered to validate claims, evaluate evidence, and eliminate opaque black-box AI outputs."
        canonicalPath="/about"
        schema={[
          getOrganizationSchema(),
          getPersonSchema(),
          getSpeakableSchema("/about"),
          getBreadcrumbSchema([{ name: "About", path: "/about" }]),
          getTechArticleSchema({
            title: "About VERITAS | Engineering Explainable AI & Truth Extraction",
            description: "An overview of VERITAS engineering principles, architecture, and truth extraction methodology.",
            path: "/about",
          }),
        ]}
      />
      <HeroSection />
      <StorySection />
      <PhilosophySection />
      <ArchitectureSection />
      <ReportShowcase />
      <PrincipleSection />
      <FutureSection />
      <FinalCTA />
      <Footer />
    </main>
  );
}

