import React, { useState } from 'react';
import { Filter, X } from 'lucide-react';
import { Product } from '../types';
import { ProductCard } from '../components/ProductCard';
import { useStore } from '../store/useStore';
import { cn } from '../utils/cn';
import { categories } from '../data/products';

interface ShopPageProps {
  products: Product[];
  onViewProduct: (product: Product) => void;
  categoryFilter?: string;
}

export const ShopPage: React.FC<ShopPageProps> = ({ products, onViewProduct, categoryFilter }) => {
  const { language } = useStore();
  const [selectedCategory, setSelectedCategory] = useState<string>(categoryFilter || 'all');
  const [sortBy, setSortBy] = useState<string>('featured');
  const [showFilters, setShowFilters] = useState(false);

  // Filter products
  let filteredProducts = products;
  if (selectedCategory !== 'all') {
    filteredProducts = products.filter(p => p.category === selectedCategory);
  }

  // Sort products
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case 'price-low':
        return (a.salePrice || a.price) - (b.salePrice || b.price);
      case 'price-high':
        return (b.salePrice || b.price) - (a.salePrice || a.price);
      case 'newest':
        return (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0);
      case 'rating':
        return b.rating - a.rating;
      default:
        return 0;
    }
  });

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="container mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 
            className="text-4xl md:text-5xl font-light mb-4"
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
          >
            {language === 'en' ? 'Shop All' : 'تسوق الكل'}
          </h1>
          <p className="text-gray-600">
            {sortedProducts.length} {language === 'en' ? 'products' : 'منتج'}
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <div className={cn(
            "lg:w-64 flex-shrink-0",
            showFilters ? "block" : "hidden lg:block"
          )}>
            <div className="sticky top-24 space-y-6">
              {/* Mobile Filter Header */}
              <div className="lg:hidden flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">
                  {language === 'en' ? 'Filters' : 'التصفية'}
                </h3>
                <button onClick={() => setShowFilters(false)}>
                  <X size={24} />
                </button>
              </div>

              {/* Category Filter */}
              <div>
                <h3 className="font-semibold mb-4">
                  {language === 'en' ? 'Category' : 'الفئة'}
                </h3>
                <div className="space-y-2">
                  <button
                    onClick={() => setSelectedCategory('all')}
                    className={cn(
                      "block w-full text-left px-3 py-2 rounded transition-colors",
                      selectedCategory === 'all' ? "bg-gradient-to-r from-pink-400 to-pink-500 text-white" : "hover:bg-pink-50"
                    )}
                  >
                    {language === 'en' ? 'All Products' : 'جميع المنتجات'}
                  </button>
                  {categories.map((category) => (
                    <button
                      key={category.id}
                      onClick={() => setSelectedCategory(category.slug)}
                      className={cn(
                        "block w-full text-left px-3 py-2 rounded transition-colors",
                        selectedCategory === category.slug ? "bg-gradient-to-r from-pink-400 to-pink-500 text-white" : "hover:bg-pink-50"
                      )}
                    >
                      {language === 'en' ? category.name : (category.nameAr || category.name)}
                    </button>
                  ))}
                </div>
              </div>

              {/* Sort By */}
              <div>
                <h3 className="font-semibold mb-4">
                  {language === 'en' ? 'Sort By' : 'ترتيب حسب'}
                </h3>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-pink-400"
                >
                  <option value="featured">{language === 'en' ? 'Featured' : 'مميز'}</option>
                  <option value="newest">{language === 'en' ? 'Newest' : 'الأحدث'}</option>
                  <option value="price-low">{language === 'en' ? 'Price: Low to High' : 'السعر: من الأقل للأعلى'}</option>
                  <option value="price-high">{language === 'en' ? 'Price: High to Low' : 'السعر: من الأعلى للأقل'}</option>
                  <option value="rating">{language === 'en' ? 'Highest Rated' : 'الأعلى تقييماً'}</option>
                </select>
              </div>
            </div>
          </div>

          {/* Products Grid */}
          <div className="flex-1">
            {/* Mobile Filter Toggle */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="lg:hidden flex items-center gap-2 mb-6 px-4 py-2 border border-gray-300 rounded"
            >
              <Filter size={18} />
              {language === 'en' ? 'Filters' : 'التصفية'}
            </button>

            {sortedProducts.length === 0 ? (
              <div className="text-center py-20">
                <p className="text-gray-500 text-lg">
                  {language === 'en' ? 'No products found' : 'لا توجد منتجات'}
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-6 md:gap-8">
                {sortedProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onViewDetails={onViewProduct}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
