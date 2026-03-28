// src/components/TrustLayer.tsx
import React from 'react';
import '../assets/css/TrustLayer.css';

const TrustLayer: React.FC = () => {
  return (
    <section className="trust-section">
      <div className="trust-hero">
        <div className="trust-container">
          <h1 className="trust-title">
            Built on <span className="gold-text">Trust</span>
          </h1>
          <p className="trust-desc">
            Your security is our priority. Every ride is tracked, every driver verified,
            every package insured.
          </p>

          <div className="trust-grid">
            <div className="trust-card">
              <div className="trust-icon">🛡️</div>
              <h3>Verified Riders</h3>
              <p>Background checks, training, and real‑time ID verification.</p>
            </div>

            <div className="trust-card">
              <div className="trust-icon">🔐</div>
              <h3>End‑to‑end Encryption</h3>
              <p>Your data and communications are always protected.</p>
            </div>

            <div className="trust-card">
              <div className="trust-icon">💸</div>
              <h3>Delivery Guarantee</h3>
              <p>100% coverage for loss or damage – no questions asked.</p>
            </div>

            <div className="trust-card">
              <div className="trust-icon">👮</div>
              <h3>24/7 Safety Team</h3>
              <p>Human support always available for emergencies.</p>
            </div>
          </div>

          <div className="trust-badge-row">
            <span>ISO 27001 Certified</span>
            <span>GDPR Compliant</span>
            <span>PCI DSS Level 1</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrustLayer;