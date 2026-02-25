// src/components/cars/CarSort.tsx
import React from 'react';
import { ArrowUpDown } from 'lucide-react';
import { useCarStore } from '../../stores/carStore';

export const CarSort: React.FC = () => {
  const { sortBy, setSortBy } = useCarStore();

  const options = [
    { value: 'newest', label: 'Newest First' },
    { value: 'cheapest', label: 'Price: Low to High' },
    { value: 'mileage', label: 'Lowest Mileage' },
  ];

  return (
    <div className="flex items-center gap-2">
      <ArrowUpDown className="h-4 w-4 text-gray-500" />
      <select
        value={sortBy}
        onChange={(e) => setSortBy(e.target.value as any)}
        className="border-none bg-transparent text-sm font-medium text-gray-700 focus:ring-0 cursor-pointer"
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
};