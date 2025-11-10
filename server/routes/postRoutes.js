import express from 'express';
import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';
import {
    getPosts,
    getPost,
    createPost,
    updatePost,
    deletePost,
    getPostsByUser,
} from '../controllers/postController.js';
import { protect, optionalAuth } from '../middleware/authMiddleware.js';
import { validatePost } from '../middleware/validation.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const router = express.Router();

// Configure multer for file uploads
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, '../uploads/'));
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, 'post-' + uniqueSuffix + path.extname(file.originalname));
    }
});

const fileFilter = (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
        cb(null, true);
    } else {
        cb(new Error('Only image files are allowed'), false);
    }
};

const upload = multer({
    storage,
    fileFilter,
    limits: {
        fileSize: 5 * 1024 * 1024, // 5MB limit
    }
});

// Public routes
router.get('/', optionalAuth, getPosts);
router.get('/user/:userId', getPostsByUser);
router.get('/:id', optionalAuth, getPost);

// Private routes
router.post('/', protect, upload.single('featuredImage'), validatePost, createPost);
router.put('/:id', protect, upload.single('featuredImage'), validatePost, updatePost);
router.delete('/:id', protect, deletePost);

export default router;