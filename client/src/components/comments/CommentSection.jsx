import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useCreateComment, useDeleteComment, useToggleCommentLike } from '../../hooks/useComments';
import { MessageCircle, Heart, Reply, Edit, Trash2, Send } from 'lucide-react';
import LoadingSpinner from '../common/LoadingSpinner';
import toast from 'react-hot-toast';

const CommentSection = ({ postId, comments, isLoading, isAuthenticated, currentUser }) => {
    const [showCommentForm, setShowCommentForm] = useState(false);
    const [replyingTo, setReplyingTo] = useState(null);

    const createCommentMutation = useCreateComment();
    const deleteCommentMutation = useDeleteComment();
    const toggleLikeMutation = useToggleCommentLike();

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm();

    const onSubmitComment = async (data) => {
        if (!isAuthenticated) {
            toast.error('Please login to comment');
            return;
        }

        try {
            await createCommentMutation.mutateAsync({
                content: data.content,
                post: postId,
                parentComment: replyingTo,
            });
            reset();
            setShowCommentForm(false);
            setReplyingTo(null);
        } catch (error) {
            console.error('Error creating comment:', error);
        }
    };

    const handleDeleteComment = async (commentId) => {
        if (window.confirm('Are you sure you want to delete this comment?')) {
            try {
                await deleteCommentMutation.mutateAsync(commentId);
            } catch (error) {
                console.error('Error deleting comment:', error);
            }
        }
    };

    const handleToggleLike = async (commentId) => {
        if (!isAuthenticated) {
            toast.error('Please login to like comments');
            return;
        }

        try {
            await toggleLikeMutation.mutateAsync(commentId);
        } catch (error) {
            console.error('Error toggling like:', error);
        }
    };

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        });
    };

    const CommentItem = ({ comment, isReply = false }) => {
        const isOwner = currentUser?.id === comment.author?._id;
        const hasLiked = comment.likes?.some(like => like.user === currentUser?.id);

        return (
            <div className={`${isReply ? 'ml-8 border-l-2 border-gray-200 pl-4' : ''}`}>
                <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-100">
                    {/* Comment Header */}
                    <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center space-x-3">
                            <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center">
                                <span className="text-primary-600 font-semibold text-sm">
                                    {comment.author?.name?.charAt(0)?.toUpperCase() || 'A'}
                                </span>
                            </div>
                            <div>
                                <p className="font-medium text-gray-900">{comment.author?.name || 'Anonymous'}</p>
                                <p className="text-sm text-gray-500">{formatDate(comment.createdAt)}</p>
                            </div>
                        </div>

                        {/* Actions */}
                        <div className="flex items-center space-x-2">
                            {isOwner && (
                                <button
                                    onClick={() => handleDeleteComment(comment._id)}
                                    className="p-1 text-gray-400 hover:text-red-600 transition-colors"
                                    title="Delete comment"
                                >
                                    <Trash2 className="h-4 w-4" />
                                </button>
                            )}
                        </div>
                    </div>

                    {/* Comment Content */}
                    <p className="text-gray-700 mb-3">{comment.content}</p>

                    {/* Comment Actions */}
                    <div className="flex items-center space-x-4 text-sm">
                        <button
                            onClick={() => handleToggleLike(comment._id)}
                            className={`flex items-center space-x-1 transition-colors ${hasLiked ? 'text-red-500' : 'text-gray-500 hover:text-red-500'
                                }`}
                            disabled={!isAuthenticated}
                        >
                            <Heart className={`h-4 w-4 ${hasLiked ? 'fill-current' : ''}`} />
                            <span>{comment.likeCount || 0}</span>
                        </button>

                        {!isReply && isAuthenticated && (
                            <button
                                onClick={() => {
                                    setReplyingTo(comment._id);
                                    setShowCommentForm(true);
                                }}
                                className="flex items-center space-x-1 text-gray-500 hover:text-primary-600 transition-colors"
                            >
                                <Reply className="h-4 w-4" />
                                <span>Reply</span>
                            </button>
                        )}
                    </div>
                </div>

                {/* Replies */}
                {comment.replies && comment.replies.length > 0 && (
                    <div className="mt-4 space-y-4">
                        {comment.replies.map((reply) => (
                            <CommentItem key={reply._id} comment={reply} isReply={true} />
                        ))}
                    </div>
                )}
            </div>
        );
    };

    return (
        <div className="bg-white rounded-lg shadow-md p-6">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold text-gray-900 flex items-center">
                    <MessageCircle className="h-5 w-5 mr-2" />
                    Comments ({comments?.length || 0})
                </h3>

                {isAuthenticated && !showCommentForm && (
                    <button
                        onClick={() => setShowCommentForm(true)}
                        className="btn btn-primary flex items-center space-x-2"
                    >
                        <MessageCircle className="h-4 w-4" />
                        <span>Add Comment</span>
                    </button>
                )}
            </div>

            {/* Comment Form */}
            {showCommentForm && (
                <div className="mb-6 p-4 bg-gray-50 rounded-lg">
                    <form onSubmit={handleSubmit(onSubmitComment)} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                {replyingTo ? 'Reply to comment' : 'Add a comment'}
                            </label>
                            <textarea
                                {...register('content', {
                                    required: 'Comment content is required',
                                    maxLength: { value: 1000, message: 'Comment cannot exceed 1000 characters' }
                                })}
                                rows={4}
                                className="input"
                                placeholder="Write your comment here..."
                            />
                            {errors.content && (
                                <p className="mt-1 text-sm text-red-600">{errors.content.message}</p>
                            )}
                        </div>

                        <div className="flex justify-end space-x-3">
                            <button
                                type="button"
                                onClick={() => {
                                    setShowCommentForm(false);
                                    setReplyingTo(null);
                                    reset();
                                }}
                                className="btn btn-secondary"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                disabled={createCommentMutation.isLoading}
                                className="btn btn-primary flex items-center space-x-2"
                            >
                                {createCommentMutation.isLoading ? (
                                    <LoadingSpinner size="small" />
                                ) : (
                                    <Send className="h-4 w-4" />
                                )}
                                <span>{replyingTo ? 'Reply' : 'Comment'}</span>
                            </button>
                        </div>
                    </form>
                </div>
            )}

            {/* Comments List */}
            {isLoading ? (
                <div className="flex justify-center py-8">
                    <LoadingSpinner size="medium" />
                </div>
            ) : comments && comments.length > 0 ? (
                <div className="space-y-6">
                    {comments.map((comment) => (
                        <CommentItem key={comment._id} comment={comment} />
                    ))}
                </div>
            ) : (
                <div className="text-center py-8">
                    <MessageCircle className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-500 mb-4">No comments yet</p>
                    {isAuthenticated ? (
                        <button
                            onClick={() => setShowCommentForm(true)}
                            className="btn btn-primary"
                        >
                            Be the first to comment
                        </button>
                    ) : (
                        <p className="text-sm text-gray-400">Login to add the first comment</p>
                    )}
                </div>
            )}
        </div>
    );
};

export default CommentSection;