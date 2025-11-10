import { useQuery, useMutation, useQueryClient } from 'react-query';
import { postService } from '../services/api';
import toast from 'react-hot-toast';

// Get all posts
export const usePosts = (params = {}) => {
    return useQuery(['posts', params], () => postService.getAllPosts(params), {
        keepPreviousData: true,
        staleTime: 5 * 60 * 1000, // 5 minutes
    });
};

// Get single post
export const usePost = (id) => {
    return useQuery(['post', id], () => postService.getPost(id), {
        enabled: !!id,
    });
};

// Get posts by user
export const usePostsByUser = (userId, page = 1, limit = 10) => {
    return useQuery(
        ['posts', 'user', userId, page, limit],
        () => postService.getPostsByUser(userId, page, limit),
        {
            enabled: !!userId,
            keepPreviousData: true,
        }
    );
};

// Create post mutation
export const useCreatePost = () => {
    const queryClient = useQueryClient();

    return useMutation(postService.createPost, {
        onSuccess: (data) => {
            queryClient.invalidateQueries(['posts']);
            toast.success('Post created successfully!');
        },
        onError: (error) => {
            toast.error(error.response?.data?.error || 'Failed to create post');
        },
    });
};

// Update post mutation
export const useUpdatePost = () => {
    const queryClient = useQueryClient();

    return useMutation(
        ({ id, data }) => postService.updatePost(id, data),
        {
            onSuccess: (data, variables) => {
                queryClient.invalidateQueries(['posts']);
                queryClient.invalidateQueries(['post', variables.id]);
                toast.success('Post updated successfully!');
            },
            onError: (error) => {
                toast.error(error.response?.data?.error || 'Failed to update post');
            },
        }
    );
};

// Delete post mutation
export const useDeletePost = () => {
    const queryClient = useQueryClient();

    return useMutation(postService.deletePost, {
        onSuccess: () => {
            queryClient.invalidateQueries(['posts']);
            toast.success('Post deleted successfully!');
        },
        onError: (error) => {
            toast.error(error.response?.data?.error || 'Failed to delete post');
        },
    });
};