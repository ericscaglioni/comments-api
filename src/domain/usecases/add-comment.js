const { NotImplementedException } = require('../../utils/errors')

class IAddComment {
    add ({ postId, content }) {
        return new NotImplementedException()
    }
}

module.exports = {
    IAddComment
}
