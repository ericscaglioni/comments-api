const { InvalidParamError } = require('../errors')
const { badRequest, serverError } = require('../helpers/http/http-helper')
const { Middleware } = require('../protocols/middleware')

class ValidatePostIdMiddleware extends Middleware {
    constructor(iLoadPostCommentsByPostId) {
        super()
        this.iLoadPostCommentsByPostId = iLoadPostCommentsByPostId
    }

    async handle (httpRequest) {
        try {
            const postId = parseInt(httpRequest.params.id)
            if (!postId) {
                return badRequest(new InvalidParamError('id'))
            }
            const comments = await this.iLoadPostCommentsByPostId.loadByPostId(postId)    
            if (!comments.length) {
                return badRequest(new InvalidParamError('id'))
            }
        } catch (error) {
            return serverError(error)
        }
    }
}

module.exports = {
    ValidatePostIdMiddleware
}
