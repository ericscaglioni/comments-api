const { makeLogsRepository } = require('../repositories/filedb/logs-repository-factory')
const { LogControllerDecorator } = require('../../decorators/log-controller-decorator')

const makeLogControllerDecorator = (iController) => 
    new LogControllerDecorator(iController, makeLogsRepository())

module.exports = {
    makeLogControllerDecorator
}
