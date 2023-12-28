const Profile = require('../models/profileModel');
// const User = require('../models/userModel');

// Middleware to increment post views count
const profileCount = async (req, res, next) => {
    const profileId = req.params.id;

    const profile = await Profile.findById(profileId)
    if (!req.cookies[`${profile.username}_viewedProfile`]) {
        profile.profileViews++
        await profile.save()
        res.cookie(`${profile.username}_viewedProfile`, true, { maxAge: 24 * 60 * 60 * 1000 })
    }

    // Continue to the next middleware or route handler
    next();
};

module.exports = profileCount