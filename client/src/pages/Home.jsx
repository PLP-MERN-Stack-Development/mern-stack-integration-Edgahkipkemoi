import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { usePosts } from '../hooks/usePosts';
import { useCategories } from '../hooks/useCategories';
import PostCard from '../components/posts/PostCard';
import LoadingSpinner from '../components/common/LoadingSpinner';
import Pagination from '../components/common/Pagination';
import { Search, Filter } from 'lucide-react';

const Home = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const [filters, setFilters] = useState({
        page: parseInt(searchParams.get('page')) || 1,
        search: searchParams.get('search') || '',
        category: searchParams.get('category') || '',
        sortBy: searchParams.get('sortBy') || 'createdAt',
        sortOrder: searchParams.get('sortOrder') || 'desc',
    });

    const { data: postsData, isLoading: postsLoading, error: postsError } = usePosts(filters);
    const { data: categoriesData, isLoading: categoriesLoading } = useCategories();

    // Update URL when filters change
    useEffect(() => {
        const params = new URLSearchParams();
        Object.entries(filters).forEach(([key, value]) => {
            if (value) params.set(key, value);
        });
        setSearchParams(params);
    }, [filters, setSearchParams]);

    const handleFilterChange = (key, value) => {
        setFilters(prev => ({
            ...prev,
            [key]: value,
            page: key !== 'page' ? 1 : value, // Reset to page 1 when other filters change
        }));
    };

    const handlePageChange = (page) => {
        handleFilterChange('page', page);
    };

    if (postsError) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">Something went wrong</h2>
                    <p className="text-gray-600">{postsError.message}</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Hero Section */}
            <div className="bg-gradient-to-r from-primary-600 to-primary-700 text-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                    <div className="text-center">
                        <h1 className="text-4xl md:text-6xl font-bold mb-4">
                            Welcome to MERN Blog
                        </h1>
                        <p className="text-xl md:text-2xl text-primary-100 mb-8">
                            Discover amazing stories, share your thoughts, and connect with writers
                        </p>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Main content */}
                    <div className="flex-1">
                        {/* Filters */}
                        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
                            <div className="flex flex-col md:flex-row gap-4">
                                {/* Search */}
                                <div className="flex-1">
                                    <div className="relative">
                                        <input
                                            type="text"
                                            placeholder="Search posts..."
                                            value={filters.search}
                                            onChange={(e) => handleFilterChange('search', e.target.value)}
                                            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                                        />
                                        <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                                    </div>
                                </div>

                                {/* Category filter */}
                                <div className="md:w-48">
                                    <select
                                        value={filters.category}
                                        onChange={(e) => handleFilterChange('category', e.target.value)}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                                    >
                                        <option value="">All Categories</option>
                                        {categoriesData?.data?.categories?.map((category) => (
                                            <option key={category._id} value={category.slug}>
                                                {category.name}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                {/* Sort */}
                                <div className="md:w-48">
                                    <select
                                        value={`${filters.sortBy}-${filters.sortOrder}`}
                                        onChange={(e) => {
                                            const [sortBy, sortOrder] = e.target.value.split('-');
                                            handleFilterChange('sortBy', sortBy);
                                            handleFilterChange('sortOrder', sortOrder);
                                        }}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                                    >
                                        <option value="createdAt-desc">Newest First</option>
                                        <option value="createdAt-asc">Oldest First</option>
                                        <option value="title-asc">Title A-Z</option>
                                        <option value="title-desc">Title Z-A</option>
                                        <option value="viewCount-desc">Most Popular</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        {/* Posts */}
                        {postsLoading ? (
                            <div className="flex justify-center py-12">
                                <LoadingSpinner size="large" />
                            </div>
                        ) : postsData?.data?.posts?.length > 0 ? (
                            <>
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                                    {postsData.data.posts.map((post) => (
                                        <PostCard key={post._id} post={post} />
                                    ))}
                                </div>

                                {/* Pagination */}
                                {postsData.data.pagination.pages > 1 && (
                                    <Pagination
                                        currentPage={postsData.data.pagination.page}
                                        totalPages={postsData.data.pagination.pages}
                                        onPageChange={handlePageChange}
                                    />
                                )}
                            </>
                        ) : (
                            <div className="text-center py-12">
                                <div className="text-gray-400 mb-4">
                                    <Filter className="h-16 w-16 mx-auto" />
                                </div>
                                <h3 className="text-xl font-semibold text-gray-900 mb-2">No posts found</h3>
                                <p className="text-gray-600">
                                    {filters.search || filters.category
                                        ? 'Try adjusting your search criteria'
                                        : 'Be the first to create a post!'}
                                </p>
                            </div>
                        )}
                    </div>

                    {/* Sidebar */}
                    <div className="lg:w-80">
                        {/* Categories */}
                        {!categoriesLoading && categoriesData?.data?.categories?.length > 0 && (
                            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                                <h3 className="text-lg font-semibold text-gray-900 mb-4">Categories</h3>
                                <div className="space-y-2">
                                    {categoriesData.data.categories.map((category) => (
                                        <button
                                            key={category._id}
                                            onClick={() => handleFilterChange('category',
                                                filters.category === category.slug ? '' : category.slug
                                            )}
                                            className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${filters.category === category.slug
                                                    ? 'bg-primary-100 text-primary-700'
                                                    : 'hover:bg-gray-100 text-gray-700'
                                                }`}
                                        >
                                            <div className="flex items-center justify-between">
                                                <span>{category.name}</span>
                                                <span className="text-sm text-gray-500">
                                                    {category.postCount}
                                                </span>
                                            </div>
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Recent activity or featured content could go here */}
                        <div className="bg-white rounded-lg shadow-md p-6">
                            <h3 className="text-lg font-semibold text-gray-900 mb-4">About</h3>
                            <p className="text-gray-600 text-sm">
                                Welcome to our MERN stack blog! This platform demonstrates modern web development
                                with React, Node.js, Express, and MongoDB. Share your stories and connect with
                                other writers.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;