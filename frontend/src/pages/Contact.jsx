import React, { useEffect } from 'react';
import ContactHero from '../components/Contact/ContactHero';
import Channels from '../components/Contact/Channels';
import DirectContact from '../components/Contact/DirectContact';
import ConnectLinks from '../components/Contact/ConnectLinks';
import WhyExists from '../components/Contact/WhyExists';
import ContactCTA from '../components/Contact/ContactCTA';
import Footer from '../components/Footer/Footer';
import SEOHead from '../components/seo/SEOHead';
import {
  getPersonSchema,
  getOrganizationSchema,
  getBreadcrumbSchema,
  getSpeakableSchema,
} from '../components/seo/veritasSchemas';

export default function Contact() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main style={{ backgroundColor: "#000", color: "#fff", minHeight: "100vh" }}>
      <SEOHead
        title="Contact & Collaboration | VERITAS Explainable AI"
        description="Connect with the creator of VERITAS for engineering inquiries, research collaborations, or enterprise explainable AI deployments."
        canonicalPath="/contact"
        schema={[
          getPersonSchema(),
          getOrganizationSchema(),
          getSpeakableSchema("/contact"),
          getBreadcrumbSchema([{ name: "Contact", path: "/contact" }]),
        ]}
      />
      <ContactHero />
      <Channels />
      <DirectContact />
      <ConnectLinks />
      <WhyExists />
      <ContactCTA />
      <Footer />
    </main>
  );
}

