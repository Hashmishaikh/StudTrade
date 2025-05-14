import express from 'express';
import { getUserListings } from '../controllers/userController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/my-listings', protect, getUserListings);

export default router;
