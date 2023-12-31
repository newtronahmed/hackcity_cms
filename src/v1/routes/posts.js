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