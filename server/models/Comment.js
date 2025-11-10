import mongoose from 'mongoose';

const CommentSchema = new mongoose.Schema(
    {
        content: {
            type: String,
            required: [true, 'Please provide comment content'],
            trim: true,
            maxlength: [1000, 'Comment cannot be more than 1000 characters'],
        },
        author: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        post: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Post',
            required: true,
        },
        parentComment: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Comment',
            default: null,
        },
        replies: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Comment',
        }],
        isApproved: {
            type: Boolean,
            default: true,
        },
        likes: [{
            user: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User',
            },
            createdAt: {
                type: Date,
                default: Date.now,
            },
        }],
        likeCount: {
            type: Number,
            default: 0,
        },
    },
    { timestamps: true }
);

// Method to add a like
CommentSchema.methods.addLike = function (userId) {
    const existingLike = this.likes.find(like => like.user.toString() === userId.toString());

    if (existingLike) {
        // Remove like if already exists
        this.likes = this.likes.filter(like => like.user.toString() !== userId.toString());
        this.likeCount = Math.max(0, this.likeCount - 1);
    } else {
        // Add like
        this.likes.push({ user: userId });
        this.likeCount += 1;
    }

    return this.save();
};

// Method to add a reply
CommentSchema.methods.addReply = function (replyId) {
    this.replies.push(replyId);
    return this.save();
};

export default mongoose.model('Comment', CommentSchema);