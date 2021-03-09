const { MissingParamError } = require('../../presentation/errors')
const { IValidation } = require('../../presentation/protocols')

class RequiredFieldsValidator extends IValidation {
    constructor (fieldNames) {
        super()
        this.fieldNames = fieldNames
    }

    validate (input) {
        for (const fieldName of this.fieldNames) {
            if (!input[fieldName]) {
                return new MissingParamError(fieldName)
            }
        }
    }
}

module.exports = {
    RequiredFieldsValidator
}
