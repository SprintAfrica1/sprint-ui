import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../../assets/css/Orders.css';

const formatCurrency = (amount: number) =>
  new Intl.NumberFormat('en-NG', { style: 'currency', currency: 'NGN', minimumFractionDigits: 0 }).format(amount);

const formatDate = (dateStr: string) => {
  const date = new Date(dateStr);
  return date.toLocaleDateString('en-NG', { year: 'numeric', month: 'long', day: 'numeric' });
};

const getStatusClass = (status: string) => {
  switch (status) {
    case 'delivered': return 'status-delivered';
    case 'pending': return 'status-pending';
    case 'in-transit': return 'status-in-transit';
    default: return '';
  }
};

const mockOrders = [
  {
    id: 'SP-001',
    date: '2025-03-25',
    amount: 4500,
    status: 'delivered',
    from: 'Lagos Island',
    to: 'Abuja',
    tracking: 'TRK001',
    customer: 'John Doe',
    phone: '08012345678',
    weight: '2.5 kg',
    dimensions: '30x20x15 cm',
    items: ['Document envelope', 'Small package'],
    deliveredAt: '2025-03-26 14:30',
    notes: 'Left at security gate',
  },
  {
    id: 'SP-002',
    date: '2025-03-24',
    amount: 6800,
    status: 'in-transit',
    from: 'Ikeja',
    to: 'Lagos',
    tracking: 'TRK002',
    customer: 'Jane Smith',
    phone: '08098765432',
    weight: '5 kg',
    dimensions: '40x30x20 cm',
    items: ['Electronics', 'Clothing'],
    eta: '2025-03-27 10:00',
    courier: 'Musa K.',
  },
  {
    id: 'SP-003',
    date: '2025-03-23',
    amount: 3200,
    status: 'pending',
    from: 'Abeokuta',
    to: 'Ikeja',
    tracking: 'TRK003',
    customer: 'Ahmed Bello',
    phone: '08011223344',
    weight: '1.2 kg',
    dimensions: '20x15x10 cm',
    items: ['Book', 'Gift card'],
    pickupWindow: '2025-03-27 09:00 - 12:00',
  },
  {
    id: 'SP-004',
    date: '2025-03-22',
    amount: 12500,
    status: 'delivered',
    from: 'Port Harcourt',
    to: 'Enugu',
    tracking: 'TRK004',
    customer: 'Chioma Okafor',
    phone: '08099887766',
    weight: '8 kg',
    dimensions: '50x40x30 cm',
    items: ['Furniture parts'],
    deliveredAt: '2025-03-24 16:45',
    notes: 'Call before delivery',
  },
];

