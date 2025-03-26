import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';
import { Outlet, useLocation } from 'react-router-dom';

export default function Layout() {
  // Use location to confirm router is ready
  const location = useLocation();
  const [isRouterReady, setIsRouterReady] = useState(false);
  
  useEffect(() => {
    setIsRouterReady(true);
  }, [location]);

  return (
    <div className="min-h-screen bg-stone-50 dark:bg-stone-950">
      {isRouterReady && <Navbar />}
      <Outlet />
    </div>
  );
} 