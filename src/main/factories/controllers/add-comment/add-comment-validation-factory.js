const { RequiredFieldsValidator } = require('../../../../validation/validators/required-fields-validator')

const makeAddCommentValidation = () => {
    const requiredFields = ['content']
    return new RequiredFieldsValidator(requiredFields)
}

module.exports = {
    makeAddCommentValidation
}
