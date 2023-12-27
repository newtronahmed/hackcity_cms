const express = require('express')
const passport = require('passport')
const { getProfile, getMyProfile } = require('../../controllers/profileController')

const router = express.Router()
router.get("/", getMyProfile)
//if the request is not comming from the current user, increase profile viewss
router.get("/:id", getProfile)
module.exports = router;