const { DbLoadCommentsByPostId } = require('../../../../data/usecases/load-comments-by-post-id/db-load-comments-by-post-id')
const { makeFileCommentsRepository } = require('../../repositories/filedb/comments-repository-factory')

const makeDbLoadCommentsByPostId = () => new DbLoadCommentsByPostId(makeFileCommentsRepository())

module.exports = {
    makeDbLoadCommentsByPostId
}
