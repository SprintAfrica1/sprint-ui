import React from 'react';
import '../assets/css/NotificationPanel.css';

interface NotificationPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

const NotificationPanel: React.FC<NotificationPanelProps> = ({ isOpen, onClose }) => {
  return (
    <div className={`notification-panel ${isOpen ? 'open' : ''}`}>
      <div className="panel-header">
        <h3>🔔 Notifications</h3>
        <button className="close-btn" onClick={onClose}>✕</button>
      </div>

      <div className="panel-content">
        <div className="notif-item">
          <div className="notif-icon">📦</div>
          <div className="notif-body">
            <div className="notif-title">Delivery Update</div>
            <div className="notif-desc">Order #SA-7842 has been picked up by courier</div>
            <div className="notif-time">Just now</div>
          </div>
        </div>

        <div className="notif-item">
          <div className="notif-icon">💰</div>
          <div className="notif-body">
            <div className="notif-title">Wallet Funded</div>
            <div className="notif-desc">₦45,000 was successfully added to your wallet</div>
            <div className="notif-time">1 hour ago</div>
          </div>
        </div>

        <div className="notif-item">
          <div className="notif-icon">🚀</div>
          <div className="notif-body">
            <div className="notif-title">System Update</div>
            <div className="notif-desc">Real-time tracking is now available for all deliveries</div>
            <div className="notif-time">Yesterday</div>
          </div>
        </div>

        <div className="notif-item">
          <div className="notif-icon">⭐</div>
          <div className="notif-body">
            <div className="notif-title">New Feature</div>
            <div className="notif-desc">You can now rate couriers after delivery</div>
            <div className="notif-time">2 days ago</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotificationPanel;