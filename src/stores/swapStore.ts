// src/stores/swapStore.ts
import { create } from 'zustand';
import type { SwapRequest } from '../types';
import { mockSwapRequests } from '../data/mockData';

interface SwapState {
  swaps: SwapRequest[];
  
  createSwap: (requesterCarId: string, requestedCarId: string, requesterId: string, ownerId: string, message?: string) => void;
  acceptSwap: (swapId: string) => void;
  rejectSwap: (swapId: string) => void;
  completeSwap: (swapId: string) => void;
  getUserSwaps: (userId: string) => SwapRequest[];
  getPendingSwaps: (userId: string) => SwapRequest[];
}

export const useSwapStore = create<SwapState>((set, get) => ({
  swaps: mockSwapRequests,

  createSwap: (requesterCarId, requestedCarId, requesterId, ownerId, message) => {
    const newSwap: SwapRequest = {
      id: Math.random().toString(36).substr(2, 9),
      requesterCarId,
      requestedCarId,
      requesterId,
      ownerId,
      status: 'pending',
      createdAt: new Date(),
      message,
    };
    
    set((state) => ({
      swaps: [...state.swaps, newSwap],
    }));
  },

  acceptSwap: (swapId) => {
    set((state) => ({
      swaps: state.swaps.map(swap => 
        swap.id === swapId ? { ...swap, status: 'accepted' as const } : swap
      ),
    }));
  },

  rejectSwap: (swapId) => {
    set((state) => ({
      swaps: state.swaps.map(swap => 
        swap.id === swapId ? { ...swap, status: 'rejected' as const } : swap
      ),
    }));
  },

  completeSwap: (swapId) => {
    set((state) => ({
      swaps: state.swaps.map(swap => 
        swap.id === swapId ? { ...swap, status: 'completed' as const } : swap
      ),
    }));
  },

  getUserSwaps: (userId) => {
    return get().swaps.filter(s => s.requesterId === userId || s.ownerId === userId);
  },

  getPendingSwaps: (userId) => {
    return get().swaps.filter(s => 
      (s.requesterId === userId || s.ownerId === userId) && s.status === 'pending'
    );
  },
}));