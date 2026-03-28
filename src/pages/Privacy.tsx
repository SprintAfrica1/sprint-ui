import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import '../assets/css/LegalPages.css';

const Privacy: React.FC = () => {
  return (
    <>
      <Header />
      <main className="legal-page">
        <div className="legal-container">
          <h1>Privacy Policy</h1>
          <p className="last-updated">Last updated: March 27, 2025</p>

          <section>
            <h2>1. Information We Collect</h2>
            <p>We collect personal information that you provide to us, such as name, email address, phone number, and payment details when you create an account, place an order, or contact us. We also automatically collect usage data and device information.</p>
          </section>

          <section>
            <h2>2. How We Use Your Information</h2>
            <p>We use your information to provide, maintain, and improve our services; to process transactions; to communicate with you; and to ensure security and prevent fraud.</p>
          </section>

          <section>
            <h2>3. Sharing Your Information</h2>
            <p>We do not sell your personal data. We may share information with service providers, delivery partners, or as required by law.</p>
          </section>

          <section>
            <h2>4. Data Security</h2>
            <p>We implement industry‑standard security measures to protect your data. However, no method of transmission over the internet is 100% secure.</p>
          </section>

          <section>
            <h2>5. Your Rights</h2>
            <p>You have the right to access, correct, or delete your personal information. Contact us at privacy@sprint.com for assistance.</p>
          </section>

          <section>
            <h2>6. Changes to This Policy</h2>
            <p>We may update this policy from time to time. We will notify you of any material changes via email or a notice on our website.</p>
          </section>

          <section>
            <h2>7. Contact Us</h2>
            <p>If you have questions about this Privacy Policy, please contact us at: <a href="mailto:privacy@sprint.com">privacy@sprint.com</a></p>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Privacy;