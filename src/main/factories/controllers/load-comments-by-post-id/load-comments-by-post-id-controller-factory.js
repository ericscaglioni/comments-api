const { LoadCommentsByPostIdController } = require('../../../../presentation/controllers/load-comments-by-post-id/load-comments-by-post-id-controller')
const { makeDbLoadCommentsByPostId } = require('../../usecases/load-comments-by-post-id/db-load-comments-by-post-id-factory')
const { makeLogControllerDecorator } = require('../../decorators/log-controller-decorator-factory')

const makeLoadCommentsByPostIdController = () => {
    const loadCommentsByPostIdController = new LoadCommentsByPostIdController(
        makeDbLoadCommentsByPostId()
    )
    return makeLogControllerDecorator(loadCommentsByPostIdController)
}

module.exports = {
    makeLoadCommentsByPostIdController
}
