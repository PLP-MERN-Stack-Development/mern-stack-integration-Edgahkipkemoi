// Validation middleware using express-validator-like approach

export const validatePost = (req, res, next) => {
    const { title, content, category } = req.body;
    const errors = [];

    if (!title || title.trim().length === 0) {
        errors.push('Title is required');
    } else if (title.length > 100) {
        errors.push('Title cannot be more than 100 characters');
    }

    if (!content || content.trim().length === 0) {
        errors.push('Content is required');
    }

    if (!category) {
        errors.push('Category is required');
    }

    if (errors.length > 0) {
        return res.status(400).json({
            success: false,
            error: 'Validation failed',
            details: errors,
        });
    }

    next();
};

export const validateCategory = (req, res, next) => {
    const { name } = req.body;
    const errors = [];

    if (!name || name.trim().length === 0) {
        errors.push('Category name is required');
    } else if (name.length > 50) {
        errors.push('Category name cannot be more than 50 characters');
    }

    if (errors.length > 0) {
        return res.status(400).json({
            success: false,
            error: 'Validation failed',
            details: errors,
        });
    }

    next();
};

export const validateUser = (req, res, next) => {
    const { name, email, password } = req.body;
    const errors = [];

    if (!name || name.trim().length === 0) {
        errors.push('Name is required');
    } else if (name.length > 50) {
        errors.push('Name cannot be more than 50 characters');
    }

    if (!email || email.trim().length === 0) {
        errors.push('Email is required');
    } else if (!/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
        errors.push('Please provide a valid email');
    }

    if (!password || password.length < 6) {
        errors.push('Password must be at least 6 characters');
    }

    if (errors.length > 0) {
        return res.status(400).json({
            success: false,
            error: 'Validation failed',
            details: errors,
        });
    }

    next();
};

export const validateComment = (req, res, next) => {
    const { content } = req.body;
    const errors = [];

    if (!content || content.trim().length === 0) {
        errors.push('Comment content is required');
    } else if (content.length > 1000) {
        errors.push('Comment cannot be more than 1000 characters');
    }

    if (errors.length > 0) {
        return res.status(400).json({
            success: false,
            error: 'Validation failed',
            details: errors,
        });
    }

    next();
};