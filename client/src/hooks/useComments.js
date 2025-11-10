import { useQuery, useMutation, useQueryClient } from 'react-query';
import { commentService } from '../services/api';
import toast from 'react-hot-toast';

// Get comments for a post
export const useComments = (postId, page = 1, limit = 10) => {
    return useQuery(
        ['comments', postId, page, limit],
        () => commentService.getCommentsByPost(postId, page, limit),
        {
            enabled: !!postId,
            keepPreviousData: true,
        }
    );
};

// Create comment mutation
export const useCreateComment = () => {
    const queryClient = useQueryClient();

    return useMutation(commentService.createComment, {
        onSuccess: (data, variables) => {
            queryClient.invalidateQueries(['comments', variables.post]);
            toast.success('Comment added successfully!');
        },
        onError: (error) => {
            toast.error(error.response?.data?.error || 'Failed to add comment');
        },
    });
};

// Update comment mutation
export const useUpdateComment = () => {
    const queryClient = useQueryClient();

    return useMutation(
        ({ id, data }) => commentService.updateComment(id, data),
        {
            onSuccess: (data, variables) => {
                queryClient.invalidateQueries(['comments']);
                toast.success('Comment updated successfully!');
            },
            onError: (error) => {
                toast.error(error.response?.data?.error || 'Failed to update comment');
            },
        }
    );
};

// Delete comment mutation
export const useDeleteComment = () => {
    const queryClient = useQueryClient();

    return useMutation(commentService.deleteComment, {
        onSuccess: () => {
            queryClient.invalidateQueries(['comments']);
            toast.success('Comment deleted successfully!');
        },
        onError: (error) => {
            toast.error(error.response?.data?.error || 'Failed to delete comment');
        },
    });
};

// Toggle comment like mutation
export const useToggleCommentLike = () => {
    const queryClient = useQueryClient();

    return useMutation(commentService.toggleCommentLike, {
        onSuccess: () => {
            queryClient.invalidateQueries(['comments']);
        },
        onError: (error) => {
            toast.error(error.response?.data?.error || 'Failed to toggle like');
        },
    });
};