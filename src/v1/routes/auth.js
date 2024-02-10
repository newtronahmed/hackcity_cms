/**
 * @swagger
 * /signup:
 *   post:
 *     summary: User signup
 *     description: Endpoint for user registration.
 *     tags:
 *       - Authentication
 *     requestBody:
 *       description: User signup details
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *     responses:
 *       '201':
 *         description: Signup successful
 *         content:
 *           application/json:
 *             example:
 *               message: Signup successful
 *               user: { userObject }
 *       '400':
 *         description: Bad request or validation error
 */

/**
 * @swagger
 * /login:
 *   post:
 *     summary: User login
 *     description: Endpoint for user login.
 *     tags:
 *       - Authentication
 *     requestBody:
 *       description: User login details
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *     responses:
 *       '200':
 *         description: Login successful
 *         content:
 *           application/json:
 *             example:
 *               token: jwtToken
 *       '400':
 *         description: Bad request or authentication failure
 *       '404':
 *         description: User not found
 */

/**
 * @swagger
 * /forgot-password:
 *   post:
 *     summary: Forgot password
 *     description: Endpoint for generating a reset token for password recovery.
 *     tags:
 *       - Authentication
 *     requestBody:
 *       description: User email for password recovery
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *     responses:
 *       '200':
 *         description: Reset token successfully generated
 *         content:
 *           application/json:
 *             example:
 *               message: Reset token successfully generated
 *               data: { resetToken, resetTokenExpirationDate }
 *       '400':
 *         description: Bad request or missing email
 *       '404':
 *         description: User not found
 */

/**
 * @swagger
 * /reset-password:
 *   post:
 *     summary: Reset password
 *     description: Endpoint for resetting user password using a valid reset token.
 *     tags:
 *       - Authentication
 *     requestBody:
 *       description: Reset token and new password
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               resetToken:
 *                 type: string
 *               newPassword:
 *                 type: string
 *     responses:
 *       '200':
 *         description: Password updated successfully
 *       '400':
 *         description: Bad request or missing reset token/new password
 *       '404':
 *         description: Invalid or expired reset token
 */

const express = require('express')
const passport = require('passport')
const jwt = require('jsonwebtoken')
const User = require('../../models/userModel')
const crypto = require('crypto')
const bcrypt = require('bcrypt')
const router = express.Router()
const ErrorHandler = require("../../utils/errorHandler")

router.post("/signup",
    passport.authenticate('signup', { session: false }),
    async (req, res, next) => {
        try {
            return res.status(201).json({ message: "Signup successful", user: req.user })

        } catch (error) {
            next(error)
        }
    }
)


router.post("/login", async function (req, res, next) {
    passport.authenticate('login', async function (err, user, info) {
        try {
            if (err || !user) {
                const errorMessage = info ? info.message : 'Authentication failed';
                return next(new ErrorHandler(400, errorMessage));
            }

            req.login(user, { session: false }, async function (error) {
                if (error) {
                    return next(error)
                }
                const body = { _id: user._id, email: user.email, username: user.username, name: user.name, role:user.role, profile_id: user.profile._id }
                const token = jwt.sign({ user: body }, process.env.JWT_SECRET_KEY)
                return res.json({ token })
            })

        } catch (error) {
            next(error)
        }
    })(req, res, next)
})

router.post('/forgot-password', async function (req, res, next) {
    const { email } = req.body
    if (!email) {
        return res.status(400).json({ message: "Email is required" })
    }
    try {
        const user = await User.findOne({ email })
        if (!user) {
            return res.status(404).json({ message: "User not found" })
        }
        // Generate reset token and expiration date
        const resetToken = crypto.randomBytes(20).toString('hex')
        //Date.now plus one hour in milli seconds
        const resetTokenExpirationDate = Date.now() + 360000
        await user.updateOne({ resetToken, resetTokenExpirationDate })
        return res.json({ message: "Reset token succesfully generated", data: { resetToken, resetTokenExpirationDate } })

    } catch (error) {
        next(error)
    }
})

router.post('/reset-password', async function (req, res, next) {
    const { resetToken, newPassword } = req.body
    if (!resetToken) {
        return res.json({ message: "Reset token not found" })
    }
    if (!newPassword) {
        return res.json({ message: "Please include the new password" })
    }
    try {
        //find user with the current reset token
        const user = await User.findOne({ resetToken, resetTokenExpirationDate: { $gt: Date.now() } })

        if (!user) {
            return res.status(404).json({ message: "Invalid or expired reset token" })
        }
        // update the user password field
        user.password = newPassword
        // Clear the reset token fields
        user.resetToken = undefined;
        user.resetTokenExpiration = undefined;

        await user.save()
        return res.status(200).json({ message: "Password updated successfully" })
    } catch (error) {
        next(error)
    }
})
module.exports = router