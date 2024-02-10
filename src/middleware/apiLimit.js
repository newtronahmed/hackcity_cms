const rateLimit = require('express-rate-limit')

const limit = rateLimit({
    windowsMs: 15 * 60 * 1000,
    max: 5,
    message: "Too many requests from this ip"
})

module.exports = limit;