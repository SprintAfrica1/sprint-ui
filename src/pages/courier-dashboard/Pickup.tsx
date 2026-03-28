import React, { useState, useEffect, useCallback } from 'react';
import { MapContainer, TileLayer, Marker, Polyline, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import '../../assets/css/CourierPickup.css';

// Fix Leaflet icon issue
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

const vehicleIcon = new L.Icon({
  iconUrl: 'https://cdn-icons-png.flaticon.com/512/3095/3096113.png',
  iconSize: [32, 32],
  iconAnchor: [16, 16],
  popupAnchor: [0, -16],
});

// Component to animate vehicle and center map
const AnimatedVehicle: React.FC<{ position: [number, number] }> = ({ position }) => {
  const map = useMap();
  useEffect(() => {
    map.panTo(position);
  }, [position, map]);
  return <Marker position={position} icon={vehicleIcon}><Popup>Vehicle is here</Popup></Marker>;
};

// Mock geocoding – replace with real API
const getMockCoordinates = (address: string): [number, number] => {
  const mock: Record<string, [number, number]> = {
    'Ikeja, Lagos': [6.5244, 3.3792],
    'Lagos Island, Lagos': [6.4474, 3.4006],
    'Surulere, Lagos': [6.5017, 3.3449],
    'Victoria Island, Lagos': [6.4281, 3.4219],
    'Yaba, Lagos': [6.5105, 3.3774],
    'Lekki, Lagos': [6.4531, 3.4491],
    'Ajah, Lagos': [6.4689, 3.5705],
  };
  return mock[address] || [6.5244, 3.3792];
};

// Generate a simple straight‑line route between two points
const getRouteCoordinates = (start: [number, number], end: [number, number]): [number, number][] => {
  const steps = 50; // more points for smoother movement
  const coords: [number, number][] = [];
  for (let i = 0; i <= steps; i++) {
    const t = i / steps;
    coords.push([
      start[0] + (end[0] - start[0]) * t,
      start[1] + (end[1] - start[1]) * t,
    ]);
  }
  return coords;
};

// Calculate approximate distance between two points (in km)
const calculateDistance = (start: [number, number], end: [number, number]): number => {
  const R = 6371; // Earth's radius in km
  const dLat = (end[0] - start[0]) * Math.PI / 180;
  const dLon = (end[1] - start[1]) * Math.PI / 180;
  const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
            Math.cos(start[0] * Math.PI / 180) * Math.cos(end[0] * Math.PI / 180) *
            Math.sin(dLon/2) * Math.sin(dLon/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  return R * c;
};

// Icons for UI
const IconPackage: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" {...props}>
    <path d="M3 6h18v12H3V6z" />
    <path d="M8 6v4" />
    <path d="M16 6v4" />
    <path d="M3 10h18" />
  </svg>
);

const IconMapPin: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" {...props}>
    <path d="M20 10c0 4.993-5.539 9-10 9s-10-4.007-10-9a10 10 0 0 1 20 0Z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
);

const IconClock: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" {...props}>
    <circle cx="12" cy="12" r="10" />
    <polyline points="12 6 12 12 16 14" />
  </svg>
);

const IconUser: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" {...props}>
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
);

const IconCheck: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" {...props}>
    <polyline points="20 6 9 17 4 12" />
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

// Mock pickup requests
const initialPickups = [
  {
    id: 'PU-001',
    customer: 'John Doe',
    pickupAddress: 'Ikeja, Lagos',
    scheduledTime: 'Today, 2:30 PM',
    status: 'pending',
    items: '2 boxes',
    instructions: 'Call upon arrival',
  },
  {
    id: 'PU-002',
    customer: 'Amina T.',
    pickupAddress: 'Surulere, Lagos',
    scheduledTime: 'Today, 4:00 PM',
    status: 'pending',
    items: 'Documents',
    instructions: 'Ring doorbell',
  },
  {
    id: 'PU-003',
    customer: 'Chidi O.',
    pickupAddress: 'Yaba, Lagos',
    scheduledTime: 'Tomorrow, 10:00 AM',
    status: 'pending',
    items: 'Electronics',
    instructions: 'Handle with care',
  },
  {
    id: 'PU-004',
    customer: 'Bola A.',
    pickupAddress: 'Ajah, Lagos',
    scheduledTime: 'Today, 1:00 PM',
    status: 'completed',
    items: 'Package',
    instructions: '',
  },
];

const getStatusClass = (status: string) => {
  switch (status) {
    case 'completed': return 'status-completed';
    case 'in-progress': return 'status-in-progress';
    default: return 'status-pending';
  }
};

type Filter = 'all' | 'today' | 'upcoming' | 'completed';

