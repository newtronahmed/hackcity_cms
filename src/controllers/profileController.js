const User = require("../models/userModel")

module.exports.getProfile = async (req, res, next) => {
    const { id: profileId } = req.params
    try {
        const currentUserId = req.user.id;
        if (!req.user) {
            return res.status(400).json({ message: "User not found" })
        }
        const user = await User.findById(profileId)
        // user.profileViews++
        // await user.save()
        if (!req.cookies[`${user.username}_viewedProfile`]) {
            res.cookie(`${user.username}_viewedProfile`, true, { maxAge: 24 * 60 * 60 * 1000 })
        }
        return user
    } catch (error) {
        next(error)
    }

}

module.exports.getMyProfile = async (req, res, next) => {
    try {
        console.log(req.user._id)
        const user = await User.findById(req.user?._id)
        res.json({ message: "This is a secured route", data: user })  
    } catch (error) {
        next(error)
    }
}