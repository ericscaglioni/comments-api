const { IController } = require('../../presentation/protocols')

class LogControllerDecorator extends IController {
    constructor(iController, logErrorRepository) {
        super()
        this.iController = iController
        this.logErrorRepository = logErrorRepository
    }

    async handle (httpRequest) {
        const httpResponse = await this.iController.handle(httpRequest)
        return httpResponse
    }
}

module.exports = {
    LogControllerDecorator
}
