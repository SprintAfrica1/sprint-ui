// Intelligence.tsx (section version – no Header/Footer)
import React from 'react';
import '../assets/css/Intelligence.css'; // ✅ fixed path

const Intelligence: React.FC = () => {
  return (
    <section className="intel-section">
      <div className="intel-hero">
        <div className="intel-grid-bg" />
        <div className="intel-container">
          <div className="intel-header">
            <span className="intel-tag">AI-Powered</span>
            <h1 className="intel-title">
              Intelligence that <span className="gold-text">learns</span>
            </h1>
            <p className="intel-desc">
              Our algorithm analyses traffic, weather, and historical data to choose the fastest
              route – every time.
            </p>
          </div>

          <div className="intel-visual">
            <div className="network-graph">
              <div className="node n1"></div><div className="node n2"></div><div className="node n3"></div>
              <div className="node n4"></div><div className="node n5"></div><div className="node n6"></div>
              <svg className="graph-edges">
                <line x1="20%" y1="30%" x2="45%" y2="55%" stroke="#ffd700" strokeWidth="2" strokeDasharray="4" />
                <line x1="45%" y1="55%" x2="70%" y2="40%" stroke="#ffd700" strokeWidth="2" strokeDasharray="4" />
                <line x1="70%" y1="40%" x2="85%" y2="65%" stroke="#ffd700" strokeWidth="2" strokeDasharray="4" />
                <line x1="45%" y1="55%" x2="60%" y2="80%" stroke="#ffd700" strokeWidth="2" strokeDasharray="4" />
              </svg>
              <div className="data-particle p1"></div>
              <div className="data-particle p2"></div>
              <div className="data-particle p3"></div>
            </div>
          </div>

          <div className="intel-features">
            <div className="feature-card">
              <div className="feature-icon">📊</div>
              <h3>Predictive ETAs</h3>
              <p>Up to 95% accuracy, even during peak hours.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🔄</div>
              <h3>Dynamic Rerouting</h3>
              <p>Automatically adjusts to new obstacles.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🧠</div>
              <h3>Self‑improving</h3>
              <p>Learns from millions of deliveries daily.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Intelligence;