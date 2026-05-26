import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type Lang = 'ar' | 'en';

interface LanguageContextType {
  lang: Lang;
  setLang: (lang: Lang) => void;
  t: (key: string) => string;
  isRTL: boolean;
}

const translations: Record<string, Record<Lang, string>> = {
  // Navigation
  'nav.home': { ar: 'الرئيسية', en: 'Home' },
  'nav.shop': { ar: 'تسوقي', en: 'Shop' },
  'nav.categories': { ar: 'الأقسام', en: 'Categories' },
  'nav.sale': { ar: 'عروض', en: 'Sale' },
  'nav.about': { ar: 'عنا', en: 'About' },
  'nav.contact': { ar: 'تواصلي معنا', en: 'Contact' },
  'nav.search': { ar: 'ابحثي عن منتج...', en: 'Search products...' },
  'nav.cart': { ar: 'السلة', en: 'Cart' },
  'nav.wishlist': { ar: 'المفضلة', en: 'Wishlist' },
  'nav.account': { ar: 'حسابي', en: 'My Account' },
  
  // Hero
  'hero.subtitle': { ar: '✨ مجموعة صيف 2025 الجديدة', en: '✨ New Summer 2025 Collection' },
  'hero.title1': { ar: 'اكتشفي أناقتك', en: 'Discover Your' },
  'hero.title2': { ar: 'مع موني ستور', en: 'Elegance with Mony' },
  'hero.desc': { ar: 'تشكيلة فاخرة من الأزياء والإكسسوارات النسائية المختارة بعناية لتناسب ذوقك الراقي', en: 'A luxurious collection of fashion & accessories carefully curated for your refined taste' },
  'hero.shopNow': { ar: 'تسوقي الآن', en: 'Shop Now' },
  'hero.newArrivals': { ar: 'وصل حديثاً', en: 'New Arrivals' },
  
  // Categories
  'cat.title': { ar: 'تسوقي حسب القسم', en: 'Shop by Category' },
  'cat.subtitle': { ar: 'اكتشفي مجموعاتنا المميزة', en: 'Discover our exclusive collections' },
  'cat.clothes': { ar: 'ملابس', en: 'Clothing' },
  'cat.bags': { ar: 'شنط', en: 'Bags' },
  'cat.perfume': { ar: 'عطور', en: 'Perfumes' },
  'cat.makeup': { ar: 'مكياج', en: 'Makeup' },
  'cat.accessories': { ar: 'إكسسوارات', en: 'Accessories' },
  'cat.skincare': { ar: 'عناية بالبشرة', en: 'Skincare' },
  
  // Products
  'products.trending': { ar: '🔥 الأكثر مبيعاً', en: '🔥 Trending Now' },
  'products.new': { ar: '✨ وصل حديثاً', en: '✨ New Arrivals' },
  'products.sale': { ar: '🏷️ عروض خاصة', en: '🏷️ Special Offers' },
  'products.addToCart': { ar: 'أضيفي للسلة', en: 'Add to Cart' },
  'products.quickView': { ar: 'نظرة سريعة', en: 'Quick View' },
  'products.viewAll': { ar: 'عرض الكل', en: 'View All' },
  'products.egp': { ar: 'ج.م', en: 'EGP' },
  'products.off': { ar: 'خصم', en: 'OFF' },
  'products.outOfStock': { ar: 'نفذ', en: 'Sold Out' },
  'products.inStock': { ar: 'متوفر', en: 'In Stock' },
  'products.free_shipping': { ar: 'شحن مجاني', en: 'Free Shipping' },
  
  // Flash Sale
  'flash.title': { ar: '⚡ تخفيضات فلاش', en: '⚡ Flash Sale' },
  'flash.subtitle': { ar: 'عروض محدودة الوقت - اسرعي قبل النفاذ!', en: 'Limited time offers - Hurry before they\'re gone!' },
  'flash.days': { ar: 'يوم', en: 'Days' },
  'flash.hours': { ar: 'ساعة', en: 'Hours' },
  'flash.minutes': { ar: 'دقيقة', en: 'Min' },
  'flash.seconds': { ar: 'ثانية', en: 'Sec' },
  
  // Cart
  'cart.title': { ar: 'سلة التسوق', en: 'Shopping Cart' },
  'cart.empty': { ar: 'سلتك فارغة', en: 'Your cart is empty' },
  'cart.emptyDesc': { ar: 'ابدئي التسوق واكتشفي منتجاتنا المميزة', en: 'Start shopping and discover our amazing products' },
  'cart.subtotal': { ar: 'المجموع الفرعي', en: 'Subtotal' },
  'cart.shipping': { ar: 'الشحن', en: 'Shipping' },
  'cart.free': { ar: 'مجاني', en: 'Free' },
  'cart.total': { ar: 'الإجمالي', en: 'Total' },
  'cart.checkout': { ar: 'إتمام الطلب', en: 'Checkout' },
  'cart.continue': { ar: 'متابعة التسوق', en: 'Continue Shopping' },
  'cart.remove': { ar: 'إزالة', en: 'Remove' },
  'cart.added': { ar: 'تمت الإضافة!', en: 'Added!' },
  
  // Checkout
  'checkout.title': { ar: 'إتمام الطلب', en: 'Checkout' },
  'checkout.info': { ar: 'معلومات التوصيل', en: 'Delivery Information' },
  'checkout.name': { ar: 'الاسم الكامل', en: 'Full Name' },
  'checkout.phone': { ar: 'رقم الموبايل', en: 'Phone Number' },
  'checkout.email': { ar: 'البريد الإلكتروني (اختياري)', en: 'Email (Optional)' },
  'checkout.governorate': { ar: 'المحافظة', en: 'Governorate' },
  'checkout.city': { ar: 'المدينة', en: 'City' },
  'checkout.address': { ar: 'العنوان التفصيلي', en: 'Detailed Address' },
  'checkout.notes': { ar: 'ملاحظات (اختياري)', en: 'Notes (Optional)' },
  'checkout.payment': { ar: 'طريقة الدفع', en: 'Payment Method' },
  'checkout.cod': { ar: 'الدفع عند الاستلام', en: 'Cash on Delivery' },
  'checkout.codDesc': { ar: 'ادفعي عند استلام طلبك', en: 'Pay when you receive your order' },
  'checkout.placeOrder': { ar: 'تأكيد الطلب', en: 'Place Order' },
  'checkout.orderSummary': { ar: 'ملخص الطلب', en: 'Order Summary' },
  
  // Order Success
  'order.success': { ar: '🎉 تم تأكيد طلبك بنجاح!', en: '🎉 Order Confirmed Successfully!' },
  'order.successDesc': { ar: 'شكراً لتسوقك من موني ستور. سيتم التواصل معك لتأكيد الطلب', en: 'Thank you for shopping at Mony Store. We will contact you to confirm your order' },
  'order.number': { ar: 'رقم الطلب', en: 'Order Number' },
  'order.backHome': { ar: 'العودة للرئيسية', en: 'Back to Home' },
  
  // Footer
  'footer.desc': { ar: 'متجرك المفضل للأزياء النسائية الفاخرة في مصر', en: 'Your favorite luxury women\'s fashion store in Egypt' },
  'footer.quickLinks': { ar: 'روابط سريعة', en: 'Quick Links' },
  'footer.customerService': { ar: 'خدمة العملاء', en: 'Customer Service' },
  'footer.shipping': { ar: 'الشحن والتوصيل', en: 'Shipping & Delivery' },
  'footer.returns': { ar: 'الإرجاع والاستبدال', en: 'Returns & Exchange' },
  'footer.privacy': { ar: 'سياسة الخصوصية', en: 'Privacy Policy' },
  'footer.terms': { ar: 'الشروط والأحكام', en: 'Terms & Conditions' },
  'footer.contact': { ar: 'تواصلي معنا', en: 'Contact Us' },
  'footer.rights': { ar: '© 2025 Mony Store. جميع الحقوق محفوظة', en: '© 2025 Mony Store. All rights reserved' },
  'footer.madeWith': { ar: 'صنع بـ ❤️ في مصر 🇪🇬', en: 'Made with ❤️ in Egypt 🇪🇬' },
  
  // Features
  'feature.freeShipping': { ar: 'شحن مجاني', en: 'Free Shipping' },
  'feature.freeShippingDesc': { ar: 'للطلبات فوق 500 ج.م', en: 'Orders over 500 EGP' },
  'feature.cod': { ar: 'الدفع عند الاستلام', en: 'Cash on Delivery' },
  'feature.codDesc': { ar: 'ادفعي عند استلام طلبك', en: 'Pay when you receive' },
  'feature.returns': { ar: 'إرجاع سهل', en: 'Easy Returns' },
  'feature.returnsDesc': { ar: 'خلال 14 يوم', en: 'Within 14 days' },
  'feature.support': { ar: 'دعم 24/7', en: '24/7 Support' },
  'feature.supportDesc': { ar: 'خدمة عملاء متميزة', en: 'Premium customer service' },
  
  // Testimonials
  'testimonials.title': { ar: '💕 آراء عميلاتنا', en: '💕 Customer Reviews' },
  
  // General
  'general.egypt': { ar: 'مصر', en: 'Egypt' },
  'general.currency': { ar: 'ج.م', en: 'EGP' },
  'general.close': { ar: 'إغلاق', en: 'Close' },
  'general.loading': { ar: 'جاري التحميل...', en: 'Loading...' },
  'general.viewDetails': { ar: 'عرض التفاصيل', en: 'View Details' },
  'general.backToShop': { ar: 'العودة للتسوق', en: 'Back to Shop' },
  'general.size': { ar: 'المقاس', en: 'Size' },
  'general.color': { ar: 'اللون', en: 'Color' },
  'general.quantity': { ar: 'الكمية', en: 'Quantity' },
  'general.description': { ar: 'الوصف', en: 'Description' },
  'general.reviews': { ar: 'التقييمات', en: 'Reviews' },
  'general.related': { ar: 'منتجات مشابهة', en: 'Related Products' },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(() => {
    const saved = localStorage.getItem('mony-lang');
    return (saved as Lang) || 'ar';
  });

  const setLang = (newLang: Lang) => {
    setLangState(newLang);
    localStorage.setItem('mony-lang', newLang);
  };

  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
  }, [lang]);

  const t = (key: string): string => {
    return translations[key]?.[lang] || key;
  };

  const isRTL = lang === 'ar';

  return (
    <LanguageContext.Provider value={{ lang, setLang, t, isRTL }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLang() {
  const context = useContext(LanguageContext);
  if (!context) throw new Error('useLang must be used within LanguageProvider');
  return context;
}