const Orders: React.FC = () => {
  const [filter, setFilter] = useState('all');
  const [selectedOrder, setSelectedOrder] = useState<typeof mockOrders[0] | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  const filteredOrders = mockOrders.filter(order => filter === 'all' || order.status === filter);

  const openDetails = (order: typeof mockOrders[0]) => {
    setSelectedOrder(order);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedOrder(null);
  };

  return (
    <>
      <div className="orders-page">
        <div className="orders-header">
          <h1>My Orders</h1>
          <p>View and manage all your deliveries</p>
        </div>

        <div className="orders-filter">
          <button className={`filter-btn ${filter === 'all' ? 'active' : ''}`} onClick={() => setFilter('all')}>All</button>
          <button className={`filter-btn ${filter === 'in-transit' ? 'active' : ''}`} onClick={() => setFilter('in-transit')}>In Transit</button>
          <button className={`filter-btn ${filter === 'pending' ? 'active' : ''}`} onClick={() => setFilter('pending')}>Pending</button>
          <button className={`filter-btn ${filter === 'delivered' ? 'active' : ''}`} onClick={() => setFilter('delivered')}>Delivered</button>
        </div>

        <div className="orders-list">
          {filteredOrders.map(order => (
            <div key={order.id} className="order-card">
              <div className="order-header">
                <div className="order-id">Order #{order.id}</div>
                <div className={`order-status ${getStatusClass(order.status)}`}>
                  {order.status.replace('-', ' ')}
                </div>
              </div>
              <div className="order-details">
                <div className="order-route">
                  <span>From: {order.from}</span>
                  <span>→</span>
                  <span>To: {order.to}</span>
                </div>
                <div className="order-date">Date: {order.date}</div>
                <div className="order-amount">{formatCurrency(order.amount)}</div>
              </div>
              <div className="order-actions">
                <Link to={`/dashboard/tracking/${order.tracking}`} className="btn-track">Track Order</Link>
                <button className="btn-details" onClick={() => openDetails(order)}>View Details</button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal for Order Details */}
      {modalOpen && selectedOrder && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-container" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Order Details</h2>
              <button className="modal-close" onClick={closeModal}>✕</button>
            </div>
            <div className="modal-content">
              <div className="receipt-header">
                <div className="receipt-title">SPRINT LOGISTICS</div>
                <div className="receipt-order">Order #{selectedOrder.id}</div>
                <div className="receipt-date">Placed on {formatDate(selectedOrder.date)}</div>
              </div>

              <div className="receipt-section">
                <h3>Shipment Details</h3>
                <div className="info-row">
                  <span className="info-label">From:</span>
                  <span className="info-value">{selectedOrder.from}</span>
                </div>
                <div className="info-row">
                  <span className="info-label">To:</span>
                  <span className="info-value">{selectedOrder.to}</span>
                </div>
                <div className="info-row">
                  <span className="info-label">Weight:</span>
                  <span className="info-value">{selectedOrder.weight}</span>
                </div>
                <div className="info-row">
                  <span className="info-label">Dimensions:</span>
                  <span className="info-value">{selectedOrder.dimensions}</span>
                </div>
                <div className="info-row">
                  <span className="info-label">Items:</span>
                  <span className="info-value">{selectedOrder.items.join(', ')}</span>
                </div>
              </div>

              <div className="receipt-section">
                <h3>Payment Information</h3>
                <div className="info-row">
                  <span className="info-label">Amount:</span>
                  <span className="info-value highlight">{formatCurrency(selectedOrder.amount)}</span>
                </div>
                <div className="info-row">
                  <span className="info-label">Payment Method:</span>
                  <span className="info-value">Wallet / Card</span>
                </div>
              </div>

              <div className="receipt-section">
                <h3>Status Timeline</h3>
                <div className="timeline">
                  <div className="timeline-item">
                    <div className="timeline-dot done"></div>
                    <div className="timeline-content">
                      <div className="timeline-title">Order Placed</div>
                      <div className="timeline-date">{formatDate(selectedOrder.date)}</div>
                    </div>
                  </div>
                  {selectedOrder.status !== 'pending' && (
                    <div className="timeline-item">
                      <div className={`timeline-dot ${selectedOrder.status === 'in-transit' || selectedOrder.status === 'delivered' ? 'done' : ''}`}></div>
                      <div className="timeline-content">
                        <div className="timeline-title">Picked Up</div>
                        <div className="timeline-date">
                          {selectedOrder.status === 'pending' ? 'Awaiting pickup' : 'Pickup completed'}
                        </div>
                      </div>
                    </div>
                  )}
                  {selectedOrder.status === 'in-transit' && (
                    <div className="timeline-item">
                      <div className="timeline-dot in-progress"></div>
                      <div className="timeline-content">
                        <div className="timeline-title">In Transit</div>
                        <div className="timeline-date">Estimated arrival: {selectedOrder.eta || 'Soon'}</div>
                      </div>
                    </div>
                  )}
                  {selectedOrder.status === 'delivered' && (
                    <div className="timeline-item">
                      <div className="timeline-dot done"></div>
                      <div className="timeline-content">
                        <div className="timeline-title">Delivered</div>
                        <div className="timeline-date">{selectedOrder.deliveredAt ? formatDate(selectedOrder.deliveredAt) : 'Delivered'}</div>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {selectedOrder.notes && (
                <div className="receipt-section">
                  <h3>Special Notes</h3>
                  <p className="notes-text">{selectedOrder.notes}</p>
                </div>
              )}

              <div className="receipt-footer">
                <Link to={`/dashboard/tracking/${selectedOrder.tracking}`} className="modal-track-btn">Track on Map</Link>
                <button className="modal-close-btn" onClick={closeModal}>Close</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Orders;