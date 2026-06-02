const mongoose = require('mongoose');
require('dotenv').config({ path: __dirname + '/.env' });
const Product = require('./models/Product');

const PRODUCTS = [
  { id:16, cat:"Shirts", name:"Jibouti Strips Shirt", emoji:"👔", price:550, mrp:1998, rating:4.8, rev:32, badge:"", isNew:true, tags:["shirts","casual"], sizes:["S", "M", "L", "XL", "XXL", "XXXL"], image:"/picture/Shirts/jibouti/Vertical Striped Formal/overall collection.jpeg", colors: [
    { name: "All Colors", img: "/picture/Shirts/jibouti/Vertical Striped Formal/overall collection.jpeg" },
    { name: "Beige, Light Brown & White", img: "/picture/Shirts/jibouti/Vertical Striped Formal/Beige  Light Brown & White Stripes.jpeg" },
    { name: "Blue, Grey & White", img: "/picture/Shirts/jibouti/Vertical Striped Formal/Blue, Grey & White Stripes.jpeg" },
    { name: "Light Green & White", img: "/picture/Shirts/jibouti/Vertical Striped Formal/Light Green & White Stripes.jpeg" },
    { name: "Light Pink & White", img: "/picture/Shirts/jibouti/Vertical Striped Formal/Light Pink  & White Stripes.jpeg" },
    { name: "Olive Green, Grey & White", img: "/picture/Shirts/jibouti/Vertical Striped Formal/Olive Green  Grey & White Stripes.jpeg" },
    { name: "Sky Blue & White", img: "/picture/Shirts/jibouti/Vertical Striped Formal/Sky Blue & White Stripes.jpeg" }
  ] },
];

const seedDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ Connected to MongoDB for Seeding...');

    // Delete existing products to avoid duplicates during multiple seed runs
    await Product.deleteMany({});
    console.log('Cleared existing products.');

    const mappedProducts = PRODUCTS.map(p => ({
      name: p.name,
      category: p.cat,
      price: p.price,
      mrp: p.mrp,
      description: p.badge || p.tags.join(', '),
      emoji: p.emoji,
      image: p.image,
      colors: p.colors,
      sizes: p.sizes,
      isNewItem: p.isNew,
      tags: p.tags,
      stock: 100 // default stock
    }));

    await Product.insertMany(mappedProducts);
    console.log('✅ Seeded PRODUCTS successfully!');
    
    process.exit(0);
  } catch (err) {
    console.error('❌ Seeding failed:', err);
    process.exit(1);
  }
};

seedDB();
