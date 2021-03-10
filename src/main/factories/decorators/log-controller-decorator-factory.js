const { makeLogErrorRepository } = require('../repositories/filedb/log-error-repository-factory')
const { LogControllerDecorator } = require('../../decorators/log-controller-decorator')

const makeLogControllerDecorator = (iController) => 
    new LogControllerDecorator(iController, makeLogErrorRepository())

module.exports = {
    makeLogControllerDecorator
}
