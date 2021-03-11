const { IComment } = require('../../../protocols/comment')
const { CommentModel } = require('../../../../../domain/models/comment-model')
const { v4: uuidv4 } = require('uuid')
const { FileHelper } = require('../../../../../utils/helpers/file-helper')

class CommentsRepository extends IComment {
    constructor(filePath) {
        super()
        this.filePath = filePath
    }

    async connect () {
        return Promise.resolve()
    }

    async _readFile () {
        return await FileHelper.readFile(this.filePath)
    }

    async _writeFile (content) {
        await FileHelper.writeFile({
            path: this.filePath,
            content
        })
    }

    async add ({ postId, content }) {
        const commentsByPostId = await this._readFile()
        const comment = new CommentModel({
            id: uuidv4(),
            content
        })
        const post = commentsByPostId[postId] || []
        post.push(comment)
        commentsByPostId[postId] = post
        await this._writeFile(commentsByPostId)
        return post
    }
}

module.exports = {
    CommentsRepository
}
