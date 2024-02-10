/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - username
 *         - name
 *         - email
 *         - password 
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated id of the commen
 *         username:
 *           type: string
 *           description: The username of the user
 *         email:
 *           type: string
 *           description: The email of the user
 *         name:
 *           type: string
 *           description: The name of the user
 *         password:
 *           type: string
 *           description: The password of the user
 *         createdAt:
 *           type: string
 *           format: date
 *           description: The date the user was created
 *       example:
 *         id: 466399200023993
 *         username: JohnDoe
 *         name: John Doe
 *         email: John.Doe@gmail.com
 *         password: 273888343jj3l3j339@$$@@00020@233     
 *         createdAt: 2020-03-10T04:05:06.157Z
 */

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: The User managing API
 * /users:
 *   get:
 *     summary: Lists all the users
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: The list of the books
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 *   post:
 *     summary: Create a new users
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *         description: The created book.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       500:
 *         description: Something went wrong
 * /users/{id}:
 *   get:
 *     summary: Get the users by id
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The users id
 *     responses:
 *       200:
 *         description: The users response by id
 *         contens:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Book'
 *       404:
 *         description: The users was not found
 *   put:
 *    summary: Update the users by the id
 *    tags: [Users]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: The users id
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/User'
 *    responses:
 *      200:
 *        description: The book was updated
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/User'
 *      404:
 *        description: The users was not found
 *      500:
 *        description: Something went wrong
 *   delete:
 *     summary: Remove the users by id
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The users id
 *
 *     responses:
 *       200:
 *         description: The users was deleted
 *       404:
 *         description: The users was not found
 */
const express = require('express')
const userRouter = express.Router()
const userController = require("../../controllers/userController");
const validateObjectId = require('../../middleware/validateObjectId');
userRouter.get('/', userController.getAllUsers); 

userRouter.get('/:id', validateObjectId, userController.getOneUser); 

userRouter.post('/', userController.createNewUser,); 

userRouter.delete('/:id', validateObjectId, userController.deleteOneUser); 

userRouter.patch('/:id', validateObjectId, userController.updateOneUser); 

module.exports = userRouter