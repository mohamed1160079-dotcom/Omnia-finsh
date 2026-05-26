import React from 'react';
import { ArrowRight, Star } from 'lucide-react';
import { Product } from '../types';
import { ProductCard } from '../components/ProductCard';
import { Button } from '../components/Button';
import { useStore } from '../store/useStore';
import { categories } from '../data/products';

interface HomePageProps {
  products: Product[];
  onViewProduct: (product: Product) => void;
  onNavigate: (page: string) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ products, onViewProduct, onNavigate }) => {
  const { language } = useStore();

  const newArrivals = products.filter(p => p.isNew).slice(0, 4);
  const bestSellers = products.filter(p => p.isBestSeller).slice(0, 4);

  const testimonials = [
    {
      name: 'Sarah Johnson',
      nameAr: 'سارة جونسون',
      rating: 5,
      text: 'Absolutely love the quality and elegance of every piece. The fabrics are luxurious and the fit is perfect!',
      textAr: 'أحب حقاً جودة وأناقة كل قطعة. الأقمشة فاخرة والمقاس مثالي!',
    },
    {
      name: 'Layla Ahmed',
      nameAr: 'ليلى أحمد',
      rating: 5,
      text: 'Finally found a brand that understands modest luxury fashion. The designs are timeless and sophisticated.',
      textAr: 'أخيراً وجدت علامة تجارية تفهم الموضة الفاخرة المحتشمة. التصاميم خالدة وراقية.',
    },
    {
      name: 'Emma Williams',
      nameAr: 'إيما ويليامز',
      rating: 5,
      text: 'Outstanding customer service and fast delivery. The pieces are even more beautiful in person!',
      textAr: 'خدمة عملاء ممتازة وتوصيل سريع. القطع أجمل بكثير شخصياً!',
    },
  ];



  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[90vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1483985988355-763728e1935b?w=2000&h=1200&fit=crop"
            alt="Hero"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/20" />
        </div>
        <div className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto">
          <h1 
            className="text-3xl sm:text-5xl md:text-7xl lg:text-8xl font-light mb-4 md:mb-6 tracking-wide leading-tight px-2"
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
          >
            {language === 'en' ? 'Timeless Elegance' : 'أناقة خالدة'}
          </h1>
          <p className="text-sm sm:text-base md:text-xl mb-6 md:mb-8 font-light tracking-wide max-w-xl md:max-w-2xl mx-auto px-3 leading-relaxed">
            {language === 'en'
              ? 'Discover luxury fashion crafted for the modern, sophisticated woman'
              : 'اكتشف الأزياء الفاخرة المصممة للمرأة العصرية المتطورة'}
          </p>
          <Button 
            onClick={() => onNavigate('shop')} 
            variant="primary" 
            size="lg"
            className="group"
          >
            {language === 'en' ? 'Shop Collection' : 'تسوق المجموعة'}
            <ArrowRight className="inline ml-2 group-hover:translate-x-1 transition-transform" size={20} />
          </Button>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 
              className="text-4xl md:text-5xl font-light mb-4"
              style={{ fontFamily: "'Cormorant Garamond', serif" }}
            >
              {language === 'en' ? 'Shop by Category' : 'تسوق حسب الفئة'}
            </h2>
            <p className="text-gray-600">
              {language === 'en' 
                ? 'Explore our curated collections' 
                : 'استكشف مجموعاتنا المنسقة'}
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => onNavigate(`category-${category.slug}`)}
                className="group relative aspect-[3/4] overflow-hidden"
              >
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <h3 className="text-white text-xl md:text-2xl font-light tracking-wide">
                    {language === 'en' ? category.name : (category.nameAr || category.name)}
                  </h3>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* New Arrivals */}
      {newArrivals.length > 0 && (
        <section className="py-20 px-4 bg-neutral-50">
          <div className="container mx-auto">
            <div className="flex justify-between items-end mb-12">
              <div>
                <h2 
                  className="text-4xl md:text-5xl font-light mb-2"
                  style={{ fontFamily: "'Cormorant Garamond', serif" }}
                >
                  {language === 'en' ? 'New Arrivals' : 'وصل حديثاً'}
                </h2>
                <p className="text-gray-600">
                  {language === 'en' ? 'Just landed' : 'وصلت للتو'}
                </p>
              </div>
              <Button onClick={() => onNavigate('new-arrivals')} variant="ghost">
                {language === 'en' ? 'View All' : 'عرض الكل'}
                <ArrowRight className="inline ml-2" size={18} />
              </Button>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8">
              {newArrivals.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onViewDetails={onViewProduct}
                />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Best Sellers */}
      {bestSellers.length > 0 && (
        <section className="py-20 px-4">
          <div className="container mx-auto">
            <div className="flex justify-between items-end mb-12">
              <div>
                <h2 
                  className="text-4xl md:text-5xl font-light mb-2"
                  style={{ fontFamily: "'Cormorant Garamond', serif" }}
                >
                  {language === 'en' ? 'Best Sellers' : 'الأكثر مبيعاً'}
                </h2>
                <p className="text-gray-600">
                  {language === 'en' ? 'Customer favorites' : 'مفضلات العملاء'}
                </p>
              </div>
              <Button onClick={() => onNavigate('best-sellers')} variant="ghost">
                {language === 'en' ? 'View All' : 'عرض الكل'}
                <ArrowRight className="inline ml-2" size={18} />
              </Button>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8">
              {bestSellers.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onViewDetails={onViewProduct}
                />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Testimonials */}
      <section className="py-20 px-4 bg-gradient-to-br from-pink-50 to-white">
        <div className="container mx-auto max-w-6xl">
          <h2 
            className="text-4xl md:text-5xl font-light text-center mb-16 text-gray-800"
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
          >
            {language === 'en' ? 'What Our Clients Say' : 'ماذا يقول عملاؤنا'}
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-white p-8 rounded-2xl shadow-lg border border-pink-100 hover:shadow-xl transition-shadow">
                <div className="flex mb-4 text-pink-500">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} size={18} fill="currentColor" />
                  ))}
                </div>
                <p className="mb-6 italic text-gray-700">
                  "{language === 'en' ? testimonial.text : testimonial.textAr}"
                </p>
                <p className="font-semibold text-pink-600">
                  {language === 'en' ? testimonial.name : testimonial.nameAr}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Instagram Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 
              className="text-4xl md:text-5xl font-light mb-4"
              style={{ fontFamily: "'Cormorant Garamond', serif" }}
            >
              @luxefashion
            </h2>
            <p className="text-gray-600">
              {language === 'en' ? 'Follow us for daily style inspiration' : 'تابعنا للحصول على إلهام يومي'}
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=600&h=600&fit=crop',
              'https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=600&h=600&fit=crop',
              'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=600&h=600&fit=crop',
              'https://images.unsplash.com/photo-1509631179647-0177331693ae?w=600&h=600&fit=crop',
            ].map((img, index) => (
              <div key={index} className="aspect-square overflow-hidden group cursor-pointer">
                <img
                  src={img}
                  alt={`Instagram ${index + 1}`}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WhatsApp Float Button */}
      <a
        href="https://wa.me/1234567890"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 w-14 h-14 bg-gradient-to-r from-pink-400 to-pink-500 text-white rounded-full flex items-center justify-center shadow-xl hover:from-pink-500 hover:to-pink-600 transition-all duration-300 hover:scale-110 z-40 animate-pulse"
        aria-label="WhatsApp Support"
      >
        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
        </svg>
      </a>
    </div>
  );
};
