const { MissingParamError } = require('../../presentation/errors')
const { RequiredFieldsValidator } = require('./required-fields-validator')

const requiredFields = ['title']

const makeSut = () => new RequiredFieldsValidator(requiredFields)

describe('Required Fields Validator suite tests', () => {
    it('Should return a MissingParamError if validation fails', () => {
        const sut = makeSut()
        const error = sut.validate({
            text: 'any_text'
        })
        expect(error).toEqual(new MissingParamError(requiredFields[0]))
    })

    it('Should not return if validation succeeds', () => {
        const sut = makeSut()
        const error = sut.validate({ title: 'any_title' })
        expect(error).toBeFalsy()
    })
});