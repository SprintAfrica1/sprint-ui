import React, { useState } from 'react';
import '../../assets/css/Wallet.css';

// Icons
const IconWallet: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" {...props}>
    <rect x="2" y="5" width="20" height="14" rx="2" />
    <path d="M17 12h.01" />
  </svg>
);

const IconArrowRight: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" {...props}>
    <path d="M5 12h14M12 5l7 7-7 7" />
  </svg>
);

const IconCreditCard: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" {...props}>
    <rect x="2" y="5" width="20" height="14" rx="2" />
    <path d="M2 10h20" />
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

const formatCurrency = (amount: number) =>
  new Intl.NumberFormat('en-NG', { style: 'currency', currency: 'NGN', minimumFractionDigits: 0 }).format(amount);

// Mock transaction data
const allTransactions = [
  { id: 1, date: '2025-03-25', description: 'Fund Wallet', amount: 5000, type: 'credit', method: 'Card' },
  { id: 2, date: '2025-03-24', description: 'Payment for Order SP-001', amount: 4500, type: 'debit', method: 'Wallet' },
  { id: 3, date: '2025-03-23', description: 'Fund Wallet', amount: 10000, type: 'credit', method: 'Bank Transfer' },
  { id: 4, date: '2025-03-22', description: 'Payment for Order SP-002', amount: 6800, type: 'debit', method: 'Wallet' },
  { id: 5, date: '2025-03-21', description: 'Referral Bonus', amount: 2000, type: 'credit', method: 'System' },
  { id: 6, date: '2025-03-20', description: 'Withdrawal to Bank', amount: 3000, type: 'debit', method: 'Bank' },
  { id: 7, date: '2025-03-19', description: 'Cashback Reward', amount: 500, type: 'credit', method: 'System' },
];

