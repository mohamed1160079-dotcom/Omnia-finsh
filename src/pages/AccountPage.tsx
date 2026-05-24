import React, { useState } from 'react';
import { User, Mail, Lock } from 'lucide-react';
import { Button } from '../components/Button';
import { useStore } from '../store/useStore';

export const AccountPage: React.FC = () => {
  const { user, setUser, language } = useStore();
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isLogin) {
      // Mock login
      setUser({
        id: '1',
        email: formData.email,
        name: formData.name || 'Guest User',
      });
      alert(language === 'en' ? 'Logged in successfully!' : 'تم تسجيل الدخول بنجاح!');
    } else {
      // Mock registration
      setUser({
        id: '1',
        email: formData.email,
        name: formData.name,
      });
      alert(language === 'en' ? 'Account created successfully!' : 'تم إنشاء الحساب بنجاح!');
    }
  };

  const handleLogout = () => {
    setUser(null);
    setFormData({ name: '', email: '', password: '' });
  };

  if (user) {
    return (
      <div className="min-h-screen py-20 px-4">
        <div className="container mx-auto max-w-2xl">
          <h1 
            className="text-4xl md:text-5xl font-light mb-8"
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
          >
            {language === 'en' ? 'My Account' : 'حسابي'}
          </h1>
          <div className="bg-white p-8 rounded-lg shadow-sm">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-20 h-20 bg-gradient-to-br from-pink-400 to-pink-500 text-white rounded-full flex items-center justify-center text-2xl font-semibold shadow-lg">
                {user.name.charAt(0).toUpperCase()}
              </div>
              <div>
                <h2 className="text-2xl font-semibold">{user.name}</h2>
                <p className="text-gray-600">{user.email}</p>
              </div>
            </div>
            <div className="space-y-4 pt-6 border-t">
              <div>
                <h3 className="font-semibold mb-2">{language === 'en' ? 'Order History' : 'سجل الطلبات'}</h3>
                <p className="text-gray-600">{language === 'en' ? 'No orders yet' : 'لا توجد طلبات بعد'}</p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">{language === 'en' ? 'Saved Addresses' : 'العناوين المحفوظة'}</h3>
                <p className="text-gray-600">{language === 'en' ? 'No saved addresses' : 'لا توجد عناوين محفوظة'}</p>
              </div>
            </div>
            <Button onClick={handleLogout} variant="outline" className="mt-6">
              {language === 'en' ? 'Logout' : 'تسجيل الخروج'}
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-20 px-4">
      <div className="container mx-auto max-w-md">
        <h1 
          className="text-4xl md:text-5xl font-light text-center mb-8"
          style={{ fontFamily: "'Cormorant Garamond', serif" }}
        >
          {isLogin ? (language === 'en' ? 'Welcome Back' : 'مرحباً بعودتك') : (language === 'en' ? 'Create Account' : 'إنشاء حساب')}
        </h1>
        <div className="bg-white p-8 rounded-lg shadow-sm">
          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLogin && (
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                <input
                type="text"
                placeholder={language === 'en' ? 'Full Name' : 'الاسم الكامل'}
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400"
                  required={!isLogin}
                />
              </div>
            )}
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="email"
                placeholder={language === 'en' ? 'Email Address' : 'البريد الإلكتروني'}
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400"
                required
              />
            </div>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="password"
                placeholder={language === 'en' ? 'Password' : 'كلمة المرور'}
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400"
                required
              />
            </div>
            <Button type="submit" size="lg" className="w-full">
              {isLogin ? (language === 'en' ? 'Sign In' : 'تسجيل الدخول') : (language === 'en' ? 'Create Account' : 'إنشاء حساب')}
            </Button>
          </form>
          <div className="mt-6 text-center">
            <button
              onClick={() => setIsLogin(!isLogin)}
              className="text-sm text-gray-600 hover:text-black transition-colors"
            >
              {isLogin 
                ? (language === 'en' ? "Don't have an account? Sign up" : 'ليس لديك حساب؟ سجل الآن')
                : (language === 'en' ? 'Already have an account? Sign in' : 'لديك حساب؟ سجل دخولك')}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
