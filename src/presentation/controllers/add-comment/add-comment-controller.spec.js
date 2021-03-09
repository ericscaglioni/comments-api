const { IValidation } = require('../../protocols')
const { AddCommentController } = require('./add-comment-controller')

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
})
