import toast from 'react-hot-toast';
import React, { useState } from 'react';
import { ChevronLeft, Package, MapPin } from 'lucide-react';
import { useStore } from '../store/useStore';
import { Button } from '../components/Button';

interface CheckoutPageProps {
  onBack: () => void;
}

export const CheckoutPage: React.FC<CheckoutPageProps> = ({ onBack }) => {
  const { cart, clearCart, language } = useStore();
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    notes: '',
  });

  const subtotal = cart.reduce((sum, item) => {
    const price = item.product.salePrice || item.product.price;
    return sum + price * item.quantity;
  }, 0);

  const shipping = subtotal > 500 ? 0 : 50;
  const total = subtotal + shipping;
const handleSubmit = async (e: React.FormEvent) => {

  e.preventDefault();

  const orderData = {
    name: formData.name,
    phone: formData.phone,
    address:
      formData.address +
      " - " +
      formData.city +
      " - " +
      formData.state,

    product: cart.map(item => 
  `
اسم المنتج: ${item.product.name}
المقاس: ${item.size}
اللون: ${item.color || "غير محدد"}
الكمية: ${item.quantity}
`
).join(" | ")
  };

  await fetch(
    "https://script.google.com/macros/s/AKfycbxceWJDJ8IM4eS1VPdhYGwuZ_pAHcZxsMj5e9LVglEwyws3ExfuoxO-uuCYqIi_xfz7/exec",
    {
      method: "POST",
      body: JSON.stringify(orderData),
    }
  );

 toast.success(
  language === 'en'
    ? 'Your order is confirmed ✨ We’ll contact you shortly.'
    : 'تم تأكيد طلبك ✨  سيتم التواصل معك قريبًا ',
  {
    duration: 3000,
  }
);

  clearCart();
  onBack();
};

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  if (cart.length === 0) {
    return (
      <div className="min-h-screen py-20 px-4">
        <div className="container mx-auto max-w-4xl text-center">
          <h1 className="text-3xl font-light mb-4">
            {language === 'en' ? 'Your cart is empty' : 'عربة التسوق فارغة'}
          </h1>
          <Button onClick={onBack}>
            {language === 'en' ? 'Continue Shopping' : 'متابعة التسوق'}
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-8 px-4 bg-gradient-to-b from-pink-50 to-white">
      <div className="container mx-auto max-w-6xl">
        {/* Back Button */}
        <button
          onClick={onBack}
          className="flex items-center gap-2 mb-8 text-gray-600 hover:text-pink-500 transition-colors"
        >
          <ChevronLeft size={20} />
          {language === 'en' ? 'Back' : 'رجوع'}
        </button>

        <h1 
          className="text-4xl md:text-5xl font-light mb-8 text-gray-800"
          style={{ fontFamily: "'Cormorant Garamond', serif" }}
        >
          {language === 'en' ? 'Checkout' : 'إتمام الطلب'}
        </h1>

        <form onSubmit={handleSubmit} className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Forms */}
          <div className="lg:col-span-2 space-y-8">
            {/* Contact Information */}
            <div className="bg-white p-6 rounded-2xl shadow-md border border-pink-100">
              <h2 className="text-xl font-semibold mb-6 text-gray-800">
                {language === 'en' ? 'Contact Information' : 'معلومات الاتصال'}
              </h2>
              <div className="space-y-4">
                <input
                  type="text"
                  name="name"
                  placeholder={language === 'en' ? 'Full Name' : 'الاسم بالكامل'}
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400"
                  required
                />
                <input
                  type="tel"
                  name="phone"
                  placeholder={language === 'en' ? 'Phone Number' : 'رقم الهاتف'}
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400"
                  required
                />
              </div>
            </div>

            {/* Shipping Address */}
            <div className="bg-white p-6 rounded-2xl shadow-md border border-pink-100">
              <div className="flex items-center gap-2 mb-6">
                <MapPin size={24} className="text-pink-500" />
                <h2 className="text-xl font-semibold text-gray-800">
                  {language === 'en' ? 'Delivery Address' : 'عنوان التوصيل'}
                </h2>
              </div>
              <div className="space-y-4">
                <input
                  type="text"
                  name="address"
                  placeholder={language === 'en' ? 'Street Address' : 'عنوان الشارع'}
                  value={formData.address}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400"
                  required
                />
                <div className="grid md:grid-cols-2 gap-4">
                  <input
                    type="text"
                    name="city"
                    placeholder={language === 'en' ? 'City' : 'المدينة'}
                    value={formData.city}
                    onChange={handleInputChange}
                    className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400"
                    required
                  />
                  <input
                    type="text"
                    name="state"
                    placeholder={language === 'en' ? 'State/Governorate' : 'المحافظة'}
                    value={formData.state}
                    onChange={handleInputChange}
                    className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400"
                    required
                  />
                </div>
                <textarea
                  name="notes"
                  placeholder={language === 'en' ? 'Additional Notes (Optional)' : 'ملاحظات إضافية (اختياري)'}
                  value={formData.notes}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400"
                  rows={3}
                />
              </div>
            </div>

            {/* Payment Method */}
            <div className="bg-gradient-to-br from-pink-50 to-white p-6 rounded-2xl shadow-md border-2 border-pink-200">
              <div className="flex items-center gap-3 mb-4">
                <Package size={28} className="text-pink-500" />
                <div>
                  <h2 className="text-xl font-semibold text-gray-800">
                    {language === 'en' ? 'Payment Method' : 'طريقة الدفع'}
                  </h2>
                  <p className="text-sm text-gray-600">
                    {language === 'en' ? 'Cash on Delivery' : 'الدفع عند الاستلام'}
                  </p>
                </div>
              </div>
              <div className="bg-white p-4 rounded-lg border border-pink-200">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-gradient-to-r from-pink-400 to-pink-500 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-800 mb-1">
                      {language === 'en' ? 'Pay When You Receive' : 'ادفع عند الاستلام'}
                    </h3>
                    <p className="text-sm text-gray-600">
                      {language === 'en' 
                        ? 'You will pay in cash when you receive your order from the delivery representative.' 
                        : 'ستدفع نقداً عند استلام طلبك من مندوب التوصيل.'}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white p-6 rounded-2xl shadow-md border border-pink-100 sticky top-24">
              <h2 className="text-xl font-semibold mb-6 text-gray-800">
                {language === 'en' ? 'Order Summary' : 'ملخص الطلب'}
              </h2>
              
              {/* Cart Items */}
              <div className="space-y-4 mb-6 max-h-64 overflow-y-auto">
                {cart.map((item, index) => (
                  <div key={`${item.product.id}-${item.size}-${index}`} className="flex gap-3">
                    <div className="w-16 h-20 bg-gray-100 flex-shrink-0 rounded-lg overflow-hidden">
                      <img
                        src={item.product.images[0]}
                        alt={item.product.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium line-clamp-2">{item.product.name}</p>
                      <p className="text-xs text-gray-500 mt-1">
                        {language === 'en' ? 'Size' : 'المقاس'}: {item.size} • {language === 'en' ? 'Qty' : 'الكمية'}: {item.quantity}
                      </p>
                      <p className="text-sm font-semibold mt-1 text-pink-600">
                        {((item.product.salePrice || item.product.price) * item.quantity).toFixed(2)} ج.م
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Pricing */}
              <div className="border-t border-gray-200 pt-4 space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">{language === 'en' ? 'Subtotal' : 'المجموع الفرعي'}:</span>
                  <span>{subtotal.toFixed(2)} ج.م</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">{language === 'en' ? 'Delivery' : 'التوصيل'}:</span>
                  <span className="text-pink-600 font-medium">
                    {shipping === 0 ? (language === 'en' ? 'FREE' : 'مجاني') : `${shipping.toFixed(2)} ج.م`}
                  </span>
                </div>
                {subtotal < 500 && (
                  <p className="text-xs text-gray-500 bg-pink-50 p-2 rounded">
                    {language === 'en' 
                      ? `Add ${(500 - subtotal).toFixed(2)} EGP more for free delivery!` 
                      : `أضف ${(500 - subtotal).toFixed(2)} ج.م للحصول على توصيل مجاني!`}
                  </p>
                )}
                <div className="flex justify-between text-lg font-semibold pt-3 border-t border-gray-200">
                  <span>{language === 'en' ? 'Total' : 'الإجمالي'}:</span>
                  <span className="text-pink-600">{total.toFixed(2)} ج.م</span>
                </div>
              </div>

              {/* Submit Button */}
<Button 
  type="submit"
  size="lg"
  className="w-full mt-6"
>                <Package size={20} className="inline mr-2" />
                {language === 'en' ? 'Confirm Order - COD' : 'تأكيد الطلب - الدفع عند الاستلام'}
              </Button>
              
              <p className="text-xs text-center text-gray-500 mt-4">
                {language === 'en' 
                  ? 'By placing this order, you agree to our terms and conditions.' 
                  : 'بتقديم هذا الطلب، فإنك توافق على الشروط والأحكام.'}
              </p>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
