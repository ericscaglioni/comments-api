const { DbAddComment } = require('../../../../data/usecases/add-comment/db-add-comment')
const { makeFileCommentsRepository } = require('../../repositories/filedb/comments-repository-factory')

const makeDbAddComment = () => new DbAddComment(makeFileCommentsRepository())

module.exports = {
    makeDbAddComment
}
