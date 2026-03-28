// src/components/Velocity.tsx
import React, { useEffect, useRef } from 'react';
import '../assets/css/Velocity.css';

const Velocity: React.FC = () => {
  const countRefs = useRef<(HTMLSpanElement | null)[]>([]);

  useEffect(() => {
    const counters = countRefs.current;
    // New realistic & impressive targets
    const targets = [8, 98.7, 247, 99.99];
    const duration = 2000; // 2 seconds animation
    const stepTime = 20;

    counters.forEach((counter, idx) => {
      if (!counter) return;

      const end = targets[idx];
      const steps = duration / stepTime;
      const increment = end / steps;
      let current = 0;

      const updateCounter = () => {
        current += increment;

        if (current >= end) {
          if (idx === 1 || idx === 3) {
            // For percentages
            counter.innerText = end.toFixed(2) + '%';
          } else if (idx === 0) {
            // Minutes
            counter.innerText = Math.floor(end).toString();
          } else {
            // Cities (whole number)
            counter.innerText = Math.floor(end).toString();
          }
          return;
        }

        if (idx === 1 || idx === 3) {
          counter.innerText = current.toFixed(1) + '%';
        } else {
          counter.innerText = Math.floor(current).toString();
        }

        setTimeout(updateCounter, stepTime);
      };

      updateCounter();
    });
  }, []);

  return (
    <section className="velocity-section">
      <div className="velocity-hero">
        <div className="velocity-overlay" />

        <div className="velocity-container">
          <h1 className="velocity-title">
            Speed <span className="gold-text">is Everything</span>
          </h1>
          <p className="velocity-sub">
            Our platform moves at the speed of your business. Lightning-fast deliveries, 
            real-time updates, and zero lag.
          </p>

          <div className="velocity-stats-grid">
            <div className="stat-card">
              <div className="stat-icon">⚡</div>
              <span
                className="stat-number"
                ref={(el) => { countRefs.current[0] = el; }}
              >
                0
              </span>
              <span className="stat-desc">minutes avg. dispatch</span>
            </div>

            <div className="stat-card">
              <div className="stat-icon">🎯</div>
              <span
                className="stat-number"
                ref={(el) => { countRefs.current[1] = el; }}
              >
                0
              </span>
              <span className="stat-desc">on-time success rate</span>
            </div>

            <div className="stat-card">
              <div className="stat-icon">🚚</div>
              <span
                className="stat-number"
                ref={(el) => { countRefs.current[2] = el; }}
              >
                0
              </span>
              <span className="stat-desc">cities covered</span>
            </div>

            <div className="stat-card">
              <div className="stat-icon">🔒</div>
              <span
                className="stat-number"
                ref={(el) => { countRefs.current[3] = el; }}
              >
                0
              </span>
              <span className="stat-desc">uptime reliability</span>
            </div>
          </div>

          {/* Speed Gauge */}
          <div className="speed-gauge">
            <div className="gauge-ring">
              <span className="gauge-value">1.2s</span>
              <span className="gauge-label">Average response time</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Velocity;