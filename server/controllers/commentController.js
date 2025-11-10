import Comment from '../models/Comment.js';
import Post from '../models/Post.js';

// @desc    Get comments for a post
// @route   GET /api/comments/post/:postId
// @access  Public
export const getCommentsByPost = async (req, res) => {
    try {
        const { postId } = req.params;
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const skip = (page - 1) * limit;

        // Get top-level comments (no parent)
        const comments = await Comment.find({
            post: postId,
            parentComment: null,
            isApproved: true
        })
            .populate('author', 'name avatar')
            .populate({
                path: 'replies',
                populate: {
                    path: 'author',
                    select: 'name avatar'
                }
            })
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit);

        const total = await Comment.countDocuments({
            post: postId,
            parentComment: null,
            isApproved: true
        });

        res.status(200).json({
            success: true,
            data: {
                comments,
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

// @desc    Create new comment
// @route   POST /api/comments
// @access  Private
export const createComment = async (req, res) => {
    try {
        const { content, post, parentComment } = req.body;

        // Check if post exists
        const postDoc = await Post.findById(post);
        if (!postDoc) {
            return res.status(404).json({
                success: false,
                error: 'Post not found',
            });
        }

        // If it's a reply, check if parent comment exists
        if (parentComment) {
            const parentCommentDoc = await Comment.findById(parentComment);
            if (!parentCommentDoc) {
                return res.status(404).json({
                    success: false,
                    error: 'Parent comment not found',
                });
            }
        }

        const comment = await Comment.create({
            content,
            post,
            parentComment: parentComment || null,
            author: req.user.id,
        });

        // If it's a reply, add to parent's replies array
        if (parentComment) {
            await Comment.findByIdAndUpdate(parentComment, {
                $push: { replies: comment._id },
            });
        }

        const populatedComment = await Comment.findById(comment._id)
            .populate('author', 'name avatar');

        res.status(201).json({
            success: true,
            data: { comment: populatedComment },
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message,
        });
    }
};

// @desc    Update comment
// @route   PUT /api/comments/:id
// @access  Private
export const updateComment = async (req, res) => {
    try {
        const { content } = req.body;

        let comment = await Comment.findById(req.params.id);

        if (!comment) {
            return res.status(404).json({
                success: false,
                error: 'Comment not found',
            });
        }

        // Check if user owns the comment or is admin
        if (comment.author.toString() !== req.user.id && req.user.role !== 'admin') {
            return res.status(403).json({
                success: false,
                error: 'Not authorized to update this comment',
            });
        }

        comment = await Comment.findByIdAndUpdate(
            req.params.id,
            { content },
            { new: true, runValidators: true }
        ).populate('author', 'name avatar');

        res.status(200).json({
            success: true,
            data: { comment },
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message,
        });
    }
};

// @desc    Delete comment
// @route   DELETE /api/comments/:id
// @access  Private
export const deleteComment = async (req, res) => {
    try {
        const comment = await Comment.findById(req.params.id);

        if (!comment) {
            return res.status(404).json({
                success: false,
                error: 'Comment not found',
            });
        }

        // Check if user owns the comment or is admin
        if (comment.author.toString() !== req.user.id && req.user.role !== 'admin') {
            return res.status(403).json({
                success: false,
                error: 'Not authorized to delete this comment',
            });
        }

        // If comment has replies, delete them too
        if (comment.replies.length > 0) {
            await Comment.deleteMany({ _id: { $in: comment.replies } });
        }

        // If it's a reply, remove from parent's replies array
        if (comment.parentComment) {
            await Comment.findByIdAndUpdate(comment.parentComment, {
                $pull: { replies: comment._id },
            });
        }

        await Comment.findByIdAndDelete(req.params.id);

        res.status(200).json({
            success: true,
            data: { message: 'Comment deleted successfully' },
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message,
        });
    }
};

// @desc    Like/Unlike comment
// @route   POST /api/comments/:id/like
// @access  Private
export const toggleCommentLike = async (req, res) => {
    try {
        const comment = await Comment.findById(req.params.id);

        if (!comment) {
            return res.status(404).json({
                success: false,
                error: 'Comment not found',
            });
        }

        await comment.addLike(req.user.id);

        const updatedComment = await Comment.findById(req.params.id)
            .populate('author', 'name avatar');

        res.status(200).json({
            success: true,
            data: { comment: updatedComment },
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message,
        });
    }
};