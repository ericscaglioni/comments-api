const { badRequest, serverError } = require('../../helpers/http/http-helper')
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
            const { content } = httpRequest.body
            const { id: postId } = httpRequest.params
            this.iAddComment.add({
                postId,
                content
            })
        } catch (error) {
            return serverError(error)
        }
    }
}

module.exports = {
    AddCommentController
}
