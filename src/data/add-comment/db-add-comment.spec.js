const { IComment } = require('../../infra/db/protocols/comment')
const { DbAddComment } = require('./db-add-comment')

const mockCommentData = () => ({
    postId: 'any_post_id',
    content: 'any_content'
})

const mockIAddCommentRepository = () => {
    class IAddCommentRepositoryStub extends IComment {
        async add ({ postId, content }) {
            return {
                [postId]: [{
                    id: 'any_comment_id',
                    content
                }]
            }
        }
    }
    return new IAddCommentRepositoryStub()
}

const makeSut = () => {
    const iAddCommentRepositoryStub = mockIAddCommentRepository()
    const sut = new DbAddComment(iAddCommentRepositoryStub)
    return {
        sut,
        iAddCommentRepositoryStub
    }
}

describe('Db Add Comment suite tests', () => {
    describe('add()', () => {
        it('Should call IAddCommentRepositoryStub with correct data', async () => {
            const { sut, iAddCommentRepositoryStub } = makeSut()
            const addSpy = jest.spyOn(iAddCommentRepositoryStub, 'add')
            const commentData = mockCommentData()
            await sut.add(commentData)
            expect(addSpy).toHaveBeenCalledWith(commentData)
        })

        it('Should throw if IAddCommentRepositoryStub throws', async () => {
            const { sut, iAddCommentRepositoryStub } = makeSut()
            jest.spyOn(iAddCommentRepositoryStub, 'add').mockImplementationOnce(() => {
                throw new Error('test')
            })
            const promise = sut.add(mockCommentData())
            await expect(promise).rejects.toThrow()
        })
    })
})
