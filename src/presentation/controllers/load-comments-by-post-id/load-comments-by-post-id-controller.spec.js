const { InvalidParamError } = require('../../errors')
const { ILoadCommentsByPostId } = require('../../../domain/usecases/load-comments-by-post-id')
const { badRequest, serverError } = require('../../helpers/http/http-helper')
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

const makeSut = () => {
    const iLoadCommmentsByPostIdStub = mockILoadCommentsByPostId()
    const sut = new LoadCommentsByPostIdController(
        iLoadCommmentsByPostIdStub
    )
    return {
        sut,
        iLoadCommmentsByPostIdStub
    }
}

describe('Load Comments By Post Id Controller suite tests', () => {
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

    it('Should call ILoadCommentsByPostId with correct data', async () => {
        const { sut, iLoadCommmentsByPostIdStub } = makeSut()
        const loadByPostIdSpy = jest.spyOn(iLoadCommmentsByPostIdStub, 'loadByPostId')
        const httpRequest = mockHttpRequest()
        await sut.handle(httpRequest)
        expect(loadByPostIdSpy).toHaveBeenCalledWith({
            postId: 1
        })
    })

    it('Should return 500 if ILoadCommentsByPostId throws', async () => {
        const { sut, iLoadCommmentsByPostIdStub } = makeSut()
        jest.spyOn(iLoadCommmentsByPostIdStub, 'loadByPostId').mockImplementationOnce(() => {
            throw new Error()
        })
        const httpResponse = await sut.handle(mockHttpRequest())
        expect(httpResponse).toEqual(serverError(new Error()))
    })
})
