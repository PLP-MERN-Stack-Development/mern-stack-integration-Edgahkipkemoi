import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, User, Eye, MessageCircle } from 'lucide-react';

const PostCard = ({ post }) => {
    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
        });
    };

    const truncateText = (text, maxLength = 150) => {
        if (text.length <= maxLength) return text;
        return text.substr(0, maxLength) + '...';
    };

    return (
        <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
            {/* Featured Image */}
            <div className="aspect-w-16 aspect-h-9 bg-gray-200">
                <img
                    src={post.featuredImage ? `/uploads/${post.featuredImage}` : '/api/placeholder/400/225'}
                    alt={post.title}
                    className="w-full h-48 object-cover"
                    onError={(e) => {
                        e.target.src = '/api/placeholder/400/225';
                    }}
                />
            </div>

            <div className="p-6">
                {/* Category */}
                {post.category && (
                    <div className="mb-3">
                        <span
                            className="inline-block px-3 py-1 text-xs font-semibold rounded-full text-white"
                            style={{ backgroundColor: post.category.color || '#3B82F6' }}
                        >
                            {post.category.name}
                        </span>
                    </div>
                )}

                {/* Title */}
                <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2">
                    <Link
                        to={`/posts/${post._id}`}
                        className="hover:text-primary-600 transition-colors"
                    >
                        {post.title}
                    </Link>
                </h3>

                {/* Excerpt */}
                <p className="text-gray-600 mb-4 line-clamp-3">
                    {post.excerpt || truncateText(post.content)}
                </p>

                {/* Meta information */}
                <div className="flex items-center justify-between text-sm text-gray-500">
                    <div className="flex items-center space-x-4">
                        {/* Author */}
                        <div className="flex items-center space-x-1">
                            <User className="h-4 w-4" />
                            <span>{post.author?.name || 'Anonymous'}</span>
                        </div>

                        {/* Date */}
                        <div className="flex items-center space-x-1">
                            <Calendar className="h-4 w-4" />
                            <span>{formatDate(post.createdAt)}</span>
                        </div>
                    </div>

                    <div className="flex items-center space-x-3">
                        {/* View count */}
                        <div className="flex items-center space-x-1">
                            <Eye className="h-4 w-4" />
                            <span>{post.viewCount || 0}</span>
                        </div>

                        {/* Comment count */}
                        <div className="flex items-center space-x-1">
                            <MessageCircle className="h-4 w-4" />
                            <span>{post.comments?.length || 0}</span>
                        </div>
                    </div>
                </div>

                {/* Tags */}
                {post.tags && post.tags.length > 0 && (
                    <div className="mt-4 flex flex-wrap gap-2">
                        {post.tags.slice(0, 3).map((tag, index) => (
                            <span
                                key={index}
                                className="inline-block px-2 py-1 text-xs bg-gray-100 text-gray-600 rounded-md"
                            >
                                #{tag}
                            </span>
                        ))}
                        {post.tags.length > 3 && (
                            <span className="inline-block px-2 py-1 text-xs bg-gray-100 text-gray-600 rounded-md">
                                +{post.tags.length - 3} more
                            </span>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default PostCard;