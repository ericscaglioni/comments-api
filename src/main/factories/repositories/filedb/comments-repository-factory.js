const { CommentsRepository } = require('../../../../infra/db/strategies/filedb/comments/comments-repository')
const { ContextStrategy } = require('../../../../infra/db/strategies/context-strategy')
const { envConfig } = require('../../../config/environment')

const makeFileCommentsRepository = () => {
    const commentsRepository = new CommentsRepository(
        envConfig.dbStrategyURL.file.comments
    )
    return new ContextStrategy(commentsRepository)
}

module.exports = {
    makeFileCommentsRepository
}
