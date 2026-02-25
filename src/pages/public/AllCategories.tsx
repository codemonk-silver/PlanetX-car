// src/pages/public/AllCategories.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, TrendingUp } from 'lucide-react';
import { categories } from '../../types';
import { useCarStore } from '../../stores/carStore';
import { Button } from '../../components/ui/Button';

export const AllCategories: React.FC = () => {
  const { getCategoryCounts } = useCarStore();
  const counts = getCategoryCounts();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Browse by Category</h1>
            <p className="text-xl text-gray-600">Find your perfect match from our curated collections</p>
          </motion.div>
        </div>
      </div>

      {/* Categories Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category, idx) => (
            <motion.div
              key={category.slug}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
            >
              <Link 
                to={`/category/${category.slug}`}
                className="group block relative h-[400px] rounded-3xl overflow-hidden"
              >
                <img 
                  src={category.image} 
                  alt={category.name}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                
                <div className="absolute bottom-0 left-0 right-0 p-8">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-white text-sm">
                      {counts[category.slug] || 0} cars
                    </span>
                    <TrendingUp className="w-4 h-4 text-green-400" />
                  </div>
                  <h2 className="text-3xl font-bold text-white mb-2">{category.name}</h2>
                  <p className="text-white/80 line-clamp-2 mb-4">{category.description}</p>
                  <div className="flex items-center gap-2 text-white font-medium">
                    Explore Collection
                    <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-2" />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <div className="bg-blue-600 rounded-3xl p-8 md:p-12 text-center text-white">
          <h2 className="text-3xl font-bold mb-4">Can't find what you're looking for?</h2>
          <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
            Browse our complete inventory of all makes and models, or set up alerts for new arrivals.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/browse">
              <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
                View All Cars
              </Button>
            </Link>
            <Link to="/add-car">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                Sell Your Car
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};