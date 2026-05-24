import React, { useState } from 'react';
import { Heart, ShoppingBag, Eye } from 'lucide-react';
import { Product } from '../types';
import { useStore } from '../store/useStore';
import { cn } from '../utils/cn';

interface ProductCardProps {
  product: Product;
  onViewDetails: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onViewDetails }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const { addToWishlist, removeFromWishlist, isInWishlist, addToCart, language } = useStore();
  const inWishlist = isInWishlist(product.id);

  const handleWishlistToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (inWishlist) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
  };

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    const defaultSize = product.sizes[0];
    addToCart(product, defaultSize);
  };

  const discountPercentage = product.salePrice
    ? Math.round(((product.price - product.salePrice) / product.price) * 100)
    : 0;

  return (
    <div
      className="group relative cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setCurrentImageIndex(0);
      }}
      onClick={() => onViewDetails(product)}
    >
      {/* Image Container */}
      <div className="relative aspect-[3/4] bg-neutral-100 overflow-hidden mb-4">
        <img
          src={product.images[currentImageIndex]}
          alt={language === 'en' ? product.name : (product.nameAr || product.name)}
          className={cn(
            "w-full h-full object-cover transition-transform duration-500",
            isHovered && "scale-105"
          )}
        />
        
        {/* Badges */}
        <div className="absolute top-4 left-4 flex flex-col gap-2">
          {product.isNew && (
            <span className="bg-gradient-to-r from-pink-400 to-pink-500 text-white text-xs px-3 py-1 font-medium shadow-md">
              {language === 'en' ? 'NEW' : 'جديد'}
            </span>
          )}
          {product.salePrice && (
            <span className="bg-gradient-to-r from-rose-400 to-rose-500 text-white text-xs px-3 py-1 font-medium shadow-md">
              -{discountPercentage}%
            </span>
          )}
          {product.isBestSeller && !product.isNew && (
            <span className="bg-gradient-to-r from-pink-500 to-pink-600 text-white text-xs px-3 py-1 font-medium shadow-md">
              {language === 'en' ? 'BESTSELLER' : 'الأكثر مبيعاً'}
            </span>
          )}
        </div>

        {/* Action Buttons */}
        <div className={cn(
          "absolute top-4 right-4 flex flex-col gap-2 transition-opacity duration-300",
          isHovered ? "opacity-100" : "opacity-0"
        )}>
          <button
            onClick={handleWishlistToggle}
            className={cn(
              "w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 shadow-md",
              inWishlist ? "bg-gradient-to-r from-pink-400 to-pink-500 text-white" : "bg-white text-pink-600 hover:bg-pink-400 hover:text-white"
            )}
            aria-label="Add to wishlist"
          >
            <Heart size={18} fill={inWishlist ? "currentColor" : "none"} />
          </button>
          <button
            onClick={() => onViewDetails(product)}
            className="w-10 h-10 bg-white text-pink-600 rounded-full flex items-center justify-center hover:bg-pink-400 hover:text-white transition-all duration-300 shadow-md"
            aria-label="Quick view"
          >
            <Eye size={18} />
          </button>
        </div>

        {/* Quick Add Button */}
        <button
          onClick={handleQuickAdd}
          className={cn(
            "absolute bottom-4 left-4 right-4 bg-gradient-to-r from-pink-400 to-pink-500 text-white py-3 flex items-center justify-center gap-2 font-medium transition-all duration-300 hover:from-pink-500 hover:to-pink-600 shadow-lg",
            isHovered ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
          )}
        >
          <ShoppingBag size={18} />
          {language === 'en' ? 'Quick Add' : 'إضافة سريعة'}
        </button>

        {/* Image Dots */}
        {product.images.length > 1 && (
          <div className="absolute bottom-20 left-1/2 -translate-x-1/2 flex gap-1">
            {product.images.map((_, index) => (
              <button
                key={index}
                onClick={(e) => {
                  e.stopPropagation();
                  setCurrentImageIndex(index);
                }}
                className={cn(
                  "w-1.5 h-1.5 rounded-full transition-all duration-300",
                  currentImageIndex === index ? "bg-white w-4" : "bg-white/50"
                )}
              />
            ))}
          </div>
        )}
      </div>

      {/* Product Info */}
      <div className="space-y-2">
        <h3 className="font-medium text-sm md:text-base line-clamp-2">
          {language === 'en' ? product.name : (product.nameAr || product.name)}
        </h3>
        
        <div className="flex items-center gap-2">
          {product.salePrice ? (
            <>
              <span className="text-lg font-semibold">{product.salePrice} ج.م</span>
              <span className="text-sm text-gray-400 line-through">{product.price} ج.م</span>
            </>
          ) : (
            <span className="text-lg font-semibold">{product.price} ج.م</span>
          )}
        </div>

        {/* Limited Stock */}
        <div className="inline-flex items-center px-3 py-1 bg-rose-50 text-rose-600 text-xs font-medium rounded-md border border-rose-100">
          🔥 Only {(product.id % 7) + 3} Left In Stock
        </div>

        {/* Rating */}
        <div className="flex items-center gap-1">
          <div className="flex">
            {[...Array(5)].map((_, i) => {
              const fillPercentage = Math.min(Math.max(product.rating - i, 0), 1);
              if (fillPercentage >= 1) {
                return <span key={i} className="text-sm text-pink-500">★</span>;
              } else if (fillPercentage > 0) {
                return (
                  <span key={i} className="relative inline-block text-sm">
                    <span className="text-gray-300">★</span>
                    <span 
                      className="absolute top-0 left-0 overflow-hidden text-pink-500" 
                      style={{ width: `${fillPercentage * 100}%` }}
                    >
                      ★
                    </span>
                  </span>
                );
              } else {
                return <span key={i} className="text-sm text-gray-300">★</span>;
              }
            })}
          </div>
          <span className="text-xs text-gray-500">({product.rating})</span>
        </div>
      </div>
    </div>
  );
};
