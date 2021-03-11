const { LogErrorRepository } = require('../../../../infra/db/strategies/filedb/log/log-error-repository')
const { ContextStrategy } = require('../../../../infra/db/strategies/context-strategy')
const { envConfig } = require('../../../config/environment')

const makeLogErrorRepository = () => {
    const logErrorRepository = new LogErrorRepository(
        envConfig.dbStrategyURL.file.logs
    )
    return new ContextStrategy(logErrorRepository)
}

module.exports = {
    makeLogErrorRepository
}
