import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Plans.css";

/* ======================================================
   PRICING & PLANS — ENTERPRISE SAAS
   Product: NewsGuard AI
====================================================== */

function Currency({ amount }) {
  return <span>{amount === 0 ? "Free" : `$${amount}`}</span>;
}

export default function Plans() {
  const navigate = useNavigate();

  const [billingCycle, setBillingCycle] = useState("monthly");
  const [promoCode, setPromoCode] = useState("");
  const [appliedPromo, setAppliedPromo] = useState(null);
  const [seats, setSeats] = useState(1);
  const [showContactModal, setShowContactModal] = useState(false);
  const [currency, setCurrency] = useState("USD");

  /* ---------------- PLAN CONFIG ---------------- */

  const plans = [
    {
      id: "free",
      name: "Free",
      badge: "For individuals",
      price: { monthly: 0, yearly: 0 },
      limits: ["50 checks / day", "Basic credibility model"],
      features: [
        "Instant credibility score",
        "Basic language analysis",
        "Mobile & desktop access",
        "Community support",
      ],
      cta: { label: "Start Free", action: () => navigate("/detector") },
    },
    {
      id: "pro",
      name: "Pro",
      badge: "Most Popular",
      price: { monthly: 19, yearly: 190 },
      limits: ["10,000 checks / month", "History & exports enabled"],
      features: [
        "Advanced AI credibility models",
        "Explainable AI breakdown",
        "Verification history & CSV export",
        "Priority email support",
        "SDKs (JavaScript & Python)",
        "Sandbox API access",
      ],
      cta: { label: "Upgrade to Pro", action: () => navigate("/signup?plan=pro") },
    },
    {
      id: "enterprise",
      name: "Enterprise",
      badge: "Custom",
      price: { monthly: 499, yearly: 4990 },
      limits: ["Unlimited checks", "Dedicated SLAs"],
      features: [
        "Everything in Pro",
        "SSO (SAML / OAuth2)",
        "Private cloud or on-prem deployment",
        "Audit logs & compliance (SOC2 / ISO)",
        "Role-based access control (RBAC)",
        "Webhooks & SIEM integrations",
        "Dedicated account manager",
      ],
      cta: { label: "Contact Sales", action: () => setShowContactModal(true) },
    },
  ];

  /* ---------------- PRICING LOGIC ---------------- */

  const applyPromo = () => {
    if (!promoCode) return;

    if (promoCode.toUpperCase() === "LAUNCH20") {
      setAppliedPromo({ type: "percent", value: 20, label: "20% off (first year)" });
      alert("Promo applied: 20% off");
    } else {
      alert("Invalid promo code (demo).");
      setAppliedPromo(null);
    }
  };

  const computePrice = (plan) => {
    let price = plan.price[billingCycle];

    if (plan.id === "pro" && seats > 1) price += (seats - 1) * 8;
    if (plan.id === "enterprise" && seats > 1) price += (seats - 1) * 15;

    if (billingCycle === "yearly") price = Math.round(price * 0.83);
    if (appliedPromo?.type === "percent") {
      price = Math.round(price * (1 - appliedPromo.value / 100));
    }

    return price;
  };

  /* ================= UI ================= */

  return (
    <main className="plans-main max-w-6xl mx-auto p-6">

      {/* ================= HERO ================= */}
      <header className="plans-hero mb-8">
        <h1 className="text-3xl font-bold">Plans & Pricing</h1>
        <p className="text-gray-600 max-w-2xl">
          Transparent pricing designed for individuals, teams, and enterprises
          deploying AI-powered news credibility verification at scale.
        </p>

        <div className="mt-5 flex flex-wrap items-center gap-4">
          <div className="pricing-toggle">
            <button onClick={() => setBillingCycle("monthly")} className={billingCycle === "monthly" ? "active" : ""}>
              Monthly
            </button>
            <button onClick={() => setBillingCycle("yearly")} className={billingCycle === "yearly" ? "active" : ""}>
              Yearly (Save ~17%)
            </button>
          </div>

          <div className="flex items-center gap-2">
            <label className="text-sm">Seats</label>
            <input type="number" min={1} value={seats} onChange={(e) => setSeats(+e.target.value)} />
          </div>

          <div className="flex items-center gap-2 ml-auto">
            <label className="text-sm">Currency</label>
            <select value={currency} onChange={(e) => setCurrency(e.target.value)}>
              <option>USD</option>
              <option>EUR</option>
              <option>INR</option>
            </select>
          </div>
        </div>

        <div className="mt-4 flex items-center gap-2">
          <input placeholder="Promo code" value={promoCode} onChange={(e) => setPromoCode(e.target.value)} />
          <button onClick={applyPromo}>Apply</button>
          {appliedPromo && <span className="text-green-600 text-sm">{appliedPromo.label}</span>}
        </div>
      </header>

      {/* ================= PLAN CARDS ================= */}
      <section className="plans-cards grid md:grid-cols-3 gap-6 mb-10">
        {plans.map((plan) => (
          <div key={plan.id} className={`plan-card ${plan.id === "pro" ? "featured" : ""}`}>
            <h3>{plan.name}</h3>
            <p className="badge">{plan.badge}</p>

            <div className="price">
              <Currency amount={computePrice(plan)} />
              <span className="cycle">/ {billingCycle}</span>
            </div>

            <div className="limits">
              {plan.limits.map((l, i) => <div key={i}>{l}</div>)}
            </div>

            <ul>
              {plan.features.map((f, i) => <li key={i}>{f}</li>)}
            </ul>

            <button className="primary" onClick={plan.cta.action}>
              {plan.cta.label}
            </button>

            <p className="security-note">
              Security: TLS 1.2+, AES-256 at rest
            </p>
          </div>
        ))}
      </section>

      {/* ================= CTA ================= */}
      <section className="billing-cta">
        <h3>Need a custom plan or enterprise demo?</h3>
        <p>
          Speak with our sales team about volume pricing, compliance,
          private deployments, or SLAs.
        </p>

        <div className="cta-actions">
          <button onClick={() => setShowContactModal(true)}>Contact Sales</button>
          <button onClick={() => navigate("/signup")}>Start Free Trial</button>
        </div>
      </section>

      {/* ================= CONTACT MODAL ================= */}
      {showContactModal && (
        <div className="modal-backdrop">
          <div className="modal">
            <h3>Contact Sales</h3>
            <p className="text-sm">
              Tell us about your organization and requirements.
            </p>

            <form onSubmit={(e) => { e.preventDefault(); alert("Request sent (demo)."); setShowContactModal(false); }}>
              <input required placeholder="Full name" />
              <input required type="email" placeholder="Work email" />
              <input placeholder="Company" />
              <textarea placeholder="Requirements" rows={4}></textarea>

              <div className="modal-actions">
                <button type="button" onClick={() => setShowContactModal(false)}>Cancel</button>
                <button type="submit">Submit</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </main>
  );
}
