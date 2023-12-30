const request = require('supertest')
const Category = require('../models/categoryModel')
const app = require('../../index')
// const base_url = ""
let categoryId = null
const superapp = request(app)
describe('Category crud endpoints', () => {
    beforeAll(async () => {
        // Clear posts before each test
        await Category.deleteMany()
    })
    // afterAll( async ()=> {
    //     await app.close()
    // })
    it('should create a new category', async function () {
        const res = await superapp
            .post('/api/v1/categories')
            .send({ name: "new category", description: "nice description"})

        expect(res.statusCode).toEqual(201)
        categoryId = res.body.data._id
        expect(res.body.data).toHaveProperty('name')
    })
    it('should get the created category', async () => {

        const res = await superapp.get(`/api/v1/categories/${categoryId}`);
        // console.log(categoryId)
        expect(res.statusCode).toEqual(200);
        expect(res.body.data).toHaveProperty('_id');

    });
    it('should return 400 error', async () => {

        const res = await superapp.get(`/api/v1/categories/0`);
        // console.log(categoryId)
        expect(res.statusCode).toEqual(400);
        // expect(res.body.data).toHaveProperty('_id');
    });
    it('should update the category', async ()=>{
        const res = await superapp
                    .patch(`/api/v1/categories/${categoryId}`)
                    .send({ name: "Updated Title"})
        expect(res.statusCode).toEqual(200)
        expect(res.body.data.title).toEqual('Updated Title')
    })
})