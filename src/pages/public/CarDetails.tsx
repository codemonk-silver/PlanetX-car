// src/pages/public/CarDetails.tsx
import React, { useState, useEffect } from 'react';
import { useParams, useSearchParams, useNavigate } from 'react-router-dom';
import { MapPin, Calendar, Gauge, Fuel, Settings2, MessageCircle, ArrowLeft } from 'lucide-react';
import { useCarStore } from '../../stores/carStore';
import { useAuthStore } from '../../stores/authStore';
import { useOrderStore } from '../../stores/orderStore';
import { useUIStore } from '../../stores/uiStore';
import { mockUsers } from '../../data/mockData';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { Modal } from '../../components/ui/Modal';
import { SwapModal } from '../../components/swap/SwapModal';

export const CarDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { getCarById } = useCarStore();
  const { user, isAuthenticated } = useAuthStore();
  const { createOrder } = useOrderStore();
  const { addToast } = useUIStore();
  
  const [car, setCar] = useState(getCarById(id || ''));
  const [activeImage, setActiveImage] = useState(0);
  const [isBuyModalOpen, setIsBuyModalOpen] = useState(searchParams.get('action') === 'buy');
  const [isSwapModalOpen, setIsSwapModalOpen] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    if (id) {
      setCar(getCarById(id));
    }
  }, [id, getCarById]);

  if (!car) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-gray-900">Car not found</h2>
        <Button onClick={() => navigate('/browse')} className="mt-4">
          Back to Browse
        </Button>
      </div>
    );
  }

  const owner = mockUsers.find(u => u.id === car.ownerId);
  const isOwnCar = user?.id === car.ownerId;

  const handleBuy = async () => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    
    setIsProcessing(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    createOrder(car.id, user!.id, car.ownerId, car.price);
    addToast('Order placed successfully! Pending approval.', 'success');
    setIsProcessing(false);
    setIsBuyModalOpen(false);
  };

  const handleContact = () => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    // Navigate to messages with this user
    navigate('/messages');
  };

  return (
    <div className="space-y-6">
      <button 
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-gray-600 hover:text-gray-900"
      >
        <ArrowLeft className="w-4 h-4" />
        Back
      </button>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Images */}
        <div className="space-y-4">
          <div className="aspect-[4/3] rounded-2xl overflow-hidden bg-gray-100">
            <img 
              src={car.images[activeImage]} 
              alt={car.title}
              className="w-full h-full object-cover"
            />
          </div>
          {car.images.length > 1 && (
            <div className="flex gap-2">
              {car.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImage(idx)}
                  className={`
                    w-20 h-20 rounded-lg overflow-hidden border-2
                    ${activeImage === idx ? 'border-blue-500' : 'border-transparent'}
                  `}
                >
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Info */}
        <div className="space-y-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Badge variant={car.listingType === 'sale' ? 'sale' : car.listingType === 'swap' ? 'swap' : 'both'}>
                {car.listingType === 'sale' ? 'For Sale' : car.listingType === 'swap' ? 'For Swap' : 'Sale or Swap'}
              </Badge>
              <Badge variant={car.status}>
                {car.status}
              </Badge>
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">{car.title}</h1>
            <p className="text-3xl font-bold text-blue-600">
              ${car.price.toLocaleString()}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl">
              <Calendar className="w-5 h-5 text-gray-400" />
              <div>
                <p className="text-sm text-gray-600">Year</p>
                <p className="font-semibold">{car.year}</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl">
              <Gauge className="w-5 h-5 text-gray-400" />
              <div>
                <p className="text-sm text-gray-600">Mileage</p>
                <p className="font-semibold">{car.mileage.toLocaleString()} mi</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl">
              <Settings2 className="w-5 h-5 text-gray-400" />
              <div>
                <p className="text-sm text-gray-600">Transmission</p>
                <p className="font-semibold">{car.transmission}</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl">
              <Fuel className="w-5 h-5 text-gray-400" />
              <div>
                <p className="text-sm text-gray-600">Fuel Type</p>
                <p className="font-semibold">{car.fuelType}</p>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-200 pt-6">
            <h3 className="font-semibold text-gray-900 mb-2">Description</h3>
            <p className="text-gray-600 leading-relaxed">{car.description}</p>
          </div>

          <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl">
            <img 
              src={owner?.avatar} 
              alt={owner?.name}
              className="w-12 h-12 rounded-full object-cover"
            />
            <div className="flex-1">
              <p className="font-medium text-gray-900">{owner?.name}</p>
              <div className="flex items-center gap-1 text-sm text-gray-600">
                <MapPin className="w-4 h-4" />
                {car.location}
              </div>
            </div>
          </div>

          {!isOwnCar && (
            <div className="flex gap-3">
              {car.listingType !== 'swap' && (
                <Button 
                  size="lg" 
                  fullWidth
                  onClick={() => setIsBuyModalOpen(true)}
                >
                  Buy Now
                </Button>
              )}
              {car.listingType !== 'sale' && (
                <Button 
                  size="lg" 
                  variant="outline"
                  fullWidth
                  onClick={() => setIsSwapModalOpen(true)}
                >
                  Propose Swap
                </Button>
              )}
              <Button 
                size="lg" 
                variant="ghost"
                onClick={handleContact}
              >
                <MessageCircle className="w-5 h-5" />
              </Button>
            </div>
          )}
        </div>
      </div>

      {/* Buy Modal */}
      <Modal 
        isOpen={isBuyModalOpen} 
        onClose={() => setIsBuyModalOpen(false)}
        title="Complete Purchase"
      >
        <div className="space-y-4">
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="flex items-center gap-4">
              <img src={car.images[0]} alt="" className="w-20 h-20 rounded-lg object-cover" />
              <div>
                <h4 className="font-semibold">{car.title}</h4>
                <p className="text-blue-600 font-bold">${car.price.toLocaleString()}</p>
              </div>
            </div>
          </div>
          
          <div className="space-y-2">
            <p className="text-sm text-gray-600">Buyer Information</p>
            <div className="p-3 bg-gray-50 rounded-lg">
              <p className="font-medium">{user?.name}</p>
              <p className="text-sm text-gray-600">{user?.email}</p>
            </div>
          </div>

          <div className="bg-blue-50 p-4 rounded-lg text-sm text-blue-800">
            <p>This is a simulated purchase. No real payment will be processed.</p>
          </div>

          <div className="flex gap-3">
            <Button variant="outline" fullWidth onClick={() => setIsBuyModalOpen(false)}>
              Cancel
            </Button>
            <Button 
              fullWidth 
              isLoading={isProcessing}
              onClick={handleBuy}
            >
              Confirm Purchase
            </Button>
          </div>
        </div>
      </Modal>

      {/* Swap Modal */}
      <SwapModal 
        isOpen={isSwapModalOpen}
        onClose={() => setIsSwapModalOpen(false)}
        targetCar={car}
      />
    </div>
  );
};