require('dotenv').config()
const { makeFileCommentsRepository } = require('./factories/repositories/filedb/comments-repository-factory')
const { envConfig } = require('./config/environment')

const contextStrategy = makeFileCommentsRepository()

contextStrategy.connect()
    .then(async () => {
        const app = require('./config/app')
        const { port } = envConfig.app
        app.listen(port, () => console.log(`Server running on port ${port}`))
    })
    .catch(console.error)