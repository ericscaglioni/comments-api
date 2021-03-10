require('dotenv').config()
const { makeDbStrategy } = require('./factories/db-strategy/db-strategy-factory')
const { envConfig } = require('./config/environment')

const contextStrategy = makeDbStrategy()

contextStrategy.connect()
    .then(async () => {
        const app = require('./config/app')
        const { port } = envConfig.app
        app.listen(port, () => console.log(`Server running on port ${port}`))
    })
    .catch(console.error)