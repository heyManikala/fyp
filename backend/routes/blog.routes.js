import express from 'express';
import { createBlog, getAllBlogs, updateBlog, deleteBlog } from '../controller/blog.controller.js';
import { verifyToken } from '../middleware/auth.middleware.js';

const router = express.Router();

router.post('/', verifyToken, createBlog);
router.get('/', getAllBlogs);
router.put('/:id', verifyToken, updateBlog);
router.delete('/:id', verifyToken, deleteBlog);

export default router;
