const { InvalidParamError } = require('../../errors')
const { badRequest, serverError, ok, created } = require('../../helpers/http/http-helper')
const { IController } = require('../../protocols')

class LoadCommentsByPostIdController extends IController {
    constructor(iLoadCommentsByPostId) {
        super()
        this.iLoadCommentsByPostId = iLoadCommentsByPostId
    }

    async handle (httpRequest) {
        try {
            const { id } = httpRequest.params
            const postId = parseInt(id)
            if (!postId || postId < 0) {
                return badRequest(new InvalidParamError('id'))
            }

            const { content } = httpRequest.body
            
            const comments = await this.iLoadCommentsByPostId.add({
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
    LoadCommentsByPostIdController
}
