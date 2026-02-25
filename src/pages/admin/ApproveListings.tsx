// src/pages/admin/ApproveListings.tsx
import React from 'react';
import { Check, X } from 'lucide-react';
import { useCarStore } from '../../stores/carStore';
import { useUIStore } from '../../stores/uiStore';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { mockUsers } from '../../data/mockData';

export const ApproveListings: React.FC = () => {
  const { cars, approveCar, updateCar } = useCarStore();
  const { addToast } = useUIStore();

  const pendingCars = cars.filter(c => c.status === 'pending');

  const handleApprove = (id: string) => {
    approveCar(id);
    addToast('Listing approved successfully', 'success');
  };

  const handleReject = (id: string) => {
    updateCar(id, { status: 'sold' }); // Using sold as rejected for demo
    addToast('Listing rejected', 'info');
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-900">Approve Listings</h1>

      {pendingCars.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-xl border border-gray-200">
          <Check className="w-12 h-12 text-green-500 mx-auto mb-4" />
          <p className="text-gray-600">No pending listings to approve</p>
        </div>
      ) : (
        <div className="space-y-4">
          {pendingCars.map((car) => {
            const owner = mockUsers.find(u => u.id === car.ownerId);
            
            return (
              <div key={car.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <div className="flex gap-6">
                  <img 
                    src={car.images[0]} 
                    alt={car.title}
                    className="w-48 h-32 rounded-lg object-cover"
                  />
                  <div className="flex-1">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">{car.title}</h3>
                        <p className="text-2xl font-bold text-blue-600 mt-1">
                          ${car.price.toLocaleString()}
                        </p>
                        <div className="flex items-center gap-4 mt-2 text-sm text-gray-600">
                          <span>{car.year}</span>
                          <span>•</span>
                          <span>{car.mileage.toLocaleString()} mi</span>
                          <span>•</span>
                          <span>{car.transmission}</span>
                          <span>•</span>
                          <span>{car.fuelType}</span>
                        </div>
                        <div className="flex items-center gap-2 mt-3">
                          <img src={owner?.avatar} alt="" className="w-6 h-6 rounded-full" />
                          <span className="text-sm text-gray-600">Listed by {owner?.name}</span>
                          <span className="text-xs text-gray-400">
                            {new Date(car.createdAt).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                      <Badge variant="pending">Pending</Badge>
                    </div>
                    
                    <p className="text-gray-600 mt-4 line-clamp-2">{car.description}</p>

                    <div className="flex gap-3 mt-4">
                      <Button 
                        variant="outline" 
                        onClick={() => handleReject(car.id)}
                      >
                        <X className="w-4 h-4 mr-2" />
                        Reject
                      </Button>
                      <Button 
                        onClick={() => handleApprove(car.id)}
                      >
                        <Check className="w-4 h-4 mr-2" />
                        Approve
                      </Button>
                    </div>
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