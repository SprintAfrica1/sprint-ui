import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Polyline, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import '../../assets/css/CourierDeliveries.css';

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

// Helper to animate vehicle
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
  const steps = 30;
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

// Icons for UI with proper types
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

// Mock deliveries
const initialDeliveries = [
  {
    id: 'DL-001',
    customer: 'John Doe',
    pickup: 'Ikeja, Lagos',
    dropoff: 'Lagos Island, Lagos',
    scheduledTime: 'Today, 2:30 PM',
    status: 'pending',
    earnings: 2500,
    distance: '12 km',
  },
  {
    id: 'DL-002',
    customer: 'Amina T.',
    pickup: 'Surulere, Lagos',
    dropoff: 'Victoria Island, Lagos',
    scheduledTime: 'Today, 4:00 PM',
    status: 'pending',
    earnings: 1800,
    distance: '8 km',
  },
  {
    id: 'DL-003',
    customer: 'Chidi O.',
    pickup: 'Yaba, Lagos',
    dropoff: 'Lekki, Lagos',
    scheduledTime: 'Tomorrow, 10:00 AM',
    status: 'pending',
    earnings: 3200,
    distance: '15 km',
  },
  {
    id: 'DL-004',
    customer: 'Bola A.',
    pickup: 'Ajah, Lagos',
    dropoff: 'Ikeja, Lagos',
    scheduledTime: 'Today, 1:00 PM',
    status: 'completed',
    earnings: 2100,
    distance: '18 km',
  },
];

const formatCurrency = (amount: number) =>
  new Intl.NumberFormat('en-NG', { style: 'currency', currency: 'NGN', minimumFractionDigits: 0 }).format(amount);

const getStatusClass = (status: string) => {
  switch (status) {
    case 'completed': return 'status-completed';
    case 'in-progress': return 'status-in-progress';
    default: return 'status-pending';
  }
};

type Filter = 'all' | 'today' | 'upcoming' | 'completed';

