import React, { useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import CourierSidebar from './CourierSidebar';
import CourierHeader from './CourierHeader';
import '../assets/css/DashboardLayout.css';

const CourierLayout: React.FC = () => {
  const [isManuallyOpen, setIsManuallyOpen] = useState(false);
  const location = useLocation();

  const toggleSidebar = () => {
    setIsManuallyOpen(prev => !prev);
  };

  return (
    <div className="dashboard-layout">
      <CourierSidebar
        key={location.pathname}
        isOpen={isManuallyOpen}
        onClose={() => setIsManuallyOpen(false)}
      />

      <div className="dashboard-main">
        <CourierHeader onMenuClick={toggleSidebar} />

        <main className="dashboard-content">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default CourierLayout;