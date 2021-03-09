const { NotImplementedException } = require('../../utils/errors')

class IController {
    async handle (httpRequest) {
        return new NotImplementedException()
    }
}

module.exports = {
    IController
}
