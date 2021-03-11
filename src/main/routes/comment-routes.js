const { adaptRoute } = require('../adapters/express-route-adapter')
const { makeAddCommentController } = require('../factories/controllers/add-comment/add-comment-controller-factory')
const { makeLoadCommentsByPostIdController } = require('../factories/controllers/load-comments-by-post-id/load-comments-by-post-id-controller-factory')

module.exports = (router) => {
    router.post('/posts/:id/comments', adaptRoute(makeAddCommentController()))
    router.get('/posts/:id/comments', adaptRoute(makeLoadCommentsByPostIdController()))
}