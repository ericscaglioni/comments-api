const { ILogRepository } = require('../../../../data/protocols/log-repository')
const { FileHelper } = require('../../../../utils/helpers/file-helper')

class LogsRepository extends ILogRepository {
    constructor(filePath) {
        super()
        this.filePath = filePath
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

    async logError (errorStack) {
        const logs = await this._readFile()
        logs.push({
            error: errorStack,
            date: new Date()
        })
        await this._writeFile(logs)
    }
}

module.exports = {
    LogsRepository
}
