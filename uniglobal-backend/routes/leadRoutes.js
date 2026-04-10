import express from 'express';
import {
  createLead,
  getAllLeads,
  getLeadById,
  updateLead,
  deleteLead,
  getLeadStats,
} from '../controllers/leadController.js';
import { validateLead, validateLeadUpdate, validateLeadFilters } from '../middlewares/validationMiddleware.js';
import authMiddleware from '../middlewares/authMiddleware.js';

const router = express.Router();

// Public routes
router.post('/', validateLead, createLead);

// Protected routes (require admin authentication)
router.get('/stats/dashboard', authMiddleware, getLeadStats);
router.get('/', authMiddleware, validateLeadFilters, getAllLeads);
router.get('/:id', authMiddleware, getLeadById);
router.put('/:id', authMiddleware, validateLeadUpdate, updateLead);
router.delete('/:id', authMiddleware, deleteLead);

export default router;
