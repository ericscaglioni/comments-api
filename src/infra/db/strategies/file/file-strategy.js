const { IComment } = require('../../protocols/comment')
const { readFile, writeFile } = require('fs/promises')
const { NotImplementedException } = require('../../../../utils/errors')

class FileStrategy extends IComment {
    constructor (filePath) {
        super()
        // this.filePath = `${process.cwd()}/${envConfig.dbStrategyURL.file}`
        this.filePath = filePath
    }

    async readFile () {
        const content = JSON.parse(
            await readFile(this.filePath)
        )
        return content
    }

    async writeFile (content) {
        await writeFile(
            this.filePath,
            JSON.stringify(content)
        )
    }

    async add ({ postId, content }) {
        return NotImplementedException()
    }

    // async add ({ postId, content }) {
    //     const commentsByPostId = await this._readFile()
    //     const comment = new CommentModel({
    //         id: uuidv4(),
    //         content
    //     })
    //     const post = commentsByPostId[postId] || []
    //     post.push(comment)
    //     commentsByPostId[postId] = post
    //     await this._writeFile(commentsByPostId)
    //     return post
    // }
}

module.exports = {
    FileStrategy
}
