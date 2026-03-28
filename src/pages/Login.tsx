// src/pages/Login.tsx
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import customerBg from '../assets/images/login-bg.png';
import courierBg from '../assets/images/courier-bg.png';
import '../assets/css/Auth.css';

// Mock user database
const mockUsers = [
  {
    id: '1',
    email: 'customer@sprint.com',
    username: 'customer',
    password: 'customer123',
    role: 'customer',
    name: 'John Doe',
  },
  {
    id: '2',
    email: 'courier@sprint.com',
    username: 'courier',
    password: 'courier123',
    role: 'courier',
    name: 'Jane Smith',
  },
];

/* ── Inline SVGs (unchanged) ────────────────────────────── */
const IconUser = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
    <circle cx="12" cy="7" r="4" stroke="currentColor" strokeWidth="1.7" />
    <path d="M4 21v-1a8 8 0 0116 0v1" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
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
    <path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19M1 1l22 22" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
  </svg>
);

const IconArrow = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
    <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

type Role = 'customer' | 'courier';

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [role, setRole] = useState<Role>('customer');
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [form, setForm] = useState({ identifier: '', password: '', remember: false });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setForm(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
    if (error) setError(''); // clear error when user types
  };

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 800));

    // Find user by email/username and password, and matching role
    const user = mockUsers.find(
      u =>
        (u.email === form.identifier || u.username === form.identifier) &&
        u.password === form.password &&
        u.role === role
    );

    if (user) {
      // Store auth data (in a real app, store token from API)
      localStorage.setItem('auth', JSON.stringify({
        userId: user.id,
        role: user.role,
        name: user.name,
        email: user.email,
      }));
      // Navigate to the correct dashboard
      if (user.role === 'customer') {
        navigate('/dashboard');
      } else {
        // Courier dashboard
        navigate('/courier');
      }
    } else {
      setError('Invalid email/username or password. Please try again.');
    }
    setLoading(false);
  };

  const getBgImage = (role: Role): string => {
    return role === 'customer' ? customerBg : courierBg;
  };

  return (
    <div className="auth-page">
      {/* Background – key forces re‑mount + animation on role change */}
      <div
        key={role}
        className="auth-bg"
        style={{ backgroundImage: `url(${getBgImage(role)})` }}
      />
      <div className="auth-overlay" />

      <Header />

      {/* Content */}
      <div className="auth-body">
        <div className="auth-panel">
          {/* Role toggle */}
          <div className="auth-toggle">
            <button
              className={`auth-toggle-btn${role === 'customer' ? ' active' : ''}`}
              onClick={() => setRole('customer')}
              type="button"
            >
              Customer
            </button>
            <button
              className={`auth-toggle-btn${role === 'courier' ? ' active' : ''}`}
              onClick={() => setRole('courier')}
              type="button"
            >
              Courier
            </button>
          </div>

          {/* Heading */}
          <h1 className="auth-heading">
            Welcome<br />
            <span className="auth-heading-gold">back.</span>
          </h1>
          <p className="auth-subtext">
            {role === 'customer'
              ? 'Sign in to track your shipments and manage deliveries.'
              : 'Sign in to your courier dashboard and manage your routes.'}
          </p>

          {/* Form */}
          <div className="auth-form">
            <div className="auth-field">
              <label htmlFor="identifier">Email or Username</label>
              <div className="auth-input-wrap">
                <span className="auth-input-icon"><IconUser /></span>
                <input
                  id="identifier"
                  name="identifier"
                  type="text"
                  placeholder="Enter your email or username"
                  value={form.identifier}
                  onChange={handleChange}
                  autoComplete="username"
                />
              </div>
            </div>

            <div className="auth-field">
              <label htmlFor="password">Password</label>
              <div className="auth-input-wrap">
                <span className="auth-input-icon"><IconLock /></span>
                <input
                  id="password"
                  name="password"
                  type={showPw ? 'text' : 'password'}
                  placeholder="Enter your password"
                  value={form.password}
                  onChange={handleChange}
                  className="with-right"
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  className="auth-input-icon-right"
                  onClick={() => setShowPw(p => !p)}
                  aria-label={showPw ? 'Hide password' : 'Show password'}
                >
                  {showPw ? <IconEyeOff /> : <IconEye />}
                </button>
              </div>
            </div>

            <div className="auth-meta-row">
              <label className="auth-remember">
                <input
                  type="checkbox"
                  name="remember"
                  checked={form.remember}
                  onChange={handleChange}
                />
                Remember me
              </label>
              <Link to="/forgot-password" className="auth-forgot">Forgot password?</Link>
            </div>

            {error && (
              <div className="auth-error" style={{ color: '#ff6b6b', fontSize: '0.8rem', marginTop: '4px' }}>
                {error}
              </div>
            )}

            <button
              className="auth-btn-primary"
              onClick={handleSubmit}
              disabled={loading}
            >
              {loading ? 'Signing in...' : 'Sign In'} <IconArrow />
            </button>
          </div>

          <p className="auth-switch">
            {role === 'customer'
              ? <>New to Sprint? <Link to="/signup">Create an account</Link></>
              : <>Want to deliver with us? <Link to="/courier/signup">Apply as a Courier</Link></>
            }
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;