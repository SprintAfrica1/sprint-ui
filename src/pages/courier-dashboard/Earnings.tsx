import React, { useState } from 'react';
import '../../assets/css/CourierEarnings.css';

// Icons (removed unused IconEarnings)
const IconArrowRight: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" {...props}>
    <path d="M5 12h14M12 5l7 7-7 7" />
  </svg>
);

const IconBank: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" {...props}>
    <path d="M3 10h18M6 10v7M10 10v7M14 10v7M18 10v7M4 21h16" />
    <path d="M12 3L2 8h20L12 3z" />
  </svg>
);

const IconHistory: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" {...props}>
    <circle cx="12" cy="12" r="10" />
    <polyline points="12 6 12 12 16 14" />
  </svg>
);

const IconCalendar: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" {...props}>
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
    <line x1="16" y1="2" x2="16" y2="6" />
    <line x1="8" y1="2" x2="8" y2="6" />
    <line x1="3" y1="10" x2="21" y2="10" />
  </svg>
);

const IconTruck: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" {...props}>
    <rect x="1" y="8" width="13" height="11" rx="2" />
    <path d="M14 12h4l3 4v3h-7V12z" />
    <circle cx="5.5" cy="19.5" r="1.5" />
    <circle cx="17.5" cy="19.5" r="1.5" />
  </svg>
);

const formatCurrency = (amount: number) =>
  new Intl.NumberFormat('en-NG', { style: 'currency', currency: 'NGN', minimumFractionDigits: 0 }).format(amount);

// Mock earnings data
const mockEarnings = {
  balance: 128500,
  thisWeek: 32500,
  thisMonth: 128500,
  total: 248200,
};

// Mock payout transactions
const mockPayouts = [
  { id: 1, date: '2025-03-25', amount: 25000, status: 'completed', method: 'GTBank **** 1234' },
  { id: 2, date: '2025-03-18', amount: 18000, status: 'completed', method: 'GTBank **** 1234' },
  { id: 3, date: '2025-03-10', amount: 32000, status: 'completed', method: 'UBA **** 5678' },
  { id: 4, date: '2025-03-02', amount: 15000, status: 'pending', method: 'GTBank **** 1234' },
];

// Mock bank accounts
const mockBankAccounts = [
  { id: 1, bank: 'GTBank', accountNumber: '0123456789', accountName: 'Musa K.', isPrimary: true },
  { id: 2, bank: 'UBA', accountNumber: '9876543210', accountName: 'Musa K.', isPrimary: false },
];

