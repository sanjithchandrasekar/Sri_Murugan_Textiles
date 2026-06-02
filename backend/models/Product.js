const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  category: { // mapped to 'cat'
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  mrp: {
    type: Number,
    required: true
  },
  description: {
    type: String
  },
  emoji: {
    type: String
  },
  image: {
    type: String,
    required: true
  },
  colors: [{
    name: String,
    img: String
  }],
  sizes: [{
    type: String
  }],
  isNewItem: { // mapped to 'isNew'
    type: Boolean,
    default: false
  },
  tags: [{
    type: String
  }],
  stock: {
    type: Number,
    default: 0
  }
}, { timestamps: true });

module.exports = mongoose.model('Product', productSchema);
