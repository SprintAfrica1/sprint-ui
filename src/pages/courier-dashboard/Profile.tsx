import React, { useState, useRef } from 'react';
import '../../assets/css/Profile.css';

// Icons (same as customer profile)
const IconUser: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" {...props}>
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
);

const IconMail: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" {...props}>
    <rect x="2" y="4" width="20" height="16" rx="2" />
    <path d="m22 7-10 7L2 7" />
  </svg>
);

const IconPhone: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" {...props}>
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.362 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.338 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
  </svg>
);

const IconCalendar: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" {...props}>
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
    <line x1="16" y1="2" x2="16" y2="6" />
    <line x1="8" y1="2" x2="8" y2="6" />
    <line x1="3" y1="10" x2="21" y2="10" />
  </svg>
);

const IconMapPin: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" {...props}>
    <path d="M20 10c0 4.993-5.539 9-10 9s-10-4.007-10-9a10 10 0 0 1 20 0Z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
);

const IconEdit: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" {...props}>
    <path d="M17 3l4 4-7 7H10v-4l7-7z" />
    <path d="M5 21h14" />
  </svg>
);

const IconBuilding: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" {...props}>
    <rect x="4" y="8" width="16" height="12" rx="1" />
    <path d="M8 12h8M8 16h4" />
    <path d="M12 4v4" />
  </svg>
);

const IconUsers: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" {...props}>
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
  </svg>
);

const IconLocation: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" {...props}>
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
);

const IconCamera: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" {...props}>
    <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
    <circle cx="12" cy="13" r="4" />
  </svg>
);

const IconTruck: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" {...props}>
    <rect x="1" y="8" width="13" height="11" rx="2" />
    <path d="M14 12h4l3 4v3h-7V12z" />
    <circle cx="5.5" cy="19.5" r="1.5" />
    <circle cx="17.5" cy="19.5" r="1.5" />
  </svg>
);

const IconCar: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" {...props}>
    <path d="M7 17m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" />
    <path d="M17 17m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" />
    <path d="M5 9h14M7 13h10" />
    <path d="M3 9l1-4h16l1 4" />
  </svg>
);

