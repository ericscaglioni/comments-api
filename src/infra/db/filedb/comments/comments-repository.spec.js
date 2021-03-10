const { CommentsRepository } = require('./comments-repository')
const { writeFile, readFile } = require('fs/promises')
const { envConfig } = require('../../../../main/config/environment')

const filePath = `${process.cwd()}/${envConfig.dbStrategyURL.file.comments}`

const makeSut = () => new CommentsRepository(filePath)

let commentsByPostId = {}

describe('Comments Repository suite tests', () => {
    beforeEach(async () => {
        await writeFile(filePath, '{}')
        commentsByPostId = JSON.parse(await readFile(filePath))
    })

    describe('add()', () => {
        it('Should save post comment on success', async () => {
            expect(commentsByPostId).toEqual({})

            const sut = makeSut()
            const commentData = {
                postId: 'any_post_id',
                content: 'any_content'
            }
            const comments = await sut.add(commentData)

            commentsByPostId = JSON.parse(await readFile(filePath))
            expect(commentsByPostId).toBeTruthy()
            expect(commentsByPostId).toHaveProperty('any_post_id')
            expect(commentsByPostId['any_post_id']).toEqual(comments)
        })
    })

    describe('connect()', () => {
        it('Should connect', async () => {
            const sut = makeSut()
            const promise = sut.connect()
            await expect(promise).resolves.toBe()
        })
    })
})
