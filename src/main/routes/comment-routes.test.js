const request = require('supertest')
const app = require('../config/app')

describe('Comments Routes suite tests', () => {
    describe('POST /posts/:id/comments', () => {
        it('Should return 400 if the provided id is invalid', async () => {
            await request(app)
                .post('/api/posts/1/comments')
                .send({
                    content: 'any_comment'
                })
                .expect(400)
        })
    })
})
