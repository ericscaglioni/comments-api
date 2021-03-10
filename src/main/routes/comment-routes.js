const { adaptRoute } = require('../adapters/express-route-adapter')
const { makeAddCommentController } = require('../factories/controllers/add-comment/add-comment-controller-factory')

module.exports = (router) => {
    router.post('/posts/:id/comments', adaptRoute(makeAddCommentController()))
}