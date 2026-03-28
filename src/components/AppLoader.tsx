// src/components/AppLoader.tsx
import React from 'react';
import '../assets/css/AppLoader.css';

const AppLoader: React.FC = () => {
  return (
    <div className="app-loader" aria-label="Loading Sprint">
      <div className="app-loader-inner">

        {/* ── Logo: icon + wordmark, mirrors header design ── */}
        <div className="al-logo-row">

          {/* The S-curve icon mark */}
          <div className="al-icon-wrap">
            <svg
              width="44"
              height="44"
              viewBox="0 0 110 100"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="al-svg"
            >
              {/* Gold S-curve base stroke */}
              <path
                d="M92 18 H32 C12 18 12 42 34 48 H78 C94 48 94 78 68 82 H15"
                stroke="#ffd700"
                strokeWidth="11"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              {/* White dashed overlay for HD depth */}
              <path
                d="M92 18 H32 C12 18 12 42 34 48 H78 C94 48 94 78 68 82 H15"
                stroke="rgba(255,255,255,0.18)"
                strokeWidth="2.2"
                strokeDasharray="6 8"
                strokeLinecap="round"
              />
              {/* Right arrowhead */}
              <path d="M98 18 L86 9 V27 L98 18Z" fill="#ffd700" />
              {/* Left arrowhead */}
              <path d="M10 82 L22 73 V91 L10 82Z" fill="#ffd700" />
            </svg>
          </div>

          {/* Wordmark + tagline — exactly as header */}
          <div className="al-text-group">
            <span className="al-wordmark">SPRINT</span>
            <span className="al-tagline">Logistics · Nigeria</span>
          </div>

        </div>

        {/* ── Progress bar ── */}
        <div className="al-bar-track">
          <div className="al-bar-fill" />
        </div>

      </div>
    </div>
  );
};

export default AppLoader;