const { IValidation } = require('../../protocols')
const { ILoadCommentsByPostId } = require('../../../domain/usecases/load-comments-by-post-id')
const { LoadCommentsByPostIdController } = require('./load-comments-by-post-id-controller')

const mockHttpRequest = () => ({
    params: {
        id: '1'
    }
})

const mockILoadCommentsByPostId = () => {
    class ILoadCommentsByPostIdStub extends ILoadCommentsByPostId {
        async loadByPostId ({ postId }) {
            return [{
                id: 'any_comment_id',
                content: 'any_content'
            }, {
                id: 'any_comment_id',
                content: 'any_content'
            }]
        }
    }
    return new ILoadCommentsByPostIdStub()
}

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
    const iLoadCommmentsByPostIdStub = mockILoadCommentsByPostId()
    const sut = new LoadCommentsByPostIdController(
        iValidationStub,
        iLoadCommmentsByPostIdStub
    )
    return {
        sut,
        iValidationStub,
        iLoadCommmentsByPostIdStub
    }
}

describe('Load Comments By Post Id Controller suite tests', () => {
    it('Should call IValidation with correct data', async () => {
        const { sut, iValidationStub } = makeSut()
        const validateSpy = jest.spyOn(iValidationStub, 'validate')
        const httpRequest = mockHttpRequest()
        await sut.handle(httpRequest)
        expect(validateSpy).toHaveBeenCalledWith(httpRequest.body)
    })
})
