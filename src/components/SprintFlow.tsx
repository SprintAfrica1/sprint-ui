// SprintFlow.tsx (section version – no Header/Footer)
import React from 'react';
import '../assets/css/SprintFlow.css';

// Optional: If you have the background image, keep it, otherwise comment it out
// import flowBg from '../assets/images/flow-bg.png';

const SprintFlow: React.FC = () => {
  return (
    <section className="sprint-flow-section">
      <div className="flow-hero">
        <div 
          className="flow-bg-layer" 
          style={{ 
            // Replace with your actual image or remove this line to use CSS background
            backgroundImage: `url(https://via.placeholder.com/1920x1080/0a0f1a/ffd700?text=Flow+BG)`,
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }} 
        />
        <div className="flow-overlay" />

        <div className="flow-container">
          <div className="flow-header">
            <span className="flow-badge">Live Network</span>
            <h1 className="flow-title">
              Real‑time <span className="gold-text">Logistics Flow</span>
            </h1>
            <p className="flow-description">
              Watch deliveries move across the continent in real time. Every node pulses,
              every route tells a story of speed and precision.
            </p>
          </div>

          <div className="flow-network">
            {/* Animated nodes – using simple divs instead of images */}
            <div className="node node-1">
              <div className="node-icon">🚚</div>
              <span className="pulse-ring"></span>
            </div>
            <div className="node node-2">
              <div className="node-icon">📦</div>
              <span className="pulse-ring"></span>
            </div>
            <div className="node node-3">
              <div className="node-icon">📍</div>
              <span className="pulse-ring"></span>
            </div>
            <div className="node node-4">
              <div className="node-icon">⚡</div>
              <span className="pulse-ring"></span>
            </div>
            <div className="node node-5">
              <div className="node-icon">🌍</div>
              <span className="pulse-ring"></span>
            </div>

            {/* Animated flow lines */}
            <svg className="flow-svg" viewBox="0 0 800 400">
              <defs>
                <linearGradient id="flowGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#ffd700" stopOpacity="0" />
                  <stop offset="50%" stopColor="#ffd700" stopOpacity="0.8" />
                  <stop offset="100%" stopColor="#ffd700" stopOpacity="0" />
                </linearGradient>
              </defs>
              <path d="M120,120 L280,200 L450,150 L620,260" stroke="url(#flowGrad)" strokeWidth="3" fill="none" strokeDasharray="5,5">
                <animate attributeName="stroke-dashoffset" from="0" to="100" dur="8s" repeatCount="indefinite" />
              </path>
              <path d="M200,300 L380,280 L560,320 L720,280" stroke="url(#flowGrad)" strokeWidth="3" fill="none" strokeDasharray="5,5">
                <animate attributeName="stroke-dashoffset" from="100" to="0" dur="6s" repeatCount="indefinite" />
              </path>
            </svg>
          </div>

          <div className="flow-stats">
            <div className="stat">
              <span className="stat-value">2.3K</span>
              <span className="stat-label">Active deliveries</span>
            </div>
            <div className="stat">
              <span className="stat-value">47ms</span>
              <span className="stat-label">Avg. latency</span>
            </div>
            <div className="stat">
              <span className="stat-value">98.6%</span>
              <span className="stat-label">On‑time rate</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SprintFlow;