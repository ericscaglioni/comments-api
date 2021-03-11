const { LogErrorRepository } = require('./log-error-repository')
const { writeFile, readFile } = require('fs/promises')
const { envConfig } = require('../../../../../main/config/environment')
const MockDate = require('mockdate')

const filePath = `${process.cwd()}/${envConfig.dbStrategyURL.file.logs}`

const makeSut = () => new LogErrorRepository(filePath)

let logs = []

describe('Logs Repository suite tests', () => {
    beforeAll(() => {
        MockDate.set(new Date())
    })

    afterAll(() => {
        MockDate.reset()
    })

    beforeEach(async () => {
        await writeFile(filePath, '[]')
        logs = JSON.parse(await readFile(filePath))
    })

    describe('add()', () => {
        it('Should add a log on success', async () => {
            expect(logs).toEqual([])

            const sut = makeSut()
            await sut.add('any_error_stack')

            logs = JSON.parse(await readFile(filePath))
            expect(Array.isArray(logs)).toBeTruthy()
            expect(logs).toHaveLength(1)
            expect(logs[0]).toEqual({
                error: 'any_error_stack',
                date: new Date().toISOString()
            })
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
