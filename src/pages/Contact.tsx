// src/pages/Contact.tsx
import React, { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import contactImage from '../assets/images/contact-image.png';
import '../assets/css/Contact.css';

/* ── Channel SVG Icons ─────────────────────── */
const EmailIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="2" y="4" width="20" height="16" rx="3" stroke="#ffd700" strokeWidth="1.7" />
    <path d="M2 8l10 7 10-7" stroke="#ffd700" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const PhoneIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M5.4 2.1A1 1 0 004 2.5L2.3 6.1C1.6 7.6 2 9.4 3.3 10.7l10 10c1.3 1.3 3.1 1.7 4.6 1l3.6-1.7a1 1 0 00.4-1.4l-2-3.5a1 1 0 00-1.2-.4l-2.5 1a1 1 0 01-1-.2L7.5 8.3a1 1 0 01-.2-1l1-2.5a1 1 0 00-.4-1.3L5.4 2.1z" stroke="#ffd700" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const ChatIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2v10z" stroke="#ffd700" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M8 10h.01M12 10h.01M16 10h.01" stroke="#ffd700" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

const LocationIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" stroke="#ffd700" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
    <circle cx="12" cy="9" r="2.5" stroke="#ffd700" strokeWidth="1.7" />
  </svg>
);

/* ── FAQ Icons ─────────────────────────────── */
const TrackIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
    <circle cx="12" cy="12" r="3" stroke="#ffd700" strokeWidth="1.7" />
    <path d="M12 2v3M12 19v3M2 12h3M19 12h3" stroke="#ffd700" strokeWidth="1.7" strokeLinecap="round" />
    <path d="M5.6 5.6l2.1 2.1M16.3 16.3l2.1 2.1M5.6 18.4l2.1-2.1M16.3 7.7l2.1-2.1" stroke="#ffd700" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

const RiderIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
    <circle cx="12" cy="7" r="3" stroke="#ffd700" strokeWidth="1.7" />
    <path d="M5 21v-2a7 7 0 0114 0v2" stroke="#ffd700" strokeWidth="1.7" strokeLinecap="round" />
    <path d="M18 13l2 2-2 2" stroke="#ffd700" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const CancelIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
    <circle cx="12" cy="12" r="9" stroke="#ffd700" strokeWidth="1.7" />
    <path d="M15 9l-6 6M9 9l6 6" stroke="#ffd700" strokeWidth="1.7" strokeLinecap="round" />
  </svg>
);

const PartnerIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
    <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" stroke="#ffd700" strokeWidth="1.7" strokeLinecap="round" />
    <circle cx="9" cy="7" r="4" stroke="#ffd700" strokeWidth="1.7" />
    <path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" stroke="#ffd700" strokeWidth="1.7" strokeLinecap="round" />
  </svg>
);

