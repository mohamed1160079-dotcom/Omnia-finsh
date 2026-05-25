import { shippingData } from "../data/shippingData";
import toast from "react-hot-toast";
import React, { useState } from "react";
import { ChevronLeft, Package, MapPin } from "lucide-react";
import { useStore } from "../store/useStore";
import { Button } from "../components/Button";

interface CheckoutPageProps {
  onBack: () => void;
}

export const CheckoutPage: React.FC<CheckoutPageProps> = ({ onBack }) => {
  const { cart, clearCart, language } = useStore();

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    address: "",
    governorate: "",
    city: "",
    notes: "",
  });

  const [shippingFee, setShippingFee] = useState(0);
  const [loading, setLoading] = useState(false);

  const subtotal = cart.reduce((sum, item) => {
    const price = item.product.salePrice || item.product.price;
    return sum + price * item.quantity;
  }, 0);

  const total = subtotal + shippingFee;

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setLoading(true);

      const BOT_TOKEN =
        "8608097304:AAG7D3wtpOsyeNAdjagSd2a8FDaUcAHomvU";

      const CHAT_ID = "1355750983";

      const productsText = cart
        .map(
          (item) => `
🛍️ المنتج: ${item.product.name}
📏 المقاس: ${item.size}
🎨 اللون: ${item.color || "غير محدد"}
🔢 الكمية: ${item.quantity}
💰 السعر: ${
            (item.product.salePrice || item.product.price) *
            item.quantity
          } ج.م
`
        )
        .join("\n====================\n");

      const message = `
🔥 طلب جديد 🔥

👤 الاسم:
${formData.name}

📞 الهاتف:
${formData.phone}

📍 العنوان:
${formData.address}

🏙️ المحافظة:
${shippingData[formData.governorate]?.name}

🚚 المدينة:
${formData.city}

💵 المجموع الفرعي:
${subtotal.toFixed(2)} ج.م

🚛 الشحن:
${shippingFee.toFixed(2)} ج.م

💰 الإجمالي:
${total.toFixed(2)} ج.م

📝 ملاحظات:
${formData.notes || "لا يوجد"}

====================

${productsText}
`;

      const response = await fetch(
        `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            chat_id: CHAT_ID,
            text: message,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Telegram Error");
      }

      toast.success(
        language === "en"
          ? "Your order is confirmed ✨"
          : "تم تأكيد طلبك ✨",
        {
          duration: 3000,
        }
      );

      clearCart();
      onBack();

    } catch (error) {
      console.error(error);

      toast.error(
        language === "en"
          ? "Something went wrong!"
          : "حصل خطأ أثناء إرسال الطلب"
      );
    } finally {
      setLoading(false);
    }
  };

  if (cart.length === 0) {
    return (
      <div className="min-h-screen py-20 px-4">
        <div className="container mx-auto max-w-4xl text-center">

          <h1 className="text-3xl font-light mb-4">
            {language === "en"
              ? "Your cart is empty"
              : "عربة التسوق فارغة"}
          </h1>

          <Button onClick={onBack}>
            {language === "en"
              ? "Continue Shopping"
              : "متابعة التسوق"}
          </Button>

        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-8 px-4 bg-gradient-to-b from-pink-50 to-white">

      <div className="container mx-auto max-w-6xl">

        {/* BACK */}
        <button
          onClick={onBack}
          className="flex items-center gap-2 mb-8 text-gray-600 hover:text-pink-500"
        >
          <ChevronLeft size={20} />
          {language === "en" ? "Back" : "رجوع"}
        </button>

        <h1 className="text-4xl mb-8 text-gray-800">
          {language === "en" ? "Checkout" : "إتمام الطلب"}
        </h1>

        <form
          onSubmit={handleSubmit}
          className="grid lg:grid-cols-3 gap-8"
        >

          {/* LEFT */}
          <div className="lg:col-span-2 space-y-8">

            {/* CONTACT */}
            <div className="bg-white p-6 rounded-2xl shadow-md">

              <h2 className="text-xl mb-4">
                {language === "en"
                  ? "Contact Info"
                  : "بيانات العميل"}
              </h2>

              <input
                name="name"
                placeholder={
                  language === "en"
                    ? "Full Name"
                    : "الاسم بالكامل"
                }
                value={formData.name}
                onChange={handleInputChange}
                className="w-full p-3 border rounded mb-3"
                required
              />

              <input
                name="phone"
                placeholder={
                  language === "en"
                    ? "Phone Number"
                    : "رقم الهاتف"
                }
                value={formData.phone}
                onChange={handleInputChange}
                className="w-full p-3 border rounded"
                required
              />

            </div>

            {/* ADDRESS */}
            <div className="bg-white p-6 rounded-2xl shadow-md">

              <div className="flex items-center gap-2 mb-4">
                <MapPin />
                <h2>
                  {language === "en"
                    ? "Address"
                    : "العنوان"}
                </h2>
              </div>

              <input
                name="address"
                placeholder={
                  language === "en"
                    ? "Street Address"
                    : "عنوان الشارع"
                }
                value={formData.address}
                onChange={handleInputChange}
                className="w-full p-3 border rounded mb-3"
                required
              />

              {/* GOVERNORATE */}
              <select
                name="governorate"
                value={formData.governorate}
                onChange={(e) => {
                  const gov = e.target.value;

                  setFormData({
                    ...formData,
                    governorate: gov,
                    city: "",
                  });

                  setShippingFee(0);
                }}
                className="w-full p-3 border rounded mb-3"
                required
              >

                <option value="">
                  {language === "en"
                    ? "Select Governorate"
                    : "اختر المحافظة"}
                </option>

                {Object.keys(shippingData).map((key) => (
                  <option key={key} value={key}>
                    {shippingData[key].name}
                  </option>
                ))}

              </select>

              {/* CITY */}
              <select
                name="city"
                value={formData.city}
                disabled={!formData.governorate}
                onChange={(e) => {

                  const city = e.target.value;

                  const fee =
                    shippingData[
                      formData.governorate
                    ]?.cities?.[city] || 0;

                  setFormData({
                    ...formData,
                    city,
                  });

                  setShippingFee(fee);
                }}
                className="w-full p-3 border rounded"
                required
              >

                <option value="">
                  {language === "en"
                    ? "Select City"
                    : "اختر المدينة"}
                </option>

                {formData.governorate &&
                  Object.keys(
                    shippingData[
                      formData.governorate
                    ].cities
                  ).map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}

              </select>

            </div>
          </div>

          {/* RIGHT */}
          <div className="bg-white p-6 rounded-2xl shadow-md h-fit">

            <h2 className="text-xl mb-4">
              {language === "en"
                ? "Summary"
                : "الملخص"}
            </h2>

            <div className="flex justify-between mb-2">
              <span>
                {language === "en"
                  ? "Subtotal"
                  : "المجموع"}
              </span>

              <span>
                {subtotal.toFixed(2)} ج.م
              </span>
            </div>

            <div className="flex justify-between mb-2">
              <span>
                {language === "en"
                  ? "Shipping"
                  : "الشحن"}
              </span>

              <span>
                {shippingFee.toFixed(2)} ج.م
              </span>
            </div>

            <div className="flex justify-between font-bold border-t pt-2">
              <span>
                {language === "en"
                  ? "Total"
                  : "الإجمالي"}
              </span>

              <span>
                {total.toFixed(2)} ج.م
              </span>
            </div>

            <Button
              type="submit"
              className="w-full mt-5"
              disabled={!formData.city || loading}
            >

              <Package size={18} className="inline mr-2" />

              {loading
                ? language === "en"
                  ? "Sending..."
                  : "جاري الإرسال..."
                : language === "en"
                ? "Confirm Order"
                : "تأكيد الطلب"}

            </Button>

          </div>

        </form>
      </div>
    </div>
  );
};