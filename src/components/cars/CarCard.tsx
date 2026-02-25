// src/components/cars/CarCard.tsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { MapPin, Gauge, Fuel, Settings2 } from 'lucide-react';
import type { Car } from '../../types';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';

interface CarCardProps {
  car: Car;
  showActions?: boolean;
}

export const CarCard: React.FC<CarCardProps> = ({ car, showActions = true }) => {
  const navigate = useNavigate();

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
    }).format(price);
  };

  const getListingTypeVariant = () => {
    switch (car.listingType) {
      case 'sale': return 'sale';
      case 'swap': return 'swap';
      case 'both': return 'both';
      default: return 'default';
    }
  };

  const getListingTypeLabel = () => {
    switch (car.listingType) {
      case 'sale': return 'For Sale';
      case 'swap': return 'For Swap';
      case 'both': return 'Sale or Swap';
      default: return '';
    }
  };

  return (
    <div className="group bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-xl transition-all duration-300">
      <div className="relative aspect-[4/3] overflow-hidden">
        <img 
          src={car.images[0] || 'https://via.placeholder.com/400x300'} 
          alt={car.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute top-3 left-3">
          <Badge variant={getListingTypeVariant()}>
            {getListingTypeLabel()}
          </Badge>
        </div>
        <div className="absolute top-3 right-3">
          <Badge variant={car.status}>
            {car.status.charAt(0).toUpperCase() + car.status.slice(1)}
          </Badge>
        </div>
      </div>

      <div className="p-4">
        <div className="flex items-start justify-between mb-2">
          <h3 className="text-lg font-semibold text-gray-900 line-clamp-1">{car.title}</h3>
        </div>
        
        <p className="text-2xl font-bold text-blue-600 mb-3">{formatPrice(car.price)}</p>
        
        <div className="grid grid-cols-2 gap-2 mb-4 text-sm text-gray-600">
          <div className="flex items-center gap-1.5">
            <Gauge className="h-4 w-4 text-gray-400" />
            <span>{car.mileage.toLocaleString()} mi</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Settings2 className="h-4 w-4 text-gray-400" />
            <span>{car.transmission}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Fuel className="h-4 w-4 text-gray-400" />
            <span>{car.fuelType}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <MapPin className="h-4 w-4 text-gray-400" />
            <span className="truncate">{car.location}</span>
          </div>
        </div>

        {showActions && (
          <div className="flex gap-2">
            <Button 
              variant="outline" 
              size="sm" 
              fullWidth
              onClick={() => navigate(`/car/${car.id}`)}
            >
              View Details
            </Button>
            {car.listingType !== 'swap' && (
              <Button 
                size="sm" 
                fullWidth
                onClick={() => navigate(`/car/${car.id}?action=buy`)}
              >
                Buy Now
              </Button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};