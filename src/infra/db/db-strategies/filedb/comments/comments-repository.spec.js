const { CommentsRepository } = require('./comments-repository')
const { writeFile, readFile } = require('fs/promises')
const { envConfig } = require('../../../../../main/config/environment')

const filePath = `${process.cwd()}/${envConfig.dbStrategyURL.file.comments}`

const insertPostComments = async () => {
    const commentsByPostId = {
        '1': [{
            id: 'any_comment_id',
            content: 'any_content'
        }, {
            id: 'any_comment_id_2',
            content: 'any_content_2'
        }],
        '2': [{
            id: 'any_comment_id',
            content: 'any_content'
        }, {
            id: 'any_comment_id_2',
            content: 'any_content_2'
        }, {
            id: 'any_comment_id_2',
            content: 'any_content_2'
        }, {
            id: 'any_comment_id_2',
            content: 'any_content_2'
        }, {
            id: 'any_comment_id_2',
            content: 'any_content_2'
        }]
    }

    await writeFile(filePath, JSON.stringify(commentsByPostId))
}

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

    describe('loadByPostId()', () => {
        it('Should return an empty array if there is no comments', async () => {
            const sut = makeSut()
            const comments = await sut.loadByPostId({
                postId: 1
            })
            expect(Array.isArray(comments)).toBeTruthy()
            expect(comments).toHaveLength(0)
        })

        it('Should return post comments on success', async () => {
            await insertPostComments()
            commentsByPostId = JSON.parse(await readFile(filePath))
            expect(Object.keys(commentsByPostId).length).toBe(2)

            const sut = makeSut()
            const comments = await sut.loadByPostId({ postId: 2 })
            expect(Array.isArray(comments)).toBeTruthy()
            expect(comments).toHaveLength(5)
            expect(comments).toEqual([{
                id: 'any_comment_id',
                content: 'any_content'
            }, {
                id: 'any_comment_id_2',
                content: 'any_content_2'
            }, {
                id: 'any_comment_id_2',
                content: 'any_content_2'
            }, {
                id: 'any_comment_id_2',
                content: 'any_content_2'
            }, {
                id: 'any_comment_id_2',
                content: 'any_content_2'
            }])
        })
    })
})
