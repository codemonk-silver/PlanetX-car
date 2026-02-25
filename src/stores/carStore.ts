// src/stores/carStore.ts
import { create } from 'zustand';
import type { Car, CarFilter } from '../types';
import { mockCars } from '../data/mockData';

interface CarState {
  cars: Car[];
  filteredCars: Car[];
  selectedCar: Car | null;
  filters: CarFilter;
  sortBy: 'newest' | 'cheapest' | 'mileage';
  selectedCategory: string | null;
  isLoading: boolean;
  
  setCars: (cars: Car[]) => void;
  addCar: (car: Omit<Car, 'id' | 'createdAt' | 'status'>) => void;
  updateCar: (id: string, updates: Partial<Car>) => void;
  deleteCar: (id: string) => void;
  selectCar: (car: Car | null) => void;
  setFilters: (filters: CarFilter) => void;
  setSortBy: (sort: 'newest' | 'cheapest' | 'mileage') => void;
  setCategory: (category: string | null) => void;
  applyFilters: () => void;
  approveCar: (id: string) => void;
  getCarById: (id: string) => Car | undefined;
  getUserCars: (userId: string) => Car[];
  getCarsByCategory: (category: string) => Car[];
  getCategoryCounts: () => Record<string, number>;
}

// Helper function to determine car category based on properties
const getCarCategory = (car: Car): string => {
  const title = car.title.toLowerCase();
  const brand = car.brand.toLowerCase();
  
  // Check for trucks first
  if (title.includes('truck') || 
      title.includes('pickup') || 
      title.includes('f-150') || 
      title.includes('f150') ||
      title.includes('ram') || 
      title.includes('silverado') ||
      title.includes('tundra') ||
      title.includes('tacoma') ||
      title.includes('frontier') ||
      title.includes('colorado')) {
    return 'trucks';
  }
  
  // Check for electric
  if (car.fuelType === 'Electric' || 
      brand === 'tesla' ||
      title.includes('ev') ||
      title.includes('electric')) {
    return 'electric';
  }
  
  // Check for luxury brands and keywords
  if (title.includes('luxury') || 
      ['mercedes-benz', 'bmw', 'audi', 'lexus', 'bentley', 'rolls-royce', 'jaguar', 'maserati', 'porsche', 'cadillac', 'genesis', 'acura', 'infiniti'].includes(brand)) {
    return 'luxury';
  }
  
  // Check for sports cars
  if (title.includes('sport') || 
      title.includes('coupe') ||
      title.includes('convertible') ||
      title.includes('roadster') ||
      ['ferrari', 'lamborghini', 'mclaren', 'lotus'].includes(brand) ||
      title.includes('mustang') ||
      title.includes('camaro') ||
      title.includes('corvette') ||
      title.includes('supra') ||
      title.includes('mx-5') ||
      title.includes('miata') ||
      title.includes('86') ||
      title.includes('brz')) {
    return 'sports';
  }
  
  // Check for SUVs
  if (title.includes('suv') || 
      title.includes('crossover') ||
      title.includes('x5') || 
      title.includes('x3') ||
      title.includes('x7') ||
      title.includes('gle') || 
      title.includes('glc') ||
      title.includes('gls') ||
      title.includes('rx') ||
      title.includes('nx') ||
      title.includes('ux') ||
      title.includes('cr-v') ||
      title.includes('rav4') ||
      title.includes('highlander') ||
      title.includes('explorer') ||
      title.includes('escalade') ||
      title.includes('range rover') ||
      title.includes('defender') ||
      title.includes('4runner') ||
      title.includes('tahoe') ||
      title.includes('suburban') ||
      title.includes('pilot') ||
      title.includes('passport') ||
      title.includes('edge') ||
      title.includes('blazer') ||
      title.includes('palisade') ||
      title.includes('telluride')) {
    return 'suvs';
  }
  
  // Default to sedans (includes hatchbacks, wagons, etc.)
  return 'sedans';
};

