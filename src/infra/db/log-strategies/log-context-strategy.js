const { ILogRepository } = require('../../../data/protocols/log-repository')

class LogContextStrategy extends ILogRepository {
    constructor(iLogStrategy) {
        super()
        this._logStrategy = iLogStrategy
    }

    async logError (errorStack) {
        this._logStrategy.logError(errorStack)
    }
}

module.exports = {
    LogContextStrategy
}
