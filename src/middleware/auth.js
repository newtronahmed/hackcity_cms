const passport = require('passport')
const Joi = require('joi')
require("dotenv").config()
const passportLocalStrategy = require('passport-local').Strategy
const JWTStrategy = require('passport-jwt').Strategy
const ExtractJWT = require('passport-jwt').ExtractJwt;
const User = require('../models/userModel')
const Profile = require('../models/profileModel')

passport.use('signup', new passportLocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true, // This allows you to access the request object in the callback
}, async function (req, email, password, done) {
    const { username, name } = req.body
    const userSchema = Joi.object({
        username: Joi.string().alphanum().min(3).max(30).required(),
        email: Joi.string().email().required(),
        password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),
        name: Joi.string().max(100).required(),
    });
    const { value, error } = userSchema.validate(req.body)
    if (error){
        return done(error)
    }
    try {
        const userExists = await User.findOne({ email })
        if (userExists) {
            return done(null, false, { message: "Email already in use" })
        }
        // const profile = await Profile.create()
        const newUser = await User.create({ username, email, password, name, role: "User" })

        return done(null, newUser)
    } catch (error) {
        return done(error)
    }
}))

passport.use('login', new passportLocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
}, async function (email, password, done) {
    if (!email || !password) {
        return done(null, false, { message: "Both email and password is required" })
    }
    const UserSchema = Joi.object({
        email: Joi.string().email().required(),
        password:Joi.string().required()
    })
    const { value, error} = UserSchema.validate({ email, password})
    if (error){
        return done(error)
    }
    try {
        const user = await User.findOne({ email })
        if (!user) {
            // const error = Error('User with email not found',)
            return done(null, false, { message: "User with email not found" })
        }
        const passwordMatch = await user.checkPassword(password)
        // console.log({passwordMatch})
        if (!passwordMatch) {
            return done(null, false, { message: "Password does not match, please try again" })
        }

        return done(null, user, { message: "Logged in successfully" })
    } catch (error) {
        return done(error)
    }
}))

passport.use(new JWTStrategy({
    secretOrKey: process.env.JWT_SECRET_KEY,
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken()
}, async (jwtPayload, done) => {
    try {
        console.log(jwtPayload)
        done(null, jwtPayload?.user)
    } catch (error) {
        done(error)
    }
}))