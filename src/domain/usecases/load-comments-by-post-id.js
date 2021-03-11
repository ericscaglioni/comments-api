const { NotImplementedException } = require('../../utils/errors')

class ILoadCommentsByPostId {
    async loadByPostId ({ postId }) {
        throw new NotImplementedException()
    }
}

module.exports = {
    ILoadCommentsByPostId
}
