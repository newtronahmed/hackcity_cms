const request = require('supertest')
const User = require('../models/userModel')
const app = require('../../index')
const superapp = request(app)
describe('Authentication testing endpoints', () => {
    beforeAll(async ()=> {
        await User.deleteMany()
    })
    // afterAll( async ()=> {
    //     await app.close()
    // })
    it('should signup user', async ()=>{
        let user = { 
            name: "Ahmed",
            email:"ahmed@hmail.com",
            password:"newpassword",
            username:"uniqueAhmed"
        }
        const res = await superapp
                    .post('/api/v1/auth/signup')
                    .send(user)
        expect(res.statusCode).toEqual(201)
        expect(res.body.user.name).toEqual('Ahmed')
    })
    it('should login user', async () => {
        // User.create = async (user) => {
        //     return {
        //         name: ""
        //     }
        // }
        let user = {
            usernameoremail: "ahmed@hmail.com",
            password:"newpassword"
        }
        const res = await superapp
                        .post('/api/v1/auth/login')
                        .send({useranameoremail: "ahmed@hmail.com", password: "newpassword"})
        expect(res.statusCode).toEqual(200)
        expect(res.body).toHaveProperty('token')
    })
    it('should also login user', async () => {
        const user = {
            usernameoremail: "uniqueAhmed",
            password:"newpassword"
        }
        const res = await superapp
                        .post('/api/v1/auth/login')
                        .send(user)
        expect(res.statusCode).toEqual(200)
        expect(res.body).toHaveProperty('token')
    })
    it('should return 400 error', async () => {
        const unknownUser = {
            email:"bedewi@hmail.com",
            password:"newpassword"
        }
        const res = await superapp
                        .post('/api/v1/auth/login')
                        .send(unknownUser)
        expect(res.statusCode).toEqual(500)
    })
})