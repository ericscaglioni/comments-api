const { InvalidParamError } = require('../../errors')
const { badRequest, serverError, ok, created } = require('../../helpers/http/http-helper')
const { IController } = require('../../protocols')

class AddCommentController extends IController {
    constructor(iValidation, iAddComment) {
        super()
        this.iValidation = iValidation
        this.iAddComment = iAddComment
    }

    async handle (httpRequest) {
        try {
            const error = this.iValidation.validate(httpRequest.body)
            if (error) {
                return badRequest(error)
            }
            const { id } = httpRequest.params
            const postId = parseInt(id)
            if (!postId || postId < 0) {
                return badRequest(new InvalidParamError('id'))
            }

            const { content } = httpRequest.body
            
            const comments = await this.iAddComment.add({
                postId,
                content
            })
            return created(comments)
        } catch (error) {
            return serverError(error)
        }
    }
}

module.exports = {
    AddCommentController
}
