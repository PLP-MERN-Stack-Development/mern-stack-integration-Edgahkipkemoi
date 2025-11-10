import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { authService } from '../services/api';

const AuthContext = createContext();

const initialState = {
    user: null,
    token: null,
    isAuthenticated: false,
    loading: true,
};

const authReducer = (state, action) => {
    switch (action.type) {
        case 'LOGIN_SUCCESS':
            return {
                ...state,
                user: action.payload.user,
                token: action.payload.token,
                isAuthenticated: true,
                loading: false,
            };
        case 'LOGOUT':
            return {
                ...state,
                user: null,
                token: null,
                isAuthenticated: false,
                loading: false,
            };
        case 'SET_LOADING':
            return {
                ...state,
                loading: action.payload,
            };
        case 'UPDATE_USER':
            return {
                ...state,
                user: { ...state.user, ...action.payload },
            };
        default:
            return state;
    }
};

export const AuthProvider = ({ children }) => {
    const [state, dispatch] = useReducer(authReducer, initialState);

    useEffect(() => {
        // Check if user is logged in on app start
        const token = localStorage.getItem('token');
        const user = authService.getCurrentUser();

        if (token && user) {
            dispatch({
                type: 'LOGIN_SUCCESS',
                payload: { user, token },
            });
        } else {
            dispatch({ type: 'SET_LOADING', payload: false });
        }
    }, []);

    const login = async (credentials) => {
        try {
            const response = await authService.login(credentials);
            if (response.success) {
                dispatch({
                    type: 'LOGIN_SUCCESS',
                    payload: response.data,
                });
                return { success: true };
            }
            return { success: false, error: response.error };
        } catch (error) {
            return {
                success: false,
                error: error.response?.data?.error || 'Login failed'
            };
        }
    };

    const register = async (userData) => {
        try {
            const response = await authService.register(userData);
            if (response.success) {
                dispatch({
                    type: 'LOGIN_SUCCESS',
                    payload: response.data,
                });
                return { success: true };
            }
            return { success: false, error: response.error };
        } catch (error) {
            return {
                success: false,
                error: error.response?.data?.error || 'Registration failed'
            };
        }
    };

    const logout = () => {
        authService.logout();
        dispatch({ type: 'LOGOUT' });
    };

    const updateUser = (userData) => {
        dispatch({ type: 'UPDATE_USER', payload: userData });
        localStorage.setItem('user', JSON.stringify({ ...state.user, ...userData }));
    };

    const value = {
        ...state,
        login,
        register,
        logout,
        updateUser,
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};