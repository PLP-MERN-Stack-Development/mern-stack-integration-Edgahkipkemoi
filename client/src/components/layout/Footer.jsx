import React from 'react';
import { Link } from 'react-router-dom';
import { Github, Twitter, Linkedin, Mail } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="bg-gray-900 text-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    {/* Brand section */}
                    <div className="col-span-1 md:col-span-2">
                        <div className="flex items-center space-x-2 mb-4">
                            <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center">
                                <span className="text-white font-bold text-lg">B</span>
                            </div>
                            <span className="text-xl font-bold">MERN Blog</span>
                        </div>
                        <p className="text-gray-400 mb-4 max-w-md">
                            A modern blog platform built with MongoDB, Express.js, React, and Node.js.
                            Share your thoughts, connect with others, and explore amazing content.
                        </p>
                        <div className="flex space-x-4">
                            <a
                                href="https://github.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-gray-400 hover:text-white transition-colors"
                            >
                                <Github className="h-5 w-5" />
                            </a>
                            <a
                                href="https://twitter.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-gray-400 hover:text-white transition-colors"
                            >
                                <Twitter className="h-5 w-5" />
                            </a>
                            <a
                                href="https://linkedin.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-gray-400 hover:text-white transition-colors"
                            >
                                <Linkedin className="h-5 w-5" />
                            </a>
                            <a
                                href="mailto:contact@mernblog.com"
                                className="text-gray-400 hover:text-white transition-colors"
                            >
                                <Mail className="h-5 w-5" />
                            </a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
                        <ul className="space-y-2">
                            <li>
                                <Link to="/" className="text-gray-400 hover:text-white transition-colors">
                                    Home
                                </Link>
                            </li>
                            <li>
                                <Link to="/about" className="text-gray-400 hover:text-white transition-colors">
                                    About
                                </Link>
                            </li>
                            <li>
                                <Link to="/contact" className="text-gray-400 hover:text-white transition-colors">
                                    Contact
                                </Link>
                            </li>
                            <li>
                                <Link to="/privacy" className="text-gray-400 hover:text-white transition-colors">
                                    Privacy Policy
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Categories */}
                    <div>
                        <h3 className="text-lg font-semibold mb-4">Categories</h3>
                        <ul className="space-y-2">
                            <li>
                                <Link to="/?category=technology" className="text-gray-400 hover:text-white transition-colors">
                                    Technology
                                </Link>
                            </li>
                            <li>
                                <Link to="/?category=lifestyle" className="text-gray-400 hover:text-white transition-colors">
                                    Lifestyle
                                </Link>
                            </li>
                            <li>
                                <Link to="/?category=travel" className="text-gray-400 hover:text-white transition-colors">
                                    Travel
                                </Link>
                            </li>
                            <li>
                                <Link to="/?category=food" className="text-gray-400 hover:text-white transition-colors">
                                    Food
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Bottom section */}
                <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
                    <p className="text-gray-400 text-sm">
                        © {new Date().getFullYear()} MERN Blog. All rights reserved.
                    </p>
                    <div className="flex space-x-6 mt-4 md:mt-0">
                        <Link to="/terms" className="text-gray-400 hover:text-white text-sm transition-colors">
                            Terms of Service
                        </Link>
                        <Link to="/privacy" className="text-gray-400 hover:text-white text-sm transition-colors">
                            Privacy Policy
                        </Link>
                        <Link to="/cookies" className="text-gray-400 hover:text-white text-sm transition-colors">
                            Cookie Policy
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;