/**
 * @swagger
 * components:
 *   schemas:
 *     Comment:
 *       type: object
 *       required:
 *         - author
 *         - post_id
 *         - body
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated id of the post
 *         author:
 *           type: string
 *           description: The title of the post
 *         post_id:
 *           type: string
 *           description: The post author
 *         body:
 *           type: string
 *           description: Image attached to post
 *         createdAt:
 *           type: string
 *           format: date
 *           description: The date the post was created
 *       example:
 *         id: 466399200023993
 *         author: I am having a great day
 *         post_id: John Doe
 *         body: http://cloudinary.images.org/ahmed/image2.jpg
 *         createdAt: 2020-03-10T04:05:06.157Z
 */

/**
 * @swagger
 * tags:
 *   name: Comment
 *   description: The Comment managing API
 * /comments:
 *   get:
 *     summary: Lists all the comments
 *     tags: [Comment]
 *     responses:
 *       200:
 *         description: The list of the comments
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Comment'
 *   post:
 *     summary: Create a new post
 *     tags: [Comment]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Comment'
 *     responses:
 *       200:
 *         description: The created book.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Comment'
 *       500:
 *         description: Something went wrong
 * /comments/{id}:
 *   get:
 *     summary: Get the comment by id
 *     tags: [Comment]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The comment id
 *     responses:
 *       200:
 *         description: The comment response by id
 *         contens:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Comment'
 *       404:
 *         description: The comment was not found
 *   put:
 *    summary: Update the comment by the id
 *    tags: [Comment]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: The comment id
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Comment'
 *    responses:
 *      200:
 *        description: The comment was updated
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Comment'
 *      404:
 *        description: The comment was not found
 *      500:
 *        description: Something went wrong
 *   delete:
 *     summary: Remove the comment by id
 *     tags: [Comment]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The post id
 *
 *     responses:
 *       200:
 *         description: The post was deleted
 *       404:
 *         description: The post was not found
 */
const express = require('express')
const passport = require('passport')
const router = express.Router()
const commentController = require('../../controllers/commentController');
const validateObjectId = require('../../middleware/validateObjectId');
const { upload } = require('../../services/uploadService');

router.get('/', commentController.getAllComments); 

router.get('/:id', validateObjectId, commentController.getOneComment); 

router.post('/',passport.authenticate('jwt', {session: false}), upload.single('image'), commentController.createNewComment,); 

router.delete('/:id', validateObjectId, commentController.deleteOneComment); 

router.patch('/:id', validateObjectId, commentController.updateOneComment); 

module.exports = router