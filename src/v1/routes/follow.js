const express = require('express');
const { follow } = require('../../controllers/followController');
const router = express.Router()
router.post('/:id', follow)
module.exports = router;
