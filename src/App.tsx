import { useState, useEffect, useCallback } from 'react';
import { LanguageProvider, useLang } from './context/LanguageContext';
import { CartProvider, useCart, Product } from './context/CartContext';
import { products } from './data/products';
import SplashScreen from './components/SplashScreen';
import Header from './components/Header';
import Hero from './components/Hero';
import Features from './components/Features';
import Categories from './components/Categories';
import ProductGrid from './components/ProductGrid';
import FlashSale from './components/FlashSale';
import PromoBanner from './components/PromoBanner';
import Testimonials from './components/Testimonials';
import Footer from './components/Footer';
import CartSidebar from './components/CartSidebar';
import Checkout from './components/Checkout';
import OrderSuccess from './components/OrderSuccess';
import ProductDetails from './components/ProductDetails';
import ProductCard from './components/ProductCard';
import MobileBottomNav from './components/MobileBottomNav';

// Generate slug from product name
function toSlug(name: string): string {
  return name.toLowerCase().replace(/\s+/g, '-').replace(/[^\w\u0600-\u06FF-]/g, '');
}

// Parse current hash route
function parseHash(): { page: string; productId?: number } {
  const hash = window.location.hash.replace('#', '') || '/';
  if (hash === '/' || hash === '') return { page: 'home' };
  if (hash === '/shop') return { page: 'shop' };
  if (hash === '/sale') return { page: 'sale' };
  if (hash === '/about') return { page: 'about' };
  if (hash === '/wishlist') return { page: 'wishlist' };
  if (hash === '/checkout') return { page: 'checkout' };
  if (hash === '/order-success') return { page: 'orderSuccess' };
  if (hash.startsWith('/product/')) {
    const slug = hash.replace('/product/', '');
    const found = products.find(p => toSlug(p.nameEn) === slug || String(p.id) === slug);
    if (found) return { page: 'productDetails', productId: found.id };
  }
  return { page: 'home' };
}

