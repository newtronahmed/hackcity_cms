const express = require('express');
const app = express();
const mongoose = require('mongoose');
const passport = require('passport')
const cors = require('cors')
const helmet = require('helmet')
const cookieParser = require('cookie-parser')
const swaggerJsDoc = require('swagger-jsdoc')
const swaggerUiExpress = require('swagger-ui-express')

const v1Posts = require("./src/v1/routes/posts")
const v1Categories = require("./src/v1/routes/categories")
const v1Profile = require('./src/v1/routes/profile')
const v1Auth = require('./src/v1/routes/auth')
const v1User = require('./src/v1/routes/user')
const v1Like = require('./src/v1/routes/like')
const v1Follow = require('./src/v1/routes/follow')
const v1Comment = require('./src/v1/routes/comment')
const rolesMiddleware = require('./src/middleware/roles')

require('./src/middleware/auth')

if (process.env.NODE_ENV != "production") {
    require("dotenv").config()
}

//register middlewares
app.use(cookieParser())
app.use(cors())
app.use(express.json());
app.use(helmet())
app.use(express.urlencoded({ extended: true }));

//swagger
const options = {
    definition: {
        openapi: "3.1.0",
        info: {
            titile: "Connext API Documentation",
            version: "0.1.0",
            description: "This is the backend implementation of a social media network application",
            license: {
                name: "MIT",
                url: "https://spdx.org/licenses/MIT.html",
            },
            contact: {
                name: "NeutronAhmed",
                url: "neutro-portfolio.netlify.app",
                email: "hmedzubairu365@gmail.com"
            },

        },
        servers:[
            {
                url: "http://localhost:4000"
            }
        ]
    },
    apis: ["./src/v1/routes/*.js"]
}
const spec = swaggerJsDoc(options)
app.use('/v1/api-docs', swaggerUiExpress.serve, swaggerUiExpress.setup(spec))

//route middlewares
app.use('/api/v1/posts', v1Posts)
app.use('/api/v1/categories', v1Categories)
app.use('/api/v1/auth', v1Auth)
app.use('/api/v1/profile', passport.authenticate('jwt', { session: false }), v1Profile)
app.use('/api/v1/users', passport.authenticate('jwt', { session: false }), rolesMiddleware("Admin"), v1User)
app.use('/api/v1/like', passport.authenticate('jwt', { session: false}), v1Like )
app.use('/api/v1/follow', passport.authenticate('jwt', { session: false}), v1Follow)
app.use('/api/v1/comments', v1Comment)

//Global error handler
app.use((err, req, res, next) => {
    console.log('global error handler')
    console.log(err.message)
    console.log(err.stack)
    const message = err.message ?? "Internal server error"
    if (process.env.NODE_ENV != "production") {
        return res.status(err.statusCode).json({ status: "FAILED", error: err })
    }
    res.status(err.statusCode ?? 500).json({ status: "FAILED", message })
})

//Test server endpoint
app.get('/api/v1/', (req, res) => {
    res.send({ message: "OK" })
})

// const PORT = process.env.PORT || 4000
const URL = process.env.NODE_ENV == "test" ? process.env.TEST_DB_URL : process.env.DB_URL

//Connect to database
mongoose.connect(URL, { useNewUrlParser: true })
    .then(() => console.log('Connected to database.....'))
    .catch((err) => console.log('An error occured:', err.message))


module.exports = app


