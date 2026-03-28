import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Zap, Shield, MapPin } from 'lucide-react';
import Tilt from 'react-parallax-tilt';
import heroImage from '../assets/images/hero-image.png';
import '../assets/css/hero.css';

/* ─── Inline SVG: Truck / Driver avatar ─── */
const DriverSVG: React.FC = () => (
  <svg
    width="26"
    height="26"
    viewBox="0 0 26 26"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    {/* Cab */}
    <rect x="1" y="10" width="15" height="10" rx="2" fill="#ffd700" fillOpacity="0.9" />
    {/* Cargo box */}
    <rect x="16" y="7" width="9" height="13" rx="2" fill="#ffd700" fillOpacity="0.55" />
    {/* Window */}
    <rect x="3" y="12" width="6" height="4" rx="1" fill="#000c1a" fillOpacity="0.55" />
    {/* Front wheel */}
    <circle cx="5"  cy="21.5" r="2.5" fill="#0d1e32" stroke="#ffd700" strokeWidth="1.2" />
    {/* Rear wheel */}
    <circle cx="17" cy="21.5" r="2.5" fill="#0d1e32" stroke="#ffd700" strokeWidth="1.2" />
    {/* Speed lines */}
    <line x1="0" y1="13.5" x2="0" y2="13.5" stroke="#ffd700" strokeOpacity="0" strokeWidth="1" />
  </svg>
);

/* ─── Inline SVG: Shield checkmark for security tag ─── */
const ShieldCheckSVG: React.FC = () => (
  <svg width="11" height="11" viewBox="0 0 12 14" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M6 1L11 3V7.5C11 10.2 8.8 12.6 6 13.4C3.2 12.6 1 10.2 1 7.5V3L6 1Z"
      fill="rgba(0,224,122,0.15)"
      stroke="#00e07a"
      strokeWidth="1.1"
    />
    <path d="M3.8 7L5.3 8.5L8.2 5.5" stroke="#00e07a" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const Hero: React.FC = () => {
  return (
    <section className="hero-section">

      {/* Background image */}
      <div
        className="hero-bg-layer"
        style={{ backgroundImage: `url(${heroImage})` }}
      />

      {/* Gradient overlay */}
      <div className="hero-mesh-overlay" />

      {/* Main content */}
      <div className="hero-container">
        <div className="hero-content-grid">

          {/* ══════════════════════
              LEFT — Text
          ══════════════════════ */}
          <motion.div
            className="hero-text-block"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, ease: 'easeOut' }}
          >
            <div className="hero-status-tag">
              <span className="status-pulse" />
              Inter-State Express Active
            </div>

            <h1 className="hero-main-title">
              Bridging the <br />
              <span className="text-glow">Nigerian Core</span>
            </h1>

            <p className="hero-description">
              From the ports of Lagos to the heart of Abuja — the fastest
              inter-state logistics infrastructure in Nigeria. Real-time
              tracking, zero border delays, and 100% door-to-door reliability.
            </p>

            <div className="hero-cta-group">
              <button className="btn-sprint-primary">
                Ship Across Nigeria <ArrowRight size={16} />
              </button>
              <button className="btn-sprint-glass">
                Check Rates
              </button>
            </div>

            <div className="hero-trust-badges">
              <div className="badge-item"><Zap size={14} /> Same-Day Terminal</div>
              <div className="badge-item"><Shield size={14} /> GIT Insurance</div>
              <div className="badge-item"><MapPin size={14} /> 36 States Covered</div>
            </div>
          </motion.div>

          {/* ══════════════════════
              RIGHT — Card
          ══════════════════════ */}
          <motion.div
            className="hero-visual-block"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, ease: 'easeOut', delay: 0.18 }}
          >
            <Tilt
              perspective={1600}
              glareEnable={true}
              glareMaxOpacity={0.1}
              glareBorderRadius="26px"
              scale={1.02}
              tiltMaxAngleX={8}
              tiltMaxAngleY={8}
              className="hero-3d-tilt"
            >
              <div className="delivery-glass-card">

                {/* Top: Driver info */}
                <div className="card-top">
                  <div className="driver-profile">
                    <div className="avatar-svg-wrap">
                      <DriverSVG />
                    </div>
                    <div>
                      <p className="name">Chukwudi Okonkwo</p>
                      <p className="rank">Elite Pilot · 4.9 ★</p>
                    </div>
                  </div>
                  <div className="live-pill">LIVE</div>
                </div>

                {/* Center: Route */}
                <div className="card-center">
                  <div className="route-visual">
                    <div className="dot start" />
                    <div className="route-dashed-line">
                      <motion.div
                        className="truck-icon"
                        animate={{ left: ['0%', '86%'] }}
                        transition={{
                          duration: 3.8,
                          repeat: Infinity,
                          ease: 'linear',
                          repeatType: 'loop',
                        }}
                      >
                        🚚
                      </motion.div>
                    </div>
                    <div className="dot end" />
                  </div>
                  <div className="route-info">
                    <span>Lagos · Ikeja</span>
                    <span>Abuja · Garki</span>
                  </div>
                </div>

                <div className="card-divider" />

                {/* Bottom: ETA + Security */}
                <div className="card-bottom">
                  <div className="eta-block">
                    <small>Real-Time ETA</small>
                    <p>Tomorrow · 09:00 AM</p>
                  </div>
                  <div className="security-tag">
                    <ShieldCheckSVG />
                    Verified Secure
                  </div>
                </div>

              </div>
            </Tilt>
          </motion.div>

        </div>
      </div>

    </section>
  );
};

export default Hero;