import Comment from '../model/comment.model.js';

// Add a new comment
export const addComment = async (req, res) => {
  const { blogId, comment } = req.body;

  if (!blogId || !comment) {
    return res.status(400).json({ message: 'Blog ID and comment are required' });
  }

  try {
    const newComment = new Comment({
      blogId,
      userId: req.user.id,
      comment
    });

    const savedComment = await newComment.save();
    res.status(201).json(savedComment);
  } catch (err) {
    res.status(500).json({ message: 'Failed to add comment' });
  }
};

// Get all comments for a blog
export const getCommentsByBlogId = async (req, res) => {
  try {
    const blogId = req.params.blogId;
    const comments = await Comment.find({ blogId }).populate('userId', 'username email');
    res.status(200).json(comments);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching comments' });
  }
};

// Delete a comment
export const deleteComment = async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.id);
    if (!comment) return res.status(404).json({ message: 'Comment not found' });

    if (comment.userId.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Unauthorized' });
    }

    await Comment.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Comment deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting comment' });
  }
};

// Edit a comment (optional)
export const editComment = async (req, res) => {
  const { comment } = req.body;
  if (!comment) {
    return res.status(400).json({ message: 'Comment text is required' });
  }

  try {
    const existingComment = await Comment.findById(req.params.id);
    if (!existingComment) return res.status(404).json({ message: 'Comment not found' });

    if (existingComment.userId.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Unauthorized' });
    }

    existingComment.comment = comment;
    await existingComment.save();

    res.status(200).json({ message: 'Comment updated', comment: existingComment });
  } catch (err) {
    res.status(500).json({ message: 'Error editing comment' });
  }
};