export const useCarStore = create<CarState>((set, get) => ({
  cars: mockCars,
  filteredCars: mockCars.filter(c => c.status === 'approved'),
  selectedCar: null,
  filters: {},
  sortBy: 'newest',
  selectedCategory: null,
  isLoading: false,

  setCars: (cars) => set({ cars, filteredCars: cars.filter(c => c.status === 'approved') }),

  addCar: (carData) => {
    const newCar: Car = {
      ...carData,
      id: Math.random().toString(36).substr(2, 9),
      status: 'pending',
      createdAt: new Date(),
    };
    
    set((state) => ({
      cars: [...state.cars, newCar],
    }));
    
    get().applyFilters();
  },

  updateCar: (id, updates) => {
    set((state) => ({
      cars: state.cars.map(car => 
        car.id === id ? { ...car, ...updates } : car
      ),
    }));
    get().applyFilters();
  },

  deleteCar: (id) => {
    set((state) => ({
      cars: state.cars.filter(car => car.id !== id),
    }));
    get().applyFilters();
  },

  selectCar: (car) => set({ selectedCar: car }),

  setFilters: (filters) => {
    set({ filters });
    get().applyFilters();
  },

  setSortBy: (sortBy) => {
    set({ sortBy });
    get().applyFilters();
  },

  setCategory: (category) => {
    set({ selectedCategory: category });
    get().applyFilters();
  },

  applyFilters: () => {
    const { cars, filters, sortBy, selectedCategory } = get();
    
    let result = cars.filter(car => {
      // Only show approved or sold cars in listings
      if (car.status !== 'approved' && car.status !== 'sold') return false;
      
      // Category filter
      if (selectedCategory) {
        const carCategory = getCarCategory(car);
        if (carCategory !== selectedCategory) return false;
      }
      
      // Brand filter
      if (filters.brand && car.brand !== filters.brand) return false;
      
      // Price range filters
      if (filters.minPrice !== undefined && car.price < filters.minPrice) return false;
      if (filters.maxPrice !== undefined && car.price > filters.maxPrice) return false;
      
      // Year range filters
      if (filters.minYear !== undefined && car.year < filters.minYear) return false;
      if (filters.maxYear !== undefined && car.year > filters.maxYear) return false;
      
      // Transmission filter
      if (filters.transmission && car.transmission !== filters.transmission) return false;
      
      // Fuel type filter
      if (filters.fuelType && car.fuelType !== filters.fuelType) return false;
      
      // Listing type filter
      if (filters.listingType && car.listingType !== filters.listingType) return false;
      
      return true;
    });

    // Apply sorting
    result.sort((a, b) => {
      switch (sortBy) {
        case 'cheapest':
          return a.price - b.price;
        case 'mileage':
          return a.mileage - b.mileage;
        case 'newest':
        default:
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      }
    });

    set({ filteredCars: result });
  },

  approveCar: (id) => {
    set((state) => ({
      cars: state.cars.map(car => 
        car.id === id ? { ...car, status: 'approved' as const } : car
      ),
    }));
    get().applyFilters();
  },

  getCarById: (id) => {
    return get().cars.find(car => car.id === id);
  },

  getUserCars: (userId) => {
    return get().cars.filter(car => car.ownerId === userId);
  },

  getCarsByCategory: (category) => {
    return get().cars.filter(car => 
      car.status === 'approved' && getCarCategory(car) === category
    );
  },

  getCategoryCounts: () => {
    const counts: Record<string, number> = {
      suvs: 0,
      sedans: 0,
      sports: 0,
      electric: 0,
      luxury: 0,
      trucks: 0
    };
    
    get().cars.filter(c => c.status === 'approved').forEach(car => {
      const cat = getCarCategory(car);
      if (counts[cat] !== undefined) {
        counts[cat]++;
      }
    });
    
    return counts;
  },
}));