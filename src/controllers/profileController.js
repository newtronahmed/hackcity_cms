const User = require("../models/userModel")
const Post = require("../models/postModel")
const Profile = require("../models/profileModel")
const mongoose = require('mongoose')
const { uploadImage } = require("../services/uploadService")
module.exports.getProfile = async (req, res, next) => {
    const { username } = req.params
    // console.log(req.profile)
    try {
        // const currentUserId = req.user.id;
        if (!req.user) {
            return res.status(400).json({ message: "Session Expired" })
        }
        const profile = await Profile.findOne({username})
        // if (!req.cookies[`${user.username}_viewedProfile`]) {
        //     user.profileViews++
        //     await user.save()
        //     res.cookie(`${user.username}_viewedProfile`, true, { maxAge: 24 * 60 * 60 * 1000 })
        // }
        res.json({ status: "SUCCESS", data: profile, message: "Successfuly fetched profile" })
    } catch (error) {
        next(error)
    }

}

module.exports.getMyProfile = async (req, res, next) => {
    try {
        console.log(req.user)
        const profile = await Profile.findById(req.user?.profile_id).populate('user')
        res.json({ message: "Successfully fetched your profile", data: profile })
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
        res.status(200).json({ message: "Posts for user", status: "SUCCESS", data: posts });
    } catch (error) {
        next(error)
    }
}

module.exports.editMyProfile = async (req, res, next) => {
    try {
        const body = req.body
        if (req.file) {
            const imageDetails = await uploadImage(file);
            //    console.log({imageDetails})

            body["image"] = imageDetails.url
        }
        const profile = await Profile.findByIdAndUpdate(req.user.profile_id, body, {
            new: true,
            runValidators: true
        })
        if (!profile) {
            return res.status(200).json({ message: "Profile not found ", status: "FAILED" })
        }
        return res.status(200).json({ message: "Successfully updated your profile", status: "SUCCESS" })
        // profile

    } catch (error) {
        next(error)
    }
}