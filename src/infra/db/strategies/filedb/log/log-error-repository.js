const { IComment } = require('../../../protocols/comment')
const { FileHelper } = require('../../../../../utils/helpers/file-helper')

class LogErrorRepository extends IComment {
    constructor(filePath) {
        super()
        this.filePath = filePath
    }

    async connect () {
        return Promise.resolve()
    }

    async add (errorStack) {
        const logs = await FileHelper.readFile(this.filePath)
        logs.push({
            error: errorStack,
            date: new Date()
        })
        await FileHelper.writeFile({
            path: this.filePath,
            content: logs
        })
    }
}

module.exports = {
    LogErrorRepository
}
