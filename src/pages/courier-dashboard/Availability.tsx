import React, { useState } from 'react';
import '../../assets/css/CourierAvailability.css';

// Icons (removed unused IconToggle)
const IconCalendar: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" {...props}>
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
    <line x1="16" y1="2" x2="16" y2="6" />
    <line x1="8" y1="2" x2="8" y2="6" />
    <line x1="3" y1="10" x2="21" y2="10" />
  </svg>
);

const IconHistory: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" {...props}>
    <circle cx="12" cy="12" r="10" />
    <polyline points="12 6 12 12 16 14" />
  </svg>
);

const IconCheck: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" {...props}>
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

const IconX: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" {...props}>
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

const IconSettings: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" {...props}>
    <path d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" />
    <path d="M19.4 15a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H5.78a1.65 1.65 0 0 0-1.51 1 1.65 1.65 0 0 0 .33 1.82l.04.04A10 10 0 0 0 12 17.66a10 10 0 0 0 6.36-2.62l.04-.04Z" />
  </svg>
);

// Mock data for weekly schedule
const initialSchedule = {
  Monday: { available: true, start: '09:00', end: '17:00' },
  Tuesday: { available: true, start: '09:00', end: '17:00' },
  Wednesday: { available: true, start: '09:00', end: '17:00' },
  Thursday: { available: true, start: '09:00', end: '17:00' },
  Friday: { available: true, start: '09:00', end: '17:00' },
  Saturday: { available: false, start: '', end: '' },
  Sunday: { available: false, start: '', end: '' },
};

// Mock history
const statusHistory = [
  { id: 1, date: '2025-03-26 10:30', status: 'available', source: 'Manual toggle' },
  { id: 2, date: '2025-03-26 09:15', status: 'busy', source: 'Auto (delivery accepted)' },
  { id: 3, date: '2025-03-25 17:00', status: 'offline', source: 'Schedule end' },
  { id: 4, date: '2025-03-25 09:00', status: 'available', source: 'Schedule start' },
];

const Availability: React.FC = () => {
  const [status, setStatus] = useState<'available' | 'busy' | 'offline'>('available');
  const [schedule] = useState(initialSchedule); // no unused setter
  const [showScheduleModal, setShowScheduleModal] = useState(false);
  const [toastMessage, setToastMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const handleStatusChange = (newStatus: 'available' | 'busy' | 'offline') => {
    setStatus(newStatus);
    setToastMessage({ type: 'success', text: `Status changed to ${newStatus}` });
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleScheduleSave = () => {
    setShowScheduleModal(false);
    setToastMessage({ type: 'success', text: 'Schedule updated!' });
    setTimeout(() => setToastMessage(null), 3000);
  };

  const getStatusClass = (s: string) => {
    switch (s) {
      case 'available': return 'status-available';
      case 'busy': return 'status-busy';
      default: return 'status-offline';
    }
  };

  const getDayStatus = (day: string) => {
    const daySchedule = schedule[day as keyof typeof schedule];
    if (!daySchedule.available) return 'offline';
    return 'available';
  };

  return (
    <div className="availability-page">
      <div className="availability-header">
        <h1>Availability</h1>
        <p>Manage your online status and working hours</p>
      </div>

      <div className="availability-grid">
        {/* Current Status Card */}
        <div className="status-card">
          <div className="status-header">
            <h2>Current Status</h2>
            <div className={`status-badge-large ${getStatusClass(status)}`}>
              {status === 'available' ? '✅ Available' : status === 'busy' ? '🔴 Busy' : '⚫ Offline'}
            </div>
          </div>
          <div className="status-actions">
            <button
              className={`status-btn ${status === 'available' ? 'active' : ''}`}
              onClick={() => handleStatusChange('available')}
            >
              <IconCheck /> Available
            </button>
            <button
              className={`status-btn ${status === 'busy' ? 'active' : ''}`}
              onClick={() => handleStatusChange('busy')}
            >
              <IconX /> Busy
            </button>
            <button
              className={`status-btn ${status === 'offline' ? 'active' : ''}`}
              onClick={() => handleStatusChange('offline')}
            >
              <IconSettings /> Offline
            </button>
          </div>
          <p className="status-note">
            {status === 'available' && 'You are visible to customers. You will receive pickup requests.'}
            {status === 'busy' && 'You are currently on a delivery. New requests will be queued.'}
            {status === 'offline' && 'You are offline. No requests will be sent.'}
          </p>
        </div>

        {/* Weekly Schedule Card */}
        <div className="schedule-card">
          <div className="schedule-header">
            <h2><IconCalendar /> Weekly Schedule</h2>
            <button className="edit-schedule-btn" onClick={() => setShowScheduleModal(true)}>
              <IconSettings /> Edit
            </button>
          </div>
          <div className="schedule-grid">
            {Object.entries(schedule).map(([day, data]) => (
              <div key={day} className={`schedule-day ${getDayStatus(day)}`}>
                <span className="day-name">{day.slice(0, 3)}</span>
                {data.available ? (
                  <span className="day-time">{data.start} – {data.end}</span>
                ) : (
                  <span className="day-off">Off</span>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* History Card */}
        <div className="history-card">
          <div className="history-header">
            <h2><IconHistory /> Recent Status Changes</h2>
          </div>
          <div className="history-list">
            {statusHistory.map(entry => (
              <div key={entry.id} className="history-item">
                <div className="history-time">{entry.date}</div>
                <div className={`history-status ${getStatusClass(entry.status)}`}>
                  {entry.status === 'available' ? 'Available' : entry.status === 'busy' ? 'Busy' : 'Offline'}
                </div>
                <div className="history-source">{entry.source}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Schedule Modal */}
      {showScheduleModal && (
        <div className="modal-overlay" onClick={() => setShowScheduleModal(false)}>
          <div className="modal-container" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Set Working Hours</h2>
              <button className="modal-close" onClick={() => setShowScheduleModal(false)}>✕</button>
            </div>
            <div className="modal-content">
              <p className="modal-note">This is a demo. In production, you'd set days and times here.</p>
              <div className="form-group">
                <label>Example: Monday – Friday, 9 AM – 5 PM</label>
                <select defaultValue="weekdays">
                  <option value="weekdays">Weekdays (Mon-Fri)</option>
                  <option value="custom">Custom</option>
                </select>
              </div>
              <div className="modal-actions">
                <button className="btn-secondary" onClick={() => setShowScheduleModal(false)}>Cancel</button>
                <button className="btn-primary" onClick={handleScheduleSave}>Save Schedule</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Toast Notification */}
      {toastMessage && (
        <div className={`toast-notification ${toastMessage.type}`}>
          {toastMessage.text}
        </div>
      )}
    </div>
  );
};

export default Availability;