const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config({ path: __dirname + '/.env' });

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Database Connection
mongoose.connect(process.env.MONGO_URI)
.then(() => console.log('✅ MongoDB Connected'))
.catch(err => console.error('❌ MongoDB Connection Error:', err));

// Basic Route
app.get('/', (req, res) => {
  res.send('Sri Murugan Textiles API is running...');
});

// Test Routes
const Product = require('./models/Product');
const User = require('./models/User');
const Order = require('./models/Order');
const Store = require('./models/Store');
const Cart = require('./models/Cart');

app.get('/api/test/db-status', (req, res) => {
  const status = mongoose.connection.readyState;
  // 0 = disconnected, 1 = connected, 2 = connecting, 3 = disconnecting
  const statusMap = {
    0: 'Disconnected',
    1: 'Connected',
    2: 'Connecting',
    3: 'Disconnecting',
  };
  res.json({ status: statusMap[status] || 'Unknown', code: status });
});

app.post('/api/test/seed-product', async (req, res) => {
  try {
    const newProduct = new Product({
      name: "Test Shirt " + Date.now(),
      category: "Shirts",
      price: 500,
      mrp: 999,
      image: "https://via.placeholder.com/150",
      description: "A test product generated from the test page"
    });
    await newProduct.save();
    res.json({ success: true, product: newProduct });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

app.get('/api/test/products', async (req, res) => {
  try {
    const products = await Product.find().limit(10).sort({ createdAt: -1 });
    res.json({ success: true, products });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

app.post('/api/test/seed-all', async (req, res) => {
  try {
    // 1. Create a User
    const newUser = new User({
      name: "Test User " + Date.now(),
      email: "test" + Date.now() + "@example.com",
      password: "password123",
      role: "customer"
    });
    await newUser.save();

    // 2. Create a Product
    const newProduct = new Product({
      name: "Test Saree " + Date.now(),
      category: "Sarees",
      price: 1500,
      mrp: 2000,
      image: "https://via.placeholder.com/150",
      description: "A test saree"
    });
    await newProduct.save();

    // 3. Create a Store
    const newStore = new Store({
      branchNumber: "0" + Math.floor(Math.random() * 9 + 1),
      name: "Test Branch " + Date.now(),
      incharge: "Manager " + Date.now(),
      address: "123 Main St",
      contact: "9876543210"
    });
    await newStore.save();

    // 4. Create an Order
    const newOrder = new Order({
      user: newUser._id,
      items: [{
        product: newProduct._id,
        quantity: 1,
        price: newProduct.price
      }],
      totalAmount: newProduct.price,
      shippingAddress: {
        street: "123 Test St",
        city: "Test City",
        state: "Test State",
        pincode: "123456",
        phone: "1234567890"
      },
      status: "pending"
    });
    await newOrder.save();

    // 5. Create a Cart
    const newCart = new Cart({
      user: newUser._id,
      items: [{
        product: newProduct._id,
        quantity: 2
      }],
      totalPrice: newProduct.price * 2
    });
    await newCart.save();

    res.json({ 
      success: true, 
      message: "Successfully seeded User, Product, Store, Order, and Cart collections!" 
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
