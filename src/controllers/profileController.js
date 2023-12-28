const User = require("../models/userModel")
const Post = require("../models/postModel")
const Profile = require("../models/profileModel")
const mongoose = require('mongoose')
module.exports.getProfile = async (req, res, next) => {
    const { id: profileId } = req.params
    try {
        const currentUserId = req.user.id;
        if (!req.user) {
            return res.status(400).json({ message: "User not found" })
        }
        const user = await User.findById(profileId)
        // if (!req.cookies[`${user.username}_viewedProfile`]) {
        //     user.profileViews++
        //     await user.save()
        //     res.cookie(`${user.username}_viewedProfile`, true, { maxAge: 24 * 60 * 60 * 1000 })
        // }
        res.json({ status: "SUCCESS", data: user, message: "Successfuly found profile" })
    } catch (error) {
        next(error)
    }

}

module.exports.getMyProfile = async (req, res, next) => {
    try {
        console.log(req.user)
        const profile = await Profile.findById(req.user?.profile_id).populate('user')
        res.json({ message: "This is a secured route", data: profile})
    } catch (error) {
        next(error)
    }
}

module.exports.getMyPosts = async (req, res, next) => {
    try {
        const profileId = req.user.profile_id;
        if (!mongoose.isValidObjectId(profileId)) {
            return res.status(400).json({ message: 'Invalid user ID format', status: 'ERROR' });
        }
        // console.log({ userId })
        // Find posts where the 'author' field matches the user ID
        const posts = await Post.find({ author: profileId }).populate('author');

        // Respond with the found posts
        res.status(200).json({ message: "Posts for user",  status: "SUCCESS", data: posts });
    } catch (error) {
        next(error)
    }
}