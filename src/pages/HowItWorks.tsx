// src/pages/HowItWorks.tsx
import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import howitworksImage from '../assets/images/howitswork-image.png';
import '../assets/css/HowItWorks.css';

const HowItWorks: React.FC = () => {
  return (
    <>
      <Header />
      <main className="how-it-works-page">

        {/* ── Hero ───────────────────────────────── */}
        <section className="hiw-hero">
          <img
            src={howitworksImage}
            alt="How Sprint Works"
            className="hero-image"
          />
          <div className="hero-overlay" />
          <div className="hero-content">
            <div className="hero-badge">Simple • Fast • Reliable</div>
            <h1 className="hero-title">
              How It <span>Works</span>
            </h1>
            <p className="hero-subtitle">
              From request to delivery in minutes. Experience seamless logistics across Nigeria.
            </p>
          </div>
        </section>

        {/* ── The Sprint Process ─────────────────── */}
        <section className="steps-section">
          <div className="container">
            <div className="section-header">
              <h2>The Sprint Process</h2>
              <p>Just 4 simple steps from order to delivery</p>
            </div>
            <div className="steps-grid">
              <div className="step-card">
                <div className="step-number">01</div>
                <span className="step-icon">📍</span>
                <h3>Place Your Order</h3>
                <p>Tell us what you need delivered, pickup location, and destination. Get instant pricing.</p>
              </div>
              <div className="step-card">
                <div className="step-number">02</div>
                <span className="step-icon">🔍</span>
                <h3>Smart Matching</h3>
                <p>Our system instantly finds the nearest verified rider. You get real-time confirmation.</p>
              </div>
              <div className="step-card">
                <div className="step-number">03</div>
                <span className="step-icon">🗺️</span>
                <h3>Live Tracking</h3>
                <p>Watch your package move live on the map with accurate ETA updates every step of the way.</p>
              </div>
              <div className="step-card">
                <div className="step-number">04</div>
                <span className="step-icon">✅</span>
                <h3>Secure Delivery</h3>
                <p>Rider arrives, you get photo proof + digital signature. Rate the experience instantly.</p>
              </div>
            </div>
          </div>
        </section>

        {/* ── Why Sprint ─────────────────────────── */}
        <section className="why-sprint">
          <div className="container">
            <div className="section-header">
              <h2>Why Choose Sprint</h2>
              <p>Built for Nigeria, designed for everyone</p>
            </div>
            <div className="why-grid">
              <div className="why-card">
                <span className="why-icon">⚡</span>
                <h3>Lightning Fast</h3>
                <p>Average dispatch in under 8 minutes across Lagos and growing cities.</p>
              </div>
              <div className="why-card">
                <span className="why-icon">🛡️</span>
                <h3>Fully Verified</h3>
                <p>Every rider goes through rigorous background checks and professional training.</p>
              </div>
              <div className="why-card">
                <span className="why-icon">💰</span>
                <h3>Transparent Pricing</h3>
                <p>No hidden fees. You see the exact price before confirming your order.</p>
              </div>
            </div>
          </div>
        </section>

        {/* ── CTA Banner ─────────────────────────── */}
        <section className="cta-banner">
          <div className="container">
            <h2>Ready to experience the difference?</h2>
            <p>Join thousands of happy customers using Sprint every day.</p>
            <a href="/signup" className="cta-button">Get Started Now →</a>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
};

export default HowItWorks;