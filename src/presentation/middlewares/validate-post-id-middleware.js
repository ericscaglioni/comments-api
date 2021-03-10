const { Middleware } = require('../protocols/middleware')

class ValidatePostIdMiddleware extends Middleware {
    constructor(iLoadPostCommentsByPostId) {
        super()
        this.iLoadPostCommentsByPostId = iLoadPostCommentsByPostId
    }

    async handle (httpRequest) {
        const postId = parseInt(httpRequest.params.id)
        this.iLoadPostCommentsByPostId.loadByPostId(postId)    
    }
}

module.exports = {
    ValidatePostIdMiddleware
}
