const { ILoadPostCommentsByPostId } = require('../../data/protocols/load-post-comments-by-post-id')
const { badRequest, serverError, ok } = require('../helpers/http/http-helper')
const { ValidatePostIdMiddleware } = require('./validate-post-id-middleware')
const { InvalidParamError } = require('../errors')

const mockHttpRequest = () => ({
    params: {
        id: '1'
    },
    body: {
        content: 'any_content'
    }
})

const mockLoadPostCommentsByPostId = () => {
    class LoadPostCommentsByPostIdStub extends ILoadPostCommentsByPostId {
        async loadByPostId (postId) {
            return [{
                id: 'any_comment_id',
                content: 'any_content'
            }, {
                id: 'any_comment_id_2',
                content: 'any_content_2'
            }]
        }
    }
    return new LoadPostCommentsByPostIdStub()
}

const makeSut = () => {
    const iLoadPostCommentsByPostId = mockLoadPostCommentsByPostId()
    const sut = new ValidatePostIdMiddleware(iLoadPostCommentsByPostId)
    return {
        sut,
        iLoadPostCommentsByPostId
    }
}

describe('Validate Post Id Middleware suite tests', () => {
    it('Should call ILoadPostCommentsByPostId with correct id', async () => {
        const { sut, iLoadPostCommentsByPostId } = makeSut()
        const loadByPostIdSpy = jest.spyOn(iLoadPostCommentsByPostId, 'loadByPostId')
        const httpRequest = mockHttpRequest()
        await sut.handle(httpRequest)
        expect(loadByPostIdSpy).toHaveBeenCalledWith(parseInt(httpRequest.params.id))
    })

    it('Should not call ILoadPostCommentsByPostId if post it is not a number', async () => {
        const { sut, iLoadPostCommentsByPostId } = makeSut()
        const loadByPostIdSpy = jest.spyOn(iLoadPostCommentsByPostId, 'loadByPostId')
        const httpRequest = mockHttpRequest()
        httpRequest.params.id = 'any_string'
        await sut.handle(httpRequest)
        expect(loadByPostIdSpy).not.toHaveBeenCalled()
    })

    it('Should return 400 post id is not a number', async () => {
        const { sut } = makeSut()
        const httpRequest = mockHttpRequest()
        httpRequest.params.id = 'any_string'
        const httpResponse = await sut.handle(httpRequest)
        expect(httpResponse).toEqual(badRequest(new InvalidParamError('id')))
    })

    it('Should return 400 if ILoadPostCommentsByPostId returns an empty array', async () => {
        const { sut, iLoadPostCommentsByPostId } = makeSut()
        jest.spyOn(iLoadPostCommentsByPostId, 'loadByPostId').mockResolvedValueOnce([])
        const httpResponse = await sut.handle(mockHttpRequest())
        expect(httpResponse).toEqual(badRequest(new InvalidParamError('id')))
    })

    it('Should return 500 if ILoadPostCommentsByPostId throws', async () => {
        const { sut, iLoadPostCommentsByPostId } = makeSut()
        jest.spyOn(iLoadPostCommentsByPostId, 'loadByPostId').mockImplementationOnce(() => {
            throw new Error()
        })
        const httpResponse = await sut.handle(mockHttpRequest())
        expect(httpResponse).toEqual(serverError(new Error()))
    })

    it('Should return 200 if ILoadPostCommentsByPostId retuns post comments', async () => {
        const { sut } = makeSut()
        const httpResponse = await sut.handle(mockHttpRequest())
        expect(httpResponse).toEqual(ok({}))
    })
})
