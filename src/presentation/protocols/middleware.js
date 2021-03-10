const { NotImplementedException } = require('../../utils/errors')

class Middleware {
    async handle (httpRequest) {
        return NotImplementedException()
    }
}

module.exports = {
    Middleware
}
