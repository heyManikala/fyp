import Blog from '../model/blog.model.js';
import User from '../model/user.model.js';

// Create a new blog (consultants only)
export const createBlog = async (req, res) => {
    try {
        const userId = req.user.id;

        const user = await User.findById(userId);
        if (!user) return res.status(404).json({ message: 'User not found' });

        if (user.role !== 'consultant') {
            return res.status(403).json({ message: 'Only consultants can post blogs' });
        }

        const { title, content } = req.body;
        if (!title || !content) {
            return res.status(400).json({ message: 'Title and content are required' });
        }

        const blog = new Blog({ title, content, author: userId });
        await blog.save();

        res.status(201).json({ message: 'Blog created successfully', blog });
    } catch (error) {
        console.error('Create blog error:', error);
        res.status(500).json({ message: 'Failed to create blog' });
    }
};

// Get all blogs
export const getAllBlogs = async (req, res) => {
    try {
        const blogs = await Blog.find()
            .populate('author', 'name email role')
            .sort({ createdAt: -1 });

        res.status(200).json(blogs);
    } catch (error) {
        console.error('Get blogs error:', error);
        res.status(500).json({ message: 'Failed to fetch blogs' });
    }
};

// Update a blog by ID
export const updateBlog = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, content } = req.body;

        const blog = await Blog.findById(id);
        if (!blog) return res.status(404).json({ message: 'Blog not found' });

        // Optional: Only allow the author to update their blog
        if (blog.author.toString() !== req.user.id) {
            return res.status(403).json({ message: 'You are not authorized to update this blog' });
        }

        blog.title = title || blog.title;
        blog.content = content || blog.content;

        await blog.save();
        res.status(200).json({ message: 'Blog updated successfully', blog });
    } catch (error) {
        console.error('Update blog error:', error);
        res.status(500).json({ message: 'Failed to update blog' });
    }
};

// Delete a blog by ID
export const deleteBlog = async (req, res) => {
    try {
        const { id } = req.params;

        const blog = await Blog.findById(id);
        if (!blog) return res.status(404).json({ message: 'Blog not found' });

        // Optional: Only allow the author to delete their blog
        if (blog.author.toString() !== req.user.id) {
            return res.status(403).json({ message: 'You are not authorized to delete this blog' });
        }

        await blog.deleteOne();
        res.status(200).json({ message: 'Blog deleted successfully' });
    } catch (error) {
        console.error('Delete blog error:', error);
        res.status(500).json({ message: 'Failed to delete blog' });
    }
};
