// Require the mongoose package
const mongoose = require('mongoose');

// Instantiate the schema class from the mongoose package
const Schema = mongoose.Schema;
// Create an Post schema with the mongoose schema
const PostSchema = new Schema({
  title: {
    type: String,
    required: [true, "Please provide the title"],
    unique: [true, "The title name already exists"],
  },
  content: {
    type: String,
    required: [true, "Please provide the body"],
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category'
  },
  image: {
    type: String
  },
  postViews: {
    type: Number,
    default: 0
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'profile'
  }
  
}, { timestamps: true });

// Create an Post model with the user schema
const Post = mongoose.model('Post', PostSchema);

// Export the Post model
module.exports = Post;
