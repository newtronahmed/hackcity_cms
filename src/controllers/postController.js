const postService = require("../services/postService")
const Post = require("../models/postModel");
const User = require("../models/userModel");
const { SUCCESS, FAILED } = require("../utils/constants");
const { uploadToCloudinary, upload, uploadImage } = require("../services/uploadService")
const bufferToDataURI = require("../utils/dataUriParser")
const ErrorHandler = require("../utils/errorHandler")

const getAllPosts = async (req, res, next) => {
    try {
        const posts = await postService.getAllPosts(req.query)
        // Error message, if there are no published posts
        console.log(posts)
        if (posts.length < 1) {
            return res.json({
                status: FAILED,
                message: "There are no published posts"
            })
        }
        // Return published posts
        res.status(200).json({
            status: SUCCESS,
            message: "All published posts",
            data: posts
        })

    } catch (error) {
        next(error)
    }
};

const getOnePost = async (req, res, next) => {
    const { id } = req.params
    try {
        const post = await postService.getOnePost(id)
        // console.log({id, post})
        if (!post) {
            return res.status(404).json({ status: "FAILED", message: "Post not found" })
        }
        res.status(200).json({ status: SUCCESS, data: post, message: "Successfully fetch single post" });
    } catch (error) {
        next(error)
    }
};

const createNewPost = async (req, res, next) => {
    const { title, content } = req.body
    const body = { ...req.body}
    // console.log({title, content})
    if (!title || !content) {
        return res.status(400).json({ status: FAILED, message: "Please make sure to input a title and content" })
    }
    const { file } = req
    try {
        const exists = await Post.findOne({ title })
        if (exists) {
            return res.status(400).json({ status: "FAILED", message: "Post with similar title already exists" })
        }
        if (file) {
            // if (!file) throw new ErrorHandler(400, 'Image is required')

            const imageDetails = await uploadImage(file);
            //    console.log({imageDetails})

            body["image"] = imageDetails.url
        }
        body["author"] = req.user._id
        const newpost = await postService.createNewPost(body)
        const user = await User.findById(req.user._id)
        user.posts.push(newpost._id)
        await user.save()
        res.status(201).json({ status: "SUCCESS", data: newpost, message: "Successfully created new post" });

    } catch (error) {
        // console.log(error.message)
        next(error)
        // next(new ErrorHandler(500, "Something went wrong while creating a new post"))
    }
};

const updateOnePost = async (req, res) => {
    const { id } = req.params
    try {
        const updatedpost = await postService.editPost(id, req.body)

        return res.json({ status: SUCCESS, message: "Post edited successfully", data: updatedpost })

    } catch (error) {
        next(error)
    }
};

const deleteOnePost = async (req, res) => {
    // const id = req.query.id
    const { id } = req.params
    try {
        const deletedpost = await postService.deletePost(id)
        if (!deletedpost) {
            return res.json({ status: FAILED, message: "Post not found" })
        }
        res.json({ status: "SUCCESS", message: "Post deleted" });

    } catch (error) {
        // res.status(500).json({ status: FAILED, message: "Internal Server Error" })
        next(error)
    }
};

module.exports = {
    getAllPosts,
    getOnePost,
    createNewPost,
    updateOnePost,
    deleteOnePost,
};