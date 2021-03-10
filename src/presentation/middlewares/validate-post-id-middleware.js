const { InvalidParamError } = require('../errors')
const { badRequest } = require('../helpers/http/http-helper')
const { Middleware } = require('../protocols/middleware')

class ValidatePostIdMiddleware extends Middleware {
    constructor(iLoadPostCommentsByPostId) {
        super()
        this.iLoadPostCommentsByPostId = iLoadPostCommentsByPostId
    }

    async handle (httpRequest) {
        const postId = parseInt(httpRequest.params.id)
        if (!postId) {
            return badRequest(new InvalidParamError('id'))
        }
        const comments = await this.iLoadPostCommentsByPostId.loadByPostId(postId)    
        if (!comments.length) {
            return badRequest(new InvalidParamError('id'))
        }
    }
}

module.exports = {
    ValidatePostIdMiddleware
}
