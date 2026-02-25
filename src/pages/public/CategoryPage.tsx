// src/pages/public/CategoryPage.tsx
import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Filter, Grid3X3, List, ChevronDown } from 'lucide-react';
import { categories } from '../../types';
import { useCarStore } from '../../stores/carStore';
import { CarGrid } from '../../components/cars/CarGrid';
import { CarFilters } from '../../components/cars/CarFilters';
import { CarSort } from '../../components/cars/CarSort';
import { Button } from '../../components/ui/Button';

export const CategoryPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const { filteredCars, setCategory, getCarsByCategory, getCategoryCounts } = useCarStore();
  
  const category = categories.find(c => c.slug === slug);
  const categoryCars = slug ? getCarsByCategory(slug) : [];
  const counts = getCategoryCounts();

  useEffect(() => {
    if (slug) {
      setCategory(slug);
    }
    return () => setCategory(null);
  }, [slug, setCategory]);

  if (!category) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Category Not Found</h1>
          <Link to="/">
            <Button>Back to Home</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Header */}
      <div className="relative h-[400px] overflow-hidden">
        <motion.div
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.5 }}
          className="absolute inset-0"
        >
          <img 
            src={category.image} 
            alt={category.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/60 to-transparent" />
        </motion.div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex flex-col justify-end pb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Link 
              to="/" 
              className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-4 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Home
            </Link>
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-4">{category.name}</h1>
            <p className="text-xl text-white/80 max-w-2xl">{category.description}</p>
          </motion.div>
        </div>
      </div>

      {/* Features Bar */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-wrap gap-4">
            {category.features.map((feature, idx) => (
              <motion.div
                key={feature}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: idx * 0.1 }}
                className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-full"
              >
                <div className="w-2 h-2 bg-blue-500 rounded-full" />
                <span className="text-sm font-medium text-gray-700">{feature}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats & Controls */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <div>
            <p className="text-gray-600">
              <span className="text-2xl font-bold text-gray-900">{categoryCars.length}</span> cars available
            </p>
          </div>
          
          <div className="flex items-center gap-4">
            <CarSort />
            <div className="flex items-center gap-2 border-l border-gray-200 pl-4">
              <button className="p-2 hover:bg-gray-100 rounded-lg">
                <Grid3X3 className="w-5 h-5 text-gray-600" />
              </button>
              <button className="p-2 hover:bg-gray-100 rounded-lg">
                <List className="w-5 h-5 text-gray-400" />
              </button>
            </div>
            <Button variant="outline" className="flex items-center gap-2">
              <Filter className="w-4 h-4" />
              Filters
              <ChevronDown className="w-4 h-4" />
            </Button>
          </div>
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar Filters */}
          <div className="hidden lg:block">
            <div className="sticky top-24">
              <CarFilters />
              
              {/* Other Categories */}
              <div className="mt-8 bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h3 className="font-semibold text-gray-900 mb-4">Other Categories</h3>
                <div className="space-y-2">
                  {categories.filter(c => c.slug !== slug).map(cat => (
                    <Link
                      key={cat.slug}
                      to={`/category/${cat.slug}`}
                      className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors group"
                    >
                      <div className="flex items-center gap-3">
                        <img src={cat.image} alt="" className="w-10 h-10 rounded-lg object-cover" />
                        <span className="font-medium text-gray-700 group-hover:text-gray-900">{cat.name}</span>
                      </div>
                      <span className="text-sm text-gray-500">{counts[cat.slug] || 0}</span>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Car Grid */}
          <div className="lg:col-span-3">
            <CarGrid 
              cars={filteredCars} 
              emptyMessage={`No ${category.name.toLowerCase()} available right now. Check back soon!`}
            />
          </div>
        </div>
      </div>
    </div>
  );
};