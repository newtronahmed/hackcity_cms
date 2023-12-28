const User = require('../models/userModel')
const Post = require('../models/postModel');
const APIFeatures = require('../utils/APIFeaturs')
class PostService {
  // List all posts
  async getAllPosts(queryStr) {
    try {
      const query = Post.find({}).populate('author');
      // console.log(posts.length)
      const features = await new APIFeatures(query, queryStr)
        .filter()
        .sort()
        .paginate()
        .limitFields()
      const posts = await features._query
      return posts;
    } catch (error) {
      throw error;
    }
  }
  // Create a new post
  async createNewPost(post) {

    try {
      const newPost = new Post(post);

      const savedPost = await newPost.save();
      return savedPost;
    } catch (error) {
      throw error;
    }
  }
  async getOnePost(postId) {
    try {
      const post = await Post.findById(postId).populate('category').exec()
      return post
    } catch (error) {
      throw error
    }
  }

  // Delete a post by ID
  async deletePost(postId) {
    try {
      console.log(postId)
      const deletedPost = await Post.findByIdAndDelete(postId);
      // if (!deletedPost) {
      //   throw new Error("Post not found")
      // }

      return deletedPost;
    } catch (error) {
      throw error;
    }
  }

  // Edit a post by ID
  async editPost(postId, updatedData) {
    try {
      const editedPost = await Post.findByIdAndUpdate(postId, updatedData, {
        new: true, // Return the modified document rather than the original
        runValidators: true, // Run model validation on update
      });

      if (!editedPost) {
        throw new Error('Post not found');
      }

      return editedPost;
    } catch (error) {
      throw error;
    }
  }


}

module.exports = new PostService();