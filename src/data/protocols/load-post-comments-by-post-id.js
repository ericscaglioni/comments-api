const { NotImplementedException } = require('../../utils/errors')

class ILoadPostCommentsByPostId {
    async loadByPostId (postId) {
        return NotImplementedException()
    }
}

module.exports = {
    ILoadPostCommentsByPostId
}
