// src/components/Footer.tsx
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Phone, MapPin, Heart, ArrowUp } from 'lucide-react';
import Tilt from 'react-parallax-tilt';
import logo from '../assets/images/logo-dark.png';
import '../assets/css/footer.css';

const Footer: React.FC = () => {
  const [showScroll, setShowScroll] = useState(false);
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  useEffect(() => {
    const checkScroll = () => setShowScroll(window.scrollY > 500);
    window.addEventListener('scroll', checkScroll);
    return () => window.removeEventListener('scroll', checkScroll);
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });
  const currentYear = new Date().getFullYear();

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 4000);
    }
  };

  const phoneNumber = '+2349048864955';
  const whatsappLink = `https://wa.me/${phoneNumber.replace('+', '')}`;

  return (
    <footer className="sprint-footer">
      <div className="footer-top-accent" />

      <div className="footer-container">
        <div className="footer-main">

          {/* Brand */}
          <div className="footer-brand">
            <a href="/" className="footer-logo">
              <img src={logo} alt="Sprint Africa" className="footer-logo-img" />
            </a>
            <p className="footer-description">
              Nigeria's most reliable logistics partner — connecting people, businesses,
              and communities across Africa with speed and care.
            </p>
            <div className="footer-contact">
              <a href="mailto:operations@sprint.africa" className="footer-contact-item">
                <span className="contact-icon"><Mail size={15} /></span>
                operations@sprintafrica.com.ng
              </a>
              <a href={whatsappLink} target="_blank" rel="noopener noreferrer" className="footer-contact-item">
                <span className="contact-icon"><Phone size={15} /></span>
                {phoneNumber}
              </a>
              <div className="footer-contact-item">
                <span className="contact-icon"><MapPin size={15} /></span>
                Lagos, Nigeria
              </div>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="footer-links">
            <div className="footer-column">
              <h4>Platform</h4>
              <ul>
                <li><a href="/fleet">Fleet Management</a></li>
                <li><a href="/services">Services</a></li>
                <li><a href="/couriers">For Couriers</a></li>
                <li><a href="/tracking">Track Shipment</a></li>
              </ul>
            </div>
            <div className="footer-column">
              <h4>Company</h4>
              <ul>
                <li><a href="/about">Our Story</a></li>
                <li><a href="/careers">Careers</a></li>
                <li><a href="/contact">Contact Us</a></li>
                <li><a href="/how-it-works">How It Works</a></li>
              </ul>
            </div>
            <div className="footer-column">
              <h4>Legal</h4>
              <ul>
                <li><a href="/privacy">Privacy Policy</a></li>
                <li><a href="/terms">Terms of Use</a></li>
                <li><a href="/security">Security</a></li>
              </ul>
            </div>
          </div>

          {/* Newsletter */}
          <div className="footer-newsletter">
            <div className="newsletter-badge">Newsletter</div>
            <h4>Stay in the loop</h4>
            <p>Get updates on deliveries, new routes, promotions and platform news.</p>
            <form onSubmit={handleSubscribe} className="subscribe-form">
              <input
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <button type="submit">
                {subscribed ? '✓ Done!' : 'Subscribe'}
              </button>
            </form>
            {subscribed && (
              <p className="subscribe-success">Thanks! You're now subscribed.</p>
            )}

            <div className="footer-socials">
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="social-link" aria-label="Twitter">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="social-link" aria-label="Instagram">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                  <circle cx="12" cy="12" r="4"/>
                  <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/>
                </svg>
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="social-link" aria-label="LinkedIn">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"/>
                  <circle cx="4" cy="4" r="2"/>
                </svg>
              </a>
              <a href={whatsappLink} target="_blank" rel="noopener noreferrer" className="social-link" aria-label="WhatsApp">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
              </a>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="footer-bottom">
          <p>© {currentYear} Sprint Logistics Africa. All rights reserved.</p>
          <p className="creator">
            Crafted with <Heart size={13} fill="#ffd700" color="#ffd700" /> for the future of African logistics
          </p>
        </div>
      </div>

      {/* Scroll to Top */}
      <AnimatePresence>
        {showScroll && (
          <motion.div
            className="scroll-to-top"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.25 }}
          >
            <Tilt perspective={800} scale={1.08}>
              <button className="scroll-btn" onClick={scrollToTop} aria-label="Scroll to top">
                <ArrowUp size={20} />
              </button>
            </Tilt>
          </motion.div>
        )}
      </AnimatePresence>
    </footer>
  );
};

export default Footer;