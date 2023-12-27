// Assuming you have a Post model
const Post = require('../models/postModel');

// Middleware to increment post views count
const postCount = async (req, res, next) => {
    const postId = req.params.postId;

    // Check if the post exists in the database
    const post = await Post.findById(postId);

    if (!post) {
        return res.status(404).json({ message: 'Post not found' });
    }

    // Increment post views count
    post.postViews++;

    // Save the updated post to the database
    await post.save();

    // Continue to the next middleware or route handler
    next();
};

module.exports = postCount