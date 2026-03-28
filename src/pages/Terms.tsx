import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import '../assets/css/LegalPages.css';

const Terms: React.FC = () => {
  return (
    <>
      <Header />
      <main className="legal-page">
        <div className="legal-container">
          <h1>Terms of Use</h1>
          <p className="last-updated">Effective: March 27, 2025</p>

          <section>
            <h2>1. Acceptance of Terms</h2>
            <p>By accessing or using Sprint Logistics ("Sprint", "we", "us"), you agree to be bound by these Terms of Use. If you do not agree, please do not use our services.</p>
          </section>

          <section>
            <h2>2. Use of Services</h2>
            <p>You must be at least 18 years old to use our services. You agree to provide accurate information and to use the services only for lawful purposes.</p>
          </section>

          <section>
            <h2>3. Orders and Payments</h2>
            <p>When you place an order, you agree to pay all fees associated with the delivery. Payments are processed securely through third‑party providers.</p>
          </section>

          <section>
            <h2>4. Courier Responsibilities</h2>
            <p>Couriers are independent contractors. Sprint does not control their conduct. Users are responsible for ensuring safe and lawful delivery of packages.</p>
          </section>

          <section>
            <h2>5. Prohibited Items</h2>
            <p>You may not use our services to transport illegal, hazardous, or prohibited items. Sprint reserves the right to refuse any shipment.</p>
          </section>

          <section>
            <h2>6. Limitation of Liability</h2>
            <p>To the maximum extent permitted by law, Sprint shall not be liable for any indirect, incidental, or consequential damages arising from your use of our services.</p>
          </section>

          <section>
            <h2>7. Governing Law</h2>
            <p>These terms shall be governed by the laws of the Federal Republic of Nigeria.</p>
          </section>

          <section>
            <h2>8. Contact</h2>
            <p>Questions? Contact us at <a href="mailto:legal@sprint.com">legal@sprint.com</a>.</p>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Terms;