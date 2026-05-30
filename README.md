
# 🧵 Sri Murugan Textiles – Factory Direct Sales

> **Factory Direct Branded Clothing at Best Price**

A full-stack eCommerce web application for Sri Murugan Textiles, a men's clothing store with locations in Saralai and Bhavani, Tamil Nadu.

---

## 🌐 Live Demo

- **Frontend**: [Deployed on Vercel]
- **Backend API**: [Deployed on Render]

---

## 📍 Store Details

- **Phone**: 99650 22228 | 97887 22002
- **Locations**: Saralai (638118) & Bhavani (638301), NH 47

---

## ⚡ Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React + Vite + Tailwind CSS |
| Animations | Framer Motion |
| Backend | Node.js + Express |
| Database | MongoDB Atlas |
| Auth | JWT |
| Storage | Cloudinary |
| Payments | Razorpay |

---

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- MongoDB Atlas account
- Cloudinary account
- Razorpay account (test mode)

### 1. Clone & Install

```bash
git clone https://github.com/sanjithchandrasekar/-Sri-Murugan-Textiles.git
cd Sri-Murugan-Textiles

# Install backend
cd backend
npm install

# Install frontend
cd ../frontend
npm install
```

### 2. Configure Backend

```bash
cd backend
cp .env.example .env
# Edit .env with your credentials
```

```env
PORT=5000
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/smt_db
JWT_SECRET=your_very_secure_secret
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
RAZORPAY_KEY_ID=rzp_test_xxxxx
RAZORPAY_KEY_SECRET=your_razorpay_secret
```

### 3. Seed Database

```bash
cd backend
npm run seed
```

### 4. Start Development

```bash
# Terminal 1 - Backend
cd backend
npm run dev

# Terminal 2 - Frontend
cd frontend
npm run dev
```

Visit: http://localhost:5173

---

## 📁 Project Structure

```
smt/
├── frontend/                  # React + Vite app
│   ├── src/
│   │   ├── components/       # Reusable components
│   │   │   ├── layout/       # Navbar, Footer, BottomNav
│   │   │   └── ProductCard.jsx
│   │   ├── context/          # React contexts
│   │   │   ├── AuthContext.jsx
│   │   │   ├── CartContext.jsx
│   │   │   ├── WishlistContext.jsx
│   │   │   └── ThemeContext.jsx
│   │   ├── data/
│   │   │   └── constants.js  # Store data, demo products
│   │   ├── pages/            # All page components
│   │   │   ├── HomePage.jsx
│   │   │   ├── ProductsPage.jsx
│   │   │   ├── ProductDetailPage.jsx
│   │   │   ├── CartPage.jsx
│   │   │   ├── CheckoutPage.jsx
│   │   │   ├── LoginPage.jsx
│   │   │   ├── RegisterPage.jsx
│   │   │   ├── DashboardPage.jsx
│   │   │   ├── ContactPage.jsx
│   │   │   ├── OrderTrackingPage.jsx
│   │   │   ├── OrderSuccessPage.jsx
│   │   │   └── admin/
│   │   │       ├── AdminDashboard.jsx
│   │   │       ├── AdminProducts.jsx
│   │   │       └── AdminOrders.jsx
│   │   └── services/
│   │       └── api.js        # Axios API calls
│   └── vite.config.js
│
├── backend/                   # Node.js + Express API
│   ├── models/               # Mongoose schemas
│   │   ├── Product.js
│   │   ├── User.js
│   │   ├── Order.js
│   │   ├── Review.js
│   │   └── Coupon.js
│   ├── routes/               # API routes
│   │   ├── products.js
│   │   ├── users.js
│   │   ├── orders.js
│   │   ├── reviews.js
│   │   ├── coupons.js
│   │   ├── upload.js
│   │   └── payment.js
│   ├── middleware/
│   │   └── auth.js
│   ├── scripts/
│   │   └── seed.js
│   └── server.js
│
├── .gitignore
├── vercel.json
└── README.md
```

---

## 🎨 Features

### Customer
- 🛒 Add to Cart + Buy Now
- 💳 Razorpay + COD Payment
- 📦 Order Tracking (4 stages)
- ❤️ Wishlist
- 🏷️ Coupon Codes
- 📲 WhatsApp Order button
- 🌙 Dark Mode
- 📱 Mobile Bottom Navigation

### Admin
- 📦 Product CRUD + Image Upload
- 📋 Order Management + Status Updates
- 📊 Sales Dashboard

---

## 🚀 Deployment

### Frontend → Vercel
1. Push to GitHub
2. Import repo in Vercel
3. Set root to `frontend/`
4. Add env: `VITE_RAZORPAY_KEY_ID`
5. Deploy!

### Backend → Render
1. Create Web Service on Render
2. Set root to `backend/`
3. Build Command: `npm install`
4. Start Command: `npm start`
5. Add all env variables from `.env.example`
6. Deploy!

---

## 🔑 Default Credentials (after seeding)

- **Admin**: admin@test.com / admin123
- **User**: demo@test.com / demo123

---

## 💬 Coupon Codes
- `FACTORY10` – 10% off
- `SAVE20` – 20% off (min ₹500)
- `FIRSTBUY` – 15% off

---

© 2024 Sri Murugan Textiles. Factory Direct Sales – Saralai & Bhavani.

# Sri-Murugan-Textiles

# Sri_Murugan_Textiles
