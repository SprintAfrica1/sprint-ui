// src/pages/ForCouriers.tsx
import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import couriersImage from '../assets/images/couriers-image.png';
import '../assets/css/ForCouriers.css';

const ForCouriers: React.FC = () => {
  const perks = [
    { icon: '💸', title: 'Earn On Your Terms', desc: 'Withdraw daily. No monthly hold. Your money moves when you move.' },
    { icon: '📱', title: 'Rider App', desc: 'See orders near you, accept in one tap, navigate with built-in maps.' },
    { icon: '🛡️', title: 'Insured Deliveries', desc: 'Every delivery you take is covered. Ride with confidence.' },
    { icon: '⚡', title: 'Instant Payouts', desc: 'Earnings hit your account within minutes of delivery confirmation.' },
    { icon: '🎯', title: 'Bonuses & Streaks', desc: 'Hit daily delivery targets and unlock bonus multipliers on your pay.' },
    { icon: '🤝', title: 'Dedicated Support', desc: 'A Sprint support team available 7 days a week just for riders.' },
  ];

  const steps = [
    { n: '01', title: 'Apply Online', desc: 'Fill a quick form. Takes less than 5 minutes.' },
    { n: '02', title: 'Verification', desc: 'We verify your ID and bike documents. Usually same day.' },
    { n: '03', title: 'Training', desc: 'Short online onboarding — safety, app use, and best practices.' },
    { n: '04', title: 'Start Earning', desc: 'Go live on the app and start accepting deliveries immediately.' },
  ];

  return (
    <>
      <Header />
      <main className="couriers-page">

        {/* Hero */}
        <section className="cour-hero">
          <img src={couriersImage} alt="Become a Sprint Courier" className="cour-hero-image" />
          <div className="cour-hero-overlay" />
          <div className="cour-hero-content">
            <div className="cour-hero-badge">Now Recruiting</div>
            <h1 className="cour-hero-title">Ride. Earn.<br /><span>Be Sprint.</span></h1>
            <p className="cour-hero-sub">Join thousands of riders making real income delivering across Nigeria's fastest-growing cities.</p>
            <a href="/courier/signup" className="cour-hero-btn">Apply to Ride →</a>
          </div>
          <div className="cour-stat-strip">
            <div className="cour-stat"><span className="cour-stat-num">₦85k+</span><span className="cour-stat-label">Avg monthly earnings</span></div>
            <div className="cour-stat-divider" />
            <div className="cour-stat"><span className="cour-stat-num">4,200+</span><span className="cour-stat-label">Active riders</span></div>
            <div className="cour-stat-divider" />
            <div className="cour-stat"><span className="cour-stat-num">24hrs</span><span className="cour-stat-label">Avg onboarding time</span></div>
          </div>
        </section>

        {/* Perks */}
        <section className="cour-perks">
          <div className="cour-container">
            <div className="cour-section-head">
              <h2>Why riders choose Sprint</h2>
              <p>We built our platform around you — not the other way around.</p>
            </div>
            <div className="cour-perks-grid">
              {perks.map((p, i) => (
                <div className="cour-perk-card" key={i} style={{ animationDelay: `${i * 0.1}s` }}>
                  <span className="cour-perk-icon">{p.icon}</span>
                  <h3>{p.title}</h3>
                  <p>{p.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* How to Join */}
        <section className="cour-join">
          <div className="cour-container">
            <div className="cour-section-head light">
              <h2>How to join the fleet</h2>
              <p>Simple, fast, and completely online.</p>
            </div>
            <div className="cour-steps">
              {steps.map((s, i) => (
                <div className="cour-step" key={i} style={{ animationDelay: `${i * 0.12}s` }}>
                  <div className="cour-step-num">{s.n}</div>
                  <div className="cour-step-body">
                    <h3>{s.title}</h3>
                    <p>{s.desc}</p>
                  </div>
                  {i < steps.length - 1 && <div className="cour-step-connector" />}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Requirements */}
        <section className="cour-requirements">
          <div className="cour-container">
            <div className="cour-req-inner">
              <div className="cour-req-text">
                <h2>What you need to get started</h2>
                <p>No complicated requirements. If you have a bike and the drive to earn, you qualify.</p>
              </div>
              <div className="cour-req-list">
                {[
                  'Valid government-issued ID',
                  'Motorcycle (any CC) or bicycle',
                  'Smartphone (Android or iOS)',
                  'Nigerian bank account',
                  'Proof of vehicle ownership',
                  'Clear criminal record',
                ].map((item, i) => (
                  <div className="cour-req-item" key={i}>
                    <span className="cour-req-check">✓</span>
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="cour-cta">
          <div className="cour-container">
            <h2>Ready to ride with us?</h2>
            <p>Applications are open now. Join Nigeria's fastest-growing delivery fleet.</p>
            <a href="/courier/signup" className="cour-cta-btn">Apply Now — It's Free</a>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
};

export default ForCouriers;