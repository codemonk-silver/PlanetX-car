// src/components/layout/Navbar.tsx (Updated with Categories dropdown)
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Car, Menu, LogOut, MessageSquare, Shield, ChevronDown, Grid3X3 } from 'lucide-react';
import { useAuthStore } from '../../stores/authStore';
import { useUIStore } from '../../stores/uiStore';
import { categories } from '../../types';
import { Button } from '../ui/Button';

export const Navbar: React.FC = () => {
  const { user, isAuthenticated, logout } = useAuthStore();
  const { toggleSidebar } = useUIStore();
  const navigate = useNavigate();
  const [showCategories, setShowCategories] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="sticky top-0 z-40 bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center gap-4">
            {isAuthenticated && (
              <button 
                onClick={toggleSidebar}
                className="p-2 rounded-lg hover:bg-gray-100 lg:hidden"
              >
                <Menu className="h-6 w-6 text-gray-600" />
              </button>
            )}
            <Link to="/" className="flex items-center gap-2">
              <div className="bg-blue-600 p-2 rounded-lg">
                <Car className="h-6 w-6 text-white" />
              </div>
              <span className="text-xl font-bold text-gray-900 hidden sm:block">AutoMarket</span>
            </Link>
            
            {/* Categories Dropdown */}
            <div className="hidden lg:block relative ml-8">
              <button 
                onMouseEnter={() => setShowCategories(true)}
                onClick={() => setShowCategories(!showCategories)}
                className="flex items-center gap-1 px-3 py-2 text-gray-600 hover:text-gray-900 font-medium"
              >
                <Grid3X3 className="w-4 h-4" />
                Categories
                <ChevronDown className={`w-4 h-4 transition-transform ${showCategories ? 'rotate-180' : ''}`} />
              </button>
              
              {showCategories && (
                <div 
                  onMouseLeave={() => setShowCategories(false)}
                  className="absolute top-full left-0 mt-1 w-64 bg-white rounded-xl shadow-xl border border-gray-200 py-2 z-50"
                >
                  <Link 
                    to="/categories" 
                    className="block px-4 py-2 text-sm font-medium text-blue-600 hover:bg-blue-50"
                  >
                    View All Categories
                  </Link>
                  <div className="border-t border-gray-100 my-2" />
                  {categories.slice(0, 6).map(cat => (
                    <Link
                      key={cat.slug}
                      to={`/category/${cat.slug}`}
                      className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                    >
                      <img src={cat.image} alt="" className="w-8 h-8 rounded-lg object-cover" />
                      {cat.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="flex items-center gap-4">
            <Link to="/browse" className="hidden md:block text-gray-600 hover:text-gray-900 font-medium">
              Browse Cars
            </Link>
            
            {isAuthenticated ? (
              <>
                <Link to="/messages" className="relative p-2 text-gray-600 hover:text-gray-900">
                  <MessageSquare className="h-6 w-6" />
                  <span className="absolute top-1 right-1 h-2 w-2 bg-red-500 rounded-full" />
                </Link>
                
                <div className="flex items-center gap-3 pl-4 border-l border-gray-200">
                  {user?.role === 'admin' && (
                    <Link to="/admin">
                      <Shield className="h-5 w-5 text-purple-600" />
                    </Link>
                  )}
                  <Link to="/dashboard" className="flex items-center gap-2">
                    <img 
                      src={user?.avatar || 'https://via.placeholder.com/32'} 
                      alt={user?.name}
                      className="h-8 w-8 rounded-full object-cover border-2 border-gray-200"
                    />
                    <span className="hidden md:block text-sm font-medium text-gray-700">
                      {user?.name}
                    </span>
                  </Link>
                  <button 
                    onClick={handleLogout}
                    className="p-2 text-gray-400 hover:text-red-600 transition-colors"
                  >
                    <LogOut className="h-5 w-5" />
                  </button>
                </div>
              </>
            ) : (
              <div className="flex items-center gap-3">
                <Link to="/login">
                  <Button variant="ghost" size="sm">Sign In</Button>
                </Link>
                <Link to="/register">
                  <Button size="sm">Get Started</Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};