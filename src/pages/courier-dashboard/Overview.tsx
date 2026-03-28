import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import '../../assets/css/CourierOverview.css';

// Icons (same as before, plus a few more)
const IconPackage: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" {...props}>
    <path d="M3 6h18v12H3V6z" />
    <path d="M8 6v4" />
    <path d="M16 6v4" />
    <path d="M3 10h18" />
  </svg>
);

const IconTruck: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" {...props}>
    <rect x="1" y="8" width="13" height="11" rx="2" />
    <path d="M14 12h4l3 4v3h-7V12z" />
    <circle cx="5.5" cy="19.5" r="1.5" />
    <circle cx="17.5" cy="19.5" r="1.5" />
  </svg>
);

const IconTrendUp: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" {...props}>
    <path d="M18 15L12 9L8 13L2 7" />
    <path d="M22 15L12 5L8 9L2 3" />
  </svg>
);

const IconMapPin: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" {...props}>
    <path d="M20 10c0 4.993-5.539 9-10 9s-10-4.007-10-9a10 10 0 0 1 20 0Z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
);

const IconCheckCircle: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" {...props}>
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
    <polyline points="22 4 12 14.01 9 11.01" />
  </svg>
);

const IconClock: React.FC<React.SVGProps<SVGSVGElement>> = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="12" cy="12" r="10" />
    <polyline points="12 6 12 12 16 14" />
  </svg>
);

const IconFlag: React.FC<React.SVGProps<SVGSVGElement>> = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
    <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z" />
    <line x1="4" y1="22" x2="4" y2="15" />
  </svg>
);

const IconCar: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" {...props}>
    <path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.5 2.8C2.1 11.4 2 12 2 12.5V16c0 .6.4 1 1 1h2" />
    <circle cx="7" cy="17" r="2" />
    <circle cx="17" cy="17" r="2" />
  </svg>
);

// Mock Data
const chartData = [
  { day: 'Mon', earnings: 4500 },
  { day: 'Tue', earnings: 6200 },
  { day: 'Wed', earnings: 3800 },
  { day: 'Thu', earnings: 7100 },
  { day: 'Fri', earnings: 8900 },
  { day: 'Sat', earnings: 5200 },
  { day: 'Sun', earnings: 3400 },
];

const recentDeliveries = [
  { id: 'DL-001', customer: 'John Doe', from: 'Ikeja', to: 'Lagos Island', status: 'delivered', earnings: 2500, time: '2 hours ago' },
  { id: 'DL-002', customer: 'Amina T.', from: 'Surulere', to: 'Victoria Island', status: 'in-progress', earnings: 1800, time: '30 min ago' },
  { id: 'DL-003', customer: 'Chidi O.', from: 'Yaba', to: 'Lekki', status: 'pending', earnings: 3200, time: '1 hour ago' },
  { id: 'DL-004', customer: 'Bola A.', from: 'Ajah', to: 'Ikeja', status: 'delivered', earnings: 2100, time: 'Yesterday' },
];

const formatCurrency = (amount: number) =>
  new Intl.NumberFormat('en-NG', { style: 'currency', currency: 'NGN', minimumFractionDigits: 0 }).format(amount);

const getStatusClass = (status: string) => {
  switch (status) {
    case 'delivered': return 'status-delivered';
    case 'in-progress': return 'status-in-progress';
    case 'pending': return 'status-pending';
    default: return '';
  }
};

