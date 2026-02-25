// src/pages/public/LandingPage.tsx (Updated with responsive images)
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

// Helper to generate srcSet for Unsplash images (append width param)
const getSrcSet = (url: string, widths: number[] = [400, 800, 1200, 1600]) => {
  // Only modify Unsplash URLs; otherwise return undefined
  if (!url.includes('unsplash.com')) return undefined;
  return widths.map(w => `${url}&w=${w} ${w}w`).join(', ');
};

// Hero background images (still used as CSS backgrounds, but we can preload them with link tags)
const heroImages = [
  'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=1920&q=80',
  'https://images.unsplash.com/photo-1503376763036-066120622c74?w=1920&q=80',
  'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=1920&q=80',
];

// Feature images with base URLs (we'll append width params in srcSet)
const featureImages = {
  browse: 'https://images.unsplash.com/photo-1449965408869-eaa3f722e40d',
  swap: 'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7',
  sell: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d',
  secure: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa',
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
      {/* Hero Section (unchanged - background images are fine) */}
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

        {/* rest of hero ... */}
        {/* ... (unchanged, omitted for brevity) */}
      </section>

      {/* Brand Marquee (unchanged) */}
      <section className="py-12 bg-gray-900 overflow-hidden">
        {/* ... */}
      </section>

      {/* Featured Categories - NOW CLICKABLE + RESPONSIVE IMAGES */}
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
                className="aspect-[3/4]" // maintain aspect ratio
              >
                <Link
                  to={`/category/${category.slug}`}
                  className="group relative w-full h-full rounded-2xl overflow-hidden block"
                >
                  <img
                    src={`${category.image}&w=400&q=80`} // base with small width
                    srcSet={getSrcSet(category.image, [400, 800, 1200])}
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 16vw"
                    alt={category.name}
                    loading="lazy"
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

      {/* How It Works - RESPONSIVE IMAGES */}
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
                      src={`${item.image}&w=600&q=80`}
                      srcSet={getSrcSet(item.image, [400, 800, 1200])}
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      alt={item.title}
                      loading="lazy"
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

      {/* Featured Listings - CarCard already handles images, but we can add lazy loading */}
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
                {/* CarCard should already have responsive images; we pass loading="lazy" if needed */}
                <CarCard car={car} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust Section - with responsive background and image */}
      <section className="relative py-32 bg-gray-900 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={`${featureImages.secure}&w=1600&q=80`}
            srcSet={getSrcSet(featureImages.secure, [800, 1200, 1600, 2000])}
            sizes="100vw"
            alt="Security"
            className="w-full h-full object-cover opacity-30"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-gray-900 via-gray-900/95 to-gray-900/80" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* ... content (unchanged) ... */}
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
                  srcSet="https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=400&q=80 400w, https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=800&q=80 800w, https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=1200&q=80 1200w"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 600px"
                  alt="App Interface"
                  className="w-full"
                  loading="lazy"
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

      {/* Latest Arrivals - RESPONSIVE GRID AND IMAGES */}
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

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 auto-rows-[200px] sm:auto-rows-[250px] lg:auto-rows-[300px]">
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
                    src={car.images[0]} // assume car.images[0] is a full URL; we can enhance with srcSet if possible
                    // For demo, we assume the image can be resized via URL parameters; if not, we skip srcSet
                    srcSet={car.images[0]?.includes('unsplash.com') ? getSrcSet(car.images[0], [400, 800, 1200]) : undefined}
                    sizes={
                      idx === 0 || idx === 5
                        ? '(max-width: 768px) 100vw, 50vw'
                        : '(max-width: 768px) 50vw, 25vw'
                    }
                    alt={car.title}
                    loading="lazy"
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

      {/* CTA Section - background image (unchanged) */}
      <section className="relative h-[600px] flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-fixed"
          style={{
            backgroundImage: 'url(https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=1920&q=80)'
          }}
        />
        <div className="absolute inset-0 bg-black/60" />
        {/* ... content ... */}
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
      