import { create } from 'zustand';
import { Product, CartItem, User, Language } from '../types';

interface StoreState {
  // Cart
  cart: CartItem[];
  addToCart: (product: Product, size: string, color?: string, quantity?: number) => void;
  removeFromCart: (productId: string, size: string) => void;
  updateQuantity: (productId: string, size: string, quantity: number) => void;
  clearCart: () => void;
  
  // Wishlist
  wishlist: Product[];
  addToWishlist: (product: Product) => void;
  removeFromWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;
  
  // User
  user: User | null;
  setUser: (user: User | null) => void;
  
  // Language
  language: Language;
  setLanguage: (language: Language) => void;
  
  // UI State
  isMobileMenuOpen: boolean;
  setMobileMenuOpen: (isOpen: boolean) => void;
  isCartOpen: boolean;
  setCartOpen: (isOpen: boolean) => void;
  isSearchOpen: boolean;
  setSearchOpen: (isOpen: boolean) => void;
}

export const useStore = create<StoreState>((set, get) => ({
  // Cart
  cart: JSON.parse(localStorage.getItem('luxe-cart') || '[]'),
  addToCart: (product: Product, size: string, color?: string, quantity = 1) => {
    const existingItem = get().cart.find(
      (item) => item.product.id === product.id && item.size === size && item.color === color
    );
    
    let newCart;
    if (existingItem) {
      newCart = get().cart.map((item) =>
        item.product.id === product.id && item.size === size && item.color === color
          ? { ...item, quantity: item.quantity + quantity }
          : item
      );
    } else {
      newCart = [...get().cart, { product, quantity, size, color }];
    }
    
    localStorage.setItem('luxe-cart', JSON.stringify(newCart));
    set({ cart: newCart });
  },
  removeFromCart: (productId: string, size: string) => {
    const newCart = get().cart.filter(
      (item) => !(item.product.id === productId && item.size === size)
    );
    localStorage.setItem('luxe-cart', JSON.stringify(newCart));
    set({ cart: newCart });
  },
  updateQuantity: (productId: string, size: string, quantity: number) => {
    if (quantity <= 0) {
      get().removeFromCart(productId, size);
      return;
    }
    const newCart = get().cart.map((item) =>
      item.product.id === productId && item.size === size
        ? { ...item, quantity }
        : item
    );
    localStorage.setItem('luxe-cart', JSON.stringify(newCart));
    set({ cart: newCart });
  },
  clearCart: () => {
    localStorage.setItem('luxe-cart', JSON.stringify([]));
    set({ cart: [] });
  },
  
  // Wishlist
  wishlist: JSON.parse(localStorage.getItem('luxe-wishlist') || '[]'),
  addToWishlist: (product: Product) => {
    if (!get().isInWishlist(product.id)) {
      const newWishlist = [...get().wishlist, product];
      localStorage.setItem('luxe-wishlist', JSON.stringify(newWishlist));
      set({ wishlist: newWishlist });
    }
  },
  removeFromWishlist: (productId: string) => {
    const newWishlist = get().wishlist.filter((item) => item.id !== productId);
    localStorage.setItem('luxe-wishlist', JSON.stringify(newWishlist));
    set({ wishlist: newWishlist });
  },
  isInWishlist: (productId: string) => {
    return get().wishlist.some((item) => item.id === productId);
  },
  
  // User
  user: JSON.parse(localStorage.getItem('luxe-user') || 'null'),
  setUser: (user: User | null) => {
    localStorage.setItem('luxe-user', JSON.stringify(user));
    set({ user });
  },
  
  // Language
  language: (localStorage.getItem('luxe-language') as Language) || 'en',
  setLanguage: (language: Language) => {
    localStorage.setItem('luxe-language', language);
    set({ language });
  },
  
  // UI State
  isMobileMenuOpen: false,
  setMobileMenuOpen: (isOpen: boolean) => set({ isMobileMenuOpen: isOpen }),
  isCartOpen: false,
  setCartOpen: (isOpen: boolean) => set({ isCartOpen: isOpen }),
  isSearchOpen: false,
  setSearchOpen: (isOpen: boolean) => set({ isSearchOpen: isOpen }),
}));
