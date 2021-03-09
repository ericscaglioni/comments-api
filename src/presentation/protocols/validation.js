const { NotImplementedException } = require('../../utils/errors')

class IValidation {
    validate (input) {
        return new NotImplementedException()
    }
}

module.exports = {
    IValidation
}