const Pickup: React.FC = () => {
  const [filter, setFilter] = useState<Filter>('all');
  const [pickups, setPickups] = useState(initialPickups);
  const [activePickup, setActivePickup] = useState<typeof initialPickups[0] | null>(null);
  const [progress, setProgress] = useState(0);
  const [vehiclePosition, setVehiclePosition] = useState<[number, number] | null>(null);
  const [routeCoords, setRouteCoords] = useState<[number, number][]>([]);
  const [distanceRemaining, setDistanceRemaining] = useState<number | null>(null);
  const [arrivalAlertShown, setArrivalAlertShown] = useState(false);
  const [toastMessage, setToastMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  // Complete pickup (arrived) – defined early so it can be used in effects
  const completePickup = useCallback(() => {
    if (!activePickup) return;
    setPickups(prev =>
      prev.map(p => p.id === activePickup.id ? { ...p, status: 'completed' } : p)
    );
    setActivePickup(null);
    setVehiclePosition(null);
    setRouteCoords([]);
    setProgress(0);
    setDistanceRemaining(null);
    setArrivalAlertShown(false);
    setToastMessage({ type: 'success', text: `Pickup #${activePickup.id} completed!` });
    setTimeout(() => setToastMessage(null), 3000);
  }, [activePickup]);

  // Start a pickup: set active, compute route, start animation
  const startPickup = (pickup: typeof initialPickups[0]) => {
    if (activePickup) return;
    setActivePickup(pickup);
    const start = getMockCoordinates('Ikeja, Lagos'); // courier's current location (mock)
    const end = getMockCoordinates(pickup.pickupAddress);
    const route = getRouteCoordinates(start, end);
    setRouteCoords(route);
    setVehiclePosition(start);
    setProgress(0);
    setDistanceRemaining(calculateDistance(start, end));
    setArrivalAlertShown(false);
    setPickups(prev =>
      prev.map(p => p.id === pickup.id ? { ...p, status: 'in-progress' } : p)
    );
    setToastMessage({ type: 'success', text: `Started pickup #${pickup.id}` });
    setTimeout(() => setToastMessage(null), 3000);
  };

  // Simulate progress along the route and update distance
  useEffect(() => {
    if (!activePickup || !routeCoords.length || progress >= 100) return;
    const interval = setInterval(() => {
      setProgress(prev => {
        const newProgress = prev + 2;
        if (newProgress >= 100) {
          clearInterval(interval);
          return 100;
        }
        const idx = Math.floor((newProgress / 100) * (routeCoords.length - 1));
        const newPos = routeCoords[Math.min(idx, routeCoords.length - 1)];
        setVehiclePosition(newPos);
        const end = routeCoords[routeCoords.length - 1];
        const remaining = calculateDistance(newPos, end);
        setDistanceRemaining(remaining);
        return newProgress;
      });
    }, 500);
    return () => clearInterval(interval);
  }, [activePickup, routeCoords, progress]);

  // Check for arrival alert and auto‑complete when progress reaches 100
  useEffect(() => {
    if (!activePickup || arrivalAlertShown) return;
    if (distanceRemaining !== null && distanceRemaining < 0.1 && progress < 100) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setArrivalAlertShown(true);
      setToastMessage({ type: 'success', text: `You're almost there! The pickup is nearby.` });
      setTimeout(() => setToastMessage(null), 5000);
    }
    // If progress reaches 100, automatically mark as completed
    if (progress >= 100 && activePickup.status === 'in-progress') {
      completePickup();
    }
  }, [distanceRemaining, progress, activePickup, arrivalAlertShown, completePickup]);

  // Filtered list
  const filteredPickups = pickups.filter(p => {
    if (filter === 'today') return p.scheduledTime.includes('Today');
    if (filter === 'upcoming') return p.scheduledTime.includes('Tomorrow') || p.scheduledTime.includes('Upcoming');
    if (filter === 'completed') return p.status === 'completed';
    return true;
  });

  // Stats
  const stats = {
    today: pickups.filter(p => p.scheduledTime.includes('Today')).length,
    pending: pickups.filter(p => p.status === 'pending').length,
    completed: pickups.filter(p => p.status === 'completed').length,
  };

  return (
    <div className="pickup-page">
      <div className="pickup-header">
        <h1>Pickup Requests</h1>
        <p>View and manage pending pickups</p>
      </div>

      {/* Stats Cards */}
      <div className="pickup-stats">
        <div className="stat-card">
          <div className="stat-title">Today's Pickups</div>
          <div className="stat-value">{stats.today}</div>
          <div className="stat-sub"><IconPackage /> Scheduled</div>
        </div>
        <div className="stat-card">
          <div className="stat-title">Pending</div>
          <div className="stat-value">{stats.pending}</div>
          <div className="stat-sub"><IconClock /> Awaiting action</div>
        </div>
        <div className="stat-card">
          <div className="stat-title">Completed</div>
          <div className="stat-value">{stats.completed}</div>
          <div className="stat-sub"><IconCheck /> Done</div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="pickup-filters">
        <button className={filter === 'all' ? 'active' : ''} onClick={() => setFilter('all')}>All</button>
        <button className={filter === 'today' ? 'active' : ''} onClick={() => setFilter('today')}>Today</button>
        <button className={filter === 'upcoming' ? 'active' : ''} onClick={() => setFilter('upcoming')}>Upcoming</button>
        <button className={filter === 'completed' ? 'active' : ''} onClick={() => setFilter('completed')}>Completed</button>
      </div>

      {/* Two‑column layout */}
      <div className="pickup-grid">
        {/* Left: List of pickup requests */}
        <div className="pickup-list">
          <div className="list-container">
            {filteredPickups.length === 0 ? (
              <div className="empty-state">No pickup requests found</div>
            ) : (
              filteredPickups.map(pickup => (
                <div key={pickup.id} className={`pickup-card ${activePickup?.id === pickup.id ? 'active' : ''}`}>
                  <div className="pickup-header-row">
                    <div className="pickup-id">#{pickup.id}</div>
                    <div className={`pickup-status ${getStatusClass(pickup.status)}`}>
                      {pickup.status === 'in-progress' ? 'In Progress' : pickup.status === 'completed' ? 'Completed' : 'Pending'}
                    </div>
                  </div>
                  <div className="pickup-info">
                    <div className="info-row"><IconUser /><span>{pickup.customer}</span></div>
                    <div className="info-row"><IconMapPin /><span>{pickup.pickupAddress}</span></div>
                    <div className="info-row"><IconClock /><span>{pickup.scheduledTime}</span></div>
                    <div className="info-row"><IconPackage /><span>{pickup.items}</span></div>
                    {pickup.instructions && (
                      <div className="info-row instructions">
                        <span>📝 {pickup.instructions}</span>
                      </div>
                    )}
                  </div>
                  <div className="pickup-footer">
                    <div className="pickup-actions">
                      {pickup.status === 'pending' && !activePickup && (
                        <button className="btn-start" onClick={() => startPickup(pickup)}>Start Pickup</button>
                      )}
                      {pickup.status === 'in-progress' && activePickup?.id === pickup.id && (
                        <button className="btn-complete" onClick={completePickup}>Mark as Picked Up</button>
                      )}
                      {pickup.status === 'completed' && (
                        <button className="btn-view" disabled>Completed</button>
                      )}
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Right: Large Map */}
        <div className="pickup-map">
          <div className="map-card">
            <div className="map-header">
              <h3>Live Tracking</h3>
              {activePickup && (
                <div className="active-badge">Active: {activePickup.id}</div>
              )}
            </div>
            <div className="map-container">
              {routeCoords.length > 0 ? (
                <MapContainer
                  center={routeCoords[0]}
                  zoom={13}
                  style={{ height: '550px', width: '100%', borderRadius: '20px' }}
                >
                  <TileLayer
                    url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/attributions">CARTO</a>'
                  />
                  <Polyline positions={routeCoords} color="#ffd700" weight={4} opacity={0.8} />
                  <Marker position={routeCoords[routeCoords.length - 1]} icon={pickupIcon}>
                    <Popup>Pickup: {activePickup?.pickupAddress}</Popup>
                  </Marker>
                  {vehiclePosition && <AnimatedVehicle position={vehiclePosition} />}
                </MapContainer>
              ) : (
                <div className="map-placeholder">
                  <IconTruck />
                  <p>Select a pickup to start tracking</p>
                </div>
              )}
            </div>
            {activePickup && (
              <div className="pickup-progress">
                <div className="progress-bar">
                  <div className="progress-fill" style={{ width: `${progress}%` }} />
                </div>
                <p>
                  {progress}% to pickup location
                  {distanceRemaining !== null && (
                    <span className="distance-remaining"> • {distanceRemaining.toFixed(2)} km remaining</span>
                  )}
                </p>
                {distanceRemaining !== null && distanceRemaining < 0.2 && progress < 100 && (
                  <div className="arrival-alert">🔔 You're almost there! The pickup is nearby.</div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Toast Notification */}
      {toastMessage && (
        <div className={`toast-notification ${toastMessage.type}`}>
          {toastMessage.text}
        </div>
      )}
    </div>
  );
};

export default Pickup;