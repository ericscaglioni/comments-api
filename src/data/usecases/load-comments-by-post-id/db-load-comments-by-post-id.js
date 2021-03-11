const { ILoadCommentsByPostId } = require('../../../domain/usecases/load-comments-by-post-id')

class DbLoadCommentsByPostId extends ILoadCommentsByPostId {
    constructor(iLoadCommentsByPostIdRepository) {
        super()
        this.iLoadCommentsByPostIdRepository = iLoadCommentsByPostIdRepository
    }

    async loadByPostId ({ postId }) {
        return await this.iLoadCommentsByPostIdRepository.loadByPostId({
            postId
        })
    }
}

module.exports = {
    DbLoadCommentsByPostId
}
