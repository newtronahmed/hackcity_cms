/**
 * @swagger
 * components:
 *   schemas:
 *     Post:
 *       type: object
 *       required:
 *         - title
 *         - description
 *         - image
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated id of the post
 *         title:
 *           type: string
 *           description: The title of the post
 *         author:
 *           type: string
 *           description: The post author
 *         image:
 *           type: string
 *           description: Image attached to post
 *         createdAt:
 *           type: string
 *           format: date
 *           description: The date the post was created
 *       example:
 *         id: 466399200023993
 *         title: I am having a great day
 *         author: John Doe
 *         image: http://cloudinary.images.org/ahmed/image2.jpg
 *         createdAt: 2020-03-10T04:05:06.157Z
 */

/**
 * @swagger
 * tags:
 *   name: Posts
 *   description: The Post managing API
 * /posts:
 *   get:
 *     summary: Lists all the posts
 *     tags: [Posts]
 *     responses:
 *       200:
 *         description: The list of the books
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Post'
 *   post:
 *     summary: Create a new post
 *     tags: [Posts]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Post'
 *     responses:
 *       200:
 *         description: The created book.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Post'
 *       500:
 *         description: Something went wrong
 * /posts/{id}:
 *   get:
 *     summary: Get the post by id
 *     tags: [Posts]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The post id
 *     responses:
 *       200:
 *         description: The post response by id
 *         contens:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Book'
 *       404:
 *         description: The post was not found
 *   put:
 *    summary: Update the post by the id
 *    tags: [Posts]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: The post id
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Post'
 *    responses:
 *      200:
 *        description: The book was updated
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Post'
 *      404:
 *        description: The post was not found
 *      500:
 *        description: Something went wrong
 *   delete:
 *     summary: Remove the post by id
 *     tags: [Posts]
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
const postController = require('../../controllers/postController');
const validateObjectId = require('../../middleware/validateObjectId');
const {upload} = require('../../services/uploadService');
const postCount = require('../../middleware/postViews');
const postRouter = express.Router();

postRouter.get('/', postController.getAllPosts); 

postRouter.get('/:id', validateObjectId, postCount, postController.getOnePost); 

postRouter.post('/',passport.authenticate('jwt', {session: false}), upload.single('image'), postController.createNewPost,); 

postRouter.delete('/:id', validateObjectId, postController.deleteOnePost); 

postRouter.patch('/:id', validateObjectId, postController.updateOnePost); 

module.exports = postRouter;