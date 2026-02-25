// src/pages/public/LandingPage.tsx (Updated with proper links)
import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { 
  ArrowRight, 
  Search, 
  ShieldCheck, 
  Zap, 
  Users, 
  TrendingUp, 
  Star,
  ChevronRight,
  Play,
} from 'lucide-react';
import { categories } from '../../types';
import { useCarStore } from '../../stores/carStore';
import { Button } from '../../components/ui/Button';
import { CarCard } from '../../components/cars/CarCard';

// Hero background images
const heroImages = [
  'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=1920&q=80',
  'https://images.unsplash.com/photo-1503376763036-066120622c74?w=1920&q=80',
  'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=1920&q=80',
];

// Feature images
const featureImages = {
  browse: 'https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=800&q=80',
  swap: 'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?w=800&q=80',
  sell: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=800&q=80',
  secure: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&q=80',
};

const brands = ['Mercedes', 'BMW', 'Audi', 'Tesla', 'Toyota', 'Porsche', 'Lexus', 'Bentley'];

export const LandingPage: React.FC = () => {
  const { filteredCars, getCategoryCounts } = useCarStore();
  const [currentHero, setCurrentHero] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const categoryCounts = getCategoryCounts();
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });
  
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentHero((prev) => (prev + 1) % heroImages.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const featuredCars = filteredCars.slice(0, 4);
  const latestCars = filteredCars.slice(0, 8);

  return (
    <div ref={containerRef} className="overflow-hidden">
      {/* Hero Section */}
      <section className="relative h-screen min-h-[700px] flex items-center justify-center overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentHero}
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5 }}
            className="absolute inset-0"
          >
            <div 
              className="absolute inset-0 bg-cover bg-center bg-no-repeat"
              style={{ backgroundImage: `url(${heroImages[currentHero]})` }}
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/80" />
          </motion.div>
        </AnimatePresence>

        <motion.div 
          style={{ y }}
          className="absolute inset-0 pointer-events-none"
        >
          <div className="absolute top-1/4 left-10 w-32 h-32 bg-blue-500/20 rounded-full blur-3xl" />
          <div className="absolute bottom-1/3 right-10 w-48 h-48 bg-purple-500/20 rounded-full blur-3xl" />
        </motion.div>

        <motion.div 
          style={{ opacity }}
          className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center"
        >
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white/90 text-sm font-medium mb-6">
              <Star className="w-4 h-4 text-yellow-400" />
              Trusted by 50,000+ car enthusiasts
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-5xl sm:text-7xl lg:text-8xl font-bold text-white mb-6 tracking-tight"
          >
            Find Your
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400">
              Perfect Drive
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-xl text-white/80 max-w-2xl mx-auto mb-10"
          >
            Buy, sell, or swap premium vehicles with confidence. 
            Join the future of automotive marketplace.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link to="/browse">
              <Button 
                size="lg" 
                className=" text-gray-900 px-8 py-4 text-lg rounded-full shadow-2xl shadow-white/25"
              >
                <Search className="w-5 h-5 mr-2" />
                Explore Cars
              </Button>
            </Link>
            <Link to="/add-car">
              <Button 
                size="lg" 
                variant="outline" 
                className="border-white/30 text-white hover:bg-white/10 px-8 py-4 text-lg rounded-full backdrop-blur-sm"
              >
                <Play className="w-5 h-5 mr-2" />
                List Your Car
              </Button>
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
            className="mt-16 grid grid-cols-3 gap-8 max-w-lg mx-auto"
          >
            {[
              { value: '10K+', label: 'Cars Listed' },
              { value: '98%', label: 'Happy Users' },
              { value: '24h', label: 'Avg. Sale Time' },
            ].map((stat, idx) => (
              <div key={idx} className="text-center">
                <div className="text-2xl sm:text-3xl font-bold text-white">{stat.value}</div>
                <div className="text-sm text-white/60">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </motion.div>

        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <div className="w-6 h-10 rounded-full border-2 border-white/30 flex items-start justify-center p-2">
            <div className="w-1 h-2 bg-white rounded-full" />
          </div>
        </motion.div>
      </section>

      {/* Brand Marquee */}
      <section className="py-12 bg-gray-900 overflow-hidden">
        <div className="relative">
          <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-gray-900 to-transparent z-10" />
          <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-gray-900 to-transparent z-10" />
          <motion.div
            animate={{ x: [0, -1000] }}
            transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
            className="flex gap-16 items-center"
          >
            {[...brands, ...brands, ...brands].map((brand, idx) => (
              <span key={idx} className="text-2xl font-bold text-white/20 whitespace-nowrap">
                {brand}
              </span>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Featured Categories - NOW CLICKABLE */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Browse by Category</h2>
            <p className="text-gray-600">Find exactly what you're looking for</p>
            <Link 
              to="/categories" 
              className="inline-flex items-center gap-2 mt-4 text-blue-600 hover:text-blue-700 font-medium"
            >
              View All Categories <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {categories.map((category, idx) => (
              <motion.div
                key={category.slug}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                whileHover={{ y: -5 }}
              >
                <Link 
                  to={`/category/${category.slug}`}
                  className="group relative aspect-[3/4] rounded-2xl overflow-hidden block"
                >
                  <img 
                    src={category.image} 
                    alt={category.name}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  <div className="absolute top-3 left-3">
                    <span className="px-2 py-1 bg-white/20 backdrop-blur-sm rounded-full text-white text-xs font-medium">
                      {categoryCounts[category.slug] || 0}
                    </span>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <h3 className="text-white font-bold text-lg">{category.name}</h3>
                    <p className="text-white/70 text-sm opacity-0 group-hover:opacity-100 transition-opacity">
                      Explore →
                    </p>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">How It Works</h2>
            <p className="text-gray-600">Three simple steps to your next car</p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                step: '01',
                title: 'Browse',
                desc: 'Explore thousands of verified listings',
                image: featureImages.browse,
                link: '/categories',
              },
              {
                step: '02',
                title: 'Connect',
                desc: 'Chat directly with sellers or propose swaps',
                image: featureImages.swap,
                link: '/messages',
              },
              {
                step: '03',
                title: 'Drive',
                desc: 'Complete your purchase and hit the road',
                image: featureImages.sell,
                link: '/orders',
              },
            ].map((item, idx) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.2 }}
                className="group relative"
              >
                <Link to={item.link}>
                  <div className="relative h-80 rounded-3xl overflow-hidden mb-6">
                    <img 
                      src={item.image} 
                      alt={item.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute top-4 left-4 w-12 h-12 bg-white rounded-full flex items-center justify-center text-xl font-bold text-gray-900">
                      {item.step}
                    </div>
                    <div className="absolute bottom-4 left-4 right-4">
                      <h3 className="text-2xl font-bold text-white">{item.title}</h3>
                    </div>
                  </div>
                  <p className="text-gray-600 text-center">{item.desc}</p>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Listings */}
      <section className="py-24 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-12">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl font-bold text-gray-900 mb-2">Featured This Week</h2>
              <p className="text-gray-600">Hand-picked premium selections</p>
            </motion.div>
            <Link 
              to="/browse" 
              className="hidden sm:flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium"
            >
              View All <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredCars.map((car, idx) => (
              <motion.div
                key={car.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
              >
                <CarCard car={car} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="relative py-32 bg-gray-900 overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src={featureImages.secure} 
            alt="Security"
            className="w-full h-full object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-gray-900 via-gray-900/95 to-gray-900/80" />
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
                Your Security is Our Priority
              </h2>
              <p className="text-xl text-gray-300 mb-8">
                Every transaction is protected. Every seller is verified. 
                Every car is inspected.
              </p>
              
              <div className="space-y-4">
                {[
                  { icon: ShieldCheck, text: 'Verified Sellers Only' },
                  { icon: Zap, text: 'Instant Secure Payments' },
                  { icon: Users, text: '24/7 Support Team' },
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center gap-4 text-white">
                    <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center">
                      <item.icon className="w-6 h-6" />
                    </div>
                    <span className="text-lg">{item.text}</span>
                  </div>
                ))}
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                <img 
                  src="https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=800&q=80" 
                  alt="App Interface"
                  className="w-full"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                
                <motion.div
                  animate={{ y: [0, -10, 0] }}
                  transition={{ repeat: Infinity, duration: 4 }}
                  className="absolute -bottom-6 -left-6 bg-white rounded-2xl p-6 shadow-2xl"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                      <TrendingUp className="w-6 h-6 text-green-600" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-gray-900">$2.4M+</p>
                      <p className="text-sm text-gray-600">In transactions</p>
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Latest Arrivals */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Fresh Arrivals</h2>
            <p className="text-gray-600">New listings added daily</p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 auto-rows-[300px]">
            {latestCars.map((car, idx) => (
              <motion.div
                key={car.id}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.05 }}
                className={`relative rounded-2xl overflow-hidden group cursor-pointer ${
                  idx === 0 || idx === 5 ? 'md:col-span-2 md:row-span-2' : ''
                }`}
              >
                <Link to={`/car/${car.id}`}>
                  <img 
                    src={car.images[0]} 
                    alt={car.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  
                  <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                    <p className="text-white font-bold text-lg line-clamp-1">{car.title}</p>
                    <p className="text-white/80">${car.price.toLocaleString()}</p>
                  </div>
                  
                  {idx === 0 && (
                    <div className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                      Just Added
                    </div>
                  )}
                </Link>
              </motion.div>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Link to="/browse">
              <Button size="lg" className="rounded-full px-8">
                View All Cars
                <ChevronRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative h-[600px] flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-fixed"
          style={{ 
            backgroundImage: 'url(https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=1920&q=80)' 
          }}
        />
        <div className="absolute inset-0 bg-black/60" />
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative z-10 text-center max-w-3xl mx-auto px-4"
        >
          <h2 className="text-5xl md:text-6xl font-bold text-white mb-6">
            Ready to Sell Your Car?
          </h2>
          <p className="text-xl text-white/80 mb-8">
            List in minutes, sell in hours. Join thousands of happy sellers today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/add-car">
              <Button 
                size="lg" 
                className="bg-white text-gray-900 hover:bg-gray-100 rounded-full px-8 text-lg"
              >
                Start Selling Free
              </Button>
            </Link>
            <Link to="/browse">
              <Button 
                size="lg" 
                variant="outline" 
                className="border-white text-white hover:bg-white/10 rounded-full px-8 text-lg"
              >
                Browse First
              </Button>
            </Link>
          </div>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8 mb-12">
            <div>
              <h3 className="text-2xl font-bold mb-4">AutoMarket</h3>
              <p className="text-gray-400">The future of car trading. Buy, sell, and swap with confidence.</p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Browse</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link to="/browse" className="hover:text-white transition-colors">All Cars</Link></li>
                <li><Link to="/categories" className="hover:text-white transition-colors">Categories</Link></li>
                <li><Link to="/category/suvs" className="hover:text-white transition-colors">SUVs</Link></li>
                <li><Link to="/category/electric" className="hover:text-white transition-colors">Electric</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Sell</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link to="/add-car" className="hover:text-white transition-colors">List Your Car</Link></li>
                <li><Link to="/swap-requests" className="hover:text-white transition-colors">Swap Center</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link to="/messages" className="hover:text-white transition-colors">Messages</Link></li>
                <li><Link to="/profile" className="hover:text-white transition-colors">My Account</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-500">© 2024 AutoMarket. All rights reserved.</p>
            <div className="flex gap-6 text-gray-400">
              <span>Privacy</span>
              <span>Terms</span>
              <span>Cookies</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};