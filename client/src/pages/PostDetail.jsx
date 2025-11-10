import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { usePost } from '../hooks/usePosts';
import { useComments, useCreateComment } from '../hooks/useComments';
import { useAuth } from '../context/AuthContext';
import LoadingSpinner from '../components/common/LoadingSpinner';
import CommentSection from '../components/comments/CommentSection';
import { Calendar, User, Eye, MessageCircle, Edit, Trash2 } from 'lucide-react';

const PostDetail = () => {
    const { id } = useParams();
    const { user, isAuthenticated } = useAuth();
    const { data, isLoading, error } = usePost(id);
    const { data: commentsData, isLoading: commentsLoading } = useComments(id);

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <LoadingSpinner size="large" />
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">Post not found</h2>
                    <p className="text-gray-600">The post you're looking for doesn't exist.</p>
                </div>
            </div>
        );
    }

    const post = data?.data?.post;

    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <article className="bg-white rounded-lg shadow-md overflow-hidden">
                    {/* Featured Image */}
                    {post?.featuredImage && (
                        <div className="aspect-w-16 aspect-h-9">
                            <img
                                src={`/uploads/${post.featuredImage}`}
                                alt={post.title}
                                className="w-full h-64 object-cover"
                                onError={(e) => {
                                    e.target.src = '/api/placeholder/800/400';
                                }}
                            />
                        </div>
                    )}

                    <div className="p-8">
                        {/* Category */}
                        {post?.category && (
                            <div className="mb-4">
                                <span
                                    className="inline-block px-3 py-1 text-sm font-semibold rounded-full text-white"
                                    style={{ backgroundColor: post.category.color || '#3B82F6' }}
                                >
                                    {post.category.name}
                                </span>
                            </div>
                        )}

                        {/* Title */}
                        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                            {post?.title}
                        </h1>

                        {/* Meta */}
                        <div className="flex items-center text-gray-600 mb-8">
                            <span>By {post?.author?.name}</span>
                            <span className="mx-2">•</span>
                            <span>{new Date(post?.createdAt).toLocaleDateString()}</span>
                            <span className="mx-2">•</span>
                            <span>{post?.viewCount || 0} views</span>
                        </div>

                        {/* Content */}
                        <div className="prose max-w-none">
                            <div dangerouslySetInnerHTML={{ __html: post?.content }} />
                        </div>

                        {/* Tags */}
                        {post?.tags && post.tags.length > 0 && (
                            <div className="mt-8 pt-8 border-t border-gray-200">
                                <h3 className="text-lg font-semibold mb-4">Tags</h3>
                                <div className="flex flex-wrap gap-2">
                                    {post.tags.map((tag, index) => (
                                        <span
                                            key={index}
                                            className="inline-block px-3 py-1 text-sm bg-gray-100 text-gray-600 rounded-full"
                                        >
                                            #{tag}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </article>

                {/* Comments Section */}
                <div className="mt-8">
                    <CommentSection
                        postId={id}
                        comments={commentsData?.data?.comments || []}
                        isLoading={commentsLoading}
                        isAuthenticated={isAuthenticated}
                        currentUser={user}
                    />
                </div>
            </div>
        </div>
    );
};

export default PostDetail;