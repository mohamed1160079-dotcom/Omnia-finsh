import React from 'react';
import { Mail, Phone, MapPin } from 'lucide-react';
import { useStore } from '../store/useStore';

interface FooterProps {
  onNavigate: (page: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const { language } = useStore();
  const [email, setEmail] = React.useState('');

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(language === 'en' ? 'Thank you for subscribing!' : 'شكراً لاشتراكك!');
    setEmail('');
  };

  return (
    <footer className="bg-neutral-50 border-t border-neutral-200">
      {/* Newsletter Section */}
      <div className="bg-gradient-to-r from-pink-400 to-pink-500 text-white py-12">
        <div className="container mx-auto px-4 max-w-2xl text-center">
          <h3 className="text-2xl md:text-3xl font-serif mb-4" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
            {language === 'en' ? 'Join Our Community' : 'انضم إلى مجتمعنا'}
          </h3>
          <p className="text-pink-50 mb-6">
            {language === 'en' 
              ? 'Subscribe to receive exclusive offers, styling tips, and new arrivals.' 
              : 'اشترك لتلقي العروض الحصرية ونصائح التنسيق والمنتجات الجديدة.'}
          </p>
          <form onSubmit={handleNewsletterSubmit} className="flex gap-2 max-w-md mx-auto">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={language === 'en' ? 'Enter your email' : 'أدخل بريدك الإلكتروني'}
              className="flex-1 px-4 py-3 bg-white text-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-300"
              required
            />
            <button
              type="submit"
              className="px-6 py-3 bg-white text-pink-600 font-medium hover:bg-pink-50 transition-colors rounded-lg shadow-md"
            >
              {language === 'en' ? 'Subscribe' : 'اشترك'}
            </button>
          </form>
        </div>
      </div>

      {/* Main Footer */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* About */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <h4 className="text-3xl font-black tracking-[0.25em] uppercase bg-gradient-to-r from-fuchsia-500 via-pink-500 to-rose-400 bg-clip-text text-transparent drop-shadow-lg bg-gradient-to-r from-pink-500 to-rose-500 bg-clip-text text-transparent" 
                  style={{ fontFamily: "'Montserrat', sans-serif" }}>
                Mony Store
              </h4>
              <span className="text-xs font-semibold text-gray-500 tracking-wider">STORE</span>
            </div>
            <p className="text-gray-600 text-sm leading-relaxed mb-4">
              {language === 'en'
                ? 'Premium fashion for the modern, sophisticated woman. Discover timeless elegance in every piece.'
                : 'أزياء فاخرة للمرأة العصرية المتطورة. اكتشف الأناقة الخالدة في كل قطعة.'}
            </p>
            <div className="flex space-x-4">
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-pink-500 transition-colors text-xl">
                IG
              </a>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-pink-500 transition-colors text-xl">
                FB
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-pink-500 transition-colors text-xl">
                X
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h5 className="font-semibold mb-4">{language === 'en' ? 'Quick Links' : 'روابط سريعة'}</h5>
            <ul className="space-y-2 text-sm">
              <li><button onClick={() => onNavigate('shop')} className="text-gray-600 hover:text-pink-500 transition-colors">
                {language === 'en' ? 'Shop All' : 'تسوق الكل'}
              </button></li>
              <li><button onClick={() => onNavigate('new-arrivals')} className="text-gray-600 hover:text-pink-500 transition-colors">
                {language === 'en' ? 'New Arrivals' : 'وصل حديثاً'}
              </button></li>
              <li><button onClick={() => onNavigate('best-sellers')} className="text-gray-600 hover:text-pink-500 transition-colors">
                {language === 'en' ? 'Best Sellers' : 'الأكثر مبيعاً'}
              </button></li>
              <li><button onClick={() => onNavigate('about')} className="text-gray-600 hover:text-pink-500 transition-colors">
                {language === 'en' ? 'About Us' : 'عنا'}
              </button></li>
              <li><button onClick={() => onNavigate('admin')} className="text-gray-600 hover:text-pink-500 transition-colors">
                {language === 'en' ? 'Admin' : 'إدارة'}
              </button></li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h5 className="font-semibold mb-4">{language === 'en' ? 'Customer Service' : 'خدمة العملاء'}</h5>
            <ul className="space-y-2 text-sm">
              <li><button onClick={() => onNavigate('contact')} className="text-gray-600 hover:text-pink-500 transition-colors">
                {language === 'en' ? 'Contact Us' : 'اتصل بنا'}
              </button></li>
              <li><button onClick={() => onNavigate('shipping')} className="text-gray-600 hover:text-pink-500 transition-colors">
                {language === 'en' ? 'Shipping Info' : 'معلومات الشحن'}
              </button></li>
              <li><button onClick={() => onNavigate('returns')} className="text-gray-600 hover:text-pink-500 transition-colors">
                {language === 'en' ? 'Returns & Exchanges' : 'الإرجاع والاستبدال'}
              </button></li>
              <li><button onClick={() => onNavigate('faq')} className="text-gray-600 hover:text-pink-500 transition-colors">
                {language === 'en' ? 'FAQ' : 'الأسئلة الشائعة'}
              </button></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h5 className="font-semibold mb-4">{language === 'en' ? 'Contact' : 'تواصل معنا'}</h5>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2 text-gray-600">
                <Mail size={18} className="mt-0.5 flex-shrink-0" />
                <a href="mailto:info@monystor.com" className="hover:text-pink-500 transition-colors">
                  info@monystor.com
                </a>
              </li>
              <li className="flex items-start gap-2 text-gray-600">
                <Phone size={18} className="mt-0.5 flex-shrink-0" />
                <a href="tel:+1234567890" className="hover:text-pink-500 transition-colors">
                  +1 (234) 567-890
                </a>
              </li>
              <li className="flex items-start gap-2 text-gray-600">
                <MapPin size={18} className="mt-0.5 flex-shrink-0" />
                <span>123 Fashion Street, New York, NY 10001</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-neutral-200 mt-12 pt-8 text-center text-sm text-gray-600">
          <p>&copy; 2024 LUXÉ. {language === 'en' ? 'All rights reserved.' : 'جميع الحقوق محفوظة.'}</p>
        </div>
      </div>
    </footer>
  );
};
