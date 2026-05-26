import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLang } from '../context/LanguageContext';
import { useCart } from '../context/CartContext';
import { Search, ShoppingBag, Heart, Menu, X, Globe } from 'lucide-react';

interface HeaderProps {
  onCartOpen: () => void;
  onPageChange: (page: string) => void;
  currentPage: string;
}

export default function Header({ onCartOpen, onPageChange, currentPage }: HeaderProps) {
  const { lang, setLang, t, isRTL } = useLang();
  const { totalItems, wishlist } = useCart();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { key: 'home', label: t('nav.home'), page: 'home' },
    { key: 'shop', label: t('nav.shop'), page: 'shop' },
    { key: 'sale', label: t('nav.sale'), page: 'sale' },
    { key: 'about', label: t('nav.about'), page: 'about' },
  ];

  return (
    <>
      {/* Top Bar */}
      <div className="bg-gradient-to-r from-pink-400 via-rose-400 to-pink-500 text-white text-[10px] sm:text-xs py-1.5 sm:py-2 text-center font-medium">
        <div className="container mx-auto px-3 flex items-center justify-center gap-1.5">
          <span>🇪🇬</span>
          <span>{isRTL ? 'توصيل لجميع محافظات مصر • الدفع عند الاستلام' : 'Delivery to all Egypt • Cash on Delivery'}</span>
        </div>
      </div>

      {/* Main Header */}
      <header className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled ? 'glass shadow-md' : 'bg-white/95'
      }`}>
        <div className="container mx-auto px-3 sm:px-4">
          <div className="flex items-center justify-between h-14 sm:h-16">
            {/* Mobile Menu Button */}
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden w-10 h-10 flex items-center justify-center hover:bg-pink-50 rounded-xl transition-colors"
            >
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>

            {/* Logo */}
            <button 
              onClick={() => onPageChange('home')}
              className="flex items-center gap-1.5 sm:gap-2 group"
            >
              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl sm:rounded-2xl bg-gradient-to-br from-pink-400 via-rose-400 to-pink-500 flex items-center justify-center text-white font-bold text-sm sm:text-lg shadow-lg shadow-pink-200/40 group-hover:shadow-pink-300/50 transition-all group-hover:scale-105">
                M
              </div>
              <div className="flex flex-col">
                <span className="text-base sm:text-lg font-bold bg-gradient-to-r from-pink-500 via-rose-500 to-pink-600 bg-clip-text text-transparent leading-tight" style={{ fontFamily: 'Poppins' }}>
                  Mony Store
                </span>
                <span className="text-[8px] sm:text-[9px] text-pink-400 -mt-0.5 tracking-wide hidden sm:block">
                  {isRTL ? 'أناقة بلا حدود' : 'LIMITLESS ELEGANCE'}
                </span>
              </div>
            </button>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center gap-1">
              {navItems.map(item => (
                <button
                  key={item.key}
                  onClick={() => onPageChange(item.page)}
                  className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                    currentPage === item.page
                      ? 'bg-pink-50 text-pink-600'
                      : 'text-gray-600 hover:text-pink-500 hover:bg-pink-50/50'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </nav>

            {/* Actions */}
            <div className="flex items-center gap-0.5 sm:gap-1">
              {/* Search - Desktop */}
              <button 
                onClick={() => setSearchOpen(!searchOpen)}
                className="hidden sm:flex w-10 h-10 items-center justify-center hover:bg-pink-50 rounded-xl transition-colors text-gray-600 hover:text-pink-500"
              >
                <Search size={18} />
              </button>

              {/* Language Toggle */}
              <button
                onClick={() => setLang(lang === 'ar' ? 'en' : 'ar')}
                className="hidden sm:flex items-center gap-1 px-2.5 py-2 hover:bg-pink-50 rounded-xl transition-colors text-gray-600 hover:text-pink-500 text-xs font-medium"
              >
                <Globe size={14} />
                <span>{lang === 'ar' ? 'EN' : 'عربي'}</span>
              </button>

              {/* Mobile Language */}
              <button
                onClick={() => setLang(lang === 'ar' ? 'en' : 'ar')}
                className="sm:hidden w-10 h-10 flex items-center justify-center hover:bg-pink-50 rounded-xl transition-colors text-gray-600 text-[10px] font-bold"
              >
                {lang === 'ar' ? 'EN' : 'ع'}
              </button>

              {/* Wishlist */}
              <button className="w-10 h-10 flex items-center justify-center hover:bg-pink-50 rounded-xl transition-colors text-gray-600 hover:text-pink-500 relative">
                <Heart size={18} />
                {wishlist.length > 0 && (
                  <span className="absolute top-1 right-1 w-4 h-4 bg-pink-500 text-white text-[9px] rounded-full flex items-center justify-center font-bold">
                    {wishlist.length}
                  </span>
                )}
              </button>

              {/* Cart */}
              <button 
                onClick={onCartOpen}
                className="w-10 h-10 flex items-center justify-center hover:bg-pink-50 rounded-xl transition-colors text-gray-600 hover:text-pink-500 relative"
              >
                <ShoppingBag size={18} />
                {totalItems > 0 && (
                  <motion.span 
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute top-1 right-1 w-4 h-4 bg-gradient-to-r from-pink-500 to-rose-500 text-white text-[9px] rounded-full flex items-center justify-center font-bold shadow-sm"
                  >
                    {totalItems}
                  </motion.span>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Search Bar */}
        <AnimatePresence>
          {searchOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="border-t border-pink-100 overflow-hidden"
            >
              <div className="container mx-auto px-4 py-3">
                <div className="relative">
                  <Search className={`absolute top-1/2 -translate-y-1/2 text-pink-300 ${isRTL ? 'right-4' : 'left-4'}`} size={16} />
                  <input
                    type="text"
                    placeholder={t('nav.search')}
                    className={`w-full ${isRTL ? 'pr-11 pl-4' : 'pl-11 pr-4'} py-2.5 bg-pink-50/50 border border-pink-100 rounded-xl focus:border-pink-300 focus:bg-white transition-all text-sm`}
                    autoFocus
                  />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <div className="fixed inset-0 z-[100] md:hidden">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/30 backdrop-blur-sm"
              onClick={() => setMobileMenuOpen(false)}
            />
            <motion.div
              initial={{ x: isRTL ? 280 : -280 }}
              animate={{ x: 0 }}
              exit={{ x: isRTL ? 280 : -280 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className={`absolute top-0 ${isRTL ? 'right-0' : 'left-0'} w-[260px] h-full bg-white shadow-2xl`}
            >
              <div className="p-5">
                {/* Mobile Menu Header */}
                <div className="flex items-center justify-between mb-6 pb-4 border-b border-pink-50">
                  <div className="flex items-center gap-2">
                    <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-pink-400 to-rose-500 flex items-center justify-center text-white font-bold text-sm">M</div>
                    <span className="font-bold text-pink-600" style={{ fontFamily: 'Poppins' }}>Mony Store</span>
                  </div>
                  <button onClick={() => setMobileMenuOpen(false)} className="w-9 h-9 flex items-center justify-center hover:bg-pink-50 rounded-xl">
                    <X size={18} />
                  </button>
                </div>

                {/* Navigation */}
                <nav className="space-y-1">
                  {navItems.map(item => (
                    <button
                      key={item.key}
                      onClick={() => { onPageChange(item.page); setMobileMenuOpen(false); }}
                      className={`w-full text-start px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                        currentPage === item.page
                          ? 'bg-pink-50 text-pink-600'
                          : 'text-gray-600 hover:bg-pink-50/50'
                      }`}
                    >
                      {item.label}
                    </button>
                  ))}
                </nav>

                {/* Language */}
                <div className="mt-6 pt-4 border-t border-pink-50">
                  <button
                    onClick={() => { setLang(lang === 'ar' ? 'en' : 'ar'); setMobileMenuOpen(false); }}
                    className="flex items-center gap-3 px-4 py-3 w-full hover:bg-pink-50 rounded-xl transition-colors text-gray-600 text-sm"
                  >
                    <Globe size={16} />
                    <span>{lang === 'ar' ? 'English' : 'العربية'}</span>
                  </button>
                </div>

                {/* Contact Info */}
                <div className="mt-6 pt-4 border-t border-pink-50">
                  <div className="text-[11px] text-gray-400 space-y-2 px-2">
                    <p>📱 +20 100 123 4567</p>
                    <p>✉️ hello@monystore.com</p>
                    <p>🇪🇬 {isRTL ? 'مصر' : 'Egypt'}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
