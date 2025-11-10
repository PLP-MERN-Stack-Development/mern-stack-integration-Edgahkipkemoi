import Post from '../models/Post.js';
import Category from '../models/Category.js';

// @desc    Get all posts
// @route   GET /api/posts
// @access  Public
export const getPosts = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const skip = (page - 1) * limit;
        const search = req.query.search || '';
        const category = req.query.category || '';
        const sortBy = req.query.sortBy || 'createdAt';
        const sortOrder = req.query.sortOrder === 'asc' ? 1 : -1;

        // Build query
        let query = { isPublished: true };

        if (search) {
            query.$or = [
                { title: { $regex: search, $options: 'i' } },
                { content: { $regex: search, $options: 'i' } },
                { tags: { $in: [new RegExp(search, 'i')] } },
            ];
        }

        if (category) {
            const categoryDoc = await Category.findOne({ slug: category });
            if (categoryDoc) {
                query.category = categoryDoc._id;
            }
        }

        // Get posts with pagination
        const posts = await Post.find(query)
            .populate('author', 'name avatar')
            .populate('category', 'name slug color')
            .sort({ [sortBy]: sortOrder })
            .skip(skip)
            .limit(limit)
            .select('-content'); // Exclude full content for list view

        // Get total count for pagination
        const total = await Post.countDocuments(query);

        res.status(200).json({
            success: true,
            data: {
                posts,
                pagination: {
                    page,
                    limit,
                    total,
                    pages: Math.ceil(total / limit),
                },
            },
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message,
        });
    }
};

// @desc    Get single post
// @route   GET /api/posts/:id
// @access  Public
export const getPost = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id)
            .populate('author', 'name avatar bio')
            .populate('category', 'name slug color')
            .populate('comments.user', 'name avatar');

        if (!post) {
            return res.status(404).json({
                success: false,
                error: 'Post not found',
            });
        }

        // Increment view count
        await post.incrementViewCount();

        res.status(200).json({
            success: true,
            data: { post },
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message,
        });
    }
};

// @desc    Create new post
// @route   POST /api/posts
// @access  Private
export const createPost = async (req, res) => {
    try {
        const { title, content, excerpt, category, tags, isPublished } = req.body;

        // Check if category exists
        const categoryDoc = await Category.findById(category);
        if (!categoryDoc) {
            return res.status(400).json({
                success: false,
                error: 'Category not found',
            });
        }

        const post = await Post.create({
            title,
            content,
            excerpt,
            category,
            tags: tags ? tags.split(',').map(tag => tag.trim()) : [],
            isPublished: isPublished || false,
            author: req.user.id,
            featuredImage: req.file ? req.file.filename : 'default-post.jpg',
        });

        // Update category post count
        await Category.findByIdAndUpdate(category, {
            $inc: { postCount: 1 },
        });

        const populatedPost = await Post.findById(post._id)
            .populate('author', 'name avatar')
            .populate('category', 'name slug color');

        res.status(201).json({
            success: true,
            data: { post: populatedPost },
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message,
        });
    }
};

// @desc    Update post
// @route   PUT /api/posts/:id
// @access  Private
export const updatePost = async (req, res) => {
    try {
        let post = await Post.findById(req.params.id);

        if (!post) {
            return res.status(404).json({
                success: false,
                error: 'Post not found',
            });
        }

        // Check if user owns the post or is admin
        if (post.author.toString() !== req.user.id && req.user.role !== 'admin') {
            return res.status(403).json({
                success: false,
                error: 'Not authorized to update this post',
            });
        }

        const { title, content, excerpt, category, tags, isPublished } = req.body;

        // Update fields
        const updateData = {
            title,
            content,
            excerpt,
            category,
            tags: tags ? tags.split(',').map(tag => tag.trim()) : post.tags,
            isPublished: isPublished !== undefined ? isPublished : post.isPublished,
        };

        if (req.file) {
            updateData.featuredImage = req.file.filename;
        }

        post = await Post.findByIdAndUpdate(req.params.id, updateData, {
            new: true,
            runValidators: true,
        })
            .populate('author', 'name avatar')
            .populate('category', 'name slug color');

        res.status(200).json({
            success: true,
            data: { post },
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message,
        });
    }
};

// @desc    Delete post
// @route   DELETE /api/posts/:id
// @access  Private
export const deletePost = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);

        if (!post) {
            return res.status(404).json({
                success: false,
                error: 'Post not found',
            });
        }

        // Check if user owns the post or is admin
        if (post.author.toString() !== req.user.id && req.user.role !== 'admin') {
            return res.status(403).json({
                success: false,
                error: 'Not authorized to delete this post',
            });
        }

        // Update category post count
        await Category.findByIdAndUpdate(post.category, {
            $inc: { postCount: -1 },
        });

        await Post.findByIdAndDelete(req.params.id);

        res.status(200).json({
            success: true,
            data: { message: 'Post deleted successfully' },
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message,
        });
    }
};

// @desc    Get posts by user
// @route   GET /api/posts/user/:userId
// @access  Public
export const getPostsByUser = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const skip = (page - 1) * limit;

        const posts = await Post.find({
            author: req.params.userId,
            isPublished: true
        })
            .populate('author', 'name avatar')
            .populate('category', 'name slug color')
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit)
            .select('-content');

        const total = await Post.countDocuments({
            author: req.params.userId,
            isPublished: true
        });

        res.status(200).json({
            success: true,
            data: {
                posts,
                pagination: {
                    page,
                    limit,
                    total,
                    pages: Math.ceil(total / limit),
                },
            },
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message,
        });
    }
};