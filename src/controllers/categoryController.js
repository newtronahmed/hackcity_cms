const categoryService = require("../services/categoryService")
const Category = require("../models/categoryModel");
const { SUCCESS, FAILED } = require("../utils/constants");

const getAllCategories = async (req, res) => {
    try {
        const categories = await categoryService.getAllCategories()
        // Error message, if there are no Categories
        // console.log(categories)
        if (categories.length < 1) {
            return res.json({
                status: FAILED,
                message: "There are no Categories"
            })
        }
        // Return published Categories
        res.status(200).json({
            status: SUCCESS,
            message: "All published Categories",
            data: categories
        })

    } catch (error) {
        next(error)
    }
};

const getOneCategory = async (req, res, next) => {
    const { id } = req.params
    try {
        const category = await categoryService.getOneCategory(id)
        res.status(200).json({ status: SUCCESS, data: category, message: "Successfully fetch single category" });
    } catch (error) {
        next(error)
    }
};

const createNewCategory = async (req, res) => {
    const { name, description } = req.body
    if (!name) {
        return res.status(400).json({ status: FAILED, message: "Please make sure to input a name" })
    }
    try {
        const exists = await Category.findOne({ name })
        if (exists) {
            return res.status(400).json({ status: "FAILED", message: "category with similar name already exists" })
        }
        const newcategory = await categoryService.createNewCategory(req.body)
        res.status(200).json({ status: "SUCCESS", data: newcategory, message: "Successfully created new category" });

    } catch (error) {
        console.log(error.message)
        next(error)
    }
};

const updateOneCategory = async (req, res) => {
    const { id } = req.params
    try {
        const updatedcategory = await categoryService.editCategory(id, req.body)

        return res.json({ status: SUCCESS, message: "category edited successfully", data: updatedcategory })

    } catch (error) {
        next(error)
    }
};

const deleteOneCategory = async (req, res) => {
    // const id = req.query.id
    const { id } = req.params
    try {
        const deletedcategory = await categoryService.deleteCategory(id)
        if (!deletedcategory) {
            return res.json({ status: FAILED, message: "category not found" })
        }
        return res.json({ status: "SUCCESS", message: "category deleted" });

    } catch (error) {
        return res.status(500).json({ status: FAILED, message: "Internal Server Error" })
    }
};

module.exports = {
    getAllCategories,
    getOneCategory,
    createNewCategory,
    updateOneCategory, 
    deleteOneCategory,
};