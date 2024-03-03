const Profile = require('../models/profileModel');
// const User = require('../models/userModel');

// Middleware to increment post views count
const profileCount = async (req, res, next) => {
    const username = req.params.username;

    const profile = await Profile.findOne({username})

    //if the user is not viewing his own profile, don't count it as a profile view
    if (username != req.user.username){
        if (!req.cookies[`${profile.username}_viewedProfile`]) {
            profile.profileViews++
            await profile.save()
            // req.profile = profile
            //set cookie to make sure that all profile views in a day will be counted as 1 profile view
            res.cookie(`${profile.username}_viewedProfile`, true, { maxAge: 24 * 60 * 60 * 1000 })
        } 
    }

    // Continue to the next middleware or route handler
    next();
};

module.exports = profileCount