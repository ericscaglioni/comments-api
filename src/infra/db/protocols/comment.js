const { NotImplementedException } = require('../../../utils/errors')

class IComment {
    async add ({ postId, content }) {
        return new NotImplementedException()
    }

    async connect () {
        return new NotImplementedException()
    }

    async loadByPostId ({ postId }) {
        return new NotImplementedException()
    }
}

module.exports = {
    IComment
}
