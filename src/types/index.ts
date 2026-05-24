export interface Product {
  id: string;
  name: string;
  nameAr?: string;
  price: number;
  salePrice?: number;
  images: string[];
  description: string;
  descriptionAr?: string;
  category: string;
  sizes: string[];
  colors?: string[];
  inStock: boolean;
  rating: number;
  reviews: Review[];
  isNew?: boolean;
  isBestSeller?: boolean;
  tags?: string[];
}

export interface Review {
  id: string;
  userName: string;
  rating: number;
  comment: string;
  date: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
  size: string;
  color?: string;
}

export interface User {
  id: string;
  email: string;
  name: string;
  phone?: string;
  addresses?: Address[];
}

export interface Address {
  id: string;
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  isDefault: boolean;
}

export interface Category {
  id: string;
  name: string;
  nameAr?: string;
  slug: string;
  image: string;
}

export type Language = 'en' | 'ar';
