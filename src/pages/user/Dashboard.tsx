// src/pages/user/Dashboard.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import { Car, MessageSquare, Repeat, ShoppingBag, Plus } from 'lucide-react';
import { useAuthStore } from '../../stores/authStore';
import { useCarStore } from '../../stores/carStore';
import { useSwapStore } from '../../stores/swapStore';
import { useOrderStore } from '../../stores/orderStore';
import { useChatStore } from '../../stores/chatStore';
import { Button } from '../../components/ui/Button';
import { CarCard } from '../../components/cars/CarCard';

export const Dashboard: React.FC = () => {
  const { user } = useAuthStore();
  const { getUserCars } = useCarStore();
  const { getUserSwaps } = useSwapStore();
  const { getUserOrders } = useOrderStore();
  const { getUserChats } = useChatStore();

  const userCars = user ? getUserCars(user.id) : [];
  const swaps = user ? getUserSwaps(user.id) : [];
  const orders = user ? getUserOrders(user.id) : [];
  const chats = user ? getUserChats(user.id) : [];
  const unreadMessages = chats.reduce((acc, chat) => acc + chat.unreadCount, 0);

  const stats = [
    { label: 'My Listings', value: userCars.length, icon: Car, color: 'bg-blue-100 text-blue-600' },
    { label: 'Swap Requests', value: swaps.length, icon: Repeat, color: 'bg-purple-100 text-purple-600' },
    { label: 'Orders', value: orders.length, icon: ShoppingBag, color: 'bg-green-100 text-green-600' },
    { label: 'Messages', value: unreadMessages, icon: MessageSquare, color: 'bg-yellow-100 text-yellow-600', suffix: 'unread' },
  ];

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600">Welcome back, {user?.name}</p>
        </div>
        <Link to="/add-car">
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            List a Car
          </Button>
        </Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <div key={stat.label} className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <div className={`w-12 h-12 rounded-lg ${stat.color} flex items-center justify-center mb-4`}>
              <stat.icon className="w-6 h-6" />
            </div>
            <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
            <p className="text-sm text-gray-600">{stat.label} {stat.suffix}</p>
          </div>
        ))}
      </div>

      {/* Recent Listings */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-gray-900">My Recent Listings</h2>
          <Link to="/my-listings" className="text-blue-600 hover:text-blue-700 text-sm font-medium">
            View all
          </Link>
        </div>
        
        {userCars.length === 0 ? (
          <div className="bg-gray-50 rounded-xl p-8 text-center">
            <p className="text-gray-600 mb-4">You haven't listed any cars yet</p>
            <Link to="/add-car">
              <Button>List Your First Car</Button>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {userCars.slice(0, 3).map((car) => (
              <CarCard key={car.id} car={car} />
            ))}
          </div>
        )}
      </div>

      {/* Recent Activity */}
      <div className="grid lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="font-semibold text-gray-900 mb-4">Recent Orders</h3>
          {orders.length === 0 ? (
            <p className="text-gray-500 text-sm">No orders yet</p>
          ) : (
            <div className="space-y-3">
              {orders.slice(0, 3).map((order) => (
                <div key={order.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium text-gray-900">Order #{order.id.slice(0, 8)}</p>
                    <p className="text-sm text-gray-600">${order.price.toLocaleString()}</p>
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium
                    ${order.status === 'completed' ? 'bg-green-100 text-green-800' : 
                      order.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : 
                      'bg-red-100 text-red-800'}
                  `}>
                    {order.status}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="font-semibold text-gray-900 mb-4">Recent Swaps</h3>
          {swaps.length === 0 ? (
            <p className="text-gray-500 text-sm">No swap requests yet</p>
          ) : (
            <div className="space-y-3">
              {swaps.slice(0, 3).map((swap) => (
                <div key={swap.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium text-gray-900">Swap Request</p>
                    <p className="text-sm text-gray-600">{new Date(swap.createdAt).toLocaleDateString()}</p>
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium
                    ${swap.status === 'completed' ? 'bg-green-100 text-green-800' : 
                      swap.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : 
                      swap.status === 'accepted' ? 'bg-blue-100 text-blue-800' :
                      'bg-red-100 text-red-800'}
                  `}>
                    {swap.status}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};