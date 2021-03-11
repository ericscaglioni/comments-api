const { NotImplementedException } = require('../../../utils/errors')

class IComment {
    async add ({ postId, content }) {
        throw new NotImplementedException()
    }

    async connect () {
        throw new NotImplementedException()
    }

    async loadByPostId ({ postId }) {
        throw new NotImplementedException()
    }
}

module.exports = {
    IComment
}
