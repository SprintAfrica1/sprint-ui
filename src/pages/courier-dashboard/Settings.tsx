import React, { useState } from 'react';
import '../../assets/css/Settings.css';

// Icons
const IconBell: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" {...props}>
    <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
    <path d="M13.73 21a2 2 0 0 1-3.46 0" />
  </svg>
);

const IconLock: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" {...props}>
    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
  </svg>
);

const IconGlobe: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" {...props}>
    <circle cx="12" cy="12" r="10" />
    <line x1="2" y1="12" x2="22" y2="12" />
    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
  </svg>
);

const IconMoon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" {...props}>
    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
  </svg>
);

const IconSun: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" {...props}>
    <circle cx="12" cy="12" r="5" />
    <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
  </svg>
);

const IconTrash: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" {...props}>
    <polyline points="3 6 5 6 21 6" />
    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
    <line x1="10" y1="11" x2="10" y2="17" />
    <line x1="14" y1="11" x2="14" y2="17" />
  </svg>
);

const IconChevronDown: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" {...props}>
    <polyline points="6 9 12 15 18 9" />
  </svg>
);

const IconPause: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" {...props}>
    <rect x="6" y="4" width="4" height="16" />
    <rect x="14" y="4" width="4" height="16" />
  </svg>
);

const CourierSettings: React.FC = () => {
  const [sections, setSections] = useState({
    notifications: true,
    appearance: true,
    security: true,
    pause: true,
    danger: true,
  });

  const [showPasswordForm, setShowPasswordForm] = useState(false);
  const [passwordData, setPasswordData] = useState({
    current: '',
    new: '',
    confirm: '',
  });
  const [toastMessage, setToastMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [pauseDeliveries, setPauseDeliveries] = useState(false);

  const [notifications, setNotifications] = useState({
    email: true,
    push: true,
    sms: false,
  });
  const [language, setLanguage] = useState('en');
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    return (localStorage.getItem('theme') as 'light' | 'dark') || 'light';
  });

  const toggleSection = (section: keyof typeof sections) => {
    setSections(prev => ({ ...prev, [section]: !prev[section] }));
  };

  const handleNotificationToggle = (key: keyof typeof notifications) => {
    setNotifications(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const handleThemeChange = (newTheme: 'light' | 'dark') => {
    setTheme(newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
  };

  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setLanguage(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPasswordData(prev => ({ ...prev, [name]: value }));
  };

  const submitPasswordChange = (e: React.FormEvent) => {
    e.preventDefault();
    if (passwordData.new !== passwordData.confirm) {
      setToastMessage({ type: 'error', text: 'New passwords do not match.' });
      setTimeout(() => setToastMessage(null), 3000);
      return;
    }
    // Simulate API call
    setToastMessage({ type: 'success', text: 'Password changed successfully!' });
    setTimeout(() => setToastMessage(null), 3000);
    setShowPasswordForm(false);
    setPasswordData({ current: '', new: '', confirm: '' });
  };

  const handlePauseToggle = () => {
    setPauseDeliveries(!pauseDeliveries);
    setToastMessage({ type: 'success', text: pauseDeliveries ? 'You are now available for deliveries' : 'You have paused new deliveries' });
    setTimeout(() => setToastMessage(null), 3000);
  };

  return (
    <div className="settings-page">
      <div className="settings-header">
        <h1>Settings</h1>
        <p>Manage your account preferences</p>
      </div>

      <div className="settings-card">
        {/* Notifications Section */}
        <div className="settings-section">
          <div className="section-header" onClick={() => toggleSection('notifications')}>
            <IconBell />
            <h2>Notifications</h2>
            <IconChevronDown className={`chevron ${sections.notifications ? 'rotated' : ''}`} />
          </div>
          {sections.notifications && (
            <div className="section-content">
              <div className="setting-item">
                <div className="setting-info">
                  <span>Email Notifications</span>
                  <p>Receive order updates and promotions via email</p>
                </div>
                <label className="toggle-switch">
                  <input type="checkbox" checked={notifications.email} onChange={() => handleNotificationToggle('email')} />
                  <span className="toggle-slider"></span>
                </label>
              </div>
              <div className="setting-item">
                <div className="setting-info">
                  <span>Push Notifications</span>
                  <p>Get real-time alerts on your device</p>
                </div>
                <label className="toggle-switch">
                  <input type="checkbox" checked={notifications.push} onChange={() => handleNotificationToggle('push')} />
                  <span className="toggle-slider"></span>
                </label>
              </div>
              <div className="setting-item">
                <div className="setting-info">
                  <span>SMS Notifications</span>
                  <p>Receive delivery updates via text message</p>
                </div>
                <label className="toggle-switch">
                  <input type="checkbox" checked={notifications.sms} onChange={() => handleNotificationToggle('sms')} />
                  <span className="toggle-slider"></span>
                </label>
              </div>
            </div>
          )}
        </div>

        {/* Appearance Section */}
        <div className="settings-section">
          <div className="section-header" onClick={() => toggleSection('appearance')}>
            <IconGlobe />
            <h2>Appearance</h2>
            <IconChevronDown className={`chevron ${sections.appearance ? 'rotated' : ''}`} />
          </div>
          {sections.appearance && (
            <div className="section-content">
              <div className="setting-item">
                <div className="setting-info">
                  <span>Theme</span>
                  <p>Choose between light and dark mode</p>
                </div>
                <div className="theme-buttons">
                  <button className={`theme-btn ${theme === 'light' ? 'active' : ''}`} onClick={() => handleThemeChange('light')}>
                    <IconSun /> Light
                  </button>
                  <button className={`theme-btn ${theme === 'dark' ? 'active' : ''}`} onClick={() => handleThemeChange('dark')}>
                    <IconMoon /> Dark
                  </button>
                </div>
              </div>
              <div className="setting-item">
                <div className="setting-info">
                  <span>Language</span>
                  <p>Select your preferred language</p>
                </div>
                <select value={language} onChange={handleLanguageChange} className="language-select">
                  <option value="en">English</option>
                  <option value="fr">French</option>
                  <option value="es">Spanish</option>
                  <option value="ar">Arabic</option>
                </select>
              </div>
            </div>
          )}
        </div>

        {/* Pause Deliveries Section */}
        <div className="settings-section">
          <div className="section-header" onClick={() => toggleSection('pause')}>
            <IconPause />
            <h2>Pause Deliveries</h2>
            <IconChevronDown className={`chevron ${sections.pause ? 'rotated' : ''}`} />
          </div>
          {sections.pause && (
            <div className="section-content">
              <div className="setting-item">
                <div className="setting-info">
                  <span>Pause new delivery requests</span>
                  <p>When paused, you won't receive new pickup requests</p>
                </div>
                <label className="toggle-switch">
                  <input type="checkbox" checked={pauseDeliveries} onChange={handlePauseToggle} />
                  <span className="toggle-slider"></span>
                </label>
              </div>
              {pauseDeliveries && (
                <div className="pause-note">
                  <p>⚠️ You are currently paused. No new deliveries will be assigned.</p>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Security Section */}
        <div className="settings-section">
          <div className="section-header" onClick={() => toggleSection('security')}>
            <IconLock />
            <h2>Security</h2>
            <IconChevronDown className={`chevron ${sections.security ? 'rotated' : ''}`} />
          </div>
          {sections.security && (
            <div className="section-content">
              <div className="setting-item">
                <div className="setting-info">
                  <span>Change Password</span>
                  <p>Update your password to keep your account secure</p>
                </div>
                <button className="action-btn" onClick={() => setShowPasswordForm(!showPasswordForm)}>
                  {showPasswordForm ? 'Cancel' : 'Change Password'}
                </button>
              </div>
              {showPasswordForm && (
                <div className="password-form">
                  <form onSubmit={submitPasswordChange}>
                    <div className="form-group">
                      <label>Current Password</label>
                      <input type="password" name="current" value={passwordData.current} onChange={handlePasswordChange} required />
                    </div>
                    <div className="form-group">
                      <label>New Password</label>
                      <input type="password" name="new" value={passwordData.new} onChange={handlePasswordChange} required />
                    </div>
                    <div className="form-group">
                      <label>Confirm New Password</label>
                      <input type="password" name="confirm" value={passwordData.confirm} onChange={handlePasswordChange} required />
                    </div>
                    <div className="form-actions">
                      <button type="submit" className="save-btn">Update Password</button>
                      <button type="button" className="cancel-btn" onClick={() => setShowPasswordForm(false)}>Cancel</button>
                    </div>
                  </form>
                </div>
              )}
              <div className="setting-item">
                <div className="setting-info">
                  <span>Two-Factor Authentication</span>
                  <p>Add an extra layer of security to your account</p>
                </div>
                <button className="action-btn">Enable 2FA</button>
              </div>
            </div>
          )}
        </div>

        {/* Danger Zone Section */}
        <div className="settings-section danger-zone">
          <div className="section-header" onClick={() => toggleSection('danger')}>
            <IconTrash />
            <h2>Danger Zone</h2>
            <IconChevronDown className={`chevron ${sections.danger ? 'rotated' : ''}`} />
          </div>
          {sections.danger && (
            <div className="section-content">
              <div className="setting-item">
                <div className="setting-info">
                  <span>Delete Account</span>
                  <p>Permanently delete your account and all data</p>
                </div>
                <button className="danger-btn">Delete Account</button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Toast Notification */}
      {toastMessage && (
        <div className={`toast-notification ${toastMessage.type}`}>
          {toastMessage.text}
        </div>
      )}
    </div>
  );
};

export default CourierSettings;