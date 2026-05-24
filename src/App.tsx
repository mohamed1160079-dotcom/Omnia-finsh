import { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { CartSidebar } from './components/CartSidebar';
import { HomePage } from './pages/HomePage';
import { ShopPage } from './pages/ShopPage';
import { ProductDetailsPage } from './pages/ProductDetailsPage';
import { CheckoutPage } from './pages/CheckoutPage';
import { AccountPage } from './pages/AccountPage';
import { WishlistPage } from './pages/WishlistPage';
import { AdminPage } from './pages/AdminPage';
import { SearchPage } from './pages/SearchPage';
import { products as initialProducts } from './data/products';
import { Product } from './types';
import { useStore } from './store/useStore';


const getProductUrl = (product: Product) => `/product/${product.id}`;

const syncUrl = (page: string, product?: Product | null) => {
  let path = '/';

  if (page === 'shop') path = '/shop';
  else if (page === 'wishlist') path = '/wishlist';
  else if (page === 'account') path = '/account';
  else if (page === 'checkout') path = '/checkout';
  else if (page === 'product-details' && product) path = getProductUrl(product);

  window.history.pushState({}, '', path);
};

type Page = 'home' | 'shop' | 'new-arrivals' | 'best-sellers' | 'product-details' | 'checkout' | 'account' | 'wishlist' | 'admin' | 'search' | 'about' | 'contact' | 'shipping' | 'returns' | 'faq' | string;

function App() {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [categoryFilter, setCategoryFilter] = useState<string | undefined>(undefined);
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const { language } = useStore();

  const handleAddProduct = (product: Product) => {
    setProducts([...products, product]);
  };

  const handleEditProduct = (id: string, updatedProduct: Product) => {
    setProducts(products.map(p => p.id === id ? updatedProduct : p));
  };

  const handleDeleteProduct = (id: string) => {
    setProducts(products.filter(p => p.id !== id));
  };

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentPage]);

  useEffect(() => {
    const handleRoute = () => {
      const path = window.location.pathname;

      if (path.startsWith('/product/')) {
        const productId = path.split('/product/')[1];
        const foundProduct = products.find(p => p.id === productId);

        if (foundProduct) {
          setSelectedProduct(foundProduct);
          setCurrentPage('product-details');
          return;
        }
      }

      if (path === '/shop') setCurrentPage('shop');
      else if (path === '/wishlist') setCurrentPage('wishlist');
      else if (path === '/account') setCurrentPage('account');
      else if (path === '/checkout') setCurrentPage('checkout');
      else setCurrentPage('home');
    };

    handleRoute();

    window.addEventListener('popstate', handleRoute);

    return () => window.removeEventListener('popstate', handleRoute);
  }, [products]);

  const handleNavigate = (page: string) => {
    if (page.startsWith('category-')) {
      const category = page.replace('category-', '');
      setCategoryFilter(category);
      setCurrentPage('shop');
      syncUrl('shop');
    } else {
      setCategoryFilter(undefined);
      setCurrentPage(page as Page);
      syncUrl(page);
    }
  };

  const handleViewProduct = (product: Product) => {
    setSelectedProduct(product);
    setCurrentPage('product-details');
    syncUrl('product-details', product);
  };

  const handleBackFromProduct = () => {
    setCurrentPage('shop');
    setSelectedProduct(null);
    syncUrl('shop');
  };

  const handleBackFromCheckout = () => {
    setCurrentPage('home');
    syncUrl('home');
  };

  const getRelatedProducts = (product: Product) => {
    return products
      .filter(p => p.category === product.category && p.id !== product.id)
      .slice(0, 4);
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return (
          <HomePage
            products={products}
            onViewProduct={handleViewProduct}
            onNavigate={handleNavigate}
          />
        );

      case 'shop':
        return (
          <ShopPage
            products={products}
            onViewProduct={handleViewProduct}
            categoryFilter={categoryFilter}
          />
        );

      case 'new-arrivals':
        return (
          <ShopPage
            products={products.filter(p => p.isNew)}
            onViewProduct={handleViewProduct}
          />
        );

      case 'best-sellers':
        return (
          <ShopPage
            products={products.filter(p => p.isBestSeller)}
            onViewProduct={handleViewProduct}
          />
        );

      case 'product-details':
        if (!selectedProduct) {
          setCurrentPage('shop');
          return null;
        }
        return (
          <ProductDetailsPage
            product={selectedProduct}
            relatedProducts={getRelatedProducts(selectedProduct)}
            onViewProduct={handleViewProduct}
            onBack={handleBackFromProduct}
          />
        );

      case 'checkout':
        return <CheckoutPage onBack={handleBackFromCheckout} />;

      case 'account':
        return <AccountPage />;

      case 'wishlist':
        return (
          <WishlistPage
            onViewProduct={handleViewProduct}
            onNavigate={handleNavigate}
          />
        );

      case 'admin':
        return (
          <AdminPage
            products={products}
            onAddProduct={handleAddProduct}
            onEditProduct={handleEditProduct}
            onDeleteProduct={handleDeleteProduct}
          />
        );

      case 'search':
        return (
          <SearchPage
            products={products}
            onViewProduct={handleViewProduct}
            onClose={() => setCurrentPage('home')}
          />
        );

      case 'about':
        return (
          <div className="min-h-screen py-20 px-4">
            <div className="container mx-auto max-w-4xl">
              <div className="text-center mb-8">
                <div className="inline-flex items-center gap-3 mb-4">
                  <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-pink-500 via-rose-500 to-pink-600 bg-clip-text text-transparent" 
                      style={{ fontFamily: "'Montserrat', sans-serif" }}>
                    Omnia Store
                  </h1>
                </div>
                <p className="text-pink-500 font-medium tracking-widest text-sm">PREMIUM FASHION</p>
              </div>
              <div className="prose max-w-none">
                <p className="text-lg text-gray-700 mb-6">
                  {language === 'en' 
                    ? 'Omnia Store is a premium women\'s fashion brand dedicated to creating timeless, elegant pieces for the modern, sophisticated woman. Our collections feature luxurious fabrics, impeccable tailoring, and designs that celebrate femininity and grace.'
                    : 'أومنيا ستور هي علامة تجارية فاخرة للأزياء النسائية مكرسة لإنشاء قطع خالدة وأنيقة للمرأة العصرية المتطورة. تتميز مجموعاتنا بأقمشة فاخرة وتفصيل لا تشوبه شائبة وتصاميم تحتفي بالأنوثة والرقي.'}
                </p>
                <p className="text-lg text-gray-700 mb-6">
                  {language === 'en'
                    ? 'Founded with a vision to provide high-quality, modest luxury fashion, we carefully curate each piece to ensure it meets our standards of excellence. From elegant evening wear to everyday essentials, every item in our collection is designed to make you feel confident and beautiful.'
                    : 'تأسست برؤية لتوفير أزياء فاخرة عالية الجودة ومحتشمة، نختار بعناية كل قطعة لضمان أنها تلبي معايير التميز لدينا. من الأزياء المسائية الأنيقة إلى الأساسيات اليومية، كل عنصر في مجموعتنا مصمم لتشعري بالثقة والجمال.'}
                </p>
                <p className="text-lg text-gray-700">
                  {language === 'en'
                    ? 'We believe that luxury should be accessible, and style should be effortless. Thank you for choosing Omnia Store.'
                    : 'نؤمن بأن الفخامة يجب أن تكون في متناول الجميع، والأناقة يجب أن تكون سهلة. شكراً لاختيارك أومنيا ستور.'}
                </p>
              </div>
            </div>
          </div>
        );

      case 'contact':
      case 'shipping':
      case 'returns':
      case 'faq':
        return (
          <div className="min-h-screen py-20 px-4">
            <div className="container mx-auto max-w-4xl text-center">
              <h1 
                className="text-4xl md:text-5xl font-light mb-8"
                style={{ fontFamily: "'Cormorant Garamond', serif" }}
              >
                {currentPage.charAt(0).toUpperCase() + currentPage.slice(1)}
              </h1>
              <p className="text-gray-600">This page is under construction.</p>
            </div>
          </div>
        );

      default:
        return (
          <HomePage
            products={products}
            onViewProduct={handleViewProduct}
            onNavigate={handleNavigate}
          />
        );
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header onNavigate={handleNavigate} currentPage={currentPage} />
      <main className="flex-1 pt-[104px]">
        {renderPage()}
      </main>
      <Footer onNavigate={handleNavigate} />
      <CartSidebar onNavigate={handleNavigate} />
    </div>
  );
}

export default App;
