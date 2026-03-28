import React, { useState, useEffect, useRef } from 'react';
import { NavLink } from 'react-router-dom';
import '../assets/css/DashboardSidebar.css';

// Logo imports
import logoLight from '../assets/images/logo-light.png';
import logoDark from '../assets/images/logo-dark.png';

// ===== ICONS =====
const IconOverview = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
    <path d="M3 9l9-6 9 6v11a2 2 0 01-2 2h-5v-8H9v8H5a2 2 0 01-2-2V9z" />
  </svg>
);

const IconWallet = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
    <path d="M20 12v8a2 2 0 01-2 2H6a2 2 0 01-2-2v-8M16 6l4 6-4 6M8 6l-4 6 4 6" />
  </svg>
);

const IconOrders = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
    <path d="M3 6h18M8 6V4h8v2M6 10h12M8 14h8M6 18h8" />
  </svg>
);

const IconTracking = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
    <circle cx="12" cy="12" r="10" />
    <polyline points="12 6 12 12 16 14" />
  </svg>
);

const IconShipment = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
    <rect x="2" y="7" width="20" height="12" rx="2" />
    <path d="M16 21v-4M8 21v-4" />
    <path d="M4 7v-2h16v2" />
  </svg>
);

const IconProfile = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
    <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
);

const IconClose = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
    <path d="M18 6L6 18M6 6l12 12" />
  </svg>
);

// New icons for customer dropdown
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

// Dropdown item type
interface DropdownItem {
  label: string;
  icon: React.FC;
  onClick: () => void;
}

interface DashboardSidebarProps {
  onClose?: () => void;
  isOpen?: boolean;
  onLogout?: () => void; // optional logout handler
}

const DashboardSidebar: React.FC<DashboardSidebarProps> = ({
  onClose,
  isOpen,
  onLogout,
}) => {
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
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Sample customer data
  const customer = {
    name: 'Muhammed kamil',
    email: 'sarah@example.com',
    avatar: 'https://ui-avatars.com/api/?background=0D8F5F&color=fff&name=Mk',
  };

  // Dropdown menu items
  const dropdownItems: DropdownItem[] = [
    {
      label: 'My Profile',
      icon: IconUserCircle,
      onClick: () => {
        console.log('Navigate to profile');
        setDropdownOpen(false);
        // Add navigation logic here
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
        <NavLink to="/dashboard">
          <img src={logo} alt="Sprint Logo" className="sidebar-logo-image" />
        </NavLink>
      </div>

      {/* Navigation */}
      <nav className="sidebar-nav">
        <NavLink to="/dashboard" className="nav-item" end>
          <IconOverview />
          <span>Overview</span>
        </NavLink>
        <NavLink to="/dashboard/wallet" className="nav-item">
          <IconWallet />
          <span>Wallet</span>
        </NavLink>
        <NavLink to="/dashboard/orders" className="nav-item">
          <IconOrders />
          <span>Orders</span>
        </NavLink>
        <NavLink to="/dashboard/tracking" className="nav-item">
          <IconTracking />
          <span>Tracking</span>
        </NavLink>
        <NavLink to="/dashboard/shipment" className="nav-item">
          <IconShipment />
          <span>New Shipment</span>
        </NavLink>
        <NavLink to="/dashboard/chat" className="nav-item">
          <IconProfile />
          <span>Chat</span>
        </NavLink>
      </nav>

      {/* Customer Dropdown Section */}
      <div className="customer-section" ref={dropdownRef}>
        <div
          className="customer-trigger"
          onClick={() => setDropdownOpen(!dropdownOpen)}
          aria-expanded={dropdownOpen}
          aria-haspopup="true"
        >
          <div className="customer-info">
            <img
              src={customer.avatar}
              alt={customer.name}
              className="customer-avatar"
            />
            <div className="customer-details">
              <span className="customer-name">{customer.name}</span>
              <span className="customer-role">Customer Account</span>
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

export default DashboardSidebar;