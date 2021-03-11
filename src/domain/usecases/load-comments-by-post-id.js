const { NotImplementedException } = require('../../utils/errors')

class ILoadCommentsByPostId {
    async loadByPostId ({ postId }) {
        return new NotImplementedException()
    }
}

module.exports = {
    ILoadCommentsByPostId
}