const Contact: React.FC = () => {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [sent, setSent] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (form.name && form.email && form.message) setSent(true);
  };

  const channels = [
    { Icon: EmailIcon,    label: 'Email Us',    value: 'hello@sprint.ng',       href: 'mailto:hello@sprint.ng' },
    { Icon: PhoneIcon,    label: 'Call Us',      value: '+234 800 SPRINT',        href: 'tel:+2348007774680' },
    { Icon: ChatIcon,     label: 'Live Chat',    value: 'Available 7AM – 10PM',   href: '#chat' },
    { Icon: LocationIcon, label: 'Head Office',  value: 'Victoria Island, Lagos', href: '#map' },
  ];

  const faqs = [
    {
      Icon: TrackIcon,
      q: 'How do I track my delivery?',
      a: `Open the Sprint app and tap "My Orders". You'll see real-time location and ETA updated every 30 seconds.`,
    },
    {
      Icon: RiderIcon,
      q: "My rider hasn't arrived — what do I do?",
      a: `Call your assigned rider directly via the app, or tap "Contact Support" on your active order screen.`,
    },
    {
      Icon: CancelIcon,
      q: 'Can I cancel an order?',
      a: 'Yes, within 2 minutes of placing at no cost. After that, a small cancellation fee may apply based on distance.',
    },
    {
      Icon: PartnerIcon,
      q: 'How do I become a business partner?',
      a: `Fill the form above and select "Business Enquiry" — our B2B team will reach out within 24 hours.`,
    },
  ];

  return (
    <>
      <Header />
      <main className="contact-page">

        {/* ── Hero ────────────────────────────── */}
        <section className="con-hero">
          <img src={contactImage} alt="Contact Sprint" className="con-hero-image" />
          <div className="con-hero-overlay" />
          <div className="con-hero-content">
            <span className="con-hero-tag">Get in Touch</span>
            <h1 className="con-hero-title">
              {`We're here.`}<br />
              <span className="con-hero-title-gold">Talk to us.</span>
            </h1>
            <p className="con-hero-sub">
              Questions, feedback, or partnership enquiries — we respond within 2 hours.
            </p>
          </div>
        </section>

        {/* ── Main Split ──────────────────────── */}
        <section className="con-main">
          <div className="con-container">
            <div className="con-split">

              {/* Left: Form */}
              <div className="con-form-side">
                <h2>Send us a message</h2>
                <p className="con-form-sub">Fill the form below and we will get back to you shortly.</p>

                {sent ? (
                  <div className="con-success">
                    <div className="con-success-icon">✓</div>
                    <strong>Message sent!</strong>
                    <p>We have received your message and will reply within 2 hours.</p>
                  </div>
                ) : (
                  <div className="con-form">
                    <div className="con-form-row">
                      <div className="con-field">
                        <label htmlFor="name">Full Name</label>
                        <input id="name" name="name" type="text" placeholder="Your full name" value={form.name} onChange={handleChange} />
                      </div>
                      <div className="con-field">
                        <label htmlFor="email">Email Address</label>
                        <input id="email" name="email" type="email" placeholder="you@example.com" value={form.email} onChange={handleChange} />
                      </div>
                    </div>
                    <div className="con-field">
                      <label htmlFor="subject">Subject</label>
                      <select id="subject" name="subject" value={form.subject} onChange={handleChange}>
                        <option value="">Select a topic</option>
                        <option value="delivery">Delivery Issue</option>
                        <option value="account">Account Help</option>
                        <option value="business">Business Enquiry</option>
                        <option value="partnership">Partnership</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                    <div className="con-field">
                      <label htmlFor="message">Message</label>
                      <textarea id="message" name="message" rows={5} placeholder="Tell us what's on your mind..." value={form.message} onChange={handleChange} />
                    </div>
                    <button className="con-submit-btn" onClick={handleSubmit}>
                      Send Message →
                    </button>
                  </div>
                )}
              </div>

              {/* Right: Info */}
              <div className="con-info-side">
                <div className="con-info-top">
                  <h3>Contact channels</h3>
                  <p>Pick the channel that works best for you.</p>
                  <div className="con-channels">
                    {channels.map(({ Icon, label, value, href }, i) => (
                      <a href={href} className="con-channel" key={i}>
                        <div className="con-channel-icon-wrap">
                          <Icon />
                        </div>
                        <div>
                          <strong>{label}</strong>
                          <span>{value}</span>
                        </div>
                      </a>
                    ))}
                  </div>
                </div>

                <div className="con-hours">
                  <h4>Support hours</h4>
                  <div className="con-hours-grid">
                    <div className="con-hours-row"><span>Monday – Friday</span><span>7:00 AM – 10:00 PM</span></div>
                    <div className="con-hours-row"><span>Saturday</span><span>8:00 AM – 8:00 PM</span></div>
                    <div className="con-hours-row"><span>Sunday</span><span>9:00 AM – 6:00 PM</span></div>
                  </div>
                </div>

                <div className="con-response-badge">
                  <span className="con-badge-dot" />
                  <p>Average response time: <strong>under 2 hours</strong></p>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* ── FAQ ─────────────────────────────── */}
        <section className="con-faq">
          <div className="con-container">
            <div className="con-section-head">
              <span className="con-faq-eyebrow">FAQ</span>
              <h2>Quick answers</h2>
              <p>Check these before reaching out — you might find what you need instantly.</p>
            </div>
            <div className="con-faq-grid">
              {faqs.map(({ Icon, q, a }, i) => (
                <div className="con-faq-card" key={i} style={{ animationDelay: `${i * 0.1}s` }}>
                  <div className="con-faq-icon-wrap">
                    <Icon />
                  </div>
                  <div className="con-faq-body">
                    <h4>{q}</h4>
                    <p>{a}</p>
                  </div>
                  <div className="con-faq-arrow">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                      <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
};

export default Contact;