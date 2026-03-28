// src/components/Header.tsx
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocation } from 'react-router-dom';
import logo from '../assets/images/sprint-logo.png';
import '../assets/css/Header.css';

const Header: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const solidPages = ['/privacy', '/terms', '/security', '/fleet', '/careers'];
  const isSolidPage = solidPages.includes(location.pathname);

  const links = [
    { label: 'How It Works', href: 'how-it-works' },
    { label: 'About', href: 'about' },
    { label: 'Services', href: 'services' },
    { label: 'For Couriers', href: 'couriers' },
    { label: 'Contact', href: 'contact' },
  ];

  return (
    <header className={`header ${scrolled ? 'scrolled' : ''} ${isSolidPage ? 'solid' : ''}`}>
      <div className="inner">
        {/* Big Bold Logo */}
        <a href="/" className="logo" aria-label="Sprint Home">
          <img 
            src={logo} 
            alt="Sprint Logo" 
            className="logo-image"
          />
        </a>

        <nav className="nav" aria-label="Main navigation">
          {links.map((l) => (
            <a key={l.href} href={l.href} className="navLink">
              {l.label}
            </a>
          ))}
        </nav>

        <div className="ctas">
          <a href="/login" className="ctaLogin">Log In</a>
          <motion.a
            href="/signup"
            className="ctaSignup"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            Get Started
          </motion.a>
        </div>

        <button
          className={`hamburger ${menuOpen ? 'open' : ''}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span />
          <span />
          <span />
        </button>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="mobileMenu"
          >
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="mobileLink"
                onClick={() => setMenuOpen(false)}
              >
                {l.label}
              </a>
            ))}
            <div className="mobile-actions">
              <a href="/login" className="mobileLogin">Log In</a>
              <a href="/signup" className="mobileSignup">Get Started</a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;