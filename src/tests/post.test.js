const request = require('supertest')
const Post = require('../models/postModel')
const app = require('../../index')
// const base_url = ""
let postId = null
const superapp = request(app)
describe('Post crud endpoints', () => {
    beforeAll(async () => {
        // Clear posts before each test
        await Post.deleteMany()
    })
    // afterAll( async ()=> {
    //     await app.close()
    // })
    it('should create a new post', async function () {
        const res = await superapp
            .post('/api/v1/posts')
            .send({ title: "new title", content: "This is a new body" })

        expect(res.statusCode).toEqual(201)
        postId = res.body.data._id
        expect(res.body.data).toHaveProperty('title')
    })
    it('should get the created post', async () => {

        const res = await superapp.get(`/api/v1/posts/${postId}`);
        // console.log(postId)
        expect(res.statusCode).toEqual(200);
        expect(res.body.data).toHaveProperty('_id');

    });
    it('should return 400 error', async () => {

        const res = await superapp.get(`/api/v1/posts/0`);
        // console.log(postId)
        expect(res.statusCode).toEqual(400);
        // expect(res.body.data).toHaveProperty('_id');
    });
    it('should update the post', async ()=>{
        const res = await superapp
                    .patch(`/api/v1/posts/${postId}`)
                    .send({ title: "Updated Title"})
        expect(res.statusCode).toEqual(200)
        expect(res.body.data.title).toEqual('Updated Title')
    })
})