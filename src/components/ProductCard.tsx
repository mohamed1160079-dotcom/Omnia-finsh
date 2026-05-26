import { useState } from 'react';
import { motion } from 'framer-motion';
import { useLang } from '../context/LanguageContext';
import { useCart, Product } from '../context/CartContext';
import { Heart, ShoppingBag, Eye, Star } from 'lucide-react';

interface ProductCardProps {
  product: Product;
  index?: number;
  onQuickView?: (product: Product) => void;
  onProductClick?: (product: Product) => void;
}

export default function ProductCard({ product, index = 0, onQuickView, onProductClick }: ProductCardProps) {
  const { lang, t } = useLang();
  const { addToCart, toggleWishlist, isInWishlist } = useCart();
  const [isAdded, setIsAdded] = useState(false);
  const [imgLoaded, setImgLoaded] = useState(false);

  const name = lang === 'ar' ? product.nameAr : product.nameEn;
  const category = lang === 'ar' ? product.categoryAr : product.category;
  const badge = lang === 'ar' ? product.badgeAr : product.badge;
  const wishlisted = isInWishlist(product.id);
  const discount = product.oldPrice ? Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100) : 0;

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(product);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 1500);
  };

  const handleCardClick = () => {
    if (onProductClick) {
      onProductClick(product);
    }
  };

  const handleWishlistClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleWishlist(product.id);
  };

  const handleQuickViewClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onQuickView) {
      onQuickView(product);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      className="group"
    >
      <div 
        onClick={handleCardClick}
        className="bg-white rounded-2xl overflow-hidden border border-pink-50 shadow-sm hover:shadow-xl hover:shadow-pink-100/40 transition-all duration-400 cursor-pointer"
      >
        {/* Image Container */}
        <div className="relative overflow-hidden aspect-[3/4]">
          {/* Skeleton */}
          {!imgLoaded && (
            <div className="absolute inset-0 bg-gradient-to-br from-pink-50 to-rose-50 animate-pulse" />
          )}
          
          <img
            src={product.image}
            alt={name}
            className={`w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 ${imgLoaded ? 'opacity-100' : 'opacity-0'}`}
            loading="lazy"
            onLoad={() => setImgLoaded(true)}
          />
          
          {/* Overlay on hover */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400" />

          {/* Badge */}
          {badge && (
            <div className="absolute top-2 left-2">
              <span className="px-2 py-1 bg-gradient-to-r from-pink-500 to-rose-500 text-white text-[9px] font-bold rounded-full shadow-md uppercase tracking-wide">
                {badge}
              </span>
            </div>
          )}

          {/* Discount Badge */}
          {discount > 0 && (
            <div className="absolute top-2 right-2">
              <span className="px-2 py-1 bg-red-500 text-white text-[9px] font-bold rounded-full shadow-md">
                -{discount}%
              </span>
            </div>
          )}

          {/* Quick Actions */}
          <div className="absolute top-10 right-2 flex flex-col gap-1.5 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
            <motion.button
              whileTap={{ scale: 0.85 }}
              onClick={handleWishlistClick}
              className={`w-8 h-8 rounded-lg flex items-center justify-center shadow-md backdrop-blur-sm transition-all cursor-pointer ${
                wishlisted 
                  ? 'bg-pink-500 text-white' 
                  : 'bg-white/90 text-gray-600 hover:bg-pink-500 hover:text-white'
              }`}
            >
              <Heart size={14} fill={wishlisted ? 'currentColor' : 'none'} />
            </motion.button>
            {onQuickView && (
              <motion.button
                whileTap={{ scale: 0.85 }}
                onClick={handleQuickViewClick}
                className="w-8 h-8 bg-white/90 rounded-lg flex items-center justify-center text-gray-600 hover:bg-pink-500 hover:text-white shadow-md backdrop-blur-sm transition-all cursor-pointer"
              >
                <Eye size={14} />
              </motion.button>
            )}
          </div>

          {/* Add to Cart Button */}
          <div className="absolute bottom-2 left-2 right-2 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-3 group-hover:translate-y-0">
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={handleAddToCart}
              className={`w-full py-2.5 rounded-lg font-semibold text-xs flex items-center justify-center gap-1.5 shadow-md backdrop-blur-sm transition-all cursor-pointer ${
                isAdded
                  ? 'bg-green-500 text-white'
                  : 'bg-white/95 text-pink-600 hover:bg-pink-500 hover:text-white'
              }`}
            >
              {isAdded ? (
                <>✓ {t('cart.added')}</>
              ) : (
                <>
                  <ShoppingBag size={13} />
                  {t('products.addToCart')}
                </>
              )}
            </motion.button>
          </div>
        </div>

        {/* Product Info */}
        <div className="p-3">
          <div className="text-[10px] text-pink-400 font-medium mb-1 uppercase tracking-wide">
            {category}
          </div>
          <h3 className="font-semibold text-gray-800 text-xs sm:text-sm mb-1.5 line-clamp-1 group-hover:text-pink-600 transition-colors leading-tight">
            {name}
          </h3>
          
          {/* Rating - Always show 5 stars with actual rating number */}
          <div className="flex items-center gap-1.5 mb-2">
            <div className="flex items-center gap-0.5">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  size={10}
                  className="text-amber-400 fill-amber-400 drop-shadow-sm"
                />
              ))}
            </div>
            <span className="text-[10px] font-medium text-gray-600">{product.rating}</span>
            <span className="text-[9px] text-gray-400">({product.reviews})</span>
          </div>

          {/* Price */}
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-sm sm:text-base font-bold text-pink-600">
              {product.price} <span className="text-[10px]">{t('products.egp')}</span>
            </span>
            {product.oldPrice && (
              <span className="text-xs text-gray-400 line-through">
                {product.oldPrice}
              </span>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
