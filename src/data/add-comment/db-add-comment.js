const { IAddComment } = require('../../domain/usecases/add-comment')

class DbAddComment extends IAddComment {
    constructor(iAddCommentRepository) {
        super()
        this.iAddCommentRepository = iAddCommentRepository
    }

    async add ({ postId, content }) {
        return await this.iAddCommentRepository
            .add({ postId, content })
    }
}

module.exports = {
    DbAddComment
}
