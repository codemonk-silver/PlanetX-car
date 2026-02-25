// src/data/mockData.ts
import type{ Car, User, Chat, Order, SwapRequest } from '../types';

export const mockUsers: User[] = [
  {
    id: '1',
    email: 'admin@carmarket.com',
    name: 'Admin User',
    role: 'admin',
    createdAt: new Date('2024-01-01'),
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop',
    location: 'New York, NY'
  },
  {
    id: '2',
    email: 'john@example.com',
    name: 'John Doe',
    role: 'user',
    createdAt: new Date('2024-01-15'),
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop',
    phone: '+1 555-0123',
    location: 'Los Angeles, CA'
  },
  {
    id: '3',
    email: 'jane@example.com',
    name: 'Jane Smith',
    role: 'user',
    createdAt: new Date('2024-02-01'),
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop',
    phone: '+1 555-0124',
    location: 'Chicago, IL'
  },
  {
    id: '4',
    email: 'mike@example.com',
    name: 'Mike Johnson',
    role: 'user',
    createdAt: new Date('2024-02-15'),
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop',
    location: 'Houston, TX'
  }
];

export const mockCars: Car[] = [
  {
    id: '1',
    title: 'Toyota Camry 2020 - Excellent Condition',
    brand: 'Toyota',
    model: 'Camry',
    year: 2020,
    price: 24500,
    mileage: 45000,
    transmission: 'Automatic',
    fuelType: 'Petrol',
    images: [
      'https://images.unsplash.com/photo-1621007947382-bb3c3968e3bb?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=800&h=600&fit=crop'
    ],
    description: 'Well-maintained Toyota Camry with leather seats, backup camera, and Bluetooth connectivity. Single owner, no accidents.',
    ownerId: '2',
    status: 'approved',
    listingType: 'sale',
    createdAt: new Date('2024-03-01'),
    location: 'Los Angeles, CA'
  },
  {
    id: '2',
    title: 'Honda Civic 2019 Sport',
    brand: 'Honda',
    model: 'Civic',
    year: 2019,
    price: 22000,
    mileage: 38000,
    transmission: 'Manual',
    fuelType: 'Petrol',
    images: [
      'https://images.unsplash.com/photo-1605816988066-b51c7e6b0b6f?w=800&h=600&fit=crop'
    ],
    description: 'Sport trim with turbo engine. Great handling and fuel efficiency. Perfect for enthusiasts.',
    ownerId: '3',
    status: 'approved',
    listingType: 'swap',
    createdAt: new Date('2024-03-05'),
    location: 'Chicago, IL'
  },
  {
    id: '3',
    title: 'Tesla Model 3 2021 Long Range',
    brand: 'Tesla',
    model: 'Model 3',
    year: 2021,
    price: 42000,
    mileage: 25000,
    transmission: 'Automatic',
    fuelType: 'Electric',
    images: [
      'https://images.unsplash.com/photo-1560958089-b8a1929cea89?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1617788138017-80ad40651399?w=800&h=600&fit=crop'
    ],
    description: 'Long Range AWD with Autopilot. White interior, premium connectivity. Supercharger network access.',
    ownerId: '4',
    status: 'approved',
    listingType: 'both',
    createdAt: new Date('2024-03-10'),
    location: 'Houston, TX'
  },
  {
    id: '4',
    title: 'BMW 3 Series 2018 330i',
    brand: 'BMW',
    model: '3 Series',
    year: 2018,
    price: 28500,
    mileage: 52000,
    transmission: 'Automatic',
    fuelType: 'Petrol',
    images: [
      'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=800&h=600&fit=crop'
    ],
    description: 'Luxury sedan with premium package. Navigation, heated seats, sunroof. Certified pre-owned.',
    ownerId: '2',
    status: 'pending',
    listingType: 'sale',
    createdAt: new Date('2024-03-12'),
    location: 'Los Angeles, CA'
  },
  {
    id: '5',
    title: 'Ford Mustang 2020 GT',
    brand: 'Ford',
    model: 'Mustang',
    year: 2020,
    price: 38000,
    mileage: 28000,
    transmission: 'Manual',
    fuelType: 'Petrol',
    images: [
      'https://images.unsplash.com/photo-1584345604476-8ec5e12e42dd?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=800&h=600&fit=crop'
    ],
    description: '5.0L V8 GT Premium. Magnetic ride suspension, Brembo brakes. American muscle at its finest.',
    ownerId: '3',
    status: 'approved',
    listingType: 'swap',
    createdAt: new Date('2024-03-15'),
    location: 'Chicago, IL'
  },
  {
    id: '6',
    title: 'Mercedes C-Class 2021 C300',
    brand: 'Mercedes-Benz',
    model: 'C-Class',
    year: 2021,
    price: 39500,
    mileage: 22000,
    transmission: 'Automatic',
    fuelType: 'Hybrid',
    images: [
      'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=800&h=600&fit=crop'
    ],
    description: 'Mild hybrid with EQ Boost. Burmester sound system, ambient lighting. Pristine condition.',
    ownerId: '4',
    status: 'approved',
    listingType: 'sale',
    createdAt: new Date('2024-03-18'),
    location: 'Houston, TX'
  }
];

export const mockChats: Chat[] = [
  {
    id: '1',
    participants: ['2', '3'],
    messages: [
      {
        id: '1',
        chatId: '1',
        senderId: '3',
        content: 'Hi! Is the Honda Civic still available for swap?',
        timestamp: new Date('2024-03-10T10:00:00'),
        read: true
      },
      {
        id: '2',
        chatId: '1',
        senderId: '2',
        content: 'Yes, it is! What car do you have for swap?',
        timestamp: new Date('2024-03-10T10:05:00'),
        read: true
      },
      {
        id: '3',
        chatId: '1',
        senderId: '3',
        content: 'I have a 2020 Toyota Camry. Would you be interested?',
        timestamp: new Date('2024-03-10T10:10:00'),
        read: false
      }
    ],
    unreadCount: 1
  }
];

export const mockOrders: Order[] = [
  {
    id: '1',
    carId: '1',
    buyerId: '3',
    sellerId: '2',
    price: 24500,
    status: 'completed',
    createdAt: new Date('2024-03-05')
  },
  {
    id: '2',
    carId: '3',
    buyerId: '2',
    sellerId: '4',
    price: 42000,
    status: 'pending',
    createdAt: new Date('2024-03-20')
  }
];

export const mockSwapRequests: SwapRequest[] = [
  {
    id: '1',
    requesterCarId: '2',
    requestedCarId: '5',
    requesterId: '3',
    ownerId: '3',
    status: 'pending',
    createdAt: new Date('2024-03-15'),
    message: 'Would love to swap my Civic for your Mustang!'
  }
];