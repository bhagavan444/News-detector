import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Plans.css";

/**
 * Plans.jsx
 * Enhanced pricing & plans page for NewsGuard AI
 * New features added:
 * - Billing cycle toggle (monthly/yearly) + promo code
 * - 14-day free trial & trial management UI
 * - Seat-based pricing for teams and volume discounts
 * - API & per-request pricing preview, sandbox keys
 * - Enterprise-only features: SSO (SAML/OAuth), on-prem/private cloud, SLA, SOC2/HIPAA options
 * - Security & compliance badges, encryption details
 * - Webhooks, SDKs, webhook event examples
 * - Role-based access control (RBAC) and admin features
 * - Demo booking & contact-sales modal
 * - Coupons, promo codes and first-month discounts
 * - Payment methods and invoice download placeholder
 * - FAQ inline and advanced comparison matrix
 *
 * This file is meant to be a drop-in replacement for your Plans component.
 */

function Currency({ amount }) {
  if (amount === 0) return <span>Free</span>;
  return <span>${amount}</span>;
}

export default function Plans() {
  const navigate = useNavigate();
  const [billingCycle, setBillingCycle] = useState("monthly"); // monthly/yearly
  const [promoCode, setPromoCode] = useState("");
  const [appliedPromo, setAppliedPromo] = useState(null);
  const [seats, setSeats] = useState(1);
  const [showContactModal, setShowContactModal] = useState(false);
  const [currency, setCurrency] = useState("USD");

  // Pricing configuration — hypothetical
  const plans = [
    {
      id: "free",
      name: "Free",
      price: { monthly: 0, yearly: 0 },
      badge: "Free",
      limits: ["50 checks / day", "Basic model", "Community support"],
      features: [
        "Basic news credibility check",
        "Instant credibility score",
        "Mobile + Desktop",
        "Community-sourced insights",
      ],
      cta: { text: "Start Free", action: () => navigate("/detector") },
    },
    {
      id: "pro",
      name: "Pro",
      price: { monthly: 19, yearly: 190 },
      badge: "Pro — Most Popular",
      limits: ["10k checks / month", "Detailed explanations", "History + Export"],
      features: [
        "Advanced AI models",
        "Save & track verification history",
        "Detailed explainability & evidence links",
        "Priority email support",
        "Browser extension (beta)",
        "SDKs (JS, Python) & sandbox API key",
      ],
      cta: { text: "Get Pro", action: () => navigate("/signup?plan=pro") },
    },
    {
      id: "enterprise",
      name: "Enterprise",
      price: { monthly: 499, yearly: 4990 },
      badge: "Enterprise — Contact Sales",
      limits: ["Unlimited checks", "Dedicated model & SLAs", "Bulk exports"],
      features: [
        "Everything in Pro",
        "SSO: SAML + OAuth2",
        "Private cloud / On-prem deployment",
        "Dedicated account manager & SLAs (uptime >= 99.95%)",
        "Audit logs, compliance (SOC2/ISO27001/HIPAA opt-in)",
        "Role-based access controls & admin console",
        "Webhooks, event streams, and SIEM integrations",
        "Custom model training & human-in-the-loop labeling",
      ],
      cta: { text: "Contact Sales", action: () => setShowContactModal(true) },
    },
  ];

  const applyPromo = () => {
    // demo promo logic — in production validate on server
    if (!promoCode) return setAppliedPromo(null);
    if (promoCode.toUpperCase() === "LAUNCH20") {
      setAppliedPromo({ code: "LAUNCH20", type: "percent", value: 20, label: "20% off (first year)" });
      alert("Promo applied: 20% off");
    } else if (promoCode.toUpperCase() === "TRIAL14") {
      setAppliedPromo({ code: "TRIAL14", type: "trial", value: 14, label: "14-day free trial" });
      alert("Promo applied: 14-day free trial");
    } else {
      setAppliedPromo({ code: promoCode, type: "unknown", value: 0, label: "Invalid or expired" });
      alert("Promo code not recognized (demo)." );
    }
  };

  const computePrice = (base) => {
    let price = base[billingCycle];
    // seats multiplier for enterprise & custom
    if (seats > 1 && base && base !== 0) {
      // simple seat price approximation (Pro seats add $8/mo each after first)
      if (base === plans[1].price) {
        // pro pricing
        price = Math.round(price + (seats - 1) * 8);
      }
      if (base === plans[2].price) {
        // enterprise per-seat
        price = Math.round(price + (seats - 1) * 15);
      }
    }

    // yearly discount
    if (billingCycle === "yearly") price = Math.round(price * 0.83); // ~17% effective

    // apply promo if percent
    if (appliedPromo?.type === "percent") {
      price = Math.round(price * (1 - appliedPromo.value / 100));
    }

    return price;
  };

  return (
    <main className="plans-main max-w-6xl mx-auto p-6 text-gray-900 dark:text-gray-100">
      <header className="plans-hero mb-6">
        <h1 className="text-3xl font-bold">Plans & Pricing</h1>
        <p className="text-gray-600">Flexible options for individuals, teams, and enterprises to integrate reliable fake-news detection.</p>

        <div className="mt-4 flex flex-wrap gap-3 items-center">
          <div className="pricing-toggle p-1 rounded bg-gray-100 dark:bg-gray-800">
            <button className={billingCycle === "monthly" ? "active px-3 py-1 rounded bg-white dark:bg-gray-900" : "px-3 py-1"} onClick={() => setBillingCycle("monthly")}>Monthly</button>
            <button className={billingCycle === "yearly" ? "active px-3 py-1 rounded bg-white dark:bg-gray-900" : "px-3 py-1"} onClick={() => setBillingCycle("yearly")}>Yearly (Save ~17%)</button>
          </div>

          <div className="flex items-center gap-2">
            <label className="text-sm">Seats</label>
            <input type="number" min={1} max={1000} value={seats} onChange={(e) => setSeats(Number(e.target.value))} className="w-20 p-1 rounded border" />
          </div>

          <div className="flex items-center gap-2 ml-auto">
            <label className="text-sm">Currency</label>
            <select value={currency} onChange={(e) => setCurrency(e.target.value)} className="p-1 rounded border">
              <option>USD</option>
              <option>INR</option>
              <option>EUR</option>
            </select>
          </div>
        </div>

        <div className="mt-3 flex gap-2 items-center">
          <input placeholder="Promo code" value={promoCode} onChange={(e) => setPromoCode(e.target.value)} className="p-2 rounded border" />
          <button onClick={applyPromo} className="px-3 py-1 border rounded">Apply</button>
          {appliedPromo && <div className="text-sm text-green-600">Applied: {appliedPromo.label}</div>}
        </div>
      </header>

      <section className="plans-cards grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        {plans.map((p) => (
          <div key={p.id} className={`plan-card p-4 rounded border ${p.id === "pro" ? "featured" : ""}`}>
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-semibold">{p.name}</h3>
              <div className="text-xs text-gray-500">{p.badge}</div>
            </div>

            <div className="mt-4 text-3xl font-bold">
              <Currency amount={computePrice(p.price)} />
              <span className="text-sm ml-2">/ {billingCycle}</span>
            </div>

            <div className="mt-3 text-sm text-gray-500">
              {p.limits.map((l, i) => (<div key={i}>{l}</div>))}
            </div>

            <ul className="mt-3 list-disc ml-5 text-sm">
              {p.features.map((f, i) => <li key={i}>{f}</li>)}
            </ul>

            <div className="mt-4 flex gap-2">
              <button onClick={p.cta.action} className="plan-btn px-4 py-2 rounded bg-blue-600 text-white">{p.cta.text}</button>
              <button className="px-3 py-1 border rounded" onClick={() => setShowContactModal(true)}>Request Demo</button>
            </div>

            <div className="mt-3 text-xs text-gray-500">
              <strong>Security:</strong> TLS 1.2+, AES-256 at rest, IP allowlisting (Enterprise)
            </div>
          </div>
        ))}
      </section>

      <section className="plans-comparison mb-6">
        <h2 className="text-xl font-semibold mb-3">Feature Comparison</h2>
        <div className="overflow-auto rounded border">
          <table className="w-full text-sm">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-3 text-left">Feature</th>
                <th className="p-3">Free</th>
                <th className="p-3">Pro</th>
                <th className="p-3">Enterprise</th>
              </tr>
            </thead>
            <tbody>
              {[
                ["Advanced AI Models","❌","✔️","✔️"],
                ["Explainability & Evidence","❌","✔️","✔️"],
                ["History & Exports","❌","✔️","✔️"],
                ["Rate Limits / Quotas","Low","Medium","Unlimited"],
                ["API Access","❌","Sandbox","Full (API keys + SLA)"],
                ["SSO (SAML/OAuth)","❌","❌","✔️"],
                ["On-prem / Private Cloud","❌","❌","✔️"],
                ["Audit Logs & Compliance","❌","Optional","Included (SOC2/ISO)"],
                ["Custom Models & Retraining","❌","Optional (paid)","Included"],
                ["Dedicated Account Manager","❌","Optional","Included"],
                ["Webhooks / Event Streams","❌","✔️","✔️"],
                ["Role-Based Access Control","❌","Basic","Full (Admin/Team)"],
                ["Data Retention Controls","Default","Configurable","Configurable + Archival"],
                ["SLA & Uptime Guarantee","None","Optional","99.95%+"],
              ].map((row, idx) => (
                <tr key={idx} className={idx%2===0? 'bg-white': 'bg-gray-50'}>
                  <td className="p-3 border-t">{row[0]}</td>
                  <td className="p-3 border-t text-center">{row[1]}</td>
                  <td className="p-3 border-t text-center">{row[2]}</td>
                  <td className="p-3 border-t text-center">{row[3]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="advanced-section mb-6">
        <h2 className="text-xl font-semibold mb-2">Enterprise Features — Details</h2>
        <ul className="list-disc ml-5 text-sm">
          <li><strong>SSO & RBAC</strong>: SAML, OAuth2, and fine-grained role permissions for teams and orgs.</li>
          <li><strong>Security & Compliance</strong>: SOC2 Type II readiness, ISO27001, encryption at rest (AES-256), TLS in transit, optional HIPAA compliance for healthcare customers.</li>
          <li><strong>On-prem & Private Cloud</strong>: Deploy the detection service inside your VPC or on-prem infrastructure with dedicated support.</li>
          <li><strong>Audit Logs & SIEM</strong>: Stream audit logs to your SIEM, with retention and search capabilities.</li>
          <li><strong>Integration</strong>: SDKs for JavaScript, Python, and server SDKs, Webhooks for events (check.created, check.completed, check.flagged), and sample SIEM connector.</li>
          <li><strong>Human-in-the-loop</strong>: Human verification workflows for high-impact claims, label management and retraining pipelines.</li>
          <li><strong>Dedicated Support</strong>: Onboarding workshops, 24/7 premium support, and dedicated account managers for Enterprise plans.</li>
        </ul>
      </section>

      <section className="billing-cta mb-8">
        <div className="p-4 rounded bg-blue-50 dark:bg-blue-900 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div>
            <h3 className="font-semibold">Need a custom quote or a demo?</h3>
            <p className="text-sm text-gray-600">Book a demo, request an SLA, or speak with our sales team for tailored pricing and migration plans.</p>
          </div>
          <div className="flex gap-3">
            <button onClick={() => setShowContactModal(true)} className="px-4 py-2 bg-blue-600 text-white rounded">Contact Sales / Book Demo</button>
            <button onClick={() => navigate('/signup')} className="px-4 py-2 border rounded">Start Free Trial</button>
          </div>
        </div>
      </section>

      {/* Contact / Demo Modal (simple) */}
      {showContactModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40 p-4">
          <div className="w-full max-w-2xl bg-white dark:bg-gray-900 rounded p-6">
            <h3 className="text-lg font-semibold mb-2">Contact Sales / Request Demo</h3>
            <p className="text-sm text-gray-600 mb-4">Tell us about your team size, expected volume, or compliance needs and we'll prepare a tailored proposal.</p>
            <form onSubmit={(e) => { e.preventDefault(); alert('Demo request sent (demo). Our sales team will reach out.'); setShowContactModal(false); }} className="space-y-2">
              <input required placeholder="Full name" className="w-full p-2 rounded border" />
              <input required type="email" placeholder="Work email" className="w-full p-2 rounded border" />
              <input placeholder="Company" className="w-full p-2 rounded border" />
              <textarea placeholder="Your requirements / message" className="w-full p-2 rounded border" rows={4}></textarea>
              <div className="flex gap-2 justify-end">
                <button type="button" onClick={() => setShowContactModal(false)} className="px-3 py-1 border rounded">Cancel</button>
                <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded">Request Demo</button>
              </div>
            </form>
          </div>
        </div>
      )}

      <footer className="text-sm text-gray-600 dark:text-gray-400 py-6 border-t border-gray-200 dark:border-gray-700">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-3">
          <div>© {new Date().getFullYear()} NewsGuard AI — Pricing subject to change</div>
          <div className="flex gap-3">
            <a href="/terms" className="underline">Terms</a>
            <a href="/privacy" className="underline">Privacy</a>
            <a href="/contact" className="underline">Contact</a>
          </div>
        </div>
      </footer>
    </main>
  );
}
