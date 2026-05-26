import { motion } from 'framer-motion';
import { useLang } from '../context/LanguageContext';
import { MessageCircle, Camera, Globe2 } from 'lucide-react';

interface FooterProps {
  onPageChange?: (page: string) => void;
}

export default function Footer({ onPageChange }: FooterProps) {
  const { t, isRTL } = useLang();

  const handleNavClick = (page: string) => {
    if (onPageChange) {
      onPageChange(page);
    }
  };

  const handleSocialClick = (platform: string) => {
    const urls: Record<string, string> = {
      instagram: 'https://instagram.com/monystore',
      facebook: 'https://facebook.com/monystore',
      whatsapp: 'https://wa.me/201001234567',
    };
    window.open(urls[platform], '_blank');
  };

  return (
    <footer className="bg-gradient-to-b from-pink-50 to-pink-100/50 border-t border-pink-100">
      <div className="container mx-auto px-3 sm:px-4">
        {/* Newsletter */}
        <div className="py-10 sm:py-14 text-center">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h3 className="text-xl sm:text-2xl font-bold text-gray-800 mb-2">
              {isRTL ? '💌 اشتركي في نشرتنا' : '💌 Subscribe to our Newsletter'}
            </h3>
            <p className="text-gray-500 text-xs sm:text-sm mb-5 max-w-sm mx-auto">
              {isRTL ? 'كوني أول من يعرف عن العروض الجديدة' : 'Be the first to know about new offers'}
            </p>
            <div className="flex items-center gap-2 max-w-sm mx-auto">
              <input
                type="email"
                placeholder={isRTL ? 'بريدك الإلكتروني' : 'Your email'}
                className="flex-1 px-4 py-2.5 sm:py-3 bg-white rounded-lg sm:rounded-xl border border-pink-100 text-xs sm:text-sm focus:border-pink-300 transition-colors min-w-0"
                dir="ltr"
              />
              <button className="flex-shrink-0 px-4 sm:px-5 py-2.5 sm:py-3 bg-gradient-to-r from-pink-500 to-rose-500 text-white rounded-lg sm:rounded-xl font-semibold text-xs sm:text-sm shadow-md shadow-pink-200/50 hover:shadow-pink-300/60 transition-all cursor-pointer hover:-translate-y-0.5">
                {isRTL ? 'اشتركي' : 'Subscribe'}
              </button>
            </div>
          </motion.div>
        </div>

        {/* Main Footer */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 py-8 sm:py-10 border-t border-pink-200/50">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <button 
              onClick={() => handleNavClick('home')}
              className="flex items-center gap-2 mb-3 cursor-pointer hover:opacity-80 transition-opacity"
            >
              <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-gradient-to-br from-pink-400 to-rose-500 flex items-center justify-center text-white font-bold text-sm shadow-md">M</div>
              <span className="text-base sm:text-lg font-bold text-pink-600" style={{ fontFamily: 'Poppins' }}>Mony Store</span>
            </button>
            <p className="text-xs text-gray-500 leading-relaxed mb-4">{t('footer.desc')}</p>
            <div className="flex gap-2">
              <button 
                onClick={() => handleSocialClick('instagram')}
                className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg bg-white border border-pink-100 flex items-center justify-center text-gray-500 hover:text-white hover:bg-gradient-to-br hover:from-purple-500 hover:to-pink-500 transition-all shadow-sm cursor-pointer"
              >
                <Camera size={16} />
              </button>
              <button 
                onClick={() => handleSocialClick('facebook')}
                className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg bg-white border border-pink-100 flex items-center justify-center text-gray-500 hover:text-white hover:bg-blue-500 transition-all shadow-sm cursor-pointer"
              >
                <Globe2 size={16} />
              </button>
              <button 
                onClick={() => handleSocialClick('whatsapp')}
                className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg bg-white border border-pink-100 flex items-center justify-center text-gray-500 hover:text-white hover:bg-green-500 transition-all shadow-sm cursor-pointer"
              >
                <MessageCircle size={16} />
              </button>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold text-gray-800 text-xs sm:text-sm mb-3">{t('footer.quickLinks')}</h4>
            <ul className="space-y-2">
              {[
                { label: t('nav.home'), page: 'home' },
                { label: t('nav.shop'), page: 'shop' },
                { label: t('nav.sale'), page: 'sale' },
                { label: t('nav.about'), page: 'about' },
              ].map((link, i) => (
                <li key={i}>
                  <button 
                    onClick={() => handleNavClick(link.page)}
                    className="text-xs text-gray-500 hover:text-pink-500 transition-colors cursor-pointer"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h4 className="font-bold text-gray-800 text-xs sm:text-sm mb-3">{t('footer.customerService')}</h4>
            <ul className="space-y-2">
              {[
                { label: t('footer.shipping'), info: isRTL ? '3-5 أيام عمل' : '3-5 Business Days' },
                { label: t('footer.returns'), info: isRTL ? '30 يوم' : '30 Days' },
                { label: t('footer.privacy'), info: null },
                { label: t('footer.terms'), info: null },
              ].map((link, i) => (
                <li key={i}>
                  <button className="text-xs text-gray-500 hover:text-pink-500 transition-colors cursor-pointer text-start">
                    {link.label}
                    {link.info && <span className="text-pink-400 ml-1">({link.info})</span>}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-bold text-gray-800 text-xs sm:text-sm mb-3">{t('footer.contact')}</h4>
            <ul className="space-y-2 text-xs text-gray-500">
              <li>📍 {isRTL ? 'القاهرة، مصر' : 'Cairo, Egypt'}</li>
              <li>
                <a href="tel:+201001234567" className="hover:text-pink-500 transition-colors cursor-pointer" dir="ltr">
                  📱 +20 100 123 4567
                </a>
              </li>
              <li>
                <a href="mailto:hello@monystore.com" className="hover:text-pink-500 transition-colors cursor-pointer" dir="ltr">
                  ✉️ hello@monystore.com
                </a>
              </li>
              <li>🕐 {isRTL ? '10ص - 10م يومياً' : '10AM - 10PM Daily'}</li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="py-5 border-t border-pink-200/50 text-center">
          <p className="text-[10px] sm:text-xs text-gray-400 mb-1">{t('footer.rights')}</p>
          <p className="text-[10px] sm:text-xs text-gray-400">
            {t('footer.madeWith')}
          </p>
        </div>
      </div>
    </footer>
  );
}
