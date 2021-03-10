const { IController } = require('../../presentation/protocols/controller')
const { IComment } = require('../../infra/db/protocols/comment')
const { created } = require('../../presentation/helpers/http/http-helper')
const { LogControllerDecorator } = require('./log-controller-decorator')

const mockHttpRequest = () => ({
    body: {
        content: 'any_content'
    }
})

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
    class LogErrorRepositoryStub extends IComment {
        async add (errorStack) {
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
})
