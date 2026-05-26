import { motion } from 'framer-motion';
import { useLang } from '../context/LanguageContext';
import { ArrowLeft, ArrowRight } from 'lucide-react';

interface PromoBannerProps {
  onShopNow: () => void;
}

export default function PromoBanner({ onShopNow }: PromoBannerProps) {
  const { isRTL } = useLang();

  return (
    <section className="py-6 sm:py-10">
      <div className="container mx-auto px-3 sm:px-4">
        <div className="grid md:grid-cols-2 gap-3 sm:gap-4">
          {/* Banner 1 */}
          <motion.button
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            onClick={onShopNow}
            className="relative rounded-xl sm:rounded-2xl overflow-hidden h-[180px] sm:h-[220px] md:h-[260px] group cursor-pointer text-start w-full"
          >
            <img
              src="https://images.pexels.com/photos/5760913/pexels-photo-5760913.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200"
              alt="New Collection"
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-pink-600/70 to-transparent" />
            <div className={`absolute inset-0 flex flex-col justify-center ${isRTL ? 'pr-5 sm:pr-8' : 'pl-5 sm:pl-8'}`}>
              <span className="text-white/80 text-[10px] sm:text-xs font-medium mb-1.5 uppercase tracking-wide">
                {isRTL ? 'مجموعة جديدة' : 'New Collection'}
              </span>
              <h3 className="text-xl sm:text-2xl font-bold text-white mb-3">
                {isRTL ? 'أزياء صيف 2025' : 'Summer 2025 Fashion'}
              </h3>
              <span className="flex items-center gap-1.5 text-white font-semibold text-xs sm:text-sm group-hover:gap-2.5 transition-all">
                {isRTL ? 'تسوقي الآن' : 'Shop Now'}
                {isRTL ? <ArrowLeft size={14} /> : <ArrowRight size={14} />}
              </span>
            </div>
          </motion.button>

          {/* Banner 2 */}
          <motion.button
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            onClick={onShopNow}
            className="relative rounded-xl sm:rounded-2xl overflow-hidden h-[180px] sm:h-[220px] md:h-[260px] group cursor-pointer text-start w-full"
          >
            <img
              src="https://images.pexels.com/photos/28606629/pexels-photo-28606629.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200"
              alt="Luxury Perfumes"
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-rose-600/70 to-transparent" />
            <div className={`absolute inset-0 flex flex-col justify-center ${isRTL ? 'pr-5 sm:pr-8' : 'pl-5 sm:pl-8'}`}>
              <span className="text-white/80 text-[10px] sm:text-xs font-medium mb-1.5 uppercase tracking-wide">
                {isRTL ? 'خصم حتى 50%' : 'Up to 50% OFF'}
              </span>
              <h3 className="text-xl sm:text-2xl font-bold text-white mb-3">
                {isRTL ? 'عطور فاخرة' : 'Luxury Perfumes'}
              </h3>
              <span className="flex items-center gap-1.5 text-white font-semibold text-xs sm:text-sm group-hover:gap-2.5 transition-all">
                {isRTL ? 'اكتشفي المزيد' : 'Discover More'}
                {isRTL ? <ArrowLeft size={14} /> : <ArrowRight size={14} />}
              </span>
            </div>
          </motion.button>
        </div>
      </div>
    </section>
  );
}
