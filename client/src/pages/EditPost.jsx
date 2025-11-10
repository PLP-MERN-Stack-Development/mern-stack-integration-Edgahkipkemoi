import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { usePost, useUpdatePost } from '../hooks/usePosts';
import { useCategories } from '../hooks/useCategories';
import LoadingSpinner from '../components/common/LoadingSpinner';
import toast from 'react-hot-toast';

const EditPost = () => {
    const { id } = useParams();
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const { data: postData, isLoading: postLoading } = usePost(id);
    const updatePostMutation = useUpdatePost();
    const { data: categoriesData } = useCategories();

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm();

    // Reset form when post data is loaded
    useEffect(() => {
        if (postData?.data?.post) {
            const post = postData.data.post;
            reset({
                title: post.title,
                content: post.content,
                excerpt: post.excerpt,
                category: post.category._id,
                tags: post.tags?.join(', '),
                isPublished: post.isPublished,
            });
        }
    }, [postData, reset]);

    const onSubmit = async (data) => {
        setIsLoading(true);
        try {
            await updatePostMutation.mutateAsync({ id, data });
            navigate('/dashboard');
        } catch (error) {
            toast.error('Failed to update post');
        } finally {
            setIsLoading(false);
        }
    };

    if (postLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <LoadingSpinner size="large" />
            </div>
        );
    }

    const post = postData?.data?.post;

    if (!post) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">Post not found</h2>
                    <p className="text-gray-600">The post you're trying to edit doesn't exist.</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="bg-white rounded-lg shadow-md p-8">
                    <h1 className="text-3xl font-bold text-gray-900 mb-8">Edit Post</h1>

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
                            {post.featuredImage && (
                                <div className="mt-2">
                                    <p className="text-sm text-gray-600">Current image:</p>
                                    <img
                                        src={`/uploads/${post.featuredImage}`}
                                        alt="Current featured"
                                        className="mt-1 h-20 w-32 object-cover rounded"
                                    />
                                </div>
                            )}
                        </div>

                        {/* Publish */}
                        <div className="flex items-center">
                            <input
                                {...register('isPublished')}
                                type="checkbox"
                                className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                            />
                            <label className="ml-2 block text-sm text-gray-900">
                                Published
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
                                        Updating...
                                    </div>
                                ) : (
                                    'Update Post'
                                )}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default EditPost;