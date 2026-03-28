import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { MapContainer, TileLayer, Marker, Polyline, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import '../../assets/css/Tracking.css';

// Fix Leaflet default icon issue
// eslint-disable-next-line @typescript-eslint/no-explicit-any
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
});

// Custom icons
const pickupIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
});

const dropoffIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
});

const vehicleIcon = new L.Icon({
  iconUrl: 'https://cdn-icons-png.flaticon.com/512/3095/3096113.png',
  iconSize: [32, 32],
  iconAnchor: [16, 16],
  popupAnchor: [0, -16],
});

// Component to animate the vehicle (route parameter removed)
const AnimatedVehicle: React.FC<{ position: [number, number] }> = ({ position }) => {
  const map = useMap();
  useEffect(() => {
    map.panTo(position);
  }, [position, map]);
  return <Marker position={position} icon={vehicleIcon}><Popup>Vehicle is here</Popup></Marker>;
};

// Simulated route (Lagos coordinates)
const routeCoordinates: [number, number][] = [
  [6.5244, 3.3792], // Ikeja
  [6.5124, 3.3852],
  [6.5004, 3.3912],
  [6.4884, 3.3972],
  [6.4764, 3.4032],
  [6.4644, 3.4092],
  [6.4524, 3.4152],
  [6.4404, 3.4212],
  [6.4284, 3.4272],
  [6.4164, 3.4332],
  [6.4044, 3.4392],
  [6.3924, 3.4452],
  [6.3804, 3.4512],
  [6.3684, 3.4572],
  [6.3564, 3.4632],
  [6.3444, 3.4692],
  [6.3324, 3.4752],
  [6.3204, 3.4812],
  [6.3084, 3.4872],
  [6.2964, 3.4932], // Lagos Island
];
const start = routeCoordinates[0];
const end = routeCoordinates[routeCoordinates.length - 1];

const Tracking: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const orderId = id || 'SP-001';

  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState('pending');
  const [rider, setRider] = useState<{ name: string; eta: number; distance: number; phone: string } | null>(null);
  const [vehiclePosition, setVehiclePosition] = useState<[number, number]>(start);

  useEffect(() => {
    const interval = setInterval(() => {
      if (progress < 100) {
        setProgress(p => {
          const newProgress = p + 5;
          // Update vehicle position based on progress
          const idx = Math.floor((newProgress / 100) * (routeCoordinates.length - 1));
          const newPos = routeCoordinates[Math.min(idx, routeCoordinates.length - 1)];
          setVehiclePosition(newPos);

          if (newProgress >= 30 && !rider) {
            setRider({
              name: 'Musa K.',
              eta: 8,
              distance: 2.4,
              phone: '+234 801 234 5678',
            });
            setStatus('in-transit');
          }
          if (newProgress >= 100) {
            setStatus('delivered');
            clearInterval(interval);
          }
          return newProgress;
        });
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [progress, rider]);

  const getStatusText = () => {
    if (status === 'pending') return 'Pending Pickup';
    if (status === 'in-transit') return 'In Transit';
    return 'Delivered';
  };

  const getStatusColor = () => {
    if (status === 'pending') return '#ffc107';
    if (status === 'in-transit') return '#2196f3';
    return '#00a86b';
  };

  return (
    <div className="tracking-page">
      <div className="tracking-header">
        <h1>Track Order #{orderId}</h1>
        <p>Real-time location and updates</p>
      </div>

      <div className="tracking-card">
        <div className="order-summary">
          <div className="status-row">
            <div className="status-badge" style={{ background: `rgba(${parseInt(getStatusColor().slice(1,3),16)}, ${parseInt(getStatusColor().slice(3,5),16)}, ${parseInt(getStatusColor().slice(5,7),16)}, 0.1)`, color: getStatusColor() }}>
              {getStatusText()}
            </div>
            {rider && (
              <Link to={`/dashboard/chat/${orderId}`} className="chat-btn">
                💬 Message Rider
              </Link>
            )}
          </div>

          <div className="progress-section">
            <div className="progress-bar">
              <div className="progress-fill" style={{ width: `${progress}%` }} />
            </div>
            <div className="progress-steps">
              <span className={progress >= 0 ? 'active' : ''}>Pickup</span>
              <span className={progress >= 30 ? 'active' : ''}>En Route</span>
              <span className={progress >= 100 ? 'active' : ''}>Delivered</span>
            </div>
          </div>
        </div>

        {/* Leaflet Map */}
        <div className="map-container">
          <MapContainer
            center={start}
            zoom={12}
            style={{ height: '400px', width: '100%', borderRadius: '20px' }}
          >
            <TileLayer
              url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/attributions">CARTO</a>'
            />
            <Polyline positions={routeCoordinates} color="#ffd700" weight={4} opacity={0.8} />
            <Marker position={start} icon={pickupIcon}>
              <Popup>Pickup: Ikeja</Popup>
            </Marker>
            <Marker position={end} icon={dropoffIcon}>
              <Popup>Dropoff: Lagos Island</Popup>
            </Marker>
            {rider && (
              <AnimatedVehicle position={vehiclePosition} />
            )}
          </MapContainer>
        </div>

        {rider && (
          <div className="rider-card">
            <div className="rider-avatar">
              <img src="https://randomuser.me/api/portraits/men/32.jpg" alt={rider.name} />
            </div>
            <div className="rider-details">
              <h4>{rider.name}</h4>
              <p>📍 {rider.distance.toFixed(1)} km away</p>
              <p>⏱️ ETA: {rider.eta} min</p>
              <p className="phone">📞 {rider.phone}</p>
            </div>
          </div>
        )}

        <div className="tracking-message">
          {progress < 30 && "Rider is heading to your location..."}
          {progress >= 30 && progress < 70 && "Almost there, please get ready."}
          {progress >= 70 && progress < 100 && "Rider is arriving shortly!"}
          {progress >= 100 && "Package delivered! Thank you for using Sprint."}
        </div>
      </div>
    </div>
  );
};

export default Tracking;