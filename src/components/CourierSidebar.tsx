import React, { useState, useEffect, useRef } from 'react';
import { NavLink } from 'react-router-dom';
import logoLight from '../assets/images/logo-light.png';
import logoDark from '../assets/images/logo-dark.png';
import '../assets/css/DashboardSidebar.css'; // same CSS file

// ===== ICONS (unchanged) =====
const IconOverview = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
    <path d="M3 9l9-6 9 6v11a2 2 0 01-2 2h-5v-8H9v8H5a2 2 0 01-2-2V9z" />
  </svg>
);

const IconDeliveries = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
    <rect x="2" y="7" width="20" height="12" rx="2" />
    <path d="M16 21v-4M8 21v-4" />
    <path d="M4 7v-2h16v2" />
  </svg>
);

const IconEarnings = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
    <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
    <circle cx="12" cy="12" r="3" />
  </svg>
);

const IconPickup = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
    <path d="M4 7h16l-2 9H6L4 7z" />
    <path d="M8 7V4h8v3" />
    <circle cx="8" cy="17" r="2" />
    <circle cx="16" cy="17" r="2" />
  </svg>
);

const IconAvailability = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
    <circle cx="12" cy="12" r="10" />
    <polyline points="12 6 12 12 16 14" />
  </svg>
);

const IconChat = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
    <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
  </svg>
);

const IconClose = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
    <path d="M18 6L6 18M6 6l12 12" />
  </svg>
);

// ===== NEW ICONS for customer dropdown =====
const IconUserCircle = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
);

const IconChevronDown = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <polyline points="6 9 12 15 18 9" />
  </svg>
);

const IconChevronUp = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <polyline points="18 15 12 9 6 15" />
  </svg>
);

const IconSettings = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
    <path d="M12 15a3 3 0 100-6 3 3 0 000 6z" />
    <path d="M19.4 15a1.65 1.65 0 00.33-1.82 1.65 1.65 0 00-1.51-1H5.78a1.65 1.65 0 00-1.51 1 1.65 1.65 0 00.33 1.82l.04.04A10 10 0 0012 17.66a10 10 0 006.36-2.62l.04-.04z" />
  </svg>
);

const IconLogout = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
    <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4" />
    <polyline points="16 17 21 12 16 7" />
    <line x1="21" y1="12" x2="9" y2="12" />
  </svg>
);

// ===== INTERFACE =====
interface CourierSidebarProps {
  onClose?: () => void;
  isOpen?: boolean;
  onLogout?: () => void; // optional logout handler
}

// Dropdown item type
interface DropdownItem {
  label: string;
  icon: React.FC;
  onClick: () => void;
}

const CourierSidebar: React.FC<CourierSidebarProps> = ({ onClose, isOpen, onLogout }) => {
  const showSidebar = isOpen !== undefined ? isOpen : true;
  const [logo, setLogo] = useState(logoLight);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Theme observer for logo
  useEffect(() => {
    const updateLogo = () => {
      const theme = document.documentElement.getAttribute('data-theme');
      setLogo(theme === 'dark' ? logoDark : logoLight);
    };
    updateLogo();
    const observer = new MutationObserver(updateLogo);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-theme'],
    });
    return () => observer.disconnect();
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Courier data (using Musa K)
  const courier = {
    name: 'Musa K',
    email: 'musa@example.com',
    avatar: 'https://ui-avatars.com/api/?background=FFD700&color=001F3F&name=MK',
  };

  // Dropdown menu items
  const dropdownItems: DropdownItem[] = [
    {
      label: 'My Profile',
      icon: IconUserCircle,
      onClick: () => {
        console.log('Navigate to profile');
        setDropdownOpen(false);
        // Add navigation logic here (e.g., useNavigate)
      },
    },
    {
      label: 'Settings',
      icon: IconSettings,
      onClick: () => {
        console.log('Navigate to settings');
        setDropdownOpen(false);
      },
    },
    {
      label: 'Logout',
      icon: IconLogout,
      onClick: () => {
        if (onLogout) onLogout();
        console.log('Logout clicked');
        setDropdownOpen(false);
      },
    },
  ];

  return (
    <aside className={`sidebar-container ${!showSidebar ? 'sidebar-hidden' : ''}`}>
      {onClose && (
        <button className="sidebar-close-mobile" onClick={onClose} aria-label="Close sidebar">
          <IconClose />
        </button>
      )}

      {/* Logo */}
      <div className="sidebar-logo">
        <NavLink to="/courier">
          <img src={logo} alt="Sprint Logo" className="sidebar-logo-image" />
        </NavLink>
      </div>

      {/* Navigation */}
      <nav className="sidebar-nav">
        <NavLink to="/courier" className="nav-item" end>
          <IconOverview />
          <span>Overview</span>
        </NavLink>
        <NavLink to="/courier/deliveries" className="nav-item">
          <IconDeliveries />
          <span>Deliveries</span>
        </NavLink>
        <NavLink to="/courier/earnings" className="nav-item">
          <IconEarnings />
          <span>Earnings</span>
        </NavLink>
        <NavLink to="/courier/pickup" className="nav-item">
          <IconPickup />
          <span>Pickup</span>
        </NavLink>
        <NavLink to="/courier/availability" className="nav-item">
          <IconAvailability />
          <span>Availability</span>
        </NavLink>
        <NavLink to="/courier/chat" className="nav-item">
          <IconChat />
          <span>Chat</span>
        </NavLink>
      </nav>

      {/* Courier Dropdown Section */}
      <div className="customer-section" ref={dropdownRef}>
        <div
          className="customer-trigger"
          onClick={() => setDropdownOpen(!dropdownOpen)}
          aria-expanded={dropdownOpen}
          aria-haspopup="true"
        >
          <div className="customer-info">
            <img
              src={courier.avatar}
              alt={courier.name}
              className="customer-avatar"
            />
            <div className="customer-details">
              <span className="customer-name">{courier.name}</span>
              <span className="customer-role">Courier Account</span>
            </div>
          </div>
          <div className="dropdown-icon">
            {dropdownOpen ? <IconChevronUp /> : <IconChevronDown />}
          </div>
        </div>

        {/* Dropdown Menu */}
        {dropdownOpen && (
          <div className="dropdown-menu">
            {dropdownItems.map((item, index) => (
              <button
                key={index}
                className="dropdown-item"
                onClick={item.onClick}
              >
                <span className="dropdown-icon-left">
                  <item.icon />
                </span>
                <span>{item.label}</span>
              </button>
            ))}
          </div>
        )}
      </div>
    </aside>
  );
};

export default CourierSidebar;