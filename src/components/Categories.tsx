import { motion } from 'framer-motion';
import { useLang } from '../context/LanguageContext';
import { categories } from '../data/products';

interface CategoriesProps {
  onCategoryClick?: (categoryId: string) => void;
}

export default function Categories({ onCategoryClick }: CategoriesProps) {
  const { lang, t } = useLang();

  const catImages: Record<string, string> = {
    clothing: 'https://images.pexels.com/photos/10862004/pexels-photo-10862004.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=400&w=300',
    bags: 'https://images.pexels.com/photos/31929486/pexels-photo-31929486.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=400&w=300',
    perfume: 'https://images.pexels.com/photos/4736017/pexels-photo-4736017.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=400&w=300',
    makeup: 'https://images.pexels.com/photos/7256140/pexels-photo-7256140.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=400&w=300',
    accessories: 'https://images.pexels.com/photos/12753202/pexels-photo-12753202.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=400&w=300',
    skincare: 'https://images.pexels.com/photos/5632327/pexels-photo-5632327.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=400&w=300',
  };

  const handleClick = (categoryId: string) => {
    if (onCategoryClick) {
      onCategoryClick(categoryId);
    }
  };

  return (
    <section className="py-10 sm:py-16 bg-gradient-to-b from-white to-pink-50/30">
      <div className="container mx-auto px-3 sm:px-4">
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-8 sm:mb-10"
        >
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-2">
            {t('cat.title')}
          </h2>
          <p className="text-gray-400 text-xs sm:text-sm">{t('cat.subtitle')}</p>
          <div className="w-16 sm:w-20 h-1 bg-gradient-to-r from-pink-400 to-rose-400 rounded-full mx-auto mt-3" />
        </motion.div>

        {/* Categories Grid */}
        <div className="grid grid-cols-3 md:grid-cols-6 gap-2 sm:gap-4">
          {categories.map((cat, i) => (
            <motion.button
              key={cat.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              whileHover={{ y: -3 }}
              onClick={() => handleClick(cat.id)}
              className="group cursor-pointer text-start"
            >
              <div className="relative rounded-xl sm:rounded-2xl overflow-hidden aspect-[3/4] shadow-sm hover:shadow-lg hover:shadow-pink-100/50 transition-all duration-400 border border-white/80">
                <img
                  src={catImages[cat.id]}
                  alt={lang === 'ar' ? cat.nameAr : cat.nameEn}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-pink-600/70 via-pink-500/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-2 sm:p-3 text-center text-white">
                  <span className="text-lg sm:text-2xl mb-0.5 sm:mb-1 block">{cat.icon}</span>
                  <h3 className="font-bold text-[10px] sm:text-xs leading-tight">
                    {lang === 'ar' ? cat.nameAr : cat.nameEn}
                  </h3>
                  <span className="text-[8px] sm:text-[10px] text-white/80 hidden sm:block">{cat.count} {lang === 'ar' ? 'منتج' : 'items'}</span>
                </div>
              </div>
            </motion.button>
          ))}
        </div>
      </div>
    </section>
  );
}
