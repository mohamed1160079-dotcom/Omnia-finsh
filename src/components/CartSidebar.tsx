import React from 'react';
import { X, Plus, Minus, ShoppingBag } from 'lucide-react';
import { useStore } from '../store/useStore';
import { Button } from './Button';
import { cn } from '../utils/cn';

interface CartSidebarProps {
  onNavigate: (page: string) => void;
}

export const CartSidebar: React.FC<CartSidebarProps> = ({ onNavigate }) => {
  const { cart, isCartOpen, setCartOpen, updateQuantity, removeFromCart, language } = useStore();

  const subtotal = cart.reduce((sum, item) => {
    const price = item.product.salePrice || item.product.price;
    return sum + price * item.quantity;
  }, 0);

  const handleCheckout = () => {
    setCartOpen(false);
    onNavigate('checkout');
  };

  return (
    <>
      {/* Overlay */}
      {isCartOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-50 transition-opacity"
          onClick={() => setCartOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={cn(
          "fixed top-0 right-0 h-full w-full md:w-[450px] bg-white z-50 transform transition-transform duration-300 flex flex-col shadow-2xl",
          isCartOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-xl font-semibold">
            {language === 'en' ? 'Shopping Cart' : 'عربة التسوق'} ({cart.length})
          </h2>
          <button
            onClick={() => setCartOpen(false)}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto p-6">
          {cart.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <ShoppingBag size={64} className="text-gray-300 mb-4" />
              <p className="text-gray-500 mb-2">
                {language === 'en' ? 'Your cart is empty' : 'عربة التسوق فارغة'}
              </p>
              <Button onClick={() => setCartOpen(false)} variant="outline" size="sm">
                {language === 'en' ? 'Continue Shopping' : 'متابعة التسوق'}
              </Button>
            </div>
          ) : (
            <div className="space-y-6">
              {cart.map((item, index) => {
                const price = item.product.salePrice || item.product.price;
                return (
                  <div key={`${item.product.id}-${item.size}-${index}`} className="flex gap-4">
                    <div className="w-24 h-32 bg-gray-100 flex-shrink-0">
                      <img
                        src={item.product.images[0]}
                        alt={item.product.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 flex flex-col">
                      <div className="flex justify-between mb-2">
                        <h3 className="font-medium text-sm line-clamp-2">
                          {language === 'en' ? item.product.name : (item.product.nameAr || item.product.name)}
                        </h3>
                        <button
                          onClick={() => removeFromCart(item.product.id, item.size)}
                          className="text-gray-400 hover:text-black transition-colors"
                        >
                          <X size={18} />
                        </button>
                      </div>
                      <p className="text-sm text-gray-500 mb-2">
                        {language === 'en' ? 'Size' : 'المقاس'}: {item.size}
                        {item.color && ` • ${language === 'en' ? 'Color' : 'اللون'}: ${item.color}`}
                      </p>
                      <div className="flex items-center justify-between mt-auto">
                        <div className="flex items-center border border-gray-300">
                          <button
                            onClick={() => updateQuantity(item.product.id, item.size, item.quantity - 1)}
                            className="p-2 hover:bg-gray-100 transition-colors"
                          >
                            <Minus size={14} />
                          </button>
                          <span className="px-4 text-sm font-medium">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.product.id, item.size, item.quantity + 1)}
                            className="p-2 hover:bg-gray-100 transition-colors"
                          >
                            <Plus size={14} />
                          </button>
                        </div>
                        <p className="font-semibold">{(price * item.quantity).toFixed(2)} ج.م</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Footer */}
        {cart.length > 0 && (
          <div className="border-t p-6 space-y-4">
            <div className="flex justify-between text-lg font-semibold">
              <span>{language === 'en' ? 'Subtotal' : 'المجموع الفرعي'}:</span>
              <span>{subtotal.toFixed(2)} ج.م</span>
            </div>
            <p className="text-sm text-gray-500">
              {language === 'en' 
                ? 'Shipping and taxes calculated at checkout' 
                : 'سيتم حساب الشحن والضرائب عند الدفع'}
            </p>
            <Button onClick={handleCheckout} className="w-full" size="lg">
              {language === 'en' ? 'Checkout' : 'إتمام الطلب'}
            </Button>
            <Button onClick={() => setCartOpen(false)} variant="outline" className="w-full" size="lg">
              {language === 'en' ? 'Continue Shopping' : 'متابعة التسوق'}
            </Button>
          </div>
        )}
      </div>
    </>
  );
};
