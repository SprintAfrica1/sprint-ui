// src/pages/customer-dashboard/Overview.tsx
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
import '../../assets/css/Overview.css';
import PickupModal from '../../components/PickupModal';

// Icons
const IconWallet: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" {...props}>
    <rect x="2" y="5" width="20" height="14" rx="2" />
    <path d="M17 12h.01" />
  </svg>
);

const IconPackage: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" {...props}>
    <path d="M3 6h18v12H3V6z" />
    <path d="M8 6v4" />
    <path d="M16 6v4" />
    <path d="M3 10h18" />
  </svg>
);

const IconTruck: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" {...props}>
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

const IconUser: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" {...props}>
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
);

// New icon for withdraw button
const IconArrowRight: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" {...props}>
    <path d="M5 12h14M12 5l7 7-7 7" />
  </svg>
);

// Mock Data (unchanged)
const chartData = [
  { day: 'Mon', amount: 12500 },
  { day: 'Tue', amount: 18200 },
  { day: 'Wed', amount: 9800 },
  { day: 'Thu', amount: 15300 },
  { day: 'Fri', amount: 22700 },
  { day: 'Sat', amount: 18400 },
  { day: 'Sun', amount: 13100 },
];

const recentOrders = [
  { id: 'SP-001', date: '2025-03-25', amount: 4500, status: 'delivered', from: 'Lagos Island', to: 'Abuja' },
  { id: 'SP-002', date: '2025-03-24', amount: 6800, status: 'in-transit', from: 'Ikeja', to: 'Lagos' },
  { id: 'SP-003', date: '2025-03-23', amount: 3200, status: 'pending', from: 'Abeokuta', to: 'Ikeja' },
  { id: 'SP-004', date: '2025-03-22', amount: 12500, status: 'delivered', from: 'Port Harcourt', to: 'Enugu' },
];

const liveDeliveries = [
  { id: 'SP-LIVE-871', from: 'Lagos Island', to: 'Ikeja', progress: 65, time: '8 min ago', courier: 'Musa K.', avatar: 'https://randomuser.me/api/portraits/men/32.jpg' },
  { id: 'SP-LIVE-872', from: 'Surulere', to: 'Victoria Island', progress: 30, time: '14 min ago', courier: 'Amina T.', avatar: 'https://randomuser.me/api/portraits/women/68.jpg' },
  { id: 'SP-LIVE-873', from: 'Yaba', to: 'Lekki', progress: 90, time: '3 min ago', courier: 'Chidi O.', avatar: 'https://randomuser.me/api/portraits/men/45.jpg' },
];

const onlineCouriers = [
  { name: 'Musa K.', status: 'delivering', avatar: 'https://randomuser.me/api/portraits/men/32.jpg' },
  { name: 'Amina T.', status: 'available', avatar: 'https://randomuser.me/api/portraits/women/68.jpg' },
  { name: 'Chidi O.', status: 'delivering', avatar: 'https://randomuser.me/api/portraits/men/45.jpg' },
  { name: 'Bola A.', status: 'available', avatar: 'https://randomuser.me/api/portraits/women/12.jpg' },
  { name: 'Emeka N.', status: 'delivering', avatar: 'https://randomuser.me/api/portraits/men/22.jpg' },
];

const formatCurrency = (amount: number) =>
  new Intl.NumberFormat('en-NG', { style: 'currency', currency: 'NGN', minimumFractionDigits: 0 }).format(amount);

const getStatusClass = (status: string) => {
  switch (status) {
    case 'delivered': return 'status-delivered';
    case 'pending': return 'status-pending';
    case 'in-transit': return 'status-in-transit';
    default: return '';
  }
};

