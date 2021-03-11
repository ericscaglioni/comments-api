const request = require('supertest')
const app = require('../config/app')

describe('Comments Routes suite tests', () => {
    describe('POST /posts/:id/comments', () => {
        it('Should return 400 if the provided id is invalid', async () => {
            await request(app)
                .post('/api/posts/invalid_id/comments')
                .send({
                    content: 'any_comment'
                })
                .expect(400)
        })

        it('Should return 201 on success', async () => {
            await request(app)
                .post('/api/posts/1/comments')
                .send({
                    content: 'any_comment'
                })
                .expect(201)
        })
    })

    describe('GET /posts/:id/comments', () => {
        it('Should return 400 if the provided id is invalid', async () => {
            await request(app)
                .get('/api/posts/invalid_id/comments')
                .expect(400)
        })

        it('Should return 200 on success', async () => {
            await request(app)
                .get('/api/posts/1/comments')
                .expect(200)
        })
    })
})
