import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useCreatePost } from '../hooks/usePosts';
import { useCategories } from '../hooks/useCategories';
import LoadingSpinner from '../components/common/LoadingSpinner';
import toast from 'react-hot-toast';

const CreatePost = () => {
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const createPostMutation = useCreatePost();
    const { data: categoriesData } = useCategories();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const onSubmit = async (data) => {
        setIsLoading(true);
        try {
            const formData = {
                ...data,
                isPublished: data.isPublished || false,
            };

            await createPostMutation.mutateAsync(formData);
            navigate('/dashboard');
        } catch (error) {
            toast.error('Failed to create post');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="bg-white rounded-lg shadow-md p-8">
                    <h1 className="text-3xl font-bold text-gray-900 mb-8">Create New Post</h1>

                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                        {/* Title */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Title *
                            </label>
                            <input
                                {...register('title', { required: 'Title is required' })}
                                type="text"
                                className="input"
                                placeholder="Enter post title"
                            />
                            {errors.title && (
                                <p className="mt-1 text-sm text-red-600">{errors.title.message}</p>
                            )}
                        </div>

                        {/* Content */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Content *
                            </label>
                            <textarea
                                {...register('content', { required: 'Content is required' })}
                                rows={12}
                                className="input"
                                placeholder="Write your post content here..."
                            />
                            {errors.content && (
                                <p className="mt-1 text-sm text-red-600">{errors.content.message}</p>
                            )}
                        </div>

                        {/* Excerpt */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Excerpt
                            </label>
                            <textarea
                                {...register('excerpt')}
                                rows={3}
                                className="input"
                                placeholder="Brief description of your post (optional)"
                            />
                        </div>

                        {/* Category */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Category *
                            </label>
                            <select
                                {...register('category', { required: 'Category is required' })}
                                className="input"
                            >
                                <option value="">Select a category</option>
                                {categoriesData?.data?.categories?.map((category) => (
                                    <option key={category._id} value={category._id}>
                                        {category.name}
                                    </option>
                                ))}
                            </select>
                            {errors.category && (
                                <p className="mt-1 text-sm text-red-600">{errors.category.message}</p>
                            )}
                        </div>

                        {/* Tags */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Tags
                            </label>
                            <input
                                {...register('tags')}
                                type="text"
                                className="input"
                                placeholder="Enter tags separated by commas (e.g., react, javascript, web)"
                            />
                        </div>

                        {/* Featured Image */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Featured Image
                            </label>
                            <input
                                {...register('featuredImage')}
                                type="file"
                                accept="image/*"
                                className="input"
                            />
                        </div>

                        {/* Publish */}
                        <div className="flex items-center">
                            <input
                                {...register('isPublished')}
                                type="checkbox"
                                className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                            />
                            <label className="ml-2 block text-sm text-gray-900">
                                Publish immediately
                            </label>
                        </div>

                        {/* Actions */}
                        <div className="flex justify-end space-x-4">
                            <button
                                type="button"
                                onClick={() => navigate('/dashboard')}
                                className="btn btn-secondary"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                disabled={isLoading}
                                className="btn btn-primary"
                            >
                                {isLoading ? (
                                    <div className="flex items-center">
                                        <LoadingSpinner size="small" className="mr-2" />
                                        Creating...
                                    </div>
                                ) : (
                                    'Create Post'
                                )}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default CreatePost;