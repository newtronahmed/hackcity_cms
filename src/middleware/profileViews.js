const User = require('../models/userModel');

// Middleware to increment post views count
const profileCount = async (req, res, next) => {
    const userId = req.params.id;

    const user = await User.findById(userId)
    if (!req.cookies[`${user.username}_viewedProfile`]) {
        user.profileViews++
        await user.save()
        res.cookie(`${user.username}_viewedProfile`, true, { maxAge: 24 * 60 * 60 * 1000 })
    }

    // Continue to the next middleware or route handler
    next();
};

module.exports = profileCount