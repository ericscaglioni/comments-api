const { NotImplementedException } = require('../../utils/errors')

class ILogRepository {
    async logError (errorStack) {
        return NotImplementedException()
    }
}

module.exports = {
    ILogRepository
}
