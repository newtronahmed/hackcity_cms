// Require the mongoose package
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Profile = require('./profileModel');
// Instantiate the schema class from the mongoose package
const Schema = mongoose.Schema;

// Create an Post schema with the mongoose schema
const UserSchema = new Schema({
    name: {
        type: String,
        required: [true, "Please provide a name"],

    },
    email: {
        type: String,
        required: [true, "Please provide the title"],
        unique: [true, "User with this email already exists"],
    },
    username: {
        type: String,
        // required: [true, "Please provide the body"],
    },
    password: {
        type: String,
        required: true
    },
    resetToken: {
        type: String,
    },
    resetTokenExpirationDate: {
        type: Date
    },
    role: {
        type: String,
        default: "User"
    },
    profile: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'profile'
    }

}, { timestamps: true });

UserSchema.pre('save', async function (next) {
    const user = this;
    if (user.isNew) {
        const profile = await Profile.create({ user: this._id, username: this.username })
        user.profile = profile
    }
    //only if password was modified, hash before storing in db
    if (!user.isModified('password')) return next()
    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(user.password, salt)
    user.password = hash
    next()
})
UserSchema.methods.checkPassword = async function (password) {
    const user = this
    const isCorrect = await bcrypt.compare(password, user.password)
    return isCorrect
}

// Create an Post model with the user schema
const User = mongoose.model('user', UserSchema);

// Export the Post model
module.exports = User;
