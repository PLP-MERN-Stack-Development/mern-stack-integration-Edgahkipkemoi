import express from 'express';
import {
    getCategories,
    getCategory,
    createCategory,
    updateCategory,
    deleteCategory,
} from '../controllers/categoryController.js';
import { protect, admin } from '../middleware/authMiddleware.js';
import { validateCategory } from '../middleware/validation.js';

const router = express.Router();

// Public routes
router.get('/', getCategories);
router.get('/:id', getCategory);

// Private routes (Admin only)
router.post('/', protect, admin, validateCategory, createCategory);
router.put('/:id', protect, admin, validateCategory, updateCategory);
router.delete('/:id', protect, admin, deleteCategory);

export default router;