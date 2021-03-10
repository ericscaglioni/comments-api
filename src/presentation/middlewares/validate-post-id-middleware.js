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
        this.iLoadPostCommentsByPostId.loadByPostId(postId)    
    }
}

module.exports = {
    ValidatePostIdMiddleware
}
