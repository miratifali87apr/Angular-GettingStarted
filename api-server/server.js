const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Modern product data with current technology products
const products = [
  {
    productId: 1,
    productName: 'iPhone 15 Pro Max',
    productCode: 'IPH-15PM-512',
    releaseDate: '2023-09-22',
    description: 'The most advanced iPhone ever with titanium design, A17 Pro chip, and professional camera system.',
    price: 1199.99,
    starRating: 4.8,
    imageUrl: 'assets/images/iphone15.jpg'
  },
  {
    productId: 2,
    productName: 'MacBook Pro M3',
    productCode: 'MBP-M3-14-1TB',
    releaseDate: '2023-10-30',
    description: 'Supercharged by M3 chip. Built for professionals who need ultimate performance.',
    price: 2499.99,
    starRating: 4.9,
    imageUrl: 'assets/images/macbook-m3.jpg'
  },
  {
    productId: 3,
    productName: 'Tesla Model Y',
    productCode: 'TSLA-MY-LR-2024',
    releaseDate: '2024-01-15',
    description: 'All-electric SUV with exceptional performance, safety, and efficiency.',
    price: 52990.00,
    starRating: 4.7,
    imageUrl: 'assets/images/tesla-model-y.jpg'
  },
  {
    productId: 4,
    productName: 'Samsung Galaxy S24 Ultra',
    productCode: 'SGS-S24U-256',
    releaseDate: '2024-01-24',
    description: 'Premium Android flagship with S Pen, AI features, and incredible camera capabilities.',
    price: 1299.99,
    starRating: 4.6,
    imageUrl: 'assets/images/galaxy-s24.jpg'
  },
  {
    productId: 5,
    productName: 'Sony PlayStation 5 Pro',
    productCode: 'PS5-PRO-2TB',
    releaseDate: '2024-11-07',
    description: 'Next-gen gaming console with enhanced performance and ray tracing capabilities.',
    price: 699.99,
    starRating: 4.5,
    imageUrl: 'assets/images/ps5-pro.jpg'
  },
  {
    productId: 6,
    productName: 'Microsoft Surface Laptop 6',
    productCode: 'MSL6-I7-32GB',
    releaseDate: '2024-05-20',
    description: 'Premium Windows laptop with Intel Core i7, perfect for productivity and creativity.',
    price: 1899.99,
    starRating: 4.4,
    imageUrl: 'assets/images/surface-laptop6.jpg'
  },
  {
    productId: 7,
    productName: 'Apple Vision Pro',
    productCode: 'AVP-256GB-2024',
    releaseDate: '2024-02-02',
    description: 'Revolutionary spatial computer that seamlessly blends digital content with physical world.',
    price: 3499.99,
    starRating: 4.2,
    imageUrl: 'assets/images/vision-pro.jpg'
  },
  {
    productId: 8,
    productName: 'Nintendo Switch OLED',
    productCode: 'NSW-OLED-WHITE',
    releaseDate: '2021-10-08',
    description: 'Versatile gaming system with vibrant OLED display for handheld and docked play.',
    price: 349.99,
    starRating: 4.6,
    imageUrl: 'assets/images/switch-oled.jpg'
  },
  {
    productId: 9,
    productName: 'Google Pixel 8 Pro',
    productCode: 'GPX8P-128GB-BAY',
    releaseDate: '2023-10-12',
    description: 'AI-powered Android phone with exceptional photography and pure Google experience.',
    price: 999.99,
    starRating: 4.3,
    imageUrl: 'assets/images/pixel8-pro.jpg'
  },
  {
    productId: 10,
    productName: 'Dell XPS 13 Plus',
    productCode: 'DXP13P-I7-16GB',
    releaseDate: '2024-03-15',
    description: 'Ultra-premium laptop with stunning InfinityEdge display and modern design.',
    price: 1549.99,
    starRating: 4.5,
    imageUrl: 'assets/images/xps13-plus.jpg'
  },
  {
    productId: 11,
    productName: 'iPad Pro M4',
    productCode: 'IPD-M4-11-512',
    releaseDate: '2024-05-15',
    description: 'Most advanced iPad with M4 chip, Ultra Retina XDR display, and Apple Pencil Pro support.',
    price: 1299.99,
    starRating: 4.7,
    imageUrl: 'assets/images/ipad-pro-m4.jpg'
  },
  {
    productId: 12,
    productName: 'Meta Quest 3',
    productCode: 'MQ3-512GB-WHT',
    releaseDate: '2023-10-10',
    description: 'Next-generation VR headset with mixed reality capabilities and enhanced graphics.',
    price: 649.99,
    starRating: 4.4,
    imageUrl: 'assets/images/quest3.jpg'
  }
];

// API Routes
app.get('/api/products', (req, res) => {
  console.log('📦 GET /api/products - Fetching all products');
  res.json(products);
});

app.get('/api/products/:id', (req, res) => {
  const productId = parseInt(req.params.id);
  console.log(`🔍 GET /api/products/${productId} - Fetching specific product`);
  
  const product = products.find(p => p.productId === productId);
  
  if (product) {
    res.json(product);
  } else {
    res.status(404).json({ message: 'Product not found' });
  }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    timestamp: new Date().toISOString(),
    message: 'Product API is running successfully',
    totalProducts: products.length
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Error:', err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ message: 'API endpoint not found' });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Product API Server running on http://localhost:${PORT}`);
  console.log(`📋 Available endpoints:`);
  console.log(`   GET http://localhost:${PORT}/api/products - Get all products`);
  console.log(`   GET http://localhost:${PORT}/api/products/:id - Get product by ID`);
  console.log(`   GET http://localhost:${PORT}/api/health - Health check`);
  console.log(`💾 Total products available: ${products.length}`);
});

module.exports = app;