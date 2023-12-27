const mongoose = require('mongoose');

const Schema = mongoose.Schema;

// Create an Category schema with the mongoose schema
const CategorySchema = new Schema({
    name: {
      type: String,
      required: [true, "Please provide the name"],
      unique: [true, "The title name already exists"],
    },
    description: {
      type: String,
    }
}, {timestamps: true});

// Create an Category model with the Category schema
const Category = mongoose.model('Category', CategorySchema);

// Export the Category model
module.exports = Category;
