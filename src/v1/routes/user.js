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