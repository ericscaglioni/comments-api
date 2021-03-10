const { IComment } = require('./protocols/comment')
const { ContextStrategy } = require('./context-strategy')

const mockIComment = () => {
    class ICommentStub extends IComment {
        async connect () {
            return Promise.resolve()
        }

        async add ({ postId, content }) {
            return {
                [postId]: [
                    {
                        id: 'comment_id',
                        content
                    }
                ]
            }
        }
    }
    return new ICommentStub()
}

const mockCommentData = () => ({
    postId: 'any_post_id',
    content: 'any_content'
})

const makeSut = () => {
    const iCommentStub = mockIComment()
    const sut = new ContextStrategy(iCommentStub)
    return {
        sut,
        iCommentStub
    }
}

describe('Context Strategy suite tests', () => {
    describe('add()', () => {
        it('Should call IComment with correct data', async () => {
            const { sut, iCommentStub } = makeSut()
            const addSpy = jest.spyOn(iCommentStub, 'add')
            const commentData = mockCommentData()
            await sut.add(commentData)
            expect(addSpy).toHaveBeenCalledWith(commentData)
        })

        it('Should throw if IComment throws', async () => {
            const { sut, iCommentStub } = makeSut()
            jest.spyOn(iCommentStub, 'add').mockImplementationOnce(() => {
                throw new Error()
            })
            const promise = sut.add(mockCommentData())
            await expect(promise).rejects.toThrow()
        })

        it('Should return on success', async () => {
            const { sut } = makeSut()
            const comments = await sut.add(mockCommentData())
            expect(comments).toEqual({
                "any_post_id": [{
                    id: 'comment_id',
                    content: 'any_content'
                }]
            })
        })
    })

    describe('connect()', () => {
        it('Should call IComment', async () => {
            const { sut, iCommentStub } = makeSut()
            const connectSpy = jest.spyOn(iCommentStub, 'connect')
            await sut.connect()
            expect(connectSpy).toHaveBeenCalled()
        })

        it('Should throw if IComment throws', async () => {
            const { sut, iCommentStub } = makeSut()
            jest.spyOn(iCommentStub, 'connect').mockImplementationOnce(() => {
                throw new Error()
            })
            const promise = sut.connect()
            await expect(promise).rejects.toThrow()
        })
    })
})
