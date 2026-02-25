// src/pages/user/SwapRequests.tsx
import React from 'react';
import { Check, X, ArrowRightLeft } from 'lucide-react';
import { useAuthStore } from '../../stores/authStore';
import { useSwapStore } from '../../stores/swapStore';
import { useCarStore } from '../../stores/carStore';
import { mockUsers } from '../../data/mockData';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';

export const SwapRequests: React.FC = () => {
  const { user } = useAuthStore();
  const { acceptSwap, rejectSwap, getUserSwaps } = useSwapStore();
  const { getCarById } = useCarStore();

  const userSwaps = user ? getUserSwaps(user.id) : [];

  const getCarDetails = (carId: string) => {
    const car = getCarById(carId);
    const owner = mockUsers.find(u => u.id === car?.ownerId);
    return { car, owner };
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-900">Swap Requests</h1>

      {userSwaps.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-xl border border-gray-200">
          <ArrowRightLeft className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-600">No swap requests yet</p>
        </div>
      ) : (
        <div className="space-y-4">
          {userSwaps.map((swap) => {
            const requesterCar = getCarDetails(swap.requesterCarId);
            const requestedCar = getCarDetails(swap.requestedCarId);
            const isIncoming = swap.ownerId === user?.id;
            const otherUser = mockUsers.find(u => u.id === (isIncoming ? swap.requesterId : swap.ownerId));

            return (
              <div key={swap.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <img 
                      src={otherUser?.avatar} 
                      alt={otherUser?.name}
                      className="w-10 h-10 rounded-full"
                    />
                    <div>
                      <p className="font-medium text-gray-900">
                        {isIncoming ? `${otherUser?.name} wants to swap` : `You proposed a swap to ${otherUser?.name}`}
                      </p>
                      <p className="text-sm text-gray-500">
                        {new Date(swap.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <Badge variant={swap.status === 'pending' ? 'pending' : swap.status === 'accepted' ? 'approved' : swap.status === 'completed' ? 'sale' : 'default'}>
                    {swap.status}
                  </Badge>
                </div>

                <div className="flex items-center gap-4 mb-4">
                  <div className="flex-1 bg-gray-50 rounded-lg p-3">
                    <p className="text-xs text-gray-500 mb-1">{isIncoming ? 'Their car' : 'Your car'}</p>
                    <div className="flex items-center gap-3">
                      <img 
                        src={requesterCar.car?.images[0]} 
                        alt=""
                        className="w-16 h-16 rounded-lg object-cover"
                      />
                      <div>
                        <p className="font-medium text-sm">{requesterCar.car?.title}</p>
                        <p className="text-sm text-gray-600">${requesterCar.car?.price.toLocaleString()}</p>
                      </div>
                    </div>
                  </div>

                  <ArrowRightLeft className="w-6 h-6 text-gray-400" />

                  <div className="flex-1 bg-gray-50 rounded-lg p-3">
                    <p className="text-xs text-gray-500 mb-1">{isIncoming ? 'Your car' : 'Their car'}</p>
                    <div className="flex items-center gap-3">
                      <img 
                        src={requestedCar.car?.images[0]} 
                        alt=""
                        className="w-16 h-16 rounded-lg object-cover"
                      />
                      <div>
                        <p className="font-medium text-sm">{requestedCar.car?.title}</p>
                        <p className="text-sm text-gray-600">${requestedCar.car?.price.toLocaleString()}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {swap.message && (
                  <p className="text-sm text-gray-600 bg-gray-50 p-3 rounded-lg mb-4">
                    "{swap.message}"
                  </p>
                )}

                {isIncoming && swap.status === 'pending' && (
                  <div className="flex gap-3">
                    <Button 
                      variant="outline" 
                      fullWidth
                      onClick={() => rejectSwap(swap.id)}
                    >
                      <X className="w-4 h-4 mr-2" />
                      Decline
                    </Button>
                    <Button 
                      fullWidth
                      onClick={() => acceptSwap(swap.id)}
                    >
                      <Check className="w-4 h-4 mr-2" />
                      Accept
                    </Button>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};