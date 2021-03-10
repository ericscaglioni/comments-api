const { DbAddComment } = require('../../../../data/usecases/add-comment/db-add-comment')
const { makeDbStrategy } = require('../../db-strategy/db-strategy-factory')

const makeDbAddComment = () => new DbAddComment(makeDbStrategy())

module.exports = {
    makeDbAddComment
}
