import toast from 'react-hot-toast';
import React, { useState, useEffect } from 'react';
import { Heart, Minus, Plus, Star, ChevronLeft, Eye } from 'lucide-react';
import { Product } from '../types';
import { ProductCard } from '../components/ProductCard';
import { Button } from '../components/Button';
import { useStore } from '../store/useStore';
import { cn } from '../utils/cn';

// Translation helper for colors
const translateColor = (color: string): string => {
  const colorTranslations: { [key: string]: string } = {
    'Black': 'أسود',
    'White': 'أبيض',
    'Red': 'أحمر',
    'Blue': 'أزرق',
    'Green': 'أخضر',
    'Yellow': 'أصفر',
    'Pink': 'وردي',
    'Purple': 'بنفسجي',
    'Orange': 'برتقالي',
    'Brown': 'بني',
    'Gray': 'رمادي',
    'Grey': 'رمادي',
    'Navy': 'كحلي',
    'Burgundy': 'عنابي',
    'Beige': 'بيج',
    'Cream': 'كريمي',
    'Champagne': 'شامبين',
    'Blush': 'وردي فاتح',
    'Sage': 'أخضر حكيم',
    'Ivory': 'عاجي',
    'Mocha': 'موكا',
    'Taupe': 'بني فاتح',
    'Nude': 'نيود',
    'Dusty Rose': 'وردي داكن',
  };
  return colorTranslations[color] || color;
};

interface ProductDetailsPageProps {
  product: Product;
  relatedProducts: Product[];
  onViewProduct: (product: Product) => void;
  onBack: () => void;
}

