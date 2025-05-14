import express from 'express';
import { isAdmin } from '../middleware/adminMiddleware.js';
import { protect } from '../middleware/authMiddleware.js';
import User from '../models/User.js';
import Product from '../models/Product.js';

const router = express.Router();

// Get all users
router.get('/users', protect, isAdmin, async (req, res) => {
  const users = await User.find().select('-password');
  res.json(users);
});

// Get all listings
router.get('/products', protect, isAdmin, async (req, res) => {
  const products = await Product.find().populate('user', 'name email');
  res.json(products);
});

// Delete a user
router.delete('/users/:id', protect, isAdmin, async (req, res) => {
  await User.findByIdAndDelete(req.params.id);
  res.json({ message: 'User deleted' });
});

// Delete a product
router.delete('/products/:id', protect, isAdmin, async (req, res) => {
  await Product.findByIdAndDelete(req.params.id);
  res.json({ message: 'Product deleted' });
});

export default router;