const Wallet: React.FC = () => {
  const [balance, setBalance] = useState(45750);
  const [transactions, setTransactions] = useState(allTransactions);
  const [filter, setFilter] = useState<'all' | 'credit' | 'debit'>('all');
  const [showFundModal, setShowFundModal] = useState(false);
  const [showWithdrawModal, setShowWithdrawModal] = useState(false);
  const [fundAmount, setFundAmount] = useState('');
  const [withdrawAmount, setWithdrawAmount] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [bankAccount, setBankAccount] = useState('');
  const [toastMessage, setToastMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  // Simulate adding a transaction
  const addTransaction = (type: 'credit' | 'debit', amount: number, description: string, method: string) => {
    const newTx = {
      id: Date.now(),
      date: new Date().toISOString().slice(0,10),
      description,
      amount,
      type,
      method,
    };
    setTransactions(prev => [newTx, ...prev]);
    setBalance(prev => type === 'credit' ? prev + amount : prev - amount);
    setToastMessage({ type: 'success', text: `${type === 'credit' ? 'Funded' : 'Withdrawn'} successfully!` });
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleFund = (e: React.FormEvent) => {
    e.preventDefault();
    const amount = parseFloat(fundAmount);
    if (isNaN(amount) || amount <= 0) {
      setToastMessage({ type: 'error', text: 'Please enter a valid amount.' });
      return;
    }
    addTransaction('credit', amount, 'Fund Wallet', paymentMethod === 'card' ? 'Card' : 'Bank Transfer');
    setShowFundModal(false);
    setFundAmount('');
  };

  const handleWithdraw = (e: React.FormEvent) => {
    e.preventDefault();
    const amount = parseFloat(withdrawAmount);
    if (isNaN(amount) || amount <= 0) {
      setToastMessage({ type: 'error', text: 'Please enter a valid amount.' });
      return;
    }
    if (amount > balance) {
      setToastMessage({ type: 'error', text: 'Insufficient balance.' });
      return;
    }
    if (!bankAccount.trim()) {
      setToastMessage({ type: 'error', text: 'Please enter bank account details.' });
      return;
    }
    addTransaction('debit', amount, 'Withdrawal to Bank', 'Bank');
    setShowWithdrawModal(false);
    setWithdrawAmount('');
    setBankAccount('');
  };

  const filteredTransactions = transactions.filter(tx => filter === 'all' || tx.type === filter);

  return (
    <div className="wallet-page">
      <div className="wallet-header">
        <h1>My Wallet</h1>
        <p>Manage your funds, view transaction history, and access your savings</p>
      </div>

      {/* ATM Card */}
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
                <p>JOHN DOE</p>
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
              <h2 className="balance-amount">{formatCurrency(balance)}</h2>
              <small>Current balance</small>
            </div>
            <div className="card-actions-row">
              <button className="btn-fund" onClick={() => setShowFundModal(true)}>
                <IconWallet /> FUND WALLET
              </button>
              <button className="btn-withdraw" onClick={() => setShowWithdrawModal(true)}>
                <IconArrowRight /> WITHDRAW
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Savings / Rewards summary */}
      <div className="metrics-grid">
        <div className="metric-card">
          <div className="metric-title">Total Savings</div>
          <div className="metric-value">{formatCurrency(12800)}</div>
          <div className="metric-sub">Earned this month</div>
        </div>
        <div className="metric-card">
          <div className="metric-title">Cashback</div>
          <div className="metric-value">{formatCurrency(2500)}</div>
          <div className="metric-sub">From deliveries</div>
        </div>
        <div className="metric-card">
          <div className="metric-title">Referral Bonus</div>
          <div className="metric-value">{formatCurrency(1500)}</div>
          <div className="metric-sub">3 referrals</div>
        </div>
      </div>

      {/* Transaction History */}
      <div className="transaction-history">
        <div className="transaction-header">
          <h2><IconHistory /> Transaction History</h2>
          <div className="filter-tabs">
            <button className={filter === 'all' ? 'active' : ''} onClick={() => setFilter('all')}>All</button>
            <button className={filter === 'credit' ? 'active' : ''} onClick={() => setFilter('credit')}>Credits</button>
            <button className={filter === 'debit' ? 'active' : ''} onClick={() => setFilter('debit')}>Debits</button>
          </div>
        </div>
        <div className="transaction-list">
          {filteredTransactions.length === 0 ? (
            <div className="empty-transactions">No transactions found</div>
          ) : (
            filteredTransactions.map((tx) => (
              <div key={tx.id} className={`transaction-item ${tx.type}`}>
                <div className="transaction-details">
                  <div className="transaction-description">{tx.description}</div>
                  <div className="transaction-date">{tx.date} • {tx.method}</div>
                </div>
                <div className="transaction-amount">
                  {tx.type === 'credit' ? '+' : '-'}{formatCurrency(tx.amount)}
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Linked Payment Methods */}
      <div className="linked-accounts">
        <div className="linked-header">
          <h3>Linked Payment Methods</h3>
          <button className="add-method">+ Add</button>
        </div>
        <div className="payment-method">
          <IconCreditCard />
          <div>
            <p>VISA **** 4281</p>
            <small>Primary card</small>
          </div>
        </div>
        <div className="payment-method">
          <IconBank />
          <div>
            <p>GTBank **** 1234</p>
            <small>Bank account</small>
          </div>
        </div>
      </div>

      {/* Modals */}
      {showFundModal && (
        <div className="modal-overlay" onClick={() => setShowFundModal(false)}>
          <div className="modal-container" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Fund Wallet</h2>
              <button className="modal-close" onClick={() => setShowFundModal(false)}>✕</button>
            </div>
            <form className="modal-content" onSubmit={handleFund}>
              <div className="form-group">
                <label>Amount (₦)</label>
                <input
                  type="number"
                  value={fundAmount}
                  onChange={(e) => setFundAmount(e.target.value)}
                  placeholder="Enter amount"
                  required
                  autoFocus
                />
              </div>
              <div className="form-group">
                <label>Payment Method</label>
                <select value={paymentMethod} onChange={(e) => setPaymentMethod(e.target.value)}>
                  <option value="card">Card (VISA/Mastercard)</option>
                  <option value="bank">Bank Transfer</option>
                </select>
              </div>
              <div className="modal-actions">
                <button type="button" className="btn-secondary" onClick={() => setShowFundModal(false)}>Cancel</button>
                <button type="submit" className="btn-primary">Confirm Payment</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {showWithdrawModal && (
        <div className="modal-overlay" onClick={() => setShowWithdrawModal(false)}>
          <div className="modal-container" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Withdraw Funds</h2>
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
                />
                <small>Available: {formatCurrency(balance)}</small>
              </div>
              <div className="form-group">
                <label>Bank Account</label>
                <input
                  type="text"
                  value={bankAccount}
                  onChange={(e) => setBankAccount(e.target.value)}
                  placeholder="Account number / bank name"
                  required
                />
              </div>
              <div className="modal-actions">
                <button type="button" className="btn-secondary" onClick={() => setShowWithdrawModal(false)}>Cancel</button>
                <button type="submit" className="btn-primary">Withdraw</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {toastMessage && (
        <div className={`toast-notification ${toastMessage.type}`}>
          {toastMessage.text}
        </div>
      )}
    </div>
  );
};

export default Wallet;