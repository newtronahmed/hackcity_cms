
const Profile = require("../models/profileModel")
// const Post = require("../models/postModel")
// const mongoose = require("mongoose")
const likePost = async (req, res, next) => {
    try {
        const userProfile = await Profile.findOne({'posts._id': req.params.id}, 'posts.$');
        // const userProfile = await Profile.findOne({
        //     posts: {
        //         $elemMatch: {
        //             _id: req.params.id
        //         }
        //     }
        // })
        console.log(userProfile, req.params.id)
        if (!userProfile) {
            return res.status(404).send('User or post not found');
        }

        const post = userProfile.posts[0];
        const alreadyLike = post.likes.some(like => like._id == req.user.profile_id);

        if (alreadyLike) {
            // Dislike Logic
            await Profile.updateOne(
                { 'posts._id': req.params.id },
                {
                    $inc: { 'posts.$.likeCount': -1 },
                    $pull: { 'posts.$.likes': { _id: req.user.profile_id } }
                }
            );

            await Profile.findByIdAndUpdate(
                req.user.profile_id,
                {
                    $pull: { myLikedPosts: { _id: req.params.id } }
                }
            );
            res.json({ message: "disliked" });
        } else {
            // Like Logic
            await Profile.updateOne(
                { 'posts._id': req.params.id },
                {
                    $inc: { 'posts.$.likeCount': 1 },
                    $push: { 'posts.$.likes': { _id: req.user.profile_id } }
                }
            );


            await Profile.findByIdAndUpdate(
                req.user.profile_id,
                {
                    $push: {
                        myLikedPosts: {
                            $each: [{ _id: req.params.id }],
                            $position: 0
                        }
                    }
                }
            );
            res.json({ message: "liked" });
        }
    } catch (error) {
        console.error(error);
        next(error)
    }
}
module.exports = { likePost }