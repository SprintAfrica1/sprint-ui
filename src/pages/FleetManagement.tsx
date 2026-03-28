import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import '../assets/css/LegalPages.css';

const FleetManagement: React.FC = () => {
  return (
    <>
      <Header />
      <main className="legal-page">
        <div className="legal-container">
          <h1>Fleet Management</h1>
          <p className="last-updated">Empowering our couriers with smart tools.</p>

          <section>
            <h2>Real‑Time Tracking</h2>
            <p>Our fleet management system provides live GPS tracking, route optimization, and estimated arrival times to ensure efficient deliveries.</p>
          </section>

          <section>
            <h2>Driver Dashboard</h2>
            <p>Couriers have access to a dedicated dashboard where they can view assigned deliveries, manage availability, and track earnings in real‑time.</p>
          </section>

          <section>
            <h2>Vehicle Maintenance</h2>
            <p>We partner with service centres to offer maintenance reminders and discounts to our courier partners, keeping the fleet in top condition.</p>
          </section>

          <section>
            <h2>Performance Analytics</h2>
            <p>Fleet managers can monitor key metrics such as on‑time delivery rates, fuel efficiency, and driver performance to optimize operations.</p>
          </section>

          <section>
            <h2>Join Our Fleet</h2>
            <p>Are you a driver interested in joining the Sprint fleet? <a href="/courier/signup">Apply today</a> and become part of a growing logistics network.</p>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default FleetManagement;