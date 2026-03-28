// src/pages/CourierSignup.tsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';                     // ← added
import courierBg from '../assets/images/courier-signup-bg.png';
import '../assets/css/Auth.css';

/* ── SVG Icons (all kept except LogoMark) ──────────────────── */
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

const IconMap = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"
      stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
    <circle cx="12" cy="9" r="2.5" stroke="currentColor" strokeWidth="1.7" />
  </svg>
);

const IconTruck = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
    <rect x="1" y="8" width="13" height="11" rx="2" stroke="currentColor" strokeWidth="1.7" />
    <path d="M14 12h4l3 4v3h-7V12z" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
    <circle cx="5.5" cy="19.5" r="1.5" stroke="currentColor" strokeWidth="1.5" />
    <circle cx="17.5" cy="19.5" r="1.5" stroke="currentColor" strokeWidth="1.5" />
  </svg>
);

const IconPlate = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
    <rect x="2" y="6" width="20" height="12" rx="3" stroke="currentColor" strokeWidth="1.7" />
    <path d="M7 12h.01M10 12h2M15 12h2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
  </svg>
);

const IconCalendar = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
    <rect x="3" y="4" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="1.7" />
    <path d="M16 2v4M8 2v4M3 10h18" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
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

const IconBack = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
    <path d="M19 12H5M11 6l-6 6 6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const IconCheck = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
    <path d="M5 13l4 4L19 7" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const NIGERIAN_STATES = [
  'Abia','Adamawa','Akwa Ibom','Anambra','Bauchi','Bayelsa','Benue','Borno',
  'Cross River','Delta','Ebonyi','Edo','Ekiti','Enugu','FCT - Abuja','Gombe',
  'Imo','Jigawa','Kaduna','Kano','Katsina','Kebbi','Kogi','Kwara',
  'Lagos','Nasarawa','Niger','Ogun','Ondo','Osun','Oyo','Plateau',
  'Rivers','Sokoto','Taraba','Yobe','Zamfara',
];

const VEHICLE_TYPES = ['Motorcycle', 'Tricycle (Keke)', 'Car', 'Van', 'Truck'];

interface Step1 {
  firstName: string; lastName: string; username: string;
  email: string; phone: string; state: string;
}

interface Step2 {
  vehicleType: string; licensePlate: string; vehicleYear: string;
  password: string; confirmPassword: string; terms: boolean;
}

