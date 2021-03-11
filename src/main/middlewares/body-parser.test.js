const request = require('supertest')
const app = require('../config/app')

describe('Body Parser Middleware suite tests', () => {
  afterAll(async () => {
    await new Promise(resolve => setTimeout(() => resolve(), 500)); // avoid jest open handle error
  });
  
    it('Should parse body as json', async () => {
      app.post('/test_body_parser', (req, res) => {
        res.send(req.body)
      })
  
      await request(app)
        .post('/test_body_parser')
        .send({ name: 'any_name' })
        .expect({ name: 'any_name' })
    })
})
