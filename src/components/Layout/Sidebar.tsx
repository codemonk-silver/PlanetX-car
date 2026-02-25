// src/components/layout/Sidebar.tsx (Updated with Categories)
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Car, 
  PlusCircle, 
  Repeat, 
  MessageSquare, 
  ShoppingBag, 
  UserCircle, 
  Shield,
  CheckCircle,
  Users,
  DollarSign,
  Grid3X3,
  ChevronRight
} from 'lucide-react';
import { useAuthStore } from '../../stores/authStore';
import { useUIStore } from '../../stores/uiStore';
import { categories } from '../../types';

interface NavItem {
  path: string;
  label: string;
  icon: React.ReactNode;
  admin?: boolean;
  children?: { path: string; label: string }[];
}

const userNavItems: NavItem[] = [
  { path: '/dashboard', label: 'Dashboard', icon: <LayoutDashboard className="h-5 w-5" /> },
  { path: '/my-listings', label: 'My Listings', icon: <Car className="h-5 w-5" /> },
  { path: '/add-car', label: 'Add New Car', icon: <PlusCircle className="h-5 w-5" /> },
  { path: '/swap-requests', label: 'Swap Requests', icon: <Repeat className="h-5 w-5" /> },
  { path: '/messages', label: 'Messages', icon: <MessageSquare className="h-5 w-5" /> },
  { path: '/orders', label: 'Orders', icon: <ShoppingBag className="h-5 w-5" /> },
  { path: '/profile', label: 'Profile', icon: <UserCircle className="h-5 w-5" /> },
];

const adminNavItems: NavItem[] = [
  { path: '/admin', label: 'Admin Dashboard', icon: <Shield className="h-5 w-5" />, admin: true },
  { path: '/admin/approve', label: 'Approve Listings', icon: <CheckCircle className="h-5 w-5" />, admin: true },
  { path: '/admin/users', label: 'Manage Users', icon: <Users className="h-5 w-5" />, admin: true },
  { path: '/admin/transactions', label: 'Transactions', icon: <DollarSign className="h-5 w-5" />, admin: true },
];

export const Sidebar: React.FC = () => {
  const { user } = useAuthStore();
  const { isSidebarOpen, setSidebarOpen } = useUIStore();
  const location = useLocation();
  const isAdmin = user?.role === 'admin';

  const navItems = isAdmin ? [...userNavItems, ...adminNavItems] : userNavItems;

  return (
    <>
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-gray-900 bg-opacity-50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
      
      <aside className={`
        fixed left-0 top-16 h-[calc(100vh-4rem)] w-64 bg-white border-r border-gray-200 z-40
        transform transition-transform duration-300 ease-in-out overflow-y-auto
        lg:translate-x-0
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div className="py-4">
          {/* Categories Section */}
          <div className="px-4 mb-6">
            <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3 flex items-center gap-2">
              <Grid3X3 className="w-4 h-4" />
              Categories
            </h3>
            <div className="space-y-1">
              <Link
                to="/categories"
                onClick={() => setSidebarOpen(false)}
                className={`
                  flex items-center justify-between px-3 py-2 rounded-lg text-sm transition-colors
                  ${location.pathname === '/categories' 
                    ? 'bg-blue-50 text-blue-700' 
                    : 'text-gray-700 hover:bg-gray-100'
                  }
                `}
              >
                All Categories
                <ChevronRight className="w-4 h-4" />
              </Link>
              {categories.slice(0, 4).map((cat) => (
                <Link
                  key={cat.slug}
                  to={`/category/${cat.slug}`}
                  onClick={() => setSidebarOpen(false)}
                  className={`
                    flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors
                    ${location.pathname === `/category/${cat.slug}` 
                      ? 'bg-blue-50 text-blue-700' 
                      : 'text-gray-700 hover:bg-gray-100'
                    }
                  `}
                >
                  <img src={cat.image} alt="" className="w-6 h-6 rounded object-cover" />
                  {cat.name}
                </Link>
              ))}
            </div>
          </div>

          <div className="border-t border-gray-200 pt-4">
            <nav className="space-y-1 px-3">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setSidebarOpen(false)}
                  className={`
                    flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors
                    ${location.pathname === item.path 
                      ? 'bg-blue-50 text-blue-700' 
                      : 'text-gray-700 hover:bg-gray-100'
                    }
                    ${item.admin ? 'mt-4 border-t border-gray-200 pt-4' : ''}
                  `}
                >
                  {item.icon}
                  {item.label}
                  {item.admin && (
                    <span className="ml-auto text-xs bg-purple-100 text-purple-700 px-2 py-0.5 rounded-full">
                      Admin
                    </span>
                  )}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      </aside>
    </>
  );
};