const CourierProfile: React.FC = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [avatar, setAvatar] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [userData, setUserData] = useState({
    firstName: 'Musa',
    lastName: 'K.',
    username: 'musak',
    email: 'musa.k@example.com',
    phone: '+234 801 234 5678',
    joinedDate: 'January 2025',
    address: '45 Victoria Island, Lagos, Nigeria',
    company: 'Sprint Logistics',
    gender: 'male',
    state: 'Lagos',
    city: 'Victoria Island',
    bio: 'Experienced courier with over 5 years of delivery service. Dedicated to fast and safe deliveries.',
    vehicleType: 'Motorcycle',
    vehiclePlate: 'LAG-123-AB',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setUserData(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    setIsEditing(false);
    alert('Profile updated successfully!');
  };

  const handleAvatarUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatar(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="profile-page">
      <div className="profile-header">
        <h1>My Profile</h1>
        <p>View and manage your personal information</p>
      </div>

      <div className="profile-card">
        <div className="profile-avatar-section">
          <div className="profile-avatar">
            {avatar ? (
              <img src={avatar} alt="Avatar" className="avatar-image" />
            ) : (
              <span>{userData.firstName[0]}{userData.lastName[0]}</span>
            )}
            <button className="camera-btn" onClick={triggerFileInput}>
              <IconCamera />
            </button>
          </div>
          <input
            type="file"
            ref={fileInputRef}
            accept="image/*"
            style={{ display: 'none' }}
            onChange={handleAvatarUpload}
          />
          <button className="change-avatar-btn" onClick={triggerFileInput}>
            Change Avatar
          </button>
        </div>

        <div className="profile-info-section">
          <div className="profile-info-header">
            <h2>Personal Information</h2>
            <button className="edit-btn" onClick={() => setIsEditing(!isEditing)}>
              <IconEdit /> {isEditing ? 'Cancel' : 'Edit'}
            </button>
          </div>

          <div className="profile-fields">
            {/* First & Last Name */}
            <div className="form-row">
              <div className="field-group">
                <label>First Name</label>
                {isEditing ? (
                  <input type="text" name="firstName" value={userData.firstName} onChange={handleChange} />
                ) : (
                  <p><IconUser /> {userData.firstName}</p>
                )}
              </div>
              <div className="field-group">
                <label>Last Name</label>
                {isEditing ? (
                  <input type="text" name="lastName" value={userData.lastName} onChange={handleChange} />
                ) : (
                  <p><IconUser /> {userData.lastName}</p>
                )}
              </div>
            </div>

            {/* Username */}
            <div className="field-group">
              <label>Username</label>
              {isEditing ? (
                <input type="text" name="username" value={userData.username} onChange={handleChange} />
              ) : (
                <p><IconUsers /> @{userData.username}</p>
              )}
            </div>

            {/* Email & Phone */}
            <div className="form-row">
              <div className="field-group">
                <label>Email Address</label>
                {isEditing ? (
                  <input type="email" name="email" value={userData.email} onChange={handleChange} />
                ) : (
                  <p><IconMail /> {userData.email}</p>
                )}
              </div>
              <div className="field-group">
                <label>Phone Number</label>
                {isEditing ? (
                  <input type="tel" name="phone" value={userData.phone} onChange={handleChange} />
                ) : (
                  <p><IconPhone /> {userData.phone}</p>
                )}
              </div>
            </div>

            {/* Vehicle Information */}
            <div className="form-row">
              <div className="field-group">
                <label>Vehicle Type</label>
                {isEditing ? (
                  <select name="vehicleType" value={userData.vehicleType} onChange={handleChange}>
                    <option value="Motorcycle">Motorcycle</option>
                    <option value="Car">Car</option>
                    <option value="Van">Van</option>
                    <option value="Bicycle">Bicycle</option>
                  </select>
                ) : (
                  <p><IconCar /> {userData.vehicleType}</p>
                )}
              </div>
              <div className="field-group">
                <label>License Plate</label>
                {isEditing ? (
                  <input type="text" name="vehiclePlate" value={userData.vehiclePlate} onChange={handleChange} />
                ) : (
                  <p><IconTruck /> {userData.vehiclePlate}</p>
                )}
              </div>
            </div>

            {/* Company (optional) */}
            <div className="field-group">
              <label>Company (Optional)</label>
              {isEditing ? (
                <input type="text" name="company" value={userData.company} onChange={handleChange} />
              ) : (
                <p><IconBuilding /> {userData.company || 'Not specified'}</p>
              )}
            </div>

            {/* Gender */}
            <div className="field-group">
              <label>Gender</label>
              {isEditing ? (
                <select name="gender" value={userData.gender} onChange={handleChange}>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                  <option value="prefer-not">Prefer not to say</option>
                </select>
              ) : (
                <p>{userData.gender === 'male' ? 'Male' : userData.gender === 'female' ? 'Female' : userData.gender === 'other' ? 'Other' : 'Prefer not to say'}</p>
              )}
            </div>

            {/* State & City */}
            <div className="form-row">
              <div className="field-group">
                <label>State</label>
                {isEditing ? (
                  <input type="text" name="state" value={userData.state} onChange={handleChange} />
                ) : (
                  <p><IconLocation /> {userData.state}</p>
                )}
              </div>
              <div className="field-group">
                <label>City</label>
                {isEditing ? (
                  <input type="text" name="city" value={userData.city} onChange={handleChange} />
                ) : (
                  <p><IconLocation /> {userData.city}</p>
                )}
              </div>
            </div>

            {/* Address */}
            <div className="field-group">
              <label>Address</label>
              {isEditing ? (
                <input type="text" name="address" value={userData.address} onChange={handleChange} />
              ) : (
                <p><IconMapPin /> {userData.address}</p>
              )}
            </div>

            {/* Bio */}
            <div className="field-group">
              <label>Bio</label>
              {isEditing ? (
                <textarea name="bio" rows={3} value={userData.bio} onChange={handleChange} />
              ) : (
                <p className="bio-text">{userData.bio}</p>
              )}
            </div>

            {/* Joined Date */}
            <div className="field-group">
              <label>Member Since</label>
              <p><IconCalendar /> {userData.joinedDate}</p>
            </div>
          </div>

          {isEditing && (
            <div className="save-actions">
              <button className="save-btn" onClick={handleSave}>Save Changes</button>
              <button className="cancel-btn" onClick={() => setIsEditing(false)}>Cancel</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CourierProfile;