const Deliveries: React.FC = () => {
  const [filter, setFilter] = useState<Filter>('all');
  const [deliveries, setDeliveries] = useState(initialDeliveries);
  const [activeDelivery, setActiveDelivery] = useState<typeof initialDeliveries[0] | null>(null);
  const [progress, setProgress] = useState(0);
  const [vehiclePosition, setVehiclePosition] = useState<[number, number] | null>(null);
  const [routeCoords, setRouteCoords] = useState<[number, number][]>([]);
  const [toastMessage, setToastMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  // Start a delivery: set active, compute route, start animation
  const startDelivery = (delivery: typeof initialDeliveries[0]) => {
    if (activeDelivery) return;
    setActiveDelivery(delivery);
    const start = getMockCoordinates(delivery.pickup);
    const end = getMockCoordinates(delivery.dropoff);
    const route = getRouteCoordinates(start, end);
    setRouteCoords(route);
    setVehiclePosition(start);
    setProgress(0);
    setDeliveries(prev =>
      prev.map(d => d.id === delivery.id ? { ...d, status: 'in-progress' } : d)
    );
    setToastMessage({ type: 'success', text: `Started delivery #${delivery.id}` });
    setTimeout(() => setToastMessage(null), 3000);
  };

  // Simulate progress along the route
  useEffect(() => {
    if (!activeDelivery || !routeCoords.length || progress >= 100) return;
    const interval = setInterval(() => {
      setProgress(prev => {
        const newProgress = prev + 2;
        if (newProgress >= 100) {
          clearInterval(interval);
          return 100;
        }
        const idx = Math.floor((newProgress / 100) * (routeCoords.length - 1));
        setVehiclePosition(routeCoords[Math.min(idx, routeCoords.length - 1)]);
        return newProgress;
      });
    }, 500);
    return () => clearInterval(interval);
  }, [activeDelivery, routeCoords, progress]);

  // Complete the active delivery
  const completeDelivery = () => {
    if (!activeDelivery) return;
    setDeliveries(prev =>
      prev.map(d => d.id === activeDelivery.id ? { ...d, status: 'completed' } : d)
    );
    setActiveDelivery(null);
    setVehiclePosition(null);
    setRouteCoords([]);
    setProgress(0);
    setToastMessage({ type: 'success', text: `Delivery #${activeDelivery.id} completed!` });
    setTimeout(() => setToastMessage(null), 3000);
  };

  // Filtered list
  const filteredDeliveries = deliveries.filter(d => {
    if (filter === 'today') return d.scheduledTime.includes('Today');
    if (filter === 'upcoming') return d.scheduledTime.includes('Tomorrow') || d.scheduledTime.includes('Upcoming');
    if (filter === 'completed') return d.status === 'completed';
    return true;
  });

  // Stats
  const stats = {
    today: deliveries.filter(d => d.scheduledTime.includes('Today')).length,
    pending: deliveries.filter(d => d.status === 'pending').length,
    completed: deliveries.filter(d => d.status === 'completed').length,
  };

  return (
    <div className="deliveries-page">
      <div className="deliveries-header">
        <h1>My Deliveries</h1>
        <p>Manage and track your assigned deliveries</p>
      </div>

      {/* Stats Cards */}
      <div className="deliveries-stats">
        <div className="stat-card">
          <div className="stat-title">Today's Deliveries</div>
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

      {/* Two‑column layout */}
      <div className="deliveries-grid">
        {/* Left: List of deliveries */}
        <div className="deliveries-list">
          <div className="deliveries-filters">
            <button className={filter === 'all' ? 'active' : ''} onClick={() => setFilter('all')}>All</button>
            <button className={filter === 'today' ? 'active' : ''} onClick={() => setFilter('today')}>Today</button>
            <button className={filter === 'upcoming' ? 'active' : ''} onClick={() => setFilter('upcoming')}>Upcoming</button>
            <button className={filter === 'completed' ? 'active' : ''} onClick={() => setFilter('completed')}>Completed</button>
          </div>
          <div className="list-container">
            {filteredDeliveries.length === 0 ? (
              <div className="empty-state">No deliveries found</div>
            ) : (
              filteredDeliveries.map(delivery => (
                <div key={delivery.id} className={`delivery-card ${activeDelivery?.id === delivery.id ? 'active' : ''}`}>
                  <div className="delivery-header">
                    <div className="delivery-id">#{delivery.id}</div>
                    <div className={`delivery-status ${getStatusClass(delivery.status)}`}>
                      {delivery.status === 'in-progress' ? 'In Progress' : delivery.status === 'completed' ? 'Completed' : 'Pending'}
                    </div>
                  </div>
                  <div className="delivery-info">
                    <div className="info-row"><IconUser /><span>{delivery.customer}</span></div>
                    <div className="info-row"><IconMapPin /><span>{delivery.pickup} → {delivery.dropoff}</span></div>
                    <div className="info-row"><IconClock /><span>{delivery.scheduledTime}</span></div>
                    <div className="info-row"><IconTruck /><span>{delivery.distance}</span></div>
                  </div>
                  <div className="delivery-footer">
                    <div className="delivery-earnings">{formatCurrency(delivery.earnings)}</div>
                    <div className="delivery-actions">
                      {delivery.status === 'pending' && !activeDelivery && (
                        <button className="btn-start" onClick={() => startDelivery(delivery)}>Start</button>
                      )}
                      {delivery.status === 'in-progress' && activeDelivery?.id === delivery.id && (
                        <button className="btn-complete" onClick={completeDelivery}>Complete</button>
                      )}
                      {delivery.status === 'completed' && (
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
        <div className="deliveries-map">
          <div className="map-card">
            <div className="map-header">
              <h3>Live Tracking</h3>
              {activeDelivery && (
                <div className="active-badge">Active: {activeDelivery.id}</div>
              )}
            </div>
            <div className="map-container">
              {routeCoords.length > 0 ? (
                <MapContainer
                  center={routeCoords[0]}
                  zoom={12}
                  style={{ height: '500px', width: '100%', borderRadius: '16px' }}
                >
                  <TileLayer
                    url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/attributions">CARTO</a>'
                  />
                  <Polyline positions={routeCoords} color="#ffd700" weight={4} opacity={0.8} />
                  <Marker position={routeCoords[0]} icon={pickupIcon}>
                    <Popup>Pickup: {activeDelivery?.pickup}</Popup>
                  </Marker>
                  <Marker position={routeCoords[routeCoords.length - 1]} icon={dropoffIcon}>
                    <Popup>Dropoff: {activeDelivery?.dropoff}</Popup>
                  </Marker>
                  {vehiclePosition && <AnimatedVehicle position={vehiclePosition} />}
                </MapContainer>
              ) : (
                <div className="map-placeholder">
                  <IconTruck />
                  <p>Select a delivery to start tracking</p>
                </div>
              )}
            </div>
            {activeDelivery && (
              <div className="delivery-progress">
                <div className="progress-bar">
                  <div className="progress-fill" style={{ width: `${progress}%` }} />
                </div>
                <p>{progress}% completed</p>
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

export default Deliveries;