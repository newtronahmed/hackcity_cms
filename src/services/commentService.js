const Comment = require('../models/commentModel'); 

class CommentService {
  // List all comments
  async getAllComments() {
    try {
      const categories = await Comment.find({});
    //   console.log(categories.length)
      return categories;
    } catch (error) {
      throw error;
    }
  }
  // Create a new comment
  async createNewComment(comment) {

    try {
      const newComment = new Comment(comment);

      const savedComment = await newComment.save();
      return savedComment;
    } catch (error) {
      throw error;
    }
  }
  async getOneComment(commentId) {
    try {
      const comment = await Comment.findById(commentId)
      return comment
    } catch (error) {
      throw error
    }
  }

  // Delete a comment by ID
  async deleteComment(commentId) {
    try {
      console.log(commentId)
      const deletedComment = await Comment.findByIdAndDelete(commentId);
      // if (!deletedcomment) {
      //   throw new Error("comment not found")
      // }

      return deletedComment;
    } catch (error) {
      throw error;
    }
  }

  // Edit a comment by ID
  async editComment(commentId, updatedData) {
    try {
      const editedComment = await Comment.findByIdAndUpdate(commentId, updatedData, {
        new: true, // Return the modified document rather than the original
        runValidators: true, // Run model validation on update
      });

      if (!editedComment) {
        throw new Error('comment not found');
      }

      return editedComment;
    } catch (error) {
      throw error;
    }
  }

  
}

module.exports = new CommentService();