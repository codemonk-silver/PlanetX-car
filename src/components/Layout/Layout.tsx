// src/components/layout/Layout.tsx
import React from 'react';
import { Outlet } from 'react-router-dom';
import { Navbar } from './Navbar';
import { Sidebar } from './Sidebar';
import { ToastContainer } from '../ui/Toast';
import { useAuthStore } from '../../stores/authStore';

export const Layout: React.FC = () => {
  const { isAuthenticated } = useAuthStore();

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="flex">
        {isAuthenticated && <Sidebar />}
        
        <main className={`
          flex-1 transition-all duration-300
          ${isAuthenticated ? 'lg:ml-64' : ''}
        `}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <Outlet />
          </div>
        </main>
      </div>
      
      <ToastContainer />
    </div>
  );
};