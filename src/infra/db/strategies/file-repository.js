const { IComment } = require('../protocols/comment')
const { readFile, writeFile } = require('fs/promises')
const { CommentModel } = require('../../../domain/models/comment-model')
const { envConfig } = require('../../../main/config/environment')
const { v4: uuidv4 } = require('uuid')

class FileRepository extends IComment {
    constructor () {
        super()
        this.filePath = `${process.cwd()}/${envConfig.dbStrategyURL.file}`
    }

    async _readFile () {
        const content = JSON.parse(
            await readFile(this.filePath)
        )
        return content
    }

    async _writeFile (content) {
        await writeFile(
            this.filePath,
            JSON.stringify(content)
        )
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
    FileRepository
}
