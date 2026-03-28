import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import '../assets/css/LegalPages.css';

const Security: React.FC = () => {
  return (
    <>
      <Header />
      <main className="legal-page">
        <div className="legal-container">
          <h1>Security at Sprint</h1>
          <p className="last-updated">Your safety is our priority.</p>

          <section>
            <h2>Secure Transactions</h2>
            <p>All payments are processed using industry‑standard encryption (SSL/TLS). We never store your full card details on our servers.</p>
          </section>

          <section>
            <h2>Account Protection</h2>
            <p>We encourage strong passwords and two‑factor authentication (2FA) for added security. You can enable 2FA in your account settings.</p>
          </section>

          <section>
            <h2>Data Encryption</h2>
            <p>Your personal data is encrypted both in transit and at rest. We regularly review our security practices to stay ahead of threats.</p>
          </section>

          <section>
            <h2>Monitoring & Alerts</h2>
            <p>Our systems continuously monitor for suspicious activity. If we detect unusual login attempts, we will notify you immediately.</p>
          </section>

          <section>
            <h2>Reporting Vulnerabilities</h2>
            <p>If you discover a security vulnerability, please responsibly disclose it to <a href="mailto:security@sprint.com">security@sprint.com</a>. We will acknowledge your report and work to fix it.</p>
          </section>

          <section>
            <h2>Best Practices for Users</h2>
            <ul>
              <li>Use a unique password for your Sprint account.</li>
              <li>Never share your login credentials.</li>
              <li>Verify the authenticity of any communication claiming to be from Sprint.</li>
              <li>Keep your contact information updated for account recovery.</li>
            </ul>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Security;