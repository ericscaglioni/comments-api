const { IController } = require('../../presentation/protocols')

class LogControllerDecorator extends IController {
    constructor(iController, logErrorRepository) {
        super()
        this.iController = iController
        this.logErrorRepository = logErrorRepository
    }

    async handle (httpRequest) {
        this.iController.handle(httpRequest)
    }
}

module.exports = {
    LogControllerDecorator
}
