// src/components/swap/SwapModal.tsx
import React, { useState } from 'react';
import { ArrowRightLeft } from 'lucide-react';
import { useSwapStore } from '../../stores/swapStore';
import { useCarStore } from '../../stores/carStore';
import { useAuthStore } from '../../stores/authStore';
import { useUIStore } from '../../stores/uiStore';
import type { Car } from '../../types';
import { Modal } from '../ui/Modal';
import { Button } from '../ui/Button';

interface SwapModalProps {
  isOpen: boolean;
  onClose: () => void;
  targetCar: Car;
}

export const SwapModal: React.FC<SwapModalProps> = ({ isOpen, onClose, targetCar }) => {
  const { user } = useAuthStore();
  const { getUserCars } = useCarStore();
  const { createSwap } = useSwapStore();
  const { addToast } = useUIStore();
  
  const [selectedCarId, setSelectedCarId] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const userCars = user ? getUserCars(user.id).filter(c => c.status === 'approved') : [];

  const handleSubmit = async () => {
    if (!selectedCarId || !user) return;
    
    setIsSubmitting(true);
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    createSwap(selectedCarId, targetCar.id, user.id, targetCar.ownerId, message);
    
    addToast('Swap request sent successfully!', 'success');
    setIsSubmitting(false);
    onClose();
    setSelectedCarId('');
    setMessage('');
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Propose Swap" size="md">
      <div className="space-y-6">
        <div className="bg-gray-50 rounded-lg p-4">
          <p className="text-sm text-gray-600 mb-2">You want to swap for:</p>
          <div className="flex items-center gap-3">
            <img 
              src={targetCar.images[0]} 
              alt={targetCar.title}
              className="w-16 h-16 rounded-lg object-cover"
            />
            <div>
              <h4 className="font-semibold text-gray-900">{targetCar.title}</h4>
              <p className="text-sm text-gray-600">${targetCar.price.toLocaleString()}</p>
            </div>
          </div>
        </div>

        {userCars.length === 0 ? (
          <div className="text-center py-6">
            <p className="text-gray-600 mb-4">You don't have any approved cars to swap.</p>
            <Button onClick={() => { onClose(); window.location.href = '/add-car'; }}>
              Add a Car First
            </Button>
          </div>
        ) : (
          <>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Select your car to offer
              </label>
              <div className="space-y-2 max-h-60 overflow-y-auto">
                {userCars.map((car) => (
                  <button
                    key={car.id}
                    onClick={() => setSelectedCarId(car.id)}
                    className={`
                      w-full flex items-center gap-3 p-3 rounded-lg border-2 text-left transition-all
                      ${selectedCarId === car.id 
                        ? 'border-blue-500 bg-blue-50' 
                        : 'border-gray-200 hover:border-gray-300'
                      }
                    `}
                  >
                    <img 
                      src={car.images[0]} 
                      alt={car.title}
                      className="w-12 h-12 rounded object-cover"
                    />
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-900 text-sm">{car.title}</h4>
                      <p className="text-xs text-gray-600">${car.price.toLocaleString()}</p>
                    </div>
                    {selectedCarId === car.id && (
                      <div className="w-5 h-5 rounded-full bg-blue-500 flex items-center justify-center">
                        <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                    )}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Message (optional)
              </label>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Introduce yourself and explain why you'd like to swap..."
                className="w-full rounded-lg border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                rows={3}
              />
            </div>

            <div className="flex gap-3">
              <Button variant="outline" fullWidth onClick={onClose}>
                Cancel
              </Button>
              <Button 
                fullWidth 
                disabled={!selectedCarId || isSubmitting}
                isLoading={isSubmitting}
                onClick={handleSubmit}
              >
                <ArrowRightLeft className="w-4 h-4 mr-2" />
                Send Request
              </Button>
            </div>
          </>
        )}
      </div>
    </Modal>
  );
};