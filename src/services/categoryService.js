const Category = require('../models/categoryModel'); 

class CategoryService {
  // List all categorys
  async getAllCategories() {
    try {
      const categories = await Category.find({});
      console.log(categories.length)
      return categories;
    } catch (error) {
      throw error;
    }
  }
  // Create a new category
  async createNewCategory(category) {

    try {
      const newCategory = new Category(category);

      const savedCategory = await newCategory.save();
      return savedCategory;
    } catch (error) {
      throw error;
    }
  }
  async getOneCategory(categoryId) {
    try {
      const category = await Category.findById(categoryId)
      return category
    } catch (error) {
      throw error
    }
  }

  // Delete a category by ID
  async deleteCategory(categoryId) {
    try {
      console.log(categoryId)
      const deletedCategory = await Category.findByIdAndDelete(categoryId);
      // if (!deletedcategory) {
      //   throw new Error("category not found")
      // }

      return deletedCategory;
    } catch (error) {
      throw error;
    }
  }

  // Edit a category by ID
  async editCategory(categoryId, updatedData) {
    try {
      const editedCategory = await Category.findByIdAndUpdate(categoryId, updatedData, {
        new: true, // Return the modified document rather than the original
        runValidators: true, // Run model validation on update
      });

      if (!editedCategory) {
        throw new Error('category not found');
      }

      return editedCategory;
    } catch (error) {
      throw error;
    }
  }

  
}

module.exports = new CategoryService();