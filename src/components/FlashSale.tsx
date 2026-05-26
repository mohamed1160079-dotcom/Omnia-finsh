import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useLang } from '../context/LanguageContext';
import { Product } from '../context/CartContext';
import { products } from '../data/products';
import ProductCard from './ProductCard';
import { Zap } from 'lucide-react';

interface FlashSaleProps {
  onQuickView?: (product: Product) => void;
  onProductClick?: (product: Product) => void;
}

export default function FlashSale({ onQuickView, onProductClick }: FlashSaleProps) {
  const { t, isRTL } = useLang();
  
  const [timeLeft, setTimeLeft] = useState({ days: 2, hours: 14, minutes: 32, seconds: 45 });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        let { days, hours, minutes, seconds } = prev;
        seconds--;
        if (seconds < 0) { seconds = 59; minutes--; }
        if (minutes < 0) { minutes = 59; hours--; }
        if (hours < 0) { hours = 23; days--; }
        if (days < 0) { days = 0; hours = 0; minutes = 0; seconds = 0; }
        return { days, hours, minutes, seconds };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Get products with discounts
  const saleProducts = products.filter(p => p.oldPrice);

  return (
    <section className="py-10 sm:py-16 bg-gradient-to-br from-pink-50 via-white to-rose-50">
      <div className="container mx-auto px-3 sm:px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-8"
        >
          <div className="inline-flex items-center gap-1.5 px-4 py-1.5 bg-gradient-to-r from-red-500 to-pink-500 text-white rounded-full text-xs sm:text-sm font-bold mb-3 shadow-lg shadow-pink-200/50">
            <Zap size={14} className="animate-pulse" />
            {t('flash.title')}
            <Zap size={14} className="animate-pulse" />
          </div>
          <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-800 mb-4 px-2">
            {isRTL ? 'عروض محدودة الوقت!' : 'Limited Time Offers!'}
          </h2>

          {/* Countdown */}
          <div className="flex items-center justify-center gap-2 sm:gap-3">
            {[
              { value: timeLeft.days, label: t('flash.days') },
              { value: timeLeft.hours, label: t('flash.hours') },
              { value: timeLeft.minutes, label: t('flash.minutes') },
              { value: timeLeft.seconds, label: t('flash.seconds') },
            ].map((item, i) => (
              <div key={i} className="flex flex-col items-center">
                <div className="w-12 h-12 sm:w-16 sm:h-16 bg-white rounded-xl sm:rounded-2xl shadow-md border border-pink-100 flex items-center justify-center">
                  <span className="text-lg sm:text-2xl font-bold text-pink-600">
                    {String(item.value).padStart(2, '0')}
                  </span>
                </div>
                <span className="text-[9px] sm:text-[10px] text-gray-400 mt-1.5 font-medium">{item.label}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Products */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4 max-w-4xl mx-auto">
          {saleProducts.map((product, i) => (
            <ProductCard 
              key={product.id} 
              product={product} 
              index={i} 
              onQuickView={onQuickView}
              onProductClick={onProductClick}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
