// src/types/index.ts
export interface Car {
  id: string;
  title: string;
  brand: string;
  model: string;
  year: number;
  price: number;
  mileage: number;
  transmission: 'Automatic' | 'Manual' | 'CVT';
  fuelType: 'Petrol' | 'Diesel' | 'Electric' | 'Hybrid';
  images: string[];
  description: string;
  ownerId: string;
  status: 'pending' | 'approved' | 'sold' | 'swapped';
  listingType: 'sale' | 'swap' | 'both';
  createdAt: Date;
  location: string;
}

export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  phone?: string;
  location?: string;
  role: 'user' | 'admin';
  createdAt: Date;
}

export interface SwapRequest {
  id: string;
  requesterCarId: string;
  requestedCarId: string;
  requesterId: string;
  ownerId: string;
  status: 'pending' | 'accepted' | 'rejected' | 'completed';
  createdAt: Date;
  message?: string;
}

export interface Message {
  id: string;
  chatId: string;
  senderId: string;
  content: string;
  timestamp: Date;
  read: boolean;
}

export interface Chat {
  id: string;
  participants: string[];
  messages: Message[];
  lastMessage?: Message;
  unreadCount: number;
}

export interface Order {
  id: string;
  carId: string;
  buyerId: string;
  sellerId: string;
  price: number;
  status: 'pending' | 'completed' | 'cancelled';
  createdAt: Date;
}

export type CarFilter = {
  brand?: string;
  minPrice?: number;
  maxPrice?: number;
  minYear?: number;
  maxYear?: number;
  transmission?: string;
  fuelType?: string;
  listingType?: string;
};

// src/types/index.ts (Add new types)
export interface CategoryInfo {
  name: string;
  slug: string;
  image: string;
  description: string;
  features: string[];
}

export const categories: CategoryInfo[] = [
  {
    name: 'SUVs',
    slug: 'suvs',
    image: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=1200&q=80',
    description: 'Spacious, versatile, and perfect for families. Explore our wide selection of SUVs from compact crossovers to full-size luxury models.',
    features: ['All-Wheel Drive', 'Spacious Interior', 'High Ground Clearance', 'Family Friendly']
  },
  {
    name: 'Sedans',
    slug: 'sedans',
    image: 'https://images.unsplash.com/photo-1550355291-bbee04a92027?w=1200&q=80',
    description: 'Classic elegance meets modern efficiency. Find the perfect sedan for your daily commute or weekend getaways.',
    features: ['Fuel Efficient', 'Smooth Handling', 'Comfortable Ride', 'Elegant Design']
  },
  {
    name: 'Sports Cars',
    slug: 'sports',
    image: 'https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=1200&q=80',
    description: 'Pure driving pleasure. Discover high-performance sports cars that deliver adrenaline-pumping acceleration and precision handling.',
    features: ['High Performance', 'Precision Handling', 'Aerodynamic Design', 'Premium Sound']
  },
  {
    name: 'Electric',
    slug: 'electric',
    image: 'https://images.unsplash.com/photo-1593941707882-a5bba14938c7?w=1200&q=80',
    description: 'The future of driving is here. Browse cutting-edge electric vehicles with zero emissions and instant torque.',
    features: ['Zero Emissions', 'Instant Torque', 'Lower Running Costs', 'Advanced Tech']
  },
  {
    name: 'Luxury',
    slug: 'luxury',
    image: 'https://images.unsplash.com/photo-1563720360172-67b8f3dce741?w=1200&q=80',
    description: 'Indulge in automotive excellence. Experience premium craftsmanship, cutting-edge technology, and unparalleled comfort.',
    features: ['Premium Materials', 'Advanced Comfort', 'Cutting-Edge Tech', 'Status Symbol']
  },
  {
    name: 'Trucks',
    slug: 'trucks',
    image: 'https://images.unsplash.com/photo-1551830820-330a71b99659?w=1200&q=80',
    description: 'Built tough for work and play. Find powerful trucks capable of hauling, towing, and conquering any terrain.',
    features: ['High Towing Capacity', 'Durable Build', 'Off-Road Capable', 'Versatile Bed']
  }
];