const { InvalidParamError } = require('../../errors')
const { ILoadCommentsByPostId } = require('../../../domain/usecases/load-comments-by-post-id')
const { badRequest } = require('../../helpers/http/http-helper')
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
})
