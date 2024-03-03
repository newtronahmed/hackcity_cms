const express = require('express');
const { follow } = require('../../controllers/followController');
const router = express.Router()
/**
 * @swagger
 * tags:
 *   name: Follow
 *   description: The `Follow` api
 * /follow/{id}:
 *   post:
 *    summary: follow or unfollow profile
 *    tags: [Follow]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: The profile id
 *    responses:
 *      200:
 *        description: Followed profile or unfollowed profile successfully
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                 status:
 *                   type: string
 *                   description: status
 *                 message:
 *                   type: string
 *                   description: message
 *      404:
 *        description: The profile was not found
 *      500:
 *        description: Something went wrong
 */

router.post('/:username', follow)
module.exports = router;
