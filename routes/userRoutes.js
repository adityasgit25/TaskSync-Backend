import express from 'express';
import { getProfile, updateProfile } from '../controllers/userController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// Protected routes
router.use(protect);

// @route   GET /api/users/me
router.get('/me', getProfile);

// @route   PUT /api/users/me
router.put('/me', updateProfile);

export default router;