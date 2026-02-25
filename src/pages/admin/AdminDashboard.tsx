// src/pages/admin/AdminDashboard.tsx
import React from 'react';
import { Shield, Car, Users, DollarSign, TrendingUp } from 'lucide-react';
import { useCarStore } from '../../stores/carStore';
import { useOrderStore } from '../../stores/orderStore';
import { mockUsers } from '../../data/mockData';

export const AdminDashboard: React.FC = () => {
  const { cars } = useCarStore();
  const { orders } = useOrderStore();

  const pendingCars = cars.filter(c => c.status === 'pending').length;
  const totalUsers = mockUsers.length;
  const totalRevenue = orders.reduce((acc, o) => acc + (o.status === 'completed' ? o.price : 0), 0);
  const pendingOrders = orders.filter(o => o.status === 'pending').length;

  const stats = [
    { label: 'Pending Approvals', value: pendingCars, icon: Car, color: 'bg-yellow-100 text-yellow-600' },
    { label: 'Total Users', value: totalUsers, icon: Users, color: 'bg-blue-100 text-blue-600' },
    { label: 'Total Revenue', value: `$${(totalRevenue / 1000).toFixed(1)}k`, icon: DollarSign, color: 'bg-green-100 text-green-600' },
    { label: 'Pending Orders', value: pendingOrders, icon: TrendingUp, color: 'bg-purple-100 text-purple-600' },
  ];

  return (
    <div className="space-y-8">
      <div className="flex items-center gap-3">
        <Shield className="w-8 h-8 text-purple-600" />
        <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <div key={stat.label} className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <div className={`w-12 h-12 rounded-lg ${stat.color} flex items-center justify-center mb-4`}>
              <stat.icon className="w-6 h-6" />
            </div>
            <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
            <p className="text-sm text-gray-600">{stat.label}</p>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="font-semibold text-gray-900 mb-4">Recent Pending Listings</h3>
          <div className="space-y-3">
            {cars.filter(c => c.status === 'pending').slice(0, 3).map((car) => (
              <div key={car.id} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                <img src={car.images[0]} alt="" className="w-12 h-12 rounded-lg object-cover" />
                <div className="flex-1">
                  <p className="font-medium text-sm">{car.title}</p>
                  <p className="text-xs text-gray-600">${car.price.toLocaleString()}</p>
                </div>
                <span className="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs rounded-full">Pending</span>
              </div>
            ))}
            {cars.filter(c => c.status === 'pending').length === 0 && (
              <p className="text-gray-500 text-sm">No pending listings</p>
            )}
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="font-semibold text-gray-900 mb-4">Recent Orders</h3>
          <div className="space-y-3">
            {orders.slice(0, 3).map((order) => (
              <div key={order.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium text-sm">Order #{order.id.slice(0, 8)}</p>
                  <p className="text-xs text-gray-600">${order.price.toLocaleString()}</p>
                </div>
                <span className={`px-2 py-1 text-xs rounded-full
                  ${order.status === 'completed' ? 'bg-green-100 text-green-800' : 
                    order.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : 
                    'bg-red-100 text-red-800'}
                `}>
                  {order.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};