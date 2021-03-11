const { IComment } = require('../../../infra/db/protocols/comment')
const { DbLoadCommentsByPostId } = require('./db-load-comments-by-post-id')

const mockILoadCommentsByPostIdRepository = () => {
    class ILoadCommentsByPostIdRepositoryStub extends IComment {
        async loadByPostId ({ postId }) {
            return [{
                id: 'any_comment_id',
                content: 'any_content'
            }, {
                id: 'any_comment_id',
                content: 'any_content'
            }, {
                id: 'any_comment_id',
                content: 'any_content'
            }, {
                id: 'any_comment_id',
                content: 'any_content'
            }]
        }
    }
    return new ILoadCommentsByPostIdRepositoryStub()
}

const makeSut = () => {
    const iLoadCommentsByPostIdRepositoryStub =
        mockILoadCommentsByPostIdRepository()

    const sut = new DbLoadCommentsByPostId(
        iLoadCommentsByPostIdRepositoryStub
    )
    return {
        sut,
        iLoadCommentsByPostIdRepositoryStub
    }
}

describe('Db Load Comments suite tests', () => {
    describe('loadByPostIt', () => {
        it('Should call ILoadCommentsByPostIdStub with correct data', async () => {
            const { sut, iLoadCommentsByPostIdRepositoryStub } = makeSut()
            const loadByPostIdSpy = jest.spyOn(
                iLoadCommentsByPostIdRepositoryStub,
                'loadByPostId'
            )
            const postId = 1
            await sut.loadByPostId({
                postId
            })
            expect(loadByPostIdSpy).toHaveBeenCalledWith({ postId })
        })
    })
})