const CourierOverview: React.FC = () => {
  const [userName] = useState('Musa');
  const [todayDeliveries] = useState(5);
  const [completedDeliveries] = useState(2);
  const [pendingDeliveries] = useState(3);
  const [totalEarnings] = useState(12800);
  const [activeDelivery, setActiveDelivery] = useState<{ from: string; to: string; progress: number } | null>({
    from: 'Ikeja',
    to: 'Lagos Island',
    progress: 45,
  });

  const currentDate = new Date().toLocaleDateString('en-NG', {
    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',
  });

  // Simulate live progress update (every 3 seconds)
  useEffect(() => {
    if (!activeDelivery) return;
    const interval = setInterval(() => {
      setActiveDelivery(prev => {
        if (!prev) return null;
        const newProgress = prev.progress + 5;
        if (newProgress >= 100) {
          clearInterval(interval);
          return { ...prev, progress: 100 };
        }
        return { ...prev, progress: newProgress };
      });
    }, 3000);
    return () => clearInterval(interval);
  }, [activeDelivery]);

  // Calculate remaining distance and ETA
  const distanceRemaining = Math.round((100 - (activeDelivery?.progress || 0)) * 0.12); // mock km
  const etaMinutes = Math.round(distanceRemaining * 2.5); // mock minutes

  return (
    <div className="courier-overview-container">
      <div className="courier-header">
        <h1>Welcome back, {userName}!</h1>
        <p>{currentDate} • Lagos Operations</p>
      </div>

      <div className="courier-grid">
        {/* LEFT COLUMN */}
        <div className="courier-left">
          {/* Metrics */}
          <div className="metrics-grid">
            <div className="metric-card">
              <div className="metric-title">Today's Deliveries</div>
              <div className="metric-value">{todayDeliveries}</div>
              <div className="metric-sub"><IconPackage /> Scheduled</div>
            </div>
            <div className="metric-card">
              <div className="metric-title">Completed</div>
              <div className="metric-value">{completedDeliveries}</div>
              <div className="metric-sub"><IconCheckCircle /> Done</div>
            </div>
            <div className="metric-card live-metric">
              <div className="metric-title">In Progress</div>
              <div className="metric-value">{pendingDeliveries}</div>
              <div className="metric-sub"><IconTruck /> Active</div>
            </div>
            <div className="metric-card">
              <div className="metric-title">Total Earnings</div>
              <div className="metric-value">{formatCurrency(totalEarnings)}</div>
              <div className="metric-sub"><IconTrendUp /> This week</div>
            </div>
          </div>

          {/* Earnings Chart */}
          <div className="chart-section">
            <div className="chart-header">
              <div className="chart-title">Earnings Trend (Last 7 Days)</div>
              <span className="chart-subtitle">₦39,100 total • +12% from last week</span>
            </div>
            <ResponsiveContainer width="100%" height={280}>
              <AreaChart data={chartData}>
                <defs>
                  <linearGradient id="colorEarnings" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#fbbf24" stopOpacity={0.85} />
                    <stop offset="95%" stopColor="#fbbf24" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border-light)" />
                <XAxis dataKey="day" stroke="var(--text-secondary)" tick={{ fill: 'var(--text-secondary)' }} />
                <YAxis
                  tickFormatter={(value) => `₦${value / 1000}k`}
                  stroke="var(--text-secondary)"
                  tick={{ fill: 'var(--text-secondary)' }}
                />
                <Tooltip
                  contentStyle={{ backgroundColor: 'var(--bg-primary)', borderColor: 'var(--border-light)', color: 'var(--text-primary)', borderRadius: '12px' }}
                  formatter={(value) => formatCurrency(value as number)}
                />
                <Area type="monotone" dataKey="earnings" stroke="#fbbf24" strokeWidth={3} fillOpacity={1} fill="url(#colorEarnings)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          {/* Recent Deliveries */}
          <div className="recent-deliveries">
            <div className="recent-header">
              <h3>Recent Deliveries</h3>
              <Link to="/courier/deliveries" className="view-all">View all →</Link>
            </div>
            <div className="deliveries-table">
              <table>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Customer</th>
                    <th>Route</th>
                    <th>Earnings</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {recentDeliveries.map((del) => (
                    <tr key={del.id}>
                      <td>{del.id}</td>
                      <td>{del.customer}</td>
                      <td>{del.from} → {del.to}</td>
                      <td>{formatCurrency(del.earnings)}</td>
                      <td>
                        <span className={`status-badge ${getStatusClass(del.status)}`}>
                          {del.status === 'in-progress' ? 'In Transit' : del.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN - LIVE MAP */}
        <div className="courier-right">
          <div className="live-map-card">
            <div className="live-map-header">
              <div className="live-map-title">
                <IconMapPin />
                <span>Live Delivery</span>
              </div>
              <div className="live-dot">
                <span className="pulse" /> LIVE
              </div>
            </div>
            <div className="map-container">
              <div className="map-background">
                {/* Map grid and street lines */}
                <div className="map-grid"></div>
                <div className="map-streets">
                  <div className="street horizontal"></div>
                  <div className="street vertical"></div>
                  <div className="street diagonal"></div>
                </div>
                {/* Route Path (Smooth Curve) */}
                <svg className="route-svg" viewBox="0 0 1000 360" preserveAspectRatio="none">
                  <defs>
                    <linearGradient id="routeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#fbbf24" />
                      <stop offset="100%" stopColor="#10b981" />
                    </linearGradient>
                    <filter id="glow">
                      <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                      <feMerge>
                        <feMergeNode in="coloredBlur"/>
                        <feMergeNode in="SourceGraphic"/>
                      </feMerge>
                    </filter>
                  </defs>
                  <path
                    d="M 50,180 Q 200,120 400,180 T 750,180 T 950,180"
                    fill="none"
                    stroke="url(#routeGradient)"
                    strokeWidth="6"
                    strokeDasharray="10 8"
                    filter="url(#glow)"
                  />
                </svg>

                {/* Pickup Marker */}
                <div className="marker pickup">
                  <div className="marker-icon">
                    <IconFlag />
                  </div>
                  <div className="marker-label">
                    <span className="marker-title">PICKUP</span>
                    <span className="marker-location">{activeDelivery?.from}</span>
                  </div>
                </div>

                {/* Dropoff Marker */}
                <div className="marker dropoff">
                  <div className="marker-icon">
                    <IconFlag />
                  </div>
                  <div className="marker-label">
                    <span className="marker-title">DROPOFF</span>
                    <span className="marker-location">{activeDelivery?.to}</span>
                  </div>
                </div>

                {/* Moving Car */}
                <div
                  className="vehicle"
                  style={{ left: `${activeDelivery?.progress || 0}%` }}
                >
                  <div className="vehicle-glow"></div>
                  <IconCar className="car-icon" />
                </div>
              </div>

              {/* Overlay with stats */}
              <div className="map-overlay">
                <div className="map-stats">
                  <div className="stat-item">
                    <IconClock />
                    <span>ETA: {etaMinutes} min</span>
                  </div>
                  <div className="stat-item">
                    <IconMapPin />
                    <span>{distanceRemaining} km left</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="delivery-progress">
              <div className="progress-bar">
                <div className="progress-fill" style={{ width: `${activeDelivery?.progress || 0}%` }} />
              </div>
              <p>{activeDelivery?.progress || 0}% completed • On track</p>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="quick-actions">
            <Link to="/courier/deliveries" className="action-btn-primary">
              <IconPackage /> View All Deliveries
            </Link>
            <Link to="/courier/earnings" className="action-btn-outline">
              <IconTrendUp /> Check Earnings
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourierOverview;