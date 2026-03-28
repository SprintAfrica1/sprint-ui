// src/components/Coverage.tsx
import React from 'react';
import '../assets/css/Coverage.css';

import mapBg from '../assets/images/africa-map.png';

const Coverage: React.FC = () => {
  return (
    <section className="coverage-section">
      <div className="coverage-hero">
        <div 
          className="coverage-bg" 
          style={{ backgroundImage: `url(${mapBg})` }} 
        />

        <div className="coverage-container">
          {/* Text Side */}
          <div className="coverage-text">
            <h1 className="coverage-title">
              Covering All of <span className="gold-text">Nigeria</span>
            </h1>
            <p className="coverage-desc">
              Sprint operates across all 36 states and the Federal Capital Territory. 
              Fast, reliable delivery from the busiest cities to the most remote communities.
            </p>

            <div className="city-list">
              <span>Lagos</span>
              <span>Abuja</span>
              <span>Port Harcourt</span>
              <span>Kano</span>
              <span>Ibadan</span>
              <span>Enugu</span>
              <span>Maiduguri</span>
              <span>Benin City</span>
              <span>Jos</span>
              <span>Calabar</span>
              <span>Ilorin</span>
              <span>Aba</span>
            </div>
          </div>

          {/* Real Google Map */}
          <div className="coverage-map">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3150000!2d5.5!3d9.5!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x104e0b5b5b5b5b5b%3A0x5b5b5b5b5b5b5b5b!2sNigeria!5e0!3m2!1sen!2sng!4v1700000000000"
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Sprint Coverage Across Nigeria"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Coverage;