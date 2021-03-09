const { IValidation } = require('../../protocols')
const { AddCommentController } = require('./add-comment-controller')
const { MissingParamError } = require('../../errors')
const { badRequest } = require('../../helpers/http/http-helper')

const mockHttpRequest = () => ({
    params: {
        id: 'any_post_id'
    },
    body: {
        content: 'any_title'
    }
})

const mockValidation = () => {
    class IValidationStub extends IValidation {
        validate (input) {
            return null
        }
    }
    return new IValidationStub()
}

const makeSut = () => {
    const iValidationStub = mockValidation()
    const sut = new AddCommentController(
        iValidationStub
    )
    return {
        sut,
        iValidationStub
    }
}

describe('Add Comment Controller suite tests', () => {
    it('Should call IValidation with correct data', async () => {
        const { sut, iValidationStub } = makeSut()
        const validateSpy = jest.spyOn(iValidationStub, 'validate')
        const httpRequest = mockHttpRequest()
        await sut.handle(httpRequest)
        expect(validateSpy).toHaveBeenCalledWith(httpRequest.body)
    })

    it('Should return 400 if IValidation returns an error', async () => {
        const { sut, iValidationStub } = makeSut()
        jest.spyOn(iValidationStub, 'validate').mockReturnValueOnce(new MissingParamError('any_field'))
        const httpResponse = await sut.handle(mockHttpRequest())
        expect(httpResponse).toEqual(badRequest(new MissingParamError('any_field')))
    })
})
