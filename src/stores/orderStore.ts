// src/stores/orderStore.ts
import { create } from 'zustand';
import type{ Order } from '../types';
import { mockOrders } from '../data/mockData';

interface OrderState {
  orders: Order[];
  
  createOrder: (carId: string, buyerId: string, sellerId: string, price: number) => void;
  completeOrder: (orderId: string) => void;
  cancelOrder: (orderId: string) => void;
  getUserOrders: (userId: string) => Order[];
  getPendingOrders: () => Order[];
}

export const useOrderStore = create<OrderState>((set, get) => ({
  orders: mockOrders,

  createOrder: (carId, buyerId, sellerId, price) => {
    const newOrder: Order = {
      id: Math.random().toString(36).substr(2, 9),
      carId,
      buyerId,
      sellerId,
      price,
      status: 'pending',
      createdAt: new Date(),
    };
    
    set((state) => ({
      orders: [...state.orders, newOrder],
    }));
  },

  completeOrder: (orderId) => {
    set((state) => ({
      orders: state.orders.map(order => 
        order.id === orderId ? { ...order, status: 'completed' as const } : order
      ),
    }));
  },

  cancelOrder: (orderId) => {
    set((state) => ({
      orders: state.orders.map(order => 
        order.id === orderId ? { ...order, status: 'cancelled' as const } : order
      ),
    }));
  },

  getUserOrders: (userId) => {
    return get().orders.filter(o => o.buyerId === userId || o.sellerId === userId);
  },

  getPendingOrders: () => {
    return get().orders.filter(o => o.status === 'pending');
  },
}));