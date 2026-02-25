// src/pages/user/Orders.tsx
import React from 'react';
import { ShoppingBag, CheckCircle, Clock, XCircle } from 'lucide-react';
import { useAuthStore } from '../../stores/authStore';
import { useOrderStore } from '../../stores/orderStore';
import { useCarStore } from '../../stores/carStore';
import { mockUsers } from '../../data/mockData';
import { formatCurrency } from '../../utils/helpers';

export const Orders: React.FC = () => {
  const { user } = useAuthStore();
  const { getUserOrders } = useOrderStore();
  const { getCarById } = useCarStore();

  const orders = user ? getUserOrders(user.id) : [];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'pending':
        return <Clock className="w-5 h-5 text-yellow-500" />;
      case 'cancelled':
        return <XCircle className="w-5 h-5 text-red-500" />;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-900">My Orders</h1>

      {orders.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-xl border border-gray-200">
          <ShoppingBag className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-600">No orders yet</p>
        </div>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => {
            const car = getCarById(order.carId);
            const isBuyer = order.buyerId === user?.id;
            const otherParty = mockUsers.find(u => u.id === (isBuyer ? order.sellerId : order.buyerId));

            return (
              <div key={order.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <div className="flex items-start justify-between">
                  <div className="flex gap-4">
                    <img 
                      src={car?.images[0]} 
                      alt={car?.title}
                      className="w-24 h-24 rounded-lg object-cover"
                    />
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium
                          ${order.status === 'completed' ? 'bg-green-100 text-green-800' : 
                            order.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : 
                            'bg-red-100 text-red-800'}
                        `}>
                          {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                        </span>
                      </div>
                      <h3 className="font-semibold text-gray-900">{car?.title}</h3>
                      <p className="text-gray-600">{formatCurrency(order.price)}</p>
                      <p className="text-sm text-gray-500 mt-1">
                        {isBuyer ? 'Bought from' : 'Sold to'} {otherParty?.name}
                      </p>
                      <p className="text-xs text-gray-400">
                        {new Date(order.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {getStatusIcon(order.status)}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};