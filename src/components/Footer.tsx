// src/components/Footer.tsx
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Phone, MapPin, Heart, ArrowUp } from 'lucide-react';
import Tilt from 'react-parallax-tilt';
import '../assets/css/footer.css';

const Footer: React.FC = () => {
  const [showScroll, setShowScroll] = useState(false);
  const [email, setEmail] = useState('');

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
      alert("Thank you for subscribing! We'll keep you updated.");
      setEmail('');
    }
  };

  const phoneNumber = '+2349048864955';
  const whatsappLink = `https://wa.me/${phoneNumber.replace('+', '')}`;

  return (
    <footer className="sprint-footer">
      <div className="footer-container">
        
        <div className="footer-main">
          {/* Brand + Logo */}
          <div className="footer-brand">
            <a href="/" className="footer-logo">
              <div className="footer-logo-icon">
                <svg width="42" height="42" viewBox="0 0 110 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path 
                    d="M92 18 H32 C12 18 12 42 34 48 H78 C94 48 94 78 68 82 H15" 
                    stroke="#ffd700" 
                    strokeWidth="11" 
                    strokeLinecap="round"
                  />
                  <path 
                    d="M92 18 H32 C12 18 12 42 34 48 H78 C94 48 94 78 68 82 H15" 
                    stroke="#ffffff" 
                    strokeWidth="2.4" 
                    strokeDasharray="6 8" 
                    strokeLinecap="round"
                  />
                  <path d="M98 18 L86 9 V27 L98 18Z" fill="#ffd700" />
                  <path d="M10 82 L22 73 V91 L10 82Z" fill="#ffd700" />
                </svg>
              </div>
              <span className="footer-logo-text">PRINT</span>
            </a>
            <p className="footer-tagline">You request... We deliver</p>

            <div className="footer-contact">
              <div>
                <Mail size={18} />
                <a 
                  href="mailto:operations@sprint.africa" 
                  style={{ textDecoration: 'none', color: 'inherit' }}
                >
                  operations@sprint.africa
                </a>
              </div>
              <div>
                <Phone size={18} />
                <a 
                  href={whatsappLink} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  style={{ textDecoration: 'none', color: 'inherit' }}
                >
                  {phoneNumber}
                </a>
              </div>
              <div><MapPin size={18} /> Lagos, Nigeria</div>
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
              </ul>
            </div>
            <div className="footer-column">
              <h4>Company</h4>
              <ul>
                <li><a href="/about">Our Story</a></li>
                <li><a href="/careers">Careers</a></li>
                <li><a href="/contact">Contact Us</a></li>
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

          {/* Newsletter Subscribe */}
          <div className="footer-newsletter">
            <h4>Stay Updated</h4>
            <p>Get the latest on deliveries, promotions, and platform updates.</p>
            
            <form onSubmit={handleSubscribe} className="subscribe-form">
              <input
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <button type="submit">Subscribe</button>
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="footer-bottom">
          <p>© {currentYear} Sprint Logistics Africa. All rights reserved.</p>
          <p className="creator">Crafted with <Heart size={14} fill="#ffd700" /> for the future of African logistics</p>
        </div>
      </div>

      {/* Scroll to Top Button */}
      <AnimatePresence>
        {showScroll && (
          <motion.div 
            className="scroll-to-top"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
          >
            <Tilt perspective={800} scale={1.08}>
              <button className="scroll-btn" onClick={scrollToTop}>
                <ArrowUp size={24} />
              </button>
            </Tilt>
          </motion.div>
        )}
      </AnimatePresence>
    </footer>
  );
};

export default Footer;