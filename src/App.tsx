// src/App.tsx
import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Layout } from './components/Layout/Layout';
import { LandingPage } from './pages/public/LandingPage';
import { BrowseCars } from './pages/public/BrowseCars';
import { CarDetails } from './pages/public/CarDetails';
import { Login } from './pages/public/Login';
import { Register } from './pages/public/Register';
import { CategoryPage } from './pages/public/CategoryPage';
import { AllCategories } from './pages/public/AllCategories';
import { Dashboard } from './pages/user/Dashboard';
import { MyListings } from './pages/user/MyListings';
import { AddCar } from './pages/user/AddCar';
import { SwapRequests } from './pages/user/SwapRequests';
import { Messages } from './pages/user/Messages';
import { Orders } from './pages/user/Orders';
import { Profile } from './pages/user/Profile';
import { AdminDashboard } from './pages/admin/AdminDashboard';
import { ApproveListings } from './pages/admin/ApproveListings';
import { ManageUsers } from './pages/admin/ManageUsers';
import { Transactions } from './pages/admin/Transactions';
import { useAuthStore } from './stores/authStore';

const ProtectedRoute: React.FC<{ children: React.ReactNode; adminOnly?: boolean }> = ({ 
  children, 
  adminOnly = false 
}) => {
  const { isAuthenticated, user } = useAuthStore();
  
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }
  
  if (adminOnly && user?.role !== 'admin') {
    return <Navigate to="/dashboard" />;
  }
  
  return <>{children}</>;
};

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          {/* Public Routes */}
          <Route index element={<LandingPage />} />
          <Route path="browse" element={<BrowseCars />} />
          <Route path="car/:id" element={<CarDetails />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          
          {/* Category Routes - NEW */}
          <Route path="categories" element={<AllCategories />} />
          <Route path="category/:slug" element={<CategoryPage />} />
          
          {/* User Routes */}
          <Route path="dashboard" element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          } />
          <Route path="my-listings" element={
            <ProtectedRoute>
              <MyListings />
            </ProtectedRoute>
          } />
          <Route path="add-car" element={
            <ProtectedRoute>
              <AddCar />
            </ProtectedRoute>
          } />
          <Route path="swap-requests" element={
            <ProtectedRoute>
              <SwapRequests />
            </ProtectedRoute>
          } />
          <Route path="messages" element={
            <ProtectedRoute>
              <Messages />
            </ProtectedRoute>
          } />
          <Route path="orders" element={
            <ProtectedRoute>
              <Orders />
            </ProtectedRoute>
          } />
          <Route path="profile" element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          } />
          
          {/* Admin Routes */}
          <Route path="admin" element={
            <ProtectedRoute adminOnly>
              <AdminDashboard />
            </ProtectedRoute>
          } />
          <Route path="admin/approve" element={
            <ProtectedRoute adminOnly>
              <ApproveListings />
            </ProtectedRoute>
          } />
          <Route path="admin/users" element={
            <ProtectedRoute adminOnly>
              <ManageUsers />
            </ProtectedRoute>
          } />
          <Route path="admin/transactions" element={
            <ProtectedRoute adminOnly>
              <Transactions />
            </ProtectedRoute>
          } />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;