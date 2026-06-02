const express = require('express');
const router = express.Router();
const Order = require('../models/Order');
const Cart = require('../models/Cart');
const auth = require('../middleware/auth');

// Create Order
router.post('/', auth, async (req, res) => {
  try {
    const { shippingAddress } = req.body;
    
    // Get cart
    const cart = await Cart.findOne({ user: req.user.id });
    if (!cart || cart.items.length === 0) {
      return res.status(400).json({ success: false, error: 'Cart is empty' });
    }

    const order = new Order({
      user: req.user.id,
      items: cart.items,
      totalAmount: cart.totalPrice,
      shippingAddress,
      status: 'Pending'
    });

    await order.save();
    
    // Clear cart
    cart.items = [];
    cart.totalPrice = 0;
    await cart.save();

    res.json({ success: true, data: order });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// Get user orders
router.get('/', auth, async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user.id }).populate('items.product').sort({ createdAt: -1 });
    res.json({ success: true, data: orders });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

module.exports = router;
