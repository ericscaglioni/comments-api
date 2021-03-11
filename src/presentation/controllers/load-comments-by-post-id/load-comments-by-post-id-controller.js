const { InvalidParamError } = require('../../errors')
const { badRequest, serverError, ok } = require('../../helpers/http/http-helper')
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

            const comments = await this.iLoadCommentsByPostId.loadByPostId({
                postId
            })
            return ok(comments)
        } catch (error) {
            return serverError(error)
        }
    }
}

module.exports = {
    LoadCommentsByPostIdController
}
