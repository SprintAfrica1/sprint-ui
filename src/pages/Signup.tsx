// src/pages/Signup.tsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';                     // added
import signupBg from '../assets/images/signup-bg.png';
import '../assets/css/Auth.css';

/* ── SVG Icons (all except LogoMark) ────────────────────────── */
const IconUser = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
    <circle cx="12" cy="7" r="4" stroke="currentColor" strokeWidth="1.7" />
    <path d="M4 21v-1a8 8 0 0116 0v1" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
  </svg>
);

const IconAt = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
    <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.7" />
    <path d="M16 8v5a3 3 0 006 0v-1a10 10 0 10-3.92 7.94" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
  </svg>
);

const IconPhone = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
    <path d="M5.4 2.1A1 1 0 004 2.5L2.3 6.1C1.6 7.6 2 9.4 3.3 10.7l10 10c1.3 1.3 3.1 1.7 4.6 1l3.6-1.7a1 1 0 00.4-1.4l-2-3.5a1 1 0 00-1.2-.4l-2.5 1a1 1 0 01-1-.2L7.5 8.3a1 1 0 01-.2-1l1-2.5a1 1 0 00-.4-1.3L5.4 2.1z"
      stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
  </svg>
);

const IconHandle = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
    <path d="M20 7H4a2 2 0 00-2 2v6a2 2 0 002 2h16a2 2 0 002-2V9a2 2 0 00-2-2z" stroke="currentColor" strokeWidth="1.7" />
    <path d="M8 12h.01M12 12h.01M16 12h.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

const IconLock = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
    <rect x="5" y="11" width="14" height="10" rx="2" stroke="currentColor" strokeWidth="1.7" />
    <path d="M8 11V7a4 4 0 018 0v4" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
    <circle cx="12" cy="16" r="1.5" fill="currentColor" />
  </svg>
);

const IconEye = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" stroke="currentColor" strokeWidth="1.7" />
    <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.7" />
  </svg>
);

const IconEyeOff = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
    <path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19M1 1l22 22"
      stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
  </svg>
);

const IconArrow = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
    <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

interface FormState {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
  terms: boolean;
}

const Signup: React.FC = () => {
  const [showPw, setShowPw]       = useState(false);
  const [showCpw, setShowCpw]     = useState(false);
  const [form, setForm] = useState<FormState>({
    firstName: '', lastName: '', username: '',
    email: '', phone: '',
    password: '', confirmPassword: '',
    terms: false,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setForm(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
  };

  const isValid =
    form.firstName && form.lastName && form.username &&
    form.email && form.phone &&
    form.password && form.password === form.confirmPassword &&
    form.terms;

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (!isValid) return;
    // TODO: connect to auth API
    console.log('Customer signup:', form);
  };

  return (
    <div className="auth-page">
      <div className="auth-bg" style={{ backgroundImage: `url(${signupBg})` }} />
      <div className="auth-overlay" />

      <Header />

      <div className="auth-body">
        <div className="auth-panel">

          {/* Heading */}
          <h1 className="auth-heading">
            Create your<br />
            <span className="auth-heading-gold">account.</span>
          </h1>
          <p className="auth-subtext">
            Join thousands shipping across Nigeria with Sprint.
          </p>

          {/* Form */}
          <div className="auth-form">

            {/* Row: First + Last */}
            <div className="auth-form-row">
              <div className="auth-field">
                <label htmlFor="firstName">First Name</label>
                <div className="auth-input-wrap">
                  <span className="auth-input-icon"><IconUser /></span>
                  <input id="firstName" name="firstName" type="text"
                    placeholder="First name" value={form.firstName} onChange={handleChange} />
                </div>
              </div>
              <div className="auth-field">
                <label htmlFor="lastName">Last Name</label>
                <div className="auth-input-wrap">
                  <span className="auth-input-icon"><IconUser /></span>
                  <input id="lastName" name="lastName" type="text"
                    placeholder="Last name" value={form.lastName} onChange={handleChange} />
                </div>
              </div>
            </div>

            {/* Username */}
            <div className="auth-field">
              <label htmlFor="username">Username</label>
              <div className="auth-input-wrap">
                <span className="auth-input-icon"><IconHandle /></span>
                <input id="username" name="username" type="text"
                  placeholder="Choose a username" value={form.username} onChange={handleChange}
                  autoComplete="username" />
              </div>
            </div>

            {/* Email */}
            <div className="auth-field">
              <label htmlFor="email">Email Address</label>
              <div className="auth-input-wrap">
                <span className="auth-input-icon"><IconAt /></span>
                <input id="email" name="email" type="email"
                  placeholder="you@example.com" value={form.email} onChange={handleChange}
                  autoComplete="email" />
              </div>
            </div>

            {/* Phone */}
            <div className="auth-field">
              <label htmlFor="phone">Phone Number</label>
              <div className="auth-input-wrap">
                <span className="auth-input-icon"><IconPhone /></span>
                <input id="phone" name="phone" type="tel"
                  placeholder="+234 800 000 0000" value={form.phone} onChange={handleChange} />
              </div>
            </div>

            {/* Row: Password + Confirm */}
            <div className="auth-form-row">
              <div className="auth-field">
                <label htmlFor="password">Password</label>
                <div className="auth-input-wrap">
                  <span className="auth-input-icon"><IconLock /></span>
                  <input id="password" name="password"
                    type={showPw ? 'text' : 'password'}
                    placeholder="Create password" value={form.password}
                    onChange={handleChange} className="with-right"
                    autoComplete="new-password" />
                  <button type="button" className="auth-input-icon-right"
                    onClick={() => setShowPw(p => !p)}
                    aria-label="Toggle password">
                    {showPw ? <IconEyeOff /> : <IconEye />}
                  </button>
                </div>
              </div>
              <div className="auth-field">
                <label htmlFor="confirmPassword">Confirm Password</label>
                <div className="auth-input-wrap">
                  <span className="auth-input-icon"><IconLock /></span>
                  <input id="confirmPassword" name="confirmPassword"
                    type={showCpw ? 'text' : 'password'}
                    placeholder="Repeat password" value={form.confirmPassword}
                    onChange={handleChange} className="with-right"
                    autoComplete="new-password" />
                  <button type="button" className="auth-input-icon-right"
                    onClick={() => setShowCpw(p => !p)}
                    aria-label="Toggle confirm password">
                    {showCpw ? <IconEyeOff /> : <IconEye />}
                  </button>
                </div>
              </div>
            </div>

            {/* Terms */}
            <div className="auth-terms">
              <input type="checkbox" id="terms" name="terms"
                checked={form.terms} onChange={handleChange} />
              <span>
                I agree to the <Link to="/terms">Terms of Service</Link> and{' '}
                <Link to="/privacy">Privacy Policy</Link>
              </span>
            </div>

            {/* Submit */}
            <button
              className="auth-btn-primary"
              onClick={handleSubmit}
              disabled={!isValid}
            >
              Create Account <IconArrow />
            </button>

          </div>

          {/* Switch */}
          <p className="auth-switch">
            Already have an account? <Link to="/login">Sign in</Link>
          </p>

        </div>
      </div>
    </div>
  );
};

export default Signup;