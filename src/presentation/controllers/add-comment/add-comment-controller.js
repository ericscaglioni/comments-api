const { badRequest } = require('../../helpers/http/http-helper')
const { IController } = require('../../protocols')

class AddCommentController extends IController {
    constructor(iValidation) {
        super()
        this.iValidation = iValidation
    }

    async handle (httpRequest) {
        const error = this.iValidation.validate(httpRequest.body)
        if (error) {
            return badRequest(error)
        }
    }
}

module.exports = {
    AddCommentController
}
