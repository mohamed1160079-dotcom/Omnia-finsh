import React, { useState } from 'react';
import { Search, X } from 'lucide-react';
import { Product } from '../types';
import { ProductCard } from '../components/ProductCard';
import { useStore } from '../store/useStore';

interface SearchPageProps {
  products: Product[];
  onViewProduct: (product: Product) => void;
  onClose: () => void;
}

export const SearchPage: React.FC<SearchPageProps> = ({ products, onViewProduct, onClose }) => {
  const { language } = useStore();
  const [searchQuery, setSearchQuery] = useState('');

  const filteredProducts = products.filter(product => {
    const query = searchQuery.toLowerCase();
    return (
      product.name.toLowerCase().includes(query) ||
      product.description.toLowerCase().includes(query) ||
      product.category.toLowerCase().includes(query) ||
      (product.nameAr?.toLowerCase().includes(query)) ||
      (product.descriptionAr?.toLowerCase().includes(query))
    );
  });

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="container mx-auto">
        {/* Search Header */}
        <div className="flex items-center gap-4 mb-8">
          <div className="relative flex-1 max-w-2xl">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={language === 'en' ? 'Search for products...' : 'ابحث عن المنتجات...'}
              className="w-full pl-12 pr-4 py-4 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-pink-400 text-lg shadow-sm"
              autoFocus
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-black"
              >
                <X size={20} />
              </button>
            )}
          </div>
          <button
            onClick={onClose}
            className="px-6 py-4 hover:bg-gray-100 rounded-lg transition-colors"
          >
            {language === 'en' ? 'Cancel' : 'إلغاء'}
          </button>
        </div>

        {/* Results */}
        {searchQuery && (
          <div className="mb-6">
            <p className="text-gray-600">
              {filteredProducts.length} {language === 'en' ? 'results for' : 'نتيجة لـ'} "{searchQuery}"
            </p>
          </div>
        )}

        {/* Products Grid */}
        {searchQuery && filteredProducts.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onViewDetails={onViewProduct}
              />
            ))}
          </div>
        ) : searchQuery ? (
          <div className="text-center py-20">
            <Search size={64} className="mx-auto text-gray-300 mb-4" />
            <h2 className="text-2xl font-light mb-2">
              {language === 'en' ? 'No products found' : 'لا توجد منتجات'}
            </h2>
            <p className="text-gray-600">
              {language === 'en' 
                ? 'Try searching with different keywords' 
                : 'حاول البحث بكلمات مختلفة'}
            </p>
          </div>
        ) : (
          <div className="text-center py-20">
            <Search size={64} className="mx-auto text-gray-300 mb-4" />
            <h2 className="text-2xl font-light mb-2">
              {language === 'en' ? 'Search our collection' : 'ابحث في مجموعتنا'}
            </h2>
            <p className="text-gray-600">
              {language === 'en' 
                ? 'Enter keywords to find your perfect piece' 
                : 'أدخل كلمات البحث للعثور على القطعة المثالية'}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
