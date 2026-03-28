// src/components/Experience.tsx
import React from 'react';
import '../assets/css/Experience.css';

const Experience: React.FC = () => {
  return (
    <section className="exp-section">
      <div className="exp-hero">
        <div className="exp-container">
          <h1 className="exp-title">
            The <span className="gold-text">Sprint Experience</span>
          </h1>
          <p className="exp-sub">
            From request to delivery – a seamless journey designed for you.
          </p>

          <div className="journey-steps">
            <div className="step">
              <div className="step-media">🏍️</div>
              <div className="step-number">1</div>
              <h3>Request & Match</h3>
              <p>Your order is instantly matched with the nearest available rider.</p>
            </div>

            <div className="step-arrow">→</div>

            <div className="step">
              <div className="step-media">📦</div>
              <div className="step-number">2</div>
              <h3>Real‑time Tracking</h3>
              <p>Watch your package move on a live map with ETA updates.</p>
            </div>

            <div className="step-arrow">→</div>

            <div className="step">
              <div className="step-media">🙂</div>
              <div className="step-number">3</div>
              <h3>Safe Delivery</h3>
              <p>Receive a photo proof and digital signature confirmation.</p>
            </div>
          </div>

          <div className="testimonial">
            <div className="quote">
              “Sprint turned a stressful delivery into pure joy. 
              The tracking was spot‑on and the rider was super professional!”
            </div>
            <div className="author">– Adaobi, Lagos</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;