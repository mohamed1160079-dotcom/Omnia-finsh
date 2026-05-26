import { motion } from 'framer-motion';
import { useLang } from '../context/LanguageContext';
import { Truck, CreditCard, RotateCcw, Headphones } from 'lucide-react';

export default function Features() {
  const { isRTL } = useLang();

  const features = [
    { icon: <Truck size={20} />, title: isRTL ? 'توصيل سريع' : 'Fast Delivery', desc: isRTL ? '2-4 أيام' : '2-4 Days', color: 'from-pink-400 to-rose-400' },
    { icon: <CreditCard size={20} />, title: isRTL ? 'الدفع عند الاستلام' : 'Cash on Delivery', desc: isRTL ? 'ادفعي عند الاستلام' : 'Pay on receive', color: 'from-purple-400 to-pink-400' },
    { icon: <RotateCcw size={20} />, title: isRTL ? 'إرجاع سهل' : 'Easy Returns', desc: isRTL ? 'خلال 14 يوم' : 'Within 14 days', color: 'from-rose-400 to-pink-500' },
    { icon: <Headphones size={20} />, title: isRTL ? 'دعم 24/7' : '24/7 Support', desc: isRTL ? 'خدمة متميزة' : 'Premium service', color: 'from-pink-500 to-rose-500' },
  ];

  return (
    <section className="py-8 sm:py-12">
      <div className="container mx-auto px-3 sm:px-4">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          {features.map((feature, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="bg-white rounded-xl sm:rounded-2xl p-3 sm:p-5 text-center border border-pink-50 shadow-sm hover:shadow-md hover:shadow-pink-50/50 transition-all duration-300 group hover:-translate-y-0.5"
            >
              <div className={`w-10 h-10 sm:w-12 sm:h-12 mx-auto mb-2 sm:mb-3 rounded-xl sm:rounded-2xl bg-gradient-to-br ${feature.color} flex items-center justify-center text-white shadow-md group-hover:scale-105 transition-transform`}>
                {feature.icon}
              </div>
              <h3 className="font-bold text-gray-800 text-xs sm:text-sm mb-0.5 sm:mb-1">{feature.title}</h3>
              <p className="text-gray-400 text-[10px] sm:text-xs">{feature.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
