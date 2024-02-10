/**
 * @swagger
 * components:
 *   schemas:
 *     Profile:
 *       type: object
 *       required:
 *         - id
 *         
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated id of the profile
 *         user:
 *           type: object
 *           description: The user object
 *         profileViews:
 *           type: number
 *           description: The number of profile views
 *         bio:
 *           type: string
 *           description: The short bio of the user profile
 *         profilePhoto:
 *           type: string
 *           description: The url string photo for the profile
 *         profile:
 *           type: array
 *           description: The profile associated with the user profile
 *         myLikedPosts:
 *           type: array
 *           description: The liked profile associated with the user profile
 *         followers:
 *           type: array
 *           description: The profile ids following the user
 *         following:
 *           type: array
 *           description: The profile ids the user follows
 *         createdAt:
 *           type: string
 *           format: date
 *           description: The date the profile was created
 *       example:
 *         id: 466399200023993
 *         user: {}
 *         profileViews: 12
 *         bio: My name is John Doe
 *         profilePhoto: http://cloudinary.images.org/ahmed/image2.jpg
 *         profile: []
 *         myLikedPosts: []
 *         following: []
 *         followers: []
 *         createdAt: 2020-03-10T04:05:06.157Z
 */

/**
 * @swagger
 * tags:
 *   name: Profile
 *   description: The Profile managing API
 * /profile:
 *   get:
 *     summary: Lists all the profile
 *     tags: [Profile]
 *     responses:
 *       200:
 *         description: The list of the books
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Profile'
 *   post:
 *     summary: Create a new profile
 *     tags: [Profile]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Profile'
 *     responses:
 *       200:
 *         description: The created book.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Profile'
 *       500:
 *         description: Something went wrong
 * /profile/{id}:
 *   get:
 *     summary: Get the profile by id
 *     tags: [Profile]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The profile id
 *     responses:
 *       200:
 *         description: The profile response by id
 *         contens:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Profile'
 *       404:
 *         description: The profile was not found
 *   put:
 *    summary: Update the profile by the id
 *    tags: [Profile]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: The profile id
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Profile'
 *    responses:
 *      200:
 *        description: The book was updated
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Profile'
 *      404:
 *        description: The profile was not found
 *      500:
 *        description: Something went wrong
 *   delete:
 *     summary: Remove the profile by id
 *     tags: [Profile]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The profile id
 *
 *     responses:
 *       200:
 *         description: The profile was deleted
 *       404:
 *         description: The profile was not found
 */
const express = require('express')
const passport = require('passport')
const { getProfile, getMyProfile,getMyPosts, editMyProfile } = require('../../controllers/profileController')
const profileCount = require('../../middleware/profileViews')
const router = express.Router()
router.get("/", getMyProfile)
//if the request is not comming from the current user, increase profile viewss
router.get('/profile', getMyPosts);
router.get("/:id", profileCount, getProfile)
router.patch('/', editMyProfile)
module.exports = router;