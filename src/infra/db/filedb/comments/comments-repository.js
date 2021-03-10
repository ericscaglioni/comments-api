const { FileStrategy } = require('../../strategies/file/file-strategy')
const { CommentModel } = require('../../../../domain/models/comment-model')
const { v4: uuidv4 } = require('uuid')

class CommentsRepository extends FileStrategy {
    constructor(filePath) {
        super(filePath)
    }

    async connect () {
        return Promise.resolve()
    }

    async add ({ postId, content }) {
        const commentsByPostId = await this.readFile()
        const comment = new CommentModel({
            id: uuidv4(),
            content
        })
        const post = commentsByPostId[postId] || []
        post.push(comment)
        commentsByPostId[postId] = post
        await this.writeFile(commentsByPostId)
        return post
    }
}

module.exports = {
    CommentsRepository
}
