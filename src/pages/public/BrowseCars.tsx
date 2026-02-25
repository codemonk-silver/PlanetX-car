// src/pages/public/BrowseCars.tsx
import React, { useEffect } from 'react';
import { useSearchParams} from 'react-router-dom';
import { motion } from 'framer-motion';
import { Filter, Grid3X3, List, SlidersHorizontal, X } from 'lucide-react';
import { useCarStore } from '../../stores/carStore';
import { CarGrid } from '../../components/cars/CarGrid';
import { CarSort } from '../../components/cars/CarSort';
import { Button } from '../../components/ui/Button';
import { categories } from '../../types';
import { Input } from '../../components/ui/Input';
import { Select } from '../../components/ui/Select';

const brands = ['Toyota', 'Honda', 'Tesla', 'BMW', 'Mercedes-Benz', 'Ford', 'Audi', 'Lexus', 'Porsche', 'Chevrolet'];
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

export const BrowseCars: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const categoryParam = searchParams.get('category');
  const { filteredCars, filters, setFilters, setCategory, getCategoryCounts } = useCarStore();
  const categoryCounts = getCategoryCounts();

  useEffect(() => {
    if (categoryParam) {
      setCategory(categoryParam);
    } else {
      setCategory(null);
    }
    
    return () => setCategory(null);
  }, [categoryParam, setCategory]);

  const activeCategory = categoryParam ? categories.find(c => c.slug === categoryParam) : null;

  const handleFilterChange = (key: keyof typeof filters, value: string | number | undefined) => {
    setFilters({ ...filters, [key]: value || undefined });
  };

  const clearFilters = () => {
    setFilters({});
    if (categoryParam) {
      setSearchParams({});
    }
  };

  const hasActiveFilters = Object.values(filters).some(v => v !== undefined) || !!categoryParam;

  const handleCategoryClick = (slug: string) => {
    if (categoryParam === slug) {
      setSearchParams({});
    } else {
      setSearchParams({ category: slug });
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col sm:flex-row sm:items-center justify-between gap-4"
      >
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            {activeCategory ? activeCategory.name : 'All Cars'}
          </h1>
          <p className="text-gray-600 mt-1">
            {filteredCars.length} vehicles available
            {activeCategory && ` in ${activeCategory.name}`}
          </p>
        </div>
        <div className="flex items-center gap-4">
          <CarSort />
          <div className="flex items-center gap-2 border-l border-gray-200 pl-4">
            <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
              <Grid3X3 className="w-5 h-5 text-gray-600" />
            </button>
            <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
              <List className="w-5 h-5 text-gray-400" />
            </button>
          </div>
        </div>
      </motion.div>

      {/* Category Quick Filter */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide"
      >
        {categories.map((cat) => {
          const isActive = categoryParam === cat.slug;
          const count = categoryCounts[cat.slug] || 0;
          
          return (
            <button
              key={cat.slug}
              onClick={() => handleCategoryClick(cat.slug)}
              className={`
                flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all
                ${isActive 
                  ? 'bg-blue-600 text-white border-blue-600' 
                  : 'bg-white border border-gray-200 text-gray-700 hover:border-blue-500 hover:text-blue-600'
                }
              `}
            >
              <img src={cat.image} alt="" className="w-5 h-5 rounded object-cover" />
              {cat.name}
              <span className={isActive ? 'text-blue-100' : 'text-gray-400'}>
                ({count})
              </span>
              {isActive && <X className="w-3 h-3 ml-1" />}
            </button>
          );
        })}
      </motion.div>

      <div className="grid lg:grid-cols-4 gap-8">
        {/* Sidebar Filters */}
        <div className="hidden lg:block">
          <div className="sticky top-24 space-y-6">
            {/* Active Filters Summary */}
            {hasActiveFilters && (
              <div className="bg-blue-50 rounded-xl p-4 border border-blue-100">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-medium text-blue-900">Active Filters</h3>
                  <button 
                    onClick={clearFilters}
                    className="text-sm text-blue-600 hover:text-blue-800 flex items-center gap-1"
                  >
                    <X className="w-4 h-4" />
                    Clear all
                  </button>
                </div>
                {categoryParam && (
                  <span className="inline-flex items-center gap-1 px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs font-medium mr-2">
                    Category: {activeCategory?.name}
                  </span>
                )}
                {Object.entries(filters).map(([key, value]) => 
                  value ? (
                    <span key={key} className="inline-flex items-center gap-1 px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs font-medium mr-2">
                      {key}: {value}
                    </span>
                  ) : null
                )}
              </div>
            )}

            {/* Filter Panel */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center gap-2 mb-6">
                <SlidersHorizontal className="w-5 h-5 text-gray-600" />
                <h3 className="font-semibold text-gray-900">Filters</h3>
              </div>

              <div className="space-y-4">
                <Select
                  label="Brand"
                  options={brands.map(b => ({ value: b, label: b }))}
                  value={filters.brand || ''}
                  onChange={(e) => handleFilterChange('brand', e.target.value)}
                />

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Price Range</label>
                  <div className="flex gap-2">
                    <Input
                      type="number"
                      placeholder="Min"
                      value={filters.minPrice || ''}
                      onChange={(e) => handleFilterChange('minPrice', e.target.value ? Number(e.target.value) : undefined)}
                    />
                    <Input
                      type="number"
                      placeholder="Max"
                      value={filters.maxPrice || ''}
                      onChange={(e) => handleFilterChange('maxPrice', e.target.value ? Number(e.target.value) : undefined)}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Year Range</label>
                  <div className="flex gap-2">
                    <Input
                      type="number"
                      placeholder="From"
                      value={filters.minYear || ''}
                      onChange={(e) => handleFilterChange('minYear', e.target.value ? Number(e.target.value) : undefined)}
                    />
                    <Input
                      type="number"
                      placeholder="To"
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

            {/* Category Info Card */}
            {activeCategory && (
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <img src={activeCategory.image} alt="" className="w-full h-32 object-cover" />
                <div className="p-4">
                  <h3 className="font-semibold text-gray-900 mb-2">{activeCategory.name}</h3>
                  <p className="text-sm text-gray-600 mb-3">{activeCategory.description}</p>
                  <div className="flex flex-wrap gap-1">
                    {activeCategory.features.slice(0, 3).map((feature, idx) => (
                      <span key={idx} className="text-xs px-2 py-1 bg-gray-100 text-gray-600 rounded-full">
                        {feature}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Other Categories */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="font-semibold text-gray-900 mb-4">Other Categories</h3>
              <div className="space-y-2">
                {categories.filter(c => c.slug !== categoryParam).map((cat) => (
                  <button
                    key={cat.slug}
                    onClick={() => handleCategoryClick(cat.slug)}
                    className="w-full flex items-center justify-between p-2 rounded-lg hover:bg-gray-50 transition-colors text-left"
                  >
                    <div className="flex items-center gap-3">
                      <img src={cat.image} alt="" className="w-8 h-8 rounded-lg object-cover" />
                      <span className="font-medium text-gray-700">{cat.name}</span>
                    </div>
                    <span className="text-sm text-gray-500">{categoryCounts[cat.slug] || 0}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Filter Toggle */}
        <div className="lg:hidden">
          <Button variant="outline" fullWidth className="flex items-center justify-center gap-2">
            <Filter className="w-4 h-4" />
            Filters
            {hasActiveFilters && (
              <span className="ml-2 px-2 py-0.5 bg-blue-600 text-white text-xs rounded-full">
                Active
              </span>
            )}
          </Button>
        </div>

        {/* Car Grid */}
        <div className="lg:col-span-3">
          <CarGrid 
            cars={filteredCars} 
            emptyMessage={
              activeCategory 
                ? `No ${activeCategory.name.toLowerCase()} available right now. Try adjusting your filters or check back soon!`
                : 'No cars match your criteria. Try adjusting your filters.'
            }
          />
        </div>
      </div>
    </div>
  );
};