const { LogsRepository } = require('../../../../infra/db/log-strategies/filedb/logs-repository')
const { LogContextStrategy } = require('../../../../infra/db/log-strategies/log-context-strategy')
const { envConfig } = require('../../../config/environment')

const makeLogsRepository = () => {
    const logsRepository = new LogsRepository(
        envConfig.dbStrategyURL.file.logs
    )
    return new LogContextStrategy(logsRepository)
}

module.exports = {
    makeLogsRepository
}