const Earnings: React.FC = () => {
  const [balance, setBalance] = useState(mockEarnings.balance);
  const [payouts, setPayouts] = useState(mockPayouts);
  const [bankAccounts] = useState(mockBankAccounts); // setter removed (unused)
  const [showWithdrawModal, setShowWithdrawModal] = useState(false);
  const [withdrawAmount, setWithdrawAmount] = useState('');
  const [selectedAccount, setSelectedAccount] = useState(bankAccounts.find(a => a.isPrimary)?.id || bankAccounts[0]?.id);
  const [toastMessage, setToastMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const handleWithdraw = (e: React.FormEvent) => {
    e.preventDefault();
    const amount = parseFloat(withdrawAmount);
    if (isNaN(amount) || amount <= 0) {
      setToastMessage({ type: 'error', text: 'Please enter a valid amount.' });
      setTimeout(() => setToastMessage(null), 3000);
      return;
    }
    if (amount > balance) {
      setToastMessage({ type: 'error', text: 'Insufficient balance.' });
      setTimeout(() => setToastMessage(null), 3000);
      return;
    }
    if (!selectedAccount) {
      setToastMessage({ type: 'error', text: 'Please select a bank account.' });
      setTimeout(() => setToastMessage(null), 3000);
      return;
    }

    // Simulate withdrawal
    const account = bankAccounts.find(a => a.id === selectedAccount);
    const newPayout = {
      id: Date.now(),
      date: new Date().toISOString().slice(0, 10),
      amount,
      status: 'pending',
      method: `${account?.bank} **** ${account?.accountNumber.slice(-4)}`,
    };
    setPayouts(prev => [newPayout, ...prev]);
    setBalance(prev => prev - amount);
    setWithdrawAmount('');
    setShowWithdrawModal(false);
    setToastMessage({ type: 'success', text: `Withdrawal request submitted for ${formatCurrency(amount)}` });
    setTimeout(() => setToastMessage(null), 3000);
  };

  return (
    <div className="earnings-page">
      <div className="earnings-header">
        <h1>My Earnings</h1>
        <p>View your balance, earnings breakdown, and manage withdrawals</p>
      </div>

      {/* Earnings Card */}
      <div className="earnings-card-container">
        <div className="sprint-earnings-card">
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
            <div className="card-number">EARNINGS • COURIER</div>
            <div className="card-holder-row">
              <div className="info-group">
                <small>COURIER ID</small>
                <p>CR-001</p>
              </div>
              <div className="info-group">
                <small>SINCE</small>
                <p>2024</p>
              </div>
            </div>
            <div className="card-pattern" />
            <div className="card-shine" />
          </div>

          <div className="card-data">
            <div className="balance-box">
              <h2 className="balance-amount">{formatCurrency(balance)}</h2>
              <small>Available balance</small>
            </div>
            <div className="card-actions-row">
              <button className="btn-withdraw" onClick={() => setShowWithdrawModal(true)}>
                <IconArrowRight /> WITHDRAW
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Earnings Metrics */}
      <div className="metrics-grid">
        <div className="metric-card">
          <div className="metric-title">This Week</div>
          <div className="metric-value">{formatCurrency(mockEarnings.thisWeek)}</div>
          <div className="metric-sub"><IconCalendar /> Last 7 days</div>
        </div>
        <div className="metric-card">
          <div className="metric-title">This Month</div>
          <div className="metric-value">{formatCurrency(mockEarnings.thisMonth)}</div>
          <div className="metric-sub"><IconCalendar /> March 2025</div>
        </div>
        <div className="metric-card">
          <div className="metric-title">Total Earnings</div>
          <div className="metric-value">{formatCurrency(mockEarnings.total)}</div>
          <div className="metric-sub"><IconTruck /> Lifetime</div>
        </div>
      </div>

      {/* Payout History */}
      <div className="payout-history">
        <div className="payout-header">
          <h2><IconHistory /> Payout History</h2>
        </div>
        <div className="payout-list">
          {payouts.length === 0 ? (
            <div className="empty-payouts">No payouts yet</div>
          ) : (
            payouts.map(payout => (
              <div key={payout.id} className="payout-item">
                <div className="payout-details">
                  <div className="payout-description">
                    Withdrawal to {payout.method}
                  </div>
                  <div className="payout-date">{payout.date}</div>
                </div>
                <div className="payout-amount">
                  -{formatCurrency(payout.amount)}
                </div>
                <div className={`payout-status status-${payout.status}`}>
                  {payout.status}
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Bank Accounts */}
      <div className="bank-accounts">
        <div className="bank-header">
          <h3>Linked Bank Accounts</h3>
          <button className="add-bank-btn">+ Add Bank</button>
        </div>
        {bankAccounts.map(account => (
          <div key={account.id} className={`bank-item ${account.isPrimary ? 'primary' : ''}`}>
            <IconBank />
            <div className="bank-info">
              <p>{account.bank} • {account.accountNumber}</p>
              <small>{account.accountName}</small>
            </div>
            {account.isPrimary && <span className="primary-badge">Primary</span>}
          </div>
        ))}
      </div>

      {/* Withdrawal Modal */}
      {showWithdrawModal && (
        <div className="modal-overlay" onClick={() => setShowWithdrawModal(false)}>
          <div className="modal-container" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Withdraw Earnings</h2>
              <button className="modal-close" onClick={() => setShowWithdrawModal(false)}>✕</button>
            </div>
            <form className="modal-content" onSubmit={handleWithdraw}>
              <div className="form-group">
                <label>Amount (₦)</label>
                <input
                  type="number"
                  value={withdrawAmount}
                  onChange={(e) => setWithdrawAmount(e.target.value)}
                  placeholder="Enter amount"
                  required
                  autoFocus
                />
                <small>Available: {formatCurrency(balance)}</small>
              </div>
              <div className="form-group">
                <label>Withdraw to</label>
                <select
                  value={selectedAccount}
                  onChange={(e) => setSelectedAccount(Number(e.target.value))}
                >
                  {bankAccounts.map(account => (
                    <option key={account.id} value={account.id}>
                      {account.bank} **** {account.accountNumber.slice(-4)} ({account.isPrimary ? 'Primary' : ''})
                    </option>
                  ))}
                </select>
              </div>
              <div className="modal-actions">
                <button type="button" className="btn-secondary" onClick={() => setShowWithdrawModal(false)}>Cancel</button>
                <button type="submit" className="btn-primary">Withdraw</button>
              </div>
            </form>
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

export default Earnings;