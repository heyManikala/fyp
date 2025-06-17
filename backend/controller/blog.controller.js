import Blog from '../model/blog.model.js';
import User from '../model/user.model.js';

export const createBlog = async (req, res) => {
    try {
        const userId = req.user.id; // Assumes JWT middleware sets req.user
        const user = await User.findById(userId);

        if (user.role !== 'consultant') {
            return res.status(403).json({ message: 'Only consultants can post blogs' });
        }

        const { title, content } = req.body;
        const blog = new Blog({ title, content, author: userId });
        await blog.save();

        res.status(201).json({ message: 'Blog created successfully', blog });
    } catch (error) {
        res.status(500).json({ message: 'Failed to create blog' });
    }
};

export const getAllBlogs = async (req, res) => {
    try {
        const blogs = await Blog.find().populate('author', 'name email');
        res.json(blogs);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch blogs' });
    }
};

export const updateBlog = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, content } = req.body;
        const blog = await Blog.findByIdAndUpdate(id, { title, content }, { new: true });

        if (!blog) return res.status(404).json({ message: 'Blog not found' });

        res.json({ message: 'Blog updated', blog });
    } catch (error) {
        res.status(500).json({ message: 'Failed to update blog' });
    }
};

export const deleteBlog = async (req, res) => {
    try {
        const { id } = req.params;
        const blog = await Blog.findByIdAndDelete(id);

        if (!blog) return res.status(404).json({ message: 'Blog not found' });

        res.json({ message: 'Blog deleted' });
    } catch (error) {
        res.status(500).json({ message: 'Failed to delete blog' });
    }
};
