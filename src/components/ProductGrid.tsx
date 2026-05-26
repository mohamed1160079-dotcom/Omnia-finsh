import { useState } from 'react';
import { motion } from 'framer-motion';
import { useLang } from '../context/LanguageContext';
import { Product } from '../context/CartContext';
import { products, categories } from '../data/products';
import ProductCard from './ProductCard';

interface ProductGridProps {
  title?: string;
  showFilter?: boolean;
  limit?: number;
  onQuickView?: (product: Product) => void;
  onProductClick?: (product: Product) => void;
  filterCategory?: string;
}

export default function ProductGrid({ title, showFilter = false, limit, onQuickView, onProductClick, filterCategory }: ProductGridProps) {
  const { lang, t } = useLang();
  const [activeCategory, setActiveCategory] = useState(filterCategory || 'all');

  const filtered = activeCategory === 'all'
    ? products
    : products.filter(p => p.category === activeCategory);

  const displayed = limit ? filtered.slice(0, limit) : filtered;

  return (
    <section className="py-10 sm:py-16">
      <div className="container mx-auto px-3 sm:px-4">
        {/* Header */}
        {title && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-6 sm:mb-8"
          >
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-800 mb-2">{title}</h2>
            <div className="w-16 sm:w-20 h-1 bg-gradient-to-r from-pink-400 to-rose-400 rounded-full mx-auto" />
          </motion.div>
        )}

        {/* Filter Tabs */}
        {showFilter && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-6 sm:mb-8 overflow-x-auto scrollbar-hide -mx-3 px-3 sm:mx-0 sm:px-0"
          >
            <div className="flex items-center gap-2 sm:flex-wrap sm:justify-center min-w-max sm:min-w-0">
              <button
                onClick={() => setActiveCategory('all')}
                className={`flex-shrink-0 px-3 sm:px-4 py-2 rounded-lg sm:rounded-xl text-xs sm:text-sm font-medium transition-all whitespace-nowrap cursor-pointer ${
                  activeCategory === 'all'
                    ? 'bg-gradient-to-r from-pink-500 to-rose-500 text-white shadow-md shadow-pink-200/50'
                    : 'bg-white text-gray-600 border border-pink-100 hover:border-pink-200 hover:bg-pink-50'
                }`}
              >
                {lang === 'ar' ? 'الكل' : 'All'}
              </button>
              {categories.map(cat => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`flex-shrink-0 px-3 sm:px-4 py-2 rounded-lg sm:rounded-xl text-xs sm:text-sm font-medium transition-all whitespace-nowrap cursor-pointer ${
                    activeCategory === cat.id
                      ? 'bg-gradient-to-r from-pink-500 to-rose-500 text-white shadow-md shadow-pink-200/50'
                      : 'bg-white text-gray-600 border border-pink-100 hover:border-pink-200 hover:bg-pink-50'
                  }`}
                >
                  {cat.icon} {lang === 'ar' ? cat.nameAr : cat.nameEn}
                </button>
              ))}
            </div>
          </motion.div>
        )}

        {/* Products Grid */}
        <div className={`grid gap-3 sm:gap-4 ${displayed.length <= 3 ? 'grid-cols-2 md:grid-cols-3 max-w-4xl mx-auto' : 'grid-cols-2 md:grid-cols-3 lg:grid-cols-4'}`}>
          {displayed.map((product, i) => (
            <ProductCard 
              key={product.id} 
              product={product} 
              index={i} 
              onQuickView={onQuickView}
              onProductClick={onProductClick}
            />
          ))}
        </div>

        {/* View All Button */}
        {limit && filtered.length > limit && (
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mt-8"
          >
            <button className="px-6 sm:px-8 py-3 bg-white border border-pink-200 text-pink-600 rounded-xl font-semibold text-sm hover:bg-pink-50 hover:border-pink-300 transition-all cursor-pointer">
              {t('products.viewAll')} →
            </button>
          </motion.div>
        )}

        {/* Empty State */}
        {displayed.length === 0 && (
          <div className="text-center py-12">
            <div className="w-20 h-20 mx-auto mb-4 bg-pink-50 rounded-full flex items-center justify-center">
              <span className="text-3xl">🛍️</span>
            </div>
            <h3 className="text-lg font-semibold text-gray-700 mb-2">
              {lang === 'ar' ? 'لا توجد منتجات' : 'No products found'}
            </h3>
            <p className="text-sm text-gray-500">
              {lang === 'ar' ? 'جرّبي قسم آخر' : 'Try another category'}
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
