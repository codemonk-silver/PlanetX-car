// src/components/cars/CarFilters.tsx
import React from 'react';
import { SlidersHorizontal, X } from 'lucide-react';
import type { CarFilter } from '../../types';
import { useCarStore } from '../../stores/carStore';
import { Select } from '../ui/Select';

const brands = ['Toyota', 'Honda', 'Tesla', 'BMW', 'Mercedes-Benz', 'Ford', 'Audi', 'Lexus'];
const transmissions = [
  { value: 'Automatic', label: 'Automatic' },
  { value: 'Manual', label: 'Manual' },
  { value: 'CVT', label: 'CVT' },
];
const fuelTypes = [
  { value: 'Petrol', label: 'Petrol' },
  { value: 'Diesel', label: 'Diesel' },
  { value: 'Electric', label: 'Electric' },
  { value: 'Hybrid', label: 'Hybrid' },
];
const listingTypes = [
  { value: 'sale', label: 'For Sale' },
  { value: 'swap', label: 'For Swap' },
  { value: 'both', label: 'Both' },
];

export const CarFilters: React.FC = () => {
  const { filters, setFilters } = useCarStore();

  const handleFilterChange = (key: keyof CarFilter, value: string | number | undefined) => {
    setFilters({ ...filters, [key]: value || undefined });
  };

  const clearFilters = () => {
    setFilters({});
  };

  const hasFilters = Object.values(filters).some(v => v !== undefined);

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 mb-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <SlidersHorizontal className="h-5 w-5 text-gray-600" />
          <h3 className="font-semibold text-gray-900">Filters</h3>
        </div>
        {hasFilters && (
          <button 
            onClick={clearFilters}
            className="text-sm text-red-600 hover:text-red-700 flex items-center gap-1"
          >
            <X className="h-4 w-4" />
            Clear all
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Select
          label="Brand"
          options={brands.map(b => ({ value: b, label: b }))}
          value={filters.brand || ''}
          onChange={(e) => handleFilterChange('brand', e.target.value)}
        />

        <div className="space-y-1">
          <label className="block text-sm font-medium text-gray-700">Price Range</label>
          <div className="flex gap-2">
            <input
              type="number"
              placeholder="Min"
              className="w-full rounded-lg border-gray-300 text-sm"
              value={filters.minPrice || ''}
              onChange={(e) => handleFilterChange('minPrice', e.target.value ? Number(e.target.value) : undefined)}
            />
            <input
              type="number"
              placeholder="Max"
              className="w-full rounded-lg border-gray-300 text-sm"
              value={filters.maxPrice || ''}
              onChange={(e) => handleFilterChange('maxPrice', e.target.value ? Number(e.target.value) : undefined)}
            />
          </div>
        </div>

        <div className="space-y-1">
          <label className="block text-sm font-medium text-gray-700">Year Range</label>
          <div className="flex gap-2">
            <input
              type="number"
              placeholder="From"
              className="w-full rounded-lg border-gray-300 text-sm"
              value={filters.minYear || ''}
              onChange={(e) => handleFilterChange('minYear', e.target.value ? Number(e.target.value) : undefined)}
            />
            <input
              type="number"
              placeholder="To"
              className="w-full rounded-lg border-gray-300 text-sm"
              value={filters.maxYear || ''}
              onChange={(e) => handleFilterChange('maxYear', e.target.value ? Number(e.target.value) : undefined)}
            />
          </div>
        </div>

        <Select
          label="Transmission"
          options={transmissions}
          value={filters.transmission || ''}
          onChange={(e) => handleFilterChange('transmission', e.target.value)}
        />

        <Select
          label="Fuel Type"
          options={fuelTypes}
          value={filters.fuelType || ''}
          onChange={(e) => handleFilterChange('fuelType', e.target.value)}
        />

        <Select
          label="Listing Type"
          options={listingTypes}
          value={filters.listingType || ''}
          onChange={(e) => handleFilterChange('listingType', e.target.value)}
        />
      </div>
    </div>
  );
};