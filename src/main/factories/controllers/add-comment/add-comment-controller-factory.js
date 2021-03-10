const { AddCommentController } = require('../../../../presentation/controllers/add-comment/add-comment-controller')
const { makeAddCommentValidation } = require('./add-comment-validation-factory')
const { makeDbAddComment } = require('../../usecases/add-comment/db-add-comment-factory')

const makeAddCommentController = () =>
    new AddCommentController(makeAddCommentValidation(), makeDbAddComment())

module.exports = {
    makeAddCommentController
}
