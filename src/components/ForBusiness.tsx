// ForBusiness.tsx (section version – no Header/Footer)
import React from 'react';
import '../assets/css/ForBusiness.css'; // ✅ fixed path (added missing slash)

import dashboardMock from '../assets/images/dashboard-mock.png';

const ForBusiness: React.FC = () => {
  return (
    <section className="business-section">
      <div className="business-hero">
        <div className="business-container">
          <div className="business-text">
            <span className="business-badge">For Enterprises</span>
            <h1 className="business-title">
              Scale your logistics with <span className="gold-text">Sprint for Business</span>
            </h1>
            <p className="business-desc">
              Dedicated account manager, bulk shipping discounts, and a powerful API to
              integrate logistics into your own platform.
            </p>
            <button className="business-cta">Contact Sales →</button>
          </div>
          <div className="business-preview">
            <img src={dashboardMock} alt="Dashboard preview" />
            <div className="preview-glow"></div>
          </div>
        </div>
        <div className="features-row">
          <div className="feature-b2b">
            <span>📦</span> Bulk orders
          </div>
          <div className="feature-b2b">
            <span>📊</span> Analytics & reports
          </div>
          <div className="feature-b2b">
            <span>🔌</span> REST API
          </div>
          <div className="feature-b2b">
            <span>🛡️</span> SLA guarantee
          </div>
        </div>
      </div>
    </section>
  );
};

export default ForBusiness;