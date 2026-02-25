// src/pages/user/MyListings.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import { Plus, Edit, Trash2 } from 'lucide-react';
import { useAuthStore } from '../../stores/authStore';
import { useCarStore } from '../../stores/carStore';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';

export const MyListings: React.FC = () => {
  const { user } = useAuthStore();
  const { getUserCars, deleteCar, updateCar } = useCarStore();
  const cars = user ? getUserCars(user.id) : [];

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this listing?')) {
      deleteCar(id);
    }
  };

  const handleToggleStatus = (car: typeof cars[0]) => {
    const newStatus = car.status === 'approved' ? 'sold' : 'approved';
    updateCar(car.id, { status: newStatus });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">My Listings</h1>
        <Link to="/add-car">
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            Add New Car
          </Button>
        </Link>
      </div>

      {cars.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-xl border border-gray-200">
          <p className="text-gray-600 mb-4">You haven't listed any cars yet</p>
          <Link to="/add-car">
            <Button>List Your First Car</Button>
          </Link>
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Car</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Price</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Type</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {cars.map((car) => (
                  <tr key={car.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <img 
                          src={car.images[0]} 
                          alt={car.title}
                          className="w-12 h-12 rounded-lg object-cover"
                        />
                        <div>
                          <p className="font-medium text-gray-900">{car.title}</p>
                          <p className="text-sm text-gray-500">{car.year} • {car.mileage.toLocaleString()} mi</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-gray-900 font-medium">
                      ${car.price.toLocaleString()}
                    </td>
                    <td className="px-6 py-4">
                      <Badge variant={car.status}>
                        {car.status.charAt(0).toUpperCase() + car.status.slice(1)}
                      </Badge>
                    </td>
                    <td className="px-6 py-4">
                      <Badge variant={car.listingType === 'sale' ? 'sale' : car.listingType === 'swap' ? 'swap' : 'both'}>
                        {car.listingType === 'sale' ? 'Sale' : car.listingType === 'swap' ? 'Swap' : 'Both'}
                      </Badge>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => handleToggleStatus(car)}
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg"
                          title={car.status === 'approved' ? 'Mark as sold' : 'Mark as available'}
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(car.id)}
                          className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};