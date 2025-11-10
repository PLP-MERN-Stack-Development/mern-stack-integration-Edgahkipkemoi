import express from 'express';
import {
    getCommentsByPost,
    createComment,
    updateComment,
    deleteComment,
    toggleCommentLike,
} from '../controllers/commentController.js';
import { protect } from '../middleware/authMiddleware.js';
import { validateComment } from '../middleware/validation.js';

const router = express.Router();

// Public routes
router.get('/post/:postId', getCommentsByPost);

// Private routes
router.post('/', protect, validateComment, createComment);
router.put('/:id', protect, validateComment, updateComment);
router.delete('/:id', protect, deleteComment);
router.post('/:id/like', protect, toggleCommentLike);

export default router;