function AppContent() {
  const [showSplash, setShowSplash] = useState(true);
  const [cartOpen, setCartOpen] = useState(false);

  // Parse initial route from hash
  const initial = parseHash();
  const [currentPage, setCurrentPage] = useState(initial.page);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(
    initial.productId ? products.find(p => p.id === initial.productId) || null : null
  );

  useEffect(() => {
    const timer = setTimeout(() => setShowSplash(false), 1800);
    return () => clearTimeout(timer);
  }, []);

  // Listen for browser back/forward
  useEffect(() => {
    const onHashChange = () => {
      const parsed = parseHash();
      setCurrentPage(parsed.page);
      if (parsed.productId) {
        setSelectedProduct(products.find(p => p.id === parsed.productId) || null);
      } else {
        setSelectedProduct(null);
      }
    };
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  // Navigate helper — updates hash which triggers state via hashchange
  const navigate = useCallback((hash: string) => {
    window.location.hash = hash;
    window.scrollTo(0, 0);
  }, []);

  const handlePageChange = (page: string) => {
    const routes: Record<string, string> = {
      home: '/',
      shop: '/shop',
      sale: '/sale',
      about: '/about',
      wishlist: '/wishlist',
    };
    navigate(routes[page] || '/');
  };

  const handleCheckout = () => {
    setCartOpen(false);
    navigate('/checkout');
  };

  const handleOrderSuccess = () => {
    navigate('/order-success');
  };

  const handleProductClick = (product: Product) => {
    navigate(`/product/${toSlug(product.nameEn)}`);
  };

  const handleBackFromProduct = () => {
    navigate('/shop');
  };

  const handleBuyNow = () => {
    navigate('/checkout');
  };

  // Update page title
  useEffect(() => {
    const titles: Record<string, string> = {
      home: 'Mony Store | متجر موني',
      shop: 'Shop | تسوقي - Mony Store',
      sale: 'Sale | عروض - Mony Store',
      about: 'About | عنا - Mony Store',
      wishlist: 'Wishlist | المفضلة - Mony Store',
      checkout: 'Checkout | الطلب - Mony Store',
      orderSuccess: 'Order Confirmed ❤️ - Mony Store',
    };
    if (currentPage === 'productDetails' && selectedProduct) {
      document.title = `${selectedProduct.nameAr} - Mony Store`;
    } else {
      document.title = titles[currentPage] || 'Mony Store';
    }
  }, [currentPage, selectedProduct]);

  const showHeader = currentPage !== 'orderSuccess';
  const showFooter = !['checkout', 'orderSuccess', 'productDetails'].includes(currentPage);
  const showBottomNav = !['checkout', 'orderSuccess', 'productDetails'].includes(currentPage);

  return (
    <div className="min-h-screen bg-[#FFF8F0]" style={{ overflowX: 'hidden' }}>
      <SplashScreen isVisible={showSplash} />

      {showHeader && (
        <Header
          onCartOpen={() => setCartOpen(true)}
          onPageChange={handlePageChange}
          currentPage={currentPage}
        />
      )}

      {currentPage === 'home' && (
        <main>
          <Hero onShopNow={() => handlePageChange('shop')} />
          <Features />
          <Categories onCategoryClick={() => handlePageChange('shop')} />
          <ProductGrid
            title="🔥 الأكثر مبيعاً | Trending Now"
            limit={3}
            onProductClick={handleProductClick}
          />
          <PromoBanner onShopNow={() => handlePageChange('shop')} />
          <FlashSale onProductClick={handleProductClick} />
          <Testimonials />
        </main>
      )}

      {currentPage === 'shop' && (
        <main>
          <ProductGrid
            title="🛍️ جميع المنتجات | All Products"
            showFilter
            onProductClick={handleProductClick}
          />
        </main>
      )}

      {currentPage === 'sale' && (
        <main>
          <FlashSale onProductClick={handleProductClick} />
          <ProductGrid
            title="🏷️ عروض خاصة | Special Offers"
            onProductClick={handleProductClick}
          />
        </main>
      )}

      {currentPage === 'about' && (
        <main className="py-12 sm:py-16">
          <AboutSection />
        </main>
      )}

      {currentPage === 'wishlist' && (
        <main className="py-12 sm:py-16">
          <WishlistSection onProductClick={handleProductClick} />
        </main>
      )}

      {currentPage === 'productDetails' && selectedProduct && (
        <ProductDetails
          product={selectedProduct}
          onBack={handleBackFromProduct}
          onQuickView={handleProductClick}
          onBuyNow={handleBuyNow}
        />
      )}

      {currentPage === 'checkout' && (
        <Checkout
          onBack={() => handlePageChange('home')}
          onOrderSuccess={handleOrderSuccess}
        />
      )}

      {currentPage === 'orderSuccess' && (
        <OrderSuccess onBackHome={() => handlePageChange('home')} />
      )}

      {showFooter && <Footer onPageChange={handlePageChange} />}

      <CartSidebar
        isOpen={cartOpen}
        onClose={() => setCartOpen(false)}
        onCheckout={handleCheckout}
      />

      {showBottomNav && (
        <MobileBottomNav
          currentPage={currentPage}
          onPageChange={handlePageChange}
          onCartOpen={() => setCartOpen(true)}
        />
      )}

      {showBottomNav && <div className="h-16 md:hidden" />}
    </div>
  );
}

function AboutSection() {
  const { isRTL } = useLang();
  return (
    <div className="container mx-auto px-3 sm:px-4">
      <div className="max-w-2xl mx-auto text-center">
        <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-5 rounded-2xl sm:rounded-3xl bg-gradient-to-br from-pink-400 to-rose-500 flex items-center justify-center text-white text-2xl sm:text-3xl font-bold shadow-xl shadow-pink-200/50">
          M
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-3">Mony Store</h1>
        <p className="text-sm sm:text-base text-pink-500 font-medium mb-6">✨ Limitless Elegance ✨</p>
        <div className="bg-white rounded-xl sm:rounded-2xl p-5 sm:p-8 shadow-sm border border-pink-50 text-start space-y-4">
          <p className="text-gray-600 text-xs sm:text-sm leading-relaxed">
            موني ستور هو وجهتك المفضلة للأزياء النسائية الفاخرة في مصر. نقدم لكِ تشكيلة واسعة من الملابس والإكسسوارات والعطور ومنتجات العناية بالبشرة والمكياج، كلها مختارة بعناية لتناسب ذوقك الراقي.
          </p>
          <p className="text-gray-600 text-xs sm:text-sm leading-relaxed" dir="ltr">
            Mony Store is your premier destination for luxury women's fashion in Egypt. We offer a wide selection of clothing, accessories, perfumes, skincare, and makeup products, all carefully curated to match your refined taste.
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6">
            {[
              { num: '10K+', label: isRTL ? 'عميلة سعيدة' : 'Happy Customers' },
              { num: '500+', label: isRTL ? 'منتج' : 'Products' },
              { num: '27', label: isRTL ? 'محافظة' : 'Governorates' },
              { num: '4.9⭐', label: isRTL ? 'تقييم' : 'Rating' },
            ].map((stat, i) => (
              <div key={i} className="bg-pink-50 rounded-xl p-3 text-center">
                <div className="text-lg sm:text-xl font-bold text-pink-600">{stat.num}</div>
                <div className="text-[10px] sm:text-xs text-gray-500 mt-0.5">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function WishlistSection({ onProductClick }: { onProductClick: (product: Product) => void }) {
  const { wishlist } = useCart();
  const { isRTL } = useLang();
  const wishlistProducts = products.filter((p: Product) => wishlist.includes(p.id));

  if (wishlistProducts.length === 0) {
    return (
      <div className="container mx-auto px-4 text-center py-12">
        <div className="w-20 h-20 mx-auto mb-4 bg-pink-50 rounded-full flex items-center justify-center">
          <span className="text-3xl">💕</span>
        </div>
        <h2 className="text-lg font-bold text-gray-800 mb-2">
          {isRTL ? 'قائمة المفضلة فارغة' : 'Wishlist is empty'}
        </h2>
        <p className="text-sm text-gray-500">
          {isRTL ? 'أضيفي منتجاتك المفضلة هنا' : 'Add your favorite products here'}
        </p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-3 sm:px-4">
      <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-6 text-center">
        💕 {isRTL ? 'المفضلة' : 'My Wishlist'}
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
        {wishlistProducts.map((product: Product, i: number) => (
          <ProductCard key={product.id} product={product} index={i} onProductClick={onProductClick} />
        ))}
      </div>
    </div>
  );
}

export default function App() {
  return (
    <LanguageProvider>
      <CartProvider>
        <AppContent />
      </CartProvider>
    </LanguageProvider>
  );
}
