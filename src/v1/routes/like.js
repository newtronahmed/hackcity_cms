const express = require('express')
const router = express.Router()
const { likePost } = require('../../controllers/likeController');
router.post('/:id', likePost);

module.exports = router

