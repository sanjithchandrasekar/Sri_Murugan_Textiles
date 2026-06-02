const express = require('express');
const router = express.Router();
const Cart = require('../models/Cart');
const auth = require('../middleware/auth');

// Get cart for logged in user
router.get('/', auth, async (req, res) => {
  try {
    let cart = await Cart.findOne({ user: req.user.id }).populate('items.product');
    if (!cart) {
      cart = new Cart({ user: req.user.id, items: [], totalPrice: 0 });
      await cart.save();
    }
    res.json({ success: true, data: cart });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// Add to cart
router.post('/add', auth, async (req, res) => {
  try {
    const { productId, quantity, price, color, size } = req.body;
    let cart = await Cart.findOne({ user: req.user.id });

    if (!cart) {
      cart = new Cart({ user: req.user.id, items: [], totalPrice: 0 });
    }

    // Check if item already exists in cart
    const itemIndex = cart.items.findIndex(p => p.product.toString() === productId && p.color === color && p.size === size);

    if (itemIndex > -1) {
      // product exists in the cart, update the quantity
      cart.items[itemIndex].quantity += quantity;
    } else {
      // product does not exists in cart, add new item
      cart.items.push({ product: productId, quantity, color, size, price });
    }

    cart.totalPrice += (price * quantity);
    await cart.save();

    cart = await Cart.findOne({ user: req.user.id }).populate('items.product');
    res.json({ success: true, data: cart });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// Remove from cart
router.post('/remove', auth, async (req, res) => {
  try {
    const { itemId } = req.body;
    let cart = await Cart.findOne({ user: req.user.id });
    if (!cart) return res.status(404).json({ success: false, error: 'Cart not found' });

    const itemIndex = cart.items.findIndex(p => p._id.toString() === itemId);
    if (itemIndex > -1) {
      cart.totalPrice -= (cart.items[itemIndex].quantity * cart.items[itemIndex].price);
      cart.items.splice(itemIndex, 1);
      await cart.save();
    }

    cart = await Cart.findOne({ user: req.user.id }).populate('items.product');
    res.json({ success: true, data: cart });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

module.exports = router;
