import React, { useState } from 'react';
import { Plus, Edit2, Trash2, Save, X } from 'lucide-react';
import { Button } from '../components/Button';
import { useStore } from '../store/useStore';
import { Product } from '../types';

interface AdminPageProps {
  products: Product[];
  onAddProduct: (product: Product) => void;
  onEditProduct: (id: string, product: Product) => void;
  onDeleteProduct: (id: string) => void;
}

export const AdminPage: React.FC<AdminPageProps> = ({
  products,
  onAddProduct,
  onEditProduct,
  onDeleteProduct,
}) => {
  const { language } = useStore();
  const [isAddingProduct, setIsAddingProduct] = useState(false);
  const [editingProductId, setEditingProductId] = useState<string | null>(null);
  const [formData, setFormData] = useState<Partial<Product>>({
    name: '',
    price: 0,
    description: '',
    category: 'dresses',
    sizes: ['S', 'M', 'L'],
    images: [],
    inStock: true,
    rating: 5,
    reviews: [],
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (editingProductId) {
      onEditProduct(editingProductId, formData as Product);
      setEditingProductId(null);
    } else {
      const newProduct: Product = {
        ...formData as Product,
        id: Date.now().toString(),
      };
      onAddProduct(newProduct);
    }
    
    setFormData({
      name: '',
      price: 0,
      description: '',
      category: 'dresses',
      sizes: ['S', 'M', 'L'],
      images: [],
      inStock: true,
      rating: 5,
      reviews: [],
    });
    setIsAddingProduct(false);
  };

  const handleEdit = (product: Product) => {
    setFormData(product);
    setEditingProductId(product.id);
    setIsAddingProduct(true);
  };

  const handleCancel = () => {
    setIsAddingProduct(false);
    setEditingProductId(null);
    setFormData({
      name: '',
      price: 0,
      description: '',
      category: 'dresses',
      sizes: ['S', 'M', 'L'],
      images: [],
      inStock: true,
      rating: 5,
      reviews: [],
    });
  };

  return (
    <div className="min-h-screen py-20 px-4 bg-neutral-50">
      <div className="container mx-auto max-w-6xl">
        <div className="flex justify-between items-center mb-8">
          <h1 
            className="text-4xl font-light"
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
          >
            {language === 'en' ? 'Admin Dashboard' : 'لوحة التحكم'}
          </h1>
          <Button onClick={() => setIsAddingProduct(true)}>
            <Plus size={20} className="mr-2" />
            {language === 'en' ? 'Add Product' : 'إضافة منتج'}
          </Button>
        </div>

        {/* Add/Edit Product Form */}
        {isAddingProduct && (
          <div className="bg-white p-6 rounded-lg shadow-sm mb-8">
            <h2 className="text-2xl font-semibold mb-6">
              {editingProductId 
                ? (language === 'en' ? 'Edit Product' : 'تعديل المنتج')
                : (language === 'en' ? 'Add New Product' : 'إضافة منتج جديد')}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder={language === 'en' ? 'Product Name' : 'اسم المنتج'}
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400"
                  required
                />
                <input
                  type="number"
                  placeholder={language === 'en' ? 'Price' : 'السعر'}
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400"
                  required
                />
              </div>
              <textarea
                placeholder={language === 'en' ? 'Description' : 'الوصف'}
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400"
                rows={3}
                required
              />
              <div className="grid md:grid-cols-2 gap-4">
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400"
                >
                  <option value="dresses">Dresses</option>
                  <option value="hijabs">Hijabs</option>
                  <option value="sets">Sets</option>
                  <option value="casual">Casual Wear</option>
                  <option value="accessories">Accessories</option>
                </select>
                <input
                  type="text"
                  placeholder={language === 'en' ? 'Image URLs (comma separated)' : 'روابط الصور (مفصولة بفاصلة)'}
                  value={formData.images?.join(', ')}
                  onChange={(e) => setFormData({ ...formData, images: e.target.value.split(',').map(url => url.trim()) })}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400"
                />
              </div>
              <div className="flex gap-4">
                <Button type="submit">
                  <Save size={18} className="mr-2" />
                  {language === 'en' ? 'Save' : 'حفظ'}
                </Button>
                <Button type="button" variant="outline" onClick={handleCancel}>
                  <X size={18} className="mr-2" />
                  {language === 'en' ? 'Cancel' : 'إلغاء'}
                </Button>
              </div>
            </form>
          </div>
        )}

        {/* Products Table */}
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-neutral-100">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold">
                    {language === 'en' ? 'Product' : 'المنتج'}
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">
                    {language === 'en' ? 'Category' : 'الفئة'}
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">
                    {language === 'en' ? 'Price' : 'السعر'}
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">
                    {language === 'en' ? 'Status' : 'الحالة'}
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">
                    {language === 'en' ? 'Actions' : 'الإجراءات'}
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {products.map((product) => (
                  <tr key={product.id} className="hover:bg-neutral-50">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={product.images[0]}
                          alt={product.name}
                          className="w-12 h-12 object-cover rounded"
                        />
                        <div>
                          <p className="font-medium">{product.name}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 capitalize">{product.category}</td>
                    <td className="px-6 py-4">{product.price} ج.م</td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 text-xs rounded ${product.inStock ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                        {product.inStock ? (language === 'en' ? 'In Stock' : 'متوفر') : (language === 'en' ? 'Out of Stock' : 'غير متوفر')}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleEdit(product)}
                          className="p-2 hover:bg-gray-100 rounded transition-colors"
                          title={language === 'en' ? 'Edit' : 'تعديل'}
                        >
                          <Edit2 size={18} />
                        </button>
                        <button
                          onClick={() => {
                            if (confirm(language === 'en' ? 'Are you sure you want to delete this product?' : 'هل أنت متأكد من حذف هذا المنتج؟')) {
                              onDeleteProduct(product.id);
                            }
                          }}
                          className="p-2 hover:bg-red-50 text-red-600 rounded transition-colors"
                          title={language === 'en' ? 'Delete' : 'حذف'}
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};
