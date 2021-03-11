const { IComment } = require("../protocols/comment")

class ContextStrategy extends IComment {
    constructor(iCommentStrategy) {
        super()
        this._database = iCommentStrategy
    }

    async add (postModel) {
        return this._database.add(postModel)
    }

    async connect () {
        return this._database.connect()
    }

    async loadByPostId ({ postId }) {
        return this._database.loadByPostId({ postId })
    }
}

module.exports = {
    ContextStrategy
}
