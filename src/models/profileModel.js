const mongoose = require("mongoose")

const ProfileSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    profileViews: {
        type: Number,
        default: 0
    },
    posts: [
        {
            _id: mongoose.Schema.Types.ObjectId,
            likeCount: {
                type: Number,
                default: 0
            },
            likes: [
                {
                    _id: {
                        type: mongoose.Schema.Types.ObjectId,
                        ref: 'profile'
                    }
                }
            ]
        }
    ],
    myLikedPosts: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Post'
        }
    ],
    followers: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'profile'
        }
    ],
    following: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'profile'
        }
    ]
}, { timestamps: true })

// ProfileSchema.virtual('followingCount').get(function (){

// })
// ProfileSchema.virtual('followersCount').get(function (){

// })

const Profile = mongoose.model('profile', ProfileSchema)

module.exports = Profile;