import express from 'express';
import {
  addComment,
  deleteComment,
  getCommentsByBlogId,
  editComment
} from '../controller/comment.controller.js';

import { verifyToken } from '../middleware/auth.middleware.js';

const router = express.Router();

// Protected routes
router.post('/', verifyToken, addComment);
router.delete('/:id', verifyToken, deleteComment);
router.put('/:id', verifyToken, editComment);

// Public route to get comments for a blog
router.get('/blog/:blogId', getCommentsByBlogId);

export default router;

