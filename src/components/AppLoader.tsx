// src/components/AppLoader.tsx
import React from 'react';
import logo from '../assets/images/sprint-logo.png'; // adjust path as needed
import '../assets/css/AppLoader.css';

const AppLoader: React.FC = () => {
  return (
    <div className="app-loader" aria-label="Loading Sprint">
      <div className="app-loader-inner">
        {/* Logo image */}
        <div className="al-logo-row">
          <img src={logo} alt="Sprint Logo" className="al-logo-image" />
        </div>

        {/* Progress bar */}
        <div className="al-bar-track">
          <div className="al-bar-fill" />
        </div>
      </div>
    </div>
  );
};

export default AppLoader;