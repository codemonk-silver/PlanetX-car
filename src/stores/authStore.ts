// src/stores/authStore.ts
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type{ User } from '../types';
import { mockUsers } from '../data/mockData';

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, name: string) => Promise<void>;
  logout: () => void;
  updateProfile: (updates: Partial<User>) => void;
  clearError: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,

      login: async (email: string, password: string) => {
        set({ isLoading: true, error: null });
        
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        const user = mockUsers.find(u => u.email === email);
        
        if (user && password === 'password') {
          set({ user, isAuthenticated: true, isLoading: false });
        } else {
          set({ error: 'Invalid email or password', isLoading: false });
          throw new Error('Invalid credentials');
        }
      },

      register: async (email: string, name: string) => {
        set({ isLoading: true, error: null });
        
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        if (mockUsers.some(u => u.email === email)) {
          set({ error: 'Email already exists', isLoading: false });
          throw new Error('Email already exists');
        }
        
        const newUser: User = {
          id: Math.random().toString(36).substr(2, 9),
          email,
          name,
          role: 'user',
          createdAt: new Date(),
        };
        
        mockUsers.push(newUser);
        set({ user: newUser, isAuthenticated: true, isLoading: false });
      },

      logout: () => {
        set({ user: null, isAuthenticated: false, error: null });
      },

      updateProfile: (updates: Partial<User>) => {
        const { user } = get();
        if (user) {
          const updatedUser = { ...user, ...updates };
          set({ user: updatedUser });
          
          // Update in mock data
          const index = mockUsers.findIndex(u => u.id === user.id);
          if (index !== -1) {
            mockUsers[index] = updatedUser;
          }
        }
      },

      clearError: () => set({ error: null }),
    }),
    {
      name: 'auth-storage',
    }
  )
);