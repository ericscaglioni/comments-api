const { ILogRepository } = require('../../../data/protocols/log-repository')
const { LogContextStrategy } = require('./log-context-strategy')

const mockError = () => {
    const error = new Error()
    error.stack = 'any_error_stack'
    return error
}

const mockLogStrategy = () => {
    class LogStrategyStub extends ILogRepository {
        async logError (errorStack) {
            Promise.resolve()
        }
    }
    return new LogStrategyStub()
}

const makeSut = () => {
    const logStrategyStub = mockLogStrategy()
    const sut = new LogContextStrategy(logStrategyStub)
    return {
        sut,
        logStrategyStub
    }
}

describe('Log Context Strategy suite tests', () => {
    describe('logError()', () => {
        it('Should call ILogStrategy.logError with correct errorStack', async () => {
            const { sut, logStrategyStub } = makeSut()
            const logErrorSpy = jest.spyOn(logStrategyStub, 'logError')
            await sut.logError(mockError().stack)
            expect(logErrorSpy).toHaveBeenCalledWith('any_error_stack')
        })

        it('Should throw if IComment throws', async () => {
            const { sut, logStrategyStub } = makeSut()
            jest.spyOn(logStrategyStub, 'logError').mockImplementationOnce(() => {
                throw new Error()
            })
            const promise = sut.logError(mockError().stack)
            await expect(promise).rejects.toThrow()
        })
    })
})
