import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom'; // ← added
import NotificationPanel from './NotificationPanel';
import '../assets/css/DashboardHeader.css';

// Icons (same as before)
const IconSearch = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <circle cx="11" cy="11" r="8" />
    <path d="m21 21-4.3-4.3" />
  </svg>
);
const IconBell = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
    <path d="M13.73 21a2 2 0 0 1-3.46 0" />
  </svg>
);
const IconSun = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <circle cx="12" cy="12" r="5" />
    <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
  </svg>
);
const IconMoon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
  </svg>
);
const IconMenu = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M3 6h18M3 12h18M3 18h18" />
  </svg>
);
const IconChevronDown = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="m6 9 6 6 6-6" />
  </svg>
);
const IconUser = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" {...props}>
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
);
const IconSettings = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" {...props}>
    <path d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" />
    <path d="M19.4 15a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H5.78a1.65 1.65 0 0 0-1.51 1 1.65 1.65 0 0 0 .33 1.82l.04.04A10 10 0 0 0 12 17.66a10 10 0 0 0 6.36-2.62l.04-.04Z" />
  </svg>
);
const IconLogout = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" {...props}>
    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
    <polyline points="16 17 21 12 16 7" />
    <line x1="21" y1="12" x2="9" y2="12" />
  </svg>
);

interface DashboardHeaderProps {
  onMenuClick?: () => void;
}

const DashboardHeader: React.FC<DashboardHeaderProps> = ({ onMenuClick }) => {
  const navigate = useNavigate(); // ← added

  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    return (localStorage.getItem('theme') as 'light' | 'dark') || 'light';
  });
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [notifPanelOpen, setNotifPanelOpen] = useState(false);
  const profileRef = useRef<HTMLDivElement>(null);
  const notifButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (profileRef.current && !profileRef.current.contains(e.target as Node)) {
        setShowProfileMenu(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'light' ? 'dark' : 'light'));
  };

  const toggleNotifPanel = () => {
    setNotifPanelOpen(prev => !prev);
  };

  const closeNotifPanel = () => {
    setNotifPanelOpen(false);
  };

  // Navigation handlers
  const handleProfileClick = () => {
    setShowProfileMenu(false);
    navigate('/dashboard/profile');
  };

  const handleSettingsClick = () => {
    setShowProfileMenu(false);
    navigate('/dashboard/settings');
  };

  const handleLogout = () => {
    setShowProfileMenu(false);
    // Clear authentication data (adjust according to your auth implementation)
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    // Redirect to login or home
    navigate('/login');
  };

  const userName = "Muhammed Kamil";
  const userRole = "Product Manager";
  const userInitials = "MK";

  return (
    <>
      <header className="dashboard-header">
        <div className="header-left">
          <button className="mobile-menu-toggle" onClick={onMenuClick} aria-label="Menu">
            <IconMenu />
          </button>
          <div className="search-bar">
            <IconSearch className="search-icon" />
            <input type="text" placeholder="Search anything..." aria-label="Search" />
          </div>
        </div>
        <div className="header-right">
          <button
            ref={notifButtonRef}
            className="notification-bell"
            onClick={toggleNotifPanel}
            aria-label="Notifications"
          >
            <IconBell />
          </button>
          <button className="theme-toggle" onClick={toggleTheme} aria-label="Toggle theme">
            {theme === 'light' ? <IconMoon /> : <IconSun />}
          </button>
          <div className="profile-wrapper" ref={profileRef}>
            <button
              className="profile-trigger"
              onClick={() => setShowProfileMenu(!showProfileMenu)}
              aria-label="Profile menu"
            >
              <div className="avatar">{userInitials}</div>
              <div className="user-details">
                <span className="user-name">{userName}</span>
                <span className="user-role">{userRole}</span>
              </div>
              <IconChevronDown className={`chevron ${showProfileMenu ? 'rotated' : ''}`} />
            </button>
            {showProfileMenu && (
              <div className="dropdown profile-dropdown">
                <div className="profile-header">
                  <div className="avatar-large">{userInitials}</div>
                  <div className="profile-info">
                    <div className="profile-name">{userName}</div>
                    <div className="profile-email">muhammed.kamil@example.com</div>
                  </div>
                </div>
                <div className="dropdown-divider" />
                <div className="dropdown-item" onClick={handleProfileClick}>
                  <IconUser />
                  <span>My Profile</span>
                </div>
                <div className="dropdown-item" onClick={handleSettingsClick}>
                  <IconSettings />
                  <span>Settings</span>
                </div>
                <div className="dropdown-divider" />
                <div className="dropdown-item logout-item" onClick={handleLogout}>
                  <IconLogout />
                  <span>Logout</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </header>
      <NotificationPanel isOpen={notifPanelOpen} onClose={closeNotifPanel} />
    </>
  );
};

export default DashboardHeader;