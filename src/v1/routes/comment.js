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