import mongoose from 'mongoose';

const CategorySchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'Please provide a category name'],
            unique: true,
            trim: true,
            maxlength: [50, 'Category name cannot be more than 50 characters'],
        },
        description: {
            type: String,
            maxlength: [200, 'Description cannot be more than 200 characters'],
        },
        slug: {
            type: String,
            required: true,
            unique: true,
        },
        color: {
            type: String,
            default: '#3B82F6',
            match: [/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/, 'Please provide a valid hex color'],
        },
        postCount: {
            type: Number,
            default: 0,
        },
    },
    { timestamps: true }
);

// Create slug from name before saving
CategorySchema.pre('save', function (next) {
    if (!this.isModified('name')) {
        return next();
    }

    this.slug = this.name
        .toLowerCase()
        .replace(/[^\w ]+/g, '')
        .replace(/ +/g, '-');

    next();
});

// Virtual for category URL
CategorySchema.virtual('url').get(function () {
    return `/categories/${this.slug}`;
});

export default mongoose.model('Category', CategorySchema);