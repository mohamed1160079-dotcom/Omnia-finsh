import React, { useState } from 'react';
import { Menu, X, Search, ShoppingBag, Heart, User, Globe } from 'lucide-react';
import { useStore } from '../store/useStore';
import { cn } from '../utils/cn';

interface HeaderProps {
  onNavigate: (page: string) => void;
  currentPage: string;
}

export const Header: React.FC<HeaderProps> = ({ onNavigate, currentPage }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const { 
    cart, 
    wishlist, 
    isMobileMenuOpen, 
    setMobileMenuOpen, 
    setCartOpen,
    language,
    setLanguage 
  } = useStore();

  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', nameAr: 'الرئيسية', page: 'home' },
    { name: 'Shop', nameAr: 'تسوق', page: 'shop' },
    { name: 'New Arrivals', nameAr: 'وصل حديثاً', page: 'new-arrivals' },
    { name: 'Best Sellers', nameAr: 'الأكثر مبيعاً', page: 'best-sellers' },
    { name: 'About', nameAr: 'عنا', page: 'about' },
  ];

  const cartItemsCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <header 
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        isScrolled ? 'bg-white/95 backdrop-blur-md shadow-sm' : 'bg-white'
      )}
    >
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-black to-gray-900 text-white text-center py-2 px-4 text-sm">
        <p className="font-light tracking-wide">
          {language === 'en' ? '✨ FREE SHIPPING ON ORDERS OVER 999 EGP' : '✨ شحن مجاني للطلبات فوق 999 جنيه'}
        </p>
      </div>

      {/* Main Header */}
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <button 
            onClick={() => onNavigate('home')}
            className="flex items-center gap-2 group"
          >
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-pink-400 to-rose-400 blur-lg opacity-30 group-hover:opacity-50 transition-opacity"></div>
              <h1 className="relative text-2xl md:text-3xl font-bold tracking-tight bg-gradient-to-r from-pink-500 via-rose-500 to-pink-600 bg-clip-text text-transparent" 
                  style={{ fontFamily: "'Montserrat', sans-serif" }}>
                Mony Stor
              </h1>
            </div>
            <div className="flex flex-col items-start">
              <span className="text-[10px] font-semibold text-gray-600 leading-none tracking-wider">STORE</span>
              <span className="text-[8px] text-pink-500 leading-none tracking-widest font-medium">PREMIUM</span>
            </div>
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            {navLinks.map((link) => (
              <button
                key={link.page}
                onClick={() => onNavigate(link.page)}
                className={cn(
                  'text-sm tracking-wide transition-colors duration-300 hover:text-pink-500',
                  currentPage === link.page && 'font-semibold border-b-2 border-black'
                )}
              >
                {language === 'en' ? link.name : link.nameAr}
              </button>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center space-x-4">
            <button 
              onClick={() => setLanguage(language === 'en' ? 'ar' : 'en')}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors text-black"
              aria-label="Change Language"
            >
              <Globe size={20} />
            </button>
            
            <button 
              onClick={() => onNavigate('search')}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors text-black hidden md:block"
              aria-label="Search"
            >
              <Search size={20} />
            </button>

            <button 
              onClick={() => onNavigate('account')}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors text-black hidden md:block"
              aria-label="Account"
            >
              <User size={20} />
            </button>

            <button 
              onClick={() => onNavigate('wishlist')}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors relative text-black"
              aria-label="Wishlist"
            >
              <Heart size={20} />
              {wishlist.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-gradient-to-r from-black to-gray-900 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                  {wishlist.length}
                </span>
              )}
            </button>

            <button 
              onClick={() => setCartOpen(true)}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors relative text-black"
              aria-label="Shopping Cart"
            >
              <ShoppingBag size={20} />
              {cartItemsCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-gradient-to-r from-black to-gray-900 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                  {cartItemsCount}
                </span>
              )}
            </button>

            <button
              onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 lg:hidden"
              aria-label="Menu"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-white border-t">
          <nav className="container mx-auto px-4 py-6 space-y-4">
            {navLinks.map((link) => (
              <button
                key={link.page}
                onClick={() => {
                  onNavigate(link.page);
                  setMobileMenuOpen(false);
                }}
                className={cn(
                  'block w-full text-left py-2 text-lg transition-colors',
                  currentPage === link.page && 'font-semibold'
                )}
              >
                {language === 'en' ? link.name : link.nameAr}
              </button>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
};