const CourierSignup: React.FC = () => {
  const [step, setStep]       = useState<1 | 2>(1);
  const [animDir, setAnimDir] = useState<'forward' | 'back'>('forward');
  const [showPw, setShowPw]   = useState(false);
  const [showCpw, setShowCpw] = useState(false);

  const [s1, setS1] = useState<Step1>({
    firstName: '', lastName: '', username: '', email: '', phone: '', state: '',
  });

  const [s2, setS2] = useState<Step2>({
    vehicleType: '', licensePlate: '', vehicleYear: '',
    password: '', confirmPassword: '', terms: false,
  });

  const handleS1 = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setS1(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleS2 = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const target = e.target as HTMLInputElement;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    setS2(prev => ({ ...prev, [target.name]: value }));
  };

  const step1Valid = s1.firstName && s1.lastName && s1.username && s1.email && s1.phone && s1.state;

  const step2Valid =
    s2.vehicleType && s2.licensePlate && s2.vehicleYear &&
    s2.password && s2.password === s2.confirmPassword && s2.terms;

  const goNext = () => {
    if (!step1Valid) return;
    setAnimDir('forward');
    setStep(2);
  };

  const goBack = () => {
    setAnimDir('back');
    setStep(1);
  };

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (!step2Valid) return;
    // TODO: connect to auth API
    console.log('Courier signup:', { ...s1, ...s2 });
  };

  return (
    <div className="auth-page">
      <div className="auth-bg" style={{ backgroundImage: `url(${courierBg})` }} />
      <div className="auth-overlay" />

      {/* Header (replaces old back-to-login link) */}
      <Header />

      <div className="auth-body">
        <div className="auth-panel">

          {/* Step indicator */}
          <div className="auth-steps">
            <div className="auth-step-item">
              <div className={`auth-step-circle ${step === 1 ? 'active' : 'done'}`}>
                {step > 1 ? <IconCheck /> : '1'}
              </div>
              <span className={`auth-step-label ${step === 1 ? 'active' : 'done'}`}>
                Personal Info
              </span>
            </div>
            <div className={`auth-step-connector ${step > 1 ? 'done' : ''}`} />
            <div className="auth-step-item">
              <div className={`auth-step-circle ${step === 2 ? 'active' : ''}`}>2</div>
              <span className={`auth-step-label ${step === 2 ? 'active' : ''}`}>
                Vehicle &amp; Security
              </span>
            </div>
          </div>

          {/* ── STEP 1 ── */}
          {step === 1 && (
            <div className={`auth-step-content ${animDir === 'back' ? 'back' : ''}`}>
              <h1 className="auth-heading">
                Join our<br />
                <span className="auth-heading-gold">courier fleet.</span>
              </h1>
              <p className="auth-subtext">
                Tell us about yourself — step 1 of 2.
              </p>

              <div className="auth-form">
                {/* First + Last */}
                <div className="auth-form-row">
                  <div className="auth-field">
                    <label htmlFor="firstName">First Name</label>
                    <div className="auth-input-wrap">
                      <span className="auth-input-icon"><IconUser /></span>
                      <input id="firstName" name="firstName" type="text"
                        placeholder="First name" value={s1.firstName} onChange={handleS1} />
                    </div>
                  </div>
                  <div className="auth-field">
                    <label htmlFor="lastName">Last Name</label>
                    <div className="auth-input-wrap">
                      <span className="auth-input-icon"><IconUser /></span>
                      <input id="lastName" name="lastName" type="text"
                        placeholder="Last name" value={s1.lastName} onChange={handleS1} />
                    </div>
                  </div>
                </div>

                {/* Username */}
                <div className="auth-field">
                  <label htmlFor="username">Username</label>
                  <div className="auth-input-wrap">
                    <span className="auth-input-icon"><IconHandle /></span>
                    <input id="username" name="username" type="text"
                      placeholder="Choose a username" value={s1.username} onChange={handleS1}
                      autoComplete="username" />
                  </div>
                </div>

                {/* Email */}
                <div className="auth-field">
                  <label htmlFor="email">Email Address</label>
                  <div className="auth-input-wrap">
                    <span className="auth-input-icon"><IconAt /></span>
                    <input id="email" name="email" type="email"
                      placeholder="you@example.com" value={s1.email} onChange={handleS1}
                      autoComplete="email" />
                  </div>
                </div>

                {/* Phone + State */}
                <div className="auth-form-row">
                  <div className="auth-field">
                    <label htmlFor="phone">Phone Number</label>
                    <div className="auth-input-wrap">
                      <span className="auth-input-icon"><IconPhone /></span>
                      <input id="phone" name="phone" type="tel"
                        placeholder="+234 800 000 0000" value={s1.phone} onChange={handleS1} />
                    </div>
                  </div>
                  <div className="auth-field">
                    <label htmlFor="state">State</label>
                    <div className="auth-input-wrap">
                      <span className="auth-input-icon"><IconMap /></span>
                      <select id="state" name="state" value={s1.state} onChange={handleS1}>
                        <option value="">Select state</option>
                        {NIGERIAN_STATES.map(st => (
                          <option key={st} value={st}>{st}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>

                {/* Next */}
                <button
                  className="auth-btn-primary"
                  onClick={goNext}
                  disabled={!step1Valid}
                  type="button"
                >
                  Continue <IconArrow />
                </button>
              </div>
            </div>
          )}

          {/* ── STEP 2 ── */}
          {step === 2 && (
            <div className={`auth-step-content ${animDir === 'back' ? 'back' : ''}`}>
              <h1 className="auth-heading">
                Your vehicle<br />
                <span className="auth-heading-gold">&amp; security.</span>
              </h1>
              <p className="auth-subtext">
                Almost there — step 2 of 2.
              </p>

              <div className="auth-form">
                {/* Vehicle type */}
                <div className="auth-field">
                  <label htmlFor="vehicleType">Vehicle Type</label>
                  <div className="auth-input-wrap">
                    <span className="auth-input-icon"><IconTruck /></span>
                    <select id="vehicleType" name="vehicleType"
                      value={s2.vehicleType} onChange={handleS2}>
                      <option value="">Select vehicle type</option>
                      {VEHICLE_TYPES.map(v => (
                        <option key={v} value={v}>{v}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Plate + Year */}
                <div className="auth-form-row">
                  <div className="auth-field">
                    <label htmlFor="licensePlate">License Plate</label>
                    <div className="auth-input-wrap">
                      <span className="auth-input-icon"><IconPlate /></span>
                      <input id="licensePlate" name="licensePlate" type="text"
                        placeholder="e.g. LAG-001-AA" value={s2.licensePlate}
                        onChange={handleS2} style={{ textTransform: 'uppercase' }} />
                    </div>
                  </div>
                  <div className="auth-field">
                    <label htmlFor="vehicleYear">Vehicle Year</label>
                    <div className="auth-input-wrap">
                      <span className="auth-input-icon"><IconCalendar /></span>
                      <input id="vehicleYear" name="vehicleYear" type="number"
                        placeholder="e.g. 2020" min="2000" max={new Date().getFullYear()}
                        value={s2.vehicleYear} onChange={handleS2} />
                    </div>
                  </div>
                </div>

                {/* Password + Confirm */}
                <div className="auth-form-row">
                  <div className="auth-field">
                    <label htmlFor="password">Password</label>
                    <div className="auth-input-wrap">
                      <span className="auth-input-icon"><IconLock /></span>
                      <input id="password" name="password"
                        type={showPw ? 'text' : 'password'}
                        placeholder="Create password" value={s2.password}
                        onChange={handleS2} className="with-right"
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
                        placeholder="Repeat password" value={s2.confirmPassword}
                        onChange={handleS2} className="with-right"
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
                    checked={s2.terms} onChange={handleS2} />
                  <span>
                    I agree to the <Link to="/terms">Terms of Service</Link>,{' '}
                    <Link to="/privacy">Privacy Policy</Link> and{' '}
                    <Link to="/courier-agreement">Courier Agreement</Link>
                  </span>
                </div>

                {/* Back + Submit */}
                <div className="auth-step-btns">
                  <button className="auth-btn-secondary" onClick={goBack} type="button">
                    <IconBack /> Back
                  </button>
                  <button
                    className="auth-btn-primary"
                    onClick={handleSubmit}
                    disabled={!step2Valid}
                    type="button"
                  >
                    Apply as Courier <IconArrow />
                  </button>
                </div>

              </div>
            </div>
          )}

          {/* Switch */}
          <p className="auth-switch">
            Already have an account? <Link to="/login">Sign in</Link>
          </p>

        </div>
      </div>
    </div>
  );
};

export default CourierSignup;