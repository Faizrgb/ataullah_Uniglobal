import express from 'express';
import {
  login,
  getProfile,
  updateProfile,
  changePassword,
  initializeAdmin,
} from '../controllers/adminController.js';
import { validateAdminLogin } from '../middlewares/validationMiddleware.js';
import authMiddleware from '../middlewares/authMiddleware.js';

const router = express.Router();

// Public routes
router.post('/init', initializeAdmin);
router.post('/login', validateAdminLogin, login);

// Protected routes (require authentication)
router.get('/profile', authMiddleware, getProfile);
router.put('/profile', authMiddleware, updateProfile);
router.put('/change-password', authMiddleware, changePassword);

export default router;
