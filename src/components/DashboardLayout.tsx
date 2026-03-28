import React, { useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import DashboardSidebar from './DashboardSidebar';
import DashboardHeader from './DashboardHeader';
import '../assets/css/DashboardLayout.css';

const DashboardLayout: React.FC = () => {
  const [isManuallyOpen, setIsManuallyOpen] = useState(false);
  const location = useLocation();

  const toggleSidebar = () => {
    setIsManuallyOpen(prev => !prev);
  };

  return (
    <div className="dashboard-layout">
      {/* 🔑 KEY IDEA: remount sidebar on route change */}
      <DashboardSidebar
        key={location.pathname}
        isOpen={isManuallyOpen}
        onClose={() => setIsManuallyOpen(false)}
      />

      <div className="dashboard-main">
        <DashboardHeader onMenuClick={toggleSidebar} />

        <main className="dashboard-content">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;