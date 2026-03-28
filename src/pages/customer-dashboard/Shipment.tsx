import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../assets/css/Shipment.css';

const Shipment: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    pickupLocation: '',
    deliveryLocation: '',
    packageWeight: '',
    packageDesc: '',
    specialInstructions: '',
    isFragile: false,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      navigate('/dashboard/orders');
    }, 1500);
  };

  return (
    <div className="shipment-page">
      <div className="shipment-header">
        <h1>New Shipment</h1>
        <p>Create a new delivery request</p>
      </div>

      <form className="shipment-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="pickupLocation">Pickup Location *</label>
          <input
            type="text"
            id="pickupLocation"
            name="pickupLocation"
            value={formData.pickupLocation}
            onChange={handleChange}
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
            onChange={handleChange}
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
              onChange={handleChange}
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
              onChange={handleChange}
              placeholder="e.g., Electronics, Documents"
            />
          </div>
        </div>

        <div className="form-group">
          <label className="checkbox-label">
            <input
              type="checkbox"
              name="isFragile"
              checked={formData.isFragile}
              onChange={handleChange}
            />
            <span>Fragile package (handle with care)</span>
          </label>
        </div>

        <div className="form-group">
          <label htmlFor="specialInstructions">Special Instructions</label>
          <textarea
            id="specialInstructions"
            name="specialInstructions"
            rows={3}
            value={formData.specialInstructions}
            onChange={handleChange}
            placeholder="e.g., Call before arrival, gate code: 1234"
          />
        </div>

        <div className="form-actions">
          <button type="button" className="btn-secondary" onClick={() => navigate('/dashboard')}>Cancel</button>
          <button type="submit" className="btn-primary" disabled={isSubmitting}>
            {isSubmitting ? 'Creating...' : 'Create Shipment'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Shipment;