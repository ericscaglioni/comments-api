const { IValidation } = require('../../protocols')
const { AddCommentController } = require('./add-comment-controller')
const { MissingParamError, InvalidParamError } = require('../../errors')
const { badRequest, serverError, created } = require('../../helpers/http/http-helper')
const { IAddComment } = require('../../../domain/usecases/add-comment')

const mockHttpRequest = () => ({
    params: {
        id: '1'
    },
    body: {
        content: 'any_content'
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

const mockIAddComment = () => {
    class IAddCommentStub extends IAddComment {
        async add ({ postId, content }) {
            return {
                [postId]: [{
                    id: 'any_comment_id',
                    content
                }]
            }
        }
    }
    return new IAddCommentStub()
}

const makeSut = () => {
    const iValidationStub = mockValidation()
    const iAddCommmentStub = mockIAddComment()
    const sut = new AddCommentController(
        iValidationStub,
        iAddCommmentStub
    )
    return {
        sut,
        iValidationStub,
        iAddCommmentStub
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

    it('Should return 400 if params.id is not a number', async () => {
        const { sut } = makeSut()
        const httpRequest = mockHttpRequest()
        httpRequest.params.id = 'invalid_number'
        const httpResponse = await sut.handle(httpRequest)
        expect(httpResponse).toEqual(badRequest(new InvalidParamError('id')))
    })

    it('Should return 400 if params.id is a negative number', async () => {
        const { sut } = makeSut()
        const httpRequest = mockHttpRequest()
        httpRequest.params.id = '-2'
        const httpResponse = await sut.handle(httpRequest)
        expect(httpResponse).toEqual(badRequest(new InvalidParamError('id')))
    })

    it('Should return 400 if params.id is equals 0', async () => {
        const { sut } = makeSut()
        const httpRequest = mockHttpRequest()
        httpRequest.params.id = '0'
        const httpResponse = await sut.handle(httpRequest)
        expect(httpResponse).toEqual(badRequest(new InvalidParamError('id')))
    })

    it('Should call IAddComment with correct data', async () => {
        const { sut, iAddCommmentStub } = makeSut()
        const addSpy = jest.spyOn(iAddCommmentStub, 'add')
        const httpRequest = mockHttpRequest()
        await sut.handle(httpRequest)
        expect(addSpy).toHaveBeenCalledWith({
            postId: parseInt(httpRequest.params.id),
            content: httpRequest.body.content
        })
    })

    it('Should return 500 if IAddComment throws', async () => {
        const { sut, iAddCommmentStub } = makeSut()
        jest.spyOn(iAddCommmentStub, 'add').mockImplementationOnce(() => {
            throw new Error()
        })
        const httpResponse = await sut.handle(mockHttpRequest())
        expect(httpResponse).toEqual(serverError(new Error()))
    })

    it('Should return 200 on success', async () => {
      const { sut } = makeSut()
      const httpResponse = await sut.handle(mockHttpRequest())
      expect(httpResponse).toEqual(created({
          ['1']: [{
              id: 'any_comment_id',
              content: 'any_content'
          }]
      }))
    })
})
