const { IController } = require('../../presentation/protocols/controller')
const { ILogRepository } = require('../../data/protocols/log-repository')
const { created, serverError } = require('../../presentation/helpers/http/http-helper')
const { LogControllerDecorator } = require('./log-controller-decorator')

const mockHttpRequest = () => ({
    body: {
        content: 'any_content'
    }
})

const mockServerError = () => {
    const fakeError = new Error()
    fakeError.stack = 'any_error_stack'
    return serverError(fakeError)
}

const mockController = () => {
    class ControllerStub extends IController {
        async handle (httpRequest) {
            return Promise.resolve(created([{
                id: 'any_comment_id',
                content: 'any_content'
            }]))
        }
    }
    return new ControllerStub()
}

const mockLogErrorRepository = () => {
    class LogErrorRepositoryStub extends ILogRepository {
        async logError (errorStack) {
            Promise.resolve()
        }
    }
    return new LogErrorRepositoryStub()
}

const makeSut = () => {
    const controllerStub = mockController()
    const logErrorRepositoryStub = mockLogErrorRepository()
    const sut = new LogControllerDecorator(
        controllerStub,
        logErrorRepositoryStub
    )
    return {
        sut,
        controllerStub,
        logErrorRepositoryStub
    }
}

describe('Log Controller Decorator suite tests', () => {
    it('Should call Controller handle with correct data', async () => {
        const { sut, controllerStub } = makeSut()
        const handleSpy = jest.spyOn(controllerStub, 'handle')
        const httpRequest = mockHttpRequest()
        await sut.handle(httpRequest)
        expect(handleSpy).toHaveBeenCalledWith(httpRequest)
    })

    it('Should return the same result of the controller', async () => {
        const { sut } = makeSut()
        const httpResponse = await sut.handle(mockHttpRequest())
        expect(httpResponse).toEqual(created([{
            id: 'any_comment_id',
            content: 'any_content'
        }]))
    })

    it('Should call LogErrorRepository with correct data when controller returns server error', async () => {
        const { sut, controllerStub, logErrorRepositoryStub } = makeSut()
        jest.spyOn(controllerStub, 'handle').mockResolvedValueOnce(mockServerError())
        const addSpy = jest.spyOn(logErrorRepositoryStub, 'logError')
        await sut.handle(mockHttpRequest())
        expect(addSpy).toHaveBeenCalledWith('any_error_stack')
    })
})
