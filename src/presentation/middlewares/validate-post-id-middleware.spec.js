const { ILoadPostCommentsByPostId } = require('../../data/protocols/load-post-comments-by-post-id')
const { ValidatePostIdMiddleware } = require('./validate-post-id-middleware')

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
})
