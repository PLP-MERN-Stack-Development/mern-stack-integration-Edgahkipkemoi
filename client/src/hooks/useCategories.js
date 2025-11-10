import { useQuery, useMutation, useQueryClient } from 'react-query';
import { categoryService } from '../services/api';
import toast from 'react-hot-toast';

// Get all categories
export const useCategories = () => {
    return useQuery('categories', categoryService.getAllCategories, {
        staleTime: 10 * 60 * 1000, // 10 minutes
    });
};

// Get single category
export const useCategory = (id) => {
    return useQuery(['category', id], () => categoryService.getCategory(id), {
        enabled: !!id,
    });
};

// Create category mutation
export const useCreateCategory = () => {
    const queryClient = useQueryClient();

    return useMutation(categoryService.createCategory, {
        onSuccess: () => {
            queryClient.invalidateQueries('categories');
            toast.success('Category created successfully!');
        },
        onError: (error) => {
            toast.error(error.response?.data?.error || 'Failed to create category');
        },
    });
};

// Update category mutation
export const useUpdateCategory = () => {
    const queryClient = useQueryClient();

    return useMutation(
        ({ id, data }) => categoryService.updateCategory(id, data),
        {
            onSuccess: (data, variables) => {
                queryClient.invalidateQueries('categories');
                queryClient.invalidateQueries(['category', variables.id]);
                toast.success('Category updated successfully!');
            },
            onError: (error) => {
                toast.error(error.response?.data?.error || 'Failed to update category');
            },
        }
    );
};

// Delete category mutation
export const useDeleteCategory = () => {
    const queryClient = useQueryClient();

    return useMutation(categoryService.deleteCategory, {
        onSuccess: () => {
            queryClient.invalidateQueries('categories');
            toast.success('Category deleted successfully!');
        },
        onError: (error) => {
            toast.error(error.response?.data?.error || 'Failed to delete category');
        },
    });
};