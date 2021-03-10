const { AddCommentController } = require('../../../../presentation/controllers/add-comment/add-comment-controller')
const { makeAddCommentValidation } = require('./add-comment-validation-factory')
const { makeDbAddComment } = require('../../usecases/add-comment/db-add-comment-factory')
const { makeLogControllerDecorator } = require('../../decorators/log-controller-decorator-factory')

const makeAddCommentController = () => {
    const addCommentController = new AddCommentController(
        makeAddCommentValidation(),
        makeDbAddComment()
    )
    return makeLogControllerDecorator(addCommentController)
}

module.exports = {
    makeAddCommentController
}