export const ProductDetailsPage: React.FC<ProductDetailsPageProps> = ({
  product,
  relatedProducts,
  onViewProduct,
  onBack,
}) => {
  const [selectedSize, setSelectedSize] = useState(product.sizes[0]);
  const [selectedColor, setSelectedColor] = useState(product.colors?.[0]);
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  

  // AUTO IMAGE SLIDER
  useEffect(() => {
    if (!product?.images?.length) return;

    const interval = setInterval(() => {
      setSelectedImage((prev) =>
        prev === product.images.length - 1 ? 0 : prev + 1
      );
    }, 2500);

    return () => clearInterval(interval);
  }, [product]);

const [fullscreen, setFullscreen] = useState(false);
  const [viewersCount, setViewersCount] = useState(Math.floor(Math.random() * 15) + 8); // 8-22 viewers
  const [showRecentOrder, setShowRecentOrder] = useState(false);
  
  const { addToCart, addToWishlist, removeFromWishlist, isInWishlist, language } = useStore();
  const inWishlist = isInWishlist(product.id);

  // Simulate live viewers count changes
  useEffect(() => {
    const interval = setInterval(() => {
      setViewersCount(prev => {
        const change = Math.random() > 0.5 ? 1 : -1;
        const newCount = prev + change;
        return Math.max(5, Math.min(25, newCount)); // Keep between 5-25
      });
    }, 8000 + Math.random() * 7000); // Random interval 8-15 seconds

    return () => clearInterval(interval);
  }, []);

  // Show recent order notification randomly
  useEffect(() => {
    const showNotification = () => {
      setShowRecentOrder(true);
      setTimeout(() => setShowRecentOrder(false), 5000);
    };

    const interval = setInterval(showNotification, 20000 + Math.random() * 15000);
    return () => clearInterval(interval);
  }, []);

  const handleAddToCart = () => {

  addToCart(product, selectedSize, selectedColor, quantity);

  toast.success(
    language === 'en'
      ? 'Added to cart successfully'
      : 'تمت إضافة المنتج للسلة'
  );
};

  const handleWishlistToggle = () => {
    if (inWishlist) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
  };

  const cities = language === 'en' 
    ? ['Cairo', 'Alexandria', 'Giza', 'Sharm El Sheikh', 'Hurghada', 'Luxor', 'Aswan', 'Mansoura']
    : ['القاهرة', 'الإسكندرية', 'الجيزة', 'شرم الشيخ', 'الغردقة', 'الأقصر', 'أسوان', 'المنصورة'];

  return (
    <div className="min-h-screen py-8 px-4">
      {/* Luxury Recent Order Notification */}
      {showRecentOrder && (
        <div className="fixed bottom-6 left-6 z-50 animate-slide-up">
          <div className="bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden max-w-sm">
            {/* Gradient Top Border */}
            <div className="h-1 bg-gradient-to-r from-pink-400 via-rose-400 to-orange-400"></div>
            
            <div className="p-5">
              <div className="flex items-start gap-4">
                {/* Product Mini Image */}
                <div className="w-16 h-16 rounded-xl overflow-hidden flex-shrink-0 border-2 border-pink-100">
                  <img 
                    src={product.images[0]} 
                    alt="Recent purchase" 
                    className="w-full h-full object-cover"
                  />
                </div>
                
                <div className="flex-1">
                  {/* Header with Icon */}
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-6 h-6 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center">
                      <svg className="w-3.5 h-3.5 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <span className="text-sm font-bold text-gray-800">
                      {language === 'en' ? 'Verified Purchase' : 'عملية شراء موثقة'}
                    </span>
                  </div>
                  
                  {/* Details */}
                  <p className="text-xs text-gray-600 mb-1 leading-relaxed">
                    {language === 'en' 
                      ? `Customer from ` 
                      : `عميل من `}
                    <span className="font-semibold text-pink-600">
                      {cities[Math.floor(Math.random() * cities.length)]}
                    </span>
                    {language === 'en' ? ` purchased this` : ` اشترى هذا`}
                  </p>
                  
                  {/* Time Badge */}
                  <div className="inline-flex items-center gap-1 bg-gradient-to-r from-pink-50 to-rose-50 px-2 py-1 rounded-full border border-pink-100">
                    <span className="relative flex h-1.5 w-1.5">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-pink-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-pink-500"></span>
                    </span>
                    <span className="text-xs font-medium text-pink-700">
                      {Math.floor(Math.random() * 8) + 2} {language === 'en' ? 'min ago' : 'د مضت'}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="container mx-auto">
        {/* Back Button */}
        <button
          onClick={onBack}
          className="flex items-center gap-2 mb-8 text-gray-600 hover:text-black transition-colors"
        >
          <ChevronLeft size={20} />
          {language === 'en' ? 'Back' : 'رجوع'}
        </button>

        {/* Social Proof Banner */}
        <div className="mb-8 bg-gradient-to-r from-indigo-50 via-purple-50 to-pink-50 border border-purple-100 rounded-2xl p-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="flex -space-x-2">
                <div className="w-10 h-10 rounded-full border-2 border-white bg-gradient-to-br from-pink-400 to-rose-500 flex items-center justify-center text-white text-xs font-bold">
                  M
                </div>
                <div className="w-10 h-10 rounded-full border-2 border-white bg-gradient-to-br from-purple-400 to-indigo-500 flex items-center justify-center text-white text-xs font-bold">
                  S
                </div>
                <div className="w-10 h-10 rounded-full border-2 border-white bg-gradient-to-br from-blue-400 to-cyan-500 flex items-center justify-center text-white text-xs font-bold">
                  A
                </div>
                <div className="w-10 h-10 rounded-full border-2 border-white bg-gradient-to-br from-green-400 to-emerald-500 flex items-center justify-center text-white text-xs font-bold">
                  +{Math.floor(Math.random() * 20) + 30}
                </div>
              </div>
              <div>
                <p className="font-semibold text-gray-800 text-sm">
                  {language === 'en' ? `${Math.floor(Math.random() * 50) + 150}+ Happy Customers` : `${Math.floor(Math.random() * 50) + 150}+ عميل سعيد`}
                </p>
                <p className="text-xs text-gray-600">
                  {language === 'en' ? 'Purchased this item recently' : 'اشتروا هذا المنتج مؤخراً'}
                </p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="text-center">
                <p className="text-2xl font-bold text-pink-600">{product.rating}</p>
                <div className="flex">
                  {[...Array(5)].map((_, i) => {
                    const fillPercentage = Math.min(Math.max(product.rating - i, 0), 1);
                    return (
                      <div key={i} className="relative">
                        <Star size={12} className="text-gray-300" fill="currentColor" />
                        <div className="absolute top-0 left-0 overflow-hidden" style={{ width: `${fillPercentage * 100}%` }}>
                          <Star size={12} className="text-pink-500" fill="currentColor" />
                        </div>
                      </div>
                    );
                  })}
                </div>
                <p className="text-xs text-gray-600 mt-1">{language === 'en' ? 'Rating' : 'تقييم'}</p>
              </div>
              
              <div className="h-12 w-px bg-gray-300"></div>
              
              <div className="text-center">
                <p className="text-2xl font-bold text-purple-600">{Math.floor(Math.random() * 500) + 800}</p>
                <p className="text-xs text-gray-600">{language === 'en' ? 'Sold' : 'مباع'}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Product Details */}
        <div className="grid md:grid-cols-2 gap-12 mb-20">
          {/* Images */}
          <div>
            <div className="aspect-[3/4] bg-neutral-100 mb-4">
              <img
                src={product.images[selectedImage]}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="grid grid-cols-4 gap-4">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => { setSelectedImage(index); setFullscreen(true); }}
                  className={cn(
                    "aspect-square bg-neutral-100 border-2 transition-colors rounded-lg overflow-hidden",
                    selectedImage === index ? "border-pink-500" : "border-transparent hover:border-pink-300"
                  )}
                >
                  <img src={image} alt={`${product.name} ${index + 1}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Info */}
          <div>
            <div className="flex items-start justify-between mb-4">
              <div>
                <h1 className="text-3xl md:text-4xl font-light mb-3" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
                  {language === 'en' ? product.name : (product.nameAr || product.name)}
                </h1>
                
                {/* Premium Stats Bar */}
                <div className="flex flex-wrap items-center gap-4 mb-4">
                  <div className="flex items-center gap-2 bg-gradient-to-r from-pink-50 to-rose-50 px-3 py-1.5 rounded-full border border-pink-100">
                    <Eye size={14} className="text-pink-600" />
                    <span className="text-xs font-medium text-gray-700">
                      <span className="text-pink-600 font-bold">{viewersCount}</span> {language === 'en' ? 'viewing' : 'يشاهد'}
                    </span>
                  </div>
                  
                  <div className="flex items-center gap-1.5">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => {
                        const fillPercentage = Math.min(Math.max(product.rating - i, 0), 1);
                        return (
                          <div key={i} className="relative">
                            <Star size={14} className="text-gray-300" fill="currentColor" />
                            <div className="absolute top-0 left-0 overflow-hidden" style={{ width: `${fillPercentage * 100}%` }}>
                              <Star size={14} className="text-pink-500" fill="currentColor" />
                            </div>
                          </div>
                        );
                      })}
                    </div>
                    <span className="text-xs text-gray-600 font-medium">
                      {product.rating} ({product.reviews.length}+ {language === 'en' ? 'reviews' : 'تقييم'})
                    </span>
                  </div>

                  <div className="flex items-center gap-1.5 bg-green-50 px-3 py-1.5 rounded-full border border-green-100">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                    </span>
                    <span className="text-xs font-semibold text-green-700">
                      {language === 'en' ? 'In Stock' : 'متوفر'}
                    </span>
                  </div>
                </div>
              </div>
              <button
                onClick={handleWishlistToggle}
                className="p-3 hover:bg-gray-100 rounded-full transition-colors"
              >
                <Heart size={24} fill={inWishlist ? "currentColor" : "none"} />
              </button>
            </div>

            <div className="mb-6">
              {product.salePrice ? (
                <div className="flex items-center gap-3">
                  <span className="text-3xl font-semibold">{product.salePrice} ج.م</span>
                  <span className="text-xl text-gray-400 line-through">{product.price} ج.م</span>
                  <span className="bg-gradient-to-r from-rose-400 to-rose-500 text-white text-sm px-3 py-1 rounded-full shadow-md">
                    {language === 'en' ? 'SALE' : 'تخفيض'}
                  </span>
                </div>
              ) : (
                <span className="text-3xl font-semibold">{product.price} ج.م</span>
              )}
            </div>

            <p className="text-gray-700 mb-8 leading-relaxed">
              {language === 'en' ? product.description : (product.descriptionAr || product.description)}
            </p>

            {/* Color Selection */}
            {product.colors && product.colors.length > 0 && (
              <div className="mb-6">
                <label className="block text-sm font-medium mb-3">
                  {language === 'en' ? 'Color' : 'اللون'}: {selectedColor}
                </label>
                <div className="flex flex-wrap gap-3">
                  {product.colors.map((color, index) => (
                    <button
                      key={color}
                      onClick={() => {
                        setSelectedColor(color);
                        setSelectedImage(index % product.images.length);
                      }}
                      className={cn(
                        "px-6 py-3 border-2 font-medium transition-all rounded-lg min-w-[120px]",
                        selectedColor === color
                          ? "border-pink-500 bg-gradient-to-r from-pink-400 to-pink-500 text-white shadow-md"
                          : "border-gray-300 hover:border-pink-300 bg-white text-gray-700"
                      )}
                    >
                      {language === 'en' ? color : translateColor(color)}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Size Selection */}
            <div className="mb-6">
              <label className="block text-sm font-medium mb-3">
                {language === 'en' ? 'Size' : 'المقاس'}: {selectedSize}
              </label>
              <div className="flex flex-wrap gap-2">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={cn(
                      "px-6 py-3 border-2 font-medium transition-all rounded-lg",
                      selectedSize === size
                        ? "border-pink-500 bg-gradient-to-r from-pink-400 to-pink-500 text-white shadow-md"
                        : "border-gray-300 hover:border-pink-300"
                    )}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity */}
            <div className="mb-8">
              <label className="block text-sm font-medium mb-3">
                {language === 'en' ? 'Quantity' : 'الكمية'}
              </label>
              <div className="flex items-center border-2 border-gray-300 w-fit">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="p-4 hover:bg-gray-100 transition-colors"
                >
                  <Minus size={18} />
                </button>
                <span className="px-8 text-lg font-medium">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="p-4 hover:bg-gray-100 transition-colors"
                >
                  <Plus size={18} />
                </button>
              </div>
            </div>

            {/* Premium Urgency Section */}
            <div className="mb-6 space-y-3">
              {/* Limited Stock */}
              <div className="relative overflow-hidden bg-gradient-to-r from-rose-50 via-pink-50 to-orange-50 border border-rose-200 rounded-xl p-4">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-lg">🔥</span>
                      <h3 className="font-semibold text-gray-800 text-sm">
                        {language === 'en' ? 'High Demand Item' : 'منتج عليه إقبال كبير'}
                      </h3>
                    </div>
                    <p className="text-xs text-gray-600">
                      {language === 'en' 
                        ? `Only ${Math.floor(Math.random() * 4) + 3} pieces left • Selling fast!` 
                        : `متبقي ${Math.floor(Math.random() * 4) + 3} قطع فقط • يباع بسرعة!`}
                    </p>
                    <div className="mt-3 bg-white/60 rounded-full h-2 overflow-hidden">
                      <div className="bg-gradient-to-r from-rose-400 to-pink-500 h-full rounded-full" style={{ width: '73%' }}></div>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">
                      {language === 'en' ? '73% sold in last 24h' : 'تم بيع 73% في آخر 24 ساعة'}
                    </p>
                  </div>
                </div>
              </div>

              {/* Free Delivery Countdown */}
              <div className="bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-200 rounded-xl p-4">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center flex-shrink-0 shadow-sm">
                    <span className="text-xl">🚚</span>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-800 text-sm mb-1">
                      {language === 'en' ? ' Express Delivery' : 'توصيل سريع '}
                    </h3>
                    <p className="text-xs text-gray-600">
                      {language === 'en' 
                        ? 'Quantities are very limited, order before they run out.' 
                        : 'الكمية محدوده جدا اطلبي قبل النفاذ'}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Add to Cart */}
            <Button onClick={handleAddToCart} size="lg" className="w-full mb-6 shadow-lg hover:shadow-xl">
              {language === 'en' ? 'Add to Cart' : 'إضافة إلى السلة'}
            </Button>

            {/* Premium Trust Badges */}
            <div className="grid grid-cols-3 gap-3 mb-6 p-4 bg-gradient-to-br from-gray-50 to-pink-50 rounded-xl border border-gray-100">
              <div className="text-center">
                <div className="w-10 h-10 mx-auto mb-2 bg-gradient-to-br from-green-100 to-emerald-100 rounded-full flex items-center justify-center">
                  <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </div>
                <p className="text-xs font-semibold text-gray-700">
                  {language === 'en' ? 'Authentic' : 'أصلي'}
                </p>
                <p className="text-xs text-gray-500">
                  {language === 'en' ? '100%' : '100%'}
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-10 h-10 mx-auto mb-2 bg-gradient-to-br from-blue-100 to-cyan-100 rounded-full flex items-center justify-center">
                  <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </div>
                <p className="text-xs font-semibold text-gray-700">
                  {language === 'en' ? 'Quality' : 'جودة'}
                </p>
                <p className="text-xs text-gray-500">
                  {language === 'en' ? 'Premium' : 'فاخرة'}
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-10 h-10 mx-auto mb-2 bg-gradient-to-br from-purple-100 to-pink-100 rounded-full flex items-center justify-center">
                  <svg className="w-5 h-5 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M8 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM15 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
                    <path d="M3 4a1 1 0 00-1 1v10a1 1 0 001 1h1.05a2.5 2.5 0 014.9 0H10a1 1 0 001-1V5a1 1 0 00-1-1H3zM14 7a1 1 0 00-1 1v6.05A2.5 2.5 0 0115.95 16H17a1 1 0 001-1v-5a1 1 0 00-.293-.707l-2-2A1 1 0 0015 7h-1z" />
                  </svg>
                </div>
                <p className="text-xs font-semibold text-gray-700">
                  {language === 'en' ? 'Fast Ship' : 'شحن سريع'}
                </p>
                <p className="text-xs text-gray-500">
                  {language === 'en' ? '1-3 Days' : '1-3 أيام'}
                </p>
              </div>
            </div>

            {/* Product Features */}
            <div className="border-t border-gray-200 pt-6 space-y-4 text-sm">
              <div className="flex justify-between">
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">{language === 'en' ? 'Payment' : 'الدفع'}</span>
                <span>{language === 'en' ? 'Cash on Delivery' : 'الدفع عند الاستلام'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">{language === 'en' ? 'Returns' : 'الإرجاع'}</span>
                <span>{language === 'en' ? '30 days return policy' : 'سياسة إرجاع 30 يوم'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">{language === 'en' ? 'Delivery' : 'التوصيل'}</span>
                <span>{language === 'en' ? '3-5 business days' : '3-5 أيام عمل'}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Reviews */}
        {product.reviews.length > 0 && (
          <div className="mb-20">
            <h2 className="text-3xl font-light mb-8" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
              {language === 'en' ? 'Customer Reviews' : 'تقييمات العملاء'}
            </h2>
            <div className="space-y-6">
              {product.reviews.map((review) => (
                <div key={review.id} className="border-b border-gray-200 pb-6">
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <p className="font-medium">{review.userName}</p>
                      <div className="flex mt-1">
                        {[...Array(5)].map((_, i) => {
                          const fillPercentage = Math.min(Math.max(review.rating - i, 0), 1);
                          return (
                            <div key={i} className="relative">
                              <Star size={14} className="text-gray-300" fill="currentColor" />
                              <div className="absolute top-0 left-0 overflow-hidden" style={{ width: `${fillPercentage * 100}%` }}>
                                <Star size={14} className="text-pink-500" fill="currentColor" />
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                    <span className="text-sm text-gray-500">{review.date}</span>
                  </div>
                  <p className="text-gray-700">{review.comment}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div>
            <h2 className="text-3xl font-light mb-8" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
              {language === 'en' ? 'You May Also Like' : 'قد يعجبك أيضاً'}
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {relatedProducts.slice(0, 4).map((relatedProduct) => (
                <ProductCard
                  key={relatedProduct.id}
                  product={relatedProduct}
                  onViewDetails={onViewProduct}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    

      {/* FULLSCREEN IMAGE VIEWER */}
      {fullscreen && (
        <div
          className="fixed inset-0 z-[9999] bg-black/95 flex items-center justify-center"
          onClick={() => setFullscreen(false)}
        >
          <img
            src={product.images[selectedImage]}
            alt=""
            className="max-w-full max-h-full object-contain"
          />
        </div>
      )}
</div>
  );
};
