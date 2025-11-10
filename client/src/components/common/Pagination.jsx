import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
    const getPageNumbers = () => {
        const pages = [];
        const maxVisiblePages = 5;

        if (totalPages <= maxVisiblePages) {
            for (let i = 1; i <= totalPages; i++) {
                pages.push(i);
            }
        } else {
            if (currentPage <= 3) {
                for (let i = 1; i <= 4; i++) {
                    pages.push(i);
                }
                pages.push('...');
                pages.push(totalPages);
            } else if (currentPage >= totalPages - 2) {
                pages.push(1);
                pages.push('...');
                for (let i = totalPages - 3; i <= totalPages; i++) {
                    pages.push(i);
                }
            } else {
                pages.push(1);
                pages.push('...');
                for (let i = currentPage - 1; i <= currentPage + 1; i++) {
                    pages.push(i);
                }
                pages.push('...');
                pages.push(totalPages);
            }
        }

        return pages;
    };

    const handlePageClick = (page) => {
        if (page !== '...' && page !== currentPage) {
            onPageChange(page);
        }
    };

    const handlePrevious = () => {
        if (currentPage > 1) {
            onPageChange(currentPage - 1);
        }
    };

    const handleNext = () => {
        if (currentPage < totalPages) {
            onPageChange(currentPage + 1);
        }
    };

    if (totalPages <= 1) return null;

    return (
        <div className="flex items-center justify-center space-x-2">
            {/* Previous button */}
            <button
                onClick={handlePrevious}
                disabled={currentPage === 1}
                className={`flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-colors ${currentPage === 1
                        ? 'text-gray-400 cursor-not-allowed'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
            >
                <ChevronLeft className="h-4 w-4 mr-1" />
                Previous
            </button>

            {/* Page numbers */}
            <div className="flex items-center space-x-1">
                {getPageNumbers().map((page, index) => (
                    <button
                        key={index}
                        onClick={() => handlePageClick(page)}
                        className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${page === currentPage
                                ? 'bg-primary-600 text-white'
                                : page === '...'
                                    ? 'text-gray-400 cursor-default'
                                    : 'text-gray-700 hover:bg-gray-100'
                            }`}
                        disabled={page === '...'}
                    >
                        {page}
                    </button>
                ))}
            </div>

            {/* Next button */}
            <button
                onClick={handleNext}
                disabled={currentPage === totalPages}
                className={`flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-colors ${currentPage === totalPages
                        ? 'text-gray-400 cursor-not-allowed'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
            >
                Next
                <ChevronRight className="h-4 w-4 ml-1" />
            </button>
        </div>
    );
};

export default Pagination;