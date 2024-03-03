const User = require('../models/userModel');
const APIFeatures = require('../utils/APIFeaturs')
class UserService {
  // List all posts
  async getAllUsers(queryStr) {
    try {
      const query = User.find({});
      // console.log(posts.length)
      const features = await new APIFeatures(query, queryStr)
        .filter()
        .sort()
        .paginate()
        .limitFields()
      const users = await features._query
      return users;
    } catch (error) {
      throw error;
    }
  }
  // Create a new user
  async createNewUser(user) {

    try {
      const newUser = new User(user);

      const savedUser = await newUser.save();
      return savedUser;
    } catch (error) {
      throw error;
    }
  }
  async getOneUser(postId) {
    try {
      const post = await User.findById(postId)
      return post
    } catch (error) {
      throw error
    }
  }

  // Delete a post by ID
  async deleteUser(postId) {
    try {
      console.log(postId)
      const deletedUser = await User.findByIdAndDelete(postId);
      // if (!deletedUser) {
      //   throw new Error("User not found")
      // }

      return deletedUser;
    } catch (error) {
      throw error;
    }
  }

  // Edit a post by ID
  async editUser(postId, updatedData) {
    try {
      const editedUser = await User.findByIdAndUpdate(postId, updatedData, {
        new: true, // Return the modified document rather than the original
        runValidators: true, // Run model validation on update
      });

      if (!editedUser) {
        throw new Error('User not found');
      }

      return editedUser;
    } catch (error) {
      throw error;
    }
  }


}

module.exports = new UserService();