const DashboardOverview: React.FC = () => {
  const [userName] = useState('John');
  const [walletBalance, setWalletBalance] = useState(45750);
  const [totalDeliveries] = useState(23);
  const [activeDeliveries, setActiveDeliveries] = useState(12);
  const [savings] = useState(12800);
  const [isPickupModalOpen, setIsPickupModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const currentDate = new Date().toLocaleDateString('en-NG', {
    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',
  });

  useEffect(() => {
    const interval = setInterval(() => {
      if (Math.random() > 0.7) setActiveDeliveries((p) => p + 1);
      if (Math.random() > 0.85) setWalletBalance((p) => p + 250);
    }, 9000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (toastMessage) {
      const timer = setTimeout(() => setToastMessage(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [toastMessage]);

  const handlePickupSuccess = () => {
    setToastMessage({ type: 'success', text: 'Pickup request sent! A courier will be assigned shortly.' });
  };

  return (
    <div className="overview-container">
      <div className="overview-header">
        <h1>Welcome back, {userName}!</h1>
        <p>{currentDate} • Lagos Operations</p>
      </div>

      <div className="overview-grid">
        {/* LEFT COLUMN - MAIN CONTENT */}
        <div className="main-column">
          {/* PREMIUM ATM WALLET CARD */}
          <div className="wallet-card-container">
            <div className="sprint-atm-card">
              <div className="card-visual">
                <div className="cloud-effect cloud-1" />
                <div className="cloud-effect cloud-2" />
                <div className="cloud-effect cloud-3" />
                <div className="glow-effect" />
                <div className="card-header-row">
                  <div className="card-brand">SPRINT</div>
                  <div className="card-chip">
                    <div className="chip-line" />
                    <div className="chip-line" />
                    <div className="chip-dot" />
                  </div>
                </div>
                <div className="card-number">•••• •••• •••• 4281</div>
                <div className="card-holder-row">
                  <div className="info-group">
                    <small>CARD HOLDER</small>
                    <p>{userName.toUpperCase()}</p>
                  </div>
                  <div className="info-group">
                    <small>VALID THRU</small>
                    <p>03/28</p>
                  </div>
                </div>
                <div className="card-pattern" />
                <div className="card-shine" />
              </div>

              <div className="card-data">
                <div className="balance-box">
                  <h2 className="balance-amount">{formatCurrency(walletBalance)}</h2>
                  <small>Current balance</small>
                </div>
                <div className="card-actions-row">
                  <Link to="/dashboard/wallet" className="btn-fund">
                    <IconWallet /> FUND WALLET
                  </Link>
                  <button className="btn-withdraw">
                    <IconArrowRight /> WITHDRAW
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* METRICS */}
          <div className="metrics-grid">
            <div className="metric-card">
              <div className="metric-title">Total Deliveries</div>
              <div className="metric-value">{totalDeliveries}</div>
              <div className="metric-sub"><IconPackage /> Lifetime</div>
            </div>
            <div className="metric-card live-metric">
              <div className="metric-title">Active Deliveries</div>
              <div className="metric-value live-count">{activeDeliveries}</div>
              <div className="metric-sub"><IconTruck /> In progress</div>
            </div>
            <div className="metric-card">
              <div className="metric-title">Rewards</div>
              <div className="metric-value">{formatCurrency(savings)}</div>
              <div className="metric-sub"><IconTrendUp /> This month</div>
            </div>
          </div>

          {/* SPENDING CHART */}
          <div className="chart-section">
            <div className="chart-header">
              <div className="chart-title">Spending Trend (Last 7 Days)</div>
              <span className="chart-subtitle">₦142,300 total • +18% from last week</span>
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={chartData}>
                <defs>
                  <linearGradient id="colorAmount" x1="0" y1="0" x2="0" y2="1">
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
                <Area type="monotone" dataKey="amount" stroke="#fbbf24" strokeWidth={3} fillOpacity={1} fill="url(#colorAmount)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          {/* RECENT ORDERS */}
          <div className="recent-orders">
            <div className="recent-orders-header">
              <h3>Recent Orders</h3>
              <Link to="/dashboard/orders" className="view-all">View all orders →</Link>
            </div>
            <div className="orders-table">
              <table>
                <thead>
                  <tr>
                    <th>Order ID</th>
                    <th>Date</th>
                    <th>Route</th>
                    <th>Amount</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {recentOrders.map((order) => (
                    <tr key={order.id}>
                      <td className="order-id">{order.id}</td>
                      <td>{order.date}</td>
                      <td className="route">{order.from} → {order.to}</td>
                      <td className="amount">{formatCurrency(order.amount)}</td>
                      <td>
                        <span className={`status-badge ${getStatusClass(order.status)}`}>
                          {order.status.replace('-', ' ')}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN - LIVE MAP & COURIERS */}
        <div className="live-map-column">
          <div className="live-map-card">
            <div className="live-map-header">
              <div className="live-map-title">
                <IconMapPin />
                <span>Live Deliveries in Lagos</span>
              </div>
              <div className="live-dot">
                <span className="pulse" /> LIVE
              </div>
            </div>

            <div className="map-container">
              <div className="map-bg">
                <div className="delivery-pin" style={{ top: '28%', left: '22%' }}>
                  <div className="pin-dot" />
                  <div className="pin-pulse" />
                  <span className="pin-label">Lagos Island</span>
                </div>
                <div className="delivery-pin" style={{ top: '45%', left: '48%' }}>
                  <div className="pin-dot" />
                  <div className="pin-pulse" />
                  <span className="pin-label">Ikeja</span>
                </div>
                <div className="delivery-pin" style={{ top: '62%', left: '15%' }}>
                  <div className="pin-dot" />
                  <div className="pin-pulse" />
                  <span className="pin-label">Surulere</span>
                </div>
                <div className="delivery-pin" style={{ top: '18%', left: '68%' }}>
                  <div className="pin-dot" />
                  <div className="pin-pulse" />
                  <span className="pin-label">Victoria Island</span>
                </div>
                <div className="delivery-pin" style={{ top: '71%', left: '55%' }}>
                  <div className="pin-dot" />
                  <div className="pin-pulse" />
                  <span className="pin-label">Lekki</span>
                </div>
              </div>

              <div className="map-overlay">
                <div className="map-stats">
                  <div>14 couriers online</div>
                  <div>3.2 min avg. pickup time</div>
                </div>
              </div>
            </div>

            {/* COURIERS ONLINE SECTION + REQUEST PICKUP BUTTON */}
            <div className="couriers-online">
              <div className="couriers-header">
                <h4><IconUser /> Couriers Online ({onlineCouriers.length})</h4>
                <span className="refresh-badge">Live</span>
              </div>
              <div className="couriers-list">
                {onlineCouriers.map((courier, idx) => (
                  <div key={idx} className="courier-item">
                    <img src={courier.avatar} alt={courier.name} className="courier-avatar" />
                    <div className="courier-info">
                      <span className="courier-name">{courier.name}</span>
                      <span className={`courier-status ${courier.status}`}>
                        {courier.status === 'delivering' ? '🚚 Delivering' : '✅ Available'}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
              <div className="request-pickup">
                <button className="request-pickup-btn" onClick={() => setIsPickupModalOpen(true)}>
                  + Request Pickup
                </button>
              </div>
            </div>

            {/* LIVE DELIVERY UPDATES */}
            <div className="live-list">
              <h4>Currently Moving ({liveDeliveries.length})</h4>
              {liveDeliveries.map((delivery) => (
                <div key={delivery.id} className="live-item">
                  <div className="live-item-info">
                    <span className="live-id">{delivery.id}</span>
                    <span className="live-route">{delivery.from} → {delivery.to}</span>
                  </div>
                  <div className="live-progress">
                    <div className="progress-bar">
                      <div className="progress-fill" style={{ width: `${delivery.progress}%` }} />
                    </div>
                    <span className="progress-text">{delivery.progress}% • {delivery.time}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <PickupModal
        isOpen={isPickupModalOpen}
        onClose={() => setIsPickupModalOpen(false)}
        onSuccess={handlePickupSuccess}
      />

      {toastMessage && (
        <div className={`toast-notification ${toastMessage.type}`}>
          {toastMessage.text}
        </div>
      )}
    </div>
  );
};

export default DashboardOverview;