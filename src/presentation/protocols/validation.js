const { NotImplementedException } = require('../../utils/errors')

class IValidation {
    validate (input) {
        throw new NotImplementedException()
    }
}

module.exports = {
    IValidation
}
