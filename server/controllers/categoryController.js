import Category from '../models/Category.js';

// @desc    Get all categories
// @route   GET /api/categories
// @access  Public
export const getCategories = async (req, res) => {
    try {
        const categories = await Category.find().sort({ name: 1 });

        res.status(200).json({
            success: true,
            data: { categories },
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message,
        });
    }
};

// @desc    Get single category
// @route   GET /api/categories/:id
// @access  Public
export const getCategory = async (req, res) => {
    try {
        const category = await Category.findById(req.params.id);

        if (!category) {
            return res.status(404).json({
                success: false,
                error: 'Category not found',
            });
        }

        res.status(200).json({
            success: true,
            data: { category },
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message,
        });
    }
};

// @desc    Create new category
// @route   POST /api/categories
// @access  Private (Admin only)
export const createCategory = async (req, res) => {
    try {
        const { name, description, color } = req.body;

        // Check if category already exists
        const existingCategory = await Category.findOne({ name });
        if (existingCategory) {
            return res.status(400).json({
                success: false,
                error: 'Category with this name already exists',
            });
        }

        const category = await Category.create({
            name,
            description,
            color: color || '#3B82F6',
        });

        res.status(201).json({
            success: true,
            data: { category },
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message,
        });
    }
};

// @desc    Update category
// @route   PUT /api/categories/:id
// @access  Private (Admin only)
export const updateCategory = async (req, res) => {
    try {
        const { name, description, color } = req.body;

        let category = await Category.findById(req.params.id);

        if (!category) {
            return res.status(404).json({
                success: false,
                error: 'Category not found',
            });
        }

        // Check if new name already exists (excluding current category)
        if (name && name !== category.name) {
            const existingCategory = await Category.findOne({
                name,
                _id: { $ne: req.params.id }
            });
            if (existingCategory) {
                return res.status(400).json({
                    success: false,
                    error: 'Category with this name already exists',
                });
            }
        }

        category = await Category.findByIdAndUpdate(
            req.params.id,
            { name, description, color },
            { new: true, runValidators: true }
        );

        res.status(200).json({
            success: true,
            data: { category },
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message,
        });
    }
};

// @desc    Delete category
// @route   DELETE /api/categories/:id
// @access  Private (Admin only)
export const deleteCategory = async (req, res) => {
    try {
        const category = await Category.findById(req.params.id);

        if (!category) {
            return res.status(404).json({
                success: false,
                error: 'Category not found',
            });
        }

        // Check if category has posts
        if (category.postCount > 0) {
            return res.status(400).json({
                success: false,
                error: 'Cannot delete category that has posts. Please reassign or delete posts first.',
            });
        }

        await Category.findByIdAndDelete(req.params.id);

        res.status(200).json({
            success: true,
            data: { message: 'Category deleted successfully' },
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message,
        });
    }
};