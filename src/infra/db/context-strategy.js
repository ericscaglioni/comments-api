const { IComment } = require("./protocols/comment")

class ContextStrategy extends IComment {
    constructor(strategy) {
        super()
        this._database = strategy
    }

    async add (postModel) {
        return this._database.add(postModel)
    }

    async loadAll () {
        return this._database.loadAll()
    }

    async connect () {
        return this._database.connect()
    }
}

module.exports = {
    ContextStrategy
}
