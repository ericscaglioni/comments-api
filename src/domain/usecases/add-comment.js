const { NotImplementedException } = require('../../utils/errors')

class IAddComment {
    async add ({ postId, content }) {
        return new NotImplementedException()
    }
}

module.exports = {
    IAddComment
}
