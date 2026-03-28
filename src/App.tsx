import { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AppLoader from './components/AppLoader';
import DashboardLayout from './components/DashboardLayout';
import './App.css';

// ── Lazy‑loaded pages ──────────────────────────────────────────────
const Home = lazy(() => import('./pages/Home'));
const HowItWorks = lazy(() => import('./pages/HowItWorks'));
const Services = lazy(() => import('./pages/Services'));
const ForCouriers = lazy(() => import('./pages/ForCouriers'));
const About = lazy(() => import('./pages/About'));
const Contact = lazy(() => import('./pages/Contact'));
const Privacy = lazy(() => import('./pages/Privacy'));
const Terms = lazy(() => import('./pages/Terms'));
const Security = lazy(() => import('./pages/Security'));
const FleetManagement = lazy(() => import('./pages/FleetManagement'));
const Careers = lazy(() => import('./pages/Careers')); // ← added

// ── Auth pages ────────────────────────────────────────────────────
const Login = lazy(() => import('./pages/Login'));
const Signup = lazy(() => import('./pages/Signup'));
const CourierSignup = lazy(() => import('./pages/CourierSignup'));

// ── Customer Dashboard pages ──────────────────────────────────────
const DashboardOverview = lazy(() => import('./pages/customer-dashboard/Overview'));
const Wallet = lazy(() => import('./pages/customer-dashboard/Wallet'));
const Orders = lazy(() => import('./pages/customer-dashboard/Orders'));
const Tracking = lazy(() => import('./pages/customer-dashboard/Tracking'));
const Shipment = lazy(() => import('./pages/customer-dashboard/Shipment'));
const Chat = lazy(() => import('./pages/customer-dashboard/Chat'));
const Profile = lazy(() => import('./pages/customer-dashboard/Profile'));
const Settings = lazy(() => import('./pages/customer-dashboard/Settings'));

// ── Courier Dashboard pages ───────────────────────────────────────
const CourierLayout = lazy(() => import('./components/CourierLayout'));
const CourierOverview = lazy(() => import('./pages/courier-dashboard/Overview'));
const CourierDeliveries = lazy(() => import('./pages/courier-dashboard/Deliveries'));
const CourierEarnings = lazy(() => import('./pages/courier-dashboard/Earnings'));
const CourierPickup = lazy(() => import('./pages/courier-dashboard/Pickup'));
const CourierAvailability = lazy(() => import('./pages/courier-dashboard/Availability'));
const CourierProfile = lazy(() => import('./pages/courier-dashboard/Profile'));
const CourierSettings = lazy(() => import('./pages/courier-dashboard/Settings'));
const CourierChat = lazy(() => import('./pages/courier-dashboard/Chat'));

function App() {
  return (
    <Router>
      <Suspense fallback={<AppLoader />}>
        <Routes>
          {/* Main Pages */}
          <Route path="/" element={<Home />} />
          <Route path="/how-it-works" element={<HowItWorks />} />
          <Route path="/services" element={<Services />} />
          <Route path="/couriers" element={<ForCouriers />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/security" element={<Security />} />
          <Route path="/fleet" element={<FleetManagement />} />
          <Route path="/careers" element={<Careers />} /> {/* ← added */}

          {/* Auth Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/courier/signup" element={<CourierSignup />} />

          {/* Customer Dashboard Routes */}
          <Route path="/dashboard" element={<DashboardLayout />}>
            <Route index element={<DashboardOverview />} />
            <Route path="wallet" element={<Wallet />} />
            <Route path="orders" element={<Orders />} />
            <Route path="tracking/:id?" element={<Tracking />} />
            <Route path="shipment" element={<Shipment />} />
            <Route path="chat" element={<Chat />} />
            <Route path="profile" element={<Profile />} />
            <Route path="settings" element={<Settings />} />
          </Route>

          {/* Courier Dashboard Routes */}
          <Route path="/courier" element={<CourierLayout />}>
            <Route index element={<CourierOverview />} />
            <Route path="deliveries" element={<CourierDeliveries />} />
            <Route path="earnings" element={<CourierEarnings />} />
            <Route path="pickup" element={<CourierPickup />} />
            <Route path="availability" element={<CourierAvailability />} />
            <Route path="profile" element={<CourierProfile />} />
            <Route path="settings" element={<CourierSettings />} />
            <Route path="chat" element={<CourierChat />} />
          </Route>

          {/* 404 fallback */}
          <Route path="*" element={<Home />} />
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;