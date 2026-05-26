import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLang } from '../context/LanguageContext';
import { useCart, Product, ProductColor } from '../context/CartContext';
import { products } from '../data/products';
import ProductCard from './ProductCard';
import { 
  ArrowLeft, ArrowRight, Heart, ShoppingBag, Zap, Star, 
  Minus, Plus, Truck, RotateCcw, ChevronLeft, ChevronRight,
  ZoomIn, X, Check, BadgeCheck, CreditCard, Flame, Users,
  Award, Package, TrendingUp, Clock, ShieldCheck, Sparkles
} from 'lucide-react';

interface ProductDetailsProps {
  product: Product;
  onBack: () => void;
  onQuickView: (product: Product) => void;
  onBuyNow: () => void;
}

export default function ProductDetails({ product, onBack, onQuickView, onBuyNow }: ProductDetailsProps) {
  const { lang, t, isRTL } = useLang();
  const { addToCart, toggleWishlist, isInWishlist } = useCart();
  
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [selectedSize] = useState(product.sizes?.[0] || '');
  const [selectedColor, setSelectedColor] = useState<ProductColor | null>(
    product.colors?.[0] || null
  );
  const [isAdded, setIsAdded] = useState(false);
  const [showZoom, setShowZoom] = useState(false);
  const [activeTab, setActiveTab] = useState<'desc' | 'reviews'>('desc');

  const name = lang === 'ar' ? product.nameAr : product.nameEn;
  const desc = lang === 'ar' ? product.descAr : product.descEn;
  const category = lang === 'ar' ? product.categoryAr : product.category;
  const wishlisted = isInWishlist(product.id);
  const discount = product.oldPrice ? Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100) : 0;

  // Build media array: images first, then videos
  const images = product.images || [product.image];
  const media: { type: 'image' | 'video'; src: string }[] = [
    ...images.map(src => ({ type: 'image' as const, src })),
    ...(product.videos || []).map(src => ({ type: 'video' as const, src })),
  ];

  const relatedProducts = products
    .filter(p => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  // Handle color selection and change image
  const handleColorSelect = (color: ProductColor) => {
    setSelectedColor(color);
    if (color.image) {
      const idx = media.findIndex(m => m.type === 'image' && m.src === color.image);
      setSelectedImage(idx !== -1 ? idx : 0);
    }
  };

  const handlePrevImage = () => {
    setSelectedImage(prev => (prev > 0 ? prev - 1 : media.length - 1));
  };

  const handleNextImage = () => {
    setSelectedImage(prev => (prev < media.length - 1 ? prev + 1 : 0));
  };

  const handleThumbnailClick = (index: number) => {
    setSelectedImage(index);
  };

  const currentMedia = media[selectedImage] || media[0];

  const handleAddToCart = () => {
    addToCart(product, quantity, selectedSize, selectedColor?.nameEn);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  const handleBuyNow = () => {
    addToCart(product, quantity, selectedSize, selectedColor?.nameEn);
    onBuyNow();
  };

  // Use custom reviews if available
  const reviews = product.customReviews || [
    { id: 1, name: 'Sara M.', nameAr: 'سارة م.', rating: 5, text: 'منتج رائع جداً! الجودة ممتازة', textEn: 'Amazing product! Excellent quality', date: '2025-01-15', verified: true },
    { id: 2, name: 'Nour A.', nameAr: 'نور أ.', rating: 5, text: 'أحببته كثيراً، بالضبط مثل الصور', textEn: 'Loved it so much, exactly like photos', date: '2025-01-10', verified: true },
  ];

  const totalReviews = product.reviews;
  const remainingReviews = totalReviews - reviews.length;
  const soldCount = product.sold || 150;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-gradient-to-b from-white to-pink-50/30"
    >
      {/* Breadcrumb / Back Navigation */}
      <div className="bg-white/80 backdrop-blur-sm border-b border-pink-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-12">
            <button
              onClick={onBack}
              className="flex items-center gap-2 text-gray-600 hover:text-pink-500 transition-colors cursor-pointer"
            >
              {isRTL ? <ArrowRight size={18} /> : <ArrowLeft size={18} />}
              <span className="text-sm font-medium">{t('general.backToShop')}</span>
            </button>
            <div className="flex items-center gap-2">
              <span className="text-xs text-gray-400">{category}</span>
              <span className="text-gray-300">/</span>
              <span className="text-xs text-pink-500 font-medium truncate max-w-[150px]">{name}</span>
            </div>
            <button
              onClick={() => toggleWishlist(product.id)}
              className={`p-2 rounded-full transition-all cursor-pointer hover:scale-110 ${wishlisted ? 'text-pink-500' : 'text-gray-400 hover:text-pink-400'}`}
            >
              <Heart size={18} fill={wishlisted ? 'currentColor' : 'none'} />
            </button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Images Section */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            {/* Main Image / Video */}
            <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden bg-gradient-to-br from-pink-50 to-rose-50 mb-4 shadow-lg shadow-pink-100/30">
              {currentMedia.type === 'video' ? (
                <video
                  key={currentMedia.src}
                  src={currentMedia.src}
                  className="w-full aspect-[4/5] object-cover"
                  controls
                  autoPlay
                  muted
                  loop
                  playsInline
                />
              ) : (
                <motion.img
                  key={currentMedia.src}
                  initial={{ opacity: 0, scale: 1.02 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4 }}
                  src={currentMedia.src}
                  alt={name}
                  className="w-full aspect-[4/5] object-cover cursor-zoom-in"
                  onClick={() => setShowZoom(true)}
                />
              )}
              
              {/* Premium Border Glow */}
              <div className="absolute inset-0 rounded-2xl sm:rounded-3xl border-2 border-white/50 pointer-events-none" />
              
              {/* Badges */}
              <div className="absolute top-4 left-4 flex flex-col gap-2">
                {product.badge && (
                  <motion.span 
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="px-3 py-1.5 bg-gradient-to-r from-pink-500 to-rose-500 text-white text-[10px] font-bold rounded-full shadow-lg uppercase tracking-wide"
                  >
                    {lang === 'ar' ? product.badgeAr : product.badge}
                  </motion.span>
                )}
                {discount > 0 && (
                  <motion.span 
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.1 }}
                    className="px-3 py-1.5 bg-red-500 text-white text-[10px] font-bold rounded-full shadow-lg"
                  >
                    -{discount}%
                  </motion.span>
                )}
              </div>

              {/* Zoom Button — only for images */}
              {currentMedia.type === 'image' && (
                <button
                  onClick={() => setShowZoom(true)}
                  className="absolute bottom-4 right-4 w-11 h-11 bg-white/90 backdrop-blur-sm rounded-xl flex items-center justify-center shadow-lg hover:bg-white transition-colors cursor-pointer hover:scale-105"
                >
                  <ZoomIn size={20} className="text-gray-600" />
                </button>
              )}

              {/* Navigation Arrows */}
              {media.length > 1 && (
                <>
                  <button
                    onClick={handlePrevImage}
                    className={`absolute top-1/2 -translate-y-1/2 ${isRTL ? 'right-3' : 'left-3'} w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg hover:bg-white transition-all cursor-pointer hover:scale-105`}
                  >
                    {isRTL ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
                  </button>
                  <button
                    onClick={handleNextImage}
                    className={`absolute top-1/2 -translate-y-1/2 ${isRTL ? 'left-3' : 'right-3'} w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg hover:bg-white transition-all cursor-pointer hover:scale-105`}
                  >
                    {isRTL ? <ChevronLeft size={20} /> : <ChevronRight size={20} />}
                  </button>
                </>
              )}
            </div>

            {/* Thumbnails */}
            {media.length > 1 && (
              <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
                {media.map((item, i) => (
                  <button
                    key={i}
                    onClick={() => handleThumbnailClick(i)}
                    className={`flex-shrink-0 w-20 h-24 rounded-xl overflow-hidden border-2 transition-all cursor-pointer relative ${
                      selectedImage === i 
                        ? 'border-pink-500 shadow-lg shadow-pink-200/50 scale-105' 
                        : 'border-white/80 opacity-70 hover:opacity-100 hover:border-pink-200'
                    }`}
                  >
                    {item.type === 'video' ? (
                      <>
                        <video src={item.src} className="w-full h-full object-cover" muted preload="metadata" />
                        <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                          <div className="w-7 h-7 bg-white/90 rounded-full flex items-center justify-center">
                            <div className="w-0 h-0 border-t-[5px] border-t-transparent border-b-[5px] border-b-transparent border-l-[8px] border-l-pink-500 ml-0.5" />
                          </div>
                        </div>
                      </>
                    ) : (
                      <img src={item.src} alt="" className="w-full h-full object-cover" />
                    )}
                  </button>
                ))}
              </div>
            )}

            {/* High Demand Section - Premium Glass Card */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="mt-6 p-4 sm:p-5 glass-premium rounded-2xl border border-pink-100"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-orange-400 to-red-500 rounded-xl flex items-center justify-center shadow-lg">
                  <Flame size={20} className="text-white animate-fire" />
                </div>
                <div>
                  <h4 className="font-bold text-gray-800 text-sm">
                    {isRTL ? '🔥 منتج مطلوب بشدة' : '🔥 Product in High Demand'}
                  </h4>
                  <p className="text-xs text-gray-500 mt-0.5">
                    {isRTL ? 'باقي 5 قطع فقط • يتم بيعه بسرعة!' : 'Only 5 pieces left • Selling fast!'}
                  </p>
                </div>
              </div>
              
              {/* Progress Bar */}
              <div className="relative h-3 bg-pink-100 rounded-full overflow-hidden mb-2">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: '73%' }}
                  transition={{ delay: 0.5, duration: 1.5, ease: 'easeOut' }}
                  className="absolute inset-y-0 left-0 bg-gradient-to-r from-pink-400 via-rose-500 to-red-500 rounded-full"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer" />
              </div>
              <p className="text-xs text-gray-600 font-medium">
                <span className="text-pink-600 font-bold">73%</span> {isRTL ? 'تم بيعه في آخر 24 ساعة' : 'sold in the last 24 hours'}
              </p>
            </motion.div>
          </motion.div>

          {/* Details Section */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex flex-col"
          >
            {/* Category */}
            <span className="text-pink-500 text-xs font-semibold uppercase tracking-wider mb-3">
              {category}
            </span>

            {/* Name */}
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-800 mb-4 leading-tight">
              {name}
            </h1>

            {/* Rating */}
            <div className="flex items-center gap-3 mb-5">
              <div className="flex items-center gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i} 
                    size={18} 
                    className="text-amber-400 fill-amber-400 drop-shadow-sm" 
                  />
                ))}
              </div>
              <span className="text-sm font-semibold text-gray-700">
                {product.rating}
              </span>
              <span className="text-sm text-gray-400">
                ({product.reviews} {isRTL ? 'تقييم' : 'reviews'})
              </span>
            </div>

            {/* Price */}
            <div className="flex items-center gap-4 mb-6 flex-wrap">
              <motion.span 
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                className="text-3xl sm:text-4xl font-bold text-pink-600"
              >
                {product.price} <span className="text-lg">{t('products.egp')}</span>
              </motion.span>
              {product.oldPrice && (
                <span className="text-xl text-gray-400 line-through decoration-2">
                  {product.oldPrice} {t('products.egp')}
                </span>
              )}
              {discount > 0 && (
                <motion.span 
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="px-4 py-1.5 bg-green-50 text-green-600 text-sm font-bold rounded-full border border-green-100"
                >
                  {isRTL ? `وفري ${product.oldPrice! - product.price} ج.م` : `Save ${product.oldPrice! - product.price} EGP`}
                </motion.span>
              )}
            </div>

            {/* Premium Features Highlights */}
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="grid grid-cols-3 gap-3 mb-6"
            >
              {[
                { icon: <Award size={20} />, label: isRTL ? 'مستورد' : 'Imported', value: '100%', color: 'from-purple-400 to-pink-500' },
                { icon: <Sparkles size={20} />, label: isRTL ? 'جودة فاخرة' : 'Luxury Quality', value: '⭐', color: 'from-pink-400 to-rose-500' },
                { icon: <Truck size={20} />, label: isRTL ? 'شحن سريع' : 'Fast Shipping', value: isRTL ? '1-3 أيام' : '1-3 Days', color: 'from-rose-400 to-orange-400' },
              ].map((item, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 + i * 0.1 }}
                  className="glass-premium rounded-2xl p-4 text-center hover:shadow-lg transition-all"
                >
                  <div className={`w-10 h-10 mx-auto mb-2 rounded-xl bg-gradient-to-br ${item.color} flex items-center justify-center text-white shadow-md`}>
                    {item.icon}
                  </div>
                  <div className="text-[11px] text-gray-500 font-medium mb-1">{item.label}</div>
                  <div className="text-sm font-bold text-gray-800">{item.value}</div>
                </motion.div>
              ))}
            </motion.div>

            {/* Material Info */}
            {product.material && (
              <div className="mb-5 p-4 bg-gradient-to-r from-pink-50 to-rose-50 rounded-xl border border-pink-100">
                <div className="flex items-center gap-3">
                  <Package size={18} className="text-pink-500" />
                  <div>
                    <span className="text-xs text-gray-500 block mb-0.5">{isRTL ? 'الخامة' : 'Material'}</span>
                    <span className="text-sm font-bold text-gray-800">
                      {lang === 'ar' ? product.material.ar : product.material.en}
                    </span>
                  </div>
                </div>
              </div>
            )}

            {/* Size Info */}
            {product.sizeInfo && (
              <div className="mb-6">
                <label className="block text-sm font-bold text-gray-700 mb-3">
                  {t('general.size')}
                </label>
                <div className="p-4 bg-gradient-to-r from-pink-50 to-rose-50 rounded-xl border border-pink-100">
                  <p className="text-sm text-gray-700 leading-relaxed">
                    {lang === 'ar' ? product.sizeInfo.ar : product.sizeInfo.en}
                  </p>
                </div>
              </div>
            )}

            {/* Colors */}
            {product.colors && product.colors.length > 0 && (
              <div className="mb-6">
                <label className="block text-sm font-bold text-gray-700 mb-3">
                  {t('general.color')}: <span className="text-pink-500 font-medium">
                    {selectedColor ? (lang === 'ar' ? selectedColor.nameAr : selectedColor.nameEn) : ''}
                  </span>
                </label>
                <div className="flex flex-wrap gap-3">
                  {product.colors.map((color, idx) => (
                    <motion.button
                      key={idx}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleColorSelect(color)}
                      className={`flex items-center gap-2.5 px-4 py-3 rounded-xl text-sm font-medium transition-all cursor-pointer ${
                        selectedColor?.hex === color.hex
                          ? 'bg-pink-500 text-white shadow-lg shadow-pink-200/50'
                          : 'bg-white text-gray-700 border-2 border-pink-100 hover:border-pink-300 hover:bg-pink-50'
                      }`}
                    >
                      <span 
                        className={`w-5 h-5 rounded-full border-2 shadow-inner ${
                          selectedColor?.hex === color.hex ? 'border-white' : 'border-gray-200'
                        }`}
                        style={{ backgroundColor: color.hex }}
                      />
                      {lang === 'ar' ? color.nameAr : color.nameEn}
                      {selectedColor?.hex === color.hex && <Check size={16} />}
                    </motion.button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity */}
            <div className="mb-6">
              <label className="block text-sm font-bold text-gray-700 mb-3">
                {t('general.quantity')}
              </label>
              <div className="flex items-center gap-1 bg-pink-50 rounded-xl w-fit border border-pink-100">
                <button 
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-12 h-12 flex items-center justify-center hover:bg-pink-100 rounded-l-xl transition-colors cursor-pointer"
                >
                  <Minus size={18} className="text-gray-600" />
                </button>
                <span className="w-14 text-center font-bold text-lg text-gray-800">{quantity}</span>
                <button 
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-12 h-12 flex items-center justify-center hover:bg-pink-100 rounded-r-xl transition-colors cursor-pointer"
                >
                  <Plus size={18} className="text-gray-600" />
                </button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 mb-6">
              <motion.button
                whileTap={{ scale: 0.98 }}
                onClick={handleAddToCart}
                disabled={isAdded}
                className={`flex-1 py-4 rounded-2xl font-bold text-sm flex items-center justify-center gap-2 transition-all cursor-pointer ${
                  isAdded
                    ? 'bg-green-500 text-white shadow-lg shadow-green-200/50'
                    : 'bg-pink-50 text-pink-600 border-2 border-pink-200 hover:bg-pink-100 hover:border-pink-300'
                }`}
              >
                {isAdded ? (
                  <><Check size={20} /> {t('cart.added')}</>
                ) : (
                  <><ShoppingBag size={20} /> {t('products.addToCart')}</>
                )}
              </motion.button>
              <motion.button
                whileTap={{ scale: 0.98 }}
                onClick={handleBuyNow}
                className="flex-1 py-4 bg-gradient-to-r from-pink-500 via-rose-500 to-pink-600 text-white rounded-2xl font-bold text-sm flex items-center justify-center gap-2 shadow-xl shadow-pink-200/50 hover:shadow-pink-300/60 transition-all cursor-pointer glow-pink"
              >
                <Zap size={20} /> {isRTL ? 'اشتري الآن' : 'Buy Now'}
              </motion.button>
            </div>

            {/* Trust Section - Premium */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="glass-premium rounded-2xl p-5 mb-6"
            >
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {[
                  { icon: <Users size={20} />, label: isRTL ? 'عميلة سعيدة' : 'Happy Customers', value: '150+', color: 'text-pink-500' },
                  { icon: <Clock size={20} />, label: isRTL ? 'تم شراؤه مؤخراً' : 'Recently Purchased', value: '✓', color: 'text-purple-500' },
                  { icon: <Star size={20} />, label: isRTL ? 'تقييم' : 'Rating', value: '4.8 ⭐', color: 'text-amber-500' },
                  { icon: <TrendingUp size={20} />, label: isRTL ? 'تم بيعه' : 'Sold', value: `${soldCount}+`, color: 'text-green-500' },
                ].map((item, i) => (
                  <div key={i} className="text-center">
                    <div className={`w-10 h-10 mx-auto mb-2 bg-white rounded-xl flex items-center justify-center ${item.color} shadow-sm`}>
                      {item.icon}
                    </div>
                    <div className="text-[10px] text-gray-500 font-medium mb-1">{item.label}</div>
                    <div className="text-sm font-bold text-gray-800">{item.value}</div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Shipping & Payment Features */}
            <div className="grid grid-cols-3 gap-3 p-4 bg-gradient-to-r from-pink-50/80 to-rose-50/80 rounded-2xl mb-6 border border-pink-100">
              {[
                { icon: <Truck size={18} />, title: isRTL ? 'توصيل سريع' : 'Fast Delivery', desc: isRTL ? '3-5 أيام عمل' : '3-5 Days' },
                { icon: <CreditCard size={18} />, title: isRTL ? 'الدفع' : 'Payment', desc: isRTL ? 'عند الاستلام' : 'COD' },
                { icon: <RotateCcw size={18} />, title: isRTL ? 'إرجاع' : 'Returns', desc: isRTL ? '30 يوم' : '30 Days' },
              ].map((feature, i) => (
                <div key={i} className="text-center">
                  <div className="w-10 h-10 mx-auto mb-2 bg-white rounded-xl flex items-center justify-center text-pink-500 shadow-sm">
                    {feature.icon}
                  </div>
                  <div className="text-[11px] font-bold text-gray-700">{feature.title}</div>
                  <div className="text-[10px] text-gray-400">{feature.desc}</div>
                </div>
              ))}
            </div>

            {/* Tabs */}
            <div className="border-b border-pink-100 mb-5">
              <div className="flex gap-8">
                <button
                  onClick={() => setActiveTab('desc')}
                  className={`pb-3 text-sm font-bold transition-colors relative cursor-pointer ${
                    activeTab === 'desc' ? 'text-pink-600' : 'text-gray-400 hover:text-gray-600'
                  }`}
                >
                  {t('general.description')}
                  {activeTab === 'desc' && (
                    <motion.div layoutId="tab" className="absolute bottom-0 left-0 right-0 h-0.5 bg-pink-500 rounded-full" />
                  )}
                </button>
                <button
                  onClick={() => setActiveTab('reviews')}
                  className={`pb-3 text-sm font-bold transition-colors relative cursor-pointer ${
                    activeTab === 'reviews' ? 'text-pink-600' : 'text-gray-400 hover:text-gray-600'
                  }`}
                >
                  {t('general.reviews')} ({totalReviews})
                  {activeTab === 'reviews' && (
                    <motion.div layoutId="tab" className="absolute bottom-0 left-0 right-0 h-0.5 bg-pink-500 rounded-full" />
                  )}
                </button>
              </div>
            </div>

            {/* Tab Content */}
            <AnimatePresence mode="wait">
              {activeTab === 'desc' ? (
                <motion.div
                  key="desc"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="text-gray-600 leading-relaxed"
                >
                  <p className="text-sm mb-5">{desc}</p>
                  <ul className="space-y-3">
                    {[
                      { icon: <ShieldCheck size={16} />, text: isRTL ? 'جودة عالية مضمونة' : 'High quality guaranteed' },
                      { icon: <Truck size={16} />, text: isRTL ? 'شحن لجميع المحافظات' : 'Shipping to all governorates' },
                      { icon: <CreditCard size={16} />, text: isRTL ? 'الدفع عند الاستلام' : 'Cash on delivery' },
                      { icon: <RotateCcw size={16} />, text: isRTL ? 'إرجاع خلال 30 يوم' : '30 days return policy' },
                    ].map((item, i) => (
                      <li key={i} className="flex items-center gap-3 text-sm">
                        <span className="w-7 h-7 bg-pink-50 rounded-lg flex items-center justify-center text-pink-500">
                          {item.icon}
                        </span>
                        {item.text}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ) : (
                <motion.div
                  key="reviews"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="space-y-4"
                >
                  {reviews.map((review, idx) => (
                    <motion.div 
                      key={review.id} 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: idx * 0.1 }}
                      className="glass-premium rounded-xl p-4"
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-gradient-to-br from-pink-400 to-rose-400 rounded-full flex items-center justify-center text-white font-bold text-sm shadow-md">
                            {review.name.charAt(0)}
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="text-sm font-bold text-gray-800">
                                {lang === 'ar' ? review.nameAr : review.name}
                              </span>
                              {review.verified && (
                                <BadgeCheck size={14} className="text-blue-500" />
                              )}
                            </div>
                            <span className="text-[10px] text-gray-400">{review.date}</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-0.5">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} size={12} className="text-amber-400 fill-amber-400" />
                          ))}
                        </div>
                      </div>
                      <p className="text-sm text-gray-600 leading-relaxed">
                        {lang === 'ar' ? review.text : review.textEn}
                      </p>
                    </motion.div>
                  ))}
                  
                  {remainingReviews > 0 && (
                    <motion.div 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="text-center py-4"
                    >
                      <span className="px-4 py-2 bg-pink-50 text-pink-600 rounded-full text-sm font-medium">
                        +{remainingReviews} {isRTL ? 'تعليق آخر' : 'more reviews'}
                      </span>
                    </motion.div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <motion.section
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mt-16 pt-10 border-t border-pink-100"
          >
            <h2 className="text-2xl font-bold text-gray-800 mb-8 text-center">
              {t('general.related')}
            </h2>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {relatedProducts.map((p, i) => (
                <ProductCard key={p.id} product={p} index={i} onProductClick={onQuickView} />
              ))}
            </div>
          </motion.section>
        )}
      </div>

      {/* Mobile Bottom Actions */}
      <div className="fixed bottom-0 left-0 right-0 z-50 lg:hidden">
        <div className="bg-white/98 backdrop-blur-lg border-t border-pink-100 p-3 pb-safe shadow-2xl">
          <div className="flex gap-3">
            <motion.button
              whileTap={{ scale: 0.98 }}
              onClick={handleAddToCart}
              disabled={isAdded}
              className={`flex-1 py-3.5 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-all cursor-pointer ${
                isAdded
                  ? 'bg-green-500 text-white'
                  : 'bg-pink-50 text-pink-600 border border-pink-200'
              }`}
            >
              {isAdded ? <Check size={18} /> : <ShoppingBag size={18} />}
              {isAdded ? t('cart.added') : t('products.addToCart')}
            </motion.button>
            <motion.button
              whileTap={{ scale: 0.98 }}
              onClick={handleBuyNow}
              className="flex-1 py-3.5 bg-gradient-to-r from-pink-500 to-rose-500 text-white rounded-xl font-bold text-sm flex items-center justify-center gap-2 shadow-lg shadow-pink-200/50 cursor-pointer"
            >
              <Zap size={18} /> {isRTL ? 'اشتري الآن' : 'Buy Now'}
            </motion.button>
          </div>
        </div>
      </div>

      {/* Extra padding for mobile bottom actions */}
      <div className="h-28 lg:hidden" />

      {/* Zoom Modal */}
      <AnimatePresence>
        {showZoom && currentMedia.type === 'image' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] bg-black/95 flex items-center justify-center"
            onClick={() => setShowZoom(false)}
          >
            <button
              onClick={() => setShowZoom(false)}
              className="absolute top-4 right-4 w-11 h-11 bg-white/10 rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-colors cursor-pointer"
            >
              <X size={22} />
            </button>
            <motion.img
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              src={currentMedia.src}
              alt={name}
              className="max-w-full max-h-full object-contain p-4"
            />
            {/* Zoom Navigation */}
            {media.length > 1 && (
              <div className="absolute bottom-6 left-0 right-0 flex justify-center gap-2">
                {media.map((_, i) => (
                  <button
                    key={i}
                    onClick={(e) => { e.stopPropagation(); setSelectedImage(i); }}
                    className={`w-3 h-3 rounded-full transition-all cursor-pointer ${
                      selectedImage === i ? 'bg-white w-8' : 'bg-white/40 hover:bg-white/60'
                    }`}
                  />
                ))}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
