import { motion } from 'framer-motion';
import { useLang } from '../context/LanguageContext';
import { useCart } from '../context/CartContext';
import { Home, ShoppingBag, Heart, Grid3X3 } from 'lucide-react';

interface MobileBottomNavProps {
  currentPage: string;
  onPageChange: (page: string) => void;
  onCartOpen: () => void;
}

export default function MobileBottomNav({ currentPage, onPageChange, onCartOpen }: MobileBottomNavProps) {
  const { isRTL } = useLang();
  const { totalItems } = useCart();

  const tabs = [
    { id: 'home', icon: Home, label: isRTL ? 'الرئيسية' : 'Home' },
    { id: 'shop', icon: Grid3X3, label: isRTL ? 'تسوقي' : 'Shop' },
    { id: 'cart', icon: ShoppingBag, label: isRTL ? 'السلة' : 'Cart', badge: totalItems },
    { id: 'wishlist', icon: Heart, label: isRTL ? 'المفضلة' : 'Wishlist' },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 z-[90] md:hidden">
      <div className="bg-white/95 backdrop-blur-lg border-t border-pink-100 px-4 pb-safe shadow-lg shadow-pink-100/20">
        <div className="flex items-center justify-around py-1.5">
          {tabs.map(tab => {
            const isActive = currentPage === tab.id;
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => tab.id === 'cart' ? onCartOpen() : onPageChange(tab.id)}
                className="flex flex-col items-center gap-0.5 py-1.5 px-3 relative min-w-[60px]"
              >
                <div className={`relative p-1.5 rounded-lg transition-all ${isActive ? 'bg-pink-50' : ''}`}>
                  <Icon size={20} className={`transition-colors ${isActive ? 'text-pink-500' : 'text-gray-400'}`} />
                  {tab.badge && tab.badge > 0 && (
                    <motion.span
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-pink-500 text-white text-[8px] rounded-full flex items-center justify-center font-bold"
                    >
                      {tab.badge}
                    </motion.span>
                  )}
                </div>
                <span className={`text-[9px] font-medium transition-colors ${isActive ? 'text-pink-500' : 'text-gray-400'}`}>
                  {tab.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
