const { NotImplementedException } = require('../../utils/errors')

class IController {
    async handle (httpRequest) {
        throw new NotImplementedException()
    }
}

module.exports = {
    IController
}
