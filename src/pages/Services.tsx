// src/pages/Services.tsx
import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import servicesImage from '../assets/images/services-image.png';
import '../assets/css/Services.css';

const Services: React.FC = () => {
  const services = [
    {
      icon: '🏍️',
      title: 'Same-Day Dispatch',
      tag: 'Most Popular',
      desc: 'Door-to-door delivery within hours. Perfect for urgent packages, documents, and everyday essentials across the city.',
      detail: 'Available 6AM – 10PM daily',
    },
    {
      icon: '📦',
      title: 'Bulk & Business',
      tag: 'For Businesses',
      desc: 'Scale your operations with dedicated riders for high-volume deliveries. Custom pricing, invoicing, and fleet allocation.',
      detail: 'Custom SLA agreements',
    },
    {
      icon: '🔒',
      title: 'Secured Haulage',
      tag: 'Premium',
      desc: 'High-value items demand extra care. Insured delivery with real-time photo confirmation and sealed packaging.',
      detail: 'Insurance up to ₦500,000',
    },
    {
      icon: '🗓️',
      title: 'Scheduled Delivery',
      tag: 'Pre-book',
      desc: 'Plan ahead. Schedule pickups and deliveries up to 7 days in advance for events, offices, and recurring needs.',
      detail: 'Recurring plans available',
    },
  ];

  return (
    <>
      <Header />
      <main className="services-page">

        {/* Hero */}
        <section className="srv-hero">
          <img src={servicesImage} alt="Sprint Services" className="srv-hero-image" />
          <div className="srv-hero-overlay" />
          <div className="srv-hero-content">
            <span className="srv-hero-label">What We Offer</span>
            <h1 className="srv-hero-title">Every delivery.<br />Every need. Covered.</h1>
            <p className="srv-hero-sub">Six tailored services built for how Nigerians actually live, shop, and do business.</p>
          </div>
          <div className="srv-hero-scroll-hint">
            <span />
          </div>
        </section>

        {/* Services Grid */}
        <section className="srv-grid-section">
          <div className="srv-container">
            <div className="srv-grid">
              {services.map((s, i) => (
                <div className="srv-card" key={i} style={{ animationDelay: `${i * 0.1}s` }}>
                  <div className="srv-card-top">
                    <span className="srv-icon">{s.icon}</span>
                    <span className="srv-tag">{s.tag}</span>
                  </div>
                  <h3>{s.title}</h3>
                  <p>{s.desc}</p>
                  <div className="srv-card-footer">
                    <span className="srv-detail">→ {s.detail}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* How Pricing Works */}
        <section className="srv-pricing-band">
          <div className="srv-container">
            <div className="srv-pricing-inner">
              <div className="srv-pricing-text">
                <h2>Fair pricing.<br />No surprises.</h2>
                <p>Pricing is calculated by distance, package size, and time of day. You always see the full amount before you confirm.</p>
                <ul className="srv-pricing-list">
                  <li><span className="bullet" />Base fare from ₦500</li>
                  <li><span className="bullet" />Per-km rate clearly shown</li>
                  <li><span className="bullet" />Night surcharge disclosed upfront</li>
                  <li><span className="bullet" />Business accounts get monthly billing</li>
                </ul>
              </div>
              <div className="srv-pricing-card">
                <div className="srv-price-example">
                  <div className="srv-price-row">
                    <span>Base Fare</span><span>₦500</span>
                  </div>
                  <div className="srv-price-row">
                    <span>Distance (8km)</span><span>₦640</span>
                  </div>
                  <div className="srv-price-row">
                    <span>Service Fee</span><span>₦100</span>
                  </div>
                  <div className="srv-price-divider" />
                  <div className="srv-price-row total">
                    <span>Total</span><span>₦1,240</span>
                  </div>
                </div>
                <p className="srv-price-note">Example: 8km same-day delivery, Lagos</p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="srv-cta">
          <div className="srv-container">
            <h2>Ready to send something?</h2>
            <p>Create an account in 60 seconds and make your first delivery today.</p>
            <a href="/signup" className="srv-cta-btn">Start Delivering →</a>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
};

export default Services;