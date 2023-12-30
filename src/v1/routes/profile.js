const express = require('express')
const passport = require('passport')
const { getProfile, getMyProfile,getMyPosts, editMyProfile } = require('../../controllers/profileController')
const profileCount = require('../../middleware/profileViews')
const router = express.Router()
router.get("/", getMyProfile)
//if the request is not comming from the current user, increase profile viewss
router.get('/posts', getMyPosts);
router.get("/:id", profileCount, getProfile)
router.patch('/', editMyProfile)
module.exports = router;