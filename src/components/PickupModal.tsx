// src/components/PickupModal.tsx
import React, { useState, useRef } from 'react';
import '../assets/css/PickupModal.css';

// Icons
const IconX: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" {...props}>
    <path d="M18 6L6 18M6 6l12 12" />
  </svg>
);

const IconLoader: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" {...props}>
    <circle cx="12" cy="12" r="10" />
    <path d="M12 2v4M12 22v-4M22 12h-4M2 12h4" />
  </svg>
);

const IconMapPin: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" {...props}>
    <path d="M20 10c0 4.993-5.539 9-10 9s-10-4.007-10-9a10 10 0 0 1 20 0Z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
);

const IconCheck: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" {...props}>
    <path d="M20 6L9 17l-5-5" />
  </svg>
);

type PickupStep = 'form' | 'finding' | 'enroute' | 'completed';

interface PickupModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void; // to trigger toast in parent
}

const PickupModal: React.FC<PickupModalProps> = ({ isOpen, onClose, onSuccess }) => {
  const [step, setStep] = useState<PickupStep>('form');
  const [formData, setFormData] = useState({
    pickupLocation: '',
    deliveryLocation: '',
    packageWeight: '',
    packageDesc: '',
    specialInstructions: '',
  });
  const [rider, setRider] = useState<{ name: string; avatar: string; distance: number; eta: number } | null>(null);
  const [progress, setProgress] = useState(0); // 0-100 for distance progress

  // Use number | null for interval ID (avoids NodeJS.Timeout error in browser)
  const intervalRef = useRef<number | null>(null);

  // Reset state when modal closes
  const handleClose = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    setStep('form');
    setFormData({
      pickupLocation: '',
      deliveryLocation: '',
      packageWeight: '',
      packageDesc: '',
      specialInstructions: '',
    });
    setRider(null);
    setProgress(0);
    onClose();
  };

  // Simulate finding a rider after form submit
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Basic validation
    if (!formData.pickupLocation || !formData.deliveryLocation || !formData.packageWeight) {
      return;
    }

    setStep('finding');

    // Simulate API call to find rider
    setTimeout(() => {
      setRider({
        name: 'Musa K.',
        avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
        distance: 2.4,
        eta: 8,
      });
      setStep('enroute');
      startProgressSimulation();
    }, 2000);
  };

  // Simulate rider movement
  const startProgressSimulation = () => {
    let currentProgress = 0;

    intervalRef.current = window.setInterval(() => {
      currentProgress += 2;

      if (currentProgress >= 100) {
        if (intervalRef.current) {
          clearInterval(intervalRef.current);
          intervalRef.current = null;
        }
        setStep('completed');

        // After a short delay, close modal and trigger success
        setTimeout(() => {
          onSuccess();
          handleClose();
        }, 2000);
      } else {
        setProgress(currentProgress);

        // Update ETA
        if (rider) {
          const remaining = Math.max(0, rider.eta * (1 - currentProgress / 100));
          setRider((prev) =>
            prev ? { ...prev, eta: Math.ceil(remaining) } : null
          );
        }
      }
    }, 200);
  };

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  if (!isOpen) return null;

  return (
    <div className="pickup-modal-overlay" onClick={handleClose}>
      <div className="pickup-modal-container" onClick={(e) => e.stopPropagation()}>
        <div className="pickup-modal-header">
          <h2>
            {step === 'form' && 'Request Pickup'}
            {step === 'finding' && 'Finding a rider...'}
            {step === 'enroute' && 'Rider on the way'}
            {step === 'completed' && 'Pickup Complete!'}
          </h2>
          <button className="pickup-modal-close" onClick={handleClose}>
            <IconX />
          </button>
        </div>

        <div className="pickup-modal-content">
          {step === 'form' && (
            <form onSubmit={handleSubmit} className="pickup-form">
              <div className="form-group">
                <label htmlFor="pickupLocation">Pickup Location *</label>
                <input
                  type="text"
                  id="pickupLocation"
                  name="pickupLocation"
                  value={formData.pickupLocation}
                  onChange={handleFormChange}
                  placeholder="e.g., 123 Main St, Ikeja"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="deliveryLocation">Delivery Location *</label>
                <input
                  type="text"
                  id="deliveryLocation"
                  name="deliveryLocation"
                  value={formData.deliveryLocation}
                  onChange={handleFormChange}
                  placeholder="e.g., 45 Victoria Island"
                  required
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="packageWeight">Weight (kg) *</label>
                  <input
                    type="number"
                    id="packageWeight"
                    name="packageWeight"
                    value={formData.packageWeight}
                    onChange={handleFormChange}
                    placeholder="e.g., 2.5"
                    step="0.1"
                    min="0.1"
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="packageDesc">Description</label>
                  <input
                    type="text"
                    id="packageDesc"
                    name="packageDesc"
                    value={formData.packageDesc}
                    onChange={handleFormChange}
                    placeholder="e.g., Electronics"
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="specialInstructions">Special Instructions</label>
                <textarea
                  id="specialInstructions"
                  name="specialInstructions"
                  rows={3}
                  value={formData.specialInstructions}
                  onChange={handleFormChange}
                  placeholder="e.g., Call before arrival"
                />
              </div>

              <div className="form-actions">
                <button type="button" className="btn-secondary" onClick={handleClose}>
                  Cancel
                </button>
                <button type="submit" className="btn-primary">
                  Request Pickup
                </button>
              </div>
            </form>
          )}

          {step === 'finding' && (
            <div className="finding-rider">
              <div className="spinner">
                <IconLoader />
              </div>
              <p>Searching for available riders...</p>
              <p className="sub">This may take a few seconds</p>
            </div>
          )}

          {step === 'enroute' && rider && (
            <div className="tracking-view">
              <div className="rider-card">
                <img src={rider.avatar} alt={rider.name} className="rider-avatar" />
                <div className="rider-info">
                  <h4>{rider.name}</h4>
                  <p><IconMapPin /> {rider.distance.toFixed(1)} km away</p>
                  <p className="eta">ETA: {rider.eta} min</p>
                </div>
              </div>

              <div className="progress-section">
                <div className="progress-bar">
                  <div className="progress-fill" style={{ width: `${progress}%` }} />
                </div>
                <div className="progress-steps">
                  <span className="active">Pickup</span>
                  <span>En route</span>
                  <span>Delivery</span>
                </div>
              </div>

              <div className="tracking-map">
                <div className="map-placeholder">
                  <div className="pin" style={{ left: `${progress}%` }}>
                    <IconMapPin />
                  </div>
                  <div className="route-line" />
                </div>
                <p className="status-text">
                  {progress < 30 && 'Rider is heading to your location...'}
                  {progress >= 30 && progress < 70 && 'Almost there, please get ready.'}
                  {progress >= 70 && 'Rider is arriving shortly!'}
                </p>
              </div>
            </div>
          )}

          {step === 'completed' && (
            <div className="completed-view">
              <div className="check-circle">
                <IconCheck />
              </div>
              <h3>Pickup Successful!</h3>
              <p>Your package has been picked up and is on its way.</p>
              <p className="small">You can track it in your orders.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PickupModal;