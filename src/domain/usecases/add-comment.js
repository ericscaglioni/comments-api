const { NotImplementedException } = require('../../utils/errors')

class IAddComment {
    async add ({ postId, content }) {
        throw new NotImplementedException()
    }
}

module.exports = {
    IAddComment
}
