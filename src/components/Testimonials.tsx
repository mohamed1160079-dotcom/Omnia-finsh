import { motion } from 'framer-motion';
import { useLang } from '../context/LanguageContext';
import { testimonials } from '../data/products';
import { Star, Quote, BadgeCheck } from 'lucide-react';

export default function Testimonials() {
  const { lang, t } = useLang();

  return (
    <section className="py-10 sm:py-16 bg-gradient-to-b from-pink-50/30 to-white">
      <div className="container mx-auto px-3 sm:px-4">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-8 sm:mb-10"
        >
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-2">{t('testimonials.title')}</h2>
          <div className="w-16 sm:w-20 h-1 bg-gradient-to-r from-pink-400 to-rose-400 rounded-full mx-auto mt-3" />
        </motion.div>

        <div className="grid md:grid-cols-3 gap-4 sm:gap-5">
          {testimonials.map((review, i) => (
            <motion.div
              key={review.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-white/80 backdrop-blur-sm rounded-xl sm:rounded-2xl p-5 sm:p-6 border border-pink-50 shadow-sm hover:shadow-md hover:shadow-pink-50/50 transition-all duration-300 relative"
            >
              <Quote size={24} className="text-pink-100 absolute top-4 right-4" />
              
              {/* Stars - Always show 5 stars */}
              <div className="flex gap-0.5 mb-3">
                {[...Array(5)].map((_, j) => (
                  <Star key={j} size={14} className="text-amber-400 fill-amber-400 drop-shadow-sm" />
                ))}
              </div>

              <p className="text-gray-600 text-xs sm:text-sm leading-relaxed mb-4">
                "{lang === 'ar' ? review.textAr : review.textEn}"
              </p>

              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-full bg-gradient-to-br from-pink-400 to-rose-400 flex items-center justify-center text-white font-bold text-xs shadow-md">
                  {(lang === 'ar' ? review.nameAr : review.nameEn).charAt(0)}
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="font-semibold text-gray-800 text-xs">
                      {lang === 'ar' ? review.nameAr : review.nameEn}
                    </span>
                    <BadgeCheck size={12} className="text-blue-500" />
                  </div>
                  <div className="text-[10px] text-gray-400">
                    📍 {lang === 'ar' ? review.location : review.locationEn}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
