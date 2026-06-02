const express = require('express');
const router = express.Router();
const User = require('../models/User');
const auth = require('../middleware/auth');

// Get wishlist
router.get('/', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).populate('wishlist');
    res.json({ success: true, data: user.wishlist });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// Toggle wishlist item
router.post('/toggle', auth, async (req, res) => {
  try {
    const { productId } = req.body;
    let user = await User.findById(req.user.id);
    
    const index = user.wishlist.indexOf(productId);
    if (index > -1) {
      user.wishlist.splice(index, 1);
    } else {
      user.wishlist.push(productId);
    }
    
    await user.save();
    user = await User.findById(req.user.id).populate('wishlist');
    res.json({ success: true, data: user.wishlist });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

module.exports = router;
