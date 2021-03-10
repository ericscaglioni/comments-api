const { FileStrategy } = require('../../strategies/file/file-strategy')

class LogErrorRepository extends FileStrategy {
    constructor(filePath) {
        super(filePath)
    }

    async connect () {
        return Promise.resolve()
    }

    async add (errorStack) {
        const logs = await this.readFile()
        logs.push({
            error: errorStack,
            date: new Date()
        })
        await this.writeFile(logs)
    }
}

module.exports = {
    LogErrorRepository
}
