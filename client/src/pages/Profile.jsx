import React from 'react';
import { useAuth } from '../context/AuthContext';
import { User, Mail, Calendar } from 'lucide-react';

const Profile = () => {
    const { user } = useAuth();

    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="bg-white rounded-lg shadow-md overflow-hidden">
                    {/* Header */}
                    <div className="bg-gradient-to-r from-primary-600 to-primary-700 px-8 py-12">
                        <div className="flex items-center space-x-6">
                            <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center">
                                <User className="h-12 w-12 text-primary-600" />
                            </div>
                            <div className="text-white">
                                <h1 className="text-3xl font-bold">{user?.name}</h1>
                                <p className="text-primary-100 mt-2">{user?.bio || 'No bio available'}</p>
                            </div>
                        </div>
                    </div>

                    {/* Content */}
                    <div className="p-8">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {/* Profile Information */}
                            <div>
                                <h2 className="text-xl font-semibold text-gray-900 mb-6">Profile Information</h2>
                                <div className="space-y-4">
                                    <div className="flex items-center space-x-3">
                                        <User className="h-5 w-5 text-gray-400" />
                                        <div>
                                            <p className="text-sm text-gray-500">Name</p>
                                            <p className="text-gray-900">{user?.name}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center space-x-3">
                                        <Mail className="h-5 w-5 text-gray-400" />
                                        <div>
                                            <p className="text-sm text-gray-500">Email</p>
                                            <p className="text-gray-900">{user?.email}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center space-x-3">
                                        <Calendar className="h-5 w-5 text-gray-400" />
                                        <div>
                                            <p className="text-sm text-gray-500">Member since</p>
                                            <p className="text-gray-900">
                                                {new Date(user?.createdAt || Date.now()).toLocaleDateString()}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Quick Actions */}
                            <div>
                                <h2 className="text-xl font-semibold text-gray-900 mb-6">Quick Actions</h2>
                                <div className="space-y-3">
                                    <button className="w-full text-left p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                                        <h3 className="font-medium text-gray-900">Edit Profile</h3>
                                        <p className="text-sm text-gray-600">Update your personal information</p>
                                    </button>
                                    <button className="w-full text-left p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                                        <h3 className="font-medium text-gray-900">Change Password</h3>
                                        <p className="text-sm text-gray-600">Update your account password</p>
                                    </button>
                                    <button className="w-full text-left p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                                        <h3 className="font-medium text-gray-900">Account Settings</h3>
                                        <p className="text-sm text-gray-600">Manage your account preferences</p>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;