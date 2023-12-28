const mongoose = require('mongoose')
const Profile = require("../models/profileModel")
const follow = async (req, res, next) => {
    try {
        const userProfileId = req.user.profile_id;
    
        const profileToFollow = await Profile.findById(req.params.id);
        if (userProfileId == req.params.id){
            return res.status(400).json({ message: "You cannot follow yourself"})
        }
    
        if (profileToFollow.followers.some(follower =>
            follower.equals(userProfileId))
        ) {
            // Already following, unfollow
            await Profile.updateOne(
                { _id: profileToFollow._id },
                { $pull: { followers: userProfileId } }
            );
    
        } else {
            // Not following, follow
            profileToFollow.followers.push(userProfileId);
            await profileToFollow.save();
        }
    
        res.json({ message: "Successfully followed user", data: profileToFollow, status:"SUCCESS"});
        
    } catch (error) {
        next(error)
    }
}
module.exports = { follow }