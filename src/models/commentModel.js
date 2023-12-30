const mongoose = require('mongoose')

const CommentSchema = new mongoose.Schema({
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'profile'
    },
    body: {
        type: String,
        required: true
    },
    post_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'post'
    }
}, { timestamps: true })

const Comment = mongoose.model('comment', CommentSchema)
module.exports = Comment;