import React from 'react';
import { Heart } from 'lucide-react';
import { Product } from '../types';
import { ProductCard } from '../components/ProductCard';
import { Button } from '../components/Button';
import { useStore } from '../store/useStore';

interface WishlistPageProps {
  onViewProduct: (product: Product) => void;
  onNavigate: (page: string) => void;
}

export const WishlistPage: React.FC<WishlistPageProps> = ({ onViewProduct, onNavigate }) => {
  const { wishlist, language } = useStore();

  return (
    <div className="min-h-screen py-20 px-4">
      <div className="container mx-auto">
        <h1 
          className="text-4xl md:text-5xl font-light mb-8"
          style={{ fontFamily: "'Cormorant Garamond', serif" }}
        >
          {language === 'en' ? 'My Wishlist' : 'قائمة أمنياتي'}
        </h1>

        {wishlist.length === 0 ? (
          <div className="text-center py-20">
            <Heart size={64} className="mx-auto text-gray-300 mb-4" />
            <h2 className="text-2xl font-light mb-4">
              {language === 'en' ? 'Your wishlist is empty' : 'قائمة أمنياتك فارغة'}
            </h2>
            <p className="text-gray-600 mb-6">
              {language === 'en' 
                ? 'Save your favorite items to your wishlist' 
                : 'احفظ المنتجات المفضلة في قائمة أمنياتك'}
            </p>
            <Button onClick={() => onNavigate('shop')}>
              {language === 'en' ? 'Start Shopping' : 'ابدأ التسوق'}
            </Button>
          </div>
        ) : (
          <>
            <p className="text-gray-600 mb-8">
              {wishlist.length} {language === 'en' ? 'items' : 'منتج'}
            </p>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8">
              {wishlist.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onViewDetails={onViewProduct}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};
