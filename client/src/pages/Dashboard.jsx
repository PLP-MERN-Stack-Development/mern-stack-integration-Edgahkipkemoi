import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { usePostsByUser, useDeletePost } from '../hooks/usePosts';
import { PlusCircle, Edit, Trash2, Eye, Calendar } from 'lucide-react';
import LoadingSpinner from '../components/common/LoadingSpinner';
import toast from 'react-hot-toast';

const Dashboard = () => {
    const { user } = useAuth();
    const { data: postsData, isLoading } = usePostsByUser(user?.id);
    const deletePostMutation = useDeletePost();

    const handleDeletePost = async (postId, postTitle) => {
        if (window.confirm(`Are you sure you want to delete "${postTitle}"? This action cannot be undone.`)) {
            try {
                await deletePostMutation.mutateAsync(postId);
                toast.success('Post deleted successfully');
            } catch (error) {
                toast.error('Failed to delete post');
            }
        }
    };

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
        });
    };

    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="bg-white rounded-lg shadow-md p-6 mb-8">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
                            <p className="text-gray-600 mt-2">Welcome back, {user?.name}!</p>
                        </div>
                        <div className="mt-4 md:mt-0">
                            <Link
                                to="/create-post"
                                className="btn btn-primary flex items-center space-x-2"
                            >
                                <PlusCircle className="h-5 w-5" />
                                <span>Create New Post</span>
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <div className="bg-white rounded-lg shadow-md p-6">
                        <div className="flex items-center">
                            <div className="p-3 bg-primary-100 rounded-lg">
                                <Edit className="h-6 w-6 text-primary-600" />
                            </div>
                            <div className="ml-4">
                                <p className="text-sm text-gray-600">Total Posts</p>
                                <p className="text-2xl font-bold text-gray-900">
                                    {postsData?.data?.pagination?.total || 0}
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-lg shadow-md p-6">
                        <div className="flex items-center">
                            <div className="p-3 bg-green-100 rounded-lg">
                                <Eye className="h-6 w-6 text-green-600" />
                            </div>
                            <div className="ml-4">
                                <p className="text-sm text-gray-600">Total Views</p>
                                <p className="text-2xl font-bold text-gray-900">
                                    {postsData?.data?.posts?.reduce((total, post) => total + (post.viewCount || 0), 0) || 0}
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-lg shadow-md p-6">
                        <div className="flex items-center">
                            <div className="p-3 bg-blue-100 rounded-lg">
                                <Calendar className="h-6 w-6 text-blue-600" />
                            </div>
                            <div className="ml-4">
                                <p className="text-sm text-gray-600">Member Since</p>
                                <p className="text-lg font-semibold text-gray-900">
                                    {formatDate(user?.createdAt || Date.now())}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Posts */}
                <div className="bg-white rounded-lg shadow-md">
                    <div className="p-6 border-b border-gray-200">
                        <h2 className="text-xl font-semibold text-gray-900">Your Posts</h2>
                    </div>

                    {isLoading ? (
                        <div className="p-8 flex justify-center">
                            <LoadingSpinner size="large" />
                        </div>
                    ) : postsData?.data?.posts?.length > 0 ? (
                        <div className="divide-y divide-gray-200">
                            {postsData.data.posts.map((post) => (
                                <div key={post._id} className="p-6 hover:bg-gray-50 transition-colors">
                                    <div className="flex items-center justify-between">
                                        <div className="flex-1">
                                            <div className="flex items-center space-x-3 mb-2">
                                                <h3 className="text-lg font-medium text-gray-900">
                                                    <Link
                                                        to={`/posts/${post._id}`}
                                                        className="hover:text-primary-600 transition-colors"
                                                    >
                                                        {post.title}
                                                    </Link>
                                                </h3>
                                                <span
                                                    className={`px-2 py-1 text-xs font-semibold rounded-full ${post.isPublished
                                                        ? 'bg-green-100 text-green-800'
                                                        : 'bg-yellow-100 text-yellow-800'
                                                        }`}
                                                >
                                                    {post.isPublished ? 'Published' : 'Draft'}
                                                </span>
                                            </div>

                                            <div className="flex items-center space-x-4 text-sm text-gray-600">
                                                <span>{formatDate(post.createdAt)}</span>
                                                <span>{post.viewCount || 0} views</span>
                                                <span>{post.comments?.length || 0} comments</span>
                                                {post.category && (
                                                    <span className="text-primary-600">{post.category.name}</span>
                                                )}
                                            </div>
                                        </div>

                                        <div className="flex items-center space-x-2 ml-4">
                                            <Link
                                                to={`/posts/${post._id}`}
                                                className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
                                                title="View post"
                                            >
                                                <Eye className="h-4 w-4" />
                                            </Link>
                                            <Link
                                                to={`/edit-post/${post._id}`}
                                                className="p-2 text-gray-400 hover:text-primary-600 transition-colors"
                                                title="Edit post"
                                            >
                                                <Edit className="h-4 w-4" />
                                            </Link>
                                            <button
                                                onClick={() => handleDeletePost(post._id, post.title)}
                                                className="p-2 text-gray-400 hover:text-red-600 transition-colors"
                                                title="Delete post"
                                                disabled={deletePostMutation.isLoading}
                                            >
                                                <Trash2 className="h-4 w-4" />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="p-8 text-center">
                            <div className="text-gray-400 mb-4">
                                <Edit className="h-16 w-16 mx-auto" />
                            </div>
                            <h3 className="text-lg font-semibold text-gray-900 mb-2">No posts yet</h3>
                            <p className="text-gray-600 mb-4">
                                You haven't created any posts yet. Start sharing your thoughts!
                            </p>
                            <Link to="/create-post" className="btn btn-primary">
                                Create Your First Post
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Dashboard;