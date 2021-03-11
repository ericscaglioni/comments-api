const { NotImplementedException } = require('../../utils/errors')

class ILogErrorRepository {
    async logError (stack) {
        return NotImplementedException()
    }
}

module.exports = {
    ILogErrorRepository
}
