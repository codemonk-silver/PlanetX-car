// src/pages/admin/Transactions.tsx
import React from 'react';
import { useOrderStore } from '../../stores/orderStore';
import { useCarStore } from '../../stores/carStore';
import { mockUsers } from '../../data/mockData';
import { Button } from '../../components/ui/Button';
import { formatCurrency } from '../../utils/helpers';

export const Transactions: React.FC = () => {
  const { orders, completeOrder } = useOrderStore();
  const { getCarById } = useCarStore();

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-900">Transactions</h1>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Order ID</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Car</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Buyer</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Amount</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {orders.map((order) => {
              const car = getCarById(order.carId);
              const buyer = mockUsers.find(u => u.id === order.buyerId);
              
              return (
                <tr key={order.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 font-mono text-sm text-gray-600">
                    #{order.id.slice(0, 8)}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <img 
                        src={car?.images[0]} 
                        alt=""
                        className="w-10 h-10 rounded-lg object-cover"
                      />
                      <span className="font-medium text-gray-900 line-clamp-1">{car?.title}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-gray-600">{buyer?.name}</td>
                  <td className="px-6 py-4 font-medium text-gray-900">
                    {formatCurrency(order.price)}
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium
                      ${order.status === 'completed' ? 'bg-green-100 text-green-800' : 
                        order.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : 
                        'bg-red-100 text-red-800'}
                    `}>
                      {order.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    {order.status === 'pending' && (
                      <Button 
                        size="sm"
                        onClick={() => completeOrder(order.id)}
                      >
                        Complete
                      </Button>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};