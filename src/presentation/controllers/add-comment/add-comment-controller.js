const { IController } = require('../../protocols')

class AddCommentController extends IController {
    constructor(iValidation) {
        super()
        this.iValidation = iValidation
    }

    async handle (httpRequest) {
        this.iValidation.validate(httpRequest.body)
    }
}

module.exports = {
    AddCommentController
}
