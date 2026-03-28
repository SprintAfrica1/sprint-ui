// src/pages/About.tsx
import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import aboutImage from '../assets/images/about-image.png';
import '../assets/css/About.css';

const About: React.FC = () => {
  const values = [
    { icon: '🏃', title: 'Speed Without Compromise', desc: 'We never sacrifice safety for speed. Both are non-negotiable at Sprint.' },
    { icon: '🤲', title: 'People First', desc: 'From riders to customers, every decision we make starts with how it affects real people.' },
    { icon: '🌍', title: 'Built for Nigeria', desc: 'We understand Lagos traffic, Abuja streets, and Port Harcourt rain. We were made here.' },
    { icon: '🔍', title: 'Radical Transparency', desc: 'No hidden charges, no vague statuses. We tell you exactly what is happening and when.' },
  ];

  const team = [
    { name: 'Emeka Obi', role: 'CEO & Co-founder', emoji: '👨🏾‍💼' },
    { name: 'Amaka Eze', role: 'Head of Operations', emoji: '👩🏾‍💼' },
    { name: 'Tunde Adeyemi', role: 'CTO', emoji: '👨🏾‍💻' },
    { name: 'Fatima Bello', role: 'Head of Rider Experience', emoji: '👩🏾‍🚀' },
  ];

  return (
    <>
      <Header />
      <main className="about-page">

        {/* Hero */}
        <section className="abt-hero">
          <img src={aboutImage} alt="About Sprint" className="abt-hero-image" />
          <div className="abt-hero-overlay" />
          <div className="abt-hero-content">
            <div className="abt-hero-eyebrow">Our Story</div>
            <h1 className="abt-hero-title">Moving Nigeria.<br />One delivery<br />at a time.</h1>
          </div>
          <div className="abt-hero-scroll-line">
            <div className="abt-scroll-progress" />
          </div>
        </section>

        {/* Origin Story */}
        <section className="abt-story">
          <div className="abt-container">
            <div className="abt-story-inner">
              <div className="abt-story-label">Founded 2022</div>
              <div className="abt-story-body">
                <h2>We started frustrated.</h2>
                <p>Sprint was born out of a Lagos traffic nightmare in 2022. Our co-founders — a designer and an engineer — were trying to send documents across the island and watched two hours disappear. The experience was chaotic, opaque, and stressful.</p>
                <p>They built the product they wished existed: fast, honest, and built specifically for how Nigerian cities actually work. What started as a weekend project became a mission.</p>
                <p>Today, Sprint operates in Lagos, Abuja, and Port Harcourt — with over 4,200 riders, thousands of daily deliveries, and a community that has made us one of Nigeria's most trusted logistics brands.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Numbers */}
        <section className="abt-numbers">
          <div className="abt-container">
            <div className="abt-numbers-grid">
              {[
                { num: '3', label: 'Cities active', sub: 'Lagos • Abuja • PH' },
                { num: '4,200+', label: 'Verified riders', sub: 'And growing daily' },
                { num: '850k+', label: 'Deliveries made', sub: 'Since January 2022' },
                { num: '4.8★', label: 'Average rating', sub: 'From 120k+ reviews' },
              ].map((n, i) => (
                <div className="abt-num-card" key={i} style={{ animationDelay: `${i * 0.12}s` }}>
                  <div className="abt-num">{n.num}</div>
                  <div className="abt-num-label">{n.label}</div>
                  <div className="abt-num-sub">{n.sub}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="abt-values">
          <div className="abt-container">
            <div className="abt-section-head">
              <h2>What we stand for</h2>
              <p>Four principles that guide every product decision, hire, and delivery we make.</p>
            </div>
            <div className="abt-values-grid">
              {values.map((v, i) => (
                <div className="abt-value-card" key={i} style={{ animationDelay: `${i * 0.11}s` }}>
                  <span className="abt-value-icon">{v.icon}</span>
                  <h3>{v.title}</h3>
                  <p>{v.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Team */}
        <section className="abt-team">
          <div className="abt-container">
            <div className="abt-section-head">
              <h2>The people building Sprint</h2>
              <p>A small, obsessive team from Lagos, Abuja, and beyond.</p>
            </div>
            <div className="abt-team-grid">
              {team.map((t, i) => (
                <div className="abt-team-card" key={i} style={{ animationDelay: `${i * 0.1}s` }}>
                  <div className="abt-team-avatar">{t.emoji}</div>
                  <div className="abt-team-info">
                    <strong>{t.name}</strong>
                    <span>{t.role}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="abt-cta">
          <div className="abt-container">
            <h2>Join the Sprint story.</h2>
            <p>Whether you're a customer, a rider, or a future team member — there's a place for you here.</p>
            <div className="abt-cta-btns">
              <a href="/signup" className="abt-btn-primary">Get Started</a>
              <a href="/courier-signup" className="abt-btn-secondary">Become a Rider</a>
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
};

export default About;