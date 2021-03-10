const { readFile, writeFile } = require('fs/promises')
const { IComment } = require('../../protocols/comment')
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
        return new NotImplementedException()
    }

    async connect () {
        return new NotImplementedException()
    }
}

module.exports = {
    FileStrategy
}
