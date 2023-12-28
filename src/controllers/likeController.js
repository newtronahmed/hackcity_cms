
const User = require("../models/userModel")
const Post = require("../models/postModel")
const likePost = async (req, res, next) => {
    try {
        const user = await User.findOne({'posts._id': req.params.id}, 'posts.$');
        // const fetchPost = await Post.findById(req.params.id).populate('author')
        // console.log(fetchPost)

        // const user = fetchPost.author
        if (!user) {
            return res.status(404).send('User or post not found');
        }

        const post = user.posts[0];
        const alreadyLike = post.likes.some(like => like._id == req.user._id);

        if (alreadyLike) {
            // Dislike Logic
            await User.updateOne(
                {'posts._id': req.params.id},
                {
                    $inc: { 'posts.$.likeCount': -1 },
                    $pull: { 'posts.$.likes': { _id: req.user._id } }
                }
            );

            await User.findByIdAndUpdate(
                req.user._id,
                {
                    $pull: { myLikedPosts: { _id: req.params.id } }
                }
            );
            res.json({message: "disliked"});
        } else {
            // Like Logic
            await User.updateOne(
                {'posts._id': req.params.id},
                {
                    $inc: { 'posts.$.likeCount': 1 },
                    $push: { 'posts.$.likes': { _id: req.user._id } }
                }
            );


            await User.findByIdAndUpdate(
                req.user._id,
                {
                    $push: {
                        myLikedPosts: {
                            $each: [{ _id: req.params.id }],
                            $position: 0
                        }
                    }
                }
            );
            res.json({ message: "liked"});
        }
    } catch (error) {
        console.error(error);
        next(error)
    }
}
module.exports = { likePost}