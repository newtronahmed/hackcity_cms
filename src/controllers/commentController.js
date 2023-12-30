const commentService = require("../services/commentService")
const Comment = require("../models/commentModel");
const { SUCCESS, FAILED } = require("../utils/constants");
const Post = require("../models/postModel");

const getAllComments = async (req, res, next) => {
    try {
        const categories = await commentService.getAllComments()
        // Error message, if there are no Comments
        // console.log(categories)
        if (categories.length < 1) {
            return res.json({
                status: FAILED,
                message: "There are no Comments"
            })
        }
        // Return published Comments
        res.status(200).json({
            status: SUCCESS,
            message: "All published Comments",
            data: categories
        })

    } catch (error) {
        next(error)
    }
};

const getOneComment = async (req, res, next) => {
    const { id } = req.params
    try {
        const category = await commentService.getOneComment(id)
        res.status(200).json({ status: SUCCESS, data: category, message: "Successfully fetch single category" });
    } catch (error) {
        next(error)
    }
};

const createNewComment = async (req, res, next) => {
    const { commentBody, post_id } = req.body
    if (!commentBody || !post_id) {
        return res.status(400).json({ status: FAILED, message: "Please make sure to input a commentbody and post_id" })
    }
    const body = { body: commentBody, post_id, author: req.user.profile_id }
    try {
        // const exists = await Comment.findOne({ name })
        // if (exists) {
        //     return res.status(400).json({ status: "FAILED", message: "category with similar name already exists" })
        // }
        const post = await Post.findById(post_id)
        if (!post){
            return res.status(404).json({ message: "Post not found "})
        }
        const newcomment = await commentService.createNewComment(body)
        post.comments.push(newcomment._id)
        await post.save()
        // looke for post and associate comment to post
        // add post_id to body object
        //retrieve user_id from req.user.profile_id 
        res.status(200).json({ status: "SUCCESS", data: newcomment, message: "Successfully created new category" });

    } catch (error) {
        // console.log(error.message)
        next(error)
    }
};

const updateOneComment = async (req, res) => {
    const { id } = req.params
    // if (req.user.profile_id != p)
    try {
        const updatedcategory = await commentService.editComment(id, req.body)

        return res.json({ status: SUCCESS, message: "category edited successfully", data: updatedcategory })

    } catch (error) {
        next(error)
    }
};

const deleteOneComment = async (req, res, next) => {
    // const id = req.query.id
    const { id } = req.params
    try {
        const deletedcategory = await commentService.deleteComment(id)
        if (!deletedcategory) {
            return res.json({ status: FAILED, message: "category not found" })
        }
        return res.json({ status: "SUCCESS", message: "category deleted" });

    } catch (error) {
        return res.status(500).json({ status: FAILED, message: "Internal Server Error" })
    }
};

module.exports = {
    getAllComments,
    getOneComment,
    createNewComment,
    updateOneComment,
    deleteOneComment,
};