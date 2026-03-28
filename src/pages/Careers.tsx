import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import '../assets/css/LegalPages.css';

const Careers: React.FC = () => {
  return (
    <>
      <Header />
      <main className="legal-page">
        <div className="legal-container">
          <h1>Join the Sprint Team</h1>
          <p className="last-updated">Build the future of African logistics with us.</p>

          <section>
            <h2>Why Work at Sprint?</h2>
            <p>At Sprint Logistics, we're transforming the way goods move across Africa. We're a fast‑growing company with a mission to connect people and businesses through seamless delivery services. Join us and be part of a team that values innovation, integrity, and impact.</p>
          </section>

          <section>
            <h2>Open Positions</h2>
            <ul>
              <li><strong>Senior Full‑Stack Developer</strong> – Lagos (Remote/Hybrid)</li>
              <li><strong>Logistics Operations Manager</strong> – Lagos</li>
              <li><strong>Customer Support Specialist</strong> – Lagos</li>
              <li><strong>Courier Partner – Independent Contractor</strong> – Nationwide</li>
            </ul>
            <p>Interested? Send your CV to <a href="mailto:careers@sprint.africa">careers@sprint.africa</a> with the role in the subject line.</p>
          </section>

          <section>
            <h2>Our Culture</h2>
            <p>We believe in empowering our team with autonomy, continuous learning, and a supportive environment. We celebrate diversity and are committed to creating an inclusive workplace for everyone.</p>
          </section>

          <section>
            <h2>Benefits</h2>
            <ul>
              <li>Competitive salary & performance bonuses</li>
              <li>Flexible work arrangements</li>
              <li>Professional development budget</li>
              <li>Health insurance for full‑time employees</li>
            </ul>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Careers;