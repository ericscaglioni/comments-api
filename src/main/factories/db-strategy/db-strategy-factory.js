const { ContextStrategy } = require('../../../infra/db/context-strategy')
const { FileRepository } = require('../../../infra/db/strategies/file-repository')

const makeDbStrategy = () => {
    const fileRepository = new FileRepository()
    return new ContextStrategy(fileRepository)
}

module.exports = {
    makeDbStrategy
}
