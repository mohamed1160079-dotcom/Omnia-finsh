# 🚀 Quick Start Guide - LUXÉ E-Commerce

Get your luxury e-commerce website running in 5 minutes!

## ⚡ Quick Start (3 Commands)

```bash
# 1. Install dependencies
npm install

# 2. Start development server
npm run dev

# 3. Open browser to http://localhost:5173
```

That's it! Your website is running! 🎉

## 🎯 First Steps After Starting

### 1. Explore the Website
- **Homepage** - Scroll through the luxury design
- **Shop** - Click "Shop Collection" or navigation
- **Product Details** - Click any product to see details
- **Add to Cart** - Try adding products to cart
- **Wishlist** - Click the heart icon on products
- **Search** - Click search icon in header
- **Language** - Toggle EN/AR with globe icon
- **Admin** - Find "Admin" link in footer

### 2. Test Shopping Flow
```
Browse Products → Select Product → Choose Size/Color → Add to Cart → View Cart → Checkout
```

### 3. Access Admin Dashboard
- Scroll to footer
- Click "Admin" link
- Add/Edit/Delete products
- See how easy product management is!

## 📱 Test on Mobile

1. Open Chrome DevTools (F12)
2. Click device toolbar (Ctrl+Shift+M)
3. Select iPhone or Android device
4. See perfect mobile responsiveness!

## 🎨 Customize Your Brand

### Update Brand Name
Replace "LUXÉ" with your brand:
1. `index.html` - Page title
2. `src/components/Header.tsx` - Logo
3. `src/components/Footer.tsx` - Footer branding

### Update Contact Info
Edit `src/components/Footer.tsx`:
- Email address
- Phone number
- Physical address

Edit `src/pages/HomePage.tsx`:
- WhatsApp number (line ~224)

### Update Social Links
Edit `src/components/Footer.tsx`:
- Instagram URL
- Facebook URL
- Twitter/X URL

### Add Your Products
Edit `src/data/products.ts`:
- Replace sample products
- Add your product images
- Update prices, descriptions
- Set categories

Or use the **Admin Dashboard**:
1. Go to Admin page
2. Click "Add Product"
3. Fill in the form
4. Save!

## 🛍️ Key Pages & URLs

When running locally:

- **Home**: http://localhost:5173/
- **Shop**: Click navigation or add `?page=shop`
- **Product**: Click any product card
- **Cart**: Click shopping bag icon
- **Wishlist**: Click heart icon in header
- **Account**: Click user icon in header
- **Admin**: Footer link
- **Search**: Click search icon in header

## 🎨 Color Scheme

The luxury palette is:
- **Black**: Primary buttons, text
- **White**: Backgrounds, contrast
- **Beige/Neutral**: Accents, soft touches
- **Red**: Sale badges, discounts
- **Green**: Success, stock status

## 📦 What's Included

- ✅ 8 sample luxury products
- ✅ 5 product categories
- ✅ Shopping cart with persistence
- ✅ Wishlist system
- ✅ User account/login
- ✅ Admin dashboard
- ✅ Search functionality
- ✅ Multi-language (EN/AR)
- ✅ Mobile responsive
- ✅ Premium design

## 🎯 Core Features to Try

1. **Add to Cart**
   - Click "Quick Add" on product card
   - Or go to product details and customize

2. **Wishlist**
   - Click heart icon on any product
   - View all favorites in Wishlist page

3. **Search**
   - Click search icon
   - Type product name
   - See instant results

4. **Language Toggle**
   - Click globe icon
   - Switch between English/Arabic
   - See all text translate

5. **Admin Panel**
   - Go to Admin (footer link)
   - Add a new product
   - Edit existing product
   - Delete a product

## 🔧 Common Tasks

### Add a Product (Via Admin)
1. Go to Admin page
2. Click "Add Product"
3. Fill in:
   - Product Name
   - Price
   - Description
   - Category
   - Image URLs (comma-separated)
4. Click "Save"

### Change Homepage Hero Image
Edit `src/pages/HomePage.tsx`, line ~51:
```tsx
src="YOUR_IMAGE_URL_HERE"
```

### Add New Category
1. Edit `src/data/products.ts`
2. Add to `categories` array
3. Create products with that category

### Change Shipping Threshold
Edit `src/pages/CheckoutPage.tsx`, line ~30:
```tsx
const shipping = subtotal > 150 ? 0 : 15; // Change 150
```

## 📱 Mobile Testing Checklist

- [ ] Homepage scrolls smoothly
- [ ] Products display in grid
- [ ] Product details page works
- [ ] Cart opens from side
- [ ] Menu opens (hamburger)
- [ ] Forms are easy to fill
- [ ] Buttons are tap-friendly
- [ ] Images load properly

## 🚀 Build for Production

```bash
# Create production build
npm run build

# Preview production build
npm run preview
```

Build output: `dist/index.html` (single file, 334 KB)

## 📊 Project Stats

- **Pages**: 8 main pages
- **Components**: 6 reusable components
- **Products**: 8 sample products
- **Categories**: 5 categories
- **Languages**: 2 (EN/AR)
- **Build Size**: ~334 KB (95 KB gzipped)
- **Load Time**: < 1 second

## 🎓 Learn the Code

### State Management
- `src/store/useStore.ts` - Zustand store (cart, wishlist, user)

### Product Data
- `src/data/products.ts` - Sample products and categories

### Main Components
- `src/App.tsx` - Main app router
- `src/components/Header.tsx` - Top navigation
- `src/components/Footer.tsx` - Bottom footer
- `src/components/ProductCard.tsx` - Product display
- `src/components/CartSidebar.tsx` - Shopping cart

### Pages
- `src/pages/HomePage.tsx` - Landing page
- `src/pages/ShopPage.tsx` - Product catalog
- `src/pages/ProductDetailsPage.tsx` - Product details
- `src/pages/CheckoutPage.tsx` - Checkout flow
- `src/pages/AdminPage.tsx` - Product management

## 💡 Pro Tips

1. **Use Admin Dashboard** - Easiest way to manage products
2. **Test Mobile First** - Most users shop on mobile
3. **Check Cart Persistence** - Items save on page refresh
4. **Try Language Toggle** - See bilingual support
5. **Explore All Pages** - Each has unique features

## ❓ Quick FAQ

**Q: How do I add products?**
A: Use the Admin Dashboard (footer link) or edit `src/data/products.ts`

**Q: How do I change colors?**
A: Edit Tailwind classes in components or update theme

**Q: Is it mobile-friendly?**
A: Yes! Mobile-first responsive design

**Q: Can I add more languages?**
A: Yes! Extend the language system in `src/store/useStore.ts`

**Q: How do I deploy?**
A: See `DEPLOYMENT.md` for detailed instructions

## 🎯 Next Actions

1. ✅ Run the project (`npm run dev`)
2. ✅ Explore all features
3. ✅ Test on mobile
4. ✅ Customize branding
5. ✅ Add your products
6. ✅ Deploy to production

## 📞 Need Help?

Check these files:
- `README.md` - Full documentation
- `FEATURES.md` - Complete feature list
- `DEPLOYMENT.md` - Deployment guide
- `SUMMARY.md` - Project overview

## 🎉 You're Ready!

Your luxury e-commerce website is fully functional and ready to use. Start customizing and launch your fashion brand!

**Happy Selling! 🛍️